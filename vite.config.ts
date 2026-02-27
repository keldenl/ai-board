// Kai's Vite config — GitHub Pages with /ai-board/ subdirectory (2026-02-27)
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Base path set so assets load correctly at https://keldenl.github.io/ai-board/
export default defineConfig({
  base: '/ai-board/',
  plugins: [react(), tailwindcss()],
  server: {
    fs: {
      allow: ['..']
    }
  },
  // Include markdown files as raw assets for glob imports
  assetsInclude: ['**/*.md']
})
