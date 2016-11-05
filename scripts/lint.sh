#!/bin/bash

if [ "$JOB_TYPE" != "lint"  ]; then exit 0; fi

set -ev

gulp --env=build flow
gulp --env=build eslint
