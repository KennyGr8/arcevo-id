import fs from 'node:fs/promises';
import path from 'node:path';

const MODULES_DIR = path.resolve('auth-kit-core/src/modules');

async function generateModules(dir = MODULES_DIR) {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      await generateModules(fullPath); // recursive
    } else if (entry.isFile() && entry.name.endsWith('.controller.ts')) {
      const baseName = entry.name.replace('.controller.ts', '');
      const controllerFile = path.join(dir, `${baseName}.controller.ts`);
      const serviceFile = path.join(dir, `${baseName}.service.ts`);
      const moduleFile = path.join(dir, `${baseName}.module.ts`);

      try {
        const controllerExists = await fs.stat(controllerFile).then(() => true).catch(() => false);
        const serviceExists = await fs.stat(serviceFile).then(() => true).catch(() => false);

        if (controllerExists && serviceExists) {
          const content = `import { ${capitalize(baseName)}Controller } from "./${baseName}.controller";
import { ${capitalize(baseName)}Service } from "./${baseName}.service";

export const ${capitalize(baseName)}Module = {
  controller: ${capitalize(baseName)}Controller,
  service: ${capitalize(baseName)}Service,
};
`;
          await fs.writeFile(moduleFile, content, 'utf-8');
          console.log(`✅ Generated module: ${moduleFile}`);
        }
      } catch (err) {
        console.error(`❌ Failed generating module for ${baseName}`, err);
      }
    }
  }
}

function capitalize(name: string) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

generateModules().catch((err) => {
  console.error('❌ Error in module generation:', err);
  process.exit(1);
});

// This script generates module files for each controller and service pair in the auth-kit-core/src/modules directory. It checks for the existence of both controller and service files before creating the module file. It uses a recursive function to traverse the directory structure and generate modules for all subdirectories as well.