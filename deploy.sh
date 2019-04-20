#!/usr/bin/env bash

# Get us into the root of the project
projroot=$(git rev-parse --show-toplevel)
cd $projroot

# Make sure the local copy of the repository is completely synchronised with the
# remote.
#
# Yes, I do know that this is probably a bad idea, however, since this project
# is very simple and we aren't using branches or any other Git features beyond
# the very basics it should be fine.
git pull
git push

# We stash (but only if there are unstaged changes) to make sure the version of
# the website committed to grepkeys.github.io matches what the website looked
# like as of the last commit.
if ! git diff-index --quiet HEAD --; then
  git stash --include-untracked --keep-index
fi

# I never run `hugo` by itself during normal development -- only `hugo server`.
# So the only reason the public folder would be different to GitHub is if others
# have made changes. To avoid merge conflicts, pull in everyone else's changes
# before running Hugo.
cd public && git pull > /dev/null && cd $projroot
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
