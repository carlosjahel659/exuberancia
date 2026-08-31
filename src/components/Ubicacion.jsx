import { PENDIENTE, redes, site } from '../data/site'
import IconoRed from './IconosRed'
import { Chispa, EsquinaFloral } from './Ornamentos'
import { Boton, Revelar, Seccion, TituloSeccion } from './ui'

function Dato({ etiqueta, valor, href, icono }) {
  const pendiente = PENDIENTE(valor)
  const Contenedor = href && !pendiente ? 'a' : 'div'
  const props =
    href && !pendiente
      ? {
          href,
          ...(/^https?:/.test(href) ? { target: '_blank', rel: 'noopener noreferrer' } : {}),
        }
      : {}

  return (
    <Contenedor
      {...props}
      className="group flex items-start gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4 transition-all duration-300 hover:border-white/25 hover:bg-white/[0.07]"
    >
      <span className="mt-0.5 shrink-0 text-turquesa transition-transform duration-300 group-hover:scale-110">
        {icono}
      </span>
      <span className="min-w-0">
        <span className="block font-alt text-[13px] uppercase tracking-[0.22em] text-turquesa">
          {etiqueta}
        </span>
        <span
          className={`mt-1 block break-words text-sm ${
            pendiente ? 'italic text-crema/45' : 'text-crema/85'
          }`}
        >
          {pendiente ? `${valor} — por definir` : valor}
        </span>
      </span>
    </Contenedor>
  )
}

const IconoPin = (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    <path d="M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11z" strokeLinejoin="round" />
    <circle cx="12" cy="10" r="2.6" />
  </svg>
)

const IconoTel = (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    <path
      d="M4 6c0-1 1-2 2-2h2l2 5-2 1.5a12 12 0 005.5 5.5L15 14l5 2v2c0 1-1 2-2 2A16 16 0 014 6z"
      strokeLinejoin="round"
    />
  </svg>
)

const IconoWa = (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
    <path d="M12 2a10 10 0 00-8.6 15L2 22l5.2-1.4A10 10 0 1012 2zm0 2a8 8 0 11-4.1 14.9l-.4-.2-2.6.7.7-2.5-.2-.4A8 8 0 0112 4zm-3.2 4c-.2 0-.5.1-.7.4-.3.3-.9.9-.9 2.1s.9 2.4 1 2.6c.2.2 1.8 2.8 4.4 3.8 2.2.9 2.6.7 3.1.6.5 0 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2l-.6-.3-1.6-.8c-.2-.1-.4-.1-.6.1l-.8 1c-.2.2-.3.2-.6.1a6.6 6.6 0 01-1.9-1.2 7.3 7.3 0 01-1.4-1.7c-.1-.3 0-.4.1-.5l.5-.6.3-.5v-.5l-.8-1.8c-.2-.5-.4-.4-.6-.5z" />
  </svg>
)

export default function Ubicacion() {
  const mapsListo = !PENDIENTE(site.maps)

  return (
    <Seccion id="ubicacion" className="scroll-mt-24">
      <div className="contenedor">
        <TituloSeccion
          kicker="Visítanos"
          titulo="Ubicación"
          descripcion="Estamos listos para recibirte. Llega, pregunta por la barbacoa y pide un cantarito."
          color="naranja"
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1.15fr]">
          {/* Datos de contacto */}
          <Revelar className="order-2 lg:order-1">
            <div className="tarjeta relative h-full overflow-hidden p-6 sm:p-8">
              <EsquinaFloral className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 -scale-x-100 opacity-35" color="naranja" />
              <Chispa className="absolute bottom-6 right-6 h-4 w-4 animate-pulseGlow" color="rosa" />

              <h3 className="font-display text-3xl uppercase text-crema sm:text-4xl">Contacto</h3>

              <div className="mt-6 space-y-3">
                <Dato etiqueta="Dirección" valor={site.direccion} icono={IconoPin} />
                <Dato
                  etiqueta="Teléfono"
                  valor={site.telefono}
                  href={`tel:${site.telefono}`}
                  icono={IconoTel}
                />
                <Dato
                  etiqueta="WhatsApp"
                  valor={site.whatsapp}
                  href={site.whatsapp}
                  icono={IconoWa}
                />
              </div>

              <div className="mt-7">
                <p className="font-alt text-[13px] uppercase tracking-[0.24em] text-turquesa">
                  Síguenos
                </p>
                <ul className="mt-3 flex flex-wrap gap-3">
                  {redes.map((red) => {
                    const pendiente = PENDIENTE(red.url)
                    return (
                      <li key={red.nombre}>
                        <a
                          href={pendiente ? undefined : red.url}
                          {...(pendiente
                            ? { 'aria-disabled': 'true', role: 'link' }
                            : { target: '_blank', rel: 'noopener noreferrer' })}
                          aria-label={red.nombre}
                          title={pendiente ? `${red.nombre} — enlace por definir` : red.nombre}
                          className={`flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-300 ${
                            pendiente
                              ? 'cursor-not-allowed border-white/10 text-crema/30'
                              : 'border-white/15 text-crema/85 hover:-translate-y-0.5 hover:border-rosa hover:text-rosa hover:shadow-neonRosa'
                          }`}
                        >
                          <IconoRed tipo={red.icono} />
                        </a>
                      </li>
                    )
                  })}
                </ul>
              </div>

              <div className="mt-8 border-t border-white/10 pt-6">
                <p className="font-alt text-[13px] uppercase tracking-[0.24em] text-turquesa">
                  Horarios
                </p>
                <ul className="mt-3 space-y-1.5 text-sm text-crema/80">
                  {site.horarios.map((h) => (
                    <li key={h.dias} className="flex flex-wrap justify-between gap-2">
                      <span>{h.dias}</span>
                      <span className="text-amarillo">{h.horas}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Revelar>

          {/* Mapa */}
          <Revelar retraso={90} className="order-1 lg:order-2">
            <div className="tarjeta relative flex h-full min-h-[340px] flex-col overflow-hidden">
              <div className="relative flex flex-1 items-center justify-center overflow-hidden bg-carbon2 p-8">
                {/* Retícula decorativa mientras no hay mapa real */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-[0.18]"
                  style={{
                    backgroundImage:
                      'linear-gradient(rgba(245,240,223,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(245,240,223,.5) 1px, transparent 1px)',
                    backgroundSize: '46px 46px',
                  }}
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0"
                  style={{
                    background:
                      'radial-gradient(400px 220px at 50% 50%, rgba(0,168,165,.22), transparent 70%)',
                  }}
                />

                <div className="relative text-center">
                  <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-rosa/50 bg-rosa/10 text-rosa shadow-neonRosa">
                    <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                      <path d="M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11z" strokeLinejoin="round" />
                      <circle cx="12" cy="10" r="2.6" />
                    </svg>
                  </span>
                  <p className="mt-5 font-alt text-2xl uppercase tracking-[0.12em] text-crema">
                    Espacio para el mapa
                  </p>
                  <p className="mx-auto mt-2 max-w-sm text-[13px] leading-relaxed text-crema/60">
                    {mapsListo
                      ? 'Aquí se insertará el mapa interactivo de Google Maps.'
                      : 'Marcador temporal: falta la dirección exacta y el enlace de Google Maps para incrustar el mapa.'}
                  </p>
                </div>
              </div>

              <div className="border-t border-white/10 bg-white/[0.03] p-5 sm:p-6">
                <Boton href={site.maps} variante="primario" brillo className="w-full py-4 text-sm">
                  Abrir en Google Maps
                </Boton>
                <p className="mt-3 text-center text-[12px] text-crema/50">{site.direccion}</p>
              </div>
            </div>
          </Revelar>
        </div>
      </div>
    </Seccion>
  )
}
