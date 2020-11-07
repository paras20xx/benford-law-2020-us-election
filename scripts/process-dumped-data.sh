#!/bin/bash

set -x

./node_modules/.bin/csvtojson --flatKeys=true ./dump/milwaukee/vote-count/milwaukee.csv > ./dump/milwaukee/vote-count/milwaukee.json
./node_modules/.bin/csvtojson --flatKeys=true ./dump/nebraska/vote-count/nebraska.csv > ./dump/nebraska/vote-count/nebraska.json
