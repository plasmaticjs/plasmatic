#!/bin/bash

if [ "$JOB_TYPE" != "docs"  ]; then exit 0; fi
if [ "$TRAVIS_BRANCH" != "master"  ]; then exit 0; fi

set -o errexit

# config
git config --global user.email "travis@travis-ci.org"
git config --global user.name "Travis CI"

# build
yarn install
gulp --env=build build:es2015
gulp --env=build docs


rm -rf coverage
rm -rf es2015
# deploy
cd api-docs
cd gen
git init
git add .
git commit -m "Deploy Documentation from Travis CI"
git push --force --quiet "https://${GITHUB_TOKEN}@github.com/${GITHUB_REPO}.git" master:gh-pages > /dev/null 2>&1


## Create dist repo
cd ../../
yarn install
gulp --env=build build:dist

cd dist
git init
git add dist*
git commit -m "Deploy Distribution from Travis CI"
git push --force --quiet "https://${GITHUB_TOKEN}@github.com/${GITHUB_REPO}.git" master:distribution > /dev/null 2>&1


cd /../../
gulp build
cd api-docs
mv gen api
cd api

cd dist
git init
git commit -m "Deploy Documentation from Travis CI"
git push --force --quiet "https://${GITHUB_TOKEN}@github.com/plasmaticjs/plasmatic.io-web.git" master:gh-pages > /dev/null 2>&1
