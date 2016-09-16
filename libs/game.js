
const fs = require("mz/fs");
const promisify = require('promisify-node');
const rmdir = promisify(require('rimraf'));
const prompt = promisify(require('prompt'));
const Git = require('nodegit');
const path = require('path');

const level = 'reflog' //get from .gitfun if exists <= this should be in an iffee or something, also should be in the level.js
const levelObj = require('../levels/'+level+'.js');

function start() {
    prompt.start();

    prompt.get([{
        name: 'consent',
        description: 'Do you want to create a new Gitfun projet? (Y/n)'
    }]).then(results => {
        if (/^[y|Y](es)?$/.test(results.consent)) {
            return makeProfile()
        } else {
            console.log('Gitfun project was not created');
        }
    }).catch(console.error);
}

function makeProfile() {
     return fs.mkdir('./gitfun_workshop')
        .then(() => fs.readFile(path.join(__dirname, 'startingProfile.json'), 'utf8'))
        .then(data => {
            data = JSON.parse(data);
            prompt.start();
            return prompt.get([{
                name: 'name',
                description: 'What is your name?'
            }, {
                name: 'email',
                description: 'What is your email?'
            }]).then(results => {
                console.log('Generating your Gitfun profile...');
                data.name = results.name;
                data.email = results.email;
                return fs.writeFile('gitfun_workshop/.gitfun_profile.json', JSON.stringify(data, null, 2))
            })
        })
        .then(() => {
            console.log('Your Gitfun project has been created in this directory. Change directory into your gitfun_workshop and run `gitfun`')
        })
        .catch(console.error);
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

