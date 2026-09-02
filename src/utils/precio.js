// -----------------------------------------------------------------------------
// Formato de precios.
// En los datos el precio se guarda como NÚMERO (109, 2599). Aquí se convierte
// a lo que ve el cliente: "$109", "$2,599". Sin centavos y con separador de
// miles, siempre en pesos mexicanos.
// -----------------------------------------------------------------------------

const formato = new Intl.NumberFormat('es-MX', {
  maximumFractionDigits: 0,
  useGrouping: true,
})

/** 2599 -> "$2,599". Devuelve '' si no hay precio, para no pintar "$undefined". */
export function precioMXN(valor) {
  if (typeof valor !== 'number' || !Number.isFinite(valor)) return ''
  return `$${formato.format(Math.round(valor))}`
}

/**
 * Precio que se muestra en la cabecera de una tarjeta con variantes:
 * el más barato, prefijado con "desde".
 */
export function precioDesde(variantes = []) {
  const precios = variantes.map((v) => v.precio).filter((p) => typeof p === 'number')
  if (!precios.length) return ''
  return precioMXN(Math.min(...precios))
}
