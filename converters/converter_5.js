module.exports = function (input, { limitCandidates = Infinity }) {
    let output = JSON.parse(JSON.stringify(input));

    output = output.map(function (entry) {
        entry.field3 = entry.field3.replace(/,/g, '');
        return entry;
    });

    const contestants = [];
    for (const item of output) {
        const candidateName = item['field1'];
        if (contestants.indexOf(candidateName) === -1) {
            contestants.push(candidateName);
        }
    }

    const arr = [];
    for (let i = 0; i < output.length; i++) {
        const distribution = {};

        for (let j = 0; j < contestants.length; j++) {
            const item = output[i];
            if (j < limitCandidates) {
                distribution[item['field1']] = item['field3'];
            }
            i++;
        }
        i--;

        arr.push(distribution);
    }

    return arr;
};
