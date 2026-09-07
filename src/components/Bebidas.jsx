import { bebidasBarril } from '../data/menu'
import { Boton, Revelar, Seccion } from './ui'
import { CLASES_COLOR, IlustracionBebida } from './Ornamentos'

function Medidas({ medidas }) {
  return (
    <ul className="mt-4 flex flex-wrap gap-2">
      {medidas.map((medida) => (
        <li key={medida} className="rounded-lg border border-white/15 px-2.5 py-1.5 text-xs leading-relaxed text-crema/85">
          {medida}
        </li>
      ))}
    </ul>
  )
}

export default function Bebidas() {
  return (
    <Seccion id="bebidas" aria-labelledby="bebidas-titulo">
      <div className="contenedor">
        <div className="rounded-3xl border border-turquesa/25 bg-carbon2 p-5 sm:p-8 lg:p-10">
          <header className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="eyebrow text-turquesa">De barril y bien frías</p>
              <h2 id="bebidas-titulo" className="section-heading mt-2 text-crema">Menú de bebidas</h2>
            </div>
            <Boton href="#categoria-bebidas" variante="contorno">Ver todas las bebidas</Boton>
          </header>

          <div className="mt-7 grid gap-4 md:grid-cols-2">
            {bebidasBarril.map((bebida, indice) => (
              <Revelar key={bebida.nombre} retraso={indice * 40} className="h-full">
                <article className={`tarjeta flex h-full min-w-0 flex-col p-5 ${bebida.destacado ? 'border-turquesa/35 bg-turquesa/[0.045]' : ''}`}>
                  <div className="flex items-center gap-4">
                    <div className={`shrink-0 rounded-2xl border p-2 ${CLASES_COLOR[bebida.color].borde}`}>
                      <IlustracionBebida tipo={bebida.ilustracion} color={bebida.color} className="h-12 w-12" />
                    </div>
                    <h3 className="min-w-0 font-alt text-2xl leading-tight tracking-wide text-crema">
                      {bebida.nombre}
                    </h3>
                  </div>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-crema/80">{bebida.descripcion}</p>
                  <Medidas medidas={bebida.medidas} />
                </article>
              </Revelar>
            ))}
          </div>

          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-crema/80">
            Coctelería, cantaritos, mezcalitas, botellas con servicio y bebidas sin alcohol
            también forman parte de la carta. Consulta la lista completa en el menú.
          </p>
          <p className="mt-3 text-xs leading-relaxed text-crema/75">
            Venta de alcohol solo a mayores de 18 años · Consulta precios y disponibilidad con tu mesero
          </p>
        </div>
      </div>
    </Seccion>
  )
}