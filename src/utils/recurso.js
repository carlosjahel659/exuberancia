// -----------------------------------------------------------------------------
// Rutas a los archivos de public/.
// import.meta.env.BASE_URL contiene la base configurada en vite.config.js
// y ya incluye la barra final. En menuexuberancia.com es "/", por lo que
// los recursos se resuelven desde /assets/ en la raíz del dominio.
// -----------------------------------------------------------------------------

export const recurso = (ruta) => `${import.meta.env.BASE_URL}${String(ruta).replace(/^\/+/, '')}`
