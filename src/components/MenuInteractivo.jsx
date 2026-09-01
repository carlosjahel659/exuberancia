import { useCallback, useEffect, useRef, useState } from 'react'
import { categorias, menu, MENU_PDF } from '../data/menu'
import { REGLAS, estadoCategoria, estadoGrupo } from '../data/horarios'
import { useAhora } from '../hooks/useAhora'
import AvisoDelDia from './AvisoDelDia'
import { AvisoBloqueo, ESTILO_ESTADO, IconoCandado, PastillaEstado } from './EstadoDisponibilidad'
import { CLASES_COLOR, Filigrana, IconoCategoria } from './Ornamentos'
import TarjetaProducto from './TarjetaProducto'
import { Boton, Etiqueta, Seccion } from './ui'

const FLECHA_IZQ = (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
    <path d="M15 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const ICONO_PDF = (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true">
    <path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8z" strokeLinejoin="round" />
    <path d="M14 3v5h5" strokeLinejoin="round" />
  </svg>
)

/** Enlace al PDF completo. Se abre en otra pestaña y se descarga si el navegador no lo muestra. */
function BotonPDF({ className = '', variante = 'contorno' }) {
  return (
    <Boton href={MENU_PDF} variante={variante} className={className}>
      {ICONO_PDF}
      Ver menú completo en PDF
    </Boton>
  )
}

/** Encabezado de grupo, con el doble trazo del menú impreso. */
function TituloGrupo({ texto, color = 'turquesa', estado }) {
  return (
    <div className="relative mb-5 flex flex-wrap items-center gap-x-4 gap-y-2">
      <h4 className="font-display text-[26px] uppercase leading-none tracking-[0.02em] text-crema sm:text-[34px]">
        <span className="relative inline-block">
          {texto}
          <span
            aria-hidden="true"
            className={`absolute inset-0 -z-10 -translate-x-[3px] translate-y-[3px] ${CLASES_COLOR[color].texto} opacity-40`}
          >
            {texto}
          </span>
        </span>
      </h4>
      {estado && <PastillaEstado estado={estado} tamano="chico" />}
      <span className="linea-degradada h-px min-w-[40px] flex-1 opacity-60" />
    </div>
  )
}

/** Grupo en formato lista compacta: bebidas, botellas, cargos por daños. */
function GrupoLista({ grupo, disponible }) {
  const color = grupo.color ?? 'turquesa'
  return (
    <div className={`tarjeta flex h-full flex-col p-5 sm:p-6 ${disponible ? '' : 'opacity-60'}`}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h4 className={`font-alt text-xl uppercase tracking-[0.06em] sm:text-2xl ${CLASES_COLOR[color].texto}`}>
          {grupo.grupo}
        </h4>
        {grupo.sinAlcohol && <Etiqueta>Sin alcohol</Etiqueta>}
      </div>

      <span
        aria-hidden="true"
        className={`mt-3 block h-[2px] w-14 rounded ${CLASES_COLOR[color].fondo} opacity-80`}
      />

      <ul className="mt-4 flex-1 space-y-2.5">
        {grupo.productos.map((p) => (
          <li key={p.nombre} className="flex items-baseline gap-2.5">
            <span
              aria-hidden="true"
              className={`mt-[7px] block h-1.5 w-1.5 shrink-0 rounded-full ${CLASES_COLOR[color].fondo}`}
            />
            <span className="min-w-0">
              <span className="block text-[14px] leading-snug text-crema/90">{p.nombre}</span>
              {p.descripcion && (
                <span className="mt-0.5 block text-[12.5px] leading-snug text-crema/55">
                  {p.descripcion}
                </span>
              )}
            </span>
          </li>
        ))}
      </ul>

      {grupo.nota && (
        <p className="mt-4 border-t border-white/10 pt-3 text-[12px] text-crema/50">{grupo.nota}</p>
      )}
    </div>
  )
}

/**
 * Contenido de una categoría. Cada grupo puede tener su propia regla de
 * horario, así que se evalúa grupo por grupo.
 */
function PanelCategoria({ grupos, color, idCategoria, ahora }) {
  const listas = grupos.filter((g) => g.formato === 'lista')
  const tarjetas = grupos.filter((g) => g.formato !== 'lista')

  return (
    <div className="panel-entra space-y-12">
      {tarjetas.map((grupo) => {
        const disp = estadoGrupo(grupo.grupo, idCategoria, ahora)
        return (
          <section key={grupo.grupo} aria-label={grupo.grupo}>
            <TituloGrupo texto={grupo.grupo} color={color} estado={disp.estado} />

            {!disp.disponible && (
              <AvisoBloqueo titulo={grupo.grupo} disponibilidad={disp} className="mb-6" />
            )}

            {grupo.nota && (
              <p className="mb-5 text-[13px] leading-relaxed text-crema/60">{grupo.nota}</p>
            )}

            <div className="grid gap-5 md:grid-cols-2">
              {grupo.productos.map((p, i) => (
                <TarjetaProducto
                  key={p.nombre}
                  producto={p}
                  indice={i}
                  disponible={disp.disponible}
                />
              ))}
            </div>
          </section>
        )
      })}

      {listas.length > 0 && (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {listas.map((grupo) => {
            const disp = estadoGrupo(grupo.grupo, idCategoria, ahora)
            return <GrupoLista key={grupo.grupo} grupo={grupo} disponible={disp.disponible} />
          })}
        </div>
      )}
    </div>
  )
}

/**
 * Una de las seis opciones de la cuadrícula.
 * Bloqueada sigue visible y enfocable con el teclado, pero no abre nada: se
 * anuncia con aria-disabled y muestra su horario o próximo día disponible.
 */
function TarjetaCategoria({ categoria, disponibilidad, abierta, onAbrir, refBoton }) {
  const estilo = ESTILO_ESTADO[disponibilidad.estado.id] ?? ESTILO_ESTADO.noHoy
  const regla = REGLAS[categoria.id]
  const bloqueada = !disponibilidad.disponible
  const idAyuda = `estado-${categoria.id}`

  // Con la categoría bloqueada mostramos cuándo vuelve; con el horario si abre hoy.
  const pie = bloqueada ? disponibilidad.textoProximo || regla.resumen : regla.resumen

  return (
    <button
      type="button"
      onClick={() => !bloqueada && onAbrir(categoria.id)}
      ref={refBoton}
      aria-disabled={bloqueada || undefined}
      aria-expanded={abierta}
      aria-controls={abierta ? `panel-${categoria.id}` : undefined}
      aria-describedby={idAyuda}
      className={`group relative flex h-full min-h-[112px] w-full flex-col items-start gap-1 overflow-hidden rounded-2xl border p-3 text-left transition-all duration-300 sm:min-h-[150px] sm:gap-2 sm:p-5 ${estilo.borde} ${
        bloqueada
          ? 'cursor-not-allowed bg-carbon/80 saturate-[.4]'
          : 'bg-white/[0.045] hover:-translate-y-0.5 hover:bg-white/[0.09]'
      } ${abierta ? 'ring-2 ring-amarillo ring-offset-2 ring-offset-carbon' : ''}`}
    >
      {/* Candado de las categorías bloqueadas */}
      {bloqueada && (
        <IconoCandado className="absolute right-2.5 top-2.5 h-4 w-4 text-crema/55 sm:right-4 sm:top-4 sm:h-5 sm:w-5" />
      )}

      <IconoCategoria
        tipo={regla.icono}
        color={categoria.color}
        className={`h-6 w-6 shrink-0 transition-transform duration-300 sm:h-9 sm:w-9 ${
          bloqueada ? 'opacity-50' : 'group-hover:scale-110'
        }`}
      />

      <span
        className={`font-alt text-[14px] uppercase leading-[1] tracking-[0.03em] [overflow-wrap:anywhere] sm:text-lg ${
          bloqueada ? 'text-crema/75' : 'text-crema'
        }`}
      >
        {regla.corto}
      </span>

      <span
        id={idAyuda}
        className={`flex items-start gap-1.5 text-[10.5px] font-semibold leading-tight sm:text-[11.5px] ${estilo.texto}`}
      >
        <span className={`mt-1 h-1.5 w-1.5 shrink-0 rounded-full sm:h-2 sm:w-2 ${estilo.punto}`} aria-hidden="true" />
        {disponibilidad.estado.texto}
      </span>

      <span className="mt-auto text-[10px] leading-snug text-crema/65 [overflow-wrap:anywhere] sm:text-[12px]">
        {pie}
      </span>
    </button>
  )
}

export default function MenuInteractivo() {
  const ahora = useAhora()
  // Arranca sin nada abierto: así las seis opciones caben en la primera pantalla.
  const [abierta, setAbierta] = useState(null)

  const refsBoton = useRef({})
  const refPanel = useRef(null)
  const refCuadricula = useRef(null)
  // Tarjeta a la que hay que devolver el foco cuando se cierra el panel.
  const refRegreso = useRef(null)

  const categoria = categorias.find((c) => c.id === abierta) ?? null
  const disponibilidad = categoria ? estadoCategoria(categoria.id, ahora) : null

  const cerrar = useCallback(() => {
    refRegreso.current = abierta
    setAbierta(null)
  }, [abierta])

  // Al abrir, el foco entra al encabezado del panel; al cerrar, vuelve a la
  // tarjeta de origen. Va en un efecto para que corra ya con el DOM actualizado.
  useEffect(() => {
    if (abierta) {
      refPanel.current?.focus()
      return
    }
    const id = refRegreso.current
    if (!id) return
    refRegreso.current = null
    refCuadricula.current?.scrollIntoView({ block: 'start' })
    refsBoton.current[id]?.focus({ preventScroll: true })
  }, [abierta])

  // Escape cierra y regresa a las seis categorías.
  useEffect(() => {
    if (!abierta) return undefined
    const alTeclado = (e) => e.key === 'Escape' && cerrar()
    window.addEventListener('keydown', alTeclado)
    return () => window.removeEventListener('keydown', alTeclado)
  }, [abierta, cerrar])

  // Si una categoría se cierra sola con el paso de las horas, se sale del panel.
  useEffect(() => {
    if (abierta && !estadoCategoria(abierta, ahora).disponible) setAbierta(null)
  }, [abierta, ahora])

  return (
    <Seccion
      id="menu"
      className="scroll-mt-[68px] !pb-10 !pt-6 sm:!py-16 lg:!py-24"
      aria-label="Menú de La Exuberancia"
    >
      <div className="contenedor">
        {/* Encabezado compacto: en el teléfono no debe robarle sitio a las tarjetas */}
        <div className="text-center">
          <p className="font-alt text-[13px] uppercase tracking-[0.4em] text-turquesa sm:text-base sm:tracking-[0.44em]">
            Nuestro
          </p>
          <h2 className="titulo-display texto-neon text-[clamp(2.1rem,9vw,4.75rem)]">Menú</h2>
          <p className="mx-auto mt-2 hidden max-w-2xl text-sm leading-relaxed text-crema/70 sm:block sm:text-base">
            Cocina mexicana de todos los días. Cada categoría muestra si se está sirviendo ahora o
            en qué horario la encuentras.
          </p>
        </div>

        {/* Aviso dinámico: día, hora y qué se está sirviendo */}
        <div className="mt-4 sm:mt-8">
          <AvisoDelDia ahora={ahora} compacto />
        </div>

        {/* Seis opciones: 2x3 en teléfono, 3x2 en escritorio */}
        <div
          ref={refCuadricula}
          className={`mt-4 scroll-mt-[76px] sm:mt-8 ${abierta ? 'hidden lg:block' : ''}`}
        >
          <ul className="grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-3">
            {categorias.map((cat) => (
              <li key={cat.id} className="min-w-0">
                <TarjetaCategoria
                  categoria={cat}
                  disponibilidad={estadoCategoria(cat.id, ahora)}
                  abierta={cat.id === abierta}
                  onAbrir={setAbierta}
                  refBoton={(nodo) => {
                    refsBoton.current[cat.id] = nodo
                  }}
                />
              </li>
            ))}
          </ul>

          <div className="mt-4 flex flex-col items-center gap-2 sm:mt-6 sm:gap-3">
            <BotonPDF className="w-full px-4 py-2.5 text-[11px] sm:w-auto sm:px-6 sm:py-3 sm:text-[13px]" />
            <p className="text-center text-[11px] leading-snug text-crema/45 sm:text-[12px]">
              Toca una categoría disponible para ver sus platillos.
            </p>
          </div>
        </div>

        {/* Contenido de la categoría abierta */}
        {categoria && (
          <div
            id={`panel-${categoria.id}`}
            role="region"
            aria-label={`${REGLAS[categoria.id].nombre} — contenido del menú`}
            className="mt-6 scroll-mt-[76px] lg:mt-14"
          >
            {/* Barra de regreso: siempre visible mientras se recorre la categoría */}
            <div className="sticky top-[68px] z-30 -mx-5 border-y border-white/10 bg-carbon/92 px-5 py-2.5 backdrop-blur-xl sm:-mx-7 sm:px-7 lg:-mx-10 lg:top-[80px] lg:px-10">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <Boton
                  variante="fantasma"
                  onClick={cerrar}
                  className="px-4 py-2 text-[11px] sm:text-[12px]"
                >
                  {FLECHA_IZQ}
                  Volver a las categorías
                </Boton>
                <PastillaEstado estado={disponibilidad.estado} tamano="chico" />
              </div>
            </div>

            {/* Encabezado de la categoría */}
            <div className="mt-7 flex flex-col items-center gap-3">
              <div className="flex items-center justify-center gap-4">
                <Filigrana
                  className="hidden h-8 w-28 opacity-70 sm:block"
                  color={categoria.color}
                />
                <h3
                  ref={refPanel}
                  tabIndex={-1}
                  className="text-center font-display text-[26px] uppercase leading-none text-crema/90 outline-none sm:text-3xl"
                >
                  <span className={CLASES_COLOR[categoria.color].texto}>{categoria.kicker}</span>{' '}
                  {categoria.titulo}
                </h3>
                <Filigrana
                  className="hidden h-8 w-28 opacity-70 sm:block"
                  color={categoria.color}
                  espejo
                />
              </div>
              <p className="max-w-xl text-center text-[13px] leading-relaxed text-crema/60 sm:text-sm">
                {categoria.descripcion}
              </p>
            </div>

            <div className="mt-8">
              <PanelCategoria
                grupos={menu[categoria.id]}
                color={categoria.color}
                idCategoria={categoria.id}
                ahora={ahora}
              />
            </div>

            <div className="mt-12 flex flex-col items-center gap-3">
              <BotonPDF variante="contorno" />
              <Boton variante="amarillo" onClick={cerrar}>
                {FLECHA_IZQ}
                Volver a las categorías
              </Boton>
            </div>
          </div>
        )}

        <p className="mt-10 text-center text-[11px] uppercase tracking-[0.14em] text-crema/40 sm:text-[12px]">
          Consulta precios y disponibilidad con tu mesero
        </p>
      </div>
    </Seccion>
  )
}
