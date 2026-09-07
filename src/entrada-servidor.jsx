import { renderToString } from 'react-dom/server'
import App from './App.jsx'
import { datosEstructurados, datosPendientes, IMAGEN_SOCIAL, META, SITIO } from './data/seo'
import { menu, promocionesExuberantes } from './data/menu'
import { site } from './data/site'
import {
  catalogoPendiente,
  catalogoSinPrecio,
  esVisible,
  precioPendiente,
} from './utils/catalogo'

/**
 * La misma App se genera aquí y se hidrata en main.jsx. El primer render del
 * reloj no depende del día del build, de modo que el HTML permanece estable.
 */
export function render() {
  return {
    html: renderToString(<App />),
    jsonLd: datosEstructurados(),
    meta: { ...META, sitio: SITIO, imagen: IMAGEN_SOCIAL, nombre: site.nombre },
    pendientes: datosPendientes(),
    productosOcultos: catalogoPendiente(menu).filter((dato) => dato.tipo === 'producto'),
    preciosPendientes: catalogoSinPrecio(menu),
    promocionesPendientes: promocionesExuberantes
      .filter((promo) => esVisible(promo) && precioPendiente(promo))
      .map((promo) => promo.nombre),
    variantesOcultas: catalogoPendiente(menu).filter((dato) => dato.tipo === 'variante'),
  }
}
