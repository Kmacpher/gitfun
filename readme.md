##GitFun

GitFun is an interactive git workshop following the style of [githug](https://github.com/Gazler/githug). GitFun is geared towards understanding the git workflow in a team, and how to deal with common problems and errors.

### Setup

Note: This workflow is subject to change as the project grows.

```sh
git clone https://github.com/kmacpher/gitfun
cd gitfun
npm link
# Now from any directory, you can run gitfun as a command line tool:
gitfun
cd gitfun_workshop
```

*NOTE: if you get an error `cannot find OpenSSL or Libgcrypt`, run `xcode-select --install` and then try `npm link` again.*

### Running

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
`gitfun reset` | Reset the current challenge to its original state
`gitfun check` | Check your solution (note you can run `gitfun` instead)
