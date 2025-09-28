import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@portfolio': path.resolve(__dirname, './src/portfolio_screenshots')
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom']
  },
  build: {
    target: 'es2015',
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Asegurar que React siempre esté en el mismo chunk
          if (id.includes('node_modules')) {
            if (id.includes('react')) {
              return 'react-vendor';
            }
            
            // Separar bibliotecas pesadas
            if (id.includes('three') || id.includes('@react-three')) {
              return 'three-vendor';
            }
            
            if (id.includes('framer-motion')) {
              return 'framer-vendor';
            }
            
            if (id.includes('lucide-react')) {
              return 'icons-vendor';
            }
          }
        }
      }
    }
  },
  publicDir: 'public',
  assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.svg', '**/*.mp4', '**/*.webm']
})
