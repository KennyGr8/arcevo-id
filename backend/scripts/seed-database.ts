#!/usr/bin/env ts-node

import { runAllSeeds, runSelectedSeed } from '../adapters/database/prisma/seed';
import { logger } from '@utils/logger';

async function main() {
  const args = process.argv.slice(2);

  const onlyFlag = args.includes('--only');
  const truncateFlag = args.includes('--truncate');

  if (truncateFlag) {
    logger.info('🧹 Truncating database...');
    await truncateDatabase();
  }

  if (onlyFlag) {
    const onlyIndex = args.indexOf('--only');
    const seedName = args[onlyIndex + 1];

    if (!seedName) {
      logger.error('❌ You must specify a seeder name after "--only".');
      process.exit(1);
    }

    await runSelectedSeed(seedName as any);
  } else {
    await runAllSeeds();
  }

  process.exit(0);
}

async function truncateDatabase() {
  const { prisma } = await import('@database/logic');
  await prisma.$transaction([
    prisma.billingEvent.deleteMany(),
    prisma.subscription.deleteMany(),
    prisma.session.deleteMany(),
    prisma.authLog.deleteMany(),
    prisma.activityLog.deleteMany(),
    prisma.adminAuditLog.deleteMany(),
    prisma.oAuthAccount.deleteMany(),
    prisma.emailToken.deleteMany(),
    prisma.organizationMembership.deleteMany(),
    prisma.organization.deleteMany(),
    prisma.mFA.deleteMany(),
    prisma.user.deleteMany(),
  ]);
}

main().catch((err) => {
  logger.error('🔥 Error in seeding CLI:', err);
  process.exit(1);
});
