import { useState } from 'react'
import { bebidasListas, categorias, menu, promociones } from '../data/menu'
import { REGLAS, estadoCategoria, estadoGrupo } from '../data/horarios'
import { useAhora } from '../hooks/useAhora'
import AvisoDelDia from './AvisoDelDia'
import { AvisoBloqueo, ESTILO_ESTADO, PastillaEstado } from './EstadoDisponibilidad'
import { CLASES_COLOR, Filigrana, IconoCategoria } from './Ornamentos'
import TarjetaProducto from './TarjetaProducto'
import TarjetaPromo from './TarjetaPromo'
import { Boton, Etiqueta, Revelar, Seccion, TituloSeccion } from './ui'

/** Encabezado de grupo, con el doble trazo del menú impreso. */
function TituloGrupo({ texto, color = 'turquesa', estado }) {
  return (
    <div className="relative mb-6 flex flex-wrap items-center gap-x-4 gap-y-2">
      <h3 className="font-display text-[30px] uppercase leading-none tracking-[0.02em] text-crema sm:text-[36px]">
        <span className="relative inline-block">
          {texto}
          <span
            aria-hidden="true"
            className={`absolute inset-0 -z-10 -translate-x-[3px] translate-y-[3px] ${CLASES_COLOR[color].texto} opacity-40`}
          >
            {texto}
          </span>
        </span>
      </h3>
      {estado && <PastillaEstado estado={estado} tamano="chico" />}
      <span className="linea-degradada h-px min-w-[40px] flex-1 opacity-60" />
    </div>
  )
}

/**
 * Platillos de una categoría. Cada grupo puede tener su propia regla
 * (la barbacoa, por ejemplo), así que se evalúa grupo por grupo.
 */
function PanelPlatillos({ grupos, color, idCategoria, ahora }) {
  return (
    <div className="panel-entra space-y-12">
      {grupos.map((grupo) => {
        const disp = estadoGrupo(grupo.grupo, idCategoria, ahora)
        return (
          <div key={grupo.grupo}>
            <TituloGrupo texto={grupo.grupo} color={color} estado={disp.estado} />

            {!disp.disponible && (
              <AvisoBloqueo titulo={grupo.grupo} disponibilidad={disp} className="mb-6" />
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
          </div>
        )
      })}
    </div>
  )
}

function PanelBebidas() {
  return (
    <div className="panel-entra space-y-8">
      <div className="tarjeta flex flex-col items-start justify-between gap-4 p-6 sm:flex-row sm:items-center">
        <p className="max-w-xl text-sm leading-relaxed text-crema/70">
          Estas son las bebidas de la carta, disponibles todos los días. Las{' '}
          <strong className="text-crema">de barril</strong> — cerveza, michelada y marina — tienen
          su propia sección con precios por litro.
        </p>
        <Boton href="#bebidas" variante="contorno" className="shrink-0">
          Ver barril y precios
        </Boton>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {bebidasListas.map((bloque) => (
          <div key={bloque.grupo} className="tarjeta flex h-full flex-col p-6">
            <div className="flex items-center justify-between gap-3">
              <h3
                className={`font-alt text-2xl uppercase tracking-[0.06em] ${CLASES_COLOR[bloque.color].texto}`}
              >
                {bloque.grupo}
              </h3>
              {bloque.sinAlcohol && <Etiqueta>Sin alcohol</Etiqueta>}
            </div>
            <span
              className={`mt-3 block h-[2px] w-14 rounded ${CLASES_COLOR[bloque.color].fondo} opacity-80`}
            />
            <ul className="mt-4 flex-1 space-y-2">
              {bloque.items.map((item) => (
                <li
                  key={item}
                  className="flex items-baseline gap-2.5 text-[13.5px] text-crema/75 sm:text-sm"
                >
                  <span
                    aria-hidden="true"
                    className={`mt-[7px] block h-1.5 w-1.5 shrink-0 rounded-full ${CLASES_COLOR[bloque.color].fondo}`}
                  />
                  {item}
                </li>
              ))}
            </ul>
            {bloque.nota && (
              <p className="mt-4 border-t border-white/10 pt-3 text-[12px] text-crema/50">
                {bloque.nota}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function PanelPromos({ ahora }) {
  return (
    <div className="panel-entra space-y-8">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {promociones.map((promo) => (
          <TarjetaPromo key={promo.nombre} promo={promo} ahora={ahora} />
        ))}
      </div>
      <div className="text-center">
        <Boton href="#promociones" variante="amarillo">
          Promociones e información
        </Boton>
      </div>
    </div>
  )
}

/** Una de las seis opciones de la cuadrícula: icono, nombre, estado y horario. */
function BotonCategoria({ categoria, disponibilidad, seleccionada, onClick }) {
  const estilo = ESTILO_ESTADO[disponibilidad.estado.id] ?? ESTILO_ESTADO.noHoy
  const regla = REGLAS[categoria.id]

  return (
    <button
      role="tab"
      id={`tab-${categoria.id}`}
      aria-selected={seleccionada}
      aria-controls={`panel-${categoria.id}`}
      onClick={onClick}
      className={`group relative flex min-h-[128px] flex-col items-start gap-2 overflow-hidden rounded-2xl border p-4 text-left transition-all duration-300 hover:-translate-y-0.5 sm:min-h-[140px] sm:p-5 ${
        estilo.borde
      } ${
        seleccionada
          ? `${estilo.fondo} ring-2 ring-crema/70 ring-offset-2 ring-offset-carbon`
          : 'bg-white/[0.035] hover:bg-white/[0.07]'
      } ${disponibilidad.disponible ? '' : 'opacity-80'}`}
    >
      <IconoCategoria
        tipo={regla.icono}
        color={categoria.color}
        className="h-8 w-8 shrink-0 transition-transform duration-300 group-hover:scale-110 sm:h-9 sm:w-9"
      />

      <span className="font-alt text-[17px] uppercase leading-[1.05] tracking-[0.04em] text-crema sm:text-lg">
        {regla.corto}
      </span>

      <span className={`flex items-center gap-1.5 text-[11.5px] font-semibold leading-tight ${estilo.texto}`}>
        <span className={`h-2 w-2 shrink-0 rounded-full ${estilo.punto}`} aria-hidden="true" />
        {disponibilidad.estado.texto}
      </span>

      <span className="mt-auto text-[12px] leading-snug text-crema/50">{regla.resumen}</span>
    </button>
  )
}

/** Primera categoría que sí se está sirviendo, para abrir el menú en algo útil. */
function categoriaInicial(ahora) {
  const encontrada = categorias.find((c) => estadoCategoria(c.id, ahora).disponible)
  return (encontrada ?? categorias[0]).id
}

export default function MenuInteractivo() {
  const ahora = useAhora()
  const [activa, setActiva] = useState(() => categoriaInicial(ahora))

  const categoria = categorias.find((c) => c.id === activa) ?? categorias[0]
  const disponibilidad = estadoCategoria(categoria.id, ahora)

  return (
    <Seccion id="menu" className="scroll-mt-24">
      <div className="contenedor">
        <TituloSeccion
          kicker="Nuestro"
          titulo="Menú"
          descripcion="Cocina mexicana de todos los días. Cada categoría muestra si se está sirviendo ahora o en qué horario la encuentras."
        />

        {/* Aviso dinámico: día, hora y qué hay disponible */}
        <Revelar retraso={80}>
          <div className="mt-10">
            <AvisoDelDia ahora={ahora} />
          </div>
        </Revelar>

        {/* Seis opciones siempre visibles: 2x3 en teléfono, una fila en escritorio */}
        <Revelar retraso={140}>
          <div
            role="tablist"
            aria-label="Categorías del menú"
            className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6"
          >
            {categorias.map((cat) => (
              <BotonCategoria
                key={cat.id}
                categoria={cat}
                disponibilidad={estadoCategoria(cat.id, ahora)}
                seleccionada={cat.id === activa}
                onClick={() => setActiva(cat.id)}
              />
            ))}
          </div>
        </Revelar>

        {/* Encabezado de la categoría activa */}
        <div className="mt-12 flex flex-col items-center gap-3">
          <div className="flex items-center justify-center gap-4">
            <Filigrana className="hidden h-8 w-28 opacity-70 sm:block" color={categoria.color} />
            <p className="text-center font-display text-[26px] uppercase leading-none text-crema/90 sm:text-3xl">
              <span className={CLASES_COLOR[categoria.color].texto}>{categoria.kicker}</span>{' '}
              {categoria.titulo}
            </p>
            <Filigrana
              className="hidden h-8 w-28 opacity-70 sm:block"
              color={categoria.color}
              espejo
            />
          </div>
          <PastillaEstado estado={disponibilidad.estado} />
        </div>

        <div
          key={activa}
          id={`panel-${activa}`}
          role="tabpanel"
          aria-labelledby={`tab-${activa}`}
          className="mt-8 space-y-8"
        >
          {/* Categoría bloqueada: se explica el horario y el próximo día */}
          {!disponibilidad.disponible && (
            <AvisoBloqueo titulo={REGLAS[categoria.id].nombre} disponibilidad={disponibilidad} />
          )}

          {activa === 'bebidas' && <PanelBebidas />}
          {activa === 'promos' && <PanelPromos ahora={ahora} />}
          {menu[activa] && (
            <PanelPlatillos
              grupos={menu[activa]}
              color={categoria.color}
              idCategoria={activa}
              ahora={ahora}
            />
          )}
        </div>

        <p className="mt-12 text-center text-[12px] uppercase tracking-[0.14em] text-crema/40">
          Los precios pueden cambiar sin previo aviso.
        </p>
      </div>
    </Seccion>
  )
}
