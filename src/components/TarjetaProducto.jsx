import { IconoCandado } from './EstadoDisponibilidad'
import { Etiqueta } from './ui'
import { precioMXN } from '../utils/precio'
import { variantesVisibles } from '../utils/catalogo'

/**
 * Variantes de un platillo (tamaño, proteína, presentación) como filas: nombre
 * a la izquierda, precio a la derecha. Es más legible que un selector cuando
 * cada opción vale distinto, y en el teléfono nunca desborda porque el nombre
 * puede partirse y el precio va en columna propia.
 */
function Variantes({ variantes }) {
  return (
    <ul className="mt-3 space-y-1.5">
      {variantes.map((v) => (
        <li key={v.medida} className="flex items-baseline gap-2">
          <span className="min-w-0 text-[13px] leading-snug text-crema/80">{v.medida}</span>
          <span
            aria-hidden="true"
            className="mb-[3px] flex-1 border-b border-dotted border-white/20"
          />
          <span className="shrink-0 font-display text-base tabular-nums text-amarillo sm:text-lg">
            {precioMXN(v.precio)}
          </span>
        </li>
      ))}
    </ul>
  )
}

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
  const { nombre, descripcion, detalles, nota, imagen, foto, fotoAlt, etiqueta, precio } = producto
  const variantes = variantesVisibles(producto)

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
        {/* Fotografía real: miniatura cuadrada de recorte uniforme. Es un acento
            al lado del texto, nunca el elemento principal de la tarjeta. */}
        {foto && (
          <div className="relative shrink-0 overflow-hidden rounded-xl ring-1 ring-white/15">
            <img
              src={foto.src}
              srcSet={`${foto.chica} 160w, ${foto.src} 320w`}
              sizes="(min-width: 640px) 96px, 72px"
              alt={fotoAlt ?? nombre}
              loading="lazy"
              decoding="async"
              width="320"
              height="320"
              className={`block h-[72px] w-[72px] object-cover transition-transform duration-500 sm:h-24 sm:w-24 ${
                disponible ? 'group-hover:scale-[1.08]' : 'grayscale-[.6]'
              }`}
            />
          </div>
        )}

        {!foto && imagen && (
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
          {/* Nombre y precio en la misma línea; el precio nunca se encima
              porque va en su propia columna y no se encoge. */}
          <div className="flex items-baseline justify-between gap-3">
            <h4 className="min-w-0 font-alt text-[22px] uppercase leading-[1.05] tracking-[0.04em] text-crema sm:text-2xl">
              {nombre}
            </h4>
            {precio !== undefined && precio !== null && (
              <span className="shrink-0 font-display text-xl tabular-nums text-amarillo drop-shadow-[0_0_14px_rgba(240,179,35,.3)] sm:text-2xl">
                {precioMXN(precio)}
              </span>
            )}
          </div>

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

          {variantes.length > 0 && <Variantes variantes={variantes} />}
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
