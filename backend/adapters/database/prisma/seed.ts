import path from 'node:path';
import { readdir } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import chalk from 'chalk';
import { logger } from '@utils/logger';
import { prisma } from '@database/prisma';

const seedsPath = path.resolve('adapters/database/prisma/seeds');

async function runSeeds() {
  try {
    const seedFiles = (await readdir(seedsPath)).filter((file) =>
      file.endsWith('.seed.ts')
    );

    if (seedFiles.length === 0) {
      logger.warn(chalk.yellow('⚠️ No seed files found.'));
      return;
    }

    logger.info(chalk.cyan(`📂 Found ${seedFiles.length} seed file(s)`));

    for (const file of seedFiles) {
      const filePath = path.join(seedsPath, file);
      const fileUrl = pathToFileURL(filePath).href;

      try {
        const module = await import(fileUrl);
        const fn = module.default;

        if (typeof fn === 'function') {
          logger.info(chalk.green(`🌱 Running seed: ${file}`));
          await fn(prisma);
          logger.info(chalk.green(`✅ Completed seed: ${file}`));
        } else {
          logger.warn(chalk.yellow(`⚠️ No default function exported in ${file}`));
        }
      } catch (err) {
        logger.error(
          chalk.red(`❌ Error while running seed: ${file}\n`) +
            (err instanceof Error ? err.stack : String(err))
        );
      }
    }
  } catch (err) {
    logger.error(chalk.red('❌ Error while loading seed files'), err);
    throw err;
  }
}

runSeeds()
  .then(() => {
    logger.info(chalk.blueBright('\n🎉 All seeds completed successfully.\n'));
    process.exit(0);
  })
  .catch((err) => {
    logger.error(chalk.redBright('\n🔥 Seeding failed.\n'));
    process.exit(1);
  });
