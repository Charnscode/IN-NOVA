import { useScrollAnimation } from '../../../hooks/useScrollAnimation'

export default function PresentationSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 })

  return (
    <section
      ref={ref}
      className="bg-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8"
      aria-labelledby="presentation-title"
    >
    </section>
  )
}
