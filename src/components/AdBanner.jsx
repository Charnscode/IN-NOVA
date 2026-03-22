import { useState, useEffect, useRef } from 'react'

export default function AdBanner({ initialSeconds = 5 }) {
  const [visible,  setVisible]  = useState(true)
  const [seconds,  setSeconds]  = useState(initialSeconds)
  const [canSkip,  setCanSkip]  = useState(false)
  const timerRef = useRef(null)

  useEffect(() => {
    if (!visible) return
    timerRef.current = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          clearInterval(timerRef.current)
          setCanSkip(true)
          return 0
        }
        return s - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [visible])

  if (!visible) return null

  const progress = ((initialSeconds - seconds) / initialSeconds) * 100

  return (
    <div
      role="region"
      aria-label="Espace publicitaire sponsorisé"
      className="mt-8 rounded-2xl overflow-hidden border border-white/8"
      style={{ background: 'linear-gradient(135deg, #0D1B38, #0A2561)' }}
    >
      <div className="h-1 bg-white/8" aria-hidden="true">
        <div
          className="h-full bg-[#F9A825] transition-all duration-1000"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5">
        
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div
            className="w-2.5 h-2.5 rounded-full bg-[#F9A825] shrink-0"
            style={{ animation: 'pulse-slow 2s ease-in-out infinite' }}
            aria-hidden="true"
          />
          <div className="min-w-0">
            <p className="text-white/45 text-xs uppercase tracking-wider font-bold mb-0.5">
              Publicité · {canSkip ? 'Vous pouvez passer' : `${seconds}s`}
            </p>
            <p className="text-white font-bold text-sm truncate">
              Sponsorisez votre marque sur In-NOVA
            </p>
            <p className="text-white/50 text-xs mt-0.5 hidden sm:block">
              Touchez 5 000 jeunes entrepreneurs d'Afrique de l'Ouest
            </p>
          </div>
        </div>

        
        <button
          onClick={() => canSkip && setVisible(false)}
          disabled={!canSkip}
          aria-label={canSkip ? "Passer la publicité" : `Attendre ${seconds} secondes`}
          className={[
            'shrink-0 text-sm font-black px-5 py-2.5 rounded-xl transition-all duration-200',
            canSkip
              ? 'bg-[#F9A825] hover:bg-[#F59E0B] text-slate-900 hover:-translate-y-0.5 hover:shadow-lg cursor-pointer'
              : 'bg-white/8 text-white/30 cursor-not-allowed',
          ].join(' ')}
        >
          {canSkip ? 'Passer l\'annonce ✕' : `Passer (${seconds}s)`}
        </button>
      </div>
    </div>
  )
}
