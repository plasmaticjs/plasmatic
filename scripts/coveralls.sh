#!/bin/bash

if [ "$JOB_TYPE" != "coverage"  ]; then exit 0; fi

set -ev

gulp --env=build karma
CODECLIMATE_REPO_TOKEN=$CODECLIMATE_TOKEN npm run codeclimate
gulp coveralls
