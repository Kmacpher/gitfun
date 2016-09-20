
const fs = require("mz/fs");
const game = require('./game.js');
const level = require('./level.js');

function check() {
  game.check();
   
}

function hint() {
  game.hint()
}

function reset(levelNo) {
  level.getProfileData()
  .then((data) => {
    data.currentLevel = levelNo;
    return level.writeProfileData(data);
  })
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