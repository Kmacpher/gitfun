##GitFun

GitFun is an interactive git workshop following the style of [githug](https://github.com/Gazler/githug). GitFun is geared towards understanding the git workflow in a team, and how to deal with common problems and errors. It is a work in progress, and new levels are still being made.

### Setup

```sh
npm install -g gitfun
```

**NOTE: if you get an error `cannot find OpenSSL or Libgcrypt`, run `xcode-select --install` and then try `npm install -g gitfun` again.**

### Running

Run `gitfun` where you would like to set up your gitfun\_workshop project. You will be asked for permission to create the gitfun\_workshop in the current directory.
When the set up is complete, change directory into the newly created directory.

From within the `gitfun_workshop` folder, execute the command:

```sh
gitfun
```

You will see a prompt describing a specific challenge. Use git commands to satisfy the challenge conditions. When you are done, run `gitfun` again to check your work. To help you out, here is a full list of GitFun commands:

Command | Result
--------|-------
`gitfun` | Start the challenge or check your solution
`gitfun directions` | Repeat the current challenge directions
`gitfun hint` | Get a hint on how to solve the current challenge
`gitfun reset` | Reset the current challenge to its original state--You can also reset to a specific level, or to the last level not completed by running `gitfun reset 0`
`gitfun check` | Check your solution (note you can run `gitfun` instead)
`gitfun list` | lists all the completed levels and the currently active level
