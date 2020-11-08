#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const { CanvasRenderService } = require('chartjs-node-canvas');

const seedrandom = require('./utils/seedrandom/seedrandom.js');

const converter_1 = require('./converters/converter_1.js');
const converter_2 = require('./converters/converter_2.js');
const converter_3 = require('./converters/converter_3.js');

const configsForLocations = [
    {
        mapJson: {
            input: './dump/chicago/vote-count/chicago_converted.json',
            mappers: [
                {
                    filterOutRowsWithoutField: 'field14'
                },
                {
                    filterInRowsWithNumberLikeData: 'field2'
                },
                {
                    filterInRowsWithNumberLikeData: 'Chicago Board of Election Commissioners'
                },
                {
                    fieldsToDelete: [
                        'Chicago Board of Election Commissioners',
                        'field4',
                        'field6',
                        'field8',
                        'field10',
                        'field12',
                        'field14'
                    ]
                },
                {
                    renameFields: [
                        { from: 'field2', to: 'Votes Casted' },
                        { from: 'field3', to: 'Biden' },
                        { from: 'field5', to: 'Trump' },
                        { from: 'field7', to: 'Hawkins' },
                        { from: 'field9', to: 'Riva' },
                        { from: 'field11', to: 'Carroll' },
                        { from: 'field13', to: 'Jorgensen' },
                    ]
                }
            ],
            output: './dump/chicago/vote-count/chicago.json'
        },
        jsonFilePath: './dump/chicago/vote-count/chicago.json',
        fieldsToDelete: ['field1'],
        outputGraphPath: path.join(__dirname, 'dump', 'chicago', 'vote-count', 'chicago-graph.png')
    },


    {
        jsonFilePath: './dump/milwaukee/vote-count/milwaukee.json',
        fieldsToDelete: ['field1', 'field8'],
        outputGraphPath: path.join(__dirname, 'dump', 'milwaukee', 'vote-count', 'milwaukee-graph.png')
    },


    {
        jsonFilePath: './dump/nebraska/vote-count/nebraska.json',
        fieldsToDelete: ['County'],
        outputGraphPath: path.join(__dirname, 'dump', 'nebraska', 'vote-count', 'nebraska-graph.png')
    },


    {
        mapJson: {
            input: './dump/washington/vote-count/washington_parsing.json',
            mappers: [
                {
                    converter: 'converter_3',
                    options: {
                        limitCandidates: 3
                    }
                }
            ],
            output: './dump/washington/vote-count/washington.json'
        },
        jsonFilePath: './dump/washington/vote-count/washington.json',
        outputGraphPath: path.join(__dirname, 'dump', 'washington', 'vote-count', 'washington-graph.png')
    },


    {
        mapJson: {
            input: './dump/michigan/vote-count/michigan_parsing.json',
            mappers: [
                {
                    converter: 'converter_2',
                    options: {
                        limitCandidates: 2
                    }
                }
            ],
            output: './dump/michigan/vote-count/michigan.json'
        },
        jsonFilePath: './dump/michigan/vote-count/michigan.json',
        outputGraphPath: path.join(__dirname, 'dump', 'michigan', 'vote-count', 'michigan-graph.png')
    },

    {
        mapJson: {
            input: './dump/colorado/vote-count/colorado_parsing.json',
            mappers: [
                {
                    converter: 'converter_1',
                    options: {
                        voteTypeIndex: 0,
                        limitCandidates: 4
                    }
                }
            ],
            output: './dump/colorado/vote-count/colorado-election-day-votes.json'
        },
        jsonFilePath: './dump/colorado/vote-count/colorado-election-day-votes.json',
        outputGraphPath: path.join(__dirname, 'dump', 'colorado', 'vote-count', 'colorado-election-day-votes-graph.png')
    },


    {
        mapJson: {
            input: './dump/georgia/vote-count/georgia_parsing.json',
            mappers: [
                {
                    converter: 'converter_1',
                    options: {
                        voteTypeIndex: 0
                    }
                }
            ],
            output: './dump/georgia/vote-count/georgia-election-day-votes.json'
        },
        jsonFilePath: './dump/georgia/vote-count/georgia-election-day-votes.json',
        outputGraphPath: path.join(__dirname, 'dump', 'georgia', 'vote-count', 'georgia-election-day-votes-graph.png')
    },
    {
        mapJson: {
            input: './dump/georgia/vote-count/georgia_parsing.json',
            mappers: [
                {
                    converter: 'converter_1',
                    options: {
                        voteTypeIndex: 1
                    }
                }
            ],
            output: './dump/georgia/vote-count/georgia-absentee-by-mail-votes.json'
        },
        jsonFilePath: './dump/georgia/vote-count/georgia-absentee-by-mail-votes.json',
        outputGraphPath: path.join(__dirname, 'dump', 'georgia', 'vote-count', 'georgia-absentee-by-mail-votes-graph.png')
    },
    {
        mapJson: {
            input: './dump/georgia/vote-count/georgia_parsing.json',
            mappers: [
                {
                    converter: 'converter_1',
                    options: {
                        voteTypeIndex: 2
                    }
                }
            ],
            output: './dump/georgia/vote-count/georgia-advanced-voting-votes.json'
        },
        jsonFilePath: './dump/georgia/vote-count/georgia-advanced-voting-votes.json',
        outputGraphPath: path.join(__dirname, 'dump', 'georgia', 'vote-count', 'georgia-advanced-voting-votes-graph.png')
    },
    {
        mapJson: {
            input: './dump/georgia/vote-count/georgia_parsing.json',
            mappers: [
                {
                    converter: 'converter_1',
                    options: {
                        voteTypeIndex: 2
                    }
                }
            ],
            output: './dump/georgia/vote-count/georgia-provisional-votes.json'
        },
        jsonFilePath: './dump/georgia/vote-count/georgia-provisional-votes.json',
        outputGraphPath: path.join(__dirname, 'dump', 'georgia', 'vote-count', 'georgia-provisional-votes-graph.png')
    }
];

for (const configForLocation of configsForLocations) {
    if (configForLocation.mapJson) {
        let inputJson = require(configForLocation.mapJson.input);

        for (const mapper of configForLocation.mapJson.mappers) {
            if (mapper.filterOutRowsWithoutField) {
                inputJson = inputJson.filter(function (entry) {
                    if (entry[mapper.filterOutRowsWithoutField]) {
                        return true;
                    }
                    return false;
                });
            }
            if (mapper.filterInRowsWithNumberLikeData) {
                inputJson = inputJson.filter(function (entry) {
                    if (!isNaN(parseInt(entry[mapper.filterInRowsWithNumberLikeData], 10))) {
                        return true;
                    }
                    return false;
                });
            }
            if (mapper.fieldsToDelete) {
                inputJson = inputJson.map(function (item) {
                    for (const fieldToDelete of mapper.fieldsToDelete) {
                        delete item[fieldToDelete];
                    }
                    return item;
                });
            }
            if (mapper.renameFields) {
                inputJson = inputJson.map(function (item) {
                    for (const renameField of mapper.renameFields) {
                        item[renameField.to] = item[renameField.from];
                        delete item[renameField.from];
                    }
                    return item;
                });
            }
            if (mapper.converter === 'converter_1') {
                inputJson = converter_1(inputJson, mapper.options);
            } else if (mapper.converter === 'converter_2') {
                inputJson = converter_2(inputJson, mapper.options);
            } else if (mapper.converter === 'converter_3') {
                inputJson = converter_3(inputJson, mapper.options);
            }
        }

        let str = '';

        str += '[\n';
        const arr = [];
        for (const entry of inputJson) {
            arr.push(JSON.stringify(entry));
        }
        str += arr.join(',\n');
        str += '\n]';

        fs.writeFileSync(
            path.resolve(__dirname, configForLocation.mapJson.output),
            str
        );
    }

    let voteCountEntriesForLocation = require(configForLocation.jsonFilePath);

    voteCountEntriesForLocation = voteCountEntriesForLocation.map(function (item) {
        if (configForLocation.fieldsToDelete) {
            for (const fieldToDelete of configForLocation.fieldsToDelete) {
                delete item[fieldToDelete];
            }
        }
        return item;
    });

    const contestants = {};
    for (const voteCountEntryForLocation of voteCountEntriesForLocation) {
        for (const contestant in voteCountEntryForLocation) {
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

        for (const voteCountEntryForLocation of voteCountEntriesForLocation) {
            const voteCountForContestant = voteCountEntryForLocation[contestant];
            let firstDigitAsString = '_' + String(voteCountForContestant).substring(0, 1);
            distributionForContestant[firstDigitAsString]++;
        }

        distributions[contestant] = distributionForContestant;
    }

    console.log('\nDistributions:');
    console.log(distributions);
    console.log('');

    const width = 1000;
    const height = 500;
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

                    const multiplier = voteCountEntriesForLocation.length;

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
                            'rgba(255, 0, 0, 1)',
                            'rgba(255, 0, 0, 1)',
                            'rgba(255, 0, 0, 1)',
                            'rgba(255, 0, 0, 1)',
                            'rgba(255, 0, 0, 1)',
                            'rgba(255, 0, 0, 1)',
                            'rgba(255, 0, 0, 1)',
                            'rgba(255, 0, 0, 1)',
                            'rgba(255, 0, 0, 1)',
                            'rgba(255, 0, 0, 1)'
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

        const filePath = configForLocation.outputGraphPath;
        try {
            fs.writeFileSync(filePath, image);
        } catch (e) {
            console.log(e);
            throw e;
        }
        console.log(`File written to: ${path.relative(process.cwd(), filePath)}`);
        console.log('');
    })();
}
