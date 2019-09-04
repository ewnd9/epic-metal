'use strict';

const {getJira} = require('./api');

main()
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

async function main() {
  const {result} = await getJira();
  for (const epic of result) {
    console.log(`- ${epic.key}: ${epic.summary}`);
    for (const issue of epic.children) {
      console.log(`  - ${issue.key}: ${issue.summary}`);
    }
  }
}
