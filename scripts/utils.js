// @ts-check
const cp = require('child_process');
const chalk = require('chalk');

/** @type {import('consola').Consola} */
// @ts-ignore
const consola = require('consola');

/**
 * @param {string} [log]
 */
const log = log => {
  consola.log(log);
};

/**
 * @param {string} [info]
 */
const info = info => {
  consola.info(chalk.blue(info));
};

/**
 * @param {string} [success]
 */
const success = success => {
  consola.success(chalk.green(success));
};

/**
 * @param {string} [error]
 */
const error = error => {
  consola.error(error);
};

/**
 * @param {string} [cmd]
 */
const cmd = cmd => {
  console.info(`    ${chalk.bgGreen.black('[exec]')}: ${cmd}`);
};

const checkGitStatus = () => {
  info('Check git status ...');
  const gitStatus = execPipe('git status --porcelain').toString();

  if (gitStatus.trim() !== '') {
    info('Please commit your changes before running this script!');
    info('Exiting because `git status` is not empty:');
    log('');
    log(gitStatus);
    log('');
    process.exit(1);
  }
};

/**
 * @param {string} [command]
 * @param {string | undefined} [cwd]
 */
const exec = (command, cwd) => {
  cmd(command);
  return cp.execSync(command, {
    shell: '/usr/bin/bash',
    stdio: 'inherit',
    cwd: cwd ?? process.cwd(),
  });
};

/**
 * @param {string} [command]
 * @param {string | undefined} [cwd]
 */
const execPipe = (command, cwd) => {
  cmd(command);
  return cp.execSync(command, {
    shell: '/usr/bin/bash',
    stdio: 'pipe',
    cwd: cwd ?? process.cwd(),
  });
};

module.exports = {
  log,
  info,
  success,
  error,
  cmd,
  checkGitStatus,
  exec,
  execPipe,
};
