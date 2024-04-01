// @ts-check
const cp = require('node:child_process')
const process = require('node:process')
const chalk = require('chalk')
const semver = require('semver')

/** @type {import('consola').ConsolaInstance} */
// @ts-expect-error -- no types available.
const consola = require('consola')

/**
 * @param {string} [log]
 */
function log(log) {
  consola.log(log)
}

/**
 * @param {string} [info]
 */
function info(info) {
  consola.info(chalk.blue(info))
}

/**
 * @param {string} [success]
 */
function success(success) {
  consola.success(chalk.green(success))
}

/**
 * @param {string} [error]
 */
function error(error) {
  consola.error(error)
}

/**
 * @param {string} [cmd]
 */
function cmd(cmd) {
  console.info(`    ${chalk.bgGreen.black('[exec]')}: ${cmd}`)
}

/**
 * @param {string} [command]
 * @param {string | undefined} [cwd]
 */
function exec(command, cwd) {
  cmd(command)
  return cp.execSync(command, {
    shell: '/usr/bin/bash',
    stdio: 'inherit',
    cwd: cwd ?? process.cwd(),
  })
}

/**
 * @param {string} [command]
 * @param {string | undefined} [cwd]
 */
function execPipe(command, cwd) {
  cmd(command)
  return cp.execSync(command, {
    shell: '/usr/bin/bash',
    stdio: 'pipe',
    cwd: cwd ?? process.cwd(),
  })
}

function checkGitStatus() {
  info('Check git status ...')
  const gitStatus = execPipe('git status --porcelain').toString()

  if (gitStatus.trim() !== '') {
    info('Please commit your changes before running this script!')
    info('Exiting because `git status` is not empty:')
    log('')
    log(gitStatus)
    log('')
    process.exit(1)
  }
}

module.exports = {
  log,
  info,
  success,
  error,
  cmd,
  checkGitStatus,
  exec,
  execPipe,
  semver,
}
