const fs = require('mz/fs');
const Git = require('nodegit');
const shell = require('shelljs');
const level = require('../libs/level.js');
const chalk = require('chalk');
const del = require('del');
const promisify = require('promisify-node');
const promptStart = require('prompt').start;
const promptGet = promisify(require('prompt').get);

const levelNo = 9;

const directions = `
Being able to pull content from a remote repository is extremely important. But you'll also want to be able to 'push' 
your code to the remote repository as well. Right now you have a repository with a file called 'file1' with a remote 
repository called 'temp-remote'. Our local repository has the most up to date file, and we want our remote repository 
to be caught up to the same point.  To complete this challenge, ${chalk.yellow(`use the 'push' command in Git to push 
the contents of the local repository to the master branch of the remote repository 'temp-remote'.`)} To check your 
work, run 'gitfun'or 'gitfun check'.

`;

const hint = `
Like 'git pull', 'git push' takes two arguments. The first is the remote that you wish to push to. The second is the 
branch of the remote you wish to push to. For example, a the most common way this command is used is 'git push origin 
master', since 'origin' is the default remote name.  
`

function setupHelper(repo) {
  return level.profile()
  .then(sig => {
    return fs.writeFile('file1.js', 'console.log("hi");')
    .then(() => repo.createCommitOnHead(['file1.js'], sig.author, sig.committer, 'added file1'))
  })
  .then(() => fs.mkdir('../tempGitfunDir'))
  .then(() => {
    shell.cd('../tempGitfunDir');
    shell.exec('git init', {silent: true});
    shell.exec('git config receive.denyCurrentBranch ignore'); //let's me push to the repo, even though it fucks with the working directory
    return Git.Remote.create(repo, 'temp-remote', process.cwd());
  })
  .then(() => {
    shell.cd('../gitfun_workshop')
    shell.exec('git push --set-upstream temp-remote master', {silent: true});
    //now user doens't have to use -u or set-upstream, that will be in a later lesson
  })
  .then(() => fs.writeFile('file2.js', 'console.log("howdy");'))
  .then(() => level.profile())
  .then((sig) => repo.createCommitOnHead(['file2.js'], sig.author, sig.committer, 'added file2'))
  
}

function setup() {
  promptStart();
  return promptGet([{
    name: 'consent',
    description: 'This challenge requires an additional directory. Can Gitfun create a temporary repository in this location\'s parent directory? (Y/n)'
  }]).then(result => {
    if (/^[y|Y](es)?$/.test(result.consent)) return true;
    else return false;
  }).then(answer => {
    if(answer) {
      return level.repoInit()
      .then(setupHelper)
    }
    else throw "The level could not be set up";
  })
}

function checkSolution() {
  //check for file1, file2, file3
  console.log(process.cwd())
  return Git.Repository.open('../tempGitfunDir')
    .then(repo => repo.getHeadCommit())
    .then(commit => commit.messageRaw())
    .then(str => /file2/.test(str))
}

module.exports = {
  levelNo,
  directions,
  hint,
  setup,
  checkSolution
}