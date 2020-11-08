module.exports = function (input, { limitCandidates = Infinity }) {
    let output = JSON.parse(JSON.stringify(input));

    output = output.filter(function (entry) {
        if (entry['OfficeDescription'] === 'President of the United States 4 Year Term (1) Position') {
            return true;
        } else {
            return false;
        }
    });

    const contestants = [];
    for (const item of output) {
        const candidateLastName = item.CandidateLastName;
        if (contestants.indexOf(candidateLastName) === -1) {
            contestants.push(candidateLastName);
        }
    }

    const arr = [];
    for (let i = 0; i < output.length; i++) {
        const distribution = {};

        for (let j = 0; j < contestants.length; j++) {
            const item = output[i];
            if (j < limitCandidates) {
                distribution[item['CandidateLastName']] = item['CandidateVotes'];
            }
            i++;
        }
        i--;

        arr.push(distribution);
    }

    return arr;
};
