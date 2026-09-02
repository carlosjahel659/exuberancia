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
  facebook: '[FACEBOOK_URL]',
  tiktok: '[TIKTOK_URL]',

  // Texto derivado de `horarioServicio`: no se escribe a mano para que no se
  // desincronice del cierre real ni de los datos estructurados.
  horarios: horarioServicio.map((h) => ({
    dias: h.dias,
    horas: `${formatoHora(h.abre)} – ${formatoHora(CIERRE_DIARIO)}`,
  })),

  tiempos: [
    { que: 'Alimentos', cuanto: '15 minutos aprox.' },
    { que: 'Bebidas', cuanto: '5 minutos aprox.' },
  ],
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
