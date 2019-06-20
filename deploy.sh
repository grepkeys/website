#!/usr/bin/env bash

# Get us into the root of the project
projroot=$(git rev-parse --show-toplevel)
cd $projroot

# We stash (but only if there are unstaged changes) to make sure the version of
# the website committed to grepkeys.github.io matches what the website looked
# like as of the last commit.
if ! git diff-index --quiet HEAD --; then
  git stash --include-untracked --keep-index > /dev/null
fi

# Clear out public/ before generating its contents again with Hugo
#
# For some reason it helps to empty out the directories that have fingerprinted
# content first, but I am not sure why _at all_. How is that meant to help at
# all?! But it does prevent having multiple versions of a fingerprinted file,
# only one of which is actually being used.
rm "public/"{"scss","js"}/*
rm -rf "public/*"
hugo --minify > /dev/null

# Restore any unstaged changed that were removed by the git stash earlier
if ! git diff-index --quiet HEAD --; then
  git stash pop > /dev/null
fi

cd "public"
git add . > /dev/null
git commit --message "Rebuilding site $(date)" > /dev/null
git push --force origin master > /dev/null
