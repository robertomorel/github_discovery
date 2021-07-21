#!/bin/bash

npm install -g yarn

echo ">>> Installing Dependencies"

echo ">>> Web"
yarn install

echo ">>> Running Projects"
yarn start &
