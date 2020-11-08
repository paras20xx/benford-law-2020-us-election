# benford-law-2020-us-election
Verifying compliance of 2020 US election data against Benford's Law.

# If you wish to generate it on your own
```sh
git clone https://github.com/paras20xx/benford-law-2020-us-election.git
cd benford-law-2020-us-election

# Install Node JS from https://nodejs.org/en/download/
#     OR
# Run "nvm install" # https://github.com/nvm-sh/nvm#installing-and-updating

npm install
npm run copy-files-from-to
npm run process-dumped-data
npm start # This would generate graphs from the processed data

# Open the .png files which got generated (These files can also be previewed from README.md)
```

# Generated graphs

## Milwaukee, Wisconsin
![Milwaukee](./dump/milwaukee/vote-count/milwaukee-graph.png)

## Chicago, Illinois
![Chicago](./dump/chicago/vote-count/chicago-graph.png)

## Nebraska
![Nebraska](./dump/nebraska/vote-count/nebraska-graph.png)

## Michigan
![Michigan](./dump/michigan/vote-count/michigan-graph.png)

## Colorado
![Colorado](./dump/colorado/vote-count/colorado-election-day-votes-graph.png)

## Georgia

### Georgia - Election day votes
![Georgia - Election day votes](./dump/georgia/vote-count/georgia-election-day-votes-graph.png)

### Georgia - Absentee by mail votes
![Georgia - Absentee by mail votes](./dump/georgia/vote-count/georgia-absentee-by-mail-votes-graph.png)

### Georgia - Advanced voting votes
![Georgia - Advanced voting votes](./dump/georgia/vote-count/georgia-advanced-voting-votes-graph.png)

### Georgia - Provisional votes
![Georgia - Provisional votes](./dump/georgia/vote-count/georgia-provisional-votes-graph.png)
