// -----------------------------------------------------------------------------
// Datos para buscadores y redes sociales.
//
// El JSON-LD NO se escribe a mano: se arma desde site.js y horarios.js, así que
// cuando se completen la dirección, el teléfono y las redes, los datos
// estructurados se actualizan solos. Lo que todavía es un marcador (`[ALGO]`)
// simplemente no se publica: es preferible un JSON-LD incompleto a uno con
// datos inventados.
// -----------------------------------------------------------------------------

import { CIERRE_DIARIO } from './horarios'
import { horarioServicio, PENDIENTE, site } from './site'

/**
 * URL pública del sitio, con barra final. Es la única definición: de aquí salen
 * la canónica, Open Graph, Twitter, el JSON-LD, robots.txt y el sitemap.
 * Si el sitio se muda de dominio, se cambia aquí y en `base` de vite.config.js.
 */
export const SITIO = 'https://carlosjahel659.github.io/exuberancia/'

/** Convierte una ruta relativa de public/ en URL absoluta (la exigen OG y JSON-LD). */
export const absoluta = (ruta) => SITIO + String(ruta).replace(/^\/+/, '')

export const IMAGEN_SOCIAL = absoluta('assets/og-exuberancia.jpg')

export const META = {
  titulo: 'La Exuberancia | Restaurante mexicano familiar',
  descripcion:
    'La Exuberancia: restaurante mexicano familiar con desayunos, comida mexicana, menú de fin de semana, barbacoa dominical y bebidas.',
  descripcionSocial:
    'Desayunos, comida mexicana, menú de fin de semana, barbacoa dominical y bebidas.',
  imagenAlt: 'Platillos mexicanos de La Exuberancia',
}

/** 570 -> "09:30", en el formato de 24 h que pide schema.org. */
const reloj24 = (minutos) =>
  `${String(Math.floor(minutos / 60)).padStart(2, '0')}:${String(minutos % 60).padStart(2, '0')}`

/** Solo los valores ya definidos; los marcadores `[ALGO]` se descartan. */
const real = (valor) => (typeof valor === 'string' && valor && !PENDIENTE(valor) ? valor : null)

/**
 * Campos que el JSON-LD no puede publicar todavía porque en site.js siguen
 * siendo marcadores. Se usa en el build para avisarlo por consola.
 */
export function datosPendientes() {
  const faltan = []
  if (!real(site.direccion)) faltan.push('address (dirección completa)')
  if (!real(site.telefono)) faltan.push('telephone')
  if (!real(site.maps)) faltan.push('geo (latitud y longitud)')
  if (![site.instagram, site.facebook, site.tiktok].some(real)) faltan.push('sameAs (redes)')
  return faltan
}

/** Datos estructurados del restaurante, listos para serializar a JSON-LD. */
export function restauranteJsonLd() {
  const redes = [site.instagram, site.facebook, site.tiktok].filter(real)

  const datos = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': `${SITIO}#restaurant`,
    name: site.nombre,
    description: META.descripcion,
    url: SITIO,
    image: [IMAGEN_SOCIAL, absoluta('assets/fotos/molcajete-mexa.webp')],
    slogan: site.lema,
    priceRange: '$$',
    servesCuisine: ['Mexicana', 'Desayunos', 'Barbacoa'],
    openingHoursSpecification: horarioServicio.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.diasSchema,
      opens: reloj24(h.abre),
      closes: reloj24(CIERRE_DIARIO),
    })),
    hasMenu: `${SITIO}#menu`,
  }

  // Solo se añaden si son datos verificables; nunca se inventan.
  if (real(site.telefono)) datos.telephone = site.telefono
  if (real(site.direccion)) {
    datos.address = {
      '@type': 'PostalAddress',
      streetAddress: site.direccion,
      addressCountry: 'MX',
    }
  }
  if (redes.length) datos.sameAs = redes

  return datos
}
