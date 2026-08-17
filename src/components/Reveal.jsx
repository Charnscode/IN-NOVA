// src/components/Reveal.jsx
import { useInView } from '../hooks/useScrollAnimation'

/**
 * Enveloppe un bloc pour le faire apparaitre en fondu + glissement
 * des qu il entre dans le viewport. Anime une seule fois.
 */
export default function Reveal({ children, delay = 0, className = '', as: Tag = 'div', style = {} }) {
  const [ref, inView] = useInView(0.15)

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      {children}
    </Tag>
  )
}
