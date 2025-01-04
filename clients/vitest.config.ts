import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: [
      'packages/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
      'internal/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
      'core/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'
    ],
    exclude: ['**/node_modules/**', '**/dist/**', '**/build/**'],
    globals: true,
    environment: 'node'
  }
}) 