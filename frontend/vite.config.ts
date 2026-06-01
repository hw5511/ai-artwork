import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

export default defineConfig({
  plugins: [react(), viteSingleFile()],
  server: {
    host: '0.0.0.0',
    port: 3007,
    proxy: {
      '/api': {
        target: 'http://211.189.207.75:3000',
        changeOrigin: true,
      }
    }
  },
  base: '/ai-artwork/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})