// src/components/PaiementKKiaPay.jsx
import { useState } from 'react'
import { Wallet, CheckCircle2 } from 'lucide-react'

/**
 * Bloc de paiement reutilisable (frontend uniquement pour l'instant).
 * Phase 2 : remplacer handlePayer par l'appel reel au widget KKiaPay
 * (https://kkiapay.me) - amount, key et callback de confirmation cote backend.
 */
export default function PaiementKKiaPay({ montantLabel, couleur = '#0066CC', onSuccess }) {
  const [numero, setNumero] = useState('')
  const [etape,  setEtape]  = useState('form') // form | ok

  const payer = () => {
    if (!numero.trim()) return
    // TODO Phase 2 : ouvrir le widget KKiaPay avec { amount, phone: numero }
    // puis confirmer la transaction via webhook backend avant de passer a l'etape ok
    setEtape('ok')
    onSuccess?.(numero)
  }

  if (etape === 'ok') {
    return (
      <div className="text-center py-6">
        <CheckCircle2 className="mx-auto mb-3" size={44} color={couleur} />
        <p className="font-black text-slate-800 mb-1">Paiement confirmé !</p>
        <p className="text-slate-400 text-xs">Une confirmation vous sera envoyée directement sur le site.</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {montantLabel && <p className="text-slate-500 text-sm">{montantLabel}</p>}
      <input value={numero} onChange={e => setNumero(e.target.value)}
        placeholder="Numéro de paiement Mobile Money"
        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm" />
      <button onClick={payer}
        className="w-full py-3 rounded-xl text-white font-black text-sm transition-all hover:opacity-90 hover:shadow-md flex items-center justify-center gap-2"
        style={{ background: couleur }}>
        <Wallet size={16} /> Payer avec KKiaPay
      </button>
      <p className="text-slate-400 text-xs text-center">Paiement sécurisé, disponible dès l'activation du backend.</p>
    </div>
  )
}
