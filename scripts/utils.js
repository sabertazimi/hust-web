const chalk = require('chalk');
const cp = require('child_process');
const consola = require('consola');

const log = log => {
  consola.log(log);
};

const info = info => {
  consola.info(chalk.blue(info));
};

const success = success => {
  consola.success(chalk.green(success));
};

const error = error => {
  consola.error(error);
};

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

const exec = (command, cwd) => {
  cmd(command);
  return cp.execSync(command, {
    shell: '/usr/bin/bash',
    stdio: 'inherit',
    cwd: cwd ?? process.cwd(),
  });
};

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
