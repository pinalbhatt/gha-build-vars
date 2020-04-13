/* eslint no-console: 0 */
const core = require('@actions/core');
const { getPackageVersion, getPackageVersionTag, getSemVer } = require('./lib/pkg-version');
const { getShortSHA, getBranchName, getBranchTag } = require('./lib/gh');

async function run() {
  try {
    const pkgJsonLocation = core.getInput('pkgJsonLocation');
    const shortSHALength = Number(core.getInput('shortSHALength'));
    console.log(`Reading package.json at ${pkgJsonLocation}`);
    const shortSHA = getShortSHA(process.env.GITHUB_SHA, shortSHALength || 7);
    console.log('shortSHA:', shortSHA);
    const branchName = getBranchName();
    console.log('branchName:', branchName);
    const packageVersion = getPackageVersion(pkgJsonLocation);
    console.log('packageVersion:', packageVersion);
    const packageVersionTag = getPackageVersionTag(packageVersion, shortSHA);
    console.log('packageVersionTag:', packageVersionTag);
    const releaseBranch = `release/${getSemVer(packageVersion)}`;
    console.log('releaseBranch:', releaseBranch);
    const branchTag = getBranchTag(packageVersion, shortSHA);
    console.log('branchTag:', branchTag);
    core.debug('this is core.debug');

    core.setOutput('packageVersion', packageVersion);
    core.setOutput('versionTag', packageVersionTag);
    core.setOutput('shortSHA', shortSHA);
    core.setOutput('branchName', branchName);
    core.setOutput('branchTag', branchTag);
    core.setOutput('releaseBranch', releaseBranch);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
