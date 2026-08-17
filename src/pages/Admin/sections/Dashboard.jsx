// src/pages/Admin/sections/Dashboard.jsx
import { useState } from 'react'
import { Store } from 'lucide-react'
import Reveal from '../../../components/Reveal'
import { OPPORTUNITES, STATS, TYPE_STYLES } from '../../../data/opportunites'
import { PROFILS } from './Login'

export default function Dashboard({ profilId, onLogout }) {
  const profil = PROFILS.find(p => p.id === profilId) || PROFILS[0]
  const estInnova = profil.id === 'innova'

  const oppsScopees = estInnova
    ? OPPORTUNITES
    : OPPORTUNITES.filter(o => o.org.toLowerCase().includes(profil.nom.toLowerCase()))

  const onglets = [
    { id:'apercu',       label:'Aperçu' },
    { id:'opportunites', label:'Opportunités' },
    ...(profil.id === 'tradenova' ? [{ id:'market', label:'TradeNOVA Market' }] : []),
  ]
  const [onglet, setOnglet] = useState('apercu')

  return (
    <main className="min-h-screen bg-slate-50 pt-16">
      <header style={{ background:`linear-gradient(135deg, #0A1F5C 0%, ${profil.couleur} 100%)` }}
        className="py-10 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-white/10">
              <img src={profil.logo} alt={profil.nom} className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="font-black text-white text-2xl sm:text-3xl" style={{ fontFamily:'Arial, sans-serif' }}>
                Tableau de bord {profil.nom}
              </h1>
              <p className="text-white/60 text-xs mt-1">
                {estInnova ? 'Espace réservé au bureau In-NOVA' : `Espace leader ${profil.nom}`}
              </p>
            </div>
          </div>
          <button onClick={onLogout}
            className="border-2 border-white/30 hover:border-white text-white font-bold text-xs px-4 py-2 rounded-xl transition-all">
            Se déconnecter
          </button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex gap-2 mb-8 border-b border-slate-200">
          {onglets.map(o => (
            <button key={o.id} onClick={() => setOnglet(o.id)}
              className={[
                'px-4 py-3 text-sm font-bold border-b-2 -mb-px transition-all',
                onglet === o.id ? 'text-slate-900' : 'border-transparent text-slate-400 hover:text-slate-600'
              ].join(' ')}
              style={onglet === o.id ? { borderColor: profil.couleur, color: profil.couleur } : {}}>
              {o.label}
            </button>
          ))}
        </div>

        {onglet === 'apercu' && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {estInnova ? (
              STATS.map((s, i) => (
                <Reveal key={i} delay={i * 80}>
                  <div className="bg-white rounded-2xl p-5 text-center border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                    <p className="font-black text-2xl mb-1" style={{ color: profil.couleur }}>{s.valeur}</p>
                    <p className="text-slate-500 text-xs font-bold">{s.label}</p>
                  </div>
                </Reveal>
              ))
            ) : (
              <Reveal className="col-span-2">
                <div className="bg-white rounded-2xl p-5 text-center border border-slate-100">
                  <p className="font-black text-2xl mb-1" style={{ color: profil.couleur }}>{oppsScopees.length}</p>
                  <p className="text-slate-500 text-xs font-bold">Opportunités {profil.nom}</p>
                </div>
              </Reveal>
            )}
            <Reveal delay={200} className="col-span-2 sm:col-span-4">
              <div className="bg-white rounded-2xl p-6 border border-slate-100">
                <p className="font-black text-slate-800 text-sm mb-1">
                  {oppsScopees.length} opportunité{oppsScopees.length > 1 ? 's' : ''} publiée{oppsScopees.length > 1 ? 's' : ''}
                  {estInnova ? ' au total' : ` pour ${profil.nom}`}
                </p>
                <p className="text-slate-400 text-xs">
                  Données statiques (démo) &mdash; à connecter à l'API en Phase 2.
                </p>
              </div>
            </Reveal>
          </div>
        )}

        {onglet === 'opportunites' && (
          <div className="space-y-3">
            {oppsScopees.length === 0 && (
              <p className="text-slate-400 text-sm">Aucune opportunité publiée pour {profil.nom} pour le moment.</p>
            )}
            {oppsScopees.map((o, i) => {
              const style = TYPE_STYLES[o.type] || { bg:'#F1F5F9', text:'#475569' }
              return (
                <Reveal key={o.id} delay={i * 60}>
                  <div className="bg-white rounded-2xl p-4 border border-slate-100 flex items-center gap-4 hover:shadow-md transition-all duration-300">
                    {o.photo && (
                      <img src={o.photo} alt={o.titre} className="w-14 h-14 rounded-xl object-cover flex-shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-full"
                        style={{ background:style.bg, color:style.text }}>
                        {o.type}
                      </span>
                      <p className="font-black text-sm text-slate-800 mt-1 truncate">{o.titre}</p>
                      <p className="text-slate-400 text-xs">{o.org} &middot; {o.lieu}</p>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        )}

        {onglet === 'market' && profil.id === 'tradenova' && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label:'Vendeurs inscrits', valeur:'—' },
              { label:'Acheteurs inscrits', valeur:'—' },
              { label:'Articles publiés', valeur:'—' },
            ].map((s, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="bg-white rounded-2xl p-5 text-center border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                  <p className="font-black text-2xl mb-1" style={{ color: profil.couleur }}>{s.valeur}</p>
                  <p className="text-slate-500 text-xs font-bold">{s.label}</p>
                </div>
              </Reveal>
            ))}
            <div className="col-span-1 sm:col-span-3 bg-white rounded-2xl p-6 border border-slate-100 flex items-center gap-3">
              <Store size={22} color={profil.couleur} />
              <p className="text-slate-500 text-xs">
                Les statistiques vendeurs/acheteurs de TradeNOVA Market seront disponibles ici une fois la marketplace connectée à l'API en Phase 2.
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
