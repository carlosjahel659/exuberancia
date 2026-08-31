// -----------------------------------------------------------------------------
// Ornamentos mexicanos dibujados como SVG (líneas tipo neón).
// Todos aceptan className para posicionarlos y animarlos desde fuera.
// -----------------------------------------------------------------------------

export const PALETA = {
  turquesa: '#00A8A5',
  rosa: '#E50058',
  amarillo: '#F0B323',
  naranja: '#E87B3A',
  crema: '#F5F0DF',
}

export const CLASES_COLOR = {
  turquesa: { texto: 'text-turquesa', borde: 'border-turquesa/40', fondo: 'bg-turquesa' },
  rosa: { texto: 'text-rosa', borde: 'border-rosa/40', fondo: 'bg-rosa' },
  amarillo: { texto: 'text-amarillo', borde: 'border-amarillo/40', fondo: 'bg-amarillo' },
  naranja: { texto: 'text-naranja', borde: 'border-naranja/40', fondo: 'bg-naranja' },
}

/** Voluta floral tipo rótulo mexicano pintado a mano. */
export function Filigrana({ className = '', color = 'turquesa', acento = 'rosa', espejo = false }) {
  return (
    <svg
      viewBox="0 0 160 70"
      fill="none"
      aria-hidden="true"
      className={className}
      style={espejo ? { transform: 'scaleX(-1)' } : undefined}
    >
      <g
        stroke={PALETA[color]}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.95"
      >
        <path d="M4 60c26 0 44-10 58-26 10-11 22-20 36-20 15 0 25 11 22 24-2 10-13 16-21 11-7-4-7-15 1-18" />
        <path d="M40 52c8 6 20 7 30 2" />
        <path d="M96 12c6-6 15-9 24-7" />
      </g>
      <g stroke={PALETA[acento]} strokeWidth="2.6" strokeLinecap="round" opacity="0.9">
        <path d="M20 66c14-2 25-9 33-19" />
        <path d="M62 30c-6-9-4-19 4-24" />
        <path d="M128 34c8 2 16-1 21-8" />
      </g>
      <g fill={PALETA.amarillo}>
        <circle cx="76" cy="6" r="3" />
        <circle cx="140" cy="20" r="2.6" />
        <circle cx="12" cy="52" r="2.6" />
      </g>
    </svg>
  )
}

/** Abanico de agave, el motivo del logotipo. */
export function Agave({ className = '', color = 'turquesa' }) {
  const puas = Array.from({ length: 9 }, (_, i) => -70 + i * 17.5)
  return (
    <svg viewBox="0 0 120 70" fill="none" aria-hidden="true" className={className}>
      {puas.map((rot, i) => (
        <path
          key={rot}
          d="M60 64 L56 22 L60 8 L64 22 Z"
          transform={`rotate(${rot} 60 64)`}
          fill={i % 2 === 0 ? PALETA[color] : PALETA.amarillo}
          opacity={i % 2 === 0 ? 0.85 : 0.55}
        />
      ))}
      <circle cx="60" cy="64" r="5" fill={PALETA.rosa} />
    </svg>
  )
}

/** Separador ancho: línea degradada + rombo central. */
export function Divisor({ className = '' }) {
  return (
    <div className={`flex items-center gap-4 ${className}`} aria-hidden="true">
      <span className="linea-degradada h-px flex-1 opacity-70" />
      <svg viewBox="0 0 64 28" className="h-6 w-16 shrink-0" fill="none">
        <path d="M32 2l8 12-8 12-8-12z" fill={PALETA.amarillo} opacity="0.9" />
        <path d="M32 8l3.5 6-3.5 6-3.5-6z" fill={PALETA.rosa} />
        <path
          d="M18 14c-4-5-9-7-16-7M46 14c4-5 9-7 16-7"
          stroke={PALETA.turquesa}
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </svg>
      <span className="linea-degradada h-px flex-1 opacity-70" />
    </div>
  )
}

/** Esquina decorativa para encabezados de sección. */
export function EsquinaFloral({ className = '', color = 'rosa' }) {
  return (
    <svg viewBox="0 0 120 120" fill="none" aria-hidden="true" className={className}>
      <g stroke={PALETA[color]} strokeWidth="2.6" strokeLinecap="round" opacity="0.85">
        <path d="M6 114c0-40 12-70 40-90" />
        <path d="M6 88c22-4 38-16 48-34" />
        <path d="M30 114c16-10 27-24 33-42" />
      </g>
      <g stroke={PALETA.turquesa} strokeWidth="2.2" strokeLinecap="round" opacity="0.75">
        <path d="M14 104c14 2 27-2 38-12" />
        <path d="M52 66c10 4 20 2 28-6" />
      </g>
      <circle cx="86" cy="26" r="3.2" fill={PALETA.amarillo} />
      <circle cx="60" cy="56" r="2.6" fill={PALETA.naranja} />
    </svg>
  )
}

/** Chispa/estrella para acentos puntuales. */
export function Chispa({ className = '', color = 'amarillo' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path
        d="M12 0c1 7 4 10 12 12-8 2-11 5-12 12-1-7-4-10-12-12 8-2 11-5 12-12z"
        fill={PALETA[color]}
      />
    </svg>
  )
}

// -----------------------------------------------------------------------------
// Ilustraciones de bebidas (neón). Se usan porque el cartel original no
// entrega fotografías recortadas utilizables; ver README.
// -----------------------------------------------------------------------------
export function IlustracionBebida({ tipo = 'tarro', color = 'amarillo', className = '' }) {
  const c = PALETA[color] ?? PALETA.amarillo
  const trazo = {
    stroke: c,
    strokeWidth: 3,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    fill: 'none',
  }

  const contenido = {
    tarro: (
      <>
        <path d="M28 34h48v56a10 10 0 01-10 10H38a10 10 0 01-10-10z" {...trazo} />
        <path d="M76 46h12a12 12 0 010 24H76" {...trazo} />
        <path d="M28 52h48" {...trazo} stroke={PALETA.crema} strokeWidth="2.4" opacity="0.7" />
        <path
          d="M26 34c4-8 12-10 18-6 4-6 14-6 18 0 6-4 14-1 16 6"
          {...trazo}
          stroke={PALETA.crema}
        />
        <g stroke={PALETA.rosa} strokeWidth="2.6" strokeLinecap="round" opacity="0.9">
          <path d="M36 66v18M50 62v22M64 68v16" />
        </g>
      </>
    ),
    botella: (
      <>
        <path d="M46 12h16v16l10 16v54a6 6 0 01-6 6H42a6 6 0 01-6-6V44l10-16z" {...trazo} />
        <path d="M44 10h20" {...trazo} stroke={PALETA.crema} strokeWidth="5" />
        <rect
          x="38"
          y="56"
          width="34"
          height="24"
          rx="3"
          {...trazo}
          stroke={PALETA.crema}
          strokeWidth="2.4"
          opacity="0.75"
        />
        <path d="M48 62h14M48 70h10" stroke={PALETA.rosa} strokeWidth="2.6" strokeLinecap="round" />
      </>
    ),
    michelada: (
      <>
        <path d="M26 36h50v54a10 10 0 01-10 10H36a10 10 0 01-10-10z" {...trazo} />
        <path d="M76 48h12a12 12 0 010 24H76" {...trazo} />
        <path
          d="M24 36c5-7 12-9 18-5 4-6 14-6 18 0 6-4 13-2 16 5"
          {...trazo}
          stroke={PALETA.crema}
        />
        <path d="M34 58h34M32 72h38M36 86h28" stroke={PALETA.rosa} strokeWidth="2.8" strokeLinecap="round" opacity="0.9" />
        <path d="M64 16l6 18" {...trazo} stroke={PALETA.turquesa} />
        <path d="M62 10a8 8 0 0112 6" {...trazo} stroke={PALETA.amarillo} />
      </>
    ),
    marina: (
      <>
        <path d="M26 40h50v50a10 10 0 01-10 10H36a10 10 0 01-10-10z" {...trazo} />
        <path d="M76 52h12a12 12 0 010 24H76" {...trazo} />
        <g stroke={PALETA.naranja} strokeWidth="3" strokeLinecap="round" fill="none">
          <path d="M30 40c0-8 6-14 12-10s4 12-2 12" />
          <path d="M48 40c0-8 6-14 12-10s4 12-2 12" />
          <path d="M64 40c0-8 6-13 11-9s3 11-3 11" />
        </g>
        <path d="M32 62h38M30 78h42" stroke={PALETA.rosa} strokeWidth="2.8" strokeLinecap="round" opacity="0.85" />
        <circle cx="52" cy="90" r="4" fill={PALETA.turquesa} opacity="0.8" />
      </>
    ),
  }

  return (
    <svg viewBox="0 0 110 110" className={className} aria-hidden="true">
      <g
        style={{
          filter: `drop-shadow(0 0 10px ${c}66) drop-shadow(0 0 3px ${c}88)`,
        }}
      >
        {contenido[tipo] ?? contenido.tarro}
      </g>
    </svg>
  )
}

/** Iconos simples para las promociones. */
export function IconoPromo({ tipo, className = '', color = 'rosa' }) {
  const c = PALETA[color] ?? PALETA.rosa
  const t = { stroke: c, strokeWidth: 2.4, strokeLinecap: 'round', strokeLinejoin: 'round', fill: 'none' }
  const formas = {
    pastel: (
      <>
        <path d="M6 26h28v10a4 4 0 01-4 4H10a4 4 0 01-4-4z" {...t} />
        <path d="M6 26c0-5 3-8 8-8h12c5 0 8 3 8 8" {...t} />
        <path d="M20 18V8" {...t} stroke={PALETA.amarillo} />
        <circle cx="20" cy="5" r="3" fill={PALETA.amarillo} />
      </>
    ),
    cafe: (
      <>
        <path d="M8 16h20v16a8 8 0 01-8 8h-4a8 8 0 01-8-8z" {...t} />
        <path d="M28 20h4a5 5 0 010 10h-4" {...t} />
        <path d="M14 10c0-3 3-3 3-6M22 10c0-3 3-3 3-6" {...t} stroke={PALETA.amarillo} />
      </>
    ),
    cantarito: (
      <>
        <path d="M12 14h18l-3 24a5 5 0 01-5 4h-2a5 5 0 01-5-4z" {...t} />
        <path d="M30 20h4a4 4 0 010 8h-5" {...t} />
        <path d="M18 14c0-4 3-6 6-6" {...t} stroke={PALETA.amarillo} />
        <circle cx="26" cy="8" r="3" fill={PALETA.turquesa} />
      </>
    ),
    olla: (
      <>
        <path d="M6 18h28v14a8 8 0 01-8 8H14a8 8 0 01-8-8z" {...t} />
        <path d="M4 18h32" {...t} strokeWidth="3" />
        <path d="M14 12c0-3 2-4 2-6M20 12c0-3 2-4 2-6M26 12c0-3 2-4 2-6" {...t} stroke={PALETA.amarillo} />
      </>
    ),
    musica: (
      <>
        <path d="M16 34V10l16-4v24" {...t} />
        <circle cx="12" cy="34" r="4.5" {...t} />
        <circle cx="28" cy="30" r="4.5" {...t} />
        <path d="M36 12c3 2 3 6 0 8" {...t} stroke={PALETA.turquesa} />
      </>
    ),
  }
  return (
    <svg viewBox="0 0 44 44" className={className} aria-hidden="true">
      {formas[tipo] ?? formas.musica}
    </svg>
  )
}

/** Iconos de las seis categorías del menú. */
export function IconoCategoria({ tipo, className = '', color = 'turquesa' }) {
  const c = PALETA[color] ?? PALETA.turquesa
  const t = {
    stroke: c,
    strokeWidth: 2.2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    fill: 'none',
  }

  const formas = {
    // Huevo estrellado en sartén
    desayunos: (
      <>
        <path d="M4 24a12 12 0 1124 0 12 12 0 01-24 0z" {...t} />
        <path d="M28 24h12" {...t} />
        <circle cx="16" cy="24" r="5.5" {...t} stroke={PALETA.amarillo} />
      </>
    ),
    // Quesadilla / triángulo con vapor
    entradas: (
      <>
        <path d="M6 34l10-18 10 18z" {...t} />
        <path d="M20 34l10-14 8 14z" {...t} stroke={PALETA.amarillo} />
        <path d="M16 10c0-3 3-3 3-6" {...t} stroke={PALETA.rosa} />
      </>
    ),
    // Plato servido
    mexicana: (
      <>
        <path d="M6 26h32a16 16 0 01-32 0z" {...t} />
        <path d="M4 32h36" {...t} />
        <path d="M14 20c2-5 8-7 12-4" {...t} stroke={PALETA.amarillo} />
        <circle cx="28" cy="14" r="2.4" fill={PALETA.rosa} />
      </>
    ),
    // Olla de barro con tapa
    finde: (
      <>
        <path d="M8 18h26v10a8 8 0 01-8 8H16a8 8 0 01-8-8z" {...t} />
        <path d="M5 18h32" {...t} strokeWidth="3" />
        <path d="M34 22h4a4 4 0 010 8h-4" {...t} />
        <path d="M16 12c0-3 3-3 3-6M25 12c0-3 3-3 3-6" {...t} stroke={PALETA.amarillo} />
      </>
    ),
    // Tarro
    bebidas: (
      <>
        <path d="M11 14h18v20a4 4 0 01-4 4h-10a4 4 0 01-4-4z" {...t} />
        <path d="M29 19h5a5 5 0 010 10h-5" {...t} />
        <path d="M11 21h18" {...t} stroke={PALETA.amarillo} />
        <path d="M10 14c3-4 8-5 11-2 3-3 7-2 9 2" {...t} stroke={PALETA.crema} />
      </>
    ),
    // Etiqueta de promoción
    promos: (
      <>
        <path d="M22 5l16 16-14 14L8 19V5z" {...t} />
        <circle cx="15" cy="12" r="2.6" {...t} stroke={PALETA.amarillo} />
        <path d="M20 22l6 6" {...t} stroke={PALETA.rosa} />
      </>
    ),
  }

  return (
    <svg viewBox="0 0 44 44" className={className} aria-hidden="true">
      {formas[tipo] ?? formas.mexicana}
    </svg>
  )
}
