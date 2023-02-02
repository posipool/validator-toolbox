#!/bin/bash

# system updates
sudo apt-get update -y
sudo apt-get upgrade -y

# Install git, nvm, npm and nodejs latest version
sudo apt-get install git -y
curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash
source ~/.nvm/nvm.sh
nvm install --lts
nvm use --lts

# Install validator toolbox
git clone https://github.com/posipool/validator-toolbox.git/
npm i --prefix validator-toolbox
npm run build --prefix validator-toolbox
rm -r validator-toolbox/node_modules
npm i --production --prefix validator-toolbox
echo successfully installed
echo
echo To start run the command:
echo 'sudo echo && npm start --prefix validator-toolbox'
