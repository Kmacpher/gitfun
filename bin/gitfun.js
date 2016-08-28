#!/usr/bin/env node

const Git = require("nodegit");
const fs = require("mz/fs");
const rimraf = require('rimraf');
const author = Git.Signature.now('Karen', 'karen@fullstackacademy.com');
const committer = Git.Signature.now('Karen', 'karen@fullstackacademy.com');


function main() {
    //gives directions
    //if not repo, calls reset and starts
    directions();
    fs.exists('workshop/')
    .then(exists => {
        if(!exists) return reset();
    })
    .catch(console.error);

}

function check() {
    return fs.exists('workshop/file3')
    .then(exists => {
        exists ? correct() : incorrect();
    })
}

function correct() {
    console.log("\n   Wooo! You completed this git challenge! Resetting now...\n")
    reset();
}

function incorrect() {
    console.log("\n   Sorry, that's not correct. See a hint using 'node gitfun hint', and reset the level with 'node gitfun reset'\n");
}

function hint() {
    console.log('\n   Check out the `git reflog` command\n')
}

function directions() {
    var directions = 
    `\n    Oops! 

    You decided to delete your latest commit by running \`git reset --hard HEAD^\`.
    But then your partner tells you that the commit was super duper important and that you need it back. 
    
    Womp Womp.
    
    Restore the deleted commit using git. When you are done, run 'node gitfun check'\n`;
    console.log(directions);
}
function reset() {
    return createWorkshop()
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
        console.log('\n   The challenge has been set up!\n')
    })
    .catch(console.error);

}

function help() {
    //gives commands that you can run
}


var methods = {
    main,
    check,
    hint,
    reset
}

function createWorkshop() {
    return fs.exists('workshop/')
    .then(exists => {
        if(exists) return promisyRmdir('workshop/');
        else return exists;
    }).then(() => fs.mkdir('workshop/'))
    .then(() => fs.open('workshop/file1', 'w'))
    .then(() => fs.open('workshop/file2', 'w'))
    .then(() => fs.open('workshop/file3', 'w'))
    .catch(console.error);
}

function promisyRmdir(filepath) {
	return new Promise(function (resolve, reject) {
		rimraf(filepath, function (err) {
			if (err) reject(err);
			else resolve();
		});
	});
}


//if no arg, calls start
//both should give the directions

if(process.argv[2]) methods[process.argv[2]]();
else methods.main();

