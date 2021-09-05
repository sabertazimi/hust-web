const chalk = require('chalk');
const cp = require('child_process');
const consola = require('consola');

const log = (log) => {
  consola.log(log);
};

const info = (info) => {
  consola.info(chalk.blue(info));
};

const success = (success) => {
  consola.success(chalk.green(success));
};

const error = (error) => {
  consola.error(error);
};

const cmd = (cmd) => {
  console.info(`    ${chalk.bgGreen.black('[exec]')}: ${cmd}`);
};

const isFlag = (args, flag) =>
  Boolean(args.length) && args.some((arg) => arg === flag);

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

module.exports = { log, info, success, error, cmd, isFlag, exec, execPipe };
