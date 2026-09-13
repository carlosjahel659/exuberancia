import test from 'node:test'
import assert from 'node:assert/strict'
import {
  APERTURAS_SERVICIO, CIERRE_DIARIO, REGLAS, REGLAS_GRUPO, ahoraEnCDMX,
  aperturaDelDia, avisoDelDia, estadoCategoria, estadoGrupo, estadoPromo,
  evaluar, leerSimulacion, puedeAgregarAlCarrito, revisarDisponibilidad,
} from '../src/data/horarios.js'

const instanteReal = new Date('2026-09-07T16:15:00Z')
const momento = (dia, hora, minuto = 0) => ({ dia, minutos: hora * 60 + minuto })

test('cierre del 13 de septiembre bloquea tres categorías todo el día y sus grupos', () => {
  for (let minutos = 0; minutos < 1440; minutos += 1) {
    const ahora = { fecha: '2026-09-13', dia: 0, minutos }
    for (const id of ['desayunos', 'entradas', 'mexicana']) {
      assert.equal(estadoCategoria(id, ahora).estado.id, 'noHoy')
      assert.equal(estadoGrupo('Sin regla', id, ahora).disponible, false)
      assert.equal(puedeAgregarAlCarrito({ categoria: id }, ahora).permitido, false)
    }
    for (const id of ['finde', 'barbacoa', 'bebidas']) {
      assert.equal(estadoCategoria(id, ahora).disponible, minutos >= 420 && minutos < 1170)
    }
  }
  const hoy = ahoraEnCDMX(new Date('2026-09-13T16:00:00Z'), '')
  assert.deepEqual(avisoDelDia(hoy).activas, ['Fin de semana', 'Barbacoa', 'Bebidas'])
  assert.deepEqual(avisoDelDia(hoy).masTarde, [])
})

test('excepción empieza y vence a medianoche CDMX, no UTC, sin afectar otros días', () => {
  for (const [instante, fecha, excepcional] of [
    ['2026-09-13T05:59:59Z', '2026-09-12', false],
    ['2026-09-13T06:00:00Z', '2026-09-13', true],
    ['2026-09-14T05:59:59Z', '2026-09-13', true],
    ['2026-09-14T06:00:00Z', '2026-09-14', false],
  ]) {
    const ahora = ahoraEnCDMX(new Date(instante), '')
    assert.equal(ahora.fecha, fecha)
    assert.equal(estadoCategoria('entradas', ahora).mensaje.includes('No disponible hoy.'), excepcional)
  }
  for (const fecha of ['2026-09-12', '2026-09-14', '2026-09-20']) {
    for (const [id, hora] of [['desayunos', '10:00'], ['entradas', '10:00'], ['mexicana', '13:00']]) {
      assert.equal(estadoCategoria(id, ahoraEnCDMX(instanteReal, `?ahora=${fecha}T${hora}`)).disponible, true)
    }
  }
})

test('simulación fechada y por hora respetan el cierre; día semanal revisa horario habitual', () => {
  const hoy = new Date('2026-09-13T16:00:00Z')
  for (const consulta of ['', '?hora=10:00', '?ahora=2026-09-13T10:00', '?ahora=2026-09-13T16:00Z']) {
    assert.equal(estadoCategoria('entradas', ahoraEnCDMX(hoy, consulta)).disponible, false)
  }
  assert.equal(estadoCategoria('entradas', ahoraEnCDMX(hoy, '?dia=domingo&hora=10:00')).disponible, true)
})

test('apertura unificada: 9 entre semana y 7 el fin de semana', () => {
  assert.equal(APERTURAS_SERVICIO.length, 2)
  for (let dia = 0; dia < 7; dia += 1) {
    assert.equal(aperturaDelDia(dia), (dia === 0 || dia === 6 ? 7 : 9) * 60)
  }
  assert.equal(aperturaDelDia(7), null)
})

test('ninguna categoría sirve fuera del horario general durante toda la semana', () => {
  for (let dia = 0; dia < 7; dia += 1) {
    for (let minutos = 0; minutos < 1440; minutos += 1) {
      if (minutos >= aperturaDelDia(dia) && minutos < CIERRE_DIARIO) continue
      for (const id of Object.keys(REGLAS)) {
        assert.equal(estadoCategoria(id, { dia, minutos }).disponible, false, `${id}: ${dia}/${minutos}`)
      }
    }
  }
})

test('límites de desayuno, comida y cierre de bebidas son exclusivos al cerrar', () => {
  assert.equal(estadoCategoria('desayunos', momento(0, 7)).disponible, false)
  assert.equal(estadoCategoria('desayunos', momento(1, 8, 59)).estado.id, 'masTarde')
  assert.equal(estadoCategoria('desayunos', momento(1, 9)).disponible, true)
  assert.equal(estadoCategoria('desayunos', momento(1, 11, 59)).disponible, true)
  assert.equal(estadoCategoria('desayunos', momento(1, 12)).disponible, false)
  assert.equal(estadoCategoria('mexicana', momento(1, 11, 59)).disponible, false)
  assert.equal(estadoCategoria('mexicana', momento(1, 12)).disponible, true)
  assert.equal(estadoCategoria('mexicana', momento(1, 19)).disponible, false)
  assert.equal(estadoCategoria('entradas', momento(1, 19)).disponible, false)
  assert.equal(estadoCategoria('bebidas', momento(1, 19, 29)).disponible, true)
  assert.equal(estadoCategoria('bebidas', momento(1, 19, 30)).disponible, false)
})

test('fin de semana y barbacoa respetan días independientes y apertura', () => {
  assert.equal(estadoCategoria('finde', momento(5, 12)).disponible, false)
  assert.equal(estadoCategoria('finde', momento(6, 6, 59)).disponible, false)
  assert.equal(estadoCategoria('finde', momento(6, 7)).disponible, true)
  assert.equal(estadoCategoria('barbacoa', momento(6, 12)).estado.id, 'soloDomingos')
  assert.equal(estadoCategoria('barbacoa', momento(0, 7)).disponible, true)
  assert.equal(estadoCategoria('barbacoa', momento(0, 19, 29)).disponible, true)
  assert.equal(estadoCategoria('barbacoa', momento(0, 19, 30)).disponible, false)
})

test('cierre global limita incluso una regla con horario más amplio', () => {
  const regla = { dias: [1], desde: 0, hasta: 1440, resumen: 'Prueba' }
  assert.equal(evaluar(regla, momento(1, 8)).abreHoyEn, 540)
  assert.equal(evaluar(regla, momento(1, 19)).cierraHoyEn, CIERRE_DIARIO)
  assert.equal(evaluar(regla, momento(1, 19, 30)).disponible, false)
})

test('categorías desconocidas y momentos inválidos no autorizan disponibilidad', () => {
  for (const id of [undefined, '', 'inexistente', '__proto__', 'constructor']) {
    assert.equal(estadoCategoria(id, momento(0, 12)).disponible, false)
    assert.equal(puedeAgregarAlCarrito({ categoria: id }, momento(0, 12)).permitido, false)
  }
  for (const valor of [null, { dia: 7, minutos: 600 }, { dia: 0, minutos: NaN }, { dia: 0, minutos: 1440 }]) {
    assert.equal(estadoCategoria('bebidas', valor).disponible, false)
  }
  assert.equal(evaluar(undefined, momento(1, 12)).disponible, false)
})

test('grupo hereda categoría y una regla propia no permite saltarse su cierre', () => {
  REGLAS_GRUPO.Prueba = { dias: [0, 1], desde: 0, hasta: 1440, resumen: 'Prueba' }
  try {
    assert.equal(estadoGrupo('Prueba', 'desayunos', momento(0, 13)).disponible, false)
    assert.equal(estadoGrupo('Prueba', 'inexistente', momento(0, 10)).disponible, false)
    assert.equal(estadoGrupo('Sin regla', 'bebidas', momento(0, 10)).disponible, true)
    const revision = revisarDisponibilidad([
      { categoria: 'bebidas', nombre: 'Bebida' },
      { categoria: 'desayunos', nombre: 'Desayuno' },
    ], momento(0, 13))
    assert.equal(revision.todoDisponible, false)
    assert.equal(revision.noDisponibles[0].articulo.nombre, 'Desayuno')
  } finally {
    delete REGLAS_GRUPO.Prueba
  }
})

test('música respeta reglas existentes y promociones informativas no inventan horarios', () => {
  assert.equal(estadoPromo('Música en vivo', momento(6, 9, 59)).disponible, false)
  assert.equal(estadoPromo('Música en vivo', momento(6, 10)).disponible, true)
  assert.equal(estadoPromo('Música en vivo', momento(5, 12)).disponible, false)
  assert.equal(estadoPromo('Otra promoción', momento(5, 12)), null)
})

test('simulación acepta únicamente días y reloj válidos', () => {
  assert.deepEqual(leerSimulacion('?dia=domingo&hora=13:00', instanteReal), {
    fecha: null, dia: 0, minutos: 780, simulado: true,
  })
  assert.equal(leerSimulacion('?dia=MIÉRCOLES&hora=09:00', instanteReal).dia, 3)
  assert.equal(leerSimulacion('?dia=6&hora=09:00', instanteReal).dia, 6)
  assert.equal(leerSimulacion('?hora=00:00', instanteReal).minutos, 0)
  assert.equal(leerSimulacion('?hora=23:59', instanteReal).minutos, 1439)
  for (const consulta of [
    '', '?otro=valor', '?dia=', '?dia=7', '?dia=-1', '?dia=1.0', '?dia=0x1',
    '?dia=domingo<script>', '?hora=24:00', '?hora=12:60', '?hora=9:00',
    '?hora=12', '?hora=12:30:40', '?hora=-1:00', '?hora=1e1:00', '?hora=12:3',
    '?ahora=2026-02-30T12:00', '?ahora=2025-02-29T12:00',
    '?ahora=2026-13-01T12:00', '?ahora=2026-09-06T24:00', '?ahora=mañana',
    '?dia=99&hora=88:99&ahora=invalida',
  ]) assert.equal(leerSimulacion(consulta, instanteReal), null, consulta)
})

test('parámetros válidos sobreviven a otros inválidos sin normalizar basura', () => {
  assert.deepEqual(leerSimulacion('?dia=7&hora=13:00', instanteReal), {
    fecha: '2026-09-07', dia: 1, minutos: 780, simulado: true,
  })
  assert.deepEqual(leerSimulacion('?dia=domingo&hora=25:00', instanteReal), {
    fecha: null, dia: 0, minutos: 615, simulado: true,
  })
})

test('fecha de simulación sin zona es civil CDMX y fecha con zona se convierte', () => {
  assert.deepEqual(leerSimulacion('?ahora=2026-09-06T13:00', instanteReal), {
    fecha: '2026-09-06', dia: 0, minutos: 780, simulado: true,
  })
  assert.deepEqual(leerSimulacion('?ahora=2026-09-07T01:00Z', instanteReal), {
    fecha: '2026-09-06', dia: 0, minutos: 1140, simulado: true,
  })
  assert.deepEqual(leerSimulacion('?ahora=2026-09-06T13:00-06:00', instanteReal), {
    fecha: '2026-09-06', dia: 0, minutos: 780, simulado: true,
  })
  assert.equal(leerSimulacion('?ahora=2024-02-29T12:00', instanteReal).dia, 4)
  assert.equal(ahoraEnCDMX(instanteReal, '?hora=invalida').simulado, false)
  assert.equal(ahoraEnCDMX(instanteReal, '').minutos, 615)
})

test('aviso anuncia apertura efectiva y cocina real al final del fin de semana', () => {
  assert.match(avisoDelDia(momento(1, 5)).texto, /9:00 a. m./)
  assert.match(avisoDelDia(momento(0, 5)).texto, /7:00 a. m./)
  assert.equal(avisoDelDia(momento(0, 5)).masTarde.find((c) => c.nombre === 'Bebidas').desde, '7:00 a. m.')
  const domingo = avisoDelDia(momento(0, 19, 15))
  assert.match(domingo.texto, /menú de fin de semana y barbacoa/)
  assert.doesNotMatch(domingo.texto, /cocina está fuera/)
  assert.doesNotMatch(avisoDelDia(momento(6, 19, 15)).texto, /barbacoa/)
  assert.match(avisoDelDia(momento(1, 19, 15)).texto, /cocina está fuera de horario/)
  assert.equal(avisoDelDia(momento(0, 19, 30)).activas.length, 0)
})
