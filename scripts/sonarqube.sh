#!/bin/bash

if [ "$JOB_TYPE" != "sonarqube"  ]; then exit 0; fi

set -ev

gulp --env=build build:es2015

sonar-scanner -Dsonar.login=$SONAR_TOKEN
