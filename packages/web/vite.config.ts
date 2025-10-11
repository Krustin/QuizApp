import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@quiz/shared': path.resolve(__dirname, '../shared/src'),
    },
  },
  server: {
    fs: {
      // Allow serving files from the monorepo root
      allow: [path.resolve(__dirname, '../..')],
    },
  },
})
