const fs = require('mz/fs');
const Git = require('nodegit');
const level = require('../libs/level.js');
const chalk = require('chalk');

const levelNo = 2;

const directions = `
Now that you'd made your first Git repository, you should write some content!
We've done so for you: There is a new file with some code inside. ${chalk.yellow(`Use the 'git add <file>'
command to add the file to the staging area`)}. The staging area is a file that stores
information about what will go into your next commit. Any file that you want to commit
must first be added to the staging area. You can use 'git status' to confirm that
your file has been added to the staging area. To check your work, run 'gitfun'
or 'gitfun check'.
`;

const hint = `Go check out the docs online!`;

function setup() {
  return level.repoInit()
  .then(() => fs.writeFile('addThisFile.js', 'console.log("hi");'))

}

function checkSolution() {
  return Git.Repository.open('./')
  .then(repo => repo.getStatus())
  .then(statuses => {
    for(file of statuses) {
      if(file.path() === 'addThisFile.js' && file.inIndex()) return true;
    }
    return false;
  }).catch(console.error)
}

module.exports = {
  levelNo, //num
  directions, //str
  hint, //str
  setup, //fn
  checkSolution  //fn
}

//TODO a repo/git utils module
