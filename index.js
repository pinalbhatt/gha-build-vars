/* eslint no-console: 0 */
const core = require('@actions/core');
const { getPackageVersion, getPackageVersionTag } = require('./lib/pkg-version');
const { getShortSHA, getBranchName, getBranchTag } = require('./lib/gh');

async function run() {
  try {
    const pkgJsonLocation = core.getInput('pkgJsonLocation');
    const shortSHALength = Number(core.getInput('shortSHALength'));
    console.log(`Reading package.json at ${pkgJsonLocation}`);
    const shortSHA = getShortSHA(process.env.GITHUB_SHA, shortSHALength || 7);
    console.log('a');
    const branchName = getBranchName();
    console.log('b');
    const branchTag = getBranchTag();
    console.log('c');
    const packageVersion = getPackageVersion(pkgJsonLocation);
    const packageVersionTag = getPackageVersionTag(packageVersion, shortSHA);

    core.debug('this is core.debug');

    core.setOutput('packageVersion', packageVersion);
    core.setOutput('packageVersionTag', packageVersionTag);
    core.setOutput('shortSHA', shortSHA);
    core.setOutput('branchName', branchName);
    core.setOutput('branchTag', branchTag);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
