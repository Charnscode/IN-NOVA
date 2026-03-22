
import { useEffect, useRef, useState } from 'react'

/**
 * useScrollAnimation
 * Retourne une ref et un booléen `isVisible`
 * Quand l'élément entre dans le viewport → isVisible passe à true
 *
 * @param {Object} options
 * @param {number} options.threshold   - % visible avant déclenchement (0–1)
 * @param {string} options.rootMargin  - marge autour du viewport
 * @param {boolean} options.once       - déclenche une seule fois si la condition est vérifié
 */
export function useScrollAnimation({
  threshold  = 0.15,
  rootMargin = '0px 0px -40px 0px',
  once       = true,
} = {}) {
  const ref       = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return


    if (!window.IntersectionObserver) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once) observer.unobserve(el)
        } else if (!once) {
          setIsVisible(false)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin, once])

  return { ref, isVisible }
}

/**
 * Pour animer la liste des éléments avec stagger
 * Retourne un seul ref à poser sur le conteneur parent(comme sur Service Hydro B)
 */
export function useScrollAnimationList({
  threshold  = 0.1,
  rootMargin = '0px 0px -30px 0px',
} = {}) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || !window.IntersectionObserver) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin])

  return { ref, isVisible }
}
