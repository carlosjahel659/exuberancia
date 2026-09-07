import { estadoPromo } from '../data/horarios'
import { musicaEnVivo } from '../data/site'
import { useAhora } from '../hooks/useAhora'

export default function MusicaEnVivo() {
  const ahora = useAhora()
  const hoy = ahora && estadoPromo(musicaEnVivo.titulo, ahora)?.disponible
  return <div className="contenedor">
    <aside className="flex flex-wrap items-center gap-4 rounded-xl border border-rosa/30 bg-rosa/[0.06] px-5 py-4" aria-label="Música en vivo">
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="shrink-0 text-rosaClaro" aria-hidden="true"><path d="M9 18V5l11-2v13M9 9l11-2" /><circle cx="6" cy="18" r="3" /><circle cx="17" cy="16" r="3" /></svg>
      <p className="flex-1 text-sm leading-relaxed"><strong className="mr-3 text-rosaClaro">{musicaEnVivo.titulo}</strong>{musicaEnVivo.texto}</p>
      {hoy && <span className="etiqueta">Hoy hay música</span>}
    </aside>
  </div>
}
