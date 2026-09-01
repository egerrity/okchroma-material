import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages serves this repo under a project subpath. Without `base`
  // every emitted asset URL is absolute-rooted and 404s, rendering a blank page.
  base: '/okchroma-material/',
  plugins: [react()],
})
