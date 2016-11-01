const fs = require('mz/fs');
const Git = require('nodegit');
const level = require('../libs/level.js');
const chalk = require('chalk');

const directions = `
Great job so far! Let's go back and learn a bit more in depth about each command. The first challenge you 
completed was learning how to run 'git init'. Often though, you'll be starting with code that someone else 
has already written! Software development is all about collaboration! Research the 'git clone' command, and
how to use it to make a copy of a remote repository on your local machine. Usually, we are cloning a repo from
Github. Cloning does a few things: 
      -A git repository is set up
      -All the code from the repository link is copied to your local machine
      -The local repository gets a remote that points to the repo it was cloned from

Once you have a good understanding, ${chalk.yellow(`use 'git clone' to clone this Github 
repository: https://github.com/Kmacpher/dummy-remote`)}, and then run 'gitfun' again
to check your solution.
`;

const hint = `Check out the 'git clone' command\n. Make sure that when you clone the repository,
you are not giving the new folder a new name. Please leave it as the default.`;

function setup() {
  return fs.writeFile('./.gitignore', '.gitfun_profile.json')
}

function checkSolution() {
  return Git.Repository.open('./dummy-remote')
  .then(Git.Remote.list)
  .then(list => list.indexOf('origin') > -1)
  .catch(console.error)
}

module.exports = {
  directions, //str
  hint, //str
  setup, //fn
  checkSolution  //fn
}

//TODO a repo/git utils module