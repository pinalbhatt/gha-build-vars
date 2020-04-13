const { getPackageVersionTag } = require('./pkg-version');

const getShortSHA = (sha, length) => {
  if (!sha) {
    throw new Error('sha must be defined');
  }
  if (length <= 0 || !Number.isInteger(length)) {
    throw new Error('length is invalid');
  }
  if (sha.length < length) {
    throw new Error('input is too short');
  }
  return sha.substring(0, length);
};

const getBranchName = () => (process.env.GITHUB_REF).replace('refs/heads/', '');

const getBranchTag = (ver, sha) => {
  const branch = getBranchName();
  const verTag = getPackageVersionTag(ver, sha);
  let tag = branch.replace(/\//g, '_');
  if (verTag.indexOf('-SNAPSHOT') === -1) {
    tag += `-${sha}`;
  }
  return tag;
};

module.exports = {
  getShortSHA,
  getBranchName,
  getBranchTag,
};
