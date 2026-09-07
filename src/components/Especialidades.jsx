import { especialidades } from '../data/menu'
import { Boton, Etiqueta, Revelar, Seccion, TituloSeccion } from './ui'

/** Vitrina de la casa; la carta conserva los precios y presentaciones. */
export default function Especialidades() {
  return (
    <Seccion id="especialidades">
      <div className="contenedor">
        <TituloSeccion
          kicker="Especialidades"
          titulo="Exuberantes"
          descripcion="Lo que la casa sirve a lo grande: platillos generosos, tortillas hechas a mano y salsas preparadas al momento."
        />

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {especialidades.map((item, indice) => (
            <Revelar key={item.nombre} retraso={indice * 50} className="h-full">
              <article className="tarjeta flex h-full min-w-0 flex-col overflow-hidden">
                <div className="relative aspect-[4/3] border-b border-white/10 bg-carbon3 p-5">
                  <img
                    src={item.imagen}
                    alt={item.nombre}
                    loading="lazy"
                    decoding="async"
                    width="420"
                    height="420"
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <p className={`eyebrow ${item.color === 'rosa' ? 'text-rosaClaro' : item.color === 'amarillo' ? 'text-amarillo' : 'text-turquesa'}`}>
                    {item.kicker}
                  </p>
                  <h3 className="mt-2 font-alt text-3xl leading-tight tracking-wide text-crema">{item.nombre}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-crema/80">{item.texto}</p>
                  <div className="mt-5"><Etiqueta>{item.etiqueta}</Etiqueta></div>
                </div>
              </article>
            </Revelar>
          ))}
        </div>
        <div className="mt-7 flex justify-center">
          <Boton href="#menu" variante="fantasma">Ver en el menú</Boton>
        </div>
      </div>
    </Seccion>
  )
}