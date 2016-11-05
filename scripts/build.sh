#!/bin/bash

if [ "$TRAVIS_PULL_REQUEST" != "false" -o "$TRAVIS_BRANCH" != "master" ]; then exit 0; fi

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

bash $DIR/coveralls.sh
bash $DIR/sonarqube.sh
bash $DIR/lint.sh
bash $DIR/deploy-docs.sh
