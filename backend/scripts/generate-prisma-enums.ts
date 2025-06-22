import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { format as prettierFormat } from 'prettier';
import { logger } from '@utils/logger';

const SCHEMA_PATH = path.resolve('adapters/database/prisma/schema.prisma');
const OUTPUT_DIR = path.resolve('auth-kit-core/src/common/constants/prisma-enums');

function toPascalCase(input: string) {
  return input
    .replace(/([-_][a-z])/g, group => group.toUpperCase().replace('-', '').replace('_', ''))
    .replace(/^[a-z]/, c => c.toUpperCase());
}

function extractEnums(schema: string) {
  const enumRegex = /enum\s+(\w+)\s*{([^}]*)}/g;
  const enums: { name: string; values: string[] }[] = [];
  let match;

  while ((match = enumRegex.exec(schema)) !== null) {
    const [, name, body] = match;
    const values = body
      .split('\n')
      .map(line => line.split('=')[0].trim())
      .filter(Boolean)
      .filter(v => !v.startsWith('//'));
    enums.push({ name, values });
  }

  return enums;
}

function getEnumFilename(name: string) {
  return name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase() + '.enum.ts';
}

function generateEnumContent(enumName: string, values: string[]) {
  const pascal = toPascalCase(enumName);
  const body = values.map(v => `  ${v} = "${v}",`).join('\n');
  const type = `export type ${pascal}Values = ${values.map(v => `"${v}"`).join(' | ')};`;

  const validator = `
// ✅ Type-safe helper (optional)
/**
 * Returns true if value is a valid ${pascal} enum value
 */
export function is${pascal}(value: string): value is ${pascal}Values {
  return Object.values(${pascal}).includes(value as ${pascal});
}
`;

  return `// Auto-generated from Prisma schema. Do not edit manually. You can run or regenerate with pnpm generate:prisma-enums

export enum ${pascal} {
${body}
}

${type}
${validator}
`;
}

async function formatWithPrettier(content: string): Promise<string> {
  return prettierFormat(content, {
    parser: 'typescript',
    semi: true,
    singleQuote: true,
    trailingComma: 'all',
  });
}

async function writeEnums(enums: { name: string; values: string[] }[]) {
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  for (const { name, values } of enums) {
    const file = path.join(OUTPUT_DIR, getEnumFilename(name));
    const rawContent = generateEnumContent(name, values);
    const content = await formatWithPrettier(rawContent);
    fs.writeFileSync(file, content, 'utf8');
    logger.info(`✅ Wrote ${path.relative(process.cwd(), file)}`);
  }
}

async function updateIndex(enums: { name: string }[]) {
  const indexPath = path.join(OUTPUT_DIR, 'index.ts');
  const exports = Array.from(
    new Set(
      enums.map(({ name }) => `export * from './${getEnumFilename(name).replace(/\.ts$/, '')}';`)
    )
  ).sort();

  const rawContent = exports.join('\n') + '\n';
  const content = await formatWithPrettier(rawContent);
  fs.writeFileSync(indexPath, content, 'utf8');

  logger.success(
    `📦 Enums index generated (${exports.length} exports) → ${path.relative(process.cwd(), indexPath)}`
  );
}

function gitAutoCommit(commitMsg = 'chore: regenerate prisma enums') {
  try {
    execSync('git add .', { stdio: 'ignore' });
    execSync(`git commit -m "${commitMsg}"`, { stdio: 'ignore' });
    logger.success('✅ Changes committed to Git');
  } catch {
    logger.warn('⚠️ Git commit skipped (maybe no changes or not a Git repo)');
  }
}

async function main() {
  if (!fs.existsSync(SCHEMA_PATH)) {
    logger.error(`❌ Prisma schema not found: ${SCHEMA_PATH}`);
    process.exit(1);
  }

  const schema = fs.readFileSync(SCHEMA_PATH, 'utf8');
  const enums = extractEnums(schema);

  if (enums.length === 0) {
    logger.warn('⚠️ No enums found in schema.');
    return;
  }

  await writeEnums(enums);
  await updateIndex(enums);
  gitAutoCommit();
}

main().catch(err => {
  logger.error(`❌ Failed to generate enums: ${err.message}`);
  process.exit(1);
});
