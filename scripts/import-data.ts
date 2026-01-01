import { initializeMenuData } from '../lib/init-firebase-data';

async function main() {
  await initializeMenuData();
  console.log('Done!');
  process.exit(0);
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});