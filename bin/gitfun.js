#!/usr/bin/env node

var program = require('commander');
var cli = require('../libs/cli');


program
  .version('0.0.1')
  .usage('[options] <file ...>')
  .option('-c, --check', 'Check your current work', cli.check)
  .option('-r, --reset [level]', 'reset the current level, or to a previous level', cli.reset)
  .option('-h, --hint', 'Get a hint', cli.hint)
  .option('-p, --play', 'Get directions, and start the game!', cli.main, {isDefault: true})
  .parse(process.argv);




//if no arg, calls start
//both should give the directions

// if(process.argv[2]) methods[process.argv[2]]();
// else methods.main();

