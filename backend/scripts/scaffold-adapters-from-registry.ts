#!/usr/bin/env ts-node

import path from "path";
import fs from "fs";
import { Project } from "ts-morph";
import { camelCase, pascalCase } from "change-case";
import { logger } from "@utils/logger";

const REGISTRY_PATH = path.resolve("src/@types/adapter-registry.d.ts");
const OUTPUT_DIR = path.resolve("src/core/adapters/database/register/prisma");
const FORCE = process.argv.includes("--force");

const project = new Project({
  tsConfigFilePath: path.resolve("tsconfig.json"),
});

function run() {
  if (!fs.existsSync(REGISTRY_PATH)) {
    logger.warn("❌ adapter-registry.d.ts not found.");
    process.exit(1);
  }

  const sourceFile = project.addSourceFileAtPath(REGISTRY_PATH);
  const registryInterface = sourceFile.getInterfaceOrThrow("AdapterRegistry");

  registryInterface.getProperties().forEach((property) => {
    const registryKey = property.getName(); // e.g. "user"
    const interfaceName = property.getTypeNodeOrThrow().getText(); // e.g. "IUserAdapter"

    const entityName = interfaceName.replace(/^I/, "").replace(/Adapter$/, ""); // e.g. "User"
    const modelName = `${entityName}Model`;
    const adapterConst = `Prisma${entityName}Adapter`;
    const fileName = `${camelCase(registryKey)}.adapter.ts`;
    const filePath = path.join(OUTPUT_DIR, fileName);

    if (fs.existsSync(filePath) && !FORCE) {
      logger.info(`⚠️  Skipping existing: ${fileName}`);
      return;
    }

    const fileContent = `import { prisma } from "@/database";
import { ${modelName} } from "@/database";
import * as DTO from "@/contracts/generated/dto";
import type { ${interfaceName} } from "@/core/interfaces/database";

export const ${adapterConst}: ${interfaceName}<${modelName}> = {
  // TODO: Implement ${adapterConst} methods
};
`;

    fs.writeFileSync(filePath, fileContent);
    logger.info(`✅ Generated: ${fileName}`);
  });

  logger.info("\n🎯 Done. Adapter files generated from adapter registry.");
}

run();