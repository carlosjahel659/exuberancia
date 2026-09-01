import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // El sitio se publica en https://carlosjahel659.github.io/exuberancia/,
  // en un subdirectorio y no en la raiz del dominio. Sin esta base, el HTML
  // compilado pediria /assets/... y GitHub Pages responderia 404.
  base: '/exuberancia/',
  plugins: [react()],
  server: { host: true, port: 5173 },
  build: {
    // Sin el polyfill, Vite no inyecta un <script> inline y la
    // Content-Security-Policy puede quedarse en script-src 'self'.
    modulePreload: { polyfill: false },
  },
})
