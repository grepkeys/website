#!/usr/bin/env bash

# Get us into the root of the project
projroot=$(git rev-parse --show-toplevel)
cd $projroot

# We stash (but only if there are unstaged changes) to make sure the version of
# the website committed to grepkeys.github.io matches what the website looked
# like as of the last commit.
if ! git diff-index --quiet HEAD --; then
  git stash --include-untracked --keep-index
fi

# I never run `hugo` by itself during normal development -- only `hugo server`,
# so the only reason the public folder would be different to GitHub is if others
# have made changes. Pull in these changes before running Hugo to avoid merge
# conflicts.
cd public
# Switch to master in case branches have been switched
git checkout master
git pull > /dev/null
cd $projroot
rm -r public/*
hugo --minify > /dev/null

if ! git diff-index --quiet HEAD --; then
  git stash pop
fi

cd public
git add . > /dev/null

msg="Rebuilding site $(date)"
git commit -m "$msg" > /dev/null

git push origin master > /dev/null
