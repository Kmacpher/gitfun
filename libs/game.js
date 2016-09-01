//play game is in here
//game interacting with the level

const fs = require("mz/fs");
const rimraf = require('rimraf');

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

function correct() {
    console.log("\n   Wooo! You completed this git challenge! Resetting now...\n")
    reset();
}

function incorrect() {
    console.log("\n   Sorry, that's not correct. See a hint using 'node gitfun hint', and reset the level with 'node gitfun reset'\n");
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