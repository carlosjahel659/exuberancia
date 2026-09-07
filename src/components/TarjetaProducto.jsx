import { IconoCandado } from './EstadoDisponibilidad'
import { Etiqueta } from './ui'
import { precioMXN } from '../utils/precio'
import { ETIQUETA_PENDIENTE, precioValido, variantesVisibles } from '../utils/catalogo'

function Variantes({ variantes }) {
  return (
    <ul className="mt-4 divide-y divide-white/10 border-y border-white/10">
      {variantes.map((variante) => (
        <li key={variante.medida} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-2.5">
          <span className="min-w-0 flex-1 basis-28 text-sm leading-relaxed text-crema/85">
            {variante.medida}
          </span>
          <span className={precioValido(variante.precio) ? 'precio shrink-0 text-lg' : 'text-sm text-crema/75'}>
            {precioValido(variante.precio) ? precioMXN(variante.precio) : ETIQUETA_PENDIENTE}
          </span>
        </li>
      ))}
    </ul>
  )
}

function Detalle({ detalle }) {
  return (
    <div>
      <p className={`text-xs font-semibold ${detalle.tipo === 'incluye' ? 'text-amarillo' : 'text-turquesa'}`}>
        {detalle.etiqueta}
      </p>
      <ul className="mt-2 flex flex-wrap gap-1.5">
        {detalle.opciones.map((opcion) => (
          <li key={opcion} className="rounded-lg border border-white/10 bg-white/[0.035] px-2.5 py-1.5 text-xs leading-relaxed text-crema/85">
            {opcion}
          </li>
        ))}
      </ul>
    </div>
  )
}

/** La imagen tiene su propio espacio: nunca comprime el nombre ni el precio. */
export default function TarjetaProducto({ producto, disponible = true }) {
  const { nombre, descripcion, detalles, nota, imagen, foto, fotoAlt, etiqueta, precio } = producto
  const variantes = variantesVisibles(producto)
  const mostrarPrecio = precioValido(precio) || variantes.length === 0

  return (
    <article className="tarjeta product-card flex h-full min-w-0 flex-col overflow-hidden">
      {(foto || imagen) && (
        <div className="product-media relative aspect-[4/3] overflow-hidden border-b border-white/10 bg-carbon3">
          <img
            src={foto?.src ?? imagen}
            srcSet={foto ? `${foto.chica} 160w, ${foto.src} 320w` : undefined}
            sizes={foto ? '(min-width: 1280px) 360px, (min-width: 768px) 40vw, 85vw' : undefined}
            alt={fotoAlt ?? nombre}
            loading="lazy"
            decoding="async"
            width="320"
            height="320"
            className={`h-full w-full ${foto ? 'object-cover' : 'object-contain p-6'}`}
          />
        </div>
      )}

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
          <h5 className="min-w-0 flex-1 basis-40 font-alt text-2xl leading-tight tracking-wide text-crema">
            {nombre}
          </h5>
          {mostrarPrecio && (
            <span className={precioValido(precio) ? 'precio shrink-0 text-2xl' : 'text-sm text-crema/75'}>
              {precioValido(precio) ? precioMXN(precio) : ETIQUETA_PENDIENTE}
            </span>
          )}
        </div>

        {etiqueta && <div className="mt-3"><Etiqueta>{etiqueta}</Etiqueta></div>}
        {descripcion && <p className="mt-3 text-sm leading-relaxed text-crema/80">{descripcion}</p>}
        {variantes.length > 0 && <Variantes variantes={variantes} />}

        {(detalles?.length > 0 || nota) && (
          <div className="mt-4 space-y-4 border-t border-white/10 pt-4">
            {detalles?.map((detalle) => <Detalle key={detalle.etiqueta} detalle={detalle} />)}
            {nota && <p className="text-xs leading-relaxed text-crema/75">{nota}</p>}
          </div>
        )}

        {!disponible && (
          <p className="mt-4 flex items-start gap-2 border-t border-white/10 pt-4 text-xs leading-relaxed text-crema/75">
            <IconoCandado className="mt-0.5 h-4 w-4 shrink-0" />
            No se puede pedir en este momento
          </p>
        )}
      </div>
    </article>
  )
}