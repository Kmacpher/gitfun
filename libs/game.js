
const fs = require("mz/fs");
const promisify = require('promisify-node');
const promptStart = require('prompt').start;
const promptGet = promisify(require('prompt').get);
const path = require('path');
const levelList = require('./levelList');
const format = require('./format');
const chalk = require('chalk');

const level = require('./level.js');

function start() {
  console.log(format.welcome)
  promptStart();

  return promptGet([{
    name: 'consent',
    description: 'Do you want to create a new Gitfun projet? (Y/n)'
    },{
      name: 'allow',
      description: 'Do you allow Gitfun to create temporary folders in this directory when needed? (Y/n)'
    }]).then(results => {
    if (/^[y|Y](es)?$/.test(results.consent) && /^[y|Y](es)?$/.test(results.allow)) {
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
         console.log('Your Gitfun project has been created in this directory. \nChange directory into your gitfun_workshop and run `gitfun`')
    })
    .catch(console.error);
}

function runLevel() {
  return level.getProfileData()
  .then(data => {
    if(levelList[data.phase].length < data.currentLevel) {
      console.log('There are no more levels to play! Use \'gitfun reset 1\' to return to the beginning of the game.');
      return Promise.resolve();
    }
    else {
      return level.getLevelObj()
      .then(levelObj => {
        if(!data.setup) {
          return level.reset(levelObj.currentLevel)
        } else check(levelObj); //TODO Should runLevel even run check? should I make students check manually?
      })
    }
  })
}

function check(levelObj) {
  console.log('Checking your solution...');
  return levelObj.checkSolution()
  .then(result => result ? correct(levelObj) : incorrect(levelObj));
}

function correct(levelObj) {
  console.log(chalk.green("\nWooo! You completed this git challenge! ") + "Run `gitfun` to proceed to the next level.\n");
  return level.getProfileData()
  .then((data) => {
    //let levelName = levelList[data.phase][data.currentLevel-1];
    let levelNo = data.currentLevel;
    if(levelNo > data.lastLevelCompleted) data.lastLevelCompleted = levelNo;
    data.currentLevel += 1;
    data.setup = false;
    return level.writeProfileData(data)
  }).catch(console.log)
}

function incorrect(levelObj) {
  console.log(chalk.red("\nSorry, that's not the correct solution. ") + "See a hint using 'gitfun hint', \nand reset the level with 'node gitfun reset'\n");
  console.log(levelObj.directions);
}

function directions() {
  level.getLevelObj()
  .then(levelObj => console.log(levelObj.directions));
}

function hint() {
  return level.getLevelObj()
  .then(levelObj => console.log(levelObj.hint));
}

module.exports = {
  directions,
  check,
  hint,
  start,
  runLevel
}

//TODO put all the text in a module, can randomize it, add more direction
//TODO replace + with template strings

