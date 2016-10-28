const fs = require('mz/fs');
const Git = require('nodegit');
const shell = require('shelljs');
const level = require('../libs/level.js');
const chalk = require('chalk');
const Promise = require('bluebird');

const levelNo = 15;

const directions = `
Well, we're just making mistakes all over the place! Thankfully, we're not alone, and it's easily fixed!
In this level, we've made a commit, and then just realized we missed a small change. We'd really like 
the small change to be in the last commit, rather than have to make a new commit. ${chalk.yellow(`Add the new
change to the staging area, and figure out how to add the change to the last commit. You don't want to
create a new commit!`)}. To check your work, run 'gitfun' or 'gitfun check'.

`;

const hint = `
The solution for this level is very similar (*cough* identical *cough*) to the solution to the last level. You can add new files or file changes to commits just like you would change the as the commit 
message! You can even change the commit message at the same time!
`;


function setup() {
  return Promise.all([level.repoInit(), level.profile()])
  .spread((repo, sig) => {
    return fs.writeFile('addedToCommit.js', 'console.log("hi");')
    .then(() => fs.writeFile('addMeToo.js', 'console.log("hi");'))
    .then(() => repo.createCommitOnHead(['addedToCommit.js'], sig.author, sig.committer, 'added files'));
  });
  
}

function checkSolution() {
  //only one commit, nothing in status, file must exist
  var countBool = parseInt(shell.exec('git rev-list --count master', {silent: true}).stdout, 10) === 1;
  return Git.Repository.open('./')
    .then(repo => Promise.all([repo.getStatus(), fs.exists('addMeToo.js')]))
    .then(arr => !arr[0].length && arr[1] && countBool) //why won't my spread work here?
    .catch(console.error)
}

module.exports = {
  levelNo,
  directions,
  hint,
  setup,
  checkSolution
}