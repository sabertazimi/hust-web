#!/usr/bin/env node

const fs = require('node:fs')
const path = require('node:path')
const { program } = require('commander')
const log = require('log4js').getLogger()
const mpm = require('./mpm.js')

log.level = 'debug'

const packageJsonPath = path.join(__dirname, '../package.json')
const packageJson = JSON.parse(
  fs.readFileSync(packageJsonPath, { encoding: 'utf-8' })
)

program.version(packageJson.version, '-v, --version')

program
  .command('install [package]')
  .alias('i')
  .description('Install dependencies')
  .action(function (package) {
    if (!package) {
      const cwd = process.cwd()
      const packageJson = require(path.join(cwd, 'package.json'))

      packageJson.dependencies = Object.keys(
        packageJson.dependencies || {}
      ).map(name => {
        return {
          name,
          reference: packageJson.dependencies[name],
        }
      })

      mpm.linkPackages(packageJson, `${cwd}`).catch(error => {
        log.error(error.message)
      })
    }
  })

program.parse(process.argv)
