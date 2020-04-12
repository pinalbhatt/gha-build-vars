const { getPackageVersion, getPackageVersionTag } = require('../lib/pkg-version');

test('getPackageVersion should return semVer', () => {
  const ver = getPackageVersion('./');
  const semVer = /^((([0-9]+)\.([0-9]+)\.([0-9]+)(?:-([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?)(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?)$/gm;
  expect(semVer.test(ver)).toBeTruthy();
});

test('getPackageVersionTag without snapshot', () => {
  const tag = getPackageVersionTag('20.6.0');
  expect(tag).toBe('20.6.0');
});

test('getPackageVersionTag with snapshot case-1', () => {
  const tag = getPackageVersionTag('20.6.0-SNAPSHOT.5');
  expect(tag).toBe('20.6.0-SNAPSHOT');
});

test('getPackageVersionTag with snapshot case-2', () => {
    const tag = getPackageVersionTag('20.6.0-SNAPSHOT');
    expect(tag).toBe('20.6.0-SNAPSHOT');
});
