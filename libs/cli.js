
const fs = require("mz/fs");
const game = require('./game.js');

function check() {
    game.check();
   
}

function hint() {
    game.hint()
}

function reset(level) {
 //resets from level or to a level based on game
    //if workshop, game.reset(level)
    //else game.start


    // return promisyRmdir('workshop/')
    // .then(() => fs.mkdir('workshop/'))
    // .catch(console.error)

}

function main() {
    fs.exists('.gitfun_profile.json')
    .then(exists => {
        if(exists) return game.runLevel();
        else {
            return fs.exists('./gitfun_workshop')
            .then(exists => {
                if(exists) return console.log('Please move into the gitfun_workshop directory');
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