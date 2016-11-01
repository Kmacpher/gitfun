const fs = require('mz/fs');
const Git = require('nodegit');
const level = require('../libs/level.js');
const chalk = require('chalk');

const directions = `
In the last level, you learned how to add entire directories by giving the relative 
or direct path to that directory. For example, I often use 'git add .' to add all
changes (additions or removals) in the current directory. You could also add all the 
changes in a specific directory using 'git add directory/'.

In this repository, there are 100 files that need to be added to the staging area.
However, we only want to add those that end in '.js'. So now we need to incorporate
${chalk.yellow('matching')} into our 'git add' command. ${chalk.yellow(`Use the 'git add' command to add 
only the files that end in '.js'.`)} You can use 'git status' to confirm that your file 
has been added to the staging area. To check your work, run 'gitfun' or 'gitfun check'.
`;

const hint = `
'git add' supports ${chalk.yellow(`Fileglobs`)} which allow you to add all matching files.

Check out the docs for 'git add' here: https://git-scm.com/docs/git-add to see an example.
`;

function setup() {
  return level.repoInit()
  .then(() => {
    for(let i=0; i<65; i++) {
      fs.writeFile(`addThisFile${i}.js`, 'console.log("hi");');
    }
    for(let i=0; i<35; i++) {
      fs.writeFile(`addThisFile${i}.html`, '<h1>Hello World</h1>');
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
    return count === 65 ? true : false;
  }).catch(console.error)
}

module.exports = {
  directions, //str
  hint, //str
  setup, //fn
  checkSolution  //fn
}

//TODO a repo/git utils module
