const path = require('node:path')
// const cp = require('child_process');
// const util = require('util');
// const exec = util.promisify(cp.exec);

const fs = require('fs-extra')
const fetch = require('node-fetch')
const semver = require('semver')
const ora = require('ora')

const REGISTRY_URL = 'https://registry.npmjs.org'
const readPackageJsonFromArchive
  = require('./utils.js').readPackageJsonFromArchive
const extractNpmArchiveTo = require('./utils.js').extractNpmArchiveTo

class Mpm {
  constructor(config) {
    // config
    this.config = config || {}
  }

  async getPinnedReference({ name, reference }) {
    if (semver.validRange(reference) && !semver.valid(reference)) {
      const response = await fetch(`${REGISTRY_URL}/${name}`)

      if (!response.ok)
        throw new Error(`Couldn't fetch package "${name}"`)

      if (response.status === 204)
        throw new Error('HTTP 204')

      const info = await response.json()
      const versions = Object.keys(info.versions)
      const maxSatisfying = semver.maxSatisfying(versions, reference)

      if (maxSatisfying === null) {
        throw new Error(
          `Couldn't find a version matching "${reference}" for package  "${name}"`,
        )
      }

      reference = maxSatisfying
    }

    return { name, reference }
  }

  async fetchPackage({ name, reference }) {
    if (['/', './', '../'].some(prefix => reference.startsWith(prefix)))
      // eslint-disable-next-line security/detect-non-literal-fs-filename -- reference is safe.
      return await fs.readFile(reference)

    if (semver.valid(reference)) {
      return await this.fetchPackage({
        name,
        reference: `${REGISTRY_URL}/${name}/-/${name}-${reference}.tgz`,
      })
    }

    const response = await fetch(reference)

    if (!response.ok)
      throw new Error(`Couldn't fetch package "${reference}"`)

    return await response.buffer()
  }

  async getPackageDependencies({ name, reference }) {
    const packageBuffer = await this.fetchPackage({ name, reference })
    const packageJson = JSON.parse(
      await readPackageJsonFromArchive(packageBuffer),
    )
    const dependencies = packageJson.dependencies || {}
    const devDependencies = packageJson.devDependencies || {}

    return {
      dependencies: Object.keys(dependencies).map((name) => {
        return { name, reference: dependencies[name] }
      }),
      devDependencies: Object.keys(devDependencies).map((name) => {
        return { name, reference: devDependencies[name] }
      }),
    }
  }

  async getPackageDependencyTree(
    { name, reference, dependencies },
    available = new Map(),
  ) {
    return {
      name,
      reference,
      dependencies: await Promise.all(
        dependencies
          .filter((volatileDependency) => {
            const availableReference = available.get(volatileDependency.name)

            // exactly match, no need for copy package
            if (volatileDependency.reference === availableReference)
              return false

            if (
              semver.validRange(volatileDependency.reference)
              && semver.satisfies(availableReference, volatileDependency.reference)
            )
              return false

            return true
          })
          .map(async (volatileDependency) => {
            const pinnedDependency
              = await this.getPinnedReference(volatileDependency)
            const { dependencies: subDependencies }
              = await this.getPackageDependencies(pinnedDependency)
            const subAvailable = new Map(available)

            subAvailable.set(pinnedDependency.name, pinnedDependency.reference)

            return await this.getPackageDependencyTree(
              {
                ...pinnedDependency,
                dependencies: subDependencies,
              },
              subAvailable,
            )
          }),
      ),
    }
  }

  async linkPackages({ name, reference, dependencies }, cwd) {
    const dependencyTree = await this.getPackageDependencyTree({
      name,
      reference,
      dependencies,
    })

    await fs.mkdirp(`${cwd}/node_modules`)

    // skipping root package
    if (reference) {
      const packageBuffer = await this.fetchPackage({ name, reference })
      const spinner = ora(`Extracting ${name}-${reference} ...`).start()
      await extractNpmArchiveTo(packageBuffer, cwd)
      spinner.succeed()
    }

    if (dependencyTree.dependencies.length) {
      await Promise.all(
        dependencyTree.dependencies.map(
          async ({ name, reference, dependencies }) => {
            const target = `${cwd}/node_modules/${name}`
            const binTarget = `${cwd}/node_modules/.bin`

            await this.linkPackages({ name, reference, dependencies }, target)

            // eslint-disable-next-line security/detect-non-literal-require -- target is safe.
            const dependencyPackageJson = require(`${target}/package.json`)

            // create binaries symbol link defined in 'bin' field
            const bin = dependencyPackageJson.bin

            // if (typeof bin === 'string') {
            //   bin = { [name]: bin };
            // }

            for (const binName of Object.keys(bin)) {
              const source = path.resolve(target, bin[binName])
              const dest = `${binTarget}/${binName}`

              await fs.mkdirp(`${cwd}/node_modules/.bin`)
              // eslint-disable-next-line security/detect-non-literal-fs-filename -- source is safe.
              fs.symlink(path.relative(binTarget, source), dest)
              // fs.access(dest, (err) => {
              //   if (err) {
              //     fs.symlink(path.relative(binTarget, source), dest);
              //     return;
              //   }
              // });
            }

            // execute scripts defined in 'scripts' field
            // if (dependencyPackageJson.scripts) {
            //   for (let scriptName of ['preinstall', 'install', 'postinstall']) {
            //     const script = dependencyPackageJson.scripts[scriptName];

            //     if (!script) {
            //       continue;
            //     }

            //     await exec(script, {
            //       cwd: target,
            //       env: {
            //         ...process.env,
            //         PATH: `${target}/node_modules/.bin:${process.env.PATH}`
            //       },
            //     });
            //   }
            // }
          },
        ),
      )
    }
  }
}

const mpm = new Mpm()

module.exports = mpm
