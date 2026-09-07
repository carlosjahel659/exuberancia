import { useState } from 'react'
import { precioMXN } from '../utils/precio'
import { ETIQUETA_PENDIENTE, precioValido, variantesVisibles } from '../utils/catalogo'

function textoPrecio(precio) {
  return precioValido(precio) ? precioMXN(precio) : ETIQUETA_PENDIENTE
}

/** Presentaciones y sabores permanecen dentro de un solo producto. */
export default function TarjetaBebida({ producto, aviso = false }) {
  const { nombre, descripcion, precio, sabores, opciones } = producto
  const [seleccion, setSeleccion] = useState(null)
  const variantes = variantesVisibles(producto)
  const varianteActiva = variantes.find((variante) => variante.medida === seleccion) ?? variantes[0]
  const precioVisible = varianteActiva ? varianteActiva.precio : precio
  const conIngredientes = (sabores ?? []).filter((sabor) => sabor.ingredientes)

  return (
    <article className={`tarjeta product-card flex h-full min-w-0 flex-col p-5 sm:p-6 ${aviso ? 'border-naranja/30 bg-naranja/[0.045]' : ''}`}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
        <h5 className="min-w-0 flex-1 basis-36 font-alt text-2xl leading-tight tracking-wide text-crema">
          {nombre}
        </h5>
        <span aria-live="polite" aria-atomic="true" className={precioValido(precioVisible) ? 'precio shrink-0 text-xl' : 'text-sm text-crema/75'}>
          {textoPrecio(precioVisible)}
        </span>
      </div>

      {descripcion && <p className="mt-3 text-sm leading-relaxed text-crema/80">{descripcion}</p>}

      {variantes.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label={`Presentaciones de ${nombre}`}>
          {variantes.map((variante) => {
            const activa = variante.medida === varianteActiva.medida
            return (
              <button
                key={variante.medida}
                type="button"
                onClick={() => setSeleccion(variante.medida)}
                aria-pressed={activa}
                className={`min-h-11 min-w-11 rounded-xl border px-3 py-2 text-sm leading-relaxed transition-colors duration-200 ${activa ? 'border-amarillo/70 bg-amarillo/10 font-semibold text-amarillo' : 'border-white/20 text-crema/85 hover:border-white/40 hover:bg-white/5'}`}
              >
                {variante.medida}
                <span className="sr-only">, {textoPrecio(variante.precio)}</span>
              </button>
            )
          })}
        </div>
      )}

      {opciones && (
        <div className="mt-4 border-t border-white/10 pt-4">
          <p className="text-xs font-semibold text-turquesa">{opciones.etiqueta}</p>
          <p className="mt-2 text-sm leading-relaxed text-crema/85">{opciones.valores.join(' · ')}</p>
        </div>
      )}

      {sabores?.length > 0 && (
        <div className="mt-4">
          <p className="text-xs font-semibold text-turquesa">Sabores</p>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {sabores.map((sabor) => (
              <li key={sabor.nombre} className="rounded-lg border border-white/10 bg-white/[0.035] px-2.5 py-1.5 text-xs leading-relaxed text-crema/85">
                {sabor.nombre}
              </li>
            ))}
          </ul>
          {conIngredientes.length > 0 && (
            <details className="mt-3 border-t border-white/10">
              <summary className="min-h-11 cursor-pointer py-3 text-sm text-crema/85 transition-colors hover:text-amarillo">
                Ver ingredientes
              </summary>
              <ul className="space-y-2 pb-2">
                {conIngredientes.map((sabor) => (
                  <li key={sabor.nombre} className="text-sm leading-relaxed text-crema/80">
                    <strong className="font-semibold text-crema">{sabor.nombre}:</strong>{' '}
                    {sabor.ingredientes}
                  </li>
                ))}
              </ul>
            </details>
          )}
        </div>
      )}
    </article>
  )
}