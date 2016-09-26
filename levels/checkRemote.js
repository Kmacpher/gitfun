const fs = require('mz/fs');
const Git = require('nodegit');
const level = require('../libs/level.js');
const promisify = require('promisify-node');
const promptStart = require('prompt').start;
const promptGet = promisify(require('prompt').get);

const levelNo = 6;

const directions = `
If you want others to be able to collaborate with you on your project, you need to learn
how to manage remote repositories. A remote repoistory is a version of your project that
is hosted on the internet, usually on Github.com. We will start with checking to see if we 
have a remote repository. We've created a dummy repository on Github and have added it as 
a remote repository on this projet. To complete this challenge, find out the url of the 
remote repository using 'git remote'. To check your work, run 'gitfun' or 'gitfun check'.
`;

const hint = `
Go check out the docs online! Many command line tools such as git have a -v flag which stands for verbose.
`;

function setup() {
  return level.repoInit()
  .then(repo => Git.Remote.create(repo, 'my-remote', 'https://github.com/Kmacpher/dummy-remote'))
  .then(() => console.log('The challenge has been set up!')); //this line needs to go elsewhere so its not repeated
  
}

function checkSolution() {
  promptStart();
  return promptGet([{
    name: 'answer',
    description: 'What was the url of the remote repository?'
  }]).then(result => {
    if (/dummy-remote/.test(result.answer)) return true;
    else return false;
  }).catch(console.error);
}

module.exports = {
  levelNo, //num
  directions, //str
  hint, //str
  setup, //fn
  checkSolution  //fn
}

//TODO a repo/git utils module