module.exports = function (input, { sliceArray = 0, voteTypeIndex = 0, limitCandidates = Infinity }) {
    let output = JSON.parse(JSON.stringify(input));

    if (sliceArray) {
        output = output.slice(sliceArray);
    }

    const contestants = [];
    for (const item of output) {
        contestants.push(item.attributes.text);
    }

    const arr = [];
    for (let i = 0; i < output[0].elements[voteTypeIndex].elements.length; i++) {
        const distribution = {};
        for (let j = 0; j < output.length && j < limitCandidates; j++) {
            distribution[output[j].attributes.text] = output[j].elements[voteTypeIndex].elements[i].attributes.votes;
        }
        arr.push(distribution);
    }

    return arr;
};
