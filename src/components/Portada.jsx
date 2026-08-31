import { useEffect, useState } from 'react'
import { site } from '../data/site'
import { Agave, Chispa, Filigrana } from './Ornamentos'
import { Boton } from './ui'

/** Portada principal con entrada animada al cargar. */
export default function Portada() {
  const [listo, setListo] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setListo(true), 60)
    return () => clearTimeout(t)
  }, [])

  const entrada = (retraso) => ({
    className: `transition-all duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)] ${
      listo ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
    }`,
    style: { transitionDelay: `${retraso}ms` },
  })

  return (
    <section
      id="inicio"
      className="relative isolate overflow-hidden pb-16 pt-[92px] sm:pb-20 lg:pb-28 lg:pt-[128px]"
    >
      {/* Resplandores de fondo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-turquesa/20 blur-[110px]" />
        <div className="absolute -right-20 top-40 h-80 w-80 rounded-full bg-rosa/20 blur-[120px]" />
        <div className="absolute bottom-0 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-amarillo/10 blur-[120px]" />
      </div>

      <div className="contenedor grid items-center gap-12 lg:grid-cols-[1.05fr_.95fr] lg:gap-8">
        {/* Columna de texto */}
        <div className="relative text-center lg:text-left">
          <div {...entrada(0)}>
            <img
              src="/assets/logo-exuberancia.webp"
              alt="Logotipo de La Exuberancia"
              width="820"
              height="820"
              fetchPriority="high"
              className="mx-auto h-32 w-32 drop-shadow-[0_18px_36px_rgba(0,0,0,.85)] sm:h-40 sm:w-40 lg:mx-0 lg:h-44 lg:w-44"
            />
          </div>

          <div {...entrada(140)} className={`${entrada(140).className} mt-6`}>
            <p className="font-alt text-sm uppercase tracking-[0.42em] text-turquesa sm:text-base">
              Restaurante mexicano familiar
            </p>
          </div>

          <h1
            {...entrada(240)}
            className={`${entrada(240).className} titulo-display mt-3 text-[clamp(2.9rem,11vw,5.75rem)]`}
          >
            <span className="texto-neon block">Sabor que</span>
            <span className="block text-amarillo drop-shadow-[0_0_22px_rgba(240,179,35,.35)]">
              se vive
            </span>
            <span className="texto-neon-rosa block">a lo grande</span>
          </h1>

          <div {...entrada(360)} className={`${entrada(360).className} mt-5`}>
            <p className="mx-auto max-w-md font-alt text-lg uppercase tracking-[0.2em] text-crema/85 sm:text-xl lg:mx-0">
              «{site.lema}»
            </p>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-crema/65 sm:text-base lg:mx-0">
              {site.descripcion}
            </p>
          </div>

          <div
            {...entrada(480)}
            className={`${entrada(480).className} mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center lg:justify-start`}
          >
            <Boton href="#menu" variante="amarillo" brillo>
              Ver menú
            </Boton>
            <Boton href={site.maps} variante="contorno">
              Cómo llegar
            </Boton>
          </div>

          <Filigrana
            className="mx-auto mt-9 h-12 w-48 opacity-80 animate-sway lg:mx-0"
            color="turquesa"
            acento="rosa"
          />
        </div>

        {/* Producto protagonista */}
        <div {...entrada(320)} className={`${entrada(320).className} relative mx-auto w-full max-w-[520px]`}>
          <div className="relative aspect-square">
            {/* Aro de luz + agaves girando lentamente */}
            <div
              aria-hidden="true"
              className="absolute inset-[8%] rounded-full bg-[radial-gradient(circle,rgba(0,168,165,.35),transparent_62%)] blur-2xl"
            />
            <div aria-hidden="true" className="absolute inset-0 animate-spinSlow">
              <Agave className="absolute left-1/2 top-0 h-16 w-24 -translate-x-1/2 opacity-50" />
              <Agave className="absolute left-1/2 bottom-0 h-16 w-24 -translate-x-1/2 rotate-180 opacity-40" color="rosa" />
              <Agave className="absolute left-0 top-1/2 h-16 w-24 -translate-y-1/2 -rotate-90 opacity-40" color="naranja" />
              <Agave className="absolute right-0 top-1/2 h-16 w-24 -translate-y-1/2 rotate-90 opacity-50" color="amarillo" />
            </div>
            <div
              aria-hidden="true"
              className="absolute inset-[6%] rounded-full border border-white/10"
            />
            <div
              aria-hidden="true"
              className="absolute inset-[14%] rounded-full border border-dashed border-turquesa/25"
            />

            <img
              src="/assets/barbacoa.webp"
              alt="Tacos de barbacoa servidos en plato de barro"
              width="360"
              height="360"
              fetchPriority="high"
              className="sombra-plato absolute inset-[10%] h-[80%] w-[80%] animate-floaty object-contain"
            />

            <Chispa className="absolute right-[12%] top-[10%] h-6 w-6 animate-pulseGlow" />
            <Chispa className="absolute left-[8%] bottom-[18%] h-5 w-5 animate-pulseGlow" color="rosa" />
            <Chispa className="absolute left-[22%] top-[6%] h-4 w-4 animate-pulseGlow" color="turquesa" />
          </div>

          <div className="mx-auto mt-2 flex w-fit items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 backdrop-blur">
            <span className="h-2 w-2 shrink-0 rounded-full bg-rosa shadow-[0_0_12px_2px_rgba(229,0,88,.8)]" />
            <span className="font-alt text-sm uppercase tracking-[0.18em] text-crema/85">
              Barbacoa todos los domingos
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
