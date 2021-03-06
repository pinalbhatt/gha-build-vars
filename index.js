/* eslint no-console: 0 */
const core = require('@actions/core');
// const wait = require('./lib/wait');
const { getPackageVersion, getPackageVersionTag } = require('./lib/pkg-version');

// most @actions toolkit packages have async methods
async function run() {
  try {
    const pkgJsonLocation = core.getInput('pkgJsonLocation');
    // const ms = core.getInput('milliseconds');
    console.log(`Reading package.json at ${pkgJsonLocation}`);

    const packageVersion = getPackageVersion(pkgJsonLocation);
    const packageVersionTag = getPackageVersionTag(pkgJsonLocation);
    // core.debug((new Date()).toTimeString());
    // await wait(parseInt(ms, 10));
    // / core.debug((new Date()).toTimeString());

    // core.setOutput('time', new Date().toTimeString());
    core.setOutput('packageVersion', packageVersion);
    core.setOutput('packageVersionTag', packageVersionTag);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
