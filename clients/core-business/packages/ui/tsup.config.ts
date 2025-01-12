import { Options, defineConfig } from 'tsup'

export default defineConfig((options: Options) => ({
  entry: {
    index: 'src/index.tsx',
    'icons/index': 'src/icons/index.tsx',
    'charts/index': 'src/charts/index.ts',
    'ui/index': 'src/ui/index.tsx',
  },

  format: ['esm'],
  esbuildOptions(options) {
    options.banner = {
      js: '"use client"',
    }
  },
  dts: true,
  minify: true,
  external: ['react'],
  ...options,
}))
