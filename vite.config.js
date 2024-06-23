import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// const prodEnv = import.meta.env.PROD
// const devEnv = import.meta.env.DEV
const defaultConfig = {
    plugins: [react()],
}

// https://vitejs.dev/config/
export default defineConfig(() => {
    if (import.meta.env.PROD) {
        return {
            ...defaultConfig,
            server: {
                // port: 3000,
                cors: true,
                proxy: {
                    '/api': {
                        target: 'https://task-management-system-backend-39v0.onrender.com',
                        changeOrigin: true,
                        secure: false,
                        // rewrite: (path) => path.replace(/^\/api/, ''),
                    },
                },
            },
        }
    } else {
        return {
            ...defaultConfig,
            server: {
                port: 3000,
                cors: true,
                proxy: {
                    '/api': {
                        target: 'http://localhost:5555',
                        changeOrigin: true,
                        secure: false,
                        // rewrite: (path) => path.replace(/^\/api/, ''),
                    },
                },
            },
        }
    }
    
})
