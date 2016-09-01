//reset (num)
//default / play
//hint
//check

const Git = require("nodegit");
const fs = require('fs');
const author = Git.Signature.now('Karen', 'karen@fullstackacademy.com');
const committer = Git.Signature.now('Karen', 'karen@fullstackacademy.com');
const game = require('./game.js');

function check() {
    return fs.exists('workshop/file3')
    .then(exists => {
        exists ? game.correct() : game.incorrect();
    })
}

function hint() {
    console.log('\n   Check out the `git reflog` command\n')
}

function reset() {
    return game.createWorkshop()
    .then(() => Git.Repository.init('workshop/', 0))
    .then(repo => {
        return repo.createCommitOnHead(['file1'], author, committer, 'file1')
        .then(() => repo.createCommitOnHead(['file2'], author, committer, 'file2'))
        .then((file2_OID) => {
            return repo.createCommitOnHead(['file3'], author, committer, 'file3')
            .then(() => repo.getCommit(file2_OID))
            .then((OID) => Git.Reset.reset(repo, OID, Git.Reset.TYPE.HARD))
        })
    }).then(() => {
        console.log('\n   The challenge has been set up!\n')
    })
    .catch(console.error);

}

function main() {
    console.log('will run game start or something')
    game.main();

}

module.exports = {
    check,
    hint,
    reset,
    main
}