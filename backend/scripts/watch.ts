import chokidar from 'chokidar';
import { exec } from 'child_process';
import { logger } from '@utils/logger';
import path from 'path';

const SCHEMA_PATH = path.resolve('prisma/schema.prisma');

logger.info(`👀 Watching for changes in ${SCHEMA_PATH}...`);

chokidar
  .watch(SCHEMA_PATH, { persistent: true })
  .on('change', () => {
    logger.info('🔁 Schema changed. Regenerating Prisma enums...');
    exec('pnpm prisma:enums:auto', (err, stdout, stderr) => {
      if (err) {
        logger.error(`❌ Regeneration failed: ${stderr}`);
      } else {
        logger.success('🎉 Enums regenerated and committed!');
      }
    });
  });
