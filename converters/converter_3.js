module.exports = function (input, { limitCandidates = Infinity }) {
    let output = JSON.parse(JSON.stringify(input));

    output = output.filter(function (entry) {
        if (entry['Race'] === 'President/Vice President') {
            return true;
        } else {
            return false;
        }
    });

    const contestants = [];
    for (const item of output) {
        const candidateName = item.Candidate;
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
                distribution[item['Candidate']] = item['Votes'];
            }
            i++;
        }
        i--;

        arr.push(distribution);
    }

    return arr;
};
