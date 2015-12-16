#!/bin/bash

# Executing the script from the url
# curl -s https://raw.githubusercontent.com/morgangiraud/ecvd-js/master/finaltest/installscript.sh | bash /dev/stdin name

if [ -z "$1" ]; then
  echo "No argument supplied"
  exit 1
fi

if [ ! -d ~/tmp ]; then
  mkdir ~/tmp
fi
cd ~/tmp

# Xcode
xcode-select --install

which -s brew
if [[ $? != 0 ]] ; then
    /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
else
    brew update
fi
echo "Installing missing utils"
brew install automake curl git wget cask pidof
echo "Upgrading utils"
brew upgrade automake curl git wget cask pidof

echo "Checking for Sublime text"
which -s subl
if [[ $? != 0 ]] ; then  
  brew cask install sublime-text
fi

echo "Checking for Node"
which -s node
if [[ $? != 0 ]] ; then
    brew install node
else
    brew upgrade node
fi

if [ -d ~/tmp/ecvd-js ]; then
  echo "Removing ~/tmp/ecvd-js folder"
  rm -rf ~/tmp/ecvd-js
fi
echo "cloning distant repo"
cd ~/tmp
git clone https://github.com/morgangiraud/ecvd-js.git
cd ecvd-js
git checkout -b $1 && git push -u origin $1
mkdir -p finaltest/$1
cd finaltest/$1
cp -R ../exercices .
subl .
open -a Terminal .
open -a "/Applications/Google Chrome.app" 'https://github.com/morgangiraud/ecvd-js/blob/master/finaltest/finaltest.md'