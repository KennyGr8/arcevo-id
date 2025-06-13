import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import glob from 'fast-glob';
import chokidar from 'chokidar';

// Config
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.resolve(__dirname, '../prisma/schemas');
const OUTPUT_PATH = path.resolve(__dirname, '../prisma/schema.prisma');
const DRY_RUN = process.argv.includes('--dry-run');
const WATCH = process.argv.includes('--watch');

const prismaFiles = () =>
  glob.sync('**/*.prisma', {
    cwd: ROOT_DIR,
    absolute: true,
  });

const seenDefinitions = new Set<string>();
const GENERATOR_BLOCK = `
generator client {
  provider = "prisma-client-js"
}
`;

const DATASOURCE_BLOCK = `
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
`;

function extractBlocks(filePath: string, content: string): string[] {
  const blocks: string[] = [];
  const lines = content.split('\n');

  let currentBlock = '';
  let blockName = '';
  let blockType: 'model' | 'enum' | null = null;
  let insideBlock = false;
  let members: string[] = [];

  for (let line of lines) {
    const trimmed = line.trim();

    if (/^(model|enum)\s+\w+/.test(trimmed)) {
      insideBlock = true;
      currentBlock = line;
      const [type, name] = trimmed.split(/\s+/);
      blockType = type as 'model' | 'enum';
      blockName = name;
      members = [];
    } else if (insideBlock) {
      currentBlock += '\n' + line;
      if (blockType === 'enum' && /^[A-Z0-9_]+$/.test(trimmed) && !trimmed.startsWith('//')) {
        members.push(trimmed);
      }
      if (trimmed === '}') {
        insideBlock = false;

        if (!seenDefinitions.has(blockName)) {
          seenDefinitions.add(blockName);

          const relative = path.relative(path.resolve(__dirname, '..'), filePath).replace(/\\/g, '/');
          if (blockType === 'enum') {
            const sortedEnum = `enum ${blockName} {\n  ${[...new Set(members)].sort().join('\n  ')}\n}`;
            blocks.push(`// --- File: ${relative} ---\n${sortedEnum}`);
          } else {
            blocks.push(`// --- File: ${relative} ---\n${currentBlock}`);
          }
        } else {
          console.warn(`⚠️  Skipped duplicate: ${blockName} from ${filePath}`);
        }

        currentBlock = '';
        blockName = '';
        blockType = null;
        members = [];
      }
    }
  }

  return blocks;
}

function validatePrismaBlock(content: string, filePath: string) {
  const errors: string[] = [];

  const modelRegex = /model\s+(\w+)\s+\{([\s\S]*?)\}/g;
  const enumRegex = /enum\s+(\w+)\s+\{([\s\S]*?)\}/g;

  for (const match of content.matchAll(modelRegex)) {
    const [, modelName, body] = match;
    if (!body.includes('@id')) {
      errors.push(`Model "${modelName}" in ${filePath} is missing an @id field`);
    }
  }

  for (const match of content.matchAll(enumRegex)) {
    const [, enumName, body] = match;
    const lines = body.trim().split('\n');
    for (let line of lines) {
      if (!/^[A-Z0-9_]+$/.test(line.trim()) && line.trim()) {
        errors.push(`Enum "${enumName}" in ${filePath} has invalid member: "${line.trim()}"`);
      }
    }
  }

  return errors;
}

function generateSchema() {
  seenDefinitions.clear();
  const outputSections: string[] = [];
  const allFiles = prismaFiles();
  let validationErrors: string[] = [];

  for (const file of allFiles) {
    const raw = fs.readFileSync(file, 'utf8').trim();

    // Skip generator/datasource blocks
    if (/^(generator|datasource)\s+\w+\s+\{[\s\S]*?\}/m.test(raw)) continue;

    const lintErrors = validatePrismaBlock(raw, file);
    if (lintErrors.length) validationErrors.push(...lintErrors);

    const extracted = extractBlocks(file, raw);
    outputSections.push(...extracted);
  }

  if (validationErrors.length > 0) {
    console.error('❌ Linting Errors:');
    for (const err of validationErrors) {
      console.error(`  - ${err}`);
    }
    return;
  }

  const finalSchema = `// THIS FILE IS AUTO-GENERATED. DO NOT EDIT MANUALLY.

${GENERATOR_BLOCK.trim()}

${DATASOURCE_BLOCK.trim()}

${outputSections.join('\n\n')}
`;

  if (DRY_RUN) {
    console.log(finalSchema);
  } else {
    fs.writeFileSync(OUTPUT_PATH, finalSchema);
    console.log('✅ schema.prisma generated.');
  }
}

if (WATCH) {
  console.log('👀 Watching for changes...');
  chokidar.watch(ROOT_DIR, { ignoreInitial: false }).on('all', () => {
    try {
      generateSchema();
    } catch (err) {
      console.error('❌ Error generating schema:', err);
    }
  });
} else {
  generateSchema();
}
