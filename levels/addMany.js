const fs = require('mz/fs');
const Git = require('nodegit');
const level = require('../libs/level.js');
const chalk = require('chalk');

const levelNo = 12;

const directions = `
Remember when you used 'git add' to add a single file to the staging area? What would you
do if you needed to add many different files, and they were all in different directories?
Adding each file individually by name would be a huge hassle! Thankfully, there are ways to
add many files at once without adding them by name.

In this repository, there are 100 files that need to be added to the staging area.
${chalk.yellow(`Use the 'git add' command to add all the files to the staging area 
at one time`)}. You can use 'git status' to confirm that your file has been added 
to the staging area. To check your work, run 'gitfun' or 'gitfun check'.
`;

const hint = `
Is there an easy way that you could add the entire current directory?

Check out the docs for 'git add' here: https://git-scm.com/docs/git-add. Remember that
' . ' is often used to specify the current directory.
`;

function setup() {
  return level.repoInit()
  .then(() => {
    for(var i=0; i<100; i++) {
      fs.writeFile(`addThisFile${i}.js`, 'console.log("hi");')
    }
  })
}

function checkSolution() {
  return Git.Repository.open('./')
  .then(repo => repo.getStatus())
  .then(statuses => {
    let count = statuses.filter(elem => {
      return elem.inIndex();
    }).length;
    return count === 100 ? true : false;
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
