// -----------------------------------------------------------------------------
// Regla ÚNICA de qué se publica en la carta.
//
// Un producto solo se dibuja si tiene un precio real. Nada de "$***", "****",
// precio vacío ni "por confirmar": lo que no tiene precio confirmado no se
// borra, simplemente no se renderiza.
//
// El filtrado ocurre AQUÍ, sobre los datos, nunca con CSS: un producto oculto
// tampoco llega al HTML, ni al que leen los buscadores.
// -----------------------------------------------------------------------------

/**
 * Un precio vale si es un número finito mayor que cero.
 * Todo lo demás —null, undefined, '', '***', '$', '129' como texto— es inválido
 * a propósito: obliga a guardar los precios como número.
 */
export function precioValido(precio) {
  return typeof precio === 'number' && Number.isFinite(precio) && precio > 0
}

/** Variantes con precio confirmado. Las demás se conservan pero no se muestran. */
export function variantesVisibles(producto) {
  return (producto.variantes ?? []).filter((v) => precioValido(v.precio))
}

/**
 * ¿Este producto se publica?
 *   1. No está marcado como oculto (`visible: false` u `oculto: true`).
 *   2. Tiene precio propio válido, o al menos una variante con precio válido.
 */
export function esVisible(producto) {
  if (!producto) return false
  if (producto.visible === false || producto.oculto === true) return false
  if (producto.variantes?.length) return variantesVisibles(producto).length > 0
  return precioValido(producto.precio)
}

/** Productos publicables de un grupo. */
export function productosVisibles(grupo) {
  return (grupo?.productos ?? []).filter(esVisible)
}

/** Un grupo sin productos publicables no debe dibujar ni su encabezado. */
export function grupoVisible(grupo) {
  return productosVisibles(grupo).length > 0
}

/**
 * Todo lo que hoy NO se publica, con el motivo. Lo usa el build para reportarlo
 * por consola y las pruebas para verificar que nada se perdió.
 */
export function catalogoPendiente(menu) {
  const pendientes = []
  Object.entries(menu).forEach(([categoria, grupos]) => {
    grupos.forEach((grupo) => {
      grupo.productos.forEach((p) => {
        if (esVisible(p)) return
        pendientes.push({
          categoria,
          grupo: grupo.grupo,
          nombre: p.nombre,
          motivo:
            p.visible === false || p.oculto === true
              ? 'marcado como no visible'
              : 'sin precio confirmado',
        })
      })
    })
  })
  return pendientes
}
