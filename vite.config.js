import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  envPrefix: 'VITE_',
  server: {
    proxy: {
      '/api-sanity': {
        target: 'https://ofu7di82.api.sanity.io',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-sanity/, ''),
      },
    },
  },
})
