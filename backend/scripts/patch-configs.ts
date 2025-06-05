import fs from 'node:fs/promises';
import path from 'node:path';

async function patchConfigs() {
  const envPath = path.resolve('auth-kit-core/src/common/validators/env.config.ts');
  const content = await fs.readFile(envPath, 'utf-8');

  if (!content.includes('APP_ENV')) {
    const patched = content.replace(
      'z.object({',
      `z.object({\n  APP_ENV: z.enum(['development', 'production', 'test']).default('development'),`
    );
    await fs.writeFile(envPath, patched);
    console.log('✅ Patched env.config.ts with APP_ENV');
  } else {
    console.log('ℹ️ env.config.ts already patched.');
  }
}

patchConfigs().catch((err) => {
  console.error('❌ Failed to patch configs:', err);
  process.exit(1);
});

// This script patches the env.config.ts file to ensure it includes the APP_ENV variable. It checks if the variable is already present and only modifies the file if necessary.