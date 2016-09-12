#!/usr/bin/env node

var program = require('commander');
var cli = require('../libs/cli');

program
  .version('0.0.1')

program
  .command('check')
  .description('Check your current project')
  .action(function() {
    cli.check();
  })

program
  .command('reset <level>')
  .description('Reset to a specific level')
  .action(function(level) {
    cli.reset(level);
  })

program
  .command('hint')
  .description('Get a hint')
  .action(function() {
    cli.hint();
  })

program
  .command('play')
  .description('Play the game!')
  .action(function() {
    cli.main();
  })

program
  .parse(process.argv);

if(process.argv.length === 2) { //default
  cli.main();
}

  //Maybe all of this should be in index, could also do all with option again.
