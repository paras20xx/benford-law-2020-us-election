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

<details>
  <summary>Milwaukee - Base 3</summary>
  <p><img alt="Milwaukee - Base 3" src="dump/milwaukee/vote-count/milwaukee-graph-base-3.png"></p>
</details>
<details>
  <summary>Milwaukee - Base 4</summary>
  <p><img alt="Milwaukee - Base 4" src="dump/milwaukee/vote-count/milwaukee-graph-base-4.png"></p>
</details>
<details>
  <summary>Milwaukee - Base 5</summary>
  <p><img alt="Milwaukee - Base 5" src="dump/milwaukee/vote-count/milwaukee-graph-base-5.png"></p>
</details>
<details>
  <summary>Milwaukee - Base 6</summary>
  <p><img alt="Milwaukee - Base 6" src="dump/milwaukee/vote-count/milwaukee-graph-base-6.png"></p>
</details>
<details>
  <summary>Milwaukee - Base 7</summary>
  <p><img alt="Milwaukee - Base 7" src="dump/milwaukee/vote-count/milwaukee-graph-base-7.png"></p>
</details>
<details>
  <summary>Milwaukee - Base 8</summary>
  <p><img alt="Milwaukee - Base 8" src="dump/milwaukee/vote-count/milwaukee-graph-base-8.png"></p>
</details>
<details>
  <summary>Milwaukee - Base 9</summary>
  <p><img alt="Milwaukee - Base 9" src="dump/milwaukee/vote-count/milwaukee-graph-base-9.png"></p>
</details>

## Chicago, Illinois
![Chicago](./dump/chicago/vote-count/chicago-graph.png)

<details>
  <summary>Chicago - Base 3</summary>
  <p><img alt="Chicago - Base 3" src="dump/chicago/vote-count/chicago-graph-base-3.png"></p>
</details>
<details>
  <summary>Chicago - Base 4</summary>
  <p><img alt="Chicago - Base 4" src="dump/chicago/vote-count/chicago-graph-base-4.png"></p>
</details>
<details>
  <summary>Chicago - Base 5</summary>
  <p><img alt="Chicago - Base 5" src="dump/chicago/vote-count/chicago-graph-base-5.png"></p>
</details>
<details>
  <summary>Chicago - Base 6</summary>
  <p><img alt="Chicago - Base 6" src="dump/chicago/vote-count/chicago-graph-base-6.png"></p>
</details>
<details>
  <summary>Chicago - Base 7</summary>
  <p><img alt="Chicago - Base 7" src="dump/chicago/vote-count/chicago-graph-base-7.png"></p>
</details>
<details>
  <summary>Chicago - Base 8</summary>
  <p><img alt="Chicago - Base 8" src="dump/chicago/vote-count/chicago-graph-base-8.png"></p>
</details>
<details>
  <summary>Chicago - Base 9</summary>
  <p><img alt="Chicago - Base 9" src="dump/chicago/vote-count/chicago-graph-base-9.png"></p>
</details>


## Nebraska
![Nebraska](./dump/nebraska/vote-count/nebraska-graph.png)

## Michigan
![Michigan](./dump/michigan/vote-count/michigan-graph.png)

## Colorado
![Colorado](./dump/colorado/vote-count/colorado-election-day-votes-graph.png)

## Georgia

### Georgia - Election day votes
![Georgia - Election day votes](./dump/georgia/vote-count/georgia-election-day-votes-graph.png)

<details>
  <summary>Georgia - Absentee by mail votes</summary>
  <p><img alt="Georgia - Absentee by mail votes" src="dump/georgia/vote-count/georgia-absentee-by-mail-votes-graph.png"></p>
</details>

<details>
  <summary>Georgia - Advanced voting votes</summary>
  <p><img alt="Georgia - Advanced voting votes" src="dump/georgia/vote-count/georgia-advanced-voting-votes-graph.png"></p>
</details>

<details>
  <summary>Georgia - Provisional votes</summary>
  <p><img alt="Georgia - Provisional votes" src="dump/georgia/vote-count/georgia-provisional-votes-graph.png"></p>
</details>

## Washington
![Washington](./dump/washington/vote-count/washington-graph.png)
