#!/usr/bin/env tsx

import "dotenv/config";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import prettier from "prettier";
import chalk from "chalk";
import { PrismaParser, PrismaAstDocument } from "@mrleebo/prisma-ast"; // ✅ Corrected
import { z } from "zod";
import { logger } from "@utils/logger";

logger.info(chalk.cyan("🔄 Generating database adapters and schemas..."));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load Prisma schema
const schemaPath = path.join(__dirname, "../prisma/schema.prisma");
if (!fs.existsSync(schemaPath)) {
  logger.warn(chalk.red(`❌ schema.prisma not found at ${schemaPath}`));
  process.exit(1);
}

const schema = fs.readFileSync(schemaPath, "utf-8");
logger.info(chalk.green("✅ Loaded schema prisma"));

// Parse schema safely using PrismaParser
const ast: PrismaAstDocument = PrismaParser.parse(schema);
logger.info(chalk.green("✅ Prisma schema parsed with PrismaParser, Parsed Prisma schema AST"));

// Output directories
const baseOutputDir = path.join(__dirname, "../auth-kit-core/src/core/interfaces/database");
const typesDir = path.join(baseOutputDir, "types");
const zodDir = path.join(baseOutputDir, "zod");
[typesDir, zodDir].forEach((dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// Scalar types recognized by Prisma
const scalarTypes = [
  "String", "Int", "Boolean", "DateTime", "Float", "Json",
  "BigInt", "Bytes", "Decimal"
];

// Extract enums
const enums = ast.list.filter((node) => node.type === "enum");
const enumMap: Record<string, string[]> = {};
for (const en of enums) {
  enumMap[en.name] = en.enumerators.map((e) => e.name);
}

// Utility: Map Prisma type to Zod schema
function prismaToZod(type: string, isArray: boolean, isOptional: boolean, defaultVal?: any): string {
  const baseType = enumMap[type]
    ? `z.enum([${enumMap[type].map((v) => `'${v}'`).join(", ")}])`
    : (scalarTypes.includes(type)
        ? ({
            String: "z.string()",
            Int: "z.number().int()",
            Boolean: "z.boolean()",
            DateTime: "z.coerce.date()",
            Float: "z.number()",
            Json: "z.any()",
            BigInt: "z.bigint()",
            Bytes: "z.instanceof(Buffer)",
            Decimal: "z.number()",
          }[type])
        : `z.custom<${type}>()`);

  let zod = isArray ? `z.array(${baseType})` : baseType;
  if (isOptional || defaultVal !== undefined) zod += ".optional()";
  return zod;
}

// Extract models
const models = ast.list.filter((node) => node.type === "model");
const exports: string[] = [];

for (const model of models) {
  const modelName = model.name;
  const fields = model.properties.filter((p) => p.type === "field");

  const interfaceLines = [`export interface ${modelName}Adapter {`];
  const zodLines = [`export const ${modelName}Schema = z.object({`];

  for (const field of fields) {
    const {
      name: fieldName,
      fieldType,
      array: isArray,
      optional: isOptional,
      attributes,
      documentation,
      comment,
    } = field;

    const isRelation = attributes?.some((a) => a.name === "relation");
    const isComposite = !scalarTypes.includes(fieldType) && !enumMap[fieldType];

    if (isRelation) continue;
    if (isComposite) {
      logger.info(chalk.yellow(`⚠️ Skipping composite field "${fieldName}" in ${modelName}`));
      continue;
    }

    const docBlock = [
      documentation ?? comment ? `* ${(documentation ?? comment)?.trim()}` : null,
      attributes?.find((a) => a.name === "map")?.args?.[0]?.value
        ? `* @mapped("${attributes.find((a) => a.name === "map")?.args?.[0]?.value}")`
        : null,
      attributes?.find((a) => a.name === "default")?.args?.[0]?.value === "uuid()"
        ? `* @default(uuid())`
        : null,
    ]
      .filter(Boolean)
      .map((line) => `  /** ${line} */`)
      .join("\n");

    const interfaceLine = `${docBlock ? docBlock + "\n" : ""}  ${fieldName}${isOptional ? "?" : ""}: ${isArray ? `${fieldType}[]` : fieldType};`;
    const zodLine = `  ${fieldName}: ${prismaToZod(fieldType, isArray, isOptional)},`;

    interfaceLines.push(interfaceLine);
    zodLines.push(zodLine);
  }

  interfaceLines.push("}");
  zodLines.push("});");

  const formattedInterface = prettier.format(interfaceLines.join("\n"), { parser: "typescript" });
  const formattedZod = prettier.format(
    `import { z } from "zod";\n\n${zodLines.join("\n")}`,
    { parser: "typescript" }
  );

  const typePath = path.join(typesDir, `${modelName.toLowerCase()}.adapter.interface.ts`);
  const zodPath = path.join(zodDir, `${modelName.toLowerCase()}.schema.ts`);

  fs.writeFileSync(typePath, formattedInterface);
  fs.writeFileSync(zodPath, formattedZod);

  logger.info(chalk.green(`✅ Generated: ${modelName}Adapter + Schema`));
  exports.push(
    `export * from './types/${modelName.toLowerCase()}.adapter.interface';`,
    `export * from './zod/${modelName.toLowerCase()}.schema';`
  );
}

// Create CIA barrel file
const ciaPath = path.join(baseOutputDir, "cia.ts");
fs.writeFileSync(ciaPath, exports.join("\n"));
logger.info(chalk.green("✅ Created cia.ts barrel file"));
