const fs = require('mz/fs');
const Git = require('nodegit');
const level = require('../libs/level.js');
const chalk = require('chalk');

const levelNo = 7;

const directions = `
Now that you know how to check if you have any remote repositories, you need to learn how to
add them yourself. You can have multiple remote repositories, but we will start with just making
one. We've created a dummy repository on Github at the url https://github.com/Kmacpher/dummy-remote.
To complete this challenge, ${chalk.yellow(`add this url as a remote repository to the project and name it origin`)}.
To check your work, run 'gitfun' or 'gitfun check'.
`;

const hint = `
Go check out the docs online! The \`git remote add\` command is a good place to start!
`;

function setup() {
  return level.repoInit()
  .then(() => console.log('The challenge has been set up!')); //this line needs to go elsewhere so its not repeated

}

function checkSolution() {
  return Git.Repository.open('./')
  .then(Git.Remote.list)
  .then(list => list.indexOf('origin') > -1)
  .catch(console.error)
}

module.exports = {
  levelNo, //num
  directions, //str
  hint, //str
  setup, //fn
  checkSolution  //fn
}

//TODO a repo/git utils module
