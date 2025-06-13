import 'dotenv/config';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const schemaHeader = `// THIS FILE IS AUTO-GENERATED. DO NOT EDIT DIRECTLY.
// Modify individual schema parts in the prisma/schemas directory.

generator client {
  provider = "prisma-client-js"
  output   = "../auth-kit-core/src/generated/prisma"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator seed {
  provider = "prisma-client-js"
  output   = "../node_modules/.prisma/client"
}`.trim();

/**
 * Recursively gets all files ending with the given extension
 */
async function getPrismaFilesRecursive(dir: string, extension: string): Promise<string[]> {
  const result: string[] = [];

  async function traverse(currentDir: string) {
    const entries = await fs.readdir(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        await traverse(fullPath);
      } else if (entry.isFile() && entry.name.endsWith(extension)) {
        result.push(fullPath);
      }
    }
  }

  await traverse(dir);
  return result.sort(); // consistent order
}

/**
 * Build Prisma schema by combining schema and enum files
 */
export async function buildSchema(dryRun = false) {
  try {
    const schemasDir = path.resolve(__dirname, '../prisma/schemas');
    const enumsDir = path.resolve(schemasDir, 'enums');
    const outputFile = path.resolve(__dirname, '../prisma/schema.prisma');

    console.log(`🔍 Scanning schemas in: ${schemasDir}`);
    console.log(`🔍 Scanning enums in: ${enumsDir}`);

    const enumFiles = await getPrismaFilesRecursive(enumsDir, '.enum.prisma');
    const schemaFiles = await getPrismaFilesRecursive(schemasDir, '.prisma');

    if (enumFiles.length === 0 && schemaFiles.length === 0) {
      console.warn('⚠️ No schema or enum files found.');
      return;
    }

    const allFiles = [...enumFiles, ...schemaFiles];

    const seen = new Set<string>();
    const parts: string[] = [];

    for (const filePath of allFiles) {
      const content = await fs.readFile(filePath, 'utf-8');

      const relativePath = path.relative(path.resolve(__dirname, '../'), filePath);
      const sanitizedContent = content
        .replace(/generator\s+\w+\s+\{[^}]*\}/g, '')
        .replace(/datasource\s+\w+\s+\{[^}]*\}/g, '')
        .trim();

      if (!sanitizedContent || seen.has(sanitizedContent)) continue;

      seen.add(sanitizedContent);
      parts.push(`// --- File: ${relativePath} ---\n\n${sanitizedContent}`);
    }

    const finalSchema = [schemaHeader, ...parts].join('\n\n');

    if (dryRun) {
      console.log('💡 [Dry Run] Final schema output:\n');
      console.log(finalSchema);
    } else {
      await fs.writeFile(outputFile, finalSchema);
      console.log(`✅ schema.prisma generated at ${outputFile}`);
    }
  } catch (err) {
    console.error('❌ Error building schema:', err instanceof Error ? err.stack : err);
    throw err;
  }
}

// --- CLI Entrypoint ---
if (process.argv[1].endsWith('prisma-build-schema.ts') || process.argv[1].endsWith('prisma-build-schema.js')) {
  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL is not set.');
    process.exit(1);
  }

  const dryRun = process.argv.includes('--dry');

  if (process.env.NODE_ENV !== 'production') {
    console.warn('⚠️ Running Prisma schema builder in development mode.');
  }

  console.log(`🛠 Starting Prisma schema build ${dryRun ? '(Dry Run Mode)' : ''}...`);

  buildSchema(dryRun)
    .then(() => {
      if (!dryRun) console.log('✅ schema.prisma build completed!');
    })
    .catch((err) => {
      console.error('❌ Failed to build Prisma schema:', err);
      process.exit(1);
    });
}
