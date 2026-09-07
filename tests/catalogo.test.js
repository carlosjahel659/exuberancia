import test from 'node:test'
import assert from 'node:assert/strict'
import {
  catalogoPendiente, catalogoSinPrecio, esVisible, grupoVisible, precioPendiente,
  precioValido, productosVisibles, variantesVisibles,
} from '../src/utils/catalogo.js'
import { precioDesde, precioMXN } from '../src/utils/precio.js'

test('precios válidos y formato rechazan vacíos, texto y valores no finitos', () => {
  for (const valor of [null, undefined, '', '129', '***', 0, -1, NaN, Infinity]) {
    assert.equal(precioValido(valor), false)
    assert.equal(precioMXN(valor), '')
  }
  assert.equal(precioMXN(2599), '$2,599')
  assert.equal(precioMXN(129.5), '$129.5')
  assert.equal(precioDesde([{ precio: Infinity }, { precio: -1 }, { precio: 200 }, { precio: 129 }]), '$129')
  assert.equal(precioDesde([{ precio: null }, { precio: NaN }]), '')
})

test('publicación conserva la excepción explícita de precio pendiente', () => {
  assert.equal(esVisible({ nombre: 'Sin precio', precio: null }), false)
  assert.equal(esVisible({ nombre: 'Confirmado', precio: 129 }), true)
  assert.equal(esVisible({ nombre: 'Pendiente', precio: null, precioPendiente: true }), true)
  assert.equal(precioPendiente({ precio: null, precioPendiente: true }), true)
  assert.equal(precioPendiente({ precio: 129, precioPendiente: true }), false)
  assert.equal(esVisible({ precio: 129, visible: false }), false)
  assert.equal(esVisible({ precioPendiente: true, oculto: true }), false)
})

test('variantes comparten filtrado y respetan sus marcas de visibilidad', () => {
  const variantes = [
    { medida: 'Chica', precio: 50 },
    { medida: 'Grande', precio: null },
    { medida: 'Oculta', precio: 90, visible: false },
  ]
  assert.deepEqual(variantesVisibles({ variantes }).map((v) => v.medida), ['Chica'])
  assert.deepEqual(variantesVisibles({ variantes, precioPendiente: true }).map((v) => v.medida), ['Chica', 'Grande'])
  assert.equal(esVisible({ variantes: [{ precio: null }] }), false)
  assert.equal(esVisible({ variantes: [{ precio: null }], precioPendiente: true }), true)
  assert.equal(esVisible({ variantes: [{ precio: 50, oculto: true }] }), false)
})

test('grupo vacío no se publica, sin borrar sus productos originales', () => {
  const grupo = { productos: [{ nombre: 'Pendiente', precio: null }] }
  assert.equal(grupoVisible(grupo), false)
  assert.deepEqual(productosVisibles(grupo), [])
  assert.equal(grupo.productos.length, 1)
})

test('reporte incluye variantes ocultas de tarjetas parcialmente publicadas', () => {
  const menu = { bebidas: [{
    grupo: 'De prueba',
    productos: [
      { nombre: 'Totalmente oculta', variantes: [{ medida: 'Chica', precio: null }] },
      { nombre: 'Parcial', variantes: [
        { medida: 'Chica', precio: 50 },
        { medida: 'Grande', precio: null },
        { medida: 'Especial', precio: 100, oculto: true },
      ] },
      { nombre: 'Pendiente visible', precio: null, precioPendiente: true },
      { nombre: 'Variantes pendientes', precioPendiente: true, variantes: [
        { medida: 'Chica', precio: 50 }, { medida: 'Grande', precio: null },
      ] },
    ],
  }] }
  const copia = structuredClone(menu)
  assert.deepEqual(catalogoPendiente(menu).map((item) => [item.tipo, item.nombre, item.motivo]), [
    ['producto', 'Totalmente oculta', 'sin precio confirmado'],
    ['variante', 'Parcial · Grande', 'sin precio confirmado'],
    ['variante', 'Parcial · Especial', 'marcada como no visible'],
  ])
  assert.deepEqual(catalogoSinPrecio(menu).map((item) => item.nombre), [
    'Pendiente visible', 'Variantes pendientes · Grande',
  ])
  assert.deepEqual(menu, copia)
})
