
let phase0 = ['init', 'add', 'commit', 'status', 'log', 'addMany', 'addMatch', 'checkRemote', 'addRemote', 'pull', 'push', 'clone', 'cloneRemote', 'amendCommitMessage', 'amendFile'];
let phase1 = ['reflog']; //checkout, reset, branches, tracking, shash, revert
let phase2 = []; //more with branching and tracking, merging, rebase, testing, workflow

module.exports = [
  phase0, //Foundations
  phase1, //Early Junior Phase
  phase2  //Late Junior Phase
];