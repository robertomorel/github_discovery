#!/bin/bash

npm install -g yarn

echo ">>> Installing Dependencies"

echo ">>> API"
cd api 
yarn install

echo ">>> Web"
cd ../web
yarn install

echo ">>> Running Projects"
echo ">> API"
cd ../api
yarn start &

echo ">> Web"
cd ../web
yarn start &