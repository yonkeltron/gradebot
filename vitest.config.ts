import { defineConfig } from 'vitest/config';
import * as path from 'path';

export default defineConfig({
  test: {
    coverage: { reporter: ['text'] },
    reporters: ['verbose'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
      '~': path.resolve(__dirname, './'),
      '~~': path.resolve(__dirname, './'),
    },
  },
});
