import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'], // Adjust if main file is elsewhere
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  outDir: 'dist',
  target: 'node18',
});
