import { cumpleanos } from '../data/site'
import { Chispa, EsquinaFloral, Filigrana, PALETA } from './Ornamentos'
import { Revelar, Seccion } from './ui'

/**
 * Ilustración de cumpleaños dibujada aquí mismo en SVG.
 * No se descarga ninguna imagen externa: usa la paleta de la casa y escala sin
 * perder nitidez en cualquier pantalla.
 */
function IlustracionPastel({ className = '' }) {
  const trazo = {
    stroke: PALETA.crema,
    strokeWidth: 2.6,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    fill: 'none',
  }
  return (
    <svg viewBox="0 0 200 190" className={className} aria-hidden="true">
      {/* Persona */}
      <circle cx="52" cy="52" r="18" {...trazo} stroke={PALETA.amarillo} />
      <path d="M26 116c0-18 12-30 26-30s26 12 26 30" {...trazo} stroke={PALETA.amarillo} />
      <path d="M74 104c10-4 18-10 24-18" {...trazo} stroke={PALETA.crema} />

      {/* Pastel de tres pisos */}
      <path d="M96 168h84v-26H96z" {...trazo} stroke={PALETA.turquesa} />
      <path d="M104 142h68v-24h-68z" {...trazo} stroke={PALETA.rosa} />
      <path d="M112 118h52V96h-52z" {...trazo} stroke={PALETA.amarillo} />

      {/* Betún */}
      <path
        d="M96 142c8-7 14 0 21-5s13 5 21 0 13 5 21 0 13 5 21 5"
        {...trazo}
        stroke={PALETA.crema}
        strokeWidth="2.2"
        opacity="0.8"
      />
      <path
        d="M104 118c7-6 12 0 18-4s11 4 18 0 11 4 18 4"
        {...trazo}
        stroke={PALETA.crema}
        strokeWidth="2.2"
        opacity="0.8"
      />

      {/* Velas encendidas */}
      <g stroke={PALETA.crema} strokeWidth="2.4" strokeLinecap="round">
        <path d="M126 96V80M138 96V78M150 96V80" />
      </g>
      <g fill={PALETA.amarillo}>
        <ellipse cx="126" cy="74" rx="4" ry="6" />
        <ellipse cx="138" cy="72" rx="4" ry="6" />
        <ellipse cx="150" cy="74" rx="4" ry="6" />
      </g>

      {/* Confeti */}
      <g fill={PALETA.rosa} opacity="0.9">
        <circle cx="184" cy="60" r="3.4" />
        <circle cx="88" cy="44" r="2.8" />
        <circle cx="170" cy="30" r="2.6" />
      </g>
      <g fill={PALETA.turquesa} opacity="0.9">
        <circle cx="112" cy="34" r="3" />
        <circle cx="192" cy="100" r="2.8" />
        <circle cx="20" cy="28" r="2.6" />
      </g>
    </svg>
  )
}

const CHECK = (
  <svg
    viewBox="0 0 24 24"
    className="mt-0.5 h-4 w-4 shrink-0 text-turquesa"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    aria-hidden="true"
  >
    <path d="M4 12.5l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

/**
 * Apartado de cumpleañeros.
 * Los requisitos y el texto de cierre viven en `cumpleanos` (src/data/site.js).
 * A propósito NO se promete ningún regalo: el beneficio aún no está definido.
 */
export default function Cumpleanos() {
  return (
    <Seccion id="cumpleanos" className="scroll-mt-24 !py-12 sm:!py-16">
      <div className="contenedor">
        <Revelar>
          <div className="relative overflow-hidden rounded-[26px] border border-rosa/30 bg-rosa/[0.06] p-6 sm:p-9">
            <span aria-hidden="true" className="linea-degradada absolute inset-x-0 top-0 h-[2px]" />
            <EsquinaFloral
              className="pointer-events-none absolute -left-5 -top-5 h-28 w-28 opacity-35 animate-sway"
              color="rosa"
            />
            <EsquinaFloral
              className="pointer-events-none absolute -bottom-5 -right-5 h-28 w-28 -scale-100 opacity-30"
              color="amarillo"
            />
            <Chispa className="absolute right-6 top-6 h-5 w-5 animate-pulseGlow" color="amarillo" />

            <div className="relative grid items-center gap-8 lg:grid-cols-[1fr_1.15fr] lg:gap-12">
              {/* Ilustración */}
              <div className="order-1 mx-auto w-full max-w-[300px] lg:order-none">
                <IlustracionPastel className="w-full drop-shadow-[0_16px_30px_rgba(0,0,0,.6)]" />
              </div>

              {/* Texto */}
              <div className="text-center lg:text-left">
                <p className="font-alt text-[13px] uppercase tracking-[0.34em] text-amarillo sm:text-sm">
                  Cumpleañeros
                </p>
                <h2 className="titulo-display texto-neon-rosa mt-2 text-[clamp(1.8rem,6vw,3rem)]">
                  {cumpleanos.titulo}
                </h2>
                <Filigrana
                  className="mx-auto mt-4 h-9 w-36 opacity-80 lg:mx-0"
                  color="rosa"
                  acento="amarillo"
                />

                <ul className="mx-auto mt-6 max-w-lg space-y-2.5 text-left lg:mx-0">
                  {cumpleanos.requisitos.map((requisito) => (
                    <li key={requisito} className="flex items-start gap-2.5">
                      {CHECK}
                      <span className="text-[13.5px] leading-relaxed text-crema/85 sm:text-sm">
                        {requisito}
                      </span>
                    </li>
                  ))}
                </ul>

                <p className="mx-auto mt-6 max-w-lg rounded-2xl border border-amarillo/30 bg-amarillo/[0.07] px-5 py-3.5 text-[13px] leading-relaxed text-crema/90 sm:text-sm lg:mx-0">
                  {cumpleanos.beneficio}
                </p>
              </div>
            </div>
          </div>
        </Revelar>
      </div>
    </Seccion>
  )
}
