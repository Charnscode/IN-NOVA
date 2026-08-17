// src/components/AdBanner.jsx
import { useState, useEffect } from 'react'

const ADS = [
  { id:1, titre:'Formation React + Django', desc:'Boostez vos compétences web avec nos formations certifiantes', bg:'#0A1F5C', accent:'#F9A825' },
  { id:2, titre:'Startup Weekend Cotonou',  desc:"48h pour transformer votre idée en entreprise. Inscrivez-vous !",  bg:'#2E7D32', accent:'#FFFFFF' },
  { id:3, titre:'Bourse Études France 2026',desc:'Plus de 200 bourses disponibles pour les étudiants africains.',    bg:'#7E22CE', accent:'#FDE68A' },
]

export default function AdBanner() {
  const [idx,     setIdx]     = useState(0)
  const [seconds, setSeconds] = useState(5)
  const [visible, setVisible] = useState(true)
  const ad = ADS[idx]

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(s => {
        if (s <= 1) {
          setIdx(i => (i + 1) % ADS.length)
          return 5
        }
        return s - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  if (!visible) return null

  return (
    <div className="rounded-2xl overflow-hidden relative transition-all duration-500"
      style={{ background: ad.bg, animation:'fadeIn 0.5s ease' }}>
      <div className="px-5 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-black"
            style={{ background: ad.accent, color: ad.bg }}>
            PUB
          </div>
          <div className="min-w-0">
            <p className="font-black text-white text-sm truncate">{ad.titre}</p>
            <p className="text-white/60 text-xs truncate">{ad.desc}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="w-7 h-7 rounded-full border-2 border-white/30 flex items-center justify-center text-white text-xs font-black">
            {seconds}
          </div>
          <button onClick={() => setVisible(false)}
            className="text-white/40 hover:text-white text-lg transition-colors"
            aria-label="Fermer la publicité">x</button>
        </div>
      </div>
      <div className="h-0.5 bg-white/10">
        <div className="h-full bg-white/40 transition-all duration-1000"
          style={{ width: ((5 - seconds) / 5 * 100) + '%' }} />
      </div>
    </div>
  )
}
