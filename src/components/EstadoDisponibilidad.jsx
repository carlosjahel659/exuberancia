// -----------------------------------------------------------------------------
// Piezas visuales compartidas para mostrar la disponibilidad.
// El cálculo vive en src/data/horarios.js; aquí solo se pinta.
// -----------------------------------------------------------------------------

/** Colores de cada estado. `gris` no está en la paleta de marca a propósito. */
export const ESTILO_ESTADO = {
  ahora: {
    punto: 'bg-turquesa shadow-[0_0_10px_2px_rgba(0,168,165,.75)]',
    texto: 'text-turquesa',
    borde: 'border-turquesa/45',
    fondo: 'bg-turquesa/[0.07]',
    pastilla: 'border-turquesa/40 bg-turquesa/10 text-turquesa',
  },
  masTarde: {
    punto: 'bg-amarillo shadow-[0_0_10px_2px_rgba(240,179,35,.7)]',
    texto: 'text-amarillo',
    borde: 'border-amarillo/45',
    fondo: 'bg-amarillo/[0.06]',
    pastilla: 'border-amarillo/40 bg-amarillo/10 text-amarillo',
  },
  noHoy: {
    punto: 'bg-crema/35',
    texto: 'text-crema/45',
    borde: 'border-white/10',
    fondo: 'bg-white/[0.02]',
    pastilla: 'border-white/15 bg-white/5 text-crema/50',
  },
  soloDomingos: {
    punto: 'bg-rosa shadow-[0_0_10px_2px_rgba(229,0,88,.7)]',
    texto: 'text-rosa',
    borde: 'border-rosa/45',
    fondo: 'bg-rosa/[0.07]',
    pastilla: 'border-rosa/40 bg-rosa/10 text-rosa',
  },
}

/** Punto de color + texto del estado ("Disponible ahora", "Solo domingos"...). */
export function PastillaEstado({ estado, className = '', tamano = 'normal' }) {
  const estilo = ESTILO_ESTADO[estado.id] ?? ESTILO_ESTADO.noHoy
  const chico = tamano === 'chico'

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border leading-none ${
        chico ? 'px-2 py-1 text-[11px]' : 'px-2.5 py-1.5 text-[12px]'
      } font-body font-semibold uppercase tracking-[0.08em] ${estilo.pastilla} ${className}`}
    >
      <span className={`h-2 w-2 shrink-0 rounded-full ${estilo.punto}`} aria-hidden="true" />
      {estado.texto}
    </span>
  )
}

/**
 * Bloque que explica por qué una categoría o un grupo no se puede pedir ahora,
 * con su horario y el próximo día disponible.
 */
export function AvisoBloqueo({ titulo, disponibilidad, className = '' }) {
  const estilo = ESTILO_ESTADO[disponibilidad.estado.id] ?? ESTILO_ESTADO.noHoy

  return (
    <div
      role="status"
      className={`rounded-2xl border p-5 sm:p-6 ${estilo.borde} ${estilo.fondo} ${className}`}
    >
      <div className="flex flex-wrap items-center gap-3">
        <PastillaEstado estado={disponibilidad.estado} />
        <h4 className="font-alt text-xl uppercase tracking-[0.06em] text-crema sm:text-2xl">
          {titulo}
        </h4>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-crema/75">{disponibilidad.mensaje}</p>

      <dl className="mt-4 flex flex-wrap gap-x-8 gap-y-2 text-[13px]">
        <div>
          <dt className="font-alt uppercase tracking-[0.18em] text-crema/45">Horario</dt>
          <dd className="mt-0.5 text-crema/85">{disponibilidad.resumen}</dd>
        </div>
        {disponibilidad.textoProximo && (
          <div>
            <dt className="font-alt uppercase tracking-[0.18em] text-crema/45">
              Próxima vez
            </dt>
            <dd className={`mt-0.5 ${estilo.texto}`}>{disponibilidad.textoProximo}</dd>
          </div>
        )}
      </dl>

      <p className="mt-4 text-[12px] text-crema/45">
        Puedes verlo en la carta, pero hoy no se puede pedir.
      </p>
    </div>
  )
}
