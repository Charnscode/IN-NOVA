import { useState, useEffect, useRef } from 'react'
import { ENTREPRISES } from '../../data/entreprises'
import TradeNovaMarket from './TradeNovaMarket'
import { sanitize, isValidEmail } from '../../utils/security'

export default function Entreprises() {
  const [selected,    setSelected]    = useState(null)
  const [tradeMarket, setTradeMarket] = useState(false)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [selected, tradeMarket])

  if (tradeMarket) {
    return <TradeNovaMarket onBack={() => setTradeMarket(false)} />
  }

  if (selected) {
    return <EntrepriseDetail entreprise={selected} onBack={() => setSelected(null)} />
  }

  return (
    <main id="main-content" className="min-h-screen bg-slate-50 pt-16">
      <header style={{ background: 'linear-gradient(135deg, #0A1F5C 0%, #0055BB 100%)' }}
        className="py-12 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="font-black text-white text-3xl sm:text-4xl mb-3"
          style={{ fontFamily: 'Arial, sans-serif' }}>
          Entreprises In-NOVA
        </h1>
        <p className="text-white/70 text-sm max-w-xl mx-auto">
         Découvrez les 4 entreprises innovantes du Club In-NOVA.
        </p>
      </header>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {ENTREPRISES.map((e) => (
            <EntrepriseCard
              key={e.id}
              entreprise={e}
              onSelect={() => setSelected(e)}
              onTradeMarket={() => setTradeMarket(true)}
            />
          ))}
        </div>
      </section>
    </main>
  )
}

function EntrepriseCard({ entreprise: e, onSelect, onTradeMarket }) {
  return (
    <article
      className="bg-white rounded-2xl overflow-hidden border-2 hover:shadow-2xl
        hover:-translate-y-1 transition-all duration-300 group"
      style={{ borderColor: e.border }}
    >
      <div className="h-2" style={{ background: e.couleur }} />
      <div className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-xl overflow-hidden border-2 flex-shrink-0"
            style={{ borderColor: e.border }}>
            <img src={e.logo} alt={e.nom} className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="font-black text-xl" style={{ fontFamily: 'Arial, sans-serif', color: e.couleur }}>
              {e.nom}
            </h2>
            <p className="text-slate-500 text-xs">{e.slogan}</p>
          </div>
        </div>

        <div className="flex gap-3 mb-4">
          <span className="text-xs font-bold px-3 py-1 rounded-full"
            style={{ background: e.bg, color: e.couleur }}>{e.secteur}</span>
          <span className="text-xs text-slate-400 self-center">Depuis {e.fondee}</span>
        </div>

        <p className="text-slate-600 text-sm leading-relaxed mb-4"
          style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {e.mission}
        </p>

        <div className="flex flex-wrap gap-2 mb-5">
          {e.domaines.slice(0, 3).map((d) => (
            <span key={d} className="text-xs bg-slate-50 border border-slate-100 text-slate-500 px-2 py-1 rounded-full">
              {d}
            </span>
          ))}
        </div>

        {e.id === 'tradenova' ? (
          <div className="space-y-2">
            <button
              className="w-full py-3 rounded-xl text-sm font-bold text-white
                transition-all duration-200 hover:opacity-90 hover:shadow-md"
              style={{ background: e.couleur }}
              onClick={() => onSelect()}>
              Commander en Chine
            </button>
            <button
              className="w-full py-2.5 rounded-xl text-sm font-bold border-2
                transition-all duration-200 hover:shadow-md"
              style={{ borderColor: e.couleur, color: e.couleur, background: e.bg }}
              onClick={() => onTradeMarket()}>
              S'inscrire sur TradeNOVA Market
            </button>
          </div>
        ) : (
          <button
            className="w-full py-3 rounded-xl text-sm font-bold text-white
              transition-all duration-200 hover:opacity-90 hover:shadow-md"
            style={{ background: e.couleur }}
            onClick={() => onSelect()}>
            Découvrir {e.nom} &rarr;
          </button>
        )}
      </div>
    </article>
  )
}

function EntrepriseDetail({ entreprise: e, onBack }) {
  const [commande, setCommande] = useState(null)

  return (
    <main id="main-content" className="min-h-screen bg-slate-50 pt-16">
      <header style={{ background: 'linear-gradient(135deg, #0A1F5C 0%, ' + e.couleur + ' 100%)' }}
        className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <button onClick={onBack}
            className="text-white/70 hover:text-white text-sm mb-6 flex items-center gap-2">
            &larr; Retour aux entreprises
          </button>
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-white/30 flex-shrink-0">
              <img src={e.logo} alt={e.nom} className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="font-black text-white text-3xl sm:text-4xl"
                style={{ fontFamily: 'Arial, sans-serif' }}>{e.nom}</h1>
              <p className="text-white/70 text-sm mt-1">{e.slogan}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">

        <section className="bg-white rounded-2xl p-6 border border-slate-100">
          <h2 className="font-black text-xl mb-4" style={{ fontFamily: 'Arial, sans-serif', color: e.couleur }}>A propos</h2>
          <p className="text-slate-600 text-sm leading-relaxed mb-4">{e.mission}</p>
          <div className="flex flex-wrap gap-2">
            {e.domaines.map((d) => (
              <span key={d} className="text-xs font-bold px-3 py-1 rounded-full"
                style={{ background: e.bg, color: e.couleur }}>{d}</span>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-2xl p-6 border border-slate-100">
          <h2 className="font-black text-xl mb-6" style={{ fontFamily: 'Arial, sans-serif', color: e.couleur }}>Notre evolution</h2>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-100" />
            <div className="space-y-6">
              {e.timeline.map((t, i) => (
                <div key={i} className="flex gap-5 pl-2">
                  <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center
                    text-xs font-black text-white flex-shrink-0 relative z-10"
                    style={{ background: e.couleur, borderColor: e.couleur }}>{i + 1}</div>
                  <div className="pb-2">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-black px-2 py-0.5 rounded-full"
                        style={{ background: e.bg, color: e.couleur }}>{t.annee}</span>
                      <span className="font-bold text-slate-800 text-sm">{t.titre}</span>
                    </div>
                    <p className="text-slate-500 text-xs leading-relaxed">{t.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section>
          <h2 className="font-black text-xl mb-6" style={{ fontFamily: 'Arial, sans-serif', color: e.couleur }}>
            Services et Produits
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {e.produits.map((p) => (
              <div key={p.id} className="bg-white rounded-2xl p-5 border-2 hover:shadow-lg hover:-translate-y-0.5 transition-all"
                style={{ borderColor: e.border }}>
                <div className="flex items-start gap-4">
                  <span className="text-3xl flex-shrink-0" dangerouslySetInnerHTML={{ __html: p.icon }} />
                  <div className="flex-1">
                    <h3 className="font-black text-slate-800 text-sm mb-1">{p.nom}</h3>
                    <p className="text-slate-500 text-xs leading-relaxed mb-3">{p.desc}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-black text-sm" style={{ color: e.couleur }}>{p.prix}</span>
                      <button onClick={() => setCommande(p)}
                        className="text-xs font-bold px-4 py-2 rounded-xl text-white transition-all hover:opacity-90"
                        style={{ background: e.couleur }}>
                        Commander
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {commande && <CommandeModal produit={commande} entreprise={e} onClose={() => setCommande(null)} />}
    </main>
  )
}

//Modal commande
function CommandeModal({ produit, entreprise: e, onClose }) {
  const [form,   setForm]   = useState({ nom: '', email: '', tel: '', message: '' })
  const [ok,     setOk]     = useState(false)
  const [errors, setErrors] = useState({})
  const closeRef = useRef(null)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const fn = (ev) => ev.key === 'Escape' && onClose()
    window.addEventListener('keydown', fn)
    return () => { window.removeEventListener('keydown', fn); document.body.style.overflow = '' }
  }, [onClose])

  const validate = () => {
    const err = {}
    if (!form.nom.trim())           err.nom   = 'Nom requis'
    if (!isValidEmail(form.email))  err.email = 'Email invalide'
    if (!form.tel.trim())           err.tel   = 'Telephone requis'
    return err
  }

  const handleSubmit = () => {
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setOk(true)
  }

  const update = (field, val) => {
    setForm(f => ({ ...f, [field]: sanitize(val) }))
    setErrors(er => ({ ...er, [field]: '' }))
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
      onClick={onClose} role="dialog" aria-modal="true">
      <div className="bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-2xl shadow-2xl"
        onClick={(ev) => ev.stopPropagation()}>
        <div className="flex justify-center pt-3 pb-1 sm:hidden">
          <div className="w-10 h-1 bg-slate-200 rounded-full" />
        </div>
        <div className="p-6">
          <button ref={closeRef} onClick={onClose}
            className="float-right w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200
              flex items-center justify-center text-slate-500 text-sm">x</button>
          <h2 className="font-black text-slate-900 text-lg mb-1">Commander</h2>
          <p className="text-sm font-bold mb-5" style={{ color: e.couleur }}>
            {produit.nom} -- {produit.prix}
          </p>
          {ok ? (
            <div className="text-center py-6">
              <div className="text-4xl mb-3">&#10003;</div>
              <p className="font-black text-slate-800 mb-1">Demande envoyee !</p>
              <p className="text-slate-500 text-sm mb-4">L equipe {e.nom} vous contactera rapidement.</p>
              <button onClick={onClose}
                className="px-6 py-3 rounded-xl text-white font-bold text-sm"
                style={{ background: e.couleur }}>Fermer</button>
            </div>
          ) : (
            <div className="space-y-4">
              <InputField label="Nom complet" value={form.nom} error={errors.nom}
                placeholder="Votre nom" onChange={v => update('nom', v)} />
              <InputField label="Email" type="email" value={form.email} error={errors.email}
                placeholder="votre@email.com" onChange={v => update('email', v)} />
              <InputField label="Telephone" type="tel" value={form.tel} error={errors.tel}
                placeholder="+229 00 00 00 00" onChange={v => update('tel', v)} />
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Message (optionnel)</label>
                <textarea value={form.message} onChange={ev => update('message', ev.target.value)}
                  placeholder="Precisions sur votre commande..." rows={3} maxLength={500}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm
                    bg-white text-slate-800 focus:outline-none focus:ring-2 resize-none" />
              </div>
              <button onClick={handleSubmit}
                className="w-full py-3 rounded-xl text-white font-black text-sm
                  transition-all hover:opacity-90 hover:shadow-md hover:-translate-y-0.5"
                style={{ background: e.couleur }}>
                Envoyer la commande
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function InputField({ label, value, onChange, error, placeholder, type = 'text' }) {
  return (
    <div>
      <label className="block text-xs font-bold text-slate-600 mb-1">{label}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)}
        placeholder={placeholder} maxLength={150}
        className={['w-full px-4 py-3 rounded-xl border text-sm bg-white text-slate-800',
          'focus:outline-none focus:ring-2 transition-all',
          error ? 'border-red-400 bg-red-50' : 'border-slate-200'].join(' ')}
        aria-invalid={!!error} />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )
}
