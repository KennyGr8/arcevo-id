// scripts/setup-prisma.ts
import { execSync } from 'node:child_process';

try {
  console.log('🧹 Resetting database...');
  execSync('npm run prisma:reset', { stdio: 'inherit' });

  console.log('⚙️ Generating client...');
  execSync('npm run prisma:generate', { stdio: 'inherit' });

  console.log('🌱 Seeding data...');
  execSync('npm run prisma:seed', { stdio: 'inherit' });

  console.log('✅ Prisma setup complete!');
} catch (err) {
  console.error('❌ Failed to setup Prisma:', err);
  process.exit(1);
}

// This script automates the Prisma setup process by resetting the database, generating the Prisma client, and seeding initial data. It uses `execSync` to run the necessary npm scripts and handles any errors that may occur during the process.