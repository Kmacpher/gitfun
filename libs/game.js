//play game is in here
//game interacting with the level, get current level etc

const fs = require("mz/fs");
const promisify = require('promisify');
const rmdir = promisify.object(require('rimraf'));
const prompt = require('prompt');
const Git = require('nodegit');
const path = require('path');

const level = 'reflog' //get from .gitfun if exists <= this should be in an iffee or something
const levelObj = require('../levels/'+level+'.js');

function start() {

    //create project and create .gitfun startng at 1
    //console.log('Would you like to create a new project? (Y/n)')
    prompt.start();
    prompt.get([{
        name: 'consent',
        description: 'Do you want to create a new Gitfun projet? (Y/n)'
    }], function (err, result) { 
        if(err) throw err;
        if (/^[y|Y](es)?$/.test(result.consent)) {
            return makeProfile()
            .then(() => runlevel(1))
        } else {
            console.log('Gitfun project was not created');
        }
    });
    

}

function makeProfile() {
     //create folder
    //  console.log(__dirname);
    //  console.log(process.argv)
     return fs.mkdir('./gitfun_workshop')
        .then(() => fs.readFile(path.join(__dirname, 'startingProfile.json'), 'utf8'))
        .then(data => fs.writeFile('gitfun_workshop/.gitfun_profile.json', data))
        .catch(console.error);
        
    //     .catch(console.error);
     //create 
     //ask for email and name for commits
     //success message - tell user to move into new project and run gitfun play
}

function runLevel() {
 console.log('running level')
}

function check() {
    levelObj.check() ? correct() : incorrect();
    //if timeswrong > 2, hint();

    //checks using level obj, if wrong 3 times, gives hint
}

function reset(level) { ///hmmm. this won't work. will mostly be run inside the folder. 
    return rmdir('gitfun_workshop/')
    .catch(console.error)
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
    start, 
    reset
}

