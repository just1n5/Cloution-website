import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Analyze bundle size in development
    process.env.ANALYZE && visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
    })
  ],
  
  server: {
    port: 3000,
    open: true,
    // Enable CORS for better development
    cors: true,
  },
  
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@portfolio': path.resolve(__dirname, './src/portfolio_screenshots'),
      '@components': path.resolve(__dirname, './src/components'),
      '@icons': path.resolve(__dirname, './src/icons'),
      '@config': path.resolve(__dirname, './src/config'),
    }
  },
  
  // Optimized build configuration
  build: {
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1500,
    
    // Enable minification with terser for better compression
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info'], // Remove specific functions
      },
    },
    
    // Enable source maps for production debugging (optional)
    sourcemap: false,
    
    // Rollup optimizations
    rollupOptions: {
      output: {
        // Manual chunks for better caching
        manualChunks: (id) => {
          // Core vendor chunk
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor'
            }
            if (id.includes('three') || id.includes('@react-three')) {
              return 'three-vendor'
            }
            if (id.includes('framer-motion')) {
              return 'animation-vendor'
            }
            if (id.includes('lucide-react')) {
              return 'icons-vendor'
            }
            // All other vendor modules
            return 'vendor'
          }
          
          // Component chunks
          if (id.includes('/components/')) {
            if (id.includes('3D') || id.includes('Icon3D')) {
              return 'components-3d'
            }
            return 'components'
          }
          
          // Icons chunk
          if (id.includes('/icons/')) {
            return 'icons-3d'
          }
        },
        
        // Asset file naming
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.')
          const extType = info[info.length - 1]
          if (/\.(mp4|webm|ogg|mp3|wav|flac|aac)$/.test(assetInfo.name)) {
            return `assets/media/[name].[hash][extname]`
          }
          if (/\.(png|jpe?g|gif|svg|webp|ico)$/.test(assetInfo.name)) {
            return `assets/images/[name].[hash][extname]`
          }
          if (/\.(woff2?|eot|ttf|otf)$/.test(assetInfo.name)) {
            return `assets/fonts/[name].[hash][extname]`
          }
          return `assets/[name].[hash][extname]`
        },
        
        // Chunk file naming
        chunkFileNames: 'js/[name].[hash].js',
        
        // Entry file naming
        entryFileNames: 'js/[name].[hash].js',
      },
      
      // External dependencies (if needed for CDN)
      // external: ['some-large-library'],
    },
    
    // Enable CSS code splitting
    cssCodeSplit: true,
    
    // Preload strategy
    modulePreload: {
      polyfill: true,
    },
    
    // Target modern browsers for smaller bundles
    target: 'es2015',
    
    // Asset handling
    assetsInlineLimit: 4096, // Inline assets < 4kb
  },
  
  // CSS optimization
  css: {
    postcss: {
      plugins: [
        // Add any PostCSS plugins here
      ],
    },
    // Extract CSS for better caching
    extract: true,
  },
  
  // Optimizations
  optimizeDeps: {
    // Pre-bundle heavy dependencies
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion',
      'three',
      '@react-three/fiber',
      '@react-three/drei',
    ],
    // Exclude certain dependencies from pre-bundling if needed
    exclude: [],
    // Force optimize deps on startup
    force: false,
  },
  
  // Environment variable prefix
  envPrefix: 'VITE_',
  
  // Public directory
  publicDir: 'public',
  
  // Asset types to handle
  assetsInclude: [
    '**/*.png',
    '**/*.jpg', 
    '**/*.jpeg',
    '**/*.svg',
    '**/*.gif',
    '**/*.webp',
    '**/*.mp4',
    '**/*.webm',
    '**/*.pdf',
  ],
})
