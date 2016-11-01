const fs = require('mz/fs');
const Git = require('nodegit');
const level = require('../libs/level.js');
const chalk = require('chalk');

const directions = `
We've learned how to view our remote repositories, and we've learned how to add our own. Right now you have an empty 
repository with a remote repository called 'dummy-remote'. The remote repository has changes which we want to bring 
into our current local repo. To complete this challenge, ${chalk.yellow(`use the 'pull' command in Git to pull the 
contents of the master branch of the remote repository 'dummy-remote' into your local repository.`)} To check your 
work, run 'gitfun'or 'gitfun check'.

`;

const hint = `'git pull' takes two arguments. The first is the remote that you wish to pull from. The second is the 
branch of the remote you wish to pull. For example, a the most common way this command is used is 'git pull origin 
master', since 'origin' is the default remote name. 

Fun note: Git pull is actually shorthand for two commands! It will run 'git fetch' which fetches the code from the 
remote repository, and then 'git merge' which merges the code into the local branch. We will look more at these 
commands later!
`

function setup() {
  return level.repoInit()
  .then(repo => Git.Remote.create(repo, 'dummy-remote', 'https://github.com/Kmacpher/dummy-remote'))
}

function checkSolution() {
  //check for file1, file2, file3
  return Promise.all([fs.exists('file1.txt'), fs.exists('file2.txt'), fs.exists('file3.txt')])
  .then((exists) => {
    //spread would be better, but I don't want to load a module just for that
    if(exists[0] && exists[1] && exists[2]) return true;
    else return false;
  })
  .catch(console.error);

}

module.exports = {
  directions,
  hint,
  setup,
  checkSolution
}