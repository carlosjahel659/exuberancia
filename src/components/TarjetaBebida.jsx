import { useState } from 'react'
import { precioMXN } from '../utils/precio'

/**
 * Tarjeta de bebida.
 *
 * Un solo componente cubre los tres casos, para no repetir un producto por cada
 * tamaño ni por cada sabor:
 *   · precio simple      -> { nombre, precio }
 *   · varios tamaños     -> { nombre, variantes: [{ medida, precio }] }
 *   · varios sabores     -> { nombre, sabores: [{ nombre, ingredientes? }] }
 *
 * Al tocar un tamaño cambia el precio en el encabezado. Los ingredientes que ya
 * estaban registrados se guardan en un desplegable para no saturar la vista.
 *
 * `aviso` la pinta con el tono de advertencia discreto que usan los cargos por
 * daños: ámbar apagado, no rojo de error.
 */
export default function TarjetaBebida({ producto, aviso = false }) {
  const { nombre, descripcion, precio, variantes, sabores, opciones } = producto
  const [elegida, setElegida] = useState(0)

  const conVariantes = Array.isArray(variantes) && variantes.length > 0
  const precioVisible = conVariantes ? variantes[elegida]?.precio : precio
  const conIngredientes = (sabores ?? []).filter((s) => s.ingredientes)

  return (
    <article
      className={`tarjeta flex h-full flex-col p-4 transition-all duration-300 sm:p-5 ${
        aviso
          ? 'border-naranja/30 bg-naranja/[0.045]'
          : 'hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.06]'
      }`}
    >
      {/* Nombre y precio: siempre en la misma línea, el precio alineado a la
          derecha y con cifras de ancho fijo para que las columnas cuadren. */}
      <div className="flex items-baseline justify-between gap-3">
        <h5 className="min-w-0 font-alt text-[17px] uppercase leading-tight tracking-[0.03em] text-crema sm:text-lg">
          {nombre}
        </h5>
        {precioVisible !== undefined && (
          <span
            className={`shrink-0 font-display text-lg tabular-nums sm:text-xl ${
              aviso ? 'text-naranja' : 'text-amarillo'
            }`}
          >
            {precioMXN(precioVisible)}
          </span>
        )}
      </div>

      {descripcion && (
        <p className="mt-1.5 text-[12.5px] leading-snug text-crema/60">{descripcion}</p>
      )}

      {/* Tamaños: cambian el precio de arriba */}
      {conVariantes && (
        <div className="mt-3 flex flex-wrap gap-1.5" role="group" aria-label={`Tamaños de ${nombre}`}>
          {variantes.map((v, i) => {
            const activa = i === elegida
            return (
              <button
                key={v.medida}
                type="button"
                onClick={() => setElegida(i)}
                aria-pressed={activa}
                className={`rounded-full border px-2.5 py-1 text-[12px] leading-none transition-colors duration-200 ${
                  activa
                    ? 'border-amarillo bg-amarillo/15 font-semibold text-amarillo'
                    : 'border-white/15 text-crema/65 hover:border-white/35 hover:text-crema'
                }`}
              >
                {v.medida}
                <span className="sr-only"> — {precioMXN(v.precio)}</span>
              </button>
            )
          })}
        </div>
      )}

      {/* Opción fija del producto (por ejemplo, qué tequila lleva el cantarito) */}
      {opciones && (
        <div className="mt-3 flex flex-wrap items-baseline gap-x-2 gap-y-1.5">
          <span className="font-body text-[11.5px] font-bold uppercase tracking-[0.06em] text-turquesa">
            {opciones.etiqueta}:
          </span>
          <span className="text-[12.5px] text-crema/70">{opciones.valores.join(' · ')}</span>
        </div>
      )}

      {/* Sabores: etiquetas dentro de la misma tarjeta, nunca productos aparte */}
      {sabores?.length > 0 && (
        <div className="mt-3">
          <span className="font-body text-[11.5px] font-bold uppercase tracking-[0.06em] text-turquesa">
            Sabores
          </span>
          <ul className="mt-1.5 flex flex-wrap gap-1.5">
            {sabores.map((s) => (
              <li
                key={s.nombre}
                className="rounded-full border border-turquesa/30 bg-turquesa/10 px-2.5 py-1 text-[12px] leading-none text-turquesa/90"
              >
                {s.nombre}
              </li>
            ))}
          </ul>

          {conIngredientes.length > 0 && (
            <details className="group mt-2.5">
              <summary className="cursor-pointer list-none text-[12px] text-crema/50 transition-colors hover:text-crema/80">
                <span className="underline decoration-dotted underline-offset-4">
                  Ver ingredientes
                </span>
              </summary>
              <ul className="mt-2 space-y-1 border-l border-white/10 pl-3">
                {conIngredientes.map((s) => (
                  <li key={s.nombre} className="text-[12px] leading-snug text-crema/60">
                    <strong className="font-semibold text-crema/80">{s.nombre}:</strong>{' '}
                    {s.ingredientes}
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
