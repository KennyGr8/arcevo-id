import { execSync, spawnSync } from 'child_process';
import path from 'path';
import fs from 'fs';
import { logger } from "@utils/logger";

const filePath = process.argv[2];
if (!filePath || !fs.existsSync(filePath)) {
  console.error('❌ Please provide a valid file path to check for changes.');
  process.exit(1);
}

const relativePath = path.relative(process.cwd(), filePath);

try {
  const diffResult = spawnSync('git', ['diff', '--quiet', '--', relativePath]);
  if (diffResult.status === 0) {
    logger.info(`✅ No changes detected in ${relativePath}. Nothing to commit.`);
    process.exit(0);
  }

  execSync(`git add ${relativePath}`);
  execSync(`git commit -m "chore(schema): updated Prisma schema"`);

  logger.success(`✅ Changes in ${relativePath} committed to Git.`);
} catch (err) {
  logger.error('❌ Git commit failed:', err);
  process.exit(1);
}
