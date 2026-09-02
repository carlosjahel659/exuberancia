import { estadoPromo } from '../data/horarios'
import { musicaEnVivo } from '../data/site'
import { useAhora } from '../hooks/useAhora'
import { Chispa } from './Ornamentos'
import { Revelar } from './ui'

/** Notas musicales dibujadas en SVG, en la línea de los demás ornamentos. */
function IconoMusica({ className = '' }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" aria-hidden="true">
      <g
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 34V12l18-4v22" />
        <path d="M18 20l18-4" />
      </g>
      <circle cx="13" cy="34" r="5" fill="currentColor" opacity="0.9" />
      <circle cx="31" cy="30" r="5" fill="currentColor" opacity="0.9" />
    </svg>
  )
}

/**
 * Banner de música en vivo.
 * Los días y la hora salen de la misma regla que usa el resto del sitio
 * (REGLAS_PROMO en horarios.js), así que el aviso de "hoy" no se puede
 * desincronizar del texto.
 */
export default function MusicaEnVivo() {
  const ahora = useAhora()
  const estado = estadoPromo(musicaEnVivo.titulo, ahora)
  const hoy = Boolean(estado?.disponible)

  return (
    <div className="contenedor">
      <Revelar>
        <div
          className={`relative flex flex-col items-center gap-3 overflow-hidden rounded-2xl border px-5 py-4 text-center sm:flex-row sm:gap-5 sm:px-7 sm:text-left ${
            hoy
              ? 'border-rosa/45 bg-rosa/[0.09]'
              : 'border-amarillo/30 bg-amarillo/[0.055]'
          }`}
        >
          <span aria-hidden="true" className="linea-degradada absolute inset-x-0 top-0 h-[2px]" />
          <Chispa
            className="absolute right-4 top-4 hidden h-4 w-4 animate-pulseGlow sm:block"
            color="amarillo"
          />

          <IconoMusica
            className={`h-9 w-9 shrink-0 sm:h-11 sm:w-11 ${hoy ? 'text-rosa' : 'text-amarillo'}`}
          />

          <div className="min-w-0">
            <p
              className={`font-alt text-xl uppercase leading-none tracking-[0.08em] sm:text-2xl ${
                hoy ? 'text-rosa' : 'text-amarillo'
              }`}
            >
              {musicaEnVivo.titulo}
            </p>
            <p className="mt-1.5 text-[13px] leading-snug text-crema/85 sm:text-sm">
              {musicaEnVivo.texto}
            </p>
          </div>

          {hoy && (
            <span className="shrink-0 rounded-full border border-rosa/50 bg-rosa/15 px-3 py-1.5 font-body text-[11.5px] font-bold uppercase tracking-[0.08em] text-rosaClaro sm:ml-auto">
              Hoy hay música
            </span>
          )}
        </div>
      </Revelar>
    </div>
  )
}
