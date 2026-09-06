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

/** Texto único que se muestra donde iría el precio mientras no lo haya. */
export const ETIQUETA_PENDIENTE = 'Precio por confirmar'

/**
 * ¿Hay que anunciar este precio como pendiente?
 * Solo para los productos que el restaurante pidió publicar aunque el precio
 * todavía no esté definido. En cuanto se sustituya el `null` por un número,
 * esto devuelve false y la interfaz muestra el precio sola.
 */
export function precioPendiente(producto, valor = producto?.precio) {
  return Boolean(producto?.precioPendiente) && !precioValido(valor)
}

/**
 * Variantes que se muestran.
 * Normalmente solo las que tienen precio; en un producto marcado como pendiente
 * se muestran todas, y cada fila decide si pinta el precio o la etiqueta.
 */
export function variantesVisibles(producto) {
  const variantes = producto?.variantes ?? []
  if (producto?.precioPendiente) return variantes
  return variantes.filter((v) => precioValido(v.precio))
}

/**
 * ¿Este producto se publica?
 *   1. No está marcado como oculto (`visible: false` u `oculto: true`).
 *   2. Y entonces: o está marcado como `precioPendiente`, o tiene precio propio
 *      válido, o al menos una variante con precio válido.
 *
 * La regla general sigue siendo "sin precio no se publica"; `precioPendiente`
 * es la excepción explícita, producto por producto.
 */
export function esVisible(producto) {
  if (!producto) return false
  if (producto.visible === false || producto.oculto === true) return false
  if (producto.precioPendiente) return true
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

/**
 * Lo contrario: productos que SÍ se publican pero todavía anuncian
 * "Precio por confirmar". Sirve para no perderlos de vista en el build.
 */
export function catalogoSinPrecio(menu) {
  const sinPrecio = []
  Object.entries(menu).forEach(([categoria, grupos]) => {
    grupos.forEach((grupo) => {
      grupo.productos.forEach((p) => {
        if (!esVisible(p)) return
        if (precioPendiente(p) && !p.variantes?.length) {
          sinPrecio.push({ categoria, grupo: grupo.grupo, nombre: p.nombre })
          return
        }
        variantesVisibles(p)
          .filter((v) => precioPendiente(p, v.precio))
          .forEach((v) =>
            sinPrecio.push({
              categoria,
              grupo: grupo.grupo,
              nombre: `${p.nombre} · ${v.medida}`,
            }),
          )
      })
    })
  })
  return sinPrecio
}
