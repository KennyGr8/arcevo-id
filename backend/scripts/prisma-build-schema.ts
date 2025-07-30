import 'dotenv/config';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import crypto from 'node:crypto';
import { logger } from '@utils/logger';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration - adjust these based on your needs
const DEFAULT_BATCH_SIZE = 10;
const MEMORY_MONITORING_INTERVAL = 5; // batches between memory logs
const LARGE_FILE_THRESHOLD = 1024 * 1024; // 1MB (files larger than this get special handling)

// Header for the schema.prisma file
const SCHEMA_HEADER = `// THIS FILE IS AUTO-GENERATED. DO NOT EDIT DIRECTLY.
// Modify individual schema parts in the adapters/database/prisma/schemas directory.

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
  output   = "../../node_modules/.prisma/client"
}`.trim();

// Subfolders we want to scan
const TARGET_SUBDIRS = [
  'audit',
  'billing',
  'core',
  'enums',
  'feature',
  'organization',
];

// Memory monitoring utility
function logMemoryUsage(label = 'Memory usage') {
  const used = process.memoryUsage();
  const format = (bytes: number) => `${Math.round(bytes / 1024 / 1024)}MB`;
  
  logger.debug(`${label}:
    RSS: ${format(used.rss)} (Total memory allocated)
    HeapTotal: ${format(used.heapTotal)}
    HeapUsed: ${format(used.heapUsed)}
    External: ${format(used.external)} (C++ objects)
    ArrayBuffers: ${format(used.arrayBuffers)}`);
}

// Garbage collection helper (requires --expose-gc flag)
function tryGarbageCollect() {
  if (global.gc) {
    const before = process.memoryUsage().heapUsed;
    global.gc();
    const after = process.memoryUsage().heapUsed;
    logger.silly(`GC freed ~${Math.round((before - after) / 1024 / 1024)}MB`);
  }
}

// File processing with size awareness
async function processFile(filePath: string, prismaDir: string) {
  try {
    // Check file size first
    const stats = await fs.stat(filePath);
    const isLargeFile = stats.size > LARGE_FILE_THRESHOLD;

    let content: string;
    if (isLargeFile) {
      logger.debug(`Processing large file (${Math.round(stats.size / 1024)}KB): ${filePath}`);
      content = await fs.readFile(filePath, 'utf-8');
    } else {
      content = await fs.readFile(filePath, 'utf-8');
    }

    const relativePath = path.relative(prismaDir, filePath);
    const sanitized = content
      .replace(/generator\s+\w+\s+\{[^}]*\}/gs, '')
      .replace(/datasource\s+\w+\s+\{[^}]*\}/gs, '')
      .trim();

    if (!sanitized) {
      logger.warn(`Empty content in file: ${relativePath}`);
      return null;
    }

    // Create content hash for duplicate detection
    const hash = crypto.createHash('sha256').update(sanitized).digest('hex');
    return {
      content: `// --- File: ${relativePath} ---\n\n${sanitized}`,
      hash
    };
  } catch (err) {
    logger.error(`Failed to process file ${filePath}:`, err);
    return null;
  }
}

// Process files in batches with memory management
async function processFilesInBatches(filePaths: string[], prismaDir: string, batchSize = DEFAULT_BATCH_SIZE) {
  const parts: string[] = [];
  const seenHashes = new Set<string>();
  let duplicateCount = 0;
  let batchCounter = 0;

  for (let i = 0; i < filePaths.length; i += batchSize) {
    const batch = filePaths.slice(i, i + batchSize);
    batchCounter++;

    logger.debug(`Processing batch ${batchCounter} (files ${i + 1}-${Math.min(i + batchSize, filePaths.length)})`);

    const batchPromises = batch.map(filePath => processFile(filePath, prismaDir));
    const batchResults = await Promise.all(batchPromises);

    for (const result of batchResults) {
      if (!result) continue;
      
      if (seenHashes.has(result.hash)) {
        duplicateCount++;
        continue;
      }

      seenHashes.add(result.hash);
      parts.push(result.content);
    }

    // Periodic memory monitoring
    if (batchCounter % MEMORY_MONITORING_INTERVAL === 0) {
      logMemoryUsage(`After batch ${batchCounter}`);
      tryGarbageCollect();
    }
  }

  if (duplicateCount > 0) {
    logger.info(`Skipped ${duplicateCount} duplicate schema definitions`);
  }

  return parts;
}

// Recursively get all files with specific extension
async function getPrismaFiles(baseDir: string, extension: string): Promise<string[]> {
  const files: string[] = [];

  for (const subdir of TARGET_SUBDIRS) {
    const fullSubdir = path.join(baseDir, subdir);
    try {
      const entries = await fs.readdir(fullSubdir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(fullSubdir, entry.name);
        if (entry.isFile() && entry.name.endsWith(extension)) {
          files.push(fullPath);
        }
      }
    } catch (err) {
      logger.silly(`Skipping non-existent directory: ${fullSubdir}`);
    }
  }

  return files.sort(); // Consistent order
}

export async function buildSchema(options: { dryRun?: boolean; batchSize?: number } = {}) {
  const { dryRun = false, batchSize = DEFAULT_BATCH_SIZE } = options;
  
  try {
    const prismaDir = path.resolve(__dirname, '../adapters/database/prisma');
    const schemasDir = path.join(prismaDir, 'schemas');
    const outputFile = path.join(prismaDir, 'schema.prisma');

    // Start monitoring
    const startTime = Date.now();
    logger.info('🚀 Starting Prisma schema builder');
    logMemoryUsage('Initial memory state');

    logger.info(`📦 Searching for schema files in: ${schemasDir}`);
    const [enumFiles, modelFiles] = await Promise.all([
      getPrismaFiles(schemasDir, '.enum.prisma'),
      getPrismaFiles(schemasDir, '.prisma')
    ]);

    if (enumFiles.length === 0 && modelFiles.length === 0) {
      logger.warn('⚠️ No schema files found.');
      return { success: false, message: 'No schema files found' };
    }

    logger.info(`Found ${enumFiles.length} enum files and ${modelFiles.length} model files`);
    const allFiles = [...enumFiles, ...modelFiles];
    
    // Dynamic batch sizing based on file count
    const dynamicBatchSize = Math.max(
      5, 
      Math.min(batchSize, Math.floor(allFiles.length / 5))
    );
    logger.debug(`Using batch size: ${dynamicBatchSize}`);

    const parts = await processFilesInBatches(allFiles, prismaDir, dynamicBatchSize);

    if (parts.length === 0) {
      logger.warn('⚠️ No valid schema content found after processing.');
      return { success: false, message: 'No valid schema content' };
    }

    logger.info('Assembling final schema...');
    logMemoryUsage('Before final assembly');
    const finalSchema = [SCHEMA_HEADER, ...parts].join('\n\n');

    if (dryRun) {
      logger.info('💡 [Dry Run] Generated schema.prisma:\n\n' + finalSchema);
    } else {
      await fs.writeFile(outputFile, finalSchema);
      logger.info(`✅ schema.prisma generated successfully at ${outputFile}`);
    }

    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    logger.info(`✨ Completed in ${duration} seconds`);
    logMemoryUsage('Final memory state');

    return { 
      success: true,
      fileCount: allFiles.length,
      uniqueParts: parts.length,
      duration: parseFloat(duration)
    };
  } catch (err) {
    logger.error('❌ Failed to build schema:', err instanceof Error ? err.stack : err);
    throw err;
  }
}

// Enhanced CLI Entry
if (
  process.argv[1].endsWith('prisma-build-schema.ts') ||
  process.argv[1].endsWith('prisma-build-schema.js')
) {
  (async () => {
    if (!process.env.DATABASE_URL) {
      logger.error('❌ DATABASE_URL is not set.');
      process.exit(1);
    }

    const dryRun = process.argv.includes('--dry');
    const batchSize = parseInt(process.argv.find(arg => arg.startsWith('--batch-size='))?.split('=')[1] || DEFAULT_BATCH_SIZE;
    
    if (process.env.NODE_ENV !== 'production') {
      logger.warn('⚠️ Running in development mode. Memory usage may be higher.');
    }

    try {
      const result = await buildSchema({ dryRun, batchSize });
      
      if (!result.success) {
        process.exit(1);
      }

      if (!dryRun) {
        logger.info('✅ Schema build completed successfully');
      }
    } catch (err) {
      logger.error('❌ Fatal error during schema build:', err);
      process.exit(1);
    }
  })();
}