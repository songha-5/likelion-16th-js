import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    proxy: {
      '/cors-proxy': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/cors-proxy/, ''),
      },
    }
  }
})