
const fs = require("mz/fs");
const game = require('./game.js');
const level = require('./level.js');

function check() {
  game.check();
}

function hint() {
  game.hint()
}

function resetUpdateProfileHelper(levelNo) {
  levelNo = parseInt(levelNo, 10);

  return level.getProfileData()
  .then(data => {
    if(levelNo > data.lastLevelCompleted + 1) {
      throw "You haven't completed that level yet. You need to complete the previous levels first! Run `gitfun reset 0` to move to the last uncompleted level."
    } else if(levelNo === 0) {
      levelNo = data.lastLevelCompleted + 1;
    }
    data.currentLevel = levelNo;
    return data;
  })
  .then(level.writeProfileData)
  .catch(console.error);
}

function reset(levelNo) {
  return (levelNo.length
    ? resetUpdateProfileHelper(levelNo)
    : Promise.resolve())
  .then(() => level.reset())
  .catch(console.error);
}

function main() {
  fs.exists('.gitfun_profile.json')
  .then(exists => {
    if(exists) return game.runLevel();
    else {
      return fs.exists('./gitfun_workshop')
      .then(exists => {
        if(exists) return console.log('Please move into the gitfun_workshop directory and run `gitfun` again');
        else return game.start();
      })
    }
  })
  .catch(console.error)

}

module.exports = {
  check,
  hint,
  reset,
  main
}