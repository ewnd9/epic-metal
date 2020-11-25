import { getJira } from './api';
import { setCache } from './cache';

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

async function main() {
  const { result } = await getJira();
  setCache(result);

  for (const epic of result) {
    console.log(`- ${epic.key}: ${epic.summary}`);
    for (const issue of epic.children) {
      console.log(`  - ${issue.key}: ${issue.status.name} ${issue.summary}`);
      console.log(`    - (assignee: ${issue.assignee && issue.assignee.displayName})`);
    }
  }
}
