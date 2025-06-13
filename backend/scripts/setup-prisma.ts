import { execSync } from 'node:child_process';
import { buildSchema } from './prisma-build-schema.js';

async function runSetup() {
  try {
    console.log('📦 Building Prisma schema...');
    await buildSchema();

    console.log('📜 Generating Prisma enums...');
    execSync('tsx scripts/generate-prisma-enums.ts', { stdio: 'inherit' });

    console.log('🧹 Resetting database...');
    execSync('pnpm run prisma:reset', { stdio: 'inherit' });

    console.log('⚙️ Generating Prisma client...');
    execSync('pnpm run prisma:generate', { stdio: 'inherit' });

    console.log('🌱 Seeding database...');
    execSync('pnpm run prisma:seed', { stdio: 'inherit' });

    console.log('✅ Prisma setup complete!');
  } catch (err) {
    console.error('❌ Failed to setup Prisma:', err instanceof Error ? err.message : err);
    process.exit(1);
  }
}

runSetup();
