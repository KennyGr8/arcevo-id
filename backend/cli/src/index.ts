#!/usr/bin/env node
import { Command } from 'commander';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const program = new Command();

// Use env var or fallback to default relative path
const MODULES_ROOT = process.env.MODULES_ROOT
  ? path.resolve(process.cwd(), process.env.MODULES_ROOT)
  : path.resolve(__dirname, '../../auth-kit-core/src/modules');

program
  .name('voltix-cli')
  .description('Voltix (NexaAuth) CLI - module scaffolding & tooling')
  .version('0.1.0');

// Example command: scaffold README for a module
program
  .command('generate:readme')
  .description('Generate a README.md for a given module')
  .argument('<moduleName>', 'Module folder name inside auth-kit-core/src/modules')
  .option('-o, --output <file>', 'Output file path (default: README.md in module folder)')
  .action((moduleName, options) => {
    const modulePath = path.join(MODULES_ROOT, moduleName);
    if (!fs.existsSync(modulePath)) {
      console.error(`❌ Module folder not found: ${modulePath}`);
      process.exit(1);
    }

    const readmePath = options.output
      ? path.resolve(process.cwd(), options.output)
      : path.join(modulePath, 'README.md');

    // Template for README (you can expand with dynamic content)
    const readmeContent = `# ${moduleName} Module

This folder contains the \`${moduleName}\` module for Voltix (NexaAuth).

## Overview

Explain the purpose, features, and usage of this module here.

## Folder Structure

\`\`\`
${moduleName}/
├── controller.ts
├── service.ts
├── routes.ts
├── validators.ts
└── README.md
\`\`\`

## Usage

Describe how to use this module in the backend.

## Development

- Run tests: \`npm test\`
- Start dev server: \`npm run dev\`
- Lint: \`npm run lint\`

## Contributing

Please follow the project's contributing guidelines.

`;

    fs.writeFileSync(readmePath, readmeContent, { encoding: 'utf8' });
    console.log(`✅ README generated at: ${readmePath}`);
  });

program.parse();
