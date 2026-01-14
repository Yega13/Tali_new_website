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
    }
})
