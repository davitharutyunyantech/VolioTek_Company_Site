import { ensureSeedPages } from '../src/lib/content/store';
import { getPrisma } from '../src/lib/server/prisma';

async function main() {
  await ensureSeedPages();
  console.log('Website content seeded.');
}

main()
  .finally(async () => {
    await getPrisma()?.$disconnect();
  })
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
