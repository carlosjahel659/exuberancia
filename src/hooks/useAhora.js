import { useEffect, useState } from 'react'
import { ahoraEnCDMX } from '../data/horarios'

/**
 * Día y hora actuales en Ciudad de México, actualizados solos.
 * Si la URL trae una simulación (?dia=...&hora=...) el valor queda fijo,
 * para poder revisar el comportamiento de cualquier día sin tocar el reloj.
 */
export function useAhora(intervaloMs = 30000) {
  const [ahora, setAhora] = useState(() => ahoraEnCDMX())

  useEffect(() => {
    if (ahora.simulado) return undefined

    const actualizar = () => setAhora(ahoraEnCDMX())
    const id = setInterval(actualizar, intervaloMs)

    // Al volver a la pestaña, refresca de inmediato.
    document.addEventListener('visibilitychange', actualizar)
    return () => {
      clearInterval(id)
      document.removeEventListener('visibilitychange', actualizar)
    }
  }, [ahora.simulado, intervaloMs])

  return ahora
}
