// src/pages/Opportunites/Opportunites.jsx
import { useState, useEffect, useRef } from 'react'
import AdBanner from '../../components/AdBanner'
import { OPPORTUNITES, TYPES, TYPE_STYLES } from '../../data/opportunites'
import { sanitize, isValidEmail } from '../../utils/security'

export default function Opportunites() {
  const [filtre,  setFiltre]  = useState('Tous')
  const [search,  setSearch]  = useState('')
  const [email,   setEmail]   = useState('')
  const [subOk,   setSubOk]   = useState(false)
  const [subErr,  setSubErr]  = useState(false)
  const [modal,   setModal]   = useState(null)

  const resultats = OPPORTUNITES.filter((o) => {
    const matchType   = filtre === 'Tous' || o.type === filtre
    const q           = search.trim().toLowerCase()
    const matchSearch = !q ||
      o.titre.toLowerCase().includes(q) ||
      o.lieu.toLowerCase().includes(q)
    return matchType && matchSearch
  })

  const handleSubscribe = () => {
    const val = sanitize(email.trim())
    if (!isValidEmail(val)) { setSubErr(true); return }
    setSubErr(false)
    setSubOk(true)
    setEmail('')
  }

  useEffect(() => {
    document.body.style.overflow = modal ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [modal])

  return (
    <main id="main-content" className="min-h-screen bg-slate-50 pt-16">

      <header style={{ background: 'linear-gradient(135deg, #0A1F5C 0%, #0055BB 100%)' }}
        className="py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <span className="text-white/70 text-base">((.))</span>
            <h1 className="font-black text-white text-2xl sm:text-3xl"
              style={{ fontFamily: 'Arial, sans-serif' }}>
              In-NOVA COMM
            </h1>
          </div>
          <p className="text-white/55 text-sm mb-6">Opportunités et Communication</p>

          <div className="bg-white/10 border border-white/20 rounded-xl px-5 py-4 text-left mb-6
            text-white/80 text-sm leading-relaxed">
            In-NOVA COMM est la plateforme officielle de communication du Club. Elle centralise
            et diffuse toutes les opportunités professionnelles pour les jeunes : offres de
            stages, emplois, appels a projets, subventions et financements.
          </div>

          <div className="relative max-w-xl mx-auto">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              &#128269;
            </span>
            <input
              type="search"
              placeholder="Rechercher une opportunité..."
              value={search}
              onChange={(e) => setSearch(sanitize(e.target.value))}
              className="w-full pl-11 pr-4 py-3 rounded-xl border-0 bg-white text-sm
                text-slate-800 shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-400
                placeholder:text-slate-400"
              aria-label="Rechercher"
              maxLength={100}
            />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <div className="flex flex-wrap gap-2 mb-8" role="group">
          {TYPES.map((t) => {
            const actif = filtre === t
            const s     = TYPE_STYLES[t]
            const count = OPPORTUNITES.filter(o => o.type === t).length
            return (
              <button key={t} onClick={() => setFiltre(t)} aria-pressed={actif}
                className={[
                  'px-4 py-2 rounded-full text-xs font-bold border-2 transition-all duration-200 hover:-translate-y-0.5',
                  actif ? 'text-white border-transparent shadow-md' : 'bg-white text-slate-600 border-slate-200 hover:border-blue-400',
                ].join(' ')}
                style={actif ? { background: s ? s.text : '#0066CC' } : {}}
              >
                {t}{t !== 'Tous' && <span className="ml-1 opacity-50">({count})</span>}
              </button>
            )
          })}
          <span className="ml-auto self-center text-xs text-slate-400">
            {resultats.length} resultat{resultats.length > 1 ? 's' : ''}
          </span>
        </div>

        <div className="mb-8">
          <AdBanner />
        </div>

        <h2 className="font-black text-slate-800 text-xl mb-6"
          style={{ fontFamily: 'Arial, sans-serif' }}>
          Dernières opportunités
        </h2>

        {resultats.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-100">
            <div className="text-5xl mb-4">&#128269;</div>
            <p className="font-bold text-slate-600 mb-1">Aucune opportunité trouvée</p>
            <button onClick={() => { setFiltre('Tous'); setSearch('') }}
              className="text-blue-600 text-sm font-bold hover:underline mt-4 block mx-auto">
              Réinitialiser
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
            {resultats.map((opp) => (
              <OpportuniteCard key={opp.id} opp={opp} onOpen={() => setModal(opp)} />
            ))}
          </div>
        )}

        <section className="rounded-2xl p-8 text-center mb-4"
          style={{ background: '#EFF6FF', border: '1px solid #BFDBFE' }}>
          <h2 className="font-black text-blue-700 text-xl mb-2">
            Ne manquez aucune opportunité
          </h2>
          <p className="text-slate-500 text-sm mb-6">
            Recevez les dernieres offres dans votre boite mail.
          </p>
          {subOk ? (
            <div className="text-green-700 font-bold text-sm" role="alert">
              Inscription confirmée !
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Votre adresse email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setSubErr(false) }}
                onKeyDown={(e) => e.key === 'Enter' && handleSubscribe()}
                className={[
                  'flex-1 px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-600',
                  subErr ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-white',
                ].join(' ')}
                maxLength={150}
              />
              <button onClick={handleSubscribe}
                className="px-6 py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white
                  font-bold text-sm transition-all whitespace-nowrap">
                S'abonner
              </button>
            </div>
          )}
          {subErr && (
            <p className="text-red-500 text-xs mt-2" role="alert">Email invalide.</p>
          )}
        </section>

      </div>

      {modal && <OpportuniteModal opp={modal} onClose={() => setModal(null)} />}
    </main>
  )
}

function OpportuniteCard({ opp, onOpen }) {
  const s = TYPE_STYLES[opp.type] || { bg: '#F1F5F9', text: '#475569', border: '#475569' }

  return (
    <article
      className="bg-white rounded-2xl overflow-hidden border border-slate-100
        hover:shadow-xl hover:-translate-y-1 transition-all duration-300
        cursor-pointer flex flex-col group"
      style={{ borderTop: '3px solid ' + s.border }}
      onClick={onOpen}
      onKeyDown={(e) => e.key === 'Enter' && onOpen()}
      tabIndex={0}
      role="button"
      aria-label={opp.titre}
    >
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold px-3 py-1 rounded-full"
            style={{ background: s.bg, color: s.text }}>
            {opp.type}
          </span>
          <span className="text-slate-300 text-xs">{opp.date}</span>
        </div>

        <h3 className="font-black text-slate-800 text-base mb-2 leading-snug
          group-hover:text-blue-700 transition-colors">
          {opp.titre}
        </h3>

        <p className="text-slate-500 text-xs leading-relaxed mb-4 flex-1"
          style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {opp.org}
        </p>

        {(opp.deadline || opp.budget || opp.extra) && (
          <div className="flex flex-wrap gap-3 mb-3 text-xs text-slate-400">
            {opp.deadline && <span>Deadline: {opp.deadline}</span>}
            {opp.budget   && <span>{opp.budget}</span>}
            {opp.extra    && <span>{opp.extra}</span>}
          </div>
        )}

        <div className="text-xs text-slate-300 mb-4">{opp.lieu}</div>

        <button
          className="w-full py-2.5 rounded-xl text-sm font-bold text-white
            transition-all duration-200 hover:opacity-90"
          style={{ background: '#0066CC' }}
          onClick={(e) => { e.stopPropagation(); onOpen() }}
        >
          {opp.action}
        </button>
      </div>
    </article>
  )
}

function OpportuniteModal({ opp, onClose }) {
  const s        = TYPE_STYLES[opp.type] || { bg: '#F1F5F9', text: '#475569' }
  const closeRef = useRef(null)

  useEffect(() => {
    closeRef.current?.focus()
    const fn = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }}
      onClick={onClose} role="dialog" aria-modal="true">
      <div className="bg-white w-full sm:max-w-lg rounded-t-3xl sm:rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-center pt-3 pb-1 sm:hidden">
          <div className="w-10 h-1 bg-slate-200 rounded-full" />
        </div>
        <div className="p-6">
          <button ref={closeRef} onClick={onClose}
            className="float-right w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200
              flex items-center justify-center text-slate-500 text-sm"
            aria-label="Fermer">x</button>

          <span className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-4"
            style={{ background: s.bg, color: s.text }}>
            {opp.type}
          </span>

          <h2 className="font-black text-slate-900 text-xl mb-3">{opp.titre}</h2>

          <div className="flex flex-wrap gap-3 text-xs text-slate-400 mb-4">
            <span>{opp.lieu}</span>
            <span>{opp.date}</span>
            {opp.deadline && <span>Deadline : {opp.deadline}</span>}
            {opp.budget   && <span>{opp.budget}</span>}
          </div>

          <p className="text-slate-600 text-sm leading-relaxed mb-5">{opp.desc}</p>

          <div className="flex flex-wrap gap-2 mb-6">
            {opp.comp.map((c) => (
              <span key={c} className="text-xs bg-slate-50 border border-slate-100
                text-slate-500 px-3 py-1 rounded-full">{c}</span>
            ))}
          </div>

          <div className="flex gap-3">
            <button className="flex-1 py-3 rounded-xl bg-blue-700 hover:bg-blue-800
              text-white font-bold text-sm transition-all" onClick={onClose}>
              {opp.action}
            </button>
            <button onClick={onClose}
              className="px-5 py-3 rounded-xl border-2 border-slate-200 text-slate-500
                text-sm font-bold hover:bg-slate-50">
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
