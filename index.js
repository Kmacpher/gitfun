var program = require('commander');
var cli = require('./libs/cli');

program
  .version('0.0.1')
  .option('-c, --check', 'Check your current work', cli.check)
  .option('-r, --reset <level>', 'reset the current level, or to a previous level', cli.reset)
  .option('-n, --hint', 'Get a hint', cli.hint)
  .option('-p, --play', 'Get directions, and play the game! This is the default command when you run `gitfun` with no arguments.', cli.main)
  .parse(process.argv);

if(process.argv.length === 2) { 
  cli.main();
}