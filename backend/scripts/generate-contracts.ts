#!/usr/bin/env tsx

import "dotenv/config";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import prettier from "prettier";
import chalk from "chalk";
import { z } from "zod";
import { logger } from "@utils/logger";

logger.info(chalk.cyan("🔄 Generating database adapters, schemas, and DTOs..."));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load Prisma schema
const schemaPath = path.join(__dirname, "../prisma/schema.prisma");
if (!fs.existsSync(schemaPath)) {
  logger.warn(chalk.red(`❌ schema.prisma not found at ${schemaPath}`));
  process.exit(1);
}
const schema = fs.readFileSync(schemaPath, "utf-8");

(async () => {
  const { getDMMF } = await import("@prisma/internals");
  const dmmf = await getDMMF({ datamodel: schema });

  logger.info(chalk.green("✅ Parsed schema using Prisma DMMF"));

  const baseOutputDir = path.join(__dirname, "../auth-kit-core/src/core/contracts/generated");
  const typesRoot = path.join(baseOutputDir, "types");
  const zodRoot = path.join(baseOutputDir, "zod");
  const dtoRoot = path.join(baseOutputDir, "dto");

  const scalarMap = {
    String: "string",
    Int: "number",
    Boolean: "boolean",
    DateTime: "Date",
    Float: "number",
    Json: "any",
    BigInt: "bigint",
    Bytes: "Buffer",
    Decimal: "number",
  };

  const classValidatorMap = {
    String: "IsString",
    Int: "IsInt",
    Boolean: "IsBoolean",
    DateTime: "IsDateString",
    Float: "IsNumber",
    Json: "IsOptional",
    BigInt: "IsNumber",
    Bytes: "IsOptional",
    Decimal: "IsNumber",
  };

  const enumMap: Record<string, string[]> = {};
  for (const en of dmmf.datamodel.enums) {
    enumMap[en.name] = en.values.map((v) => v.name);
  }

  const modules: Record<string, string[]> = {};
  const exports: string[] = [];
  const dtoExports: string[] = [];

  function prismaToZod(type: string, isList: boolean, isOptional: boolean): string {
    const baseType = enumMap[type]
      ? `z.enum([${enumMap[type].map((v) => `'${v}'`).join(", ")}])`
      : (scalarMap[type]
          ? {
              String: "z.string()",
              Int: "z.number().int()",
              Boolean: "z.boolean()",
              DateTime: "z.coerce.date()",
              Float: "z.number()",
              Json: "z.any()",
              BigInt: "z.bigint()",
              Bytes: "z.instanceof(Buffer)",
              Decimal: "z.number()",
            }[type]
          : `z.custom<${type}>()`
        );

    let zod = isList ? `z.array(${baseType})` : baseType;
    if (isOptional) zod += ".optional()";
    return zod;
  }

  for (const model of dmmf.datamodel.models) {
    const modelName = model.name;
    const moduleName = modelName.split(/(?=[A-Z])/)[0].toLowerCase();
    if (!modules[moduleName]) modules[moduleName] = [];
    modules[moduleName].push(modelName);

    const typesDir = path.join(typesRoot, moduleName);
    const zodDir = path.join(zodRoot, moduleName);
    const dtoDir = path.join(dtoRoot, moduleName);
    [typesDir, zodDir, dtoDir].forEach((dir) => {
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    });

    const interfaceLines = [`export interface ${modelName}Adapter {`];
    const zodLines = [`export const ${modelName}Schema = z.object({`];
    const dtoLines = [`import { ${[...new Set(Object.values(classValidatorMap))].join(", ")}, IsOptional } from "class-validator";`, `\nexport class ${modelName}DTO {`];

    for (const field of model.fields) {
      const { name, type, kind, isRequired, isList } = field;
      const isOptional = !isRequired;

      if (kind === "scalar" || kind === "enum") {
        const tsType = isList ? `${type}[]` : type;
        interfaceLines.push(`  ${name}${isOptional ? "?" : ""}: ${tsType};`);
        zodLines.push(`  ${name}: ${prismaToZod(type, isList, isOptional)},`);

        const decorator = classValidatorMap[type] || "IsOptional";
        const optionalDecorator = isOptional ? "@IsOptional()\n  " : "";
        dtoLines.push(`  ${optionalDecorator}@${decorator}()\n  ${name}${isOptional ? "?" : ""}: ${isList ? `${scalarMap[type] || "any"}[]` : scalarMap[type] || "any"};`);
      } else if (kind === "object") {
        interfaceLines.push(`  ${name}${isOptional ? "?" : ""}: any;`);
        zodLines.push(`  ${name}: z.any().optional(),`);
        dtoLines.push(`  @IsOptional()\n  ${name}?: any;`);
      }
    }

    interfaceLines.push("}");
    zodLines.push("});");
    dtoLines.push("}");

    const formattedInterface = await prettier.format(interfaceLines.join("\n"), { parser: "typescript" });
    const formattedZod = await prettier.format(`import { z } from "zod";\n\n${zodLines.join("\n")}`, { parser: "typescript" });
    const formattedDTO = await prettier.format(dtoLines.join("\n"), { parser: "typescript" });

    fs.writeFileSync(path.join(typesDir, `${modelName}.adapter.interface.ts`), formattedInterface);
    fs.writeFileSync(path.join(zodDir, `${modelName}.schema.ts`), formattedZod);
    fs.writeFileSync(path.join(dtoDir, `${modelName}.dto.ts`), formattedDTO);

    exports.push(`export * from './types/${moduleName}/${modelName}.adapter.interface';`);
    exports.push(`export * from './zod/${moduleName}/${modelName}.schema';`);
    dtoExports.push(`export * from './dto/${moduleName}/${modelName}.dto';`);

    logger.info(chalk.green(`✅ Generated: ${modelName} Adapter + Schema + DTO`));
  }
  
  // 🔁 Reusable helper
const writeIndex = (dir: string, files: string[]) => {
  const relPaths = files.map((file) => `export * from './${file}';`).join("\n");
  fs.writeFileSync(path.join(dir, "index.ts"), relPaths);
};

const collectRelativeNames = (dir: string): string[] =>
  fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".ts") && f !== "index.ts")
    .map((f) => f.replace(/\.ts$/, ""));

const groupedModels = new Set<string>();

// 🧱 Write per-folder index.ts + per-model index (e.g., user.ts)
for (const [baseDirName, root] of [
  ["types", typesRoot],
  ["zod", zodRoot],
  ["dto", dtoRoot]
]) {
  const indexLines: string[] = [];

  for (const namespace of fs.readdirSync(root)) {
    const subDir = path.join(root, namespace);
    if (!fs.statSync(subDir).isDirectory()) continue;

    const files = collectRelativeNames(subDir);
    if (!files.length) continue;

    // Write subfolder index.ts (e.g., types/user/index.ts)
    writeIndex(subDir, files);

    // Add to root folder index (e.g., types/index.ts)
    indexLines.push(`export * from './${namespace}';`);
    groupedModels.add(namespace);
  }

  // Write types/zod/dto root index.ts
  fs.writeFileSync(path.join(root, "index.ts"), indexLines.join("\n"));
  logger.info(chalk.gray(`📄 index.ts generated for ${baseDirName}/`));
}

// 🔄 Create grouped barrel files: user.ts, order.ts, etc.
for (const modelGroup of groupedModels) {
  const fileLines = [
    `export * from './types/${modelGroup}';`,
    `export * from './zod/${modelGroup}';`,
    `export * from './dto/${modelGroup}';`,
  ];
  fs.writeFileSync(path.join(baseOutputDir, `${modelGroup}.ts`), fileLines.join("\n"));
  logger.info(chalk.blue(`📦 Generated combined export: ${modelGroup}.ts`));
}

// 🧱 Root-level types.ts / zod.ts / dto.ts exports
fs.writeFileSync(path.join(baseOutputDir, "types.ts"), `export * from './types';`);
fs.writeFileSync(path.join(baseOutputDir, "zod.ts"), `export * from './zod';`);
fs.writeFileSync(path.join(baseOutputDir, "dto.ts"), `export * from './dto';`);

  logger.info(chalk.green("✅ Created barrel files: cia.ts and dto.ts"));
  logger.info(chalk.cyan("📦 Grouped Models by Namespace:"));
  Object.entries(modules).forEach(([group, models]) => {
    logger.info(`  - ${group}: ${models.join(", ")}`);
  });
})();
