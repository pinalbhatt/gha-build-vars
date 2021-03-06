/* eslint no-unused-vars: 0 */

const wait = (milliseconds) => new Promise((resolve, reject) => {
  if (typeof (milliseconds) !== 'number') {
    reject(new Error('milleseconds not a number'));
  }
  setTimeout(() => resolve('done!'), milliseconds);
});

module.exports = wait;
