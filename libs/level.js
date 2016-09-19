const fs = require("mz/fs");
const Git = require('nodegit');
const del = require('del');

function reset(levelNo) {
  return del(['./*', '!./gitfun_profile.json', './.git/**'])
  .then(getProfileData)
  .then(data => {
    if(levelNo) data.currentLevel = levelNo;
    data.setup = false;
    return data;
  })
  .then(writeProfileData)
  .catch(console.error)
}

function getProfileData() {
  return fs.readFile('./.gitfun_profile.json', 'utf8')
  .then(data => JSON.parse(data))
}

function writeProfileData(dataObj) {
  return fs.writeFile('./.gitfun_profile.json', JSON.stringify(dataObj, null, 2))
}

function profile() {
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