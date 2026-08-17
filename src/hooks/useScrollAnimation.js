// src/hooks/useScrollAnimation.js
import { useState, useEffect, useRef } from 'react'

export function useInView(threshold = 0.1) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])

  return [ref, inView]
}

export function useCountUp(target, duration = 2000, inView = true) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    const match = String(target).match(/^(\d+)(.*)$/)
    if (!match) { setCount(target); return }
    const num    = parseInt(match[1], 10)
    const suffix = match[2] || ''
    const step   = Math.max(1, Math.ceil(num / (duration / 16)))
    let current  = 0
    const timer = setInterval(() => {
      current = Math.min(current + step, num)
      setCount(current + suffix)
      if (current >= num) clearInterval(timer)
    }, 16)
    return () => clearInterval(timer)
  }, [target, duration, inView])

  return count
}
