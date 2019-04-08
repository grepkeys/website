#!/usr/bin/env bash

# Get us into the root of the project
cd $(git rev-parse --show-toplevel)
origpwd=$(pwd)

# We stash (but only if there are unstaged changes) to make sure the version of
# the website committed to grepkeys.github.io matches what the website looked
# like as of the last commit.
if ! git diff-index --quiet HEAD --; then
  git stash --include-untracked --keep-index
fi

rm -r public/*
hugo > /dev/null

if ! git diff-index --quiet HEAD --; then
  git stash pop
fi

cd public
git pull > /dev/null
git add . > /dev/null

msg="Rebuilding site $(date)"
git commit -m "$msg" > /dev/null

git push origin master > /dev/null
cd "$origpwd"
