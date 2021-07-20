#!/bin/bash

npm install -g yarn

echo ">>> Installing Dependencies"

echo ">>> Web"
cd web
yarn install

echo ">>> Running Projects"
echo ">> Web"
yarn start &