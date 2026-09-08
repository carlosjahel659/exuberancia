import { useCallback, useEffect, useRef, useState } from 'react'
import { categorias, menu } from '../data/menu'
import { REGLAS, estadoCategoria, estadoGrupo } from '../data/horarios'
import { useAhora } from '../hooks/useAhora'
import { grupoVisible, productosVisibles } from '../utils/catalogo'
import { precioMXN } from '../utils/precio'
import AvisoDelDia from './AvisoDelDia'
import { ESTILO_ESTADO, IconoCandado, PastillaEstado } from './EstadoDisponibilidad'
import { CLASES_COLOR, Filigrana, IconoCategoria } from './Ornamentos'
import TarjetaProducto from './TarjetaProducto'
import TarjetaBebida from './TarjetaBebida'
import { Boton, Seccion } from './ui'

function Grupo({ grupo, categoria, ahora }) {
  const disponibilidad = ahora ? estadoGrupo(grupo.grupo, categoria, ahora) : null
  return <section className="menu-grupo" aria-label={grupo.grupo}>
    <div className="mb-4 flex flex-wrap items-center gap-3 border-b border-turquesa/30 pb-3">
      <h4 className="font-alt text-2xl text-turquesa">{grupo.grupo}</h4>
      {disponibilidad && <PastillaEstado estado={disponibilidad.estado} tamano="chico" />}
    </div>
    {disponibilidad && !disponibilidad.disponible && <p className="mb-4 text-sm text-amarillo">{disponibilidad.mensaje}</p>}
    {grupo.nota && <p className="mb-4 text-sm leading-relaxed text-crema/75">{grupo.nota}</p>}
    <div className={grupo.formato === 'bebidas' ? 'grid gap-4 sm:grid-cols-2 lg:grid-cols-3' : 'grid gap-5 md:grid-cols-2'}>
      {productosVisibles(grupo).map(producto => grupo.formato === 'bebidas'
        ? <TarjetaBebida key={producto.nombre} producto={producto} aviso={grupo.aviso} />
        : <TarjetaProducto key={producto.nombre} producto={producto} disponible={disponibilidad?.disponible ?? true} />)}
    </div>
    {grupo.promo && <p className="mt-5 rounded-xl border border-amarillo/40 bg-amarillo/10 p-4 text-sm leading-relaxed">{grupo.promo.texto} <strong className="precio text-xl">{precioMXN(grupo.promo.precio)}</strong></p>}
  </section>
}

function Contenido({ categoria, ahora }) {
  const grupos = menu[categoria.id].filter(grupoVisible)
  return <>{grupos.map((grupo, index) => <div key={grupo.grupo}>
    {grupo.bloque && grupo.bloque !== grupos[index - 1]?.bloque && <p className="eyebrow mt-10 !text-amarillo">{grupo.bloque}</p>}
    <Grupo grupo={grupo} categoria={categoria.id} ahora={ahora} />
  </div>)}</>
}

function TarjetaCategoria({ categoria, disponibilidad, abierta, onAbrir, refBoton }) {
  const regla = REGLAS[categoria.id]
  const bloqueada = !disponibilidad?.disponible
  const estilo = ESTILO_ESTADO[disponibilidad?.estado.id ?? 'noHoy']
  const pie = !disponibilidad ? regla.resumen : bloqueada
    ? regla.textoBloqueo || disponibilidad.textoProximo || regla.resumen
    : regla.resumen

  return <button
    id={'categoria-' + categoria.id}
    ref={refBoton}
    type="button"
    onClick={evento => !bloqueada && onAbrir(categoria.id, evento.detail === 0)}
    aria-disabled={bloqueada || undefined}
    aria-expanded={abierta}
    aria-controls={abierta ? 'panel-' + categoria.id : undefined}
    aria-describedby={'estado-' + categoria.id + ' horario-' + categoria.id}
    className={'categoria-tarjeta ' + estilo.borde + (bloqueada ? ' categoria-bloqueada' : ' categoria-disponible') + (abierta ? ' categoria-seleccionada' : '')}
    style={{ '--acento-categoria': 'var(--' + categoria.color + ')' }}
  >
    {bloqueada && <IconoCandado className="absolute right-3 top-3 h-4 w-4 text-crema/75 sm:right-5 sm:top-5 sm:h-5 sm:w-5" />}
    <IconoCategoria tipo={regla.icono} color={categoria.color} className="h-7 w-7 sm:h-9 sm:w-9" />
    <span className="font-alt text-lg uppercase leading-tight text-crema sm:text-2xl">{regla.corto}</span>
    <span id={'estado-' + categoria.id} className={'flex items-start gap-1.5 text-[11px] font-semibold leading-snug sm:text-xs ' + estilo.texto}>
      <span aria-hidden="true" className={'mt-1 h-1.5 w-1.5 shrink-0 rounded-full ' + estilo.punto} />
      {disponibilidad?.estado.texto ?? 'Consultando horario'}
    </span>
    <span id={'horario-' + categoria.id} className="mt-auto text-[11px] leading-snug text-crema/75 sm:text-xs">{pie}</span>
  </button>
}

export default function MenuInteractivo() {
  const ahora = useAhora()
  const [abierta, setAbierta] = useState(null)
  const enlaces = useRef({})
  const titulo = useRef(null)
  const regreso = useRef(null)
  const navegarAlContenido = useRef(false)
  const categoria = categorias.find(cat => cat.id === abierta)
  const disponibilidad = categoria && ahora ? estadoCategoria(categoria.id, ahora) : null

  const abrir = useCallback((id, moverFoco = false) => {
    if (!ahora || !estadoCategoria(id, ahora).disponible) return
    navegarAlContenido.current = moverFoco
    setAbierta(id)
  }, [ahora])

  const cerrar = useCallback(() => {
    regreso.current = abierta
    setAbierta(null)
    window.history.replaceState(null, '', window.location.pathname + window.location.search + '#menu')
  }, [abierta])

  useEffect(() => {
    if (abierta && navegarAlContenido.current) {
      navegarAlContenido.current = false
      titulo.current?.focus({ preventScroll: true })
      document.getElementById('panel-' + abierta)?.scrollIntoView({ block: 'start' })
    } else if (regreso.current) {
      const id = regreso.current
      regreso.current = null
      document.getElementById('categorias')?.scrollIntoView({ block: 'start' })
      enlaces.current[id]?.focus({ preventScroll: true })
    }
  }, [abierta])

  useEffect(() => {
    const hash = () => {
      const id = window.location.hash.replace(/^#(?:categoria-|panel-)/, '')
      if (categorias.some(cat => cat.id === id)) abrir(id, true)
    }
    hash()
    window.addEventListener('hashchange', hash)
    return () => window.removeEventListener('hashchange', hash)
  }, [abrir])

  useEffect(() => {
    if (!abierta) return
    const teclado = e => { if (e.key === 'Escape') cerrar() }
    window.addEventListener('keydown', teclado)
    return () => window.removeEventListener('keydown', teclado)
  }, [abierta, cerrar])

  useEffect(() => {
    if (abierta && ahora && !estadoCategoria(abierta, ahora).disponible) cerrar()
  }, [abierta, ahora, cerrar])

  return <Seccion id="menu" className="!pt-8">
    <div className="contenedor">
      <div className="text-center">
        <p className="font-alt text-sm uppercase tracking-[.4em] text-turquesa sm:text-base">Nuestro</p>
        <h2 className="titulo-display texto-neon mt-2 text-[clamp(2.5rem,9vw,4.75rem)]">Menú</h2>
        <p className="mx-auto mt-4 hidden max-w-2xl text-sm leading-relaxed text-crema/80 sm:block">Cocina mexicana de todos los días. Cada categoría muestra si se está sirviendo ahora o en qué horario la encuentras.</p>
      </div>
      <div className="mt-5 sm:mt-8"><AvisoDelDia ahora={ahora} compacto /></div>
      <div id="categorias" className="mt-5 scroll-mt-4 sm:mt-8">
        <ul aria-label="Categorías del menú" className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          {categorias.map(cat => <li key={cat.id}>
            <TarjetaCategoria categoria={cat} disponibilidad={ahora ? estadoCategoria(cat.id, ahora) : null} abierta={abierta === cat.id} onAbrir={abrir} refBoton={nodo => { enlaces.current[cat.id] = nodo }} />
          </li>)}
        </ul>
        <a href="#promociones" className="menu-acceso-promos" aria-labelledby="menu-promos-titulo" aria-describedby="menu-promos-descripcion">
          <svg viewBox="0 0 32 32" className="h-9 w-9 shrink-0 text-amarillo" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
            <path d="M5 13h22v6H5zM8 19v10h16V19M16 13v16M16 13C4 13 7 1 13 6l3 7Zm0 0c12 0 9-12 3-7l-3 7Z" strokeLinejoin="round" />
          </svg>
          <span className="flex-1">
            <span id="menu-promos-titulo" className="block font-alt text-2xl uppercase leading-tight text-rosaClaro sm:text-3xl">Promociones Exuberantes</span>
            <span id="menu-promos-descripcion" className="mt-1 block text-xs leading-relaxed text-crema/80 sm:text-sm">Conoce nuestras promos para compartir</span>
          </span>
          <span aria-hidden="true" className="text-2xl text-amarillo">↓</span>
        </a>
        <p className="mt-4 text-center text-xs leading-relaxed text-crema/75">{categoria ? 'Puedes elegir otra categoría disponible. Sus platillos aparecen aquí abajo.' : 'Toca una categoría disponible para ver sus platillos aquí abajo.'}</p>
      </div>

      {categoria && disponibilidad && <div id={'panel-' + categoria.id} role="region" aria-labelledby={'titulo-' + categoria.id} className="mt-7 scroll-mt-4 pb-6 lg:mt-12">
        <div className="menu-volver">
          <Boton variante="fantasma" href="#categorias">↑ Cambiar categoría</Boton>
          <PastillaEstado estado={disponibilidad.estado} tamano="chico" />
        </div>
        <div className="mt-7 text-center">
          <div className="flex items-center justify-center gap-4">
            <Filigrana className="hidden h-9 w-28 sm:block" color={categoria.color} />
            <h3 id={'titulo-' + categoria.id} ref={titulo} tabIndex={-1} className="font-display text-3xl uppercase leading-tight">
              <span className={CLASES_COLOR[categoria.color].texto}>{categoria.kicker}</span> {categoria.titulo}
            </h3>
            <Filigrana className="hidden h-9 w-28 sm:block" color={categoria.color} espejo />
          </div>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-crema/80">{categoria.descripcion}</p>
          {categoria.foto && <img src={categoria.foto.src} srcSet={categoria.foto.chica + ' 160w, ' + categoria.foto.src + ' 320w'} sizes="88px" alt={categoria.fotoAlt ?? ''} width="320" height="320" loading="lazy" className="mx-auto mt-4 h-[88px] w-[88px] rounded-xl object-cover" />}
        </div>
        <Contenido categoria={categoria} ahora={ahora} />
        <div className="mt-8 flex justify-center"><Boton variante="amarillo" href="#categorias">Elegir otra categoría ↑</Boton></div>
      </div>}

      {/* Sin reloj del navegador, la carta estática conserva los horarios publicados.
          El primer render es idéntico en servidor y cliente; no falsea disponibilidad. */}
      {!ahora && <div id="carta-estatica" className="mt-8 space-y-5">
        <p className="text-sm text-crema/80">Carta y horarios. La disponibilidad actual se consulta al cargar el reloj.</p>
        {categorias.map(cat => <details key={cat.id} className="menu-categoria">
          <summary><h3>{cat.etiqueta}</h3><span className="categoria-signo" aria-hidden="true">+</span></summary>
          <p className="text-sm text-amarillo">{REGLAS[cat.id].resumen}</p>
          <Contenido categoria={cat} />
        </details>)}
      </div>}
      <p className="mt-8 text-center text-xs leading-relaxed text-crema/75">Precios en pesos mexicanos · Consulta precios y disponibilidad con tu mesero.</p>
    </div>
  </Seccion>
}
