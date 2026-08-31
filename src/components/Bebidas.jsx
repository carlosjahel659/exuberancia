import { bebidasBarril } from '../data/menu'
import { Boton, Revelar, Seccion } from './ui'
import { Chispa, CLASES_COLOR, EsquinaFloral, Filigrana, IlustracionBebida } from './Ornamentos'

function Precios({ precios, color }) {
  return (
    <ul className="mt-4 space-y-1.5">
      {precios.map((p) => (
        <li key={p.medida} className="flex items-baseline gap-3">
          <span className="font-alt text-base uppercase tracking-[0.18em] text-crema/70">
            {p.medida}
          </span>
          <span className="linea-degradada h-px flex-1 opacity-40" aria-hidden="true" />
          <span
            className={`font-display text-2xl ${CLASES_COLOR[color].texto} drop-shadow-[0_0_14px_rgba(255,255,255,.15)] sm:text-[28px]`}
          >
            {p.precio}
          </span>
        </li>
      ))}
    </ul>
  )
}

export default function Bebidas() {
  return (
    <Seccion id="bebidas" className="scroll-mt-24">
      <div className="contenedor">
        <Revelar>
          <div className="relative overflow-hidden rounded-[28px] border border-white/12 bg-carbon/80 px-5 py-14 shadow-[inset_0_1px_0_rgba(255,255,255,.06),0_40px_80px_-40px_rgba(0,0,0,1)] sm:px-10 sm:py-16 lg:px-14">
            {/* Pizarrón: textura marcada + resplandores */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-70"
              style={{
                backgroundImage: 'url(/assets/textura-tela.webp)',
                backgroundSize: '300px',
              }}
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'radial-gradient(600px 300px at 15% 0%, rgba(0,168,165,.22), transparent 65%), radial-gradient(600px 320px at 88% 20%, rgba(229,0,88,.2), transparent 62%), radial-gradient(700px 400px at 50% 110%, rgba(232,123,58,.18), transparent 65%)',
              }}
            />

            <EsquinaFloral className="pointer-events-none absolute -left-4 -top-4 h-32 w-32 opacity-45 animate-sway" color="turquesa" />
            <EsquinaFloral className="pointer-events-none absolute -right-4 -top-4 h-32 w-32 -scale-x-100 opacity-45 animate-sway" color="rosa" />
            <EsquinaFloral className="pointer-events-none absolute -bottom-4 -left-4 h-32 w-32 -scale-y-100 opacity-35" color="naranja" />
            <EsquinaFloral className="pointer-events-none absolute -bottom-4 -right-4 h-32 w-32 -scale-100 opacity-35" color="amarillo" />

            <div className="relative">
              <header className="text-center">
                <p className="font-alt text-sm uppercase tracking-[0.42em] text-turquesa sm:text-base">
                  De barril y bien frías
                </p>
                <h2 className="titulo-display texto-neon mt-2 text-[clamp(2.4rem,9vw,4.5rem)]">
                  Menú de bebidas
                </h2>
                <Filigrana className="mx-auto mt-5 h-11 w-44 opacity-90 animate-sway" />
              </header>

              <div className="mt-12 grid gap-5 sm:grid-cols-2">
                {bebidasBarril.map((bebida, i) => {
                  const destacado = Boolean(bebida.destacado)
                  return (
                    <Revelar key={bebida.nombre} retraso={i * 70}>
                      <article
                        className={`tarjeta group flex h-full items-start gap-4 overflow-hidden p-5 transition-all duration-500 hover:-translate-y-1.5 hover:border-white/25 sm:p-6 ${
                          destacado ? 'border-turquesa/35 bg-turquesa/[0.06]' : ''
                        }`}
                      >
                        <div className="relative shrink-0">
                          <span
                            aria-hidden="true"
                            className={`absolute inset-0 rounded-full ${CLASES_COLOR[bebida.color].fondo} opacity-20 blur-xl transition-opacity duration-500 group-hover:opacity-40`}
                          />
                          <IlustracionBebida
                            tipo={bebida.ilustracion}
                            color={bebida.color}
                            className="relative h-24 w-24 transition-transform duration-500 group-hover:scale-105 sm:h-28 sm:w-28"
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <h3 className="font-alt text-[26px] uppercase leading-[1.05] tracking-[0.04em] text-crema sm:text-[28px]">
                            {bebida.nombre}
                          </h3>
                          <p className="mt-2 text-[13.5px] leading-relaxed text-crema/70">
                            {bebida.descripcion}
                          </p>
                          <Precios precios={bebida.precios} color={bebida.color} />
                        </div>

                        {destacado && (
                          <Chispa className="absolute right-4 top-4 h-5 w-5 animate-pulseGlow" color="rosa" />
                        )}
                      </article>
                    </Revelar>
                  )
                })}
              </div>

              <div className="mt-10 flex flex-col items-center gap-4 text-center">
                <p className="max-w-2xl text-[13px] leading-relaxed text-crema/55">
                  Coctelería, cantaritos, aguas frescas y malteadas también forman parte de la carta.
                  Consulta la lista completa en el menú.
                </p>
                <Boton href="#menu" variante="contorno">
                  Ver todas las bebidas
                </Boton>
                <p className="text-[11px] uppercase tracking-[0.16em] text-crema/40">
                  Venta de alcohol solo a mayores de 18 años · Los precios pueden cambiar sin previo
                  aviso
                </p>
              </div>
            </div>
          </div>
        </Revelar>
      </div>
    </Seccion>
  )
}
