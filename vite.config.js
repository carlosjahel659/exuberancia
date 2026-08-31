import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: { host: true, port: 5173 },
  build: {
    // Sin el polyfill, Vite no inyecta un <script> inline y la
    // Content-Security-Policy puede quedarse en script-src 'self'.
    modulePreload: { polyfill: false },
  },
})
