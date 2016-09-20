
const fs = require("mz/fs");
const promisify = require('promisify-node');
const promptStart = require('prompt').start;
const promptGet = promisify(require('prompt').get);
const path = require('path');

const level = require('./level.js');

function start() {
  promptStart();

  promptGet([{
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
      promptStart();
      return promptGet([{
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
  return level.getProfileData()
  .then(data => {
    let levelObj = require('../levels/'+data.currentLevel+'.js');
    if(!data.setup) {
      return level.reset(levelObj.currentLevel)
      .then(() => {
        data.setup = true;
        return level.writeProfileData(data);
      }).then(() => console.log(levelObj.directions));
    } else check(levelObj);
  });
}

function check(levelObj) {
  levelObj.checkSolution()
  .then(result => result ? correct(levelObj) : incorrect(levelObj));
}

function correct(levelObj) {
  console.log("\n   Wooo! You completed this git challenge! Run `Gitfun` to proceed to the next level.\n");
  return level.getProfileData()
  .then((data) => {
    data.lastLevelCompleted = levelObj.levelNo;
    data.currentLevel = levelObj.levelNo + 1;
    data.setup = false;
    return level.writeProfileData(data)
  }).catch(console.log)
}

function incorrect(levelObj) {
  console.log("\n   Sorry, that's not the correct solution. See a hint using 'node gitfun hint', and reset the level with 'node gitfun reset'\n");
  console.log(levelObj.directions);
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
  runLevel
}

