const welcome = `
Welcome to Gitfun! Gitfun is an interactive game that teaches you how to use git
inside your own environment. Each level will present to you a scenario or a problem. 
You must use git to accomplish each task. Gitfun won't teach you all of the git commands necessary
to complete the challenges--it will be up to use to use documentation and smart searching
to find the answers to some of the challenges. 

Here's how it works!

The program will first create a gitfun_workshop directory. All of the levels will
be played inside this directory. Inside that directory, you can run 'gitfun' to play the game,
check your solution, and continue to the next level. You can run 'gitfun reset' to 
reset the environment to the beginning of the level, or to any level you have 
previously completed. 'gitfun check' will check your solution and 'gitfun hint' 
will give you a hint on how to complete the current level.

Okay, let's begin!
`;

//TODO move some of the other text in here, make headers such as 
// ****************
// *  Directions  *
// ****************

module.exports = {
  welcome
}