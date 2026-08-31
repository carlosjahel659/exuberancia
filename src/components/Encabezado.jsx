import { useEffect, useState } from 'react'
import { navegacion, site } from '../data/site'
import { useSeccionActiva } from '../hooks/useRevelar'
import { Boton } from './ui'

const IDS = navegacion.map((n) => n.id)

export default function Encabezado() {
  const [abierto, setAbierto] = useState(false)
  const [compacto, setCompacto] = useState(false)
  const activa = useSeccionActiva(IDS)

  useEffect(() => {
    const alScroll = () => setCompacto(window.scrollY > 24)
    alScroll()
    window.addEventListener('scroll', alScroll, { passive: true })
    return () => window.removeEventListener('scroll', alScroll)
  }, [])

  // Bloquea el scroll del fondo mientras el menú móvil está abierto.
  useEffect(() => {
    document.body.style.overflow = abierto ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [abierto])

  useEffect(() => {
    const alTeclado = (e) => e.key === 'Escape' && setAbierto(false)
    window.addEventListener('keydown', alTeclado)
    return () => window.removeEventListener('keydown', alTeclado)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        compacto || abierto
          ? 'border-b border-white/10 bg-carbon/92 backdrop-blur-xl'
          : 'border-b border-transparent bg-gradient-to-b from-carbon/85 to-transparent'
      }`}
    >
      <div className="contenedor flex h-[68px] items-center justify-between gap-4 lg:h-[80px]">
        <a
          href="#inicio"
          onClick={() => setAbierto(false)}
          className="group flex items-center gap-3"
          aria-label={`${site.nombre} — ir al inicio`}
        >
          <img
            src="/assets/logo-exuberancia.webp"
            alt=""
            width="820"
            height="820"
            className="h-11 w-11 shrink-0 transition-transform duration-500 group-hover:rotate-[6deg] group-hover:scale-105 lg:h-[52px] lg:w-[52px]"
          />
          <span className="hidden leading-none xs:block">
            <span className="block font-display text-lg uppercase tracking-wide text-crema lg:text-xl">
              La Exuberancia
            </span>
            <span className="block font-alt text-[10px] uppercase tracking-[0.28em] text-turquesa lg:text-[11px]">
              Restaurante mexicano
            </span>
          </span>
        </a>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navegacion.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={activa === item.id ? 'true' : undefined}
                  className={`relative rounded-full px-4 py-2 font-alt text-[15px] uppercase tracking-[0.18em] transition-colors duration-300 ${
                    activa === item.id ? 'text-amarillo' : 'text-crema/75 hover:text-crema'
                  }`}
                >
                  {item.etiqueta}
                  <span
                    className={`absolute inset-x-4 -bottom-0.5 h-[2px] origin-left rounded bg-amarillo transition-transform duration-300 ${
                      activa === item.id ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Boton
            href={site.maps}
            variante="primario"
            brillo
            className="hidden px-5 py-2.5 text-[11px] sm:inline-flex"
          >
            Cómo llegar
          </Boton>

          <button
            type="button"
            onClick={() => setAbierto((v) => !v)}
            aria-expanded={abierto}
            aria-controls="menu-movil"
            aria-label={abierto ? 'Cerrar menú' : 'Abrir menú'}
            className="relative grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/5 lg:hidden"
          >
            <span className="sr-only">Menú</span>
            <span
              className={`absolute h-[2px] w-5 rounded bg-crema transition-all duration-300 ${
                abierto ? 'rotate-45' : '-translate-y-[6px]'
              }`}
            />
            <span
              className={`absolute h-[2px] w-5 rounded bg-crema transition-all duration-200 ${
                abierto ? 'scale-x-0 opacity-0' : ''
              }`}
            />
            <span
              className={`absolute h-[2px] w-5 rounded bg-crema transition-all duration-300 ${
                abierto ? '-rotate-45' : 'translate-y-[6px]'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Menú móvil */}
      <div
        id="menu-movil"
        className={`overflow-hidden border-t border-white/10 bg-carbon/97 backdrop-blur-xl transition-[max-height,opacity] duration-500 lg:hidden ${
          abierto ? 'max-h-[520px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav aria-label="Principal móvil" className="contenedor py-5">
          <ul className="flex flex-col gap-1">
            {navegacion.map((item, i) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setAbierto(false)}
                  style={{ transitionDelay: `${abierto ? i * 45 : 0}ms` }}
                  className={`flex items-center justify-between rounded-xl px-4 py-3.5 font-alt text-2xl uppercase tracking-[0.14em] transition-all duration-300 ${
                    abierto ? 'translate-x-0 opacity-100' : '-translate-x-3 opacity-0'
                  } ${activa === item.id ? 'bg-white/5 text-amarillo' : 'text-crema/85'}`}
                >
                  {item.etiqueta}
                  <span aria-hidden="true" className="text-turquesa">
                    →
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <Boton
            href={site.maps}
            variante="primario"
            brillo
            className="mt-4 w-full"
            onClick={() => setAbierto(false)}
          >
            Cómo llegar
          </Boton>
        </nav>
      </div>
    </header>
  )
}
