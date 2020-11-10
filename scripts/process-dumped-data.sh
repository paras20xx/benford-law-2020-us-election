#!/bin/bash

set -x


./node_modules/.bin/csvtojson --flatKeys=true ./dump/alabama/vote-count/alabama.csv > ./dump/alabama/vote-count/alabama_parsing.json


./node_modules/.bin/csvtojson --flatKeys=true ./dump/milwaukee/vote-count/milwaukee.csv > ./dump/milwaukee/vote-count/milwaukee.json


./node_modules/.bin/csvtojson --flatKeys=true ./dump/nebraska/vote-count/nebraska.csv > ./dump/nebraska/vote-count/nebraska.json


./node_modules/.bin/csvtojson --flatKeys=true ./dump/washington/vote-count/washington.csv > ./dump/washington/vote-count/washington_parsing.json


./node_modules/.bin/csvtojson --flatKeys=true ./dump/chicago/vote-count/chicago_converted.csv > ./dump/chicago/vote-count/chicago_converted.json


./node_modules/.bin/csvtojson --flatKeys=true --delimiter=auto ./dump/michigan/vote-count/michigan.xls > ./dump/michigan/vote-count/michigan_parsing.json


cd ./dump/colorado/vote-count/
rm -f colorado.xml
unzip colorado.zip
mv detail.xml colorado.xml
../../../node_modules/.bin/xml-js colorado.xml --spaces 4 --out colorado_converted.json
jq '.elements[1].elements[5].elements' colorado_converted.json > colorado_parsing.json
cd ../../../


cd ./dump/georgia/vote-count/
rm -f georgia.xml
unzip georgia.zip
mv detail.xml georgia.xml
../../../node_modules/.bin/xml-js georgia.xml --spaces 4 --out georgia_converted.json
jq '.elements[1].elements[5].elements' georgia_converted.json > georgia_parsing.json
cd ../../../


cd ./dump/iowa/vote-count/
rm -f iowa.xml
unzip iowa.zip
mv detail.xml iowa.xml
../../../node_modules/.bin/xml-js iowa.xml --spaces 4 --out iowa_converted.json
jq '.elements[1].elements[5].elements' iowa_converted.json > iowa_parsing.json
cd ../../../


cd ./dump/kentucky/vote-count/
rm -f kentucky.xml
unzip kentucky.zip
mv detail.xml kentucky.xml
../../../node_modules/.bin/xml-js kentucky.xml --spaces 4 --out kentucky_converted.json
jq '.elements[1].elements[5].elements' kentucky_converted.json > kentucky_parsing.json
cd ../../../

cd ./dump/tennessee/vote-count/
grep -P '\t' tennessee.txt > tennessee_parsed.txt
../../../node_modules/.bin/csvtojson --flatKeys=true --delimiter=auto --noheader=true ./tennessee_parsed.txt > ./tennessee_parsing.json
cd ../../../
