import { useRevelar } from '../hooks/useRevelar'
import { enlaceSeguro } from '../utils/enlaces'

// Nombres completos para que Tailwind conserve todas las variantes en producción.
const VARIANTES = {
  primario: 'boton--primario',
  amarillo: 'boton--amarillo',
  contorno: 'boton--contorno',
  fantasma: 'boton--fantasma',
}

export function Revelar({ children, retraso = 0, className = '', as: Elemento = 'div' }) {
  const ref = useRevelar()
  return <Elemento ref={ref} className={'revelar ' + className} style={{ '--retraso': retraso + 'ms' }}>{children}</Elemento>
}

export function Boton({ children, href, variante = 'primario', brillo: _brillo, className = '', ...props }) {
  const clases = 'boton ' + (VARIANTES[variante] ?? VARIANTES.primario) + ' ' + className
  if (href !== undefined) {
    const destino = enlaceSeguro(href)
    if (!destino) return <button type="button" disabled className={clases} title="Enlace por confirmar" {...props}>{children}<span className="sr-only">: enlace por confirmar</span></button>
    const externo = /^https:\/\//.test(destino)
    return <a href={destino} className={clases} {...(externo ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...props}>{children}</a>
  }
  return <button type="button" className={clases} {...props}>{children}</button>
}

export function Etiqueta({ children, className = '' }) {
  return <span className={'etiqueta ' + className}>{children}</span>
}

export function TituloSeccion({ kicker, titulo, descripcion, alineado = 'centro' }) {
  return <div className={'section-heading ' + (alineado === 'centro' ? 'text-center mx-auto' : '')}>
    <p className="eyebrow">{kicker}</p>
    <h2 className="titulo-display mt-3">{titulo}</h2>
    {descripcion && <p className="section-description">{descripcion}</p>}
  </div>
}

export function Seccion({ id, children, className = '', ...props }) {
  return <section id={id} className={'seccion ' + className} {...props}>{children}</section>
}
