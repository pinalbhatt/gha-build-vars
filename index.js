/* eslint no-console: 0 */
const core = require('@actions/core');
const wait = require('./lib/wait');


// most @actions toolkit packages have async methods
async function run() {
  try {
    const ms = core.getInput('milliseconds');
    console.log(`Waiting ${ms} milliseconds ...`);

    core.debug((new Date()).toTimeString());
    await wait(parseInt(ms, 10));
    core.debug((new Date()).toTimeString());

    core.setOutput('time', new Date().toTimeString());
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
