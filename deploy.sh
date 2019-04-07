#!/usr/bin/env bash

echo -e "\e[0;32mDeploying updates to GitHub...\e[0m"

rm -r public/*
hugo

cd public
git add . > /dev/null

msg="Rebuilding site $(date)"
git commit -m "$msg" > /dev/null

git push origin master > /dev/null
cd ..
