import { navegacionPie, redes, site } from '../data/site'
import { enlaceSeguro } from '../utils/enlaces'
import { recurso } from '../utils/recurso'
import IconoRed from './IconosRed'

export default function PieDePagina() {
  return <footer className="border-t border-white/15 bg-carbon2 py-10">
    <div className="contenedor">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <a href="#inicio" className="marca" aria-label="La Exuberancia: volver al inicio">
            <img src={recurso('assets/logo-exuberancia.webp')} alt="" width="820" height="820" loading="lazy" />
            <span>La Exuberancia<small>Restaurante mexicano</small></span>
          </a>
          <p className="mt-4 text-sm leading-relaxed text-crema/80">«{site.lema}»</p>
          <div className="mt-4 flex gap-2">{redes.map(red => {
            const url = enlaceSeguro(red.url)
            return url ? <a key={red.nombre} href={url} target="_blank" rel="noopener noreferrer" className="red-enlace !p-3" aria-label={red.nombre}><IconoRed tipo={red.icono} /></a> : null
          })}</div>
        </div>
        <nav aria-label="Pie de página">
          <p className="eyebrow">Explora</p>
          <ul className="mt-2 grid grid-cols-2">{navegacionPie.map(item => <li key={item.id}><a href={'#' + item.id} className="nav-enlace w-fit">{item.etiqueta}</a></li>)}</ul>
        </nav>
        <div>
          <p className="eyebrow">Horarios de servicio</p>
          <dl className="mt-4 space-y-3 text-sm">{site.horarios.map(h => <div key={h.dias}><dt className="text-crema/80">{h.dias}</dt><dd className="mt-1 text-amarillo">{h.horas}</dd></div>)}</dl>
          <a href="#inicio" className="nav-enlace mt-4 w-fit">Volver al inicio ↑</a>
        </div>
      </div>
      <div className="mt-8 flex flex-wrap justify-between gap-3 border-t border-white/15 pt-5 text-xs leading-relaxed text-crema/75">
        <p>Imágenes ilustrativas · Consulta precios y disponibilidad con tu mesero.</p>
        <p>{site.nombre}. Todos los derechos reservados.</p>
      </div>
    </div>
  </footer>
}
