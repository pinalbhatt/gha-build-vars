/* eslint no-console: 0 */
const core = require('@actions/core');
const { getPackageVersion, getPackageVersionTag, getSemVer } = require('./lib/pkg-version');
const { getShortSHA, getBranchName, getBranchTag } = require('./lib/gh');

async function run() {
  try {
    const pkgJsonLocation = core.getInput('pkgJsonLocation');
    const shortSHALength = Number(core.getInput('shortSHALength'));
    const shortSHA = getShortSHA(process.env.GITHUB_SHA, shortSHALength || 7);
    const branchName = getBranchName();
    const branchTag = getBranchTag();
    console.log(`branchName ${branchName}`);
    console.log(`branchTag ${branchTag}`);
    console.log(`Reading package.json at ${pkgJsonLocation}`);
    const packageVersion = getPackageVersion(pkgJsonLocation);
    console.log('packageVersion', packageVersion);
    const packageVersionTag = getPackageVersionTag(packageVersion, shortSHA);
    const releaseBranch = `release/${getSemVer(packageVersion)}`;

    core.debug('this is core.debug');

    core.setOutput('packageVersion', packageVersion);
    console.log('packageVersion', packageVersion);
    core.setOutput('packageVersionTag', packageVersionTag);
    console.log('packageVersionTag', packageVersionTag);
    core.setOutput('shortSHA', shortSHA);
    console.log('shortSHA', shortSHA);
    core.setOutput('branchName', branchName);
    console.log('branchName', branchName);
    core.setOutput('branchTag', branchTag);
    console.log('branchTag', branchTag);
    core.setOutput('releaseBranch', releaseBranch);
    console.log('releaseBranch', releaseBranch);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
