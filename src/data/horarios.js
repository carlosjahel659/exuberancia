// Fuente de verdad de días, horarios y disponibilidad.
// La zona se normaliza a Ciudad de México; el instante sigue dependiendo del
// reloj del dispositivo. Esto orienta la carta, no valida pedidos en un servidor.

export const ZONA = 'America/Mexico_City'

const DIAS_INTL = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
export const NOMBRE_DIA = [
  'domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado',
]
export const LUNES_A_VIERNES = [1, 2, 3, 4, 5]
export const FIN_DE_SEMANA = [6, 0]
export const TODOS_LOS_DIAS = [0, 1, 2, 3, 4, 5, 6]
export const SOLO_DOMINGO = [0]

const min = (hora, minuto = 0) => hora * 60 + minuto
export const CIERRE_DIARIO = min(19, 30)

/** Horarios de apertura ya declarados por el restaurante. También alimentan SEO. */
export const APERTURAS_SERVICIO = [
  {
    dias: 'Lunes a viernes',
    diasSemana: LUNES_A_VIERNES,
    diasSchema: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    abre: min(9),
  },
  {
    dias: 'Sábado y domingo',
    diasSemana: FIN_DE_SEMANA,
    diasSchema: ['Saturday', 'Sunday'],
    abre: min(7),
  },
]

export function aperturaDelDia(dia) {
  return APERTURAS_SERVICIO.find((horario) => horario.diasSemana.includes(dia))?.abre ?? null
}

const sinAcentos = (texto) =>
  texto.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')

/** Minutos desde medianoche → hora local legible. */
export function formatoHora(minutos) {
  const h24 = Math.floor(minutos / 60) % 24
  const m = minutos % 60
  const sufijo = h24 < 12 ? 'a. m.' : 'p. m.'
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12
  return `${h12}:${String(m).padStart(2, '0')} ${sufijo}`
}

export const REGLAS = {
  desayunos: {
    nombre: 'Desayunos',
    corto: 'Desayunos',
    icono: 'desayunos',
    dias: TODOS_LOS_DIAS,
    desde: min(9),
    hasta: min(12),
    resumen: 'Todos los días · 9:00 a. m. a 12:00 p. m.',
    fueraDeHorario: 'Desayunos disponibles de 9:00 a. m. a 12:00 p. m.',
  },
  entradas: {
    nombre: 'Entradas',
    corto: 'Entradas',
    icono: 'entradas',
    dias: TODOS_LOS_DIAS,
    desde: min(9),
    hasta: min(19),
    resumen: 'Todos los días · 9:00 a. m. a 7:00 p. m.',
    fueraDeHorario: 'Entradas disponibles de 9:00 a. m. a 7:00 p. m.',
  },
  mexicana: {
    nombre: 'Comida mexicana',
    corto: 'Mexicana',
    icono: 'mexicana',
    dias: TODOS_LOS_DIAS,
    desde: min(12),
    hasta: min(19),
    resumen: 'Todos los días · 12:00 p. m. a 7:00 p. m.',
    antesDeHorario: 'Disponible a partir de las 12:00 p. m.',
    fueraDeHorario: 'Comida mexicana disponible de 12:00 p. m. a 7:00 p. m.',
  },
  finde: {
    nombre: 'Fin de semana',
    corto: 'Fin de semana',
    icono: 'finde',
    dias: FIN_DE_SEMANA,
    desde: min(7),
    hasta: CIERRE_DIARIO,
    resumen: 'Sáb y dom · 7:00 a. m. a 7:30 p. m.',
    fueraDeHorario: 'El menú de fin de semana se sirve hasta las 7:30 p. m.',
    otroDia: 'Disponible sábados y domingos',
  },
  barbacoa: {
    nombre: 'Barbacoa',
    corto: 'Barbacoa',
    icono: 'barbacoa',
    dias: SOLO_DOMINGO,
    desde: min(7),
    hasta: CIERRE_DIARIO,
    resumen: 'Domingos · 7:00 a. m. a 7:30 p. m.',
    soloDomingos: true,
    fueraDeHorario: 'La barbacoa de hoy se sirvió hasta las 7:30 p. m.',
    otroDia: 'Disponible únicamente los domingos',
    textoBloqueo: 'Disponible únicamente los domingos',
  },
  bebidas: {
    nombre: 'Bebidas',
    corto: 'Bebidas',
    icono: 'bebidas',
    dias: TODOS_LOS_DIAS,
    // La apertura efectiva depende del día, como el horario general de servicio.
    desde: min(0),
    hasta: CIERRE_DIARIO,
    resumen: 'Todos los días · durante el horario de servicio',
    fueraDeHorario: 'Las bebidas se sirven hasta las 7:30 p. m.',
  },
}

/** Las reglas propias de un grupo nunca pueden ampliar las de su categoría. */
export const REGLAS_GRUPO = {}

export const REGLAS_PROMO = {
  'Música en vivo': {
    nombre: 'Música en vivo',
    dias: FIN_DE_SEMANA,
    desde: min(10),
    hasta: CIERRE_DIARIO,
    resumen: 'Sábados y domingos desde las 10:00 a. m.',
    textoActivo: 'Hay música en vivo hoy',
    antesDeHorario: 'Hoy a partir de las 10:00 a. m.',
    otroDia: 'Sábados y domingos desde las 10:00 a. m.',
  },
}

const relojCDMX = new Intl.DateTimeFormat('en-US', {
  timeZone: ZONA,
  weekday: 'short',
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
})

function calcularAhora(base = new Date()) {
  const partes = relojCDMX.formatToParts(base)
  const valor = (tipo) => partes.find((p) => p.type === tipo)?.value ?? ''
  return {
    dia: DIAS_INTL.indexOf(valor('weekday')),
    minutos: Number(valor('hour')) * 60 + Number(valor('minute')),
    simulado: false,
  }
}

/**
 * Una fecha sin zona representa el reloj civil de CDMX, nunca la zona del
 * navegador. Con Z o un desplazamiento explícito representa un instante.
 */
function leerFechaSimulada(valor) {
  const partes = /^(\d{4})-(\d{2})-(\d{2})T([01]\d|2[0-3]):([0-5]\d)(?::([0-5]\d))?(Z|[+-](?:[01]\d|2[0-3]):[0-5]\d)?$/.exec(valor ?? '')
  if (!partes) return null
  const [, anio, mes, diaMes, hora, minuto, segundo = '00', zona] = partes
  const fecha = new Date(`${anio}-${mes}-${diaMes}T${hora}:${minuto}:${segundo}Z`)
  if (
    Number.isNaN(fecha.getTime()) ||
    fecha.getUTCFullYear() !== Number(anio) ||
    fecha.getUTCMonth() + 1 !== Number(mes) ||
    fecha.getUTCDate() !== Number(diaMes)
  ) return null

  if (zona) {
    const instante = new Date(`${anio}-${mes}-${diaMes}T${hora}:${minuto}:${segundo}${zona}`)
    return Number.isNaN(instante.getTime()) ? null : calcularAhora(instante)
  }
  return { dia: fecha.getUTCDay(), minutos: Number(hora) * 60 + Number(minuto) }
}

/**
 * Simulación visible para revisar la carta: ?dia=domingo&hora=13:00 o
 * ?ahora=2026-09-06T13:00. Los parámetros inválidos se ignoran individualmente;
 * si ninguno es válido, no se activa el modo de prueba.
 */
export function leerSimulacion(busqueda, base = new Date()) {
  const cadena = busqueda ?? (typeof window !== 'undefined' ? window.location.search : '')
  if (!cadena) return null
  const params = new URLSearchParams(cadena)
  const fecha = leerFechaSimulada(params.get('ahora'))
  const diaParam = params.get('dia')?.trim() ?? ''
  const horaParam = params.get('hora') ?? ''
  const dia = /^[0-6]$/.test(diaParam)
    ? Number(diaParam)
    : NOMBRE_DIA.map(sinAcentos).indexOf(sinAcentos(diaParam))
  const hora = /^([01]\d|2[0-3]):([0-5]\d)$/.exec(horaParam)
  if (!fecha && dia < 0 && !hora) return null

  const momento = fecha ?? calcularAhora(base)
  return {
    dia: dia >= 0 ? dia : momento.dia,
    minutos: hora ? Number(hora[1]) * 60 + Number(hora[2]) : momento.minutos,
    simulado: true,
  }
}

export function ahoraEnCDMX(base = new Date(), busqueda) {
  const momento = leerSimulacion(busqueda, base) ?? calcularAhora(base)
  return {
    ...momento,
    nombreDia: NOMBRE_DIA[momento.dia],
    reloj: formatoHora(momento.minutos),
    esFinDeSemana: FIN_DE_SEMANA.includes(momento.dia),
    esDomingo: momento.dia === 0,
  }
}

export const ESTADOS = {
  ahora: { id: 'ahora', texto: 'Disponible ahora', color: 'turquesa' },
  masTarde: { id: 'masTarde', texto: 'Disponible más tarde', color: 'amarillo' },
  noHoy: { id: 'noHoy', texto: 'No disponible hoy', color: 'gris' },
  soloDomingos: { id: 'soloDomingos', texto: 'Solo domingos', color: 'rosa' },
}

function proximoDia(regla, dia) {
  for (let salto = 1; salto <= 7; salto += 1) {
    const candidato = (dia + salto) % 7
    if (regla.dias.includes(candidato)) {
      return { indice: candidato, nombre: NOMBRE_DIA[candidato], salto }
    }
  }
  return null
}

const noDisponible = () => ({
  estado: ESTADOS.noHoy,
  disponible: false,
  mensaje: 'Disponibilidad no confirmada',
  resumen: '',
  proximo: null,
  textoProximo: '',
})

/** Apertura y cierre generales limitan todas las reglas, sin ampliar ninguna. */
export function evaluar(regla, ahora = ahoraEnCDMX()) {
  if (
    !Array.isArray(regla?.dias) ||
    !Number.isFinite(regla.desde) ||
    !Number.isFinite(regla.hasta) ||
    !Number.isInteger(ahora?.dia) || ahora.dia < 0 || ahora.dia > 6 ||
    !Number.isInteger(ahora?.minutos) || ahora.minutos < 0 || ahora.minutos >= 1440
  ) return noDisponible()

  const { dia, minutos } = ahora
  const desde = Math.max(regla.desde, aperturaDelDia(dia))
  const hasta = Math.min(regla.hasta, CIERRE_DIARIO)
  const siguiente = proximoDia(regla, dia)
  const textoProximo = siguiente
    ? siguiente.salto === 1 ? `Vuelve mañana ${siguiente.nombre}` : `Vuelve el ${siguiente.nombre}`
    : ''
  const comun = { resumen: regla.resumen ?? '', proximo: siguiente, textoProximo }

  if (!regla.dias.includes(dia)) {
    return {
      ...comun,
      estado: regla.soloDomingos ? ESTADOS.soloDomingos : ESTADOS.noHoy,
      disponible: false,
      mensaje: regla.otroDia ?? `Disponible ${comun.resumen.toLowerCase()}`,
    }
  }
  if (desde >= hasta) return noDisponible()

  if (minutos < desde) {
    return {
      ...comun,
      estado: ESTADOS.masTarde,
      disponible: false,
      mensaje: desde === regla.desde && regla.antesDeHorario
        ? regla.antesDeHorario : `Disponible a partir de las ${formatoHora(desde)}`,
      textoProximo: `Hoy a partir de las ${formatoHora(desde)}`,
      abreHoyEn: desde,
    }
  }
  if (minutos >= hasta) {
    return {
      ...comun,
      estado: ESTADOS.noHoy,
      disponible: false,
      mensaje: hasta === regla.hasta && regla.fueraDeHorario
        ? regla.fueraDeHorario : `Servicio hasta las ${formatoHora(hasta)}`,
    }
  }
  return {
    ...comun,
    estado: ESTADOS.ahora,
    disponible: true,
    mensaje: regla.textoActivo ?? `Hasta las ${formatoHora(hasta)}`,
    textoProximo: '',
    cierraHoyEn: hasta,
  }
}

export function estadoCategoria(id, ahora = ahoraEnCDMX()) {
  return evaluar(Object.hasOwn(REGLAS, id) ? REGLAS[id] : null, ahora)
}

export function estadoGrupo(nombreGrupo, idCategoria, ahora = ahoraEnCDMX()) {
  const padre = estadoCategoria(idCategoria, ahora)
  if (!padre.disponible) return padre
  return Object.hasOwn(REGLAS_GRUPO, nombreGrupo)
    ? evaluar(REGLAS_GRUPO[nombreGrupo], ahora)
    : padre
}

/** Las promociones sin regla propia son informativas, sin estado horario. */
export function estadoPromo(nombrePromo, ahora = ahoraEnCDMX()) {
  return Object.hasOwn(REGLAS_PROMO, nombrePromo)
    ? evaluar(REGLAS_PROMO[nombrePromo], ahora)
    : null
}

/** Ayuda para una futura interfaz de pedidos; no sustituye validación en servidor. */
export function puedeAgregarAlCarrito({ categoria, grupo } = {}, ahora = ahoraEnCDMX()) {
  const estado = grupo ? estadoGrupo(grupo, categoria, ahora) : estadoCategoria(categoria, ahora)
  return {
    permitido: estado.disponible,
    motivo: estado.disponible ? '' : estado.mensaje,
    estado: estado.estado.id,
  }
}

export function revisarDisponibilidad(articulos = [], ahora = ahoraEnCDMX()) {
  const noDisponibles = articulos
    .map((articulo) => ({ articulo, ...puedeAgregarAlCarrito(articulo, ahora) }))
    .filter((resultado) => !resultado.permitido)
  return { todoDisponible: noDisponibles.length === 0, noDisponibles }
}

export function avisoDelDia(ahora = ahoraEnCDMX()) {
  const evaluadas = Object.entries(REGLAS)
    .map(([id, regla]) => ({ id, ...regla, ...estadoCategoria(id, ahora) }))
  const activas = evaluadas.filter((categoria) => categoria.disponible)
  const masTarde = evaluadas.filter((categoria) => categoria.estado.id === ESTADOS.masTarde.id)
  const punto = (texto) => texto.endsWith('.') ? texto : `${texto}.`
  let texto

  if (!activas.length) {
    texto = masTarde.length
      ? punto(`Hoy empezamos a servir a las ${formatoHora(Math.min(...masTarde.map((categoria) => categoria.abreHoyEn)))}`)
      : punto(`Ya cerramos por hoy. Cerramos todos los días a las ${formatoHora(CIERRE_DIARIO)}`)
  } else {
    const cocina = activas.filter((categoria) => categoria.id !== 'bebidas')
    if (cocina.length) {
      const nombres = cocina.map((categoria) =>
        categoria.id === 'finde' ? 'menú de fin de semana' : categoria.nombre.toLowerCase())
      const lista = nombres.length === 1
        ? nombres[0] : `${nombres.slice(0, -1).join(', ')} y ${nombres.at(-1)}`
      texto = `Ahora servimos ${lista}.`
      const proximas = masTarde.filter((categoria) => ['desayunos', 'mexicana'].includes(categoria.id))
      proximas.forEach((categoria) => {
        texto += ` ${punto(`${categoria.nombre} a partir de las ${formatoHora(categoria.abreHoyEn)}`)}`
      })
    } else {
      texto = punto(`La cocina está fuera de horario. Servimos bebidas hasta las ${formatoHora(CIERRE_DIARIO)}`)
    }
  }

  return {
    saludo: `Hoy es ${ahora.nombreDia ?? NOMBRE_DIA[ahora.dia]}`,
    reloj: ahora.reloj ?? formatoHora(ahora.minutos),
    texto,
    activas: activas.map((categoria) => categoria.nombre),
    masTarde: masTarde.map((categoria) => ({
      nombre: categoria.nombre,
      desde: formatoHora(categoria.abreHoyEn),
    })),
    simulado: Boolean(ahora.simulado),
  }
}
