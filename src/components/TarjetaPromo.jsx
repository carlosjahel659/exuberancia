import { estadoPromo } from '../data/horarios'
import { PastillaEstado } from './EstadoDisponibilidad'
import { CLASES_COLOR, Filigrana, IconoPromo } from './Ornamentos'

/**
 * Tarjeta de promoción reutilizable (menú y sección de promociones).
 * Si la promoción declara sus propios días, se muestra su estado; las demás
 * se dejan tal cual, sin inventarles horarios.
 */
export default function TarjetaPromo({ promo, grande = false, ahora }) {
  const disponibilidad = ahora ? estadoPromo(promo.nombre, ahora) : null

  return (
    <article
      className={`tarjeta group flex h-full flex-col gap-3 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.06] ${
        grande ? 'sm:p-8' : ''
      }`}
    >
      <span
        aria-hidden="true"
        className={`absolute inset-x-0 top-0 h-[2px] ${CLASES_COLOR[promo.color].fondo} opacity-0 transition-opacity duration-500 group-hover:opacity-90`}
      />

      <IconoPromo
        tipo={promo.icono}
        color={promo.color}
        className={`transition-transform duration-500 group-hover:scale-110 ${grande ? 'h-12 w-12' : 'h-10 w-10'}`}
      />

      <h3
        className={`font-alt uppercase leading-[1.05] tracking-[0.05em] text-crema ${
          grande ? 'text-[30px] sm:text-[34px]' : 'text-2xl'
        }`}
      >
        {promo.nombre}
      </h3>

      <p className={`leading-relaxed text-crema/70 ${grande ? 'text-sm sm:text-base' : 'text-[13.5px]'}`}>
        {promo.texto}
      </p>

      {promo.detalle && (
        <p className={`font-alt text-sm uppercase tracking-[0.14em] ${CLASES_COLOR[promo.color].texto}`}>
          {promo.detalle}
        </p>
      )}

      {disponibilidad && (
        <PastillaEstado estado={disponibilidad.estado} tamano="chico" className="self-start" />
      )}

      {grande && (
        <Filigrana
          className="mt-4 h-12 w-48 opacity-70 animate-sway"
          color={promo.color === 'rosa' ? 'rosa' : 'turquesa'}
          acento="amarillo"
        />
      )}

      {promo.restricciones && (
        <p className="mt-auto pt-3 text-[11px] uppercase tracking-[0.12em] text-crema/40">
          Aplican restricciones
        </p>
      )}
    </article>
  )
}
