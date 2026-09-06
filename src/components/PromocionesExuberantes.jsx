import { promocionesExuberantes } from '../data/menu'
import { ETIQUETA_PENDIENTE, precioPendiente } from '../utils/catalogo'
import { precioMXN } from '../utils/precio'
import { Chispa, CLASES_COLOR, Divisor, PALETA } from './Ornamentos'
import { Revelar } from './ui'

/**
 * Ilustraciones dibujadas aquí en SVG: nada descargado de fuera, escalan sin
 * perder nitidez y usan la paleta de la casa.
 */
function IconoPromo({ tipo, color = 'rosa', className = '' }) {
  const c = PALETA[color] ?? PALETA.rosa
  const t = {
    stroke: c,
    strokeWidth: 2.4,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    fill: 'none',
  }

  const formas = {
    // Dos personas brindando
    pareja: (
      <>
        <circle cx="15" cy="13" r="6" {...t} />
        <circle cx="33" cy="13" r="6" {...t} />
        <path d="M5 42c0-7 4.5-12 10-12s10 5 10 12" {...t} />
        <path d="M23 42c0-7 4.5-12 10-12s10 5 10 12" {...t} />
        <path d="M20 26l4-5 4 5" {...t} stroke={PALETA.amarillo} />
      </>
    ),
    // Familia: tres siluetas, la de en medio más pequeña
    familia: (
      <>
        <circle cx="11" cy="14" r="5.5" {...t} />
        <circle cx="24" cy="20" r="4.5" {...t} stroke={PALETA.turquesa} />
        <circle cx="37" cy="14" r="5.5" {...t} />
        <path d="M2 42c0-7 4-11 9-11s9 4 9 11" {...t} />
        <path d="M17 42c0-5.5 3-9 7-9s7 3.5 7 9" {...t} stroke={PALETA.turquesa} />
        <path d="M28 42c0-7 4-11 9-11s9 4 9 11" {...t} />
      </>
    ),
    // Cazuela de carnitas con vapor
    carnitas: (
      <>
        <path d="M7 21h30v11a9 9 0 01-9 9H16a9 9 0 01-9-9z" {...t} />
        <path d="M4 21h36" {...t} strokeWidth="3.2" />
        <path d="M37 25h4a4 4 0 010 8h-4" {...t} />
        <path d="M15 14c0-4 3-4 3-8M26 14c0-4 3-4 3-8" {...t} stroke={PALETA.amarillo} />
      </>
    ),
    // Camarón sobre molcajete
    aguachile: (
      <>
        <path d="M7 25h30l-3 12a7 7 0 01-7 6H17a7 7 0 01-7-6z" {...t} />
        <path d="M5 25h34" {...t} strokeWidth="3" />
        <path
          d="M14 18c1-6 7-9 12-6 4 2 4 7 0 8-3 1-5-2-3-4"
          {...t}
          stroke={PALETA.naranja}
        />
        <circle cx="30" cy="13" r="1.9" fill={PALETA.amarillo} />
      </>
    ),
  }

  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      {formas[tipo] ?? formas.pareja}
    </svg>
  )
}

/** Una promoción: nombre, qué incluye y precio (o "Precio por confirmar"). */
function TarjetaPromoExuberante({ promo }) {
  const pendiente = precioPendiente(promo)

  return (
    <article
      className={`tarjeta group flex h-full flex-col p-5 transition-all duration-500 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.06] ${CLASES_COLOR[promo.color].borde}`}
    >
      <span
        aria-hidden="true"
        className={`absolute inset-x-0 top-0 h-[2px] ${CLASES_COLOR[promo.color].fondo} opacity-60 transition-opacity duration-500 group-hover:opacity-100`}
      />

      <IconoPromo
        tipo={promo.icono}
        color={promo.color}
        className="h-11 w-11 shrink-0 transition-transform duration-500 group-hover:scale-110"
      />

      <h3
        className={`mt-3 font-alt text-[22px] uppercase leading-tight tracking-[0.04em] ${CLASES_COLOR[promo.color].texto}`}
      >
        {promo.nombre}
      </h3>

      <ul className="mt-3 flex-1 space-y-1.5">
        {promo.incluye.map((item) => (
          <li key={item} className="flex items-start gap-2">
            <span
              aria-hidden="true"
              className={`mt-[7px] block h-1.5 w-1.5 shrink-0 rounded-full ${CLASES_COLOR[promo.color].fondo}`}
            />
            <span className="min-w-0 text-[13px] leading-snug text-crema/80">{item}</span>
          </li>
        ))}
      </ul>

      <p className="mt-4 border-t border-white/10 pt-3">
        {pendiente ? (
          <span className="text-[12px] italic text-crema/55">{ETIQUETA_PENDIENTE}</span>
        ) : (
          <span className="font-display text-2xl tabular-nums text-amarillo">
            {precioMXN(promo.precio)}
          </span>
        )}
      </p>
    </article>
  )
}

/**
 * Promociones Exuberantes.
 *
 * NO es una séptima categoría: va debajo de la cuadrícula de seis, y solo
 * cuando no hay ninguna categoría abierta, para que el menú no se ensucie.
 * Es informativa: no hay botones de compra ni de pedido.
 *
 * En vez de carrusel se usa una rejilla que se reacomoda (1 → 2 → 4 columnas).
 * Así no hay desplazamiento horizontal en ningún ancho ni hace falta indicador.
 */
export default function PromocionesExuberantes() {
  return (
    <section aria-labelledby="promos-exuberantes" className="mt-14 sm:mt-20">
      <div className="text-center">
        <p className="font-alt text-[12px] uppercase tracking-[0.4em] text-amarillo sm:text-sm">
          Para compartir
        </p>
        <h2
          id="promos-exuberantes"
          className="titulo-display texto-neon-rosa mt-1 text-[clamp(1.7rem,6.5vw,3rem)]"
        >
          Promociones Exuberantes
        </h2>
        <Divisor className="mx-auto mt-4 max-w-sm" />
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {promocionesExuberantes.map((promo, i) => (
          <Revelar key={promo.id} retraso={i * 90}>
            <TarjetaPromoExuberante promo={promo} />
          </Revelar>
        ))}
      </div>

      <p className="mt-6 flex items-center justify-center gap-2 text-center text-[12px] text-crema/50">
        <Chispa className="h-3.5 w-3.5" color="amarillo" />
        Consulta disponibilidad y precios con tu mesero
      </p>
    </section>
  )
}
