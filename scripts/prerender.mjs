import { createHash } from 'node:crypto'
import { existsSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = resolve(raiz, 'dist')
const htmlPath = resolve(dist, 'index.html')
const ssrDirectorio = resolve(raiz, '.ssr')
const ssrPath = resolve(ssrDirectorio, 'entrada-servidor.js')

if (!existsSync(htmlPath) || !existsSync(ssrPath)) {
  throw new Error('Falta la compilación del cliente o del servidor. Ejecuta npm run build.')
}

const { render } = await import(pathToFileURL(ssrPath).href)
const {
  html, jsonLd, meta, pendientes, productosOcultos, preciosPendientes,
  promocionesPendientes, variantesOcultas,
} = render()

if (meta.descripcion.length < 50 || meta.descripcion.length > 160) {
  throw new Error('META.descripcion debe tener entre 50 y 160 caracteres.')
}
if (new URL(meta.sitio).protocol !== 'https:') {
  throw new Error('La URL pública confirmada debe utilizar HTTPS.')
}
if ((html.match(/<h1(?:\s|>)/g) ?? []).length !== 1) {
  throw new Error('La página debe generar exactamente un H1 principal.')
}

const escapar = (valor) => String(valor).replace(/[&<>"']/g, (caracter) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[caracter]))

let documento = readFileSync(htmlPath, 'utf8')
function sustituir(marcador, contenido) {
  if (!documento.includes(marcador)) throw new Error(`Falta el marcador ${marcador} en dist/index.html.`)
  documento = documento.replace(marcador, () => contenido)
}

const metadatos = [
  `<title>${escapar(meta.titulo)}</title>`,
  `<meta name="description" content="${escapar(meta.descripcion)}" />`,
  `<link rel="canonical" href="${escapar(meta.sitio)}" />`,
  '<meta property="og:type" content="website" />',
  '<meta property="og:locale" content="es_MX" />',
  `<meta property="og:site_name" content="${escapar(meta.nombre)}" />`,
  `<meta property="og:title" content="${escapar(meta.titulo)}" />`,
  `<meta property="og:description" content="${escapar(meta.descripcionSocial)}" />`,
  `<meta property="og:url" content="${escapar(meta.sitio)}" />`,
  `<meta property="og:image" content="${escapar(meta.imagen)}" />`,
  '<meta property="og:image:width" content="1200" />',
  '<meta property="og:image:height" content="630" />',
  '<meta property="og:image:type" content="image/jpeg" />',
  `<meta property="og:image:alt" content="${escapar(meta.imagenAlt)}" />`,
  '<meta name="twitter:card" content="summary_large_image" />',
  `<meta name="twitter:title" content="${escapar(meta.titulo)}" />`,
  `<meta name="twitter:description" content="${escapar(meta.descripcionSocial)}" />`,
  `<meta name="twitter:image" content="${escapar(meta.imagen)}" />`,
  `<meta name="twitter:image:alt" content="${escapar(meta.imagenAlt)}" />`,
].join('\n    ')

const bloqueMeta = documento.match(/<!--metadatos-inicio-->[\s\S]*?<!--metadatos-fin-->/)?.[0]
if (!bloqueMeta) throw new Error('Faltan los marcadores de metadatos en index.html.')
sustituir(bloqueMeta, metadatos)
sustituir('<div id="root"></div>', `<div id="root">${html}</div>`)

// Escapar "<" impide cerrar el script desde una descripción del catálogo.
const json = JSON.stringify(jsonLd).replace(/</g, '\\u003c')
const hashJson = createHash('sha256').update(json).digest('base64')
sustituir('<!--datos-estructurados-->', `<script type="application/ld+json">${json}</script>`)

// Solo producción: Vite dev necesita sus scripts y WebSocket de recarga.
// Los estilos inline corresponden a variables de diseño; nunca habilitamos JS inline.
const politica = [
  "default-src 'self'",
  "base-uri 'none'",
  "object-src 'none'",
  `script-src 'self' 'sha256-${hashJson}'`,
  "script-src-attr 'none'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data:",
  "connect-src 'self'",
  'frame-src https://www.google.com https://maps.google.com',
  "form-action 'none'",
].join('; ')
sustituir('<!--seguridad-produccion-->', `<meta http-equiv="Content-Security-Policy" content="${escapar(politica)}" />`)

writeFileSync(htmlPath, documento, 'utf8')
writeFileSync(resolve(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${new URL('sitemap.xml', meta.sitio).href}\n`, 'utf8')
writeFileSync(resolve(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${escapar(meta.sitio)}</loc></url>\n</urlset>\n`, 'utf8')

// GitHub Pages ignora _headers; queda preparado para un hosting que sí lo procese.
const headersPath = resolve(dist, '_headers')
if (existsSync(headersPath)) {
  let cabeceras = readFileSync(headersPath, 'utf8').replace(
    "Content-Security-Policy: frame-ancestors 'self';",
    `Content-Security-Policy: ${politica}; frame-ancestors 'self';`,
  )
  // Rutas exactas de JS/CSS con hash: las fotos con nombre estable no son immutable.
  const recursos = new Set(
    Array.from(documento.matchAll(/(?:src|href)="([^"]*\/assets\/[^"]+-[A-Za-z0-9_-]{8,}\.(?:js|css))"/g),
      (coincidencia) => new URL(coincidencia[1], meta.sitio).pathname),
  )
  for (const recurso of recursos) {
    cabeceras += `\n${recurso}\n  Cache-Control: public, max-age=31536000, immutable\n`
  }
  writeFileSync(headersPath, cabeceras, 'utf8')
}

// La ruta se resuelve desde este script; nunca se toma de una entrada del usuario.
if (ssrDirectorio !== resolve(raiz, '.ssr') || dirname(ssrDirectorio) !== raiz) {
  throw new Error('El directorio SSR debe permanecer dentro del proyecto.')
}
rmSync(ssrDirectorio, { recursive: true, force: true })

const palabras = html.replace(/<[^>]+>/g, ' ').trim().split(/\s+/).filter(Boolean).length
console.log(`Prerenderizado: ${palabras} palabras, ${Math.round(Buffer.byteLength(html) / 1024)} KB de HTML; Restaurant + Menu y metadatos generados.`)
console.log(`Descripción: ${meta.descripcion.length} caracteres. Canónica: ${meta.sitio}`)

function informar(titulo, elementos, describir = (elemento) => elemento) {
  if (!elementos.length) return
  console.log(`\n${titulo} (${elementos.length}):`)
  elementos.forEach((elemento) => console.log(`  - ${describir(elemento)}`))
}
const producto = (dato) => `${dato.categoria} / ${dato.grupo} / ${dato.nombre}`
informar('Productos conservados sin publicar', productosOcultos, (dato) => `${producto(dato)}: ${dato.motivo}`)
informar('Variantes conservadas sin precio confirmado', variantesOcultas, producto)
informar('Productos publicados con precio por confirmar', preciosPendientes, producto)
informar('Promociones publicadas con precio por confirmar', promocionesPendientes)
informar('Datos reales pendientes (omitidos del JSON-LD)', pendientes)
