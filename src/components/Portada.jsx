import { site } from '../data/site'
import { recurso } from '../utils/recurso'
import { Boton } from './ui'
import { Filigrana } from './Ornamentos'

export default function Portada() {
  return <section id="inicio" className="portada">
    <div className="contenedor portada-grid">
      <div className="portada-copy">
        <p className="eyebrow"><span className="marca-punto" />Restaurante mexicano familiar</p>
        <h1 className="portada-titulo">La <span>Exuberancia</span></h1>
        <p className="portada-lema">{site.titular}</p>
        <p className="portada-descripcion">{site.descripcion}</p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Boton href="#menu" variante="amarillo">Explorar el menú <span aria-hidden="true">↓</span></Boton>
          <Boton href={site.maps} variante="contorno">Cómo llegar</Boton>
        </div>
        <div className="portada-firma"><Filigrana className="h-9 w-20" /><span>«{site.lema}»</span></div>
      </div>
      <div className="portada-plato">
        <div className="plato-aro" aria-hidden="true" />
        <img src={recurso('assets/barbacoa.webp')} alt="Tacos de barbacoa servidos en plato de barro" width="360" height="360" fetchpriority="high" className="plato-imagen" />
        <div className="plato-sello"><span className="eyebrow">La tradición de la casa</span><p>Barbacoa</p><span>Todos los domingos</span></div>
      </div>
    </div>
  </section>
}
