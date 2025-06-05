import 'dotenv/config';
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

console.log("👀 Script started running...");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const schemaHeader = `
// THIS FILE IS AUTO-GENERATED. DO NOT EDIT DIRECTLY.
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
}
`.trim();

async function getPrismaFilesFromDir(dir: string, extension = ".prisma") {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(extension))
    .map((entry) => path.join(dir, entry.name));
}

export async function buildSchema() {
  try {
    const schemasDir = path.resolve(__dirname, "../prisma/schemas");
    const enumsDir = path.resolve(schemasDir, "enums");
    const outputFile = path.resolve(__dirname, "../prisma/schema.prisma");

    console.log(`🔍 Reading schema parts from: ${schemasDir}`);
    console.log(`🔍 Reading enum parts from: ${enumsDir}`);

    const schemaFiles = await getPrismaFilesFromDir(schemasDir);
    const enumFiles = await getPrismaFilesFromDir(enumsDir, ".enum.prisma");

    if (schemaFiles.length === 0 && enumFiles.length === 0) {
      console.warn("⚠️ No schema or enum parts found.");
      return;
    }

    const allFiles = [...enumFiles, ...schemaFiles]; // enums first, then models

    const parts = await Promise.all(
      allFiles.map(async (filePath) => {
        console.log(`📄 Processing: ${filePath}`);
        const content = await fs.readFile(filePath, "utf-8");
        return content
          .replace(/generator\s+\w+\s+\{[^}]*\}/g, "")
          .replace(/datasource\s+\w+\s+\{[^}]*\}/g, "")
          .trim();
      })
    );

    const finalSchema = [schemaHeader, ...parts].join("\n\n");
    await fs.writeFile(outputFile, finalSchema);

    console.log(`✅ schema.prisma generated successfully at ${outputFile}`);
  } catch (err) {
    console.error("❌ Error inside buildSchema():", err instanceof Error ? err.stack : err);
    throw err;
  }
}

if (process.argv[1].endsWith("prisma-build-schema.ts")) {
  if (process.env.NODE_ENV !== "production") {
    console.warn("⚠️  This script is intended for production builds only. Running in development mode.");
  }

  if (!process.env.DATABASE_URL) {
    console.error("❌ DATABASE_URL environment variable is not set. Please set it before running this script.");
    process.exit(1);
  }

  console.log("🛠 Building Prisma schema...");
  buildSchema()
    .then(() => console.log("✅ schema.prisma generated successfully!"))
    .catch((err) => {
      console.error("❌ Failed to build schema:", err instanceof Error ? err.stack : err);
      process.exit(1);
    });
}
