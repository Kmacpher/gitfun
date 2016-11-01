const fs = require('mz/fs');
const Git = require('nodegit');
const level = require('../libs/level.js');
const chalk = require('chalk');
const promisify = require('promisify-node');
const promptStart = require('prompt').start;
const promptGet = promisify(require('prompt').get);

const directions = `
When you clone a directory, that remote directory is set at the 'remote' repository for 
your new local repository. ${chalk.yellow(`Use 'git clone' to clone this Github 
repository: https://github.com/Kmacpher/dummy-remote`)}. What is the name of the remote
repository? Run gitfun again to check your work.
`;

const hint = `Remember the 'git remote' command? Use it to find the name of the remote
repository.`;

function setup() {
  return fs.writeFile('./.gitignore', '.gitfun_profile.json')
}

function checkSolution() { //Need to be able to run 'gitfun from inside the cloned child directory, especially moving forwards'
  promptStart();
  return promptGet([{
    name: 'answer',
    description: 'What is the name of the remote repository?'
  }]).then(result => {
    if (/origin/.test(result.answer)) return true;
    else return false;
  }).catch(console.error);
}

module.exports = {
  directions, //str
  hint, //str
  setup, //fn
  checkSolution  //fn
}

//TODO a repo/git utils module