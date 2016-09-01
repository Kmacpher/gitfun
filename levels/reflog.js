const fs = require('fs');
const rimraf = require('rimraf');
const Git = require('nodegit');
const author = Git.Signature.now('Karen', 'karen@fullstackacademy.com');
const committer = Git.Signature.now('Karen', 'karen@fullstackacademy.com');
//these need to be given by user when they start the game, and put in .gitfun

const directions = `Oops! 

    You decided to delete your latest commit by running \`git reset --hard HEAD^\`.
    But then your partner tells you that the commit was super duper important and that you need it back. 
    
    Womp Womp.
    
    Restore the deleted commit using git. When you are done, run 'node gitfun check'`;

const hint = `Check out the 'git reflog' command\n`;

function setup() {
    fs.open('workshop/file1', 'w')
    .then(() => fs.open('workshop/file2', 'w'))
    .then(() => fs.open('workshop/file3', 'w'))
    .then(() => Git.Repository.init('workshop/', 0))
    .then(repo => {
        return repo.createCommitOnHead(['file1'], author, committer, 'file1')
        .then(() => repo.createCommitOnHead(['file2'], author, committer, 'file2'))
        .then((file2_OID) => {
            return repo.createCommitOnHead(['file3'], author, committer, 'file3')
            .then(() => repo.getCommit(file2_OID))
            .then((OID) => Git.Reset.reset(repo, OID, Git.Reset.TYPE.HARD))
        })
    }).then(() => {
        console.log('The challenge has been set up!')
    })
    .catch(console.error);
}

function checkSolution() {
    //return true or false
    return fs.exists('workshop/file3');
}

function promisyRmdir(filepath) { //should just promisify rimraf when required, or this should be in utils
	return new Promise(function (resolve, reject) {
		rimraf(filepath, function (err) {
			if (err) reject(err);
			else resolve();
		});
	});
}

module.exports = {
    directions, //str
    hint, //str
    setup, //fn
    checkSolution  //fn
}