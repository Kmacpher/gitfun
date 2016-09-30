const fs = require('mz/fs');
const Git = require('nodegit');
const level = require('../libs/level.js');
const chalk = require('chalk');

const levelNo = 1;

const directions = `
Let's start a new project! First, you need to make a new git repository for
the project. ${chalk.yellow('Initialize a new git repository')}, and then run 'gitfun' again
to check your solution.
`;

const hint = `Check out the 'git init' command\n`;

function setup() {
  return fs.writeFile('./.gitignore', '.gitfun_profile.json')
  .then(() => console.log('The challenge has been setup!'));
}

function checkSolution() {
  return fs.exists('./.git')
}

module.exports = {
  levelNo, //num
  directions, //str
  hint, //str
  setup, //fn
  checkSolution  //fn
}

//TODO a repo/git utils module
