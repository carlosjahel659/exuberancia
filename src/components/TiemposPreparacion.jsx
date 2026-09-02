import { site } from '../data/site'
import { PALETA } from './Ornamentos'
import { Revelar, Seccion, TituloSeccion } from './ui'

const RELOJ = (
  <svg
    viewBox="0 0 24 24"
    className="h-5 w-5"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3.5 2" strokeLinecap="round" />
  </svg>
)

/** Iconos discretos: una cazuela para alimentos, un tarro para bebidas. */
function IconoTiempo({ tipo, className = '' }) {
  const t = {
    stroke: PALETA.crema,
    strokeWidth: 2.1,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    fill: 'none',
  }

  const formas = {
    cocina: (
      <>
        <path d="M7 20h30v12a8 8 0 01-8 8H15a8 8 0 01-8-8z" {...t} stroke={PALETA.amarillo} />
        <path d="M5 20h34" {...t} strokeWidth="3" stroke={PALETA.amarillo} />
        <path d="M37 24h4a4 4 0 010 8h-4" {...t} stroke={PALETA.amarillo} />
        <path d="M16 14c0-4 3-4 3-8M27 14c0-4 3-4 3-8" {...t} stroke={PALETA.rosa} />
      </>
    ),
    bebida: (
      <>
        <path d="M12 14h19v22a5 5 0 01-5 5h-9a5 5 0 01-5-5z" {...t} stroke={PALETA.turquesa} />
        <path d="M31 20h5a5 5 0 010 10h-5" {...t} stroke={PALETA.turquesa} />
        <path d="M12 22h19" {...t} stroke={PALETA.amarillo} />
        <path d="M11 14c3-4 8-5 11-2 3-3 7-2 9 2" {...t} stroke={PALETA.crema} />
      </>
    ),
  }

  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      {formas[tipo] ?? formas.cocina}
    </svg>
  )
}

function Fila({ etiqueta, minutos, color }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
      <span className="flex items-center gap-2 text-[13px] text-crema/75">
        <span className={color}>{RELOJ}</span>
        {etiqueta}
      </span>
      <span className="shrink-0 font-display text-lg tabular-nums text-crema sm:text-xl">
        ~{minutos} min
      </span>
    </div>
  )
}

/**
 * Tiempos estimados de preparación.
 * Los valores viven en `site.tiempos` (src/data/site.js), no aquí.
 */
export default function TiemposPreparacion() {
  return (
    <Seccion id="tiempos" className="scroll-mt-24 !py-12 sm:!py-16">
      <div className="contenedor">
        <TituloSeccion
          kicker="Servicio"
          titulo="Tiempos de preparación"
          descripcion={site.avisoTiempos}
          color="amarillo"
          conEsquinas={false}
        />

        <div className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-2">
          {site.tiempos.map((t, i) => (
            <Revelar key={t.que} retraso={i * 90}>
              <div className="tarjeta h-full p-5 sm:p-6">
                <div className="flex items-center gap-3">
                  <IconoTiempo tipo={t.icono} className="h-9 w-9 shrink-0" />
                  <h3 className="font-alt text-xl uppercase tracking-[0.06em] text-crema sm:text-2xl">
                    {t.que}
                  </h3>
                </div>

                <div className="mt-4 space-y-2.5">
                  <Fila etiqueta="Flujo bajo" minutos={t.bajo} color="text-turquesa" />
                  <Fila etiqueta="Flujo alto" minutos={t.alto} color="text-amarillo" />
                </div>
              </div>
            </Revelar>
          ))}
        </div>
      </div>
    </Seccion>
  )
}
