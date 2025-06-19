import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { logger } from "@utils/logger";

const BASE_DIR = path.resolve("auth-kit-core/src/core/interfaces/database");

const MODULES = [
  "user",
  "session",
  "mfa",
  "auth-log",
  "activity-log",
  "admin-audit-log",
  "oauth-account",
  "email-token",
  "subscription",
  "billing-event",
  "organization",
];

const toPascal = (str: string) =>
  str.replace(/[-_](.)/g, (_, c) => c.toUpperCase()).replace(/^(.)/, (_, c) => c.toUpperCase());

const getFileContent = (moduleName: string) => {
  const Pascal = toPascal(moduleName);
  const modelName = Pascal.replace(/Log$/, "Log").replace(/Account$/, "Account");

  return {
    adapter: `// ${moduleName}.interface.adapter.ts

import type { ${modelName} } from "@database/prisma";
import DTO from "./${moduleName}.dto";

export interface I${Pascal}Adapter<TModel = ${modelName}> {
  findAll(): Promise<TModel[]>;
  findById(id: string): Promise<TModel | null>;
  create(data: DTO["Create"]): Promise<TModel>;
  update(id: string, data: DTO["Update"]): Promise<TModel>;
  delete(id: string): Promise<void>;
}
`,

    dto: `// ${moduleName}.dto.ts

export type Create${Pascal}Dto = {
  // TODO: define fields
};

export type Update${Pascal}Dto = {
  // TODO: define fields
};

const DTO = {
  Create: {} as Create${Pascal}Dto,
  Update: {} as Update${Pascal}Dto,
};

export default DTO;
`,

    mock: `// ${moduleName}.mock.ts

// Mock data or factories for ${Pascal}
export const mock${Pascal} = {
  id: "mock-id",
  // fill with realistic mock values
};
`,

    test: `// ${moduleName}.test.ts

import { describe, it, expect } from "vitest"; // or your preferred test runner

describe("${Pascal}Adapter", () => {
  it("should be defined", () => {
    expect(true).toBe(true);
  });
});
`,

    index: `export * from "./${moduleName}.interface.adapter";
export { default as DTO } from "./${moduleName}.dto";`,
  };
};

async function scaffold() {
  try {
    logger.info("🔧 Scaffolding interfaces/database...");

    for (const module of MODULES) {
      const modulePath = path.join(BASE_DIR, module);
      const { adapter, dto, test, mock, index } = getFileContent(module);

      await mkdir(modulePath, { recursive: true });

      await writeFile(path.join(modulePath, `${module}.interface.adapter.ts`), adapter, { flag: "w" });
      await writeFile(path.join(modulePath, `${module}.dto.ts`), dto, { flag: "w" });
      await writeFile(path.join(modulePath, `${module}.mock.ts`), mock, { flag: "w" });
      await writeFile(path.join(modulePath, `${module}.test.ts`), test, { flag: "w" });
      await writeFile(path.join(modulePath, `index.ts`), index, { flag: "w" });
    }

    const rootBarrel = MODULES.map((m) => `export * from "./${m}";`).join("\n") + "\n";
    await writeFile(path.join(BASE_DIR, "index.ts"), rootBarrel, { flag: "w" });

    logger.info("✅ interfaces/database scaffold created.");
  } catch (err) {
    logger.warn("❌ Error scaffolding interfaces:", err);
  }
}

scaffold();
