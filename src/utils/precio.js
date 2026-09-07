import { precioValido } from './catalogo.js'

// Los importes se conservan como números en los datos; aquí solo se presentan.
const formato = new Intl.NumberFormat('es-MX', {
  maximumFractionDigits: 2,
  useGrouping: true,
})

export function precioMXN(valor) {
  return precioValido(valor) ? `$${formato.format(valor)}` : ''
}

export function precioDesde(variantes = []) {
  const precios = variantes.map((variante) => variante?.precio).filter(precioValido)
  return precios.length ? precioMXN(Math.min(...precios)) : ''
}
