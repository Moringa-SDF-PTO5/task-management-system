import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    // server: {
    //     port: 3000,
    //     cors: true,
    //     proxy: {
    //         '/api': {
    //             target: 'https://task-management-system-backend-39v0.onrender.com',
    //             changeOrigin: true,
    //             secure: false,
    //             // rewrite: (path) => path.replace(/^\/api/, ''),
    //         },
    //     },
    // },
})
