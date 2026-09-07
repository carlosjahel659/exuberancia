import { useEffect, useRef, useState } from 'react'
import { navegacion, site } from '../data/site'
import { useSeccionActiva } from '../hooks/useRevelar'
import { recurso } from '../utils/recurso'
import { Boton } from './ui'

const IDS = navegacion.map(n => n.id)

export default function Encabezado() {
  const [abierto, setAbierto] = useState(false)
  const activa = useSeccionActiva(IDS)
  const boton = useRef(null)
  const panel = useRef(null)
  const cerrar = (devolver = false) => { setAbierto(false); if (devolver) boton.current?.focus() }

  useEffect(() => {
    const pantalla = window.matchMedia('(min-width: 1024px)')
    const ajustar = () => { if (pantalla.matches) setAbierto(false) }
    pantalla.addEventListener('change', ajustar)
    return () => pantalla.removeEventListener('change', ajustar)
  }, [])

  useEffect(() => {
    if (!abierto) return
    const anterior = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    panel.current?.querySelector('a')?.focus()
    const teclado = e => {
      if (e.key === 'Escape') {
        e.preventDefault()
        e.stopPropagation()
        setAbierto(false)
        boton.current?.focus()
        return
      }
      if (e.key !== 'Tab') return
      const controles = [boton.current, ...panel.current.querySelectorAll('a[href], button:not(:disabled)')]
      const primero = controles[0], ultimo = controles[controles.length - 1]
      if (e.shiftKey && document.activeElement === primero) { e.preventDefault(); ultimo.focus() }
      else if (!e.shiftKey && document.activeElement === ultimo) { e.preventDefault(); primero.focus() }
    }
    document.addEventListener('keydown', teclado)
    return () => { document.body.style.overflow = anterior; document.removeEventListener('keydown', teclado) }
  }, [abierto])

  return <header className="encabezado">
    <div className="contenedor encabezado-fila">
      <a href="#inicio" className="marca" onClick={() => cerrar()} aria-label={site.nombre + ': inicio'}>
        <img src={recurso('assets/logo-exuberancia.webp')} width="820" height="820" alt="" />
        <span>La Exuberancia<small>Restaurante mexicano</small></span>
      </a>
      <nav aria-label="Principal" className="hidden lg:block">
        <ul className="flex items-center gap-1">{navegacion.map(item => <li key={item.id}><a href={'#' + item.id} className="nav-enlace" aria-current={activa === item.id ? 'location' : undefined}>{item.etiqueta}</a></li>)}</ul>
      </nav>
      <div className="flex items-center gap-2">
        <Boton href={site.maps} variante="contorno" className="hidden xl:inline-flex">Cómo llegar</Boton>
        <button ref={boton} type="button" className="boton-menu lg:hidden" aria-expanded={abierto} aria-controls="menu-movil" aria-label={abierto ? 'Cerrar navegación' : 'Abrir navegación'} onClick={() => setAbierto(v => !v)}>
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">{abierto ? <path d="m6 6 12 12M6 18 18 6" /> : <path d="M4 6h16M4 12h16M4 18h16" />}</svg>
        </button>
      </div>
    </div>
    <nav ref={panel} id="menu-movil" aria-label="Principal móvil" hidden={!abierto} className="menu-movil lg:hidden">
      <ul className="contenedor py-4">{navegacion.map(item => <li key={item.id}><a href={'#' + item.id} className="nav-enlace" aria-current={activa === item.id ? 'location' : undefined} onClick={() => cerrar()}>{item.etiqueta}<span aria-hidden="true">↗</span></a></li>)}</ul>
      <div className="contenedor pb-6"><Boton href={site.maps} variante="amarillo">Cómo llegar</Boton></div>
    </nav>
  </header>
}
