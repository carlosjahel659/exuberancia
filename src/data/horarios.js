// -----------------------------------------------------------------------------
// ÚNICA fuente de verdad de días y horarios de La Exuberancia.
//
// Ningún componente debe repetir estas reglas: todos preguntan aquí.
// Todo se calcula en la zona horaria de Ciudad de México, sin importar el
// reloj o la región del dispositivo del cliente.
// -----------------------------------------------------------------------------

export const ZONA = 'America/Mexico_City'

const DIAS_INTL = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export const NOMBRE_DIA = [
  'domingo',
  'lunes',
  'martes',
  'miércoles',
  'jueves',
  'viernes',
  'sábado',
]

export const LUNES_A_VIERNES = [1, 2, 3, 4, 5]
export const FIN_DE_SEMANA = [6, 0]
export const TODOS_LOS_DIAS = [0, 1, 2, 3, 4, 5, 6]
export const SOLO_DOMINGO = [0]

/** Convierte una hora del reloj a minutos desde la medianoche. */
const min = (hora, minuto = 0) => hora * 60 + minuto

/** "sábado" -> "sabado", para comparar nombres de día escritos sin acentos. */
const sinAcentos = (texto) =>
  texto
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')

/** 540 -> "9:00 a. m."  ·  720 -> "12:00 p. m."  ·  1140 -> "7:00 p. m." */
export function formatoHora(minutos) {
  const h24 = Math.floor(minutos / 60) % 24
  const m = minutos % 60
  const sufijo = h24 < 12 ? 'a. m.' : 'p. m.'
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12
  return `${h12}:${String(m).padStart(2, '0')} ${sufijo}`
}

// -----------------------------------------------------------------------------
// Reglas por categoría del menú
// -----------------------------------------------------------------------------
export const REGLAS = {
  desayunos: {
    nombre: 'Desayunos',
    corto: 'Desayunos',
    icono: 'desayunos',
    dias: LUNES_A_VIERNES,
    desde: min(9),
    hasta: min(12),
    resumen: 'Lun a vie · 9:00 a 12:00',
    // Mensaje cuando es día hábil pero está fuera del horario.
    fueraDeHorario: 'Desayunos disponibles de 9:00 a. m. a 12:00 p. m.',
    // Mensaje cuando hoy no es un día en que se sirve.
    otroDia: 'Disponible de lunes a viernes',
  },

  entradas: {
    nombre: 'Entradas',
    corto: 'Entradas',
    icono: 'entradas',
    dias: LUNES_A_VIERNES,
    desde: min(9),
    hasta: min(19),
    resumen: 'Lun a vie · todo el día',
    // Dentro de su horario se anuncia como "todo el día".
    textoActivo: 'Disponible todo el día',
    fueraDeHorario: 'Entradas disponibles de 9:00 a. m. a 7:00 p. m.',
    otroDia: 'Disponible de lunes a viernes',
  },

  mexicana: {
    nombre: 'Comida mexicana',
    corto: 'Mexicana',
    icono: 'mexicana',
    dias: LUNES_A_VIERNES,
    desde: min(12),
    hasta: min(19),
    resumen: 'Lun a vie · 12:00 a 7:00',
    antesDeHorario: 'Disponible a partir de las 12:00 p. m.',
    fueraDeHorario: 'Comida mexicana disponible de 12:00 p. m. a 7:00 p. m.',
    otroDia: 'Disponible de lunes a viernes',
  },

  finde: {
    nombre: 'Fin de semana',
    corto: 'Fin de semana',
    icono: 'finde',
    dias: FIN_DE_SEMANA,
    desde: min(0),
    hasta: min(24),
    resumen: 'Sábado y domingo',
    textoActivo: 'Disponible todo el día',
    otroDia: 'Disponible sábados y domingos',
  },

  // El sábado se abre "Fin de semana" pero la barbacoa sigue cerrada: es una
  // categoría aparte justamente para que puedan desbloquearse por separado.
  barbacoa: {
    nombre: 'Barbacoa',
    corto: 'Barbacoa',
    icono: 'barbacoa',
    dias: SOLO_DOMINGO,
    desde: min(0),
    hasta: min(24),
    resumen: 'Solo domingos',
    textoActivo: 'Disponible hoy, domingo',
    soloDomingos: true,
    otroDia: 'La barbacoa se sirve solamente los domingos',
  },

  bebidas: {
    nombre: 'Bebidas',
    corto: 'Bebidas',
    icono: 'bebidas',
    dias: TODOS_LOS_DIAS,
    desde: min(0),
    hasta: min(24),
    resumen: 'Todos los días',
    textoActivo: 'Disponible todo el día',
  },
}

/**
 * Reglas de grupos dentro de una categoría, por nombre de grupo tal como
 * aparece en `menu.js`. Sirve para cerrar un grupo suelto sin cerrar toda la
 * categoría; hoy ninguna lo necesita, porque la barbacoa ya es categoría
 * propia. Para usarlo, agrega aquí una entrada con la misma forma que REGLAS.
 */
export const REGLAS_GRUPO = {}

/**
 * Días propios de algunas promociones. Solo se registran los que la propia
 * promoción ya declara en el menú impreso; no se inventan horarios nuevos.
 */
export const REGLAS_PROMO = {
  'Desayuno Ejecutivo': {
    nombre: 'Desayuno Ejecutivo',
    dias: LUNES_A_VIERNES,
    desde: min(0),
    hasta: min(24),
    resumen: 'Lunes a viernes',
    textoActivo: 'Disponible hoy',
    otroDia: 'Disponible de lunes a viernes',
  },
  'Música en vivo': {
    nombre: 'Música en vivo',
    dias: [5, 6, 0],
    desde: min(12),
    hasta: min(24),
    resumen: 'Vie, sáb y dom desde las 12:00',
    textoActivo: 'Hoy a partir de las 12:00 p. m.',
    antesDeHorario: 'Hoy a partir de las 12:00 p. m.',
    otroDia: 'Viernes, sábado y domingo',
  },
}

// -----------------------------------------------------------------------------
// Reloj de Ciudad de México (+ simulación para pruebas)
// -----------------------------------------------------------------------------

/**
 * Permite probar otros días y horas sin tocar el reloj del sistema:
 *   ?dia=domingo&hora=13:00
 *   ?dia=6&hora=09:00
 *   ?ahora=2026-09-06T13:00
 * Devuelve null cuando no hay simulación activa.
 */
export function leerSimulacion(busqueda) {
  const cadena =
    busqueda ?? (typeof window !== 'undefined' ? window.location.search : '')
  if (!cadena) return null

  const params = new URLSearchParams(cadena)
  const diaParam = params.get('dia')
  const horaParam = params.get('hora')
  const ahoraParam = params.get('ahora')

  if (!diaParam && !horaParam && !ahoraParam) return null

  const real = calcularAhora()
  let dia = real.dia
  let minutos = real.minutos

  if (ahoraParam) {
    const f = new Date(ahoraParam)
    if (!Number.isNaN(f.getTime())) {
      dia = f.getDay()
      minutos = f.getHours() * 60 + f.getMinutes()
    }
  }

  if (diaParam) {
    const numero = Number(diaParam)
    const indice = diaParam.trim() !== '' && Number.isInteger(numero)
      ? ((numero % 7) + 7) % 7
      : NOMBRE_DIA.map(sinAcentos).indexOf(sinAcentos(diaParam))
    if (indice >= 0) dia = indice
  }

  if (horaParam) {
    const [h, m = '0'] = horaParam.split(':')
    const hora = Number(h)
    const minuto = Number(m)
    if (Number.isFinite(hora) && Number.isFinite(minuto)) {
      minutos = (((hora % 24) + 24) % 24) * 60 + minuto
    }
  }

  return { dia, minutos, simulado: true }
}

/** Día y hora reales en Ciudad de México. */
function calcularAhora(base = new Date()) {
  const partes = new Intl.DateTimeFormat('en-US', {
    timeZone: ZONA,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(base)

  const valor = (tipo) => partes.find((p) => p.type === tipo)?.value ?? ''
  const dia = Math.max(0, DIAS_INTL.indexOf(valor('weekday')))
  const hora = Number(valor('hour')) % 24
  const minuto = Number(valor('minute'))

  return { dia, minutos: hora * 60 + minuto, simulado: false }
}

/**
 * Momento actual que usa toda la página: hora real de Ciudad de México, o la
 * simulada si viene en la URL.
 */
export function ahoraEnCDMX(base = new Date()) {
  const simulado = leerSimulacion()
  const momento = simulado ?? calcularAhora(base)
  return {
    ...momento,
    nombreDia: NOMBRE_DIA[momento.dia],
    reloj: formatoHora(momento.minutos),
    esFinDeSemana: FIN_DE_SEMANA.includes(momento.dia),
    esDomingo: momento.dia === 0,
  }
}

// -----------------------------------------------------------------------------
// Estado de disponibilidad
// -----------------------------------------------------------------------------

export const ESTADOS = {
  ahora: { id: 'ahora', texto: 'Disponible ahora', color: 'turquesa' },
  masTarde: { id: 'masTarde', texto: 'Disponible más tarde', color: 'amarillo' },
  noHoy: { id: 'noHoy', texto: 'No disponible hoy', color: 'gris' },
  soloDomingos: { id: 'soloDomingos', texto: 'Solo domingos', color: 'rosa' },
}

/** Próximo día (a partir de mañana) en que la regla vuelve a aplicar. */
function proximoDia(regla, dia) {
  for (let salto = 1; salto <= 7; salto += 1) {
    const candidato = (dia + salto) % 7
    if (regla.dias.includes(candidato)) {
      return { indice: candidato, nombre: NOMBRE_DIA[candidato], salto }
    }
  }
  return null
}

/**
 * Evalúa una regla (de categoría o de grupo) contra un momento dado.
 * Devuelve siempre el mismo objeto, para que la UI no tenga que decidir nada.
 */
export function evaluar(regla, ahora = ahoraEnCDMX()) {
  if (!regla) {
    return {
      estado: ESTADOS.ahora,
      disponible: true,
      mensaje: '',
      resumen: '',
      proximo: null,
    }
  }

  const { dia, minutos } = ahora
  const aplicaHoy = regla.dias.includes(dia)
  const siguiente = proximoDia(regla, dia)
  const textoProximo = siguiente
    ? siguiente.salto === 1
      ? `Vuelve mañana ${siguiente.nombre}`
      : `Vuelve el ${siguiente.nombre}`
    : ''

  // No se sirve hoy.
  if (!aplicaHoy) {
    const estado = regla.soloDomingos ? ESTADOS.soloDomingos : ESTADOS.noHoy
    return {
      estado,
      disponible: false,
      mensaje: regla.otroDia ?? `Disponible ${regla.resumen.toLowerCase()}`,
      resumen: regla.resumen,
      proximo: siguiente,
      textoProximo,
    }
  }

  // Es su día, pero todavía no abre.
  if (minutos < regla.desde) {
    return {
      estado: ESTADOS.masTarde,
      disponible: false,
      mensaje: regla.antesDeHorario ?? `Disponible a partir de las ${formatoHora(regla.desde)}`,
      resumen: regla.resumen,
      proximo: siguiente,
      textoProximo: `Hoy a partir de las ${formatoHora(regla.desde)}`,
      abreHoyEn: regla.desde,
    }
  }

  // Es su día, pero ya cerró.
  if (minutos >= regla.hasta) {
    return {
      estado: ESTADOS.noHoy,
      disponible: false,
      mensaje: regla.fueraDeHorario ?? `Horario: ${regla.resumen}`,
      resumen: regla.resumen,
      proximo: siguiente,
      textoProximo,
    }
  }

  // Disponible.
  return {
    estado: ESTADOS.ahora,
    disponible: true,
    mensaje: regla.textoActivo ?? `Hasta las ${formatoHora(regla.hasta)}`,
    resumen: regla.resumen,
    proximo: siguiente,
    textoProximo: '',
    cierraHoyEn: regla.hasta,
  }
}

/** Estado de una de las seis categorías del menú. */
export function estadoCategoria(id, ahora = ahoraEnCDMX()) {
  return evaluar(REGLAS[id], ahora)
}

/** Estado de un grupo (p. ej. "Barbacoa"); si no tiene regla propia, hereda la de su categoría. */
export function estadoGrupo(nombreGrupo, idCategoria, ahora = ahoraEnCDMX()) {
  const propia = REGLAS_GRUPO[nombreGrupo]
  if (propia) {
    const estado = evaluar(propia, ahora)
    const padre = evaluar(REGLAS[idCategoria], ahora)
    // Un grupo no puede estar disponible si su categoría está cerrada.
    return estado.disponible && !padre.disponible ? padre : estado
  }
  return evaluar(REGLAS[idCategoria], ahora)
}

/** Estado de una promoción que declara sus propios días (si no, siempre activa). */
export function estadoPromo(nombrePromo, ahora = ahoraEnCDMX()) {
  const regla = REGLAS_PROMO[nombrePromo]
  return regla ? evaluar(regla, ahora) : null
}

/**
 * Guarda única para el carrito y para el backend cuando existan.
 * `grupo` es opcional y permite bloquear la barbacoa fuera del domingo.
 */
export function puedeAgregarAlCarrito({ categoria, grupo } = {}, ahora = ahoraEnCDMX()) {
  const cat = estadoCategoria(categoria, ahora)
  if (!cat.disponible) {
    return { permitido: false, motivo: cat.mensaje, estado: cat.estado.id }
  }
  if (grupo) {
    const g = estadoGrupo(grupo, categoria, ahora)
    if (!g.disponible) {
      return { permitido: false, motivo: g.mensaje, estado: g.estado.id }
    }
  }
  return { permitido: true, motivo: '', estado: 'ahora' }
}

/**
 * Revisa una lista de artículos (formato { categoria, grupo, nombre }) y
 * devuelve los que ya no se pueden comprar. Pensada para avisar al cliente
 * antes de finalizar la compra, y para reutilizarse en el backend.
 */
export function revisarDisponibilidad(articulos = [], ahora = ahoraEnCDMX()) {
  const noDisponibles = articulos
    .map((art) => ({ articulo: art, ...puedeAgregarAlCarrito(art, ahora) }))
    .filter((r) => !r.permitido)

  return { todoDisponible: noDisponibles.length === 0, noDisponibles }
}

// -----------------------------------------------------------------------------
// Aviso del día que se muestra encima del menú
// -----------------------------------------------------------------------------
export function avisoDelDia(ahora = ahoraEnCDMX()) {
  const ids = Object.keys(REGLAS)
  const evaluadas = ids.map((id) => ({ id, ...REGLAS[id], ...estadoCategoria(id, ahora) }))

  const activas = evaluadas.filter((c) => c.disponible)
  const masTarde = evaluadas.filter((c) => c.estado.id === ESTADOS.masTarde.id)

  const frases = []

  if (ahora.esDomingo) {
    frases.push('Menú de fin de semana y barbacoa disponibles.')
  } else if (ahora.esFinDeSemana) {
    frases.push('Ya está disponible nuestro menú de fin de semana.')
    frases.push('La barbacoa se sirve únicamente los domingos.')
  } else {
    const desayunos = evaluadas.find((c) => c.id === 'desayunos')
    const mexicana = evaluadas.find((c) => c.id === 'mexicana')

    if (desayunos.disponible) {
      frases.push(`Desayunos disponibles hasta las ${formatoHora(REGLAS.desayunos.hasta)}`)
    }
    if (mexicana.disponible) {
      frases.push(`comida mexicana hasta las ${formatoHora(REGLAS.mexicana.hasta)}`)
    } else if (mexicana.estado.id === ESTADOS.masTarde.id) {
      frases.push(`comida mexicana a partir de las ${formatoHora(REGLAS.mexicana.desde)}`)
    }
    if (!frases.length) {
      frases.push('La cocina está fuera de horario, pero las bebidas siguen disponibles')
    }
  }

  const crudo = ahora.esFinDeSemana
    ? frases.join(' ')
    : `${frases.join(' y ')}.`.replace('..', '.')
  const texto = crudo.charAt(0).toUpperCase() + crudo.slice(1)

  return {
    saludo: `Hoy es ${ahora.nombreDia}`,
    reloj: ahora.reloj,
    texto,
    activas: activas.map((c) => c.nombre),
    masTarde: masTarde.map((c) => ({ nombre: c.nombre, desde: formatoHora(c.desde) })),
    simulado: ahora.simulado,
  }
}
