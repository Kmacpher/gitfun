const fs = require('mz/fs');
const Git = require('nodegit');
const level = require('../libs/level.js');
const promisify = require('promisify-node');
const promptStart = require('prompt').start;
const promptGet = promisify(require('prompt').get);

const levelNo = 4;

const directions = `
Woo! You've made your first commit! As you continue to save snapshots of your project using 'git commit',
it will be important to be able to see the status of your working directory and your staging area. The 
command 'git status' will show you all the changes that have been stages, changes that haven't, and files 
that aren't being tracked by git. In this challenge, use git status to see how many files are not being
tracked. To check your work, run 'gitfun' or 'gitfun check'.
`;

const hint = `
When you run 'git status', you will see a list of 'Untracked Files'. Report how many files are listed.`;

function setup() {
  return level.repoInit()
  .then(() => fs.writeFile('file1.js', 'console.log("hi");'))
  .then(() => fs.writeFile('file2.js', 'console.log("hi");'))
  .then(() => fs.writeFile('file3.js', 'console.log("hi");'))
  .then(() => fs.writeFile('file4.js', 'console.log("hi");'))
  .then(() => console.log('The challenge has been set up!')); //this line needs to go elsewhere so its not repeated
  
}

function checkSolution() {
  promptStart();
  return promptGet([{
    name: 'answer',
    description: 'How many files are not being tracked?'
  }]).then(result => {
    if (/^[4|four]$/.test(result.answer)) return true;
    else return false;
  }).catch(console.error);
}

module.exports = {
  levelNo, //num
  directions, //str
  hint, //str
  setup, //fn
  checkSolution  //fn
}

//TODO add some of the files to index - some as new files, and others as changed files