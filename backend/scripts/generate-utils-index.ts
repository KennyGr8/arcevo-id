import fs from 'fs';
import path from 'path';
import { logger } from '@utils/logger';

const UTILS_DIR = path.resolve('auth-kit-core/src/common/utils');
const INDEX_FILE = path.join(UTILS_DIR, 'index.ts');

function generateUtilsIndex() {
  if (!fs.existsSync(UTILS_DIR)) {
    logger.error(`❌ Utils directory not found: ${UTILS_DIR}`);
    process.exit(1);
  }

  const files = fs
    .readdirSync(UTILS_DIR)
    .filter(file =>
      file.endsWith('.ts') &&
      file !== 'index.ts' &&
      !file.startsWith('.') &&
      !file.includes('.test.') &&
      !file.includes('.spec.')
    );

  const exportLines = Array.from(
    new Set(files.map(file => `export * from './${file.replace(/\.ts$/, '')}';`))
  ).sort();

  const banner = `// ⚠️ Auto-generated utils index. Do not edit manually.\n// Run \`pnpm utils:index\` to regenerate.\n\n`;

  fs.writeFileSync(INDEX_FILE, banner + exportLines.join('\n') + '\n', 'utf8');
  logger.success(`Utils index generated with ${exportLines.length} exports → ${path.relative(process.cwd(), INDEX_FILE)}`);
}

generateUtilsIndex();
