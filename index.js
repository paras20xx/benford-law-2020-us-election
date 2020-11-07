#!/usr/bin/env node

let voteCountEntriesForMilwaukee = require('./dump/milwaukee/vote-count/milwaukee.json');

voteCountEntriesForMilwaukee = voteCountEntriesForMilwaukee.map(function (item) {
    delete item['field1'];
    delete item['field8'];
    return item;
});

const contestants = {};
for (const voteCountEntryForMilwaukee of voteCountEntriesForMilwaukee) {
    for (const contestant in voteCountEntryForMilwaukee) {
        if (typeof contestants[contestant] === 'undefined') {
            contestants[contestant] = 0;
        }
        contestants[contestant]++;
    }
}

console.log('\nContestants and the instances of their entries (their count should all be the same):');
console.log(contestants);

const intialDistribution = {
    '_0': 0,
    '_1': 0,
    '_2': 0,
    '_3': 0,
    '_4': 0,
    '_5': 0,
    '_6': 0,
    '_7': 0,
    '_8': 0,
    '_9': 0
};

const distributions = JSON.parse(JSON.stringify(contestants));

for (const contestant in contestants) {
    const distributionForContestant = JSON.parse(JSON.stringify(intialDistribution));

    for (const voteCountEntryForMilwaukee of voteCountEntriesForMilwaukee) {
        const voteCountForContestant = voteCountEntryForMilwaukee[contestant];
        let firstDigitAsString = '_' + String(voteCountForContestant).substring(0, 1);
        distributionForContestant[firstDigitAsString]++;
    }

    distributions[contestant] = distributionForContestant;
}

console.log('\nDistributions:');
console.log(distributions);
console.log('');
