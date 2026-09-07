import { useEffect, useRef, useState } from 'react'

/**
 * Anima una sola vez al entrar en pantalla, sin ocultar el HTML inicial.
 * La animación no afecta a la hidratación ni a la lectura sin JavaScript.
 */
export function useRevelar({ margen = '0px 0px -12% 0px', umbral = 0.15 } = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const nodo = ref.current
    if (!nodo) return

    const sinMovimiento =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

    if (sinMovimiento || typeof IntersectionObserver === 'undefined') {
      return
    }

    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          nodo.animate?.(
            [{ transform: 'translateY(8px)' }, { transform: 'translateY(0)' }],
            { duration: 300, easing: 'ease-out' },
          )
          observador.disconnect()
        }
      },
      { rootMargin: margen, threshold: umbral },
    )

    observador.observe(nodo)
    return () => observador.disconnect()
  }, [margen, umbral])

  return ref
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
