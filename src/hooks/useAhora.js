import { useEffect, useState } from 'react'
import { ahoraEnCDMX } from '../data/horarios'

/**
 * El primer render no anuncia disponibilidad: es idéntico en servidor y cliente
 * para hidratar sin diferencias de reloj. El efecto resuelve la hora enseguida.
 */
export function useAhora(intervaloMs = 30000) {
  const [ahora, setAhora] = useState(null)

  useEffect(() => {
    let momento
    const actualizar = () => {
      momento = ahoraEnCDMX()
      setAhora(momento)
    }
    const alVolver = () => {
      if (document.visibilityState === 'visible' && !momento?.simulado) actualizar()
    }
    actualizar()
    const intervalo = Number.isFinite(intervaloMs) ? Math.max(1000, intervaloMs) : 30000
    const id = setInterval(() => {
      if (!momento?.simulado) actualizar()
    }, intervalo)

    // Una simulación permanece fija; Atrás/Adelante puede cambiar sus parámetros.
    document.addEventListener('visibilitychange', alVolver)
    window.addEventListener('popstate', actualizar)
    return () => {
      clearInterval(id)
      document.removeEventListener('visibilitychange', alVolver)
      window.removeEventListener('popstate', actualizar)
    }
  }, [intervaloMs])

  return ahora
}
