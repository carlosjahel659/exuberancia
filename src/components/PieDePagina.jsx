import { navegacion, PENDIENTE, redes, site } from '../data/site'
import IconoRed from './IconosRed'
import { Divisor, Filigrana } from './Ornamentos'

export default function PieDePagina() {
  const anio = new Date().getFullYear()

  return (
    <footer className="relative border-t border-white/10 bg-carbon/70">
      <div className="contenedor py-14 sm:py-16">
        <Divisor className="mb-12" />

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Marca */}
          <div className="text-center sm:col-span-2 sm:text-left lg:col-span-1">
            <img
              src="/assets/logo-exuberancia.webp"
              alt="La Exuberancia"
              loading="lazy"
              decoding="async"
              width="820"
              height="820"
              className="mx-auto h-24 w-24 drop-shadow-[0_12px_24px_rgba(0,0,0,.8)] sm:mx-0"
            />
            <p className="mt-4 font-alt text-base uppercase tracking-[0.18em] text-crema/80">
              «{site.lema}»
            </p>
            <Filigrana className="mx-auto mt-3 h-9 w-36 opacity-70 sm:mx-0" />
          </div>

          {/* Navegación */}
          <nav aria-label="Pie de página" className="text-center sm:text-left">
            <h3 className="font-alt text-[13px] uppercase tracking-[0.28em] text-turquesa">Sitio</h3>
            <ul className="mt-4 space-y-2.5">
              {navegacion.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="text-sm text-crema/70 transition-colors duration-300 hover:text-amarillo"
                  >
                    {item.etiqueta}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Horarios */}
          <div className="text-center sm:text-left">
            <h3 className="font-alt text-[13px] uppercase tracking-[0.28em] text-turquesa">
              Horarios
            </h3>
            <ul className="mt-4 space-y-3">
              {site.horarios.map((h) => (
                <li key={h.dias}>
                  <p className="text-sm text-crema/70">{h.dias}</p>
                  <p className="font-alt text-lg uppercase tracking-[0.08em] text-amarillo">
                    {h.horas}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div className="text-center sm:text-left">
            <h3 className="font-alt text-[13px] uppercase tracking-[0.28em] text-turquesa">
              Encuéntranos
            </h3>
            <address className="mt-4 space-y-2 text-sm not-italic text-crema/70">
              <p className={PENDIENTE(site.direccion) ? 'italic text-crema/45' : undefined}>
                {site.direccion}
              </p>
              <p>
                <a
                  href={PENDIENTE(site.telefono) ? undefined : `tel:${site.telefono}`}
                  className="transition-colors duration-300 hover:text-amarillo"
                >
                  {site.telefono}
                </a>
              </p>
            </address>

            <ul className="mt-5 flex justify-center gap-3 sm:justify-start">
              {redes.map((red) => {
                const pendiente = PENDIENTE(red.url)
                return (
                  <li key={red.nombre}>
                    <a
                      href={pendiente ? undefined : red.url}
                      {...(pendiente
                        ? { 'aria-disabled': 'true', role: 'link' }
                        : { target: '_blank', rel: 'noopener noreferrer' })}
                      aria-label={red.nombre}
                      title={pendiente ? `${red.nombre} — enlace por definir` : red.nombre}
                      className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 ${
                        pendiente
                          ? 'cursor-not-allowed border-white/10 text-crema/30'
                          : 'border-white/15 text-crema/80 hover:-translate-y-0.5 hover:border-turquesa hover:text-turquesa'
                      }`}
                    >
                      <IconoRed tipo={red.icono} className="h-4 w-4" />
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center">
          <p className="text-[12px] uppercase tracking-[0.14em] text-crema/45">
            Los precios pueden cambiar sin previo aviso · Imágenes ilustrativas
          </p>
          <p className="mt-2 text-[12px] text-crema/35">
            © {anio} {site.nombre}. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
