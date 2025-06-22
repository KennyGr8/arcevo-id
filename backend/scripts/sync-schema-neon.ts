#!/bin/bash

echo "⚡ Syncing Prisma schema to Neon..."

# Backup local
cp .env.local .env.backup

# Use Neon
cp .env.neon .env

# Push schema
npx prisma db push

# Revert back
mv .env.backup .env

echo "✅ Done. Neon schema updated."
