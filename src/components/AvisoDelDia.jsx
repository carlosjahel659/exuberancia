import { avisoDelDia } from '../data/horarios'
import { Chispa } from './Ornamentos'

const RELOJ = (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3.5 2" strokeLinecap="round" />
  </svg>
)

/**
 * Bloque dinámico encima del menú: día, hora y qué se está sirviendo ahora.
 * Todo el texto sale de `avisoDelDia()`, así que no repite reglas de horario.
 *
 * `compacto` reduce el bloque en el teléfono, para que las seis tarjetas del
 * menú quepan en la primera pantalla; en escritorio se ve completo.
 */
export default function AvisoDelDia({ ahora, compacto = false }) {
  const aviso = avisoDelDia(ahora)

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-turquesa/25 bg-turquesa/[0.06] sm:p-6 ${
        compacto ? 'p-3.5' : 'p-5'
      }`}
    >
      <span aria-hidden="true" className="linea-degradada absolute inset-x-0 top-0 h-[2px]" />
      <Chispa className="absolute right-4 top-4 hidden h-4 w-4 animate-pulseGlow sm:block" color="amarillo" />

      <div
        className={`flex flex-col sm:flex-row sm:items-start sm:gap-6 ${
          compacto ? 'gap-1.5' : 'gap-4'
        }`}
        aria-live="polite"
      >
        <p className="flex shrink-0 items-center gap-2.5 text-turquesa">
          {RELOJ}
          <span
            className={`font-alt uppercase leading-none tracking-[0.1em] sm:text-2xl ${
              compacto ? 'text-[17px]' : 'text-xl'
            }`}
          >
            {aviso.saludo}
            <span className="ml-2 text-crema/55">{aviso.reloj}</span>
          </span>
        </p>

        <p
          className={`leading-relaxed text-crema/85 sm:text-[15px] sm:line-clamp-none ${
            compacto ? 'line-clamp-2 text-[12.5px]' : 'text-sm'
          }`}
        >
          {aviso.texto}
        </p>
      </div>

      {aviso.activas.length > 0 && (
        <div
          className={`mt-4 flex-wrap items-center gap-2 border-t border-white/10 pt-4 sm:flex ${
            compacto ? 'hidden' : 'flex'
          }`}
        >
          <span className="font-alt text-[12px] uppercase tracking-[0.2em] text-crema/45">
            Sirviendo ahora
          </span>
          {aviso.activas.map((nombre) => (
            <span
              key={nombre}
              className="rounded-full border border-turquesa/35 bg-turquesa/10 px-3 py-1 text-[12px] font-semibold text-turquesa"
            >
              {nombre}
            </span>
          ))}
          {aviso.masTarde.map((c) => (
            <span
              key={c.nombre}
              className="rounded-full border border-amarillo/30 bg-amarillo/10 px-3 py-1 text-[12px] text-amarillo/90"
            >
              {c.nombre} · {c.desde}
            </span>
          ))}
        </div>
      )}

      {aviso.simulado && (
        <p className="mt-4 rounded-xl border border-amarillo/40 bg-amarillo/10 px-4 py-3 text-[12.5px] leading-relaxed text-amarillo">
          <strong className="font-semibold uppercase tracking-[0.1em]">Modo de prueba:</strong>{' '}
          se está simulando el {ahora.nombreDia} a las {aviso.reloj}. Quita los parámetros
          <code className="mx-1 rounded bg-black/30 px-1.5 py-0.5">?dia=</code> y
          <code className="mx-1 rounded bg-black/30 px-1.5 py-0.5">?hora=</code> de la dirección
          para volver a la hora real.
        </p>
      )}
    </div>
  )
}
