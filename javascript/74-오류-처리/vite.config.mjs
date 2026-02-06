import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  server: {
    port: 3000,
    open: '/learn.html',
  },
  preview: {
    port: 3002,
    open: '/learn.html',
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'learn.html'),
      },
    },
  },
})
