# ecvd-php
Lessons for the ECV Digital school - JS / Algorithmy

## Setup
Before starting you need to setup your environment.
**(Mac OSX)**

### Pre-requisites
- Launch a terminal
- Install [brew](http://brew.sh/)
- Update brew: `brew update` (If you already had brew, upgrade: `brew upgrade`)
- Install [GIT](https://git-scm.com/): `brew install git`
  - you can add [git-extras](https://github.com/tj/git-extras): `brew install git-extras`
- Install [sublime text 3](http://www.sublimetext.com/3) ([Atom](https://atom.io/) is also a good choice)
- Install [package control](https://packagecontrol.io/installation) for sublime text 3
- Thanks to the package control install those modules:
  - [SublimeLinter](http://sublimelinter.readthedocs.org/en/latest/installation.html)
  - SublimeLinter-php
  - Goto Documentation
- Link your sublime text in the command line here: https://www.sublimetext.com/docs/3/osx_command_line.html
- Add some completions: `brew install bash-completion`

### JS
- Install node 5.1: `brew update && brew install node`

Check your installation: 
- `node -v`
- `npm -v`

## Goal
Understanding all what makes javascript a unique language nowadays.

## Gift
For your own sanity, add this to your .bash_profile file
```bash
parse_git_branch() {
    git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/ (\1)/'
}
export PS1="\u@\h \W\[\033[32m\]\$(parse_git_branch)\[\033[00m\] $ "
```
