import { prisma } from '@database/prisma';
import path from 'node:path';
import { readdir } from 'node:fs/promises';

const seedsPath = path.resolve('prisma/seeds');

async function runSeeds() {
  const files = (await readdir(seedsPath)).filter((file) =>
    file.endsWith('.seed.ts')
  );

  for (const file of files) {
    const filePath = path.join(seedsPath, file);
    const module = await import(`file://${filePath}`);
    const fn = module.default;

    if (typeof fn === 'function') {
      console.log(`\n🌱 Running seed: ${file}`);
      await fn(prisma);
    }
  }
}

runSeeds()
  .then(() => {
    console.log('\n🎉 All seeds complete\n');
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ Seeding error:', err);
    process.exit(1);
  });
