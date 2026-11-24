// Single-file preview build: one self-contained HTML (JS, CSS and images inlined, hash routing).
// Usage: npm run build:preview  →  preview-dist/index.html
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { defineConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

export default defineConfig({
  plugins: [react(), viteSingleFile()],
  define: { 'import.meta.env.VITE_SINGLE': 'true' },
  resolve: {
    alias: [{ find: /^(\.\.\/)+config\/imageUrl$/, replacement: path.resolve(__dirname, 'src/config/imageUrl.single.ts') }],
  },
  publicDir: false,
  build: { outDir: 'preview-dist', assetsInlineLimit: 100_000_000 },
})
