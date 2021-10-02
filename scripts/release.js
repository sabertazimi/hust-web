// @ts-check
/** @type {(options: any) => Promise<any> | any} */
const lernaVersion = require('@lerna/version');
const semver = require('semver');
const utils = require('./utils');

const main = async () => {
  utils.checkGitStatus();
  utils.info(`Working in directory ${process.cwd()}.`);

  const opts = {
    changelogPreset: 'angular',
    conventionalCommits: true,
    message: 'chore(release): %s',
    forcePublish: true,
    commitHooks: false,
    gitTagVersion: false,
    yes: true,
  };

  const push = process.argv.includes('-p') || process.argv.includes('--push');
  const result = await lernaVersion({
    ...opts,
    push,
  });

  let proceed = false;
  let version = '';

  for (const v of result.updatesVersions.values()) {
    if (semver.valid(v)) {
      proceed = true;
      version = semver.valid(v);
      break;
    }
  }

  if (proceed) {
    utils.exec('yarn');
    utils.exec('git add .');
    utils.exec(`git commit -a -m "chore(release): ${version}"`);
    utils.exec(`git tag v${version} -s -m "v${version}"`);

    if (push) {
      utils.exec('git push --follow-tags origin main');
    } else {
      utils.info('Run `git push --follow-tags origin main` to publish.');
    }
  }
};

main();
