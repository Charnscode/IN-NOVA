// src/components/StarRating.jsx
import { useState } from 'react'
import { Star } from 'lucide-react'

/** Affichage simple d'une note moyenne (lecture seule) */
export function StarDisplay({ note = 0, avis = 0, size = 13 }) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {[1, 2, 3, 4, 5].map(n => (
          <Star key={n} size={size}
            fill={n <= Math.round(note) ? '#F59E0B' : 'none'}
            color="#F59E0B" />
        ))}
      </div>
      {avis > 0 && <span className="text-slate-400 text-xs">({avis})</span>}
    </div>
  )
}

/** Selecteur d'etoiles interactif pour laisser un avis */
export function StarPicker({ value, onChange, size = 22 }) {
  const [hover, setHover] = useState(0)
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(n => (
        <button key={n} type="button"
          onClick={() => onChange(n)}
          onMouseEnter={() => setHover(n)}
          onMouseLeave={() => setHover(0)}
          className="transition-transform hover:scale-110">
          <Star size={size}
            fill={n <= (hover || value) ? '#F59E0B' : 'none'}
            color="#F59E0B" />
        </button>
      ))}
    </div>
  )
}
