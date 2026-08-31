import { promociones } from '../data/menu'
import { site } from '../data/site'
import { useAhora } from '../hooks/useAhora'
import { Chispa, Divisor } from './Ornamentos'
import TarjetaPromo from './TarjetaPromo'
import { Revelar, Seccion, TituloSeccion } from './ui'

function Horarios() {
  return (
    <div className="tarjeta relative flex h-full flex-col overflow-hidden p-6 sm:p-8">
      <span aria-hidden="true" className="linea-degradada absolute inset-x-0 top-0 h-[2px]" />
      <Chispa className="absolute right-5 top-5 h-5 w-5 animate-pulseGlow" color="amarillo" />

      <p className="font-alt text-sm uppercase tracking-[0.34em] text-turquesa">Importante</p>
      <h3 className="titulo-display texto-neon mt-1 text-[clamp(2rem,6vw,2.75rem)]">Horarios</h3>

      <ul className="mt-6 space-y-4">
        {site.horarios.map((h) => (
          <li key={h.dias} className="border-b border-white/10 pb-4 last:border-0 last:pb-0">
            <p className="font-alt text-lg uppercase tracking-[0.14em] text-crema">{h.dias}</p>
            <p className="mt-1 font-display text-2xl text-amarillo sm:text-[28px]">{h.horas}</p>
          </li>
        ))}
      </ul>

      <Divisor className="my-6" />

      <div className="grid gap-3 sm:grid-cols-2">
        {site.tiempos.map((t) => (
          <div key={t.que} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <p className="font-alt text-[13px] uppercase tracking-[0.18em] text-turquesa">
              Preparación · {t.que}
            </p>
            <p className="mt-1 text-sm text-crema/80">{t.cuanto}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Promociones() {
  const ahora = useAhora()
  const [destacada, ...resto] = [
    ...promociones.filter((p) => p.destacado),
    ...promociones.filter((p) => !p.destacado),
  ]

  return (
    <Seccion id="promociones" className="scroll-mt-24">
      <div className="contenedor">
        <TituloSeccion
          kicker="Promos"
          titulo="Exuberantes"
          descripcion="Promociones vigentes, música en vivo y horarios de servicio."
          color="rosa"
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          <Revelar className="lg:col-span-2">
            <TarjetaPromo promo={destacada} grande ahora={ahora} />
          </Revelar>

          <Revelar retraso={80}>
            <Horarios />
          </Revelar>

          {resto.map((promo, i) => (
            <Revelar key={promo.nombre} retraso={120 + i * 70}>
              <TarjetaPromo promo={promo} ahora={ahora} />
            </Revelar>
          ))}
        </div>

        <p className="mt-10 text-center text-[12px] uppercase tracking-[0.14em] text-crema/40">
          Aplican restricciones · Promociones sujetas a disponibilidad
        </p>
      </div>
    </Seccion>
  )
}
