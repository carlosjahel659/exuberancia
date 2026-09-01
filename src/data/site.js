// -----------------------------------------------------------------------------
// Datos de contacto y marca.
// Los valores entre [CORCHETES] son marcadores: sustitúyelos por los datos
// reales del negocio y todo el sitio se actualiza solo.
// -----------------------------------------------------------------------------

export const PENDIENTE = (valor) => typeof valor === 'string' && valor.startsWith('[')

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

  // Cierre diario a las 7:30 p.m. en todos los días; las horas de apertura son
  // las que ya tenía cada día. Si esto cambia, actualiza también CIERRE_DIARIO
  // en src/data/horarios.js, que es lo que apaga las categorías.
  horarios: [
    { dias: 'Lunes a viernes', horas: '9:00 a.m. – 7:30 p.m.' },
    { dias: 'Sábado y domingo', horas: '7:00 a.m. – 7:30 p.m.' },
  ],

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

export const redes = [
  { nombre: 'Instagram', url: site.instagram, icono: 'instagram' },
  { nombre: 'Facebook', url: site.facebook, icono: 'facebook' },
  { nombre: 'TikTok', url: site.tiktok, icono: 'tiktok' },
]
