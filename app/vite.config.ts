import { defineConfig } from 'vite'

export default defineConfig({
  // Relative paths, so the build runs from GitHub Pages' /JapaneseStudy/ subpath.
  base: './',
  server: { port: 5191, strictPort: true },
})
