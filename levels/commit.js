const fs = require('mz/fs');
const Git = require('nodegit');
const level = require('../libs/level.js');
const chalk = require('chalk');

const levelNo = 3;

const directions = `
Now that you know how to add a file to the staging area, let's learn how to commit
the file. A commit in Git is like a current snapshot of the file at that time. Once
you've made a commit, you can always return to the version of the file that is held
inside a particular commit. In this challenge, ${chalk.yellow(`add the file to the staging area, and
then commit the file permanently to your git directory`)}. To check your work, run 'gitfun'
or 'gitfun check'.
`;

const hint = `
Go check out the docs online! All commits need a commit message. When you use the
'git commit' command, your default text editor will be opened and you'll be asked to give a
commit message. It's best to make this message as descriptive as possible! You can use the -m
flag with the commit command to add the message from the command line.`;

function setup() {
  return level.repoInit()
  .then(() => fs.writeFile('addThisFile.js', 'console.log("hi");'))

}

function checkSolution() {
  return Git.Repository.open('./')
  .then(repo => {
    if(!repo.isEmpty()) {
      return repo.getStatus()
      .then(statuses => {
        if(!statuses.length) return true;
        else return false;
      })
    }
    else return false;
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
