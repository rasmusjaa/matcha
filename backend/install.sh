#!/bin/bash

brew update ;
brew install postgres ;
brew install libpq ;
brew link --force libpq ;
ln -sfv /usr/local/opt/postgresql/*.plist ~/Library/LaunchAgents ;

# ADD TO ZSHRC TO MAKE PERMANENT open ~/.zshrc

postgres --version ;
psql --version ;

launchctl load ~/Library/LaunchAgents/homebrew.mxcl.postgresql.plist ;
sleep 2 ;
createuser -s postgres ;
createdb -O postgres postgres
# launchctl unload ~/Library/LaunchAgents/homebrew.mxcl.postgresql.plist


# node install.js
