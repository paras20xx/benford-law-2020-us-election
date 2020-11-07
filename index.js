#!/usr/bin/env node

const seedrandom = require('./utils/seedrandom/seedrandom.js');

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
const contestantsArray = Object.keys(contestants);

console.log('\nContestants and the instances of their entries (their count should all be the same):');
console.log(contestants);

const benfordDistribution = {
    '_0': 0,
    '_1': Math.log10(1 + 1) - Math.log10(1),
    '_2': Math.log10(2 + 1) - Math.log10(2),
    '_3': Math.log10(3 + 1) - Math.log10(3),
    '_4': Math.log10(4 + 1) - Math.log10(4),
    '_5': Math.log10(5 + 1) - Math.log10(5),
    '_6': Math.log10(6 + 1) - Math.log10(6),
    '_7': Math.log10(7 + 1) - Math.log10(7),
    '_8': Math.log10(8 + 1) - Math.log10(8),
    '_9': Math.log10(9 + 1) - Math.log10(9)
};

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

const { CanvasRenderService } = require('chartjs-node-canvas');
const fs = require('fs');
const path = require('path');

const width = 1000;
const height = 600;
const chartCallback = (ChartJS) => {

    // Global config example: https://www.chartjs.org/docs/latest/configuration/
    ChartJS.defaults.global.elements.rectangle.borderWidth = 2;
    // Global plugin example: https://www.chartjs.org/docs/latest/developers/plugins.html
    ChartJS.plugins.register({
        // plugin implementation
    });
    // New chart type example: https://www.chartjs.org/docs/latest/developers/charts.html
    ChartJS.controllers.MyType = ChartJS.DatasetController.extend({
        // chart implementation
    });
};
const canvasRenderService = new CanvasRenderService(width, height, chartCallback);

// https://github.com/davidbau/seedrandom
const seededRandom = new seedrandom('this-is-a-seed-string_1');

// https://stackoverflow.com/questions/23095637/how-do-you-get-random-rgb-in-javascript/23095818#23095818
function random_rgba() {
    var o = Math.round, r = seededRandom, s = 255;
    return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + 1 + ')';
}

(async () => {
    const configuration = {
        type: 'line',
        data: {
            labels: [
                '1',
                '2',
                '3',
                '4',
                '5',
                '6',
                '7',
                '8',
                '9'
            ],
            datasets: (function () {
                const output = [];

                const multiplier = voteCountEntriesForMilwaukee.length;

                output.push({
                    label: 'Ideal',
                    data: [
                        multiplier * benfordDistribution['_1'],
                        multiplier * benfordDistribution['_2'],
                        multiplier * benfordDistribution['_3'],
                        multiplier * benfordDistribution['_4'],
                        multiplier * benfordDistribution['_5'],
                        multiplier * benfordDistribution['_6'],
                        multiplier * benfordDistribution['_7'],
                        multiplier * benfordDistribution['_8'],
                        multiplier * benfordDistribution['_9']
                    ],
                    borderColor: [
                        'rgba(255, 255, 255, 1)',
                        'rgba(255, 255, 255, 1)',
                        'rgba(255, 255, 255, 1)',
                        'rgba(255, 255, 255, 1)',
                        'rgba(255, 255, 255, 1)',
                        'rgba(255, 255, 255, 1)',
                        'rgba(255, 255, 255, 1)',
                        'rgba(255, 255, 255, 1)',
                        'rgba(255, 255, 255, 1)',
                        'rgba(255, 255, 255, 1)'
                    ]
                });

                for (const contestant of contestantsArray) {
                    const distributionForContestant = distributions[contestant];
                    output.push({
                        label: contestant,
                        data: [
                            distributionForContestant['_1'],
                            distributionForContestant['_2'],
                            distributionForContestant['_3'],
                            distributionForContestant['_4'],
                            distributionForContestant['_5'],
                            distributionForContestant['_6'],
                            distributionForContestant['_7'],
                            distributionForContestant['_8'],
                            distributionForContestant['_9']
                        ],
                        borderColor: [
                            random_rgba(),
                            random_rgba(),
                            random_rgba(),
                            random_rgba(),
                            random_rgba(),
                            random_rgba(),
                            random_rgba(),
                            random_rgba(),
                            random_rgba(),
                            random_rgba()
                        ]
                    });
                }

                return output;
            }())
        }
    };
    const image = await canvasRenderService.renderToBuffer(configuration);
    const dataUrl = await canvasRenderService.renderToDataURL(configuration);
    const stream = canvasRenderService.renderToStream(configuration);

    const filePath = path.join(
        __dirname,
        'dump',
        'milwaukee',
        'vote-count',
        'milwaukee-graph.png'
    );
    try {
        fs.writeFileSync(filePath, image);
    } catch (e) {
        console.log(e);
        throw e;
    }
    console.log(`File written to: ${path.relative(process.cwd(), filePath)}`);
    console.log('');
})();
