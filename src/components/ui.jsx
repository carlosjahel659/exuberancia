import { useRevelar } from '../hooks/useRevelar'
import { Divisor, EsquinaFloral, Filigrana } from './Ornamentos'

/** Envoltorio que hace aparecer su contenido al entrar en pantalla. */
export function Revelar({ children, retraso = 0, className = '', as: Etiqueta = 'div' }) {
  const [ref, visible] = useRevelar()
  return (
    <Etiqueta
      ref={ref}
      className={`revelar ${visible ? 'visible' : ''} ${className}`}
      style={{ '--retraso': `${retraso}ms` }}
    >
      {children}
    </Etiqueta>
  )
}

const VARIANTES = {
  primario:
    'bg-rosa text-white hover:bg-[#ff1a6d] shadow-neonRosa hover:shadow-[0_0_34px_-4px_rgba(229,0,88,.8)]',
  amarillo:
    'bg-amarillo text-carbon hover:bg-[#ffc540] shadow-[0_0_0_1px_rgba(240,179,35,.4),0_0_26px_-6px_rgba(240,179,35,.7)]',
  contorno:
    'border border-turquesa/60 text-crema hover:bg-turquesa/15 hover:border-turquesa shadow-neon',
  fantasma: 'border border-white/15 text-crema/90 hover:bg-white/10',
}

/** Botón/enlace con el mismo look en todo el sitio. */
export function Boton({
  children,
  href,
  variante = 'primario',
  brillo = false,
  className = '',
  ...props
}) {
  const clases = `group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3 font-body text-[13px] font-bold uppercase tracking-[0.16em] transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 ${VARIANTES[variante]} ${className}`
  const contenido = (
    <>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {brillo && <span className="btn-brillo" aria-hidden="true" />}
    </>
  )

  if (href) {
    const externo = /^https?:|^tel:|^mailto:/.test(href)
    return (
      <a
        href={href}
        className={clases}
        {...(externo ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...props}
      >
        {contenido}
      </a>
    )
  }

  return (
    <button type="button" className={clases} {...props}>
      {contenido}
    </button>
  )
}

const ETIQUETAS = {
  Exuberante: 'bg-rosa/15 text-rosa border-rosa/40',
  Especialidad: 'bg-amarillo/15 text-amarillo border-amarillo/40',
  'Fin de semana': 'bg-turquesa/15 text-turquesa border-turquesa/40',
  'Sin alcohol': 'bg-turquesa/10 text-turquesa/90 border-turquesa/30',
  Nuevo: 'bg-naranja/15 text-naranja border-naranja/40',
}

export function Etiqueta({ children, className = '' }) {
  const estilo = ETIQUETAS[children] ?? 'bg-white/10 text-crema/80 border-white/20'
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 font-alt text-[11px] uppercase leading-none tracking-[0.14em] ${estilo} ${className}`}
    >
      {children}
    </span>
  )
}

/**
 * Encabezado de sección con el ritmo del PDF: antetítulo pequeño arriba y
 * palabra grande abajo, enmarcado por ornamentos.
 */
export function TituloSeccion({
  kicker,
  titulo,
  descripcion,
  color = 'turquesa',
  alineado = 'centro',
  conEsquinas = true,
}) {
  const centro = alineado === 'centro'
  return (
    <div className={`relative ${centro ? 'text-center' : 'text-left'}`}>
      {conEsquinas && (
        <>
          <EsquinaFloral
            className="pointer-events-none absolute -left-2 -top-6 hidden h-24 w-24 opacity-40 animate-sway sm:block"
            color={color}
          />
          <EsquinaFloral
            className="pointer-events-none absolute -right-2 -top-6 hidden h-24 w-24 -scale-x-100 opacity-40 animate-sway sm:block"
            color="amarillo"
          />
        </>
      )}

      <Revelar>
        <p className="font-alt text-[15px] uppercase tracking-[0.44em] text-turquesa sm:text-base">
          {kicker}
        </p>
        <h2 className="titulo-display texto-neon mt-1 text-[clamp(2.5rem,9vw,4.75rem)]">{titulo}</h2>
        {descripcion && (
          <p
            className={`mt-4 text-sm leading-relaxed text-crema/70 sm:text-base ${
              centro ? 'mx-auto max-w-2xl' : 'max-w-2xl'
            }`}
          >
            {descripcion}
          </p>
        )}
      </Revelar>

      {centro ? (
        <Revelar retraso={120}>
          <Divisor className="mx-auto mt-6 max-w-md" />
        </Revelar>
      ) : (
        <Revelar retraso={120}>
          <Filigrana className="mt-5 h-10 w-40 opacity-80" color={color} />
        </Revelar>
      )}
    </div>
  )
}

/** Marco de sección con separación vertical consistente. */
export function Seccion({ id, children, className = '', ...props }) {
  return (
    <section id={id} className={`relative py-16 sm:py-20 lg:py-28 ${className}`} {...props}>
      {children}
    </section>
  )
}
