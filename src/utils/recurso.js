// -----------------------------------------------------------------------------
// Rutas a los archivos de public/.
// El sitio se publica en GitHub Pages bajo /exuberancia/, no en la raíz del
// dominio, así que toda ruta absoluta ("/assets/x.webp") apuntaría fuera del
// proyecto. import.meta.env.BASE_URL contiene la base configurada en
// vite.config.js y ya incluye la barra final.
// -----------------------------------------------------------------------------

export const recurso = (ruta) => `${import.meta.env.BASE_URL}${String(ruta).replace(/^\/+/, '')}`
