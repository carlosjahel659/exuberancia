import { Etiqueta } from './ui'

/**
 * Tarjeta de producto del menú. Solo los productos con fotografía o con
 * etiqueta reciben decoración extra, para no saturar la cuadrícula.
 *
 * `disponible = false` deja el platillo visible (para que el cliente conozca
 * la carta completa) pero marcado como no pedible en este momento.
 */
export default function TarjetaProducto({ producto, indice = 0, disponible = true }) {
  const { nombre, precio, descripcion, opciones, nota, imagen, etiqueta, pendiente } = producto

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
          <div className="flex items-start justify-between gap-3">
            <h4 className="font-alt text-[22px] uppercase leading-[1.05] tracking-[0.04em] text-crema sm:text-2xl">
              {nombre}
            </h4>
            <span
              className={`shrink-0 font-display text-xl sm:text-2xl ${
                disponible
                  ? 'text-amarillo drop-shadow-[0_0_14px_rgba(240,179,35,.35)]'
                  : 'text-crema/40'
              }`}
            >
              {precio}
            </span>
          </div>

          {etiqueta && (
            <div className="mt-2">
              <Etiqueta>{etiqueta}</Etiqueta>
            </div>
          )}

          <p
            className={`mt-2.5 text-[13.5px] leading-relaxed sm:text-sm ${
              pendiente ? 'italic text-crema/45' : 'text-crema/70'
            }`}
          >
            {descripcion}
          </p>
        </div>
      </div>

      {(opciones?.length || nota) && (
        <div className={`mt-4 border-t border-white/10 pt-4 ${disponible ? '' : 'opacity-60'}`}>
          {opciones?.length > 0 && (
            <ul className="flex flex-wrap gap-2">
              {opciones.map((op) => (
                <li
                  key={op}
                  className="rounded-full border border-turquesa/30 bg-turquesa/10 px-3 py-1 text-[12px] text-turquesa/90"
                >
                  {op}
                </li>
              ))}
            </ul>
          )}
          {nota && <p className="mt-3 text-[12px] text-crema/50">{nota}</p>}
        </div>
      )}

      {!disponible && (
        <p className="mt-4 flex items-center gap-2 border-t border-white/10 pt-3 text-[12px] uppercase tracking-[0.1em] text-crema/45">
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <rect x="5" y="11" width="14" height="9" rx="2" />
            <path d="M8 11V8a4 4 0 018 0v3" strokeLinecap="round" />
          </svg>
          No se puede pedir en este momento
        </p>
      )}
    </article>
  )
}
