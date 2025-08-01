import { execSync } from 'node:child_process';
import { buildSchema } from './prisma-build-schema.js';
import { logger } from '@utils/logger'

async function runSetup() {
  try {
    logger.info('📦 Building Prisma schema...');
    await buildSchema();

    logger.info('📜 Generating Prisma enums...');
    execSync('tsx scripts/generate-prisma-enums.ts', { stdio: 'inherit' });

    logger.info('🧹 Resetting database...');
    execSync('pnpm run prisma:reset', { stdio: 'inherit' });

    logger.info('⚙️ Generating Prisma client...');
    execSync('pnpm run prisma:generate', { stdio: 'inherit' });

    logger.info('🌱 Seeding database...');
    execSync('pnpm run prisma:seed', { stdio: 'inherit' });

    logger.info('✅ Prisma setup complete!');
  } catch (err) {
    logger.error('❌ Failed to setup Prisma script:');
    if (err instanceof Error) {
      logger.error(err.message);
    } else {
      logger.error(JSON.stringify(err, null, 2));
    }
    process.exit(1);
  }
}

runSetup();
