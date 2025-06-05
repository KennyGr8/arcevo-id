// scripts/generate-frontend-env.ts
import fs from 'node:fs/promises';
import path from 'node:path';
import dotenv from 'dotenv';

dotenv.config();

const FRONTEND_ENV_PATH = path.resolve('frontend/.env.generated.ts');

const frontendSafeKeys = [
  'NEXT_PUBLIC_API_URL',
  'NEXT_PUBLIC_ENV',
  'NEXT_PUBLIC_APP_NAME'
];

async function generateFrontendEnv() {
  const lines: string[] = [];

  frontendSafeKeys.forEach((key) => {
    const value = process.env[key];
    if (value !== undefined) {
      lines.push(`export const ${key} = "${value}";`);
    }
  });

  await fs.writeFile(FRONTEND_ENV_PATH, lines.join('\n'), 'utf-8');
  console.log('✅ Frontend environment file generated at .env.generated.ts');
}

generateFrontendEnv().catch((err) => {
  console.error('❌ Failed to generate frontend env:', err);
  process.exit(1);
});

// This script generates a frontend environment file (.env.generated.ts) containing safe environment variables for the frontend application. It reads the variables from the process environment and writes them to the specified file in a format suitable for import in the frontend code.