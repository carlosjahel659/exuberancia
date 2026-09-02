// -----------------------------------------------------------------------------
// Datos de contacto y marca.
// Los valores entre [CORCHETES] son marcadores: sustitúyelos por los datos
// reales del negocio y todo el sitio se actualiza solo.
// -----------------------------------------------------------------------------

import { CIERRE_DIARIO, formatoHora } from './horarios'

export const PENDIENTE = (valor) => typeof valor === 'string' && valor.startsWith('[')

/**
 * Horario de servicio como datos, no como texto suelto.
 * De aquí salen las dos cosas a la vez: lo que lee el cliente en la página y el
 * `openingHoursSpecification` del JSON-LD. La hora de cierre es la misma todos
 * los días y vive en horarios.js (`CIERRE_DIARIO`), así que cambiarla ahí
 * actualiza el encabezado, el pie, la sección de horarios y los datos
 * estructurados de una sola vez.
 */
export const horarioServicio = [
  {
    dias: 'Lunes a viernes',
    diasSchema: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    abre: 9 * 60,
  },
  {
    dias: 'Sábado y domingo',
    diasSchema: ['Saturday', 'Sunday'],
    abre: 7 * 60,
  },
]

export const site = {
  nombre: 'La Exuberancia',
  lema: 'Porque un bocado no es suficiente',
  titular: 'Sabor que se vive a lo grande',
  descripcion:
    'Restaurante mexicano familiar: desayunos, entradas para compartir, comida mexicana, carnitas y brasa de fin de semana, barbacoa los domingos y bebidas todos los días.',

  direccion: '[DIRECCIÓN]',
  telefono: '[TELÉFONO]',
  whatsapp: '[WHATSAPP_LINK]',
  maps: '[GOOGLE_MAPS_URL]',
  instagram: '[INSTAGRAM_URL]',
  // Enlaces limpios: se quitaron los parámetros de rastreo que agrega el botón
  // "compartir" (mibextid, rdid, share_url, _r, _t). Apuntan al mismo perfil,
  // no caducan y no meten basura en el sameAs del JSON-LD.
  facebook: 'https://www.facebook.com/profile.php?id=61594189674321',
  tiktok: 'https://www.tiktok.com/@user5231770584110',

  // Texto derivado de `horarioServicio`: no se escribe a mano para que no se
  // desincronice del cierre real ni de los datos estructurados.
  horarios: horarioServicio.map((h) => ({
    dias: h.dias,
    horas: `${formatoHora(h.abre)} – ${formatoHora(CIERRE_DIARIO)}`,
  })),

  // Tiempos estimados de preparación, por flujo de gente.
  tiempos: [
    { que: 'Alimentos', icono: 'cocina', bajo: 15, alto: 25 },
    { que: 'Bebidas', icono: 'bebida', bajo: 5, alto: 10 },
  ],
  avisoTiempos: 'Los tiempos pueden variar dependiendo del flujo de personas.',
}

/**
 * Requisitos del apartado de cumpleañeros.
 * El beneficio todavía NO está definido por el restaurante: por eso el texto de
 * cierre es neutral y no promete pastel, bebida ni descuento. Cuando lo
 * definan, cámbialo en `beneficio` (y solo ahí).
 */
export const cumpleanos = {
  titulo: '¿Es tu cumpleaños? ¡Celebra con nosotros!',
  requisitos: [
    'Cumplir años el mismo día de la visita.',
    'Presentar INE o CURP para comprobar la fecha.',
    'Ir acompañado de al menos tres personas.',
    'La mesa debe tener un consumo mínimo de $750.',
  ],
  beneficio: 'Cumple los requisitos y consulta con nuestro personal el beneficio para cumpleañeros.',
}

/** Anuncio de música en vivo. Los días y la hora también viven en horarios.js. */
export const musicaEnVivo = {
  titulo: 'Música en vivo',
  texto: 'Todos los sábados y domingos desde las 10:00 a.m.',
}

export const navegacion = [
  { id: 'inicio', etiqueta: 'Inicio' },
  { id: 'menu', etiqueta: 'Menú' },
  { id: 'promociones', etiqueta: 'Promociones' },
  { id: 'nosotros', etiqueta: 'Nosotros' },
  { id: 'ubicacion', etiqueta: 'Ubicación' },
]

/**
 * El pie enlaza además a #contacto (el bloque de datos dentro de Ubicación).
 * Va aparte porque en la barra superior una sexta pestaña ya no cabe en 1024 px.
 */
export const navegacionPie = [...navegacion, { id: 'contacto', etiqueta: 'Contacto' }]

export const redes = [
  { nombre: 'Instagram', url: site.instagram, icono: 'instagram' },
  { nombre: 'Facebook', url: site.facebook, icono: 'facebook' },
  { nombre: 'TikTok', url: site.tiktok, icono: 'tiktok' },
]
