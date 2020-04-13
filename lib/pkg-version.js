const { join } = require('path');
const { readFileSync } = require('fs');

const getPackageJson = (path) => JSON.parse(readFileSync(join(path, 'package.json')).toString());

const getPackageVersion = (path) => getPackageJson(path).version;

const getSemVer = (ver) => {
  const arr = (ver.split('-')[0]).split('.');
  return `${arr[0]}.${arr[1]}.${arr[2]}`;
};

const getPackageVersionTag = (ver, sha) => {
  let tag = getSemVer(ver);
  if (ver.toUpperCase().indexOf('-SNAPSHOT') > 0) {
    tag += '-SNAPSHOT';
  } else {
    tag += `-${sha}`;
  }
  return tag;
};


module.exports = {
  getPackageVersion,
  getPackageVersionTag,
  getSemVer,
};
