import { especialidades } from '../data/menu'
import { Agave, Chispa, CLASES_COLOR, Filigrana } from './Ornamentos'
import { Boton, Etiqueta, Revelar, Seccion, TituloSeccion } from './ui'

/** Bloques grandes alternando fotografía y texto. */
export default function Especialidades() {
  return (
    <Seccion id="especialidades" className="scroll-mt-24">
      <div className="contenedor">
        <TituloSeccion
          kicker="Especialidades"
          titulo="Exuberantes"
          descripcion="Lo que la casa sirve a lo grande: platillos generosos, tortillas hechas a mano y salsas preparadas al momento."
        />

        <div className="mt-14 space-y-16 sm:space-y-20">
          {especialidades.map((item, i) => {
            const invertido = i % 2 === 1
            return (
              <Revelar key={item.nombre} retraso={60}>
                <article className="group grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
                  {/* Fotografía */}
                  <div className={`relative ${invertido ? 'lg:order-2' : ''}`}>
                    <div className="relative mx-auto aspect-square w-full max-w-[420px]">
                      <span
                        aria-hidden="true"
                        className={`absolute inset-[10%] rounded-full blur-2xl transition-opacity duration-700 group-hover:opacity-100 ${
                          item.color === 'rosa'
                            ? 'bg-rosa/30'
                            : item.color === 'amarillo'
                              ? 'bg-amarillo/25'
                              : 'bg-turquesa/30'
                        } opacity-70`}
                      />
                      <span
                        aria-hidden="true"
                        className="absolute inset-[4%] rounded-full border border-white/10"
                      />
                      <Agave
                        className={`absolute -top-2 left-1/2 h-14 w-20 -translate-x-1/2 opacity-50 transition-transform duration-700 group-hover:-translate-y-1 ${
                          invertido ? 'rotate-6' : '-rotate-6'
                        }`}
                        color={item.color === 'amarillo' ? 'naranja' : item.color}
                      />
                      <img
                        src={item.imagen}
                        alt={item.nombre}
                        loading="lazy"
                        decoding="async"
                        width="420"
                        height="420"
                        className="sombra-plato absolute inset-[8%] h-[84%] w-[84%] object-contain transition-transform duration-700 ease-out group-hover:scale-[1.06] group-hover:-rotate-1"
                      />
                      <Chispa
                        className="absolute right-[10%] top-[14%] h-5 w-5 animate-pulseGlow"
                        color={item.color === 'turquesa' ? 'amarillo' : 'turquesa'}
                      />
                    </div>
                  </div>

                  {/* Texto */}
                  <div className={`text-center lg:text-left ${invertido ? 'lg:order-1' : ''}`}>
                    <p
                      className={`font-alt text-sm uppercase tracking-[0.34em] ${CLASES_COLOR[item.color].texto}`}
                    >
                      {item.kicker}
                    </p>
                    <h3 className="titulo-display texto-neon mt-2 text-[clamp(2rem,6.5vw,3.25rem)]">
                      {item.nombre}
                    </h3>
                    <Filigrana
                      className="mx-auto mt-4 h-9 w-36 opacity-75 lg:mx-0"
                      color={item.color === 'amarillo' ? 'naranja' : item.color}
                    />
                    <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-crema/70 sm:text-base lg:mx-0">
                      {item.texto}
                    </p>

                    <div className="mt-6 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
                      <Etiqueta>{item.etiqueta}</Etiqueta>
                    </div>

                    <div className="mt-7 flex justify-center lg:justify-start">
                      <Boton href="#menu" variante="fantasma">
                        Ver en el menú
                      </Boton>
                    </div>
                  </div>
                </article>
              </Revelar>
            )
          })}
        </div>
      </div>
    </Seccion>
  )
}
