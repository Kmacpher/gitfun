//play game is in here
//game interacting with the level, get current level etc

const fs = require("mz/fs");
const rimraf = require('rimraf');

const level = 'reflog' //get from .gitfun if exists <= this should be in an iffee or something
const levelObj = require('../levels/'+level+'.js');

function start() {
    //gives directions
    //if not repo, calls reset and starts

    //create project and create .gitfun startng at 1
    
    //ask for email and name for commits
    //then call game.reset(1)
    console.log('game started');
    // directions();
    // fs.exists('workshop/')
    // .then(exists => {
    //     if(!exists) return reset();
    // })
    // .catch(console.error);

}

function runLevel() {

}

function check() {
    levelObj.check() ? correct() : incorrect();
    //if timeswrong > 2, hint();

    //checks using level obj, if wrong 3 times, gives hint
}

function reset(level) {

}

function correct() {
    console.log("\n   Wooo! You completed this git challenge! Next!\n")
    reset(levelObj.num + 1); //will reset to next level, or say they are completed
}

function incorrect() {
    console.log("\n   Sorry, that's not correct. See a hint using 'node gitfun hint', and reset the level with 'node gitfun reset'\n");
}

function directions() {
    console.log(levelObj.directions);
}

function hint() {
    console.log(levelObj.hint);
}

module.exports = {
    check,
    hint,
    start
}

