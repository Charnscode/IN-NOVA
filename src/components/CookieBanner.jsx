// src/components/CookieBanner.jsx
import { useState } from 'react'
import { Cookie } from 'lucide-react'

// La demande de consentement s'affiche a chaque visite du site (pas de memorisation
// entre les sessions pour l'instant). Phase 2 : ne memoriser le choix que pour la
// duree de la session si besoin, sans persistance longue duree.
export default function CookieBanner({ onNavigate }) {
  const [visible, setVisible] = useState(true)

  const repondre = (valeur) => {
    setVisible(false)
    // TODO Phase 2 : n'activer les cookies analytiques/marketing que si valeur === 'accepte'
    void valeur
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[70] p-4 sm:p-5"
      style={{ animation:'fadeInUp 0.5s cubic-bezier(0.22,1,0.36,1)' }}>
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl border border-slate-200 p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <Cookie size={28} className="flex-shrink-0 animate-pulse-soft" color="#0066CC" />
        <p className="text-slate-600 text-xs sm:text-sm flex-1 leading-relaxed">
          Nous utilisons des cookies pour améliorer votre expérience sur le site In-NOVA et mesurer son audience.
          En poursuivant votre navigation, vous acceptez notre{' '}
          <button onClick={() => onNavigate('politique')} className="underline font-bold text-[#0066CC]">
            politique de confidentialité
          </button>.
        </p>
        <div className="flex gap-2 flex-shrink-0 w-full sm:w-auto">
          <button onClick={() => repondre('refuse')}
            className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border-2 border-slate-200 text-slate-500 text-xs font-bold hover:bg-slate-50 hover:-translate-y-0.5 transition-all">
            Refuser
          </button>
          <button onClick={() => repondre('accepte')}
            className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-[#0066CC] hover:bg-[#004FA3] text-white text-xs font-black transition-all hover:shadow-md hover:-translate-y-0.5">
            Accepter
          </button>
        </div>
      </div>
    </div>
  )
}
