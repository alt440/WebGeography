#!/bin/bash
# make sure to run this with root privileges
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6
sudo apt-get update
sudo apt-get install -y mongodb
sudo apt-get install nodejs
sudo apt-get install npm
npm install
node server.js
