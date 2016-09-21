const fs = require('mz/fs');
const Git = require('nodegit');
const level = require('../libs/level.js');

const levelNo = 2;

const directions = `Oops! 

    You decided to delete your latest commit by running \`git reset --hard HEAD^\`.
    But then your partner tells you that the commit was super duper important and that you need it back. 
    
    Womp Womp.
    
    Restore the deleted commit using git. When you are done, run 'gitfun check' to check your work.`;

const hint = `Check out the 'git reflog' command\n`;

function setup() {
  return level.profile()
  .then(sig => {
    return fs.open('./file1', 'w')
    .then(() => fs.open('./file2', 'w'))
    .then(() => fs.open('./file3', 'w'))
    .then(() => level.repoInit())
    .then(repo => {
      return repo.createCommitOnHead(['file1'], sig.author, sig.committer, 'file1')
      .then(() => repo.createCommitOnHead(['file2'], sig.author, sig.committer, 'file2'))
      .then((file2_OID) => {
        return repo.createCommitOnHead(['file3'], sig.author, sig.committer, 'file3')
        .then(() => repo.getCommit(file2_OID))
        .then((OID) => Git.Reset.reset(repo, OID, Git.Reset.TYPE.HARD))
      })
    })
  }).then(() => {
    console.log('The challenge has been set up!')
  })
  .catch(console.error);
}

function checkSolution() {
  //TODO also should check that you are on master? (didn't just checkout)
  //TODO should have unique content so they can't cheat with touch
  return fs.exists('./file3')
}

module.exports = {
  levelNo, //num
  directions, //str
  hint, //str
  setup, //fn 
  checkSolution  //fn
}