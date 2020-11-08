#!/bin/bash

set -x


./node_modules/.bin/csvtojson --flatKeys=true ./dump/milwaukee/vote-count/milwaukee.csv > ./dump/milwaukee/vote-count/milwaukee.json


./node_modules/.bin/csvtojson --flatKeys=true ./dump/nebraska/vote-count/nebraska.csv > ./dump/nebraska/vote-count/nebraska.json


./node_modules/.bin/csvtojson --flatKeys=true ./dump/washington/vote-count/washington.csv > ./dump/washington/vote-count/washington_parsing.json


./node_modules/.bin/csvtojson --flatKeys=true ./dump/chicago/vote-count/chicago_converted.csv > ./dump/chicago/vote-count/chicago_converted.json


./node_modules/.bin/csvtojson --flatKeys=true --delimiter=auto ./dump/michigan/vote-count/michigan.xls > ./dump/michigan/vote-count/michigan_parsing.json


cd ./dump/georgia/vote-count/
rm -f georgia.xml
unzip georgia.zip
mv detail.xml georgia.xml
../../../node_modules/.bin/xml-js georgia.xml --spaces 4 --out georgia_converted.json
jq '.elements[1].elements[5].elements' georgia_converted.json > georgia_parsing.json
cd ../../../


cd ./dump/colorado/vote-count/
rm -f colorado.xml
unzip colorado.zip
mv detail.xml colorado.xml
../../../node_modules/.bin/xml-js colorado.xml --spaces 4 --out colorado_converted.json
jq '.elements[1].elements[5].elements' colorado_converted.json > colorado_parsing.json
cd ../../../
