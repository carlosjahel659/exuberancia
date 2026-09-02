import { useEffect, useRef, useState } from 'react'

/**
 * Devuelve una ref y un booleano que se vuelve true la primera vez que el
 * elemento entra en pantalla. Si el usuario pidió menos movimiento, aparece
 * visible de inmediato.
 */
export function useRevelar({ margen = '0px 0px -12% 0px', umbral = 0.15 } = {}) {
  const ref = useRef(null)
  // En el prerenderizado no hay efectos ni IntersectionObserver: si arrancara
  // oculto, el HTML que leen los buscadores quedaría con opacity 0. En el
  // navegador el valor inicial sigue siendo false y la animación no cambia.
  const [visible, setVisible] = useState(() => typeof window === 'undefined')

  useEffect(() => {
    const nodo = ref.current
    if (!nodo) return

    const sinMovimiento =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

    if (sinMovimiento || typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }

    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          setVisible(true)
          observador.disconnect()
        }
      },
      { rootMargin: margen, threshold: umbral },
    )

    observador.observe(nodo)
    return () => observador.disconnect()
  }, [margen, umbral])

  return [ref, visible]
}

/** Marca la sección visible en el menú de navegación según el scroll. */
export function useSeccionActiva(ids, offset = 140) {
  const [activa, setActiva] = useState(ids[0])

  useEffect(() => {
    let pendiente = false

    const alScroll = () => {
      if (pendiente) return
      pendiente = true
      requestAnimationFrame(() => {
        pendiente = false
        let actual = ids[0]
        for (const id of ids) {
          const el = document.getElementById(id)
          if (el && el.getBoundingClientRect().top <= offset) actual = id
        }
        setActiva(actual)
      })
    }

    alScroll()
    window.addEventListener('scroll', alScroll, { passive: true })
    return () => window.removeEventListener('scroll', alScroll)
  }, [ids, offset])

  return activa
}
