const fs = require('mz/fs');
const Git = require('nodegit');
const level = require('../libs/level.js');

const levelNo = 1;

const directions = `You need to make a new git repository for a project. Make a new repository then run gitfun again to check`;

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