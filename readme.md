##GitFun

GitFun is an interactive git workshop following the style of [githug](). gitfun is geared towards understanding the git workflow in a team, and how to deal with common problems and errors.

### To run

Note: This workflow is subject to change as the project grows

```
$ git clone https://github.com/kmacpher/gitfun
$ cd gitfun
$ npm link
Then from any directory, you can run gitfun as a command line tool
$ gitfun
```


This will create the git repository 'workshop', and will log a prompt with the challenge. Use git commands to modify the git repository according to the challenge directions.

To see the directions again, run `node gitfun`

To reset the challenge run `node gitfun reset`

To get a hint, run `node gitfun hint`

To check to see if you have solved the challenge, run `node gitfun check`
