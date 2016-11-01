const fs = require('mz/fs');
const Git = require('nodegit');
const level = require('../libs/level.js');
const promisify = require('promisify-node');
const promptStart = require('prompt').start;
const promptGet = promisify(require('prompt').get);
const chalk = require('chalk');

const directions = `
'git status' is a great tool, but it doesn't tell us anything about changes we have already commited.
To see a history of all our commits, we must use the command 'git log'. log tells us when the commit
was made, the commit message, the commit's unique ID, and information about the author.
This challenge sets up a history of commits that you can access with 'git log' ${chalk.yellow(`Report the commit message
of the commit that was authored by Karen Mac`)}. To check your work, run 'gitfun' or 'gitfun check'.
`;

const hint = `
When you run 'git log', you will see a list of commits and related information! Included in the
information is the author of that change. Report the message of the commit authored by Karen Mac.
`;

let oid;

function setup() {
  var altSig = {
      author: Git.Signature.now('Karen Mac', 'yay@yay.com'),
      committer: Git.Signature.now('Karen Mac', 'yay@yay.com')
  }
  return level.repoInit() //I should probably use spread here
  .then(repo => {
    return level.profile()
    .then(sig => {
      return fs.writeFile('file1.js', 'console.log("hi");')
      .then(() => fs.writeFile('file2.js', 'console.log("hi");'))
      .then(() => fs.writeFile('file3.js', 'console.log("hi");'))
      .then(() => fs.writeFile('file4.js', 'console.log("hi");'))
      .then(() => repo.createCommitOnHead(['file1.js'], sig.author, sig.committer, 'added file1'))
      .then(() => repo.createCommitOnHead(['file2.js'], altSig.author, altSig.committer, 'added file2'))
      .then(() => repo.createCommitOnHead(['file3.js'], sig.author, sig.committer, 'added file3'))
      .then(() => repo.createCommitOnHead(['file4.js'], sig.author, sig.committer, 'added file4'))
    })
  })

}

function checkSolution() {
  promptStart();
  return promptGet([{
    name: 'answer',
    description: 'What was the commit message of the commit made by Karen Mac?'
  }]).then(result => {
    if (/^added file2$/.test(result.answer)) return true;
    else return false;
  }).catch(console.error);
}

module.exports = {
  directions, //str
  hint, //str
  setup, //fn
  checkSolution  //fn
}
