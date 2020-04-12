const { join } = require('path');
const { readFileSync } = require('fs');

const getPackageJson = (path) => JSON.parse(readFileSync(join(path, 'package.json')).toString());

const getPackageVersion = (path) => getPackageJson(path).version;

const getPackageVersionTag = (path) => {
  const ver = getPackageVersion(path);
  const arr = ver.split('.');
  let tag = `${arr[0]}.${arr[1]}.${arr[2]}`;
  if (ver.toUpperCase().indexOf('-SNAPSHOT') > 0) {
    tag += '-SNAPSHOT';
  }
  return tag;
};

module.exports = {
  getPackageVersion,
  getPackageVersionTag,
};
