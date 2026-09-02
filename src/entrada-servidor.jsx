// -----------------------------------------------------------------------------
// Entrada de prerenderizado (no se envía al navegador).
//
// El sitio es una SPA de React + Vite: sin esto, el HTML publicado llega vacío
// salvo por <div id="root"></div>, y una auditoría o un buscador que no ejecute
// JavaScript ve una página de cero palabras y sin H1.
//
// `scripts/prerender.mjs` ejecuta este render durante el build y mete el
// resultado dentro de #root en dist/index.html. Al cargar la página, React
// vacía ese contenedor y monta la app normal, así que el visitante no ve
// contenido duplicado.
// -----------------------------------------------------------------------------

import { renderToString } from 'react-dom/server'
import App from './App.jsx'
import { datosPendientes, restauranteJsonLd } from './data/seo'

export function render() {
  return {
    html: renderToString(<App />),
    jsonLd: restauranteJsonLd(),
    pendientes: datosPendientes(),
  }
}
