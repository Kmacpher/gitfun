const fs = require('mz/fs');
const Git = require('nodegit');
const shell = require('shelljs');
const level = require('../libs/level.js');
const chalk = require('chalk');
const Promise = require('bluebird');

const directions = `
In this challenge, we've made a commit for you. But to our frustration, we've made a 
typo! How embarrasing... We really want our commits to be informative and professional. 
${chalk.yellow(`Find a git command that will amend your last commit message. You need to fix the typo
'aded' to 'added' in the last commit message.`)} To check your work, run 'gitfun' or 
'gitfun check'.

`;

const hint = `
Check out the documentation for 'git commit'. There is an option that allows you to
${chalk.yellow(`amend`)} the last commit. 
`


function setup() {
  return Promise.all([level.repoInit(), level.profile()])
  .spread((repo, sig) => {
    return fs.writeFile('file1.js', 'console.log("hi");')
    .then(() => repo.createCommitOnHead(['file1.js'], sig.author, sig.committer, 'aded file1'));
  });
  
}

function checkSolution() {
  return Git.Repository.open('./')
    .then(repo => {
      return repo.getMasterCommit()
      .then(commit => /added/.test(commit.messageRaw()))
    })
    .catch(console.error)
}

module.exports = {
  directions,
  hint,
  setup,
  checkSolution
}