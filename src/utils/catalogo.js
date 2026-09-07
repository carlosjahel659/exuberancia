// Reglas de publicación de la carta. Los precios desconocidos se conservan
// en los datos; solo se muestran con la excepción explícita precioPendiente.

export function precioValido(precio) {
  return typeof precio === 'number' && Number.isFinite(precio) && precio > 0
}

export const ETIQUETA_PENDIENTE = 'Precio por confirmar'

export function precioPendiente(producto, valor = producto?.precio) {
  return Boolean(producto?.precioPendiente) && !precioValido(valor)
}

const marcadoOculto = (producto) =>
  producto?.visible === false || producto?.oculto === true

export function variantesVisibles(producto) {
  const variantes = Array.isArray(producto?.variantes) ? producto.variantes : []
  return variantes.filter((variante) =>
    variante && !marcadoOculto(variante) &&
    (producto?.precioPendiente || precioValido(variante.precio)))
}

/** Una tarjeta con variantes necesita al menos una presentación publicable. */
export function esVisible(producto) {
  if (!producto || marcadoOculto(producto)) return false
  if (producto.variantes?.length) return variantesVisibles(producto).length > 0
  return Boolean(producto.precioPendiente) || precioValido(producto.precio)
}

export function productosVisibles(grupo) {
  return (grupo?.productos ?? []).filter(esVisible)
}

export function grupoVisible(grupo) {
  return productosVisibles(grupo).length > 0
}

/**
 * Productos ocultos y variantes ocultas de productos parcialmente publicados.
 * No repite las variantes de un producto completamente oculto.
 */
export function catalogoPendiente(menu) {
  const pendientes = []
  Object.entries(menu).forEach(([categoria, grupos]) => {
    grupos.forEach((grupo) => {
      grupo.productos.forEach((producto) => {
        const base = { categoria, grupo: grupo.grupo }
        if (!esVisible(producto)) {
          pendientes.push({
            ...base,
            tipo: 'producto',
            nombre: producto.nombre,
            motivo: marcadoOculto(producto) ? 'marcado como no visible' : 'sin precio confirmado',
          })
          return
        }
        const visibles = variantesVisibles(producto)
        const variantes = producto.variantes ?? []
        variantes.forEach((variante, indice) => {
          if (visibles.includes(variante)) return
          const medida = variante?.medida || `Presentación ${indice + 1}`
          pendientes.push({
            ...base,
            tipo: 'variante',
            nombre: `${producto.nombre} · ${medida}`,
            variante: medida,
            motivo: marcadoOculto(variante) ? 'marcada como no visible' : 'sin precio confirmado',
          })
        })
      })
    })
  })
  return pendientes
}

/** Precios pendientes explícitamente publicados, incluidos los de variantes. */
export function catalogoSinPrecio(menu) {
  const sinPrecio = []
  Object.entries(menu).forEach(([categoria, grupos]) => {
    grupos.forEach((grupo) => {
      grupo.productos.forEach((producto) => {
        if (!esVisible(producto)) return
        if (precioPendiente(producto) && !producto.variantes?.length) {
          sinPrecio.push({ categoria, grupo: grupo.grupo, nombre: producto.nombre })
          return
        }
        variantesVisibles(producto)
          .filter((variante) => precioPendiente(producto, variante.precio))
          .forEach((variante) => sinPrecio.push({
            categoria,
            grupo: grupo.grupo,
            nombre: `${producto.nombre} · ${variante.medida}`,
          }))
      })
    })
  })
  return sinPrecio
}
