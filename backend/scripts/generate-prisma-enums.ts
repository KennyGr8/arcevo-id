import fs from 'fs';
import path from 'path';
import chokidar from 'chokidar';
import glob from 'fast-glob';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SCHEMA_ROOT = path.resolve(__dirname, '../prisma/schemas');
const OUTPUT_PATH = path.resolve(__dirname, '../prisma/schema.prisma');

const getSchemaFiles = () =>
  glob.sync('**/*.prisma', { cwd: SCHEMA_ROOT, absolute: true });

const extractDefinitions = (content: string) => {
  const models = Array.from(content.matchAll(/model\s+(\w+)\s+\{[^}]*\}/gs));
  const enums = Array.from(content.matchAll(/enum\s+(\w+)\s+\{[^}]*\}/gs));
  return { models, enums };
};

const sanitizeEnum = (enumBlock: string): string => {
  return enumBlock.replace(/^(\s*)(\w+)/gm, (match, indent, word) => {
    return `${indent}${word.toUpperCase()}`; // Force uppercase values
  });
};

const buildUnifiedSchema = () => {
  const modelSet = new Set<string>();
  const enumSet = new Set<string>();
  const enums: string[] = [];
  const models: string[] = [];

  const files = getSchemaFiles();

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    const { models: fileModels, enums: fileEnums } = extractDefinitions(content);

    for (const [, name, block] of fileModels.map(m => [...m, m[0]])) {
      if (modelSet.has(name)) {
        console.warn(`⚠️  Skipped duplicate model: ${name} from ${file}`);
        continue;
      }
      modelSet.add(name);
      models.push(block);
    }

    for (const [, name, block] of fileEnums.map(e => [...e, e[0]])) {
      if (enumSet.has(name)) {
        console.warn(`⚠️  Skipped duplicate enum: ${name} from ${file}`);
        continue;
      }
      enumSet.add(name);
      enums.push(sanitizeEnum(block));
    }
  }

  enums.sort(); // 🧠 Alphabetical sorting
  const banner = `// AUTO-GENERATED FILE. DO NOT EDIT MANUALLY\n// Run: pnpm prisma:build-schema\n\n`;

  return banner + enums.join('\n\n') + '\n\n' + models.join('\n\n') + '\n';
};

const writeSchemaFile = () => {
  const finalSchema = buildUnifiedSchema();
  fs.writeFileSync(OUTPUT_PATH, finalSchema, 'utf8');
  console.log(`✅ Generated schema.prisma with ${OUTPUT_PATH}`);
};

const isWatchMode = process.argv.includes('--watch');
if (isWatchMode) {
  console.log('👀 Watch mode enabled...');
  chokidar.watch(SCHEMA_ROOT).on('change', () => {
    console.clear();
    console.log('🔄 Detected change. Rebuilding schema...');
    try {
      writeSchemaFile();
    } catch (err) {
      console.error('❌ Error rebuilding schema:', err);
    }
  });
} else {
  writeSchemaFile();
}
