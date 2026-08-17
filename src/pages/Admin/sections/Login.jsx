// src/pages/Admin/sections/Login.jsx
import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import Reveal from '../../../components/Reveal'
import { sanitize, isValidEmail } from '../../../utils/security'
import { validatePassword, passwordStrengthLabel } from '../../../utils/validatePassword'

export const PROFILS = [
  { id:'innova',   nom:'In-NOVA',   sousTitre:'Bureau général du Club', logo:'/logos/innova.jpg',   couleur:'#0066CC' },
  { id:'technova',  nom:'TechNOVA',  sousTitre:'Leader entreprise', logo:'/logos/technova.jpg',  couleur:'#0066CC' },
  { id:'agrinova',  nom:'AgriNOVA',  sousTitre:'Leader entreprise', logo:'/logos/agrinova.jpg',  couleur:'#15803D' },
  { id:'tradenova', nom:'TradeNOVA', sousTitre:'Leader entreprise', logo:'/logos/tradenova.jpg', couleur:'#7E22CE' },
  { id:'aquanova',  nom:'AquaNOVA',  sousTitre:'Leader entreprise', logo:'/logos/aquanova.jpg',  couleur:'#0369A1' },
]

export default function Login({ onSuccess }) {
  const [profil,   setProfil]   = useState(null)
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [errors,   setErrors]   = useState({})
  const [showPass, setShowPass] = useState(false)

  const pass = validatePassword(password)
  const strength = password ? passwordStrengthLabel(pass.score) : null

  const soumettre = (ev) => {
    ev.preventDefault()
    const err = {}
    if (!isValidEmail(email)) err.email = 'Email invalide'
    if (!password.trim())     err.password = 'Mot de passe requis'
    if (Object.keys(err).length > 0) { setErrors(err); return }
    // TODO Phase 2 : POST /api/admin/login/ { profil: profil.id, email, password }
    onSuccess(profil.id)
  }

  if (!profil) {
    return (
      <main className="min-h-screen bg-slate-50 pt-16 flex items-center justify-center px-4">
        <Reveal className="w-full max-w-2xl text-center">
          <h1 className="font-black text-[#001A4D] text-2xl mb-1" style={{ fontFamily:'Arial, sans-serif' }}>
            Espace Administration
          </h1>
          <p className="text-slate-400 text-xs mb-8">Choisissez votre profil pour continuer</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {PROFILS.map((p, i) => (
              <Reveal key={p.id} delay={i * 80}>
                <button onClick={() => setProfil(p)}
                  className="bg-white rounded-2xl p-5 border-2 border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 w-full h-full">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden mx-auto mb-3">
                    <img src={p.logo} alt={p.nom} className="w-full h-full object-cover" />
                  </div>
                  <p className="font-black text-sm text-slate-800">{p.nom}</p>
                  <p className="text-slate-400 text-[10px] mt-0.5">{p.sousTitre}</p>
                </button>
              </Reveal>
            ))}
          </div>
          <p className="text-slate-400 text-xs mt-8">Accès réservé aux 15 membres du Club In-NOVA.</p>
        </Reveal>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-slate-50 pt-16 flex items-center justify-center px-4">
      <Reveal className="w-full max-w-sm">
        <button onClick={() => setProfil(null)} className="text-slate-400 hover:text-slate-600 text-xs mb-4 flex items-center gap-1.5">
          <ArrowLeft size={13} /> Changer de profil
        </button>
        <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm animate-bounce-in">
          <div className="text-center mb-6">
            <img src={profil.logo} alt={profil.nom} className="h-14 w-14 rounded-xl object-cover mx-auto mb-4" />
            <h1 className="font-black text-[#001A4D] text-xl" style={{ fontFamily:'Arial, sans-serif' }}>
              {profil.nom}
            </h1>
            <p className="text-slate-400 text-xs mt-1">{profil.sousTitre}</p>
          </div>

          <form onSubmit={soumettre} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Email</label>
              <input type="email" value={email}
                onChange={e => { setEmail(sanitize(e.target.value)); setErrors(x => ({ ...x, email:'' })) }}
                placeholder={`${profil.id}@in-nova.org`} maxLength={150}
                className={['w-full px-4 py-3 rounded-xl border text-sm bg-white focus:outline-none focus:ring-2 transition-all',
                  errors.email ? 'border-red-400 bg-red-50' : 'border-slate-200'].join(' ')} />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Mot de passe</label>
              <div className="relative">
                <input type={showPass ? 'text' : 'password'} value={password}
                  onChange={e => { setPassword(e.target.value); setErrors(x => ({ ...x, password:'' })) }}
                  placeholder="********" maxLength={100}
                  className={['w-full px-4 py-3 pr-16 rounded-xl border text-sm bg-white focus:outline-none focus:ring-2 transition-all',
                    errors.password ? 'border-red-400 bg-red-50' : 'border-slate-200'].join(' ')} />
                <button type="button" onClick={() => setShowPass(s => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-[#0066CC]">
                  {showPass ? 'Cacher' : 'Voir'}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              {strength && (
                <p className="text-xs mt-1 font-bold" style={{ color: strength.color }}>
                  Solidité : {strength.label}
                </p>
              )}
            </div>

            <button type="submit"
              className="w-full py-3 rounded-xl text-white font-black text-sm transition-all hover:opacity-90 hover:shadow-md hover:-translate-y-0.5"
              style={{ background: profil.couleur }}>
              Se connecter
            </button>
          </form>
        </div>
      </Reveal>
    </main>
  )
}
