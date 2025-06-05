// scripts/generate-prisma-enums.ts
import fs from 'fs';
import path from 'path';

const schemaPath = path.resolve('prisma/schema.prisma');
const outputDir = path.resolve('auth-kit-core/src/common/constants/prisma-enums');

function toPascalCase(input: string) {
  return input
    .replace(/([-_][a-z])/g, group => group.toUpperCase().replace('-', '').replace('_', ''))
    .replace(/^[a-z]/, c => c.toUpperCase());
}

function extractEnumsFromSchema(schema: string) {
  const enumRegex = /enum\s+(\w+)\s*{([^}]*)}/g;
  const enums: { name: string; values: string[] }[] = [];
  let match;

  while ((match = enumRegex.exec(schema)) !== null) {
    const [, name, body] = match;
    const values = body
      .split('\n')
      .map(line => line.trim())
      .filter(Boolean)
      .filter(v => !v.startsWith('//'));

    enums.push({ name, values });
  }

  return enums;
}

function generateEnumFileContent(enumName: string, values: string[]) {
  const lines = values.map(val => `  ${val} = "${val}",`);
  return `export enum ${enumName} {\n${lines.join('\n')}\n}\n`;
}

function getEnumFilename(enumName: string) {
  return enumName
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .toLowerCase()
    .concat('.enum.ts');
}

function writeEnumsToFiles(enums: { name: string; values: string[] }[]) {
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  for (const { name, values } of enums) {
    const pascalName = toPascalCase(name);
    const filename = getEnumFilename(name);
    const filePath = path.join(outputDir, filename);
    const content = generateEnumFileContent(pascalName, values);
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✅ Wrote ${filePath}`);
  }
}

function updateIndexFile(enums: { name: string }[]) {
  const indexPath = path.join(outputDir, 'index.ts');
  const lines = enums.map(({ name }) => {
    const file = './' + getEnumFilename(name).replace(/\.ts$/, '');
    return `export * from '${file}';`;
  });
  fs.writeFileSync(indexPath, lines.join('\n') + '\n', 'utf-8');
  console.log(`✅ Updated index.ts with all exports`);
}

function main() {
  const schema = fs.readFileSync(schemaPath, 'utf-8');
  const enums = extractEnumsFromSchema(schema);
  if (enums.length === 0) {
    console.log('No enums found in Prisma schema.');
    return;
  }

  writeEnumsToFiles(enums);
  updateIndexFile(enums);
}

main();
