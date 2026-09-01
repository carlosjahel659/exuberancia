import { site } from '../data/site'
import { Agave, Chispa, Divisor, Filigrana } from './Ornamentos'
import { Boton, Revelar, Seccion } from './ui'
import { recurso } from '../utils/recurso'

const RASGOS = [
  {
    titulo: 'Tortillas hechas a mano',
    texto: 'Cada taco y cada pedido por kilo se acompaña de tortillas recién hechas.',
    color: 'amarillo',
  },
  {
    titulo: 'Barbacoa de fin de semana',
    texto: 'Sábado y domingo: pozole, pancita y carnitas. Barbacoa los domingos.',
    color: 'rosa',
  },
  {
    titulo: 'Música en vivo',
    texto: 'Viernes, sábado y domingo desde las 12:00 p.m., para toda la familia.',
    color: 'turquesa',
  },
]

export default function Nosotros() {
  return (
    <Seccion id="nosotros" className="scroll-mt-24">
      <div className="contenedor">
        <div className="relative grid items-center gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-16">
          {/* Marca */}
          <Revelar className="relative text-center lg:text-left">
            <div className="relative mx-auto w-fit lg:mx-0">
              <Agave
                aria-hidden="true"
                className="absolute -top-6 left-1/2 h-16 w-24 -translate-x-1/2 opacity-40 animate-sway"
              />
              <img
                src={recurso('assets/logo-wordmark.webp')}
                alt="La Exuberancia"
                loading="lazy"
                decoding="async"
                width="383"
                height="124"
                className="relative mx-auto w-[min(320px,80vw)] drop-shadow-[0_18px_30px_rgba(0,0,0,.8)] lg:mx-0"
              />
            </div>
            <Filigrana className="mx-auto mt-2 h-10 w-40 opacity-80 lg:mx-0" />
            <p className="mt-4 font-alt text-lg uppercase tracking-[0.2em] text-crema/80">
              «{site.lema}»
            </p>
          </Revelar>

          {/* Texto */}
          <div className="text-center lg:text-left">
            <Revelar>
              <p className="font-alt text-sm uppercase tracking-[0.42em] text-turquesa">Nosotros</p>
              <h2 className="titulo-display texto-neon mt-2 text-[clamp(2.2rem,7.5vw,3.75rem)]">
                Cocina mexicana <span className="text-amarillo">de verdad</span>
              </h2>
            </Revelar>

            <Revelar retraso={90}>
              <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-crema/70 sm:text-base lg:mx-0">
                En La Exuberancia servimos comida mexicana de todos los días con porciones
                generosas: desayunos que alcanzan para dos, entradas para compartir, barbacoa de fin
                de semana y bebidas para acompañar. Un restaurante familiar, colorido y con sabor de
                casa, donde nada se sirve a medias.
              </p>

              <Divisor className="mx-auto mt-8 max-w-sm lg:mx-0" />

              <ul className="mt-8 grid gap-4 sm:grid-cols-3">
                {RASGOS.map((r, i) => (
                  <li
                    key={r.titulo}
                    className="tarjeta group p-5 text-left transition-transform duration-500 hover:-translate-y-1"
                    style={{ transitionDelay: `${i * 40}ms` }}
                  >
                    <Chispa className="h-4 w-4" color={r.color} />
                    <p className="mt-3 font-alt text-lg uppercase leading-tight tracking-[0.06em] text-crema">
                      {r.titulo}
                    </p>
                    <p className="mt-2 text-[13px] leading-relaxed text-crema/65">{r.texto}</p>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
                <Boton href="#menu" variante="amarillo">
                  Ver menú
                </Boton>
                <Boton href={site.whatsapp} variante="contorno">
                  Escríbenos por WhatsApp
                </Boton>
              </div>
            </Revelar>
          </div>
        </div>
      </div>
    </Seccion>
  )
}
