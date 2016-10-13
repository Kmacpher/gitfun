const fs = require("mz/fs");
const Git = require('nodegit');
const del = require('del');
const levelList = require('./levelList');

function reset() {
  return del(['./*', '!./gitfun_profile.json', './.git/**', '../tempGitfunDir'], {force: true})
  .then(getProfileData)
  .then(data => {
    data.setup = false; //necessary in case setup fails
    return writeProfileData(data)
    .then(getLevelObj)
    .then(levelObj => {
      return levelObj.setup()
      .then(() => {
        console.log('The challenge has been setup!')
        data.setup = true;
        return writeProfileData(data);
      })
      .then(() => console.log(levelObj.directions));
    })
  })
  .catch(console.error)
}

function getLevelObj() {
  return getProfileData()
  .then(data => {
    let levelName = levelList[data.phase][data.currentLevel-1]; 
    return require(`../levels/${levelName}.js`);
  })
  .catch(console.error);
}

function getProfileData() {
  //returns promise for data object from .gitfun_profile
  return fs.readFile('./.gitfun_profile.json', 'utf8')
  .then(data => JSON.parse(data))
}

function writeProfileData(dataObj) {
  return fs.writeFile('./.gitfun_profile.json', JSON.stringify(dataObj, null, 2))
}

function profile() {
  //returns promise for sig object for making commits
  return fs.readFile('./.gitfun_profile.json', 'utf8')
  .then(data => JSON.parse(data))
  .then(data => {
    return {
      author: Git.Signature.now(data.name, data.email),
      committer: Git.Signature.now(data.name, data.email)
    }
  })
}

function repoInit() {
  //returns promise for repo
  return fs.writeFile('./.gitignore', '.gitfun_profile.json\n.gitignore')
  .then(() => Git.Repository.init('./', 0))
}

module.exports = {
  repoInit,
  profile,
  getProfileData,
  writeProfileData,
  reset,
  getLevelObj
}