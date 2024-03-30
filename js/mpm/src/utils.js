const { Buffer } = require('node:buffer')
const gunzipMaybe = require('gunzip-maybe')
const tar = require('tar-stream')
const tarFs = require('tar-fs')

function getFileName(entryName, virtualPath) {
  // remove prefix '/'
  entryName = entryName.replace(/^\/+/, '')

  for (let i = 0; i < virtualPath; ++i) {
    const index = entryName.indexOf('/')

    if (index === -1)
      return null

    entryName = entryName.substr(index + 1)
  }

  return entryName
}

/**
 * Read archive file.
 * @params {Buffer} buffer archive buffer
 */
async function readFileFromArchive(fileName, buffer) {
  return new Promise((resolve /* , rejects */) => {
    const extractor = tar.extract()

    extractor.on('entry', (header, stream) => {
      const buffers = []
      stream.on('data', data => buffers.push(data))
      // stream.on('error', (error) => rejects(error));
      stream.on('end', () => resolve(Buffer.concat(buffers)))
      stream.resume()
    })

    // extractor.on('error', (error) => rejects(error));
    // extractor.on('finish', () =>
    //   rejects(new Error(`Couldn't find "${fileName}" inside the archive`))
    // );

    const gunZipper = gunzipMaybe()
    gunZipper.pipe(extractor)
    // gunZipper.on('error', (error) => rejects(error));
    gunZipper.write(buffer)
    gunZipper.end()
  })
}

async function readPackageJsonFromArchive(packageBuffer) {
  return await readFileFromArchive('package.json', packageBuffer)
}

async function extractArchiveTo(packageBuffer, target, { virtualPath }) {
  return new Promise((resolve /* , rejects */) => {
    const map = (header) => {
      // header.name = getFileName(header.name, virtualPath) || header.name;
      header.name = getFileName(header.name, virtualPath)
      return header
    }

    const gunZipper = gunzipMaybe()
    const extractor = tarFs.extract(target, { map })
    gunZipper.pipe(extractor)

    // extractor.on('error', (error) => rejects(error));
    extractor.on('finish', () => resolve())
    // gunZipper.on('error', (error) => rejects(error));
    gunZipper.write(packageBuffer)
    gunZipper.end()
  })
}

async function extractNpmArchiveTo(packageBuffer, target) {
  return await extractArchiveTo(packageBuffer, target, { virtualPath: 1 })
}

module.exports = {
  getFileName,
  readFileFromArchive,
  readPackageJsonFromArchive,
  extractNpmArchiveTo,
}
