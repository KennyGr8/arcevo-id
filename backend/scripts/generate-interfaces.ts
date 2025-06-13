import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs-extra';
import chokidar from 'chokidar';
import prettier from 'prettier';
import { program } from 'commander';
import { PrismaParser } from '@mrleebo/prisma-ast';
import { logger } from '@utils/logger';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PRISMA_SCHEMA_PATH = path.resolve(__dirname, '../prisma/schema.prisma');
const OUTPUT_INTERFACE_DIR = path.resolve(__dirname, '../auth-kit-core/src/core/interfaces/database');
const OUTPUT_ZOD_DIR = path.resolve(__dirname, '../auth-kit-core/src/core/interfaces/database/zod');
const CIA_FILE_PATH = path.resolve(__dirname, '../auth-kit-core/src/core/interfaces/database/cia.ts');

program
  .option('--overwrite', 'Overwrite existing files', false)
  .option('--only <model>', 'Generate only for a specific model')
  .option('--watch', 'Watch schema for changes')
  .parse(process.argv);

const options = program.opts();

const FIELD_TYPE_MAP: Record<string, string> = {
  String: 'string',
  Int: 'number',
  Float: 'number',
  Boolean: 'boolean',
  DateTime: 'Date',
  Json: 'any',
};

const ZOD_TYPE_MAP: Record<string, string> = {
  String: 'z.string()',
  Int: 'z.number()',
  Float: 'z.number()',
  Boolean: 'z.boolean()',
  DateTime: 'z.date()',
  Json: 'z.any()',
};

function toPascalCase(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function mapFieldType(fieldType: string, isArray: boolean): string {
  const base = FIELD_TYPE_MAP[fieldType] || fieldType;
  return isArray ? `${base}[]` : base;
}

function mapZodType(fieldType: string, isArray: boolean): string {
  const base = ZOD_TYPE_MAP[fieldType] || 'z.any()';
  return isArray ? `z.array(${base})` : base;
}

function generateInterface(model: any): string {
  const name = toPascalCase(model.name);

  const fields = model.properties
    .filter((p: any) => p.type === 'field' && typeof p.fieldType === 'string')
    .map((field: any) => `  ${field.name}${field.optional ? '?' : ''}: ${mapFieldType(field.fieldType, field.array)};`)
    .join('\n');

  return `export interface ${name} {
${fields}
}

export interface ${name}Adapter {
  findById(id: string): Promise<${name} | null>;
  create(data: Partial<${name}>): Promise<${name}>;
  update(id: string, data: Partial<${name}>): Promise<${name}>;
  delete(id: string): Promise<void>;
}
`;
}

function generateZodSchema(model: any): string {
  const fields = model.properties
    .filter((p: any) => p.type === 'field' && typeof p.fieldType === 'string')
    .map((field: any) => {
      const zodType = mapZodType(field.fieldType, field.array);
      const optional = field.optional ? '.optional()' : '';
      return `  ${field.name}: ${zodType}${optional},`;
    })
    .join('\n');

  return `import { z } from 'zod';

export const ${model.name}Schema = z.object({
${fields}
});
`;
}

async function format(content: string): Promise<string> {
  try {
    return await prettier.format(content, { parser: 'typescript' });
  } catch (err) {
    logger.warn('⚠️ Failed to format with Prettier. Returning raw content.');
    return content;
  }
}

async function parsePrismaModels(): Promise<any[]> {
  const raw = await fs.readFile(PRISMA_SCHEMA_PATH, 'utf-8');
  const ast = PrismaParser(raw);
  return ast.list.filter((node: any) => node.type === 'model');
}

async function generateAllInterfaces(): Promise<void> {
  try {
    const models = await parsePrismaModels();
    const onlyModel = options.only?.toLowerCase() || null;

    await fs.ensureDir(OUTPUT_INTERFACE_DIR);
    await fs.ensureDir(OUTPUT_ZOD_DIR);

    const ciaExports: string[] = [];

    for (const model of models) {
      const modelName = model.name;
      if (onlyModel && modelName.toLowerCase() !== onlyModel) continue;

      const interfaceFilename = `${modelName.toLowerCase()}.adapter.interface.ts`;
      const zodFilename = `${modelName.toLowerCase()}.schema.ts`;

      const interfacePath = path.join(OUTPUT_INTERFACE_DIR, interfaceFilename);
      const zodPath = path.join(OUTPUT_ZOD_DIR, zodFilename);

      if (!options.overwrite && await fs.pathExists(interfacePath)) {
        logger.warn(`⏭ Skipped ${interfaceFilename} (exists, no --overwrite)`);
        continue;
      }

      const interfaceContent = await format(generateInterface(model));
      const zodContent = await format(generateZodSchema(model));

      await fs.writeFile(interfacePath, interfaceContent);
      await fs.writeFile(zodPath, zodContent);

      ciaExports.push(`export * from './${path.basename(interfaceFilename, '.ts')}';`);
      logger.info(`✅ Generated: ${interfaceFilename}, ${zodFilename}`);
    }

    const exportBlock = await format(`// AUTO-GENERATED. DO NOT EDIT.\n${ciaExports.join('\n')}\n`);
    await fs.writeFile(CIA_FILE_PATH, exportBlock);
    logger.info(`📦 Updated export barrel: ${path.basename(CIA_FILE_PATH)}`);
  } catch (err) {
    logger.error('🚨 Interface generation failed:', err);
    process.exit(1);
  }
}

function startWatcher(): void {
  chokidar.watch(PRISMA_SCHEMA_PATH).on('change', () => {
    logger.info('🔁 Detected schema change. Regenerating...');
    generateAllInterfaces().catch(logger.error);
  });
}

// Run
generateAllInterfaces().then(() => {
  if (options.watch) {
    logger.info('👀 Watch mode enabled. Listening for schema changes...');
    startWatcher();
  }
});
