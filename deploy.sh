#!/usr/bin/env bash

origpwd=$(pwd)

# We stash to make sure the version of the website committed to
# grepkeys.github.io matches what the website looked like as of the last commit.
git stash
rm -r public/*
hugo > /dev/null
git stash pop

cd public
git add . > /dev/null

msg="Rebuilding site $(date)"
git commit -m "$msg" > /dev/null

git push origin master > /dev/null
cd "$origpwd"
