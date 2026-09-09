import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // El dominio personalizado sirve el sitio desde la raíz y los recursos en /assets/.
  base: '/',
  plugins: [react()],
  server: { host: '127.0.0.1', port: 5173, strictPort: true },
  preview: { host: '127.0.0.1', port: 4173, strictPort: true },
  build: {
    // Sin el polyfill, Vite no inyecta un <script> inline y la
    // Content-Security-Policy puede quedarse en script-src 'self'.
    modulePreload: { polyfill: false },
  },
})
