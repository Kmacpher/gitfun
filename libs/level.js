const fs = require("mz/fs");
const Git = require('nodegit');
const del = require('del');

function reset() {
  return del(['./*', '!./gitfun_profile.json', './.git/**'])
  .then(getProfileData)
  .then(data => {
    return require('../levels/'+data.currentLevel+'.js').setup()
    .then(() => {
      data.setup = true;
      return writeProfileData(data);
    })
  })
  .catch(console.error)
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
  return fs.writeFile('./.gitignore', '.gitfun_profile.json')
  .then(() => Git.Repository.init('./', 0))
}

module.exports = {
  repoInit,
  profile,
  getProfileData,
  writeProfileData,
  reset
}