import { CIERRE_DIARIO, REGLAS } from './horarios'
import { horarioServicio, PENDIENTE, site } from './site'
import { AVISOS, categorias, menu } from './menu'
import { precioValido, productosVisibles, variantesVisibles } from '../utils/catalogo'

/** Dominio personalizado de GitHub Pages, servido desde la raíz configurada en Vite. */
export const SITIO = 'https://menuexuberancia.com/'
export const absoluta = (ruta) => new URL(ruta, SITIO).href
export const IMAGEN_SOCIAL = absoluta('assets/og-exuberancia.jpg')

/** El build utiliza estos datos para todas las etiquetas de buscadores y redes. */
export const META = {
  titulo: 'La Exuberancia | Menú de cocina mexicana',
  descripcion:
    'Consulta el menú de La Exuberancia: desayunos, comida mexicana, barbacoa dominical, bebidas y promociones para compartir en familia.',
  descripcionSocial:
    'Desayunos, comida mexicana, menú de fin de semana, barbacoa dominical y bebidas.',
  imagenAlt: 'Platillos mexicanos de La Exuberancia',
}

const reloj24 = (minutos) =>
  `${String(Math.floor(minutos / 60)).padStart(2, '0')}:${String(minutos % 60).padStart(2, '0')}`

const real = (valor) =>
  typeof valor === 'string' && valor.trim() && !PENDIENTE(valor) ? valor.trim() : null

const enlaceReal = (valor) => {
  if (!real(valor)) return null
  try {
    const url = new URL(valor)
    return ['https:', 'http:'].includes(url.protocol) ? url.href : null
  } catch {
    return null
  }
}

export function datosPendientes() {
  const faltan = []
  if (!real(site.direccion)) faltan.push('Dirección completa')
  if (!real(site.telefono)) faltan.push('Teléfono')
  if (!enlaceReal(site.maps)) faltan.push('Enlace de Google Maps')
  if (![site.instagram, site.facebook, site.tiktok].some(enlaceReal)) faltan.push('Redes sociales')
  return faltan
}

export function restauranteJsonLd() {
  const redes = [site.instagram, site.facebook, site.tiktok].map(enlaceReal).filter(Boolean)
  const datos = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': `${SITIO}#restaurant`,
    name: site.nombre,
    description: META.descripcion,
    url: SITIO,
    image: [IMAGEN_SOCIAL, absoluta('assets/fotos/molcajete-mexa.webp')],
    logo: absoluta('assets/logo-exuberancia.webp'),
    slogan: site.lema,
    servesCuisine: ['Mexicana', 'Desayunos', 'Barbacoa'],
    openingHoursSpecification: horarioServicio.map((horario) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: horario.diasSchema,
      opens: reloj24(horario.abre),
      closes: reloj24(CIERRE_DIARIO),
    })),
    hasMenu: { '@id': `${SITIO}#menu` },
  }

  // No inferimos rango de precios, coordenadas ni dirección a partir de otros datos.
  if (real(site.telefono)) datos.telephone = site.telefono
  if (real(site.direccion)) {
    datos.address = { '@type': 'PostalAddress', streetAddress: site.direccion }
  }
  if (enlaceReal(site.maps)) datos.hasMap = enlaceReal(site.maps)
  if (redes.length) datos.sameAs = redes
  return datos
}

function productoJsonLd(producto) {
  const datos = { '@type': 'MenuItem', name: producto.nombre }
  if (producto.descripcion) datos.description = producto.descripcion
  const imagen = producto.foto?.src ?? producto.imagen
  if (imagen) datos.image = absoluta(imagen)

  const precios = producto.variantes?.length
    ? variantesVisibles(producto)
        .filter((variante) => precioValido(variante.precio))
        .map((variante) => ({
          '@type': 'Offer',
          name: variante.medida,
          price: variante.precio,
          priceCurrency: 'MXN',
        }))
    : precioValido(producto.precio)
      ? [{ '@type': 'Offer', price: producto.precio, priceCurrency: 'MXN' }]
      : []

  // Un precio pendiente nunca se transforma en cero ni en una oferta inventada.
  if (precios.length) datos.offers = precios
  return datos
}

export function menuJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    '@id': `${SITIO}#menu`,
    name: `Menú de ${site.nombre}`,
    url: `${SITIO}#menu`,
    inLanguage: 'es-MX',
    hasMenuSection: categorias.flatMap((categoria) => {
      const grupos = (menu[categoria.id] ?? [])
        // Las reposiciones por piezas rotas siguen en la interfaz; no son platillos.
        .filter((grupo) => grupo.bloque !== AVISOS)
        .map((grupo) => ({
          '@type': 'MenuSection',
          name: grupo.grupo,
          ...(grupo.nota ? { description: grupo.nota } : {}),
          hasMenuItem: productosVisibles(grupo).map(productoJsonLd),
        }))
        .filter((grupo) => grupo.hasMenuItem.length)
      if (!grupos.length) return []
      return [{
        '@type': 'MenuSection',
        name: categoria.etiqueta,
        url: `${SITIO}#panel-${categoria.id}`,
        description: [categoria.descripcion, REGLAS[categoria.id]?.resumen].filter(Boolean).join(' '),
        hasMenuSection: grupos,
      }]
    }),
  }
}

export function datosEstructurados() {
  const grafo = [restauranteJsonLd(), menuJsonLd()]
  grafo.forEach((datos) => { delete datos['@context'] })
  return { '@context': 'https://schema.org', '@graph': grafo }
}
