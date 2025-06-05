import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';

const PACKAGE_JSON_PATH = path.resolve(process.cwd(), 'package.json');
const packageJson = JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH, 'utf8'));

const scripts = packageJson.scripts || {};

// Add scripts here that you want to skip when testing all scripts
const skipScripts = new Set(['dev', 'start', 'test', 'test:scripts']);

async function runScript(name) {
  return new Promise((resolve, reject) => {
    console.log(`\n--- Running npm script: "${name}" ---`);

    const child = exec(`npm run ${name}`, { stdio: 'inherit' });

    child.stdout?.pipe(process.stdout);
    child.stderr?.pipe(process.stderr);

    child.on('close', (code) => {
      if (code === 0) {
        console.log(`✅ Script "${name}" finished successfully.`);
        resolve();
      } else {
        console.error(`❌ Script "${name}" failed with exit code ${code}.`);
        reject(new Error(`Script "${name}" failed`));
      }
    });
  });
}

async function runAllScripts() {
  for (const name of Object.keys(scripts)) {
    if (skipScripts.has(name)) {
      console.log(`⏭ Skipping script: "${name}"`);
      continue;
    }
    try {
      await runScript(name);
    } catch (err) {
      console.error(err);
      console.error('Aborting remaining scripts.');
      process.exit(1);
    }
  }
  console.log('\n🎉 All tested scripts ran successfully!');
}

runAllScripts();
