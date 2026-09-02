/**
 * Prerenderiza el sitio dentro de dist/index.html.
 *
 * Corre al final de `npm run build`, después de las dos compilaciones de Vite:
 *   1. `vite build`                -> dist/ (lo que se publica)
 *   2. `vite build --ssr ...`      -> .ssr/ (temporal, solo para este paso)
 *
 * Inyecta dos cosas en dist/index.html:
 *   · el HTML de la app dentro de <div id="root">
 *   · el JSON-LD del restaurante en el <head>
 *
 * No añade dependencias: usa react-dom/server, que ya viene con react-dom.
 */
import { readFileSync, writeFileSync, existsSync, rmSync } from 'node:fs'
import { pathToFileURL } from 'node:url'
import { resolve } from 'node:path'

const raiz = resolve(import.meta.dirname, '..')
const htmlPath = resolve(raiz, 'dist/index.html')
const ssrPath = resolve(raiz, '.ssr/entrada-servidor.js')

if (!existsSync(htmlPath)) {
  console.error('✗ No existe dist/index.html. Corre primero `vite build`.')
  process.exit(1)
}
if (!existsSync(ssrPath)) {
  console.error('✗ No existe .ssr/entrada-servidor.js. Falló la compilación SSR.')
  process.exit(1)
}

const { render } = await import(pathToFileURL(ssrPath).href)
const { html, jsonLd, pendientes } = render()

let documento = readFileSync(htmlPath, 'utf8')

// --- 1. El contenido dentro de #root -----------------------------------------
const contenedorVacio = '<div id="root"></div>'
if (!documento.includes(contenedorVacio)) {
  console.error('✗ No encontré <div id="root"></div> en dist/index.html.')
  process.exit(1)
}
// Se usa una función como reemplazo para que un "$" del contenido no se
// interprete como referencia de grupo en String.replace.
documento = documento.replace(contenedorVacio, () => `<div id="root">${html}</div>`)

// --- 2. El JSON-LD en el <head> ----------------------------------------------
const marcador = '<!--datos-estructurados-->'
if (!documento.includes(marcador)) {
  console.error(`✗ No encontré ${marcador} en dist/index.html.`)
  process.exit(1)
}
// Escapar "<" evita que un texto del menú pueda cerrar la etiqueta <script>.
const json = JSON.stringify(jsonLd, null, 2).replace(/</g, '\\u003c')
documento = documento.replace(
  marcador,
  () => `<script type="application/ld+json">\n${json}\n    </script>`,
)

writeFileSync(htmlPath, documento)

// El bundle SSR es un intermedio: no debe quedar en el repo ni publicarse.
rmSync(resolve(raiz, '.ssr'), { recursive: true, force: true })

// --- Reporte -----------------------------------------------------------------
const palabras = html
  .replace(/<[^>]+>/g, ' ')
  .replace(/\s+/g, ' ')
  .trim()
  .split(' ')
  .filter(Boolean).length

console.log(`✓ Prerenderizado: ${palabras} palabras y ${(html.length / 1024).toFixed(0)} KB de HTML dentro de #root`)
console.log('✓ JSON-LD de Restaurant inyectado en el <head>')

if (pendientes.length) {
  console.log('\n⚠ El JSON-LD se publicó SIN estos campos, porque en src/data/site.js')
  console.log('  siguen siendo marcadores y no se inventan:')
  pendientes.forEach((campo) => console.log(`    · ${campo}`))
}
