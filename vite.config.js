import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': resolve(__dirname, './src'),
            '@components': resolve(__dirname, './src/components'),
            '@pages': resolve(__dirname, './src/pages'),
            '@styles': resolve(__dirname, './src/styles'),
            '@hooks': resolve(__dirname, './src/hooks'),
            '@data': resolve(__dirname, './src/data'),
            '@assets': resolve(__dirname, './src/assets'),
            '@utils': resolve(__dirname, './src/utils')
        }
    },
    server: {
        port: 5173,
        open: true
    },
    build: {
        // Enable minification
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true
            }
        },
        // Generate source maps for debugging (can disable for smaller builds)
        sourcemap: false,
        // Chunk splitting for better caching
        rollupOptions: {
            output: {
                manualChunks: {
                    // Vendor chunk for React
                    'react-vendor': ['react', 'react-dom', 'react-router-dom'],
                    // Animation libraries
                    'animation': ['framer-motion'],
                }
            }
        },
        // Target modern browsers for smaller bundles
        target: 'es2020',
        // Increase chunk size warning limit
        chunkSizeWarningLimit: 1000
    },
    // Optimize dependencies
    optimizeDeps: {
        include: ['react', 'react-dom', 'react-router-dom', 'framer-motion']
    }
})
