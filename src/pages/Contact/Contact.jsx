// src/pages/Contact/Contact.jsx
import { useState } from 'react'
import { Mail, MessageCircle, MapPin, Facebook } from 'lucide-react'
import Reveal from '../../components/Reveal'
import { sanitize, isValidEmail } from '../../utils/security'

const CONTACTS = [
  { Icon: Mail,            label: 'Email',        valeur: 'clubinnova08@gmail.com',   lien: 'mailto:clubinnova08@gmail.com' },
  { Icon: MessageCircle,   label: 'WhatsApp',      valeur: '+229 01 44 45 18 55',      lien: 'https://wa.me/2290144451855'   },
  { Icon: MapPin,          label: 'Localisation',  valeur: 'Abomey-Calavi, Bénin',     lien: null                            },
]

function TikTokIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M16.6 5.82c-1.02-.9-1.66-2.2-1.66-3.66h-3.14v13.7c0 1.6-1.3 2.9-2.9 2.9s-2.9-1.3-2.9-2.9 1.3-2.9 2.9-2.9c.29 0 .57.04.83.12V9.9a6.15 6.15 0 0 0-.83-.06c-3.36 0-6.08 2.72-6.08 6.08S5.34 22 8.7 22s6.08-2.72 6.08-6.08V9.01a8.15 8.15 0 0 0 4.78 1.53V7.4c-1.06 0-2.04-.32-2.86-.9-.03-.02-.07-.05-.1-.07 0 0 .06.05 0 0z"/>
    </svg>
  )
}

const RESEAUX = [
  { label:'Facebook', Icon: Facebook,   lien:'https://www.facebook.com/share/1DZgYShX62/?mibextid=wwXIfr', couleur:'#1877F2' },
  { label:'TikTok',   Icon: TikTokIcon, lien:'https://www.tiktok.com/@innova0307?_r=1&_t=ZG-98hNrcKEAk5',  couleur:'#000000' },
]

export default function Contact() {
  const [form,   setForm]   = useState({ nom:'', email:'', sujet:'', message:'' })
  const [errors, setErrors] = useState({})
  const [ok,     setOk]     = useState(false)

  const SUJETS = ['Question générale', 'Partenariat', 'Opportunité à soumettre', 'Programme', 'Autre']

  const update = (k, v) => {
    setForm(p => ({ ...p, [k]: sanitize(v) }))
    setErrors(p => ({ ...p, [k]: '' }))
  }

  const soumettre = () => {
    const err = {}
    if (!form.nom.trim())          err.nom     = 'Nom requis'
    if (!isValidEmail(form.email)) err.email   = 'Email invalide'
    if (!form.sujet)               err.sujet   = 'Choisissez un sujet'
    if (!form.message.trim())      err.message = 'Message requis'
    if (Object.keys(err).length > 0) { setErrors(err); return }
    setOk(true)
    // TODO Phase 2 : POST /api/contact/ { ...form }
    // + email automatique a clubinnova08@gmail.com
  }

  return (
    <main className="min-h-screen bg-slate-50 pt-16">

      <header style={{ background:'linear-gradient(135deg, #0A1F5C 0%, #0055BB 100%)' }}
        className="py-12 px-4 sm:px-6 text-center">
        <Reveal>
          <h1 className="font-black text-white text-3xl sm:text-4xl mb-3"
            style={{ fontFamily:'Arial, sans-serif' }}>
            Contactez-nous
          </h1>
          <p className="text-white/70 text-sm max-w-xl mx-auto">
            Une question, une idée de partenariat ou une opportunité à partager ? L'équipe In-NOVA vous répond dans les 24h.
          </p>
        </Reveal>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Infos contact */}
          <div className="space-y-5">
            <Reveal>
              <h2 className="font-black text-slate-900 text-xl" style={{ fontFamily:'Arial, sans-serif' }}>
                Nos coordonnées
              </h2>
            </Reveal>

            {CONTACTS.map((c, i) => (
              <Reveal key={i} delay={i * 70}>
                <div className="bg-white rounded-2xl p-5 border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                      <c.Icon size={18} color="#0066CC" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 mb-0.5">{c.label}</p>
                      {c.lien ? (
                        <a href={c.lien} className="font-bold text-[#0066CC] text-sm hover:underline"
                          target={c.lien.startsWith('mailto') ? '_self' : '_blank'}
                          rel="noopener noreferrer">
                          {c.valeur}
                        </a>
                      ) : (
                        <p className="font-bold text-slate-800 text-sm">{c.valeur}</p>
                      )}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}

            {/* Reseaux sociaux */}
            <Reveal className="bg-white rounded-2xl p-5 border border-slate-100">
              <p className="font-black text-slate-800 text-sm mb-3">Réseaux sociaux</p>
              <div className="flex gap-3">
                {RESEAUX.map((r, i) => (
                  <a key={i} href={r.lien} target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white transition-all hover:opacity-80 hover:-translate-y-0.5"
                    style={{ background: r.couleur }}
                    aria-label={r.label}>
                    <r.Icon size={16} />
                  </a>
                ))}
              </div>
            </Reveal>

            {/* Horaires */}
            <Reveal className="bg-white rounded-2xl p-5 border border-slate-100">
              <p className="font-black text-slate-800 text-sm mb-3">Horaires</p>
              <div className="space-y-1 text-xs text-slate-500">
                <div className="flex justify-between">
                  <span>Lundi - Vendredi</span>
                  <span className="font-bold">8h - 18h</span>
                </div>
                <div className="flex justify-between">
                  <span>Samedi</span>
                  <span className="font-bold">9h - 13h</span>
                </div>
                <div className="flex justify-between">
                  <span>Dimanche</span>
                  <span className="text-slate-300">Fermé</span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Formulaire */}
          <div className="lg:col-span-2">
            <Reveal delay={100} className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-100">
              <h2 className="font-black text-slate-900 text-xl mb-6" style={{ fontFamily:'Arial, sans-serif' }}>
                Envoyer un message
              </h2>

              {ok ? (
                <div className="text-center py-10">
                  <Mail className="mx-auto mb-4" size={56} color="#0066CC" />
                  <p className="font-black text-slate-800 text-xl mb-2">Message envoyé !</p>
                  <p className="text-slate-500 text-sm">
                    L'équipe In-NOVA vous répondra à <strong>{form.email}</strong> dans les 24h.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Champ label="Nom complet" value={form.nom} error={errors.nom}
                      ph="Votre nom" onChange={v => update('nom', v)} />
                    <Champ label="Email" type="email" value={form.email} error={errors.email}
                      ph="votre@email.com" onChange={v => update('email', v)} />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Sujet</label>
                    <select value={form.sujet}
                      onChange={e => { setForm(p => ({ ...p, sujet: e.target.value })); setErrors(p => ({ ...p, sujet:'' })) }}
                      className={['w-full px-4 py-3 rounded-xl border text-sm bg-white focus:outline-none focus:ring-2',
                        errors.sujet ? 'border-red-400' : 'border-slate-200'].join(' ')}>
                      <option value="">Choisissez un sujet...</option>
                      {SUJETS.map(s => <option key={s}>{s}</option>)}
                    </select>
                    {errors.sujet && <p className="text-red-500 text-xs mt-1">{errors.sujet}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Message</label>
                    <textarea value={form.message}
                      onChange={e => { setForm(p => ({ ...p, message: sanitize(e.target.value) })); setErrors(p => ({ ...p, message:'' })) }}
                      placeholder="Votre message..."
                      rows={6} maxLength={1000}
                      className={['w-full px-4 py-3 rounded-xl border text-sm bg-white focus:outline-none focus:ring-2 resize-none',
                        errors.message ? 'border-red-400' : 'border-slate-200'].join(' ')} />
                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                  </div>

                  <button onClick={soumettre}
                    className="w-full py-4 rounded-xl text-white font-black text-sm transition-all hover:opacity-90 hover:shadow-md hover:-translate-y-0.5"
                    style={{ background:'linear-gradient(135deg, #0A1F5C, #0055BB)' }}>
                    Envoyer le message
                  </button>
                  <p className="text-xs text-slate-400 text-center">
                    Votre message sera envoyé directement à clubinnova08@gmail.com
                  </p>
                </div>
              )}
            </Reveal>
          </div>
        </div>
      </div>
    </main>
  )
}

function Champ({ label, value, onChange, error, ph, type='text' }) {
  return (
    <div>
      <label className="block text-xs font-bold text-slate-600 mb-1">{label}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)}
        placeholder={ph} maxLength={200}
        className={['w-full px-4 py-3 rounded-xl border text-sm bg-white focus:outline-none focus:ring-2 transition-all',
          error ? 'border-red-400 bg-red-50' : 'border-slate-200'].join(' ')} />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )
}
