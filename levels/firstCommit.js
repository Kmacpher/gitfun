const fs = require('mz/fs');
const Git = require('nodegit');
const level = require('../libs/level.js');

const levelNo = 2;

const directions = `Now that you'd made your first Git repository, you should write some content!
 We've done so for you: There is a new file with some code inside. Use the 'git add' command to add the
 file to the staging area. Then use the 'git commit' command to make a commit of the file. Look each command
 up in the docs to see exactly how they should be called. When you've made your first commit, run gitfun to check`;

const hint = `Docs.. go look at them. You can use the -m flag with the commit command if you don't want to open up a text editor`;

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