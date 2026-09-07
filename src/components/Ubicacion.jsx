import { redes, site } from '../data/site'
import { enlaceSeguro } from '../utils/enlaces'
import IconoRed from './IconosRed'
import { Boton, Seccion, TituloSeccion } from './ui'

function Dato({ etiqueta, valor, href }) {
  const pendiente = !valor || valor.startsWith('[')
  const destino = enlaceSeguro(href)
  return <div className="dato-contacto"><dt className="eyebrow">{etiqueta}</dt><dd className="mt-2 break-words text-sm leading-relaxed text-crema/90">{pendiente ? <span className="text-crema/75">Por confirmar</span> : destino ? <a href={destino} className="inline-flex min-h-11 items-center underline decoration-turquesa/50 underline-offset-4" {...(destino.startsWith('https:') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{valor}</a> : valor}</dd></div>
}

export default function Ubicacion() {
  return <Seccion id="ubicacion">
    <div className="contenedor">
      <TituloSeccion kicker="Nos vemos a la mesa" titulo="Visítanos" descripcion="Estamos listos para recibirte. Llega, pregunta por la barbacoa y pide un cantarito." alineado="izquierda" />
      <div className="contacto-grid mt-9">
        <div id="contacto" className="tarjeta scroll-mt-24 p-6 sm:p-8">
          <h3 className="font-alt text-3xl">Contacto y ubicación</h3>
          <dl className="mt-3">
            <Dato etiqueta="Dirección" valor={site.direccion} />
            <Dato etiqueta="Teléfono" valor={site.telefono} href={'tel:' + site.telefono.replace(/\s/g, '')} />
          </dl>
          <div className="mt-5 flex flex-wrap gap-3"><Boton href={site.maps} variante="amarillo">Cómo llegar ↗</Boton><Boton href={site.whatsapp} variante="contorno">WhatsApp</Boton></div>
          {!enlaceSeguro(site.maps) && <p className="mt-4 text-xs leading-relaxed text-crema/75">Dirección y enlace de Google Maps por confirmar.</p>}
          {!enlaceSeguro(site.whatsapp) && <p className="mt-2 text-xs leading-relaxed text-crema/75">Contacto por WhatsApp por confirmar.</p>}
        </div>
        <div className="tarjeta p-6 sm:p-8">
          <h3 className="font-alt text-3xl">Haz tiempo para el buen comer</h3>
          <dl className="mt-5 space-y-4">{site.horarios.map(h => <div key={h.dias} className="flex flex-wrap justify-between gap-2 border-b border-white/10 pb-4 text-sm"><dt>{h.dias}</dt><dd className="text-amarillo">{h.horas}</dd></div>)}</dl>
          <p className="mt-5 text-xs text-crema/75">Horarios de Ciudad de México.</p>
          <div className="mt-6"><Boton href={site.resenas} variante="contorno">Dejar una reseña en Google</Boton>{!enlaceSeguro(site.resenas) && <p className="mt-3 text-xs text-crema/75">Enlace de reseñas por confirmar.</p>}</div>
        </div>
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-3"><p className="eyebrow mr-2">Sigue a La Exuberancia</p>{redes.map(red => {
        const url = enlaceSeguro(red.url)
        return url ? <a key={red.nombre} href={url} target="_blank" rel="noopener noreferrer" className="red-enlace"><IconoRed tipo={red.icono} />{red.nombre}</a> : <span key={red.nombre} className="red-enlace text-crema/75"><IconoRed tipo={red.icono} />{red.nombre} · por confirmar</span>
      })}</div>
    </div>
  </Seccion>
}
