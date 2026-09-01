import { IconoCandado } from './EstadoDisponibilidad'
import { Etiqueta } from './ui'

/** Chips de "Elige tu salsa", "Incluye", "Rinde para"… tal como los trae el PDF. */
function Detalle({ detalle }) {
  const incluye = detalle.tipo === 'incluye'
  return (
    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1.5">
      <span
        className={`font-body text-[12px] font-bold uppercase tracking-[0.06em] ${
          incluye ? 'text-amarillo' : 'text-turquesa'
        }`}
      >
        {detalle.etiqueta}:
      </span>
      <ul className="flex flex-wrap gap-1.5">
        {detalle.opciones.map((op) => (
          <li
            key={op}
            className={`rounded-full border px-2.5 py-1 text-[12px] leading-none ${
              incluye
                ? 'border-amarillo/30 bg-amarillo/10 text-amarillo/90'
                : 'border-turquesa/30 bg-turquesa/10 text-turquesa/90'
            }`}
          >
            {op}
          </li>
        ))}
      </ul>
    </div>
  )
}

/**
 * Tarjeta de producto del menú. El PDF no incluye precios, así que aquí no se
 * pinta ninguno.
 *
 * `disponible = false` deja el platillo visible (para que se conozca la carta
 * completa) pero marcado como no pedible en este momento.
 */
export default function TarjetaProducto({ producto, indice = 0, disponible = true }) {
  const { nombre, descripcion, detalles, nota, imagen, etiqueta } = producto

  return (
    <article
      aria-disabled={disponible ? undefined : 'true'}
      className={`tarjeta group flex h-full flex-col overflow-hidden p-5 transition-all duration-500 sm:p-6 ${
        disponible
          ? 'hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.06]'
          : 'border-white/[0.07] bg-white/[0.015]'
      }`}
      style={{ animationDelay: `${Math.min(indice, 8) * 60}ms` }}
    >
      {/* Filo de color superior */}
      {disponible && (
        <span
          aria-hidden="true"
          className="linea-degradada absolute inset-x-0 top-0 h-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
      )}

      <div className={`flex items-start gap-4 ${disponible ? '' : 'opacity-60'}`}>
        {imagen && (
          <div className="relative shrink-0">
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(0,168,165,.32),transparent_68%)] blur-md"
            />
            <img
              src={imagen}
              alt={nombre}
              loading="lazy"
              decoding="async"
              width="200"
              height="200"
              className={`sombra-plato relative h-20 w-20 object-contain transition-transform duration-500 sm:h-24 sm:w-24 ${
                disponible ? 'group-hover:scale-110' : 'grayscale-[.55]'
              }`}
            />
          </div>
        )}

        <div className="min-w-0 flex-1">
          <h4 className="font-alt text-[22px] uppercase leading-[1.05] tracking-[0.04em] text-crema sm:text-2xl">
            {nombre}
          </h4>

          {etiqueta && (
            <div className="mt-2">
              <Etiqueta>{etiqueta}</Etiqueta>
            </div>
          )}

          {descripcion && (
            <p className="mt-2.5 text-[13.5px] leading-relaxed text-crema/70 sm:text-sm">
              {descripcion}
            </p>
          )}
        </div>
      </div>

      {(detalles?.length || nota) && (
        <div className={`mt-4 space-y-3 border-t border-white/10 pt-4 ${disponible ? '' : 'opacity-60'}`}>
          {detalles?.map((detalle) => (
            <Detalle key={detalle.etiqueta} detalle={detalle} />
          ))}
          {nota && <p className="text-[12px] text-crema/50">{nota}</p>}
        </div>
      )}

      {!disponible && (
        <p className="mt-4 flex items-center gap-2 border-t border-white/10 pt-3 text-[12px] uppercase tracking-[0.1em] text-crema/45">
          <IconoCandado className="h-3.5 w-3.5 shrink-0" />
          No se puede pedir en este momento
        </p>
      )}
    </article>
  )
}
