#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const { CanvasRenderService } = require('chartjs-node-canvas');

const seedrandom = require('./utils/seedrandom/seedrandom.js');
const logForBase = require('./utils/logForBase/logForBase.js');

const converter_1 = require('./converters/converter_1.js');
const converter_2 = require('./converters/converter_2.js');
const converter_3 = require('./converters/converter_3.js');
const converter_4 = require('./converters/converter_4.js');
const converter_5 = require('./converters/converter_5.js');

let configsForLocations = [
    {
        jsonFilePath: './dump/milwaukee/vote-count/milwaukee.json',
        fieldsToDelete: ['field1', 'field8'],
        limitCandidates: 4,
        outputGraphPath: path.join(__dirname, 'dump', 'milwaukee', 'vote-count', 'milwaukee-graph.png')
    },


    {
        mapJson: {
            input: './dump/alabama/vote-count/alabama_parsing.json',
            mappers: [
                {
                    converter: 'converter_4',
                    options: {
                        limitCandidates: 2
                    }
                }
            ],
            output: './dump/alabama/vote-count/alabama.json'
        },
        jsonFilePath: './dump/alabama/vote-count/alabama.json',
        fieldsToDelete: ['field1'],
        outputGraphPath: path.join(__dirname, 'dump', 'alabama', 'vote-count', 'alabama-graph.png')
    },


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
        jsonFilePath: './dump/nebraska/vote-count/nebraska.json',
        fieldsToDelete: ['County'],
        limitCandidates: 2,
        outputGraphPath: path.join(__dirname, 'dump', 'nebraska', 'vote-count', 'nebraska-graph.png')
    },


    {
        mapJson: {
            input: './dump/washington/vote-count/washington_parsing.json',
            mappers: [
                {
                    converter: 'converter_3',
                    options: {
                        limitCandidates: 2
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
                        sliceArray: 1,
                        voteTypeIndex: 0,
                        limitCandidates: 4
                    }
                }
            ],
            output: './dump/colorado/vote-count/colorado-election-day-votes.json'
        },
        jsonFilePath: './dump/colorado/vote-count/colorado-election-day-votes.json',
        limitCandidates: 2,
        outputGraphPath: path.join(__dirname, 'dump', 'colorado', 'vote-count', 'colorado-election-day-votes-graph.png')
    },


    {
        mapJson: {
            input: './dump/georgia/vote-count/georgia_parsing.json',
            mappers: [
                {
                    converter: 'converter_1',
                    options: {
                        sliceArray: 1,
                        voteTypeIndex: 0
                    }
                }
            ],
            output: './dump/georgia/vote-count/georgia-election-day-votes.json'
        },
        jsonFilePath: './dump/georgia/vote-count/georgia-election-day-votes.json',
        limitCandidates: 2,
        outputGraphPath: path.join(__dirname, 'dump', 'georgia', 'vote-count', 'georgia-election-day-votes-graph.png')
    },
    {
        mapJson: {
            input: './dump/georgia/vote-count/georgia_parsing.json',
            mappers: [
                {
                    converter: 'converter_1',
                    options: {
                        sliceArray: 1,
                        voteTypeIndex: 1
                    }
                }
            ],
            output: './dump/georgia/vote-count/georgia-absentee-by-mail-votes.json'
        },
        jsonFilePath: './dump/georgia/vote-count/georgia-absentee-by-mail-votes.json',
        limitCandidates: 2,
        outputGraphPath: path.join(__dirname, 'dump', 'georgia', 'vote-count', 'georgia-absentee-by-mail-votes-graph.png')
    },
    {
        mapJson: {
            input: './dump/georgia/vote-count/georgia_parsing.json',
            mappers: [
                {
                    converter: 'converter_1',
                    options: {
                        sliceArray: 1,
                        voteTypeIndex: 2
                    }
                }
            ],
            output: './dump/georgia/vote-count/georgia-advanced-voting-votes.json'
        },
        jsonFilePath: './dump/georgia/vote-count/georgia-advanced-voting-votes.json',
        limitCandidates: 2,
        outputGraphPath: path.join(__dirname, 'dump', 'georgia', 'vote-count', 'georgia-advanced-voting-votes-graph.png')
    },
    {
        mapJson: {
            input: './dump/georgia/vote-count/georgia_parsing.json',
            mappers: [
                {
                    converter: 'converter_1',
                    options: {
                        sliceArray: 1,
                        voteTypeIndex: 2
                    }
                }
            ],
            output: './dump/georgia/vote-count/georgia-provisional-votes.json'
        },
        jsonFilePath: './dump/georgia/vote-count/georgia-provisional-votes.json',
        limitCandidates: 2,
        outputGraphPath: path.join(__dirname, 'dump', 'georgia', 'vote-count', 'georgia-provisional-votes-graph.png')
    },


    {
        mapJson: {
            input: './dump/iowa/vote-count/iowa_parsing.json',
            mappers: [
                {
                    converter: 'converter_1',
                    options: {
                        sliceArray: 1,
                        voteTypeIndex: 0
                    }
                }
            ],
            output: './dump/iowa/vote-count/iowa-election-day-votes.json'
        },
        jsonFilePath: './dump/iowa/vote-count/iowa-election-day-votes.json',
        limitCandidates: 2,
        outputGraphPath: path.join(__dirname, 'dump', 'iowa', 'vote-count', 'iowa-election-day-votes-graph.png')
    },
    {
        mapJson: {
            input: './dump/iowa/vote-count/iowa_parsing.json',
            mappers: [
                {
                    converter: 'converter_1',
                    options: {
                        sliceArray: 1,
                        voteTypeIndex: 1
                    }
                }
            ],
            output: './dump/iowa/vote-count/iowa-absentee-votes.json'
        },
        jsonFilePath: './dump/iowa/vote-count/iowa-absentee-votes.json',
        limitCandidates: 2,
        outputGraphPath: path.join(__dirname, 'dump', 'iowa', 'vote-count', 'iowa-absentee-votes-graph.png')
    },


    {
        mapJson: {
            input: './dump/kentucky/vote-count/kentucky_parsing.json',
            mappers: [
                {
                    converter: 'converter_1',
                    options: {
                        sliceArray: 1,
                        voteTypeIndex: 0
                    }
                }
            ],
            output: './dump/kentucky/vote-count/kentucky-election-day-votes.json'
        },
        jsonFilePath: './dump/kentucky/vote-count/kentucky-election-day-votes.json',
        limitCandidates: 2,
        outputGraphPath: path.join(__dirname, 'dump', 'kentucky', 'vote-count', 'kentucky-election-day-votes-graph.png')
    },


    {
        // only: true,
        mapJson: {
            input: './dump/san-francisco/vote-count/san-francisco_converted.json',
            mappers: [
                {
                    fieldsToDelete: [
                        'Precinct',
                        'Undervotes', // TODO: Check this
                        'field4',
                        'Overvotes', // TODO: Check this
                        'field8',
                        'field10',
                        'field12',
                        'field13',
                        'field15',
                        'field17',
                        'field18',
                        'field20',
                        'field22',
                        'field25',
                        'field27',
                        'field29',
                        'field31',
                        'field33',
                        'GLORIA LA RIVA AND SUNIL FREEMAN',
                        'ROQUE \"ROCKY\" DE LA FUENTE GUERRA AND KANYE OMARI WEST',
                        'HOWIE HAWKINS AND ANGELA NICOLE WALKER',
                        'JO JORGENSEN AND JEREMY \"SPIKE\" COHEN',
                        'Write-in',
                        'BRIAN CARROLL AND AMAR PATEL Qualified Write In',
                        'MARK CHARLES AND ADRIAN WALLACE Qualified Write In',
                        'JOSEPH KISHORE AND NORISSA SANTA CRUZ Qualified Write In',
                        'BROCK PIERCE AND KARLA BALLARD Qualified Write In',
                        'JESSE VENTURA AND CYNTHIA MCKINNEY Qualified Write In'
                    ]
                },
                {
                    renameFields: [
                        { from: 'JOSEPH R. BIDEN AND KAMALA D. HARRIS', to: 'Biden' },
                        { from: 'DONALD J. TRUMP AND MICHAEL R. PENCE', to: 'Trump' }
                    ]
                }
            ],
            output: './dump/san-francisco/vote-count/san-francisco.json'
        },
        jsonFilePath: './dump/san-francisco/vote-count/san-francisco.json',
        outputGraphPath: path.join(__dirname, 'dump', 'san-francisco', 'vote-count', 'san-francisco-graph.png')
    },


    {
        mapJson: {
            input: './dump/tennessee/vote-count/tennessee_parsing.json',
            mappers: [
                {
                    converter: 'converter_5',
                    options: {
                        limitCandidates: 2
                    }
                }
            ],
            output: './dump/tennessee/vote-count/tennessee.json'
        },
        jsonFilePath: './dump/tennessee/vote-count/tennessee.json',
        limitCandidates: 2,
        outputGraphPath: path.join(__dirname, 'dump', 'tennessee', 'vote-count', 'tennessee-graph.png')
    },
];

const configsForLocationsContainsOnly = configsForLocations.some(function (item) {
    if (item.only) {
        return true;
    } else {
        return false;
    }
});
if (configsForLocationsContainsOnly) {
    configsForLocations = configsForLocations.filter(function (item) {
        if (item.only) {
            return true;
        } else {
            return false;
        }
    });
}

const doCalculations = function (useBenfordLawForDigit = 1) {
    let fromBase;
    let toBase;
    if (useBenfordLawForDigit === 2) {
        fromBase = 10;
        toBase = 10;
    } else {
        fromBase = 3;
        toBase = 10;
    }

    let startFromDigit;
    if (useBenfordLawForDigit === 2) {
        startFromDigit = 0;
    } else {
        startFromDigit = 1;
    }

    for (let base = fromBase; base <= toBase; base++) {
        for (const configForLocation of configsForLocations) {
            const limitCandidates = configForLocation.limitCandidates || Infinity;
            if (configForLocation.mapJson) {
                let inputJson = JSON.parse(JSON.stringify(require(configForLocation.mapJson.input)));

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
                    } else if (mapper.converter === 'converter_4') {
                        inputJson = converter_4(inputJson, mapper.options);
                    } else if (mapper.converter === 'converter_5') {
                        inputJson = converter_5(inputJson, mapper.options);
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

                // TODO: Move JSON computations and file write operation outside the for loop (and remove the following if condition).
                if (base === fromBase) {
                    fs.writeFileSync(
                        path.resolve(__dirname, configForLocation.mapJson.output),
                        str
                    );
                }
            }

            let voteCountEntriesForLocation = JSON.parse(JSON.stringify(require(configForLocation.jsonFilePath)));

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
            let contestantsArray = Object.keys(contestants);
            if (limitCandidates) {
                contestantsArray = contestantsArray.slice(0, limitCandidates);
            }

            console.log('\nContestants and the instances of their entries (their count should all be the same):');
            console.log(contestants);

            let benfordDistribution;
            if (useBenfordLawForDigit === 2) {
                benfordDistribution = {
                    '_0': 11.97 / 100,
                    '_1': 11.39 / 100,
                    '_2': 10.88 / 100,
                    '_3': 10.43 / 100,
                    '_4': 10.03 / 100,
                    '_5': 9.67 / 100,
                    '_6': 9.34 / 100,
                    '_7': 9.04 / 100,
                    '_8': 8.76 / 100,
                    '_9': 8.50 / 100
                };
            } else {
                benfordDistribution = {
                    '_0': 0,
                };
                for (let i = 1; i <= base - 1; i++) {
                    benfordDistribution['_' + i] = logForBase(i + 1, base) - logForBase(i, base);
                }
            }

            const intialDistribution = {
                '_0': 0,
            };
            for (let i = startFromDigit; i <= base - 1; i++) {
                intialDistribution['_' + i] = 0;
            }

            const distributions = JSON.parse(JSON.stringify(contestants));

            for (const contestant in contestants) {
                const distributionForContestant = JSON.parse(JSON.stringify(intialDistribution));

                for (const voteCountEntryForLocation of voteCountEntriesForLocation) {
                    const voteCountForContestant = (parseInt(voteCountEntryForLocation[contestant], 10)).toString(base);

                    if (useBenfordLawForDigit === 2) {
                        let secondDigitAsString = '_' + String(voteCountForContestant).substring(1, 2);
                        distributionForContestant[secondDigitAsString]++;
                    } else {
                        let firstDigitAsString = '_' + String(voteCountForContestant).substring(0, 1);
                        distributionForContestant[firstDigitAsString]++;
                    }
                }

                distributions[contestant] = distributionForContestant;
            }

            console.log('\nDistributions:');
            console.log(distributions);
            console.log('');

            const width = 838;
            const height = 419;
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
            const seededRandom = new seedrandom('this-is-a-seed-string_100000000');

            // https://stackoverflow.com/questions/23095637/how-do-you-get-random-rgb-in-javascript/23095818#23095818
            function random_rgba() {
                var o = Math.round, r = seededRandom, s = 255;
                return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + 1 + ')';
            }

            (async () => {
                const configuration = {
                    type: 'line',
                    // https://stackoverflow.com/questions/41879459/chartjs-beginatzero-min-max-doesnt-work/53437851#53437851
                    options: {
                        scales: {
                            yAxes: [{
                                display: true,
                                ticks: {
                                    beginAtZero: true,
                                    min: 0
                                }
                            }]
                        }
                    },
                    data: {
                        labels: (function () {
                            const arr = [];
                            for (let i = startFromDigit; i <= base - 1; i++) {
                                arr.push('' + i);
                            }
                            return arr;
                        }()),
                        datasets: (function () {
                            const output = [];

                            const multiplier = voteCountEntriesForLocation.length;

                            output.push({
                                label: 'Ideal',
                                data: (function () {
                                    const arr = [];
                                    for (let i = startFromDigit; i <= base - 1; i++) {
                                        arr.push(multiplier * benfordDistribution['_' + i]);
                                    }
                                    return arr;
                                }()),
                                borderColor: (function () {
                                    const arr = [];
                                    for (let i = startFromDigit; i <= base - 1; i++) {
                                        arr.push('rgba(255, 0, 0, 1)');
                                    }
                                    return arr;
                                }())
                            });

                            for (const contestant of contestantsArray) {
                                const distributionForContestant = distributions[contestant];
                                output.push({
                                    label: contestant,
                                    data: (function () {
                                        const arr = [];
                                        for (let i = startFromDigit; i <= base - 1; i++) {
                                            arr.push(distributionForContestant['_' + i]);
                                        }
                                        return arr;
                                    }()),
                                    borderColor: (function () {
                                        const arr = [];
                                        for (let i = startFromDigit; i <= base - 1; i++) {
                                            arr.push(random_rgba());
                                        }
                                        return arr;
                                    }())
                                });
                            }

                            return output;
                        }())
                    }
                };
                const image = await canvasRenderService.renderToBuffer(configuration);
                const dataUrl = await canvasRenderService.renderToDataURL(configuration);
                const stream = canvasRenderService.renderToStream(configuration);

                let filePath = configForLocation.outputGraphPath;
                if (useBenfordLawForDigit === 2) {
                    filePath = filePath.replace(/\.png$/, `-second-digit.png`);
                }
                if (base !== 10) {
                    filePath = filePath.replace(/\.png$/, `-base-${base}.png`);
                }
                if (base === 10) {
                    console.log(`(Sample size: ${voteCountEntriesForLocation.length})`);
                }
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
    }
};

doCalculations(1);
doCalculations(2);
