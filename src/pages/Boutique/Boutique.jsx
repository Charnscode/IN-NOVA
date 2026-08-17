// src/pages/Boutique/Boutique.jsx
import { useState } from 'react'
import { ArrowLeft, Package, ShoppingBag, X, Eye } from 'lucide-react'
import Reveal from '../../components/Reveal'
import { StarDisplay, StarPicker } from '../../components/StarRating'
import { useToast } from '../../components/Toast'
import PaiementKKiaPay from '../../components/PaiementKKiaPay'

const CONFIG = {
  technova:  { nom:'TechNOVA',  logo:'/logos/technova.jpg',  couleur:'#0066CC', bg:'#EFF6FF' },
  agrinova:  { nom:'AgriNOVA',  logo:'/logos/agrinova.jpg',  couleur:'#15803D', bg:'#F0FDF4' },
  tradenova: { nom:'TradeNOVA', logo:'/logos/tradenova.jpg', couleur:'#7E22CE', bg:'#FDF4FF' },
  aquanova:  { nom:'AquaNOVA',  logo:'/logos/aquanova.jpg',  couleur:'#0369A1', bg:'#F0F9FF' },
}

// Catalogue par entreprise - Phase 2 : GET /api/boutiques/:id/produits/
const PRODUITS = {
  agrinova: [
    {
      id: 1, type: 'produit', nom: 'Œufs de poules',
      photo: '/images/produits/agrinova-oeufs.jpg',
      prix: null, quantiteMin: '5 plateaux', enStock: false,
      descLongue: "Œufs de poules frais, issus de l'élevage AgriNOVA. Vente en gros, réservée aux commandes d'au moins 5 plateaux. Idéal pour les revendeurs, restaurants et boulangeries.",
    },
    {
      id: 2, type: 'produit', nom: 'Asticots (vers) pour volailles',
      photo: '/images/produits/agrinova-asticots.jpg',
      prix: '600 FCFA / kg — 13 000 FCFA le sac de 25 kg', quantiteMin: '5 kg', enStock: false,
      descLongue: "Asticots séchés riches en protéines, utilisés comme complément alimentaire pour volailles. Favorisent une croissance rapide et une meilleure ponte. Disponibles au kilo ou en sac de 25 kg.",
    },
  ],
  technova: [
    {
      id: 1, type: 'app', nom: 'MÉDIROS',
      photo: '/images/produits/technova-mediros.jpg',
      desc: 'Application numérique de régulation du secteur médical.',
      descLongue: "MÉDIROS est une application développée par TechNOVA pour digitaliser et faciliter la régulation du secteur médical : gestion des établissements de santé, suivi réglementaire et mise en relation avec les autorités compétentes.",
    },
  ],
  tradenova: [],
  aquanova: [],
}

export default function Boutique({ entrepriseId, onNavigate }) {
  const c = CONFIG[entrepriseId] || CONFIG.technova
  const produits = PRODUITS[entrepriseId] || []
  const showToast = useToast()
  const [produitDetail,   setProduitDetail]   = useState(null)
  const [produitCommande, setProduitCommande] = useState(null)
  const [avisProduit,     setAvisProduit]     = useState(null)

  const commander = (p) => {
    if (p.enStock === false) { showToast('Stock non disponible'); return }
    setProduitCommande(p)
  }

  const voirApp = () => showToast('Disponible bientôt')

  return (
    <main className="min-h-screen bg-slate-50 pt-16">
      <header style={{ background:'linear-gradient(135deg, #0A1F5C 0%, ' + c.couleur + ' 100%)' }}
        className="py-10 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <button onClick={() => onNavigate('entreprises')}
            className="text-[#FCD603] hover:text-white text-sm font-bold mb-6 flex items-center gap-2 transition-colors">
            <ArrowLeft size={14} /> Retour aux entreprises
          </button>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl overflow-hidden flex-shrink-0" style={{ background:'rgba(255,255,255,0.15)' }}>
              <img src={c.logo} alt={c.nom} className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="font-black text-white text-2xl sm:text-3xl" style={{ fontFamily:'Arial, sans-serif' }}>
                Boutique {c.nom}
              </h1>
              <p className="text-white/70 text-sm mt-1">Produits et services proposés par {c.nom}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        {produits.length === 0 ? (
          <Reveal className="bg-white rounded-2xl p-10 border border-slate-100 text-center max-w-md mx-auto">
            <Package className="mx-auto mb-4" size={40} color={c.couleur} />
            <p className="font-black text-slate-800 mb-1">Aucun produit disponible pour le moment</p>
            <p className="text-slate-400 text-sm">{c.nom} prépare sa boutique. Revenez bientôt !</p>
          </Reveal>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {produits.map((p, i) => (
              <Reveal key={p.id} delay={i * 80}>
                <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 h-full flex flex-col group">
                  <button onClick={() => setProduitDetail(p)}
                    className="h-36 w-full flex items-center justify-center overflow-hidden" style={{ background:c.bg }}>
                    {p.photo
                      ? <img src={p.photo} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt={p.nom} />
                      : <Package color={c.couleur} size={30} />}
                  </button>
                  <div className="p-4 flex flex-col flex-1">
                    <button onClick={() => setProduitDetail(p)} className="text-left">
                      <p className="font-black text-slate-800 text-sm mb-1 hover:underline">{p.nom}</p>
                    </button>

                    {p.type === 'app' ? (
                      <>
                        <p className="text-slate-500 text-xs leading-relaxed mb-3 flex-1">{p.desc}</p>
                        <button onClick={voirApp}
                          className="w-full py-2.5 rounded-xl text-white font-bold text-sm transition-all hover:opacity-90 hover:shadow-md flex items-center justify-center gap-2"
                          style={{ background:c.couleur }}>
                          <Eye size={14} /> Voir
                        </button>
                      </>
                    ) : (
                      <>
                        <StarDisplay note={p.note || 0} avis={p.avis || 0} />
                        <p className="font-black text-sm my-2" style={{ color:c.couleur }}>
                          {p.prix || 'Prix sur demande'}
                        </p>
                        <p className="text-slate-400 text-[11px] mb-3">Commande minimum : {p.quantiteMin}</p>
                        <div className="flex gap-2 mt-auto">
                          <button onClick={() => commander(p)}
                            className={['flex-1 py-2.5 rounded-xl font-bold text-sm transition-all',
                              p.enStock === false ? 'bg-slate-100 text-slate-400' : 'text-white hover:opacity-90 hover:shadow-md'].join(' ')}
                            style={p.enStock === false ? {} : { background:c.couleur }}>
                            {p.enStock === false ? 'Stock non disponible' : 'Commander'}
                          </button>
                          <button onClick={() => setAvisProduit(p)}
                            className="px-3 py-2.5 rounded-xl border-2 border-slate-200 text-slate-500 hover:border-slate-300 transition-all">
                            <ShoppingBag size={14} />
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>

      {produitDetail && (
        <ProduitDetailModal produit={produitDetail} couleur={c.couleur} bg={c.bg}
          onClose={() => setProduitDetail(null)}
          onCommander={() => { setProduitDetail(null); commander(produitDetail) }}
          onVoirApp={() => { setProduitDetail(null); voirApp() }} />
      )}
      {produitCommande && (
        <CommandeModal produit={produitCommande} couleur={c.couleur}
          onClose={() => setProduitCommande(null)} />
      )}
      {avisProduit && (
        <AvisModal produit={avisProduit} couleur={c.couleur}
          onClose={() => setAvisProduit(null)} />
      )}
    </main>
  )
}

function ProduitDetailModal({ produit: p, couleur, bg, onClose, onCommander, onVoirApp }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background:'rgba(0,0,0,0.55)', animation:'fadeIn 0.25s ease' }} onClick={onClose}>
      <div className="bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
        style={{ animation:'fadeInUp 0.35s cubic-bezier(0.22,1,0.36,1)' }}
        onClick={e => e.stopPropagation()}>
        <div className="h-52 w-full relative" style={{ background:bg }}>
          {p.photo
            ? <img src={p.photo} alt={p.nom} className="w-full h-full object-cover" />
            : <div className="w-full h-full flex items-center justify-center"><Package color={couleur} size={40} /></div>}
          <button onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 hover:bg-white flex items-center justify-center">
            <X size={15} />
          </button>
        </div>
        <div className="p-6">
          <h2 className="font-black text-slate-900 text-xl mb-2">{p.nom}</h2>
          <p className="text-slate-600 text-sm leading-relaxed mb-5">{p.descLongue || p.desc}</p>

          {p.type === 'app' ? (
            <button onClick={onVoirApp}
              className="w-full py-3 rounded-xl text-white font-black text-sm transition-all hover:opacity-90 hover:shadow-md flex items-center justify-center gap-2"
              style={{ background:couleur }}>
              <Eye size={16} /> Voir
            </button>
          ) : (
            <>
              <div className="flex items-center justify-between mb-4">
                <p className="font-black text-lg" style={{ color:couleur }}>{p.prix || 'Prix sur demande'}</p>
                <StarDisplay note={p.note || 0} avis={p.avis || 0} />
              </div>
              <p className="text-slate-400 text-xs mb-4">Commande minimum : {p.quantiteMin}</p>
              <button onClick={onCommander}
                className={['w-full py-3 rounded-xl font-black text-sm transition-all',
                  p.enStock === false ? 'bg-slate-100 text-slate-400' : 'text-white hover:opacity-90 hover:shadow-md'].join(' ')}
                style={p.enStock === false ? {} : { background:couleur }}>
                {p.enStock === false ? 'Stock non disponible' : 'Commander'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

function CommandeModal({ produit, couleur, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background:'rgba(0,0,0,0.55)', animation:'fadeIn 0.25s ease' }} onClick={onClose}>
      <div className="bg-white w-full sm:max-w-sm rounded-t-3xl sm:rounded-2xl p-6 sm:p-8"
        style={{ animation:'fadeInUp 0.35s cubic-bezier(0.22,1,0.36,1)' }}
        onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-black text-slate-900 text-lg">Commander</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center"><X size={15} /></button>
        </div>
        <PaiementKKiaPay couleur={couleur}
          montantLabel={produit.prix ? `${produit.nom} — ${produit.prix}` : produit.nom} />
      </div>
    </div>
  )
}

function AvisModal({ produit, couleur, onClose }) {
  const [note, setNote] = useState(0)
  const [commentaire, setCommentaire] = useState('')
  const [envoye, setEnvoye] = useState(false)

  const envoyer = () => {
    if (note === 0) return
    setEnvoye(true)
    // TODO Phase 2 : POST /api/produits/:id/avis/ { note, commentaire }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background:'rgba(0,0,0,0.55)', animation:'fadeIn 0.25s ease' }} onClick={onClose}>
      <div className="bg-white w-full sm:max-w-sm rounded-t-3xl sm:rounded-2xl p-6 sm:p-8"
        style={{ animation:'fadeInUp 0.35s cubic-bezier(0.22,1,0.36,1)' }}
        onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-black text-slate-900 text-lg">Laisser un avis</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center"><X size={15} /></button>
        </div>
        {envoye ? (
          <div className="text-center py-6">
            <p className="font-black text-slate-800">Merci pour votre avis !</p>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-slate-500 text-sm">{produit.nom}</p>
            <StarPicker value={note} onChange={setNote} />
            <textarea value={commentaire} onChange={e => setCommentaire(e.target.value)}
              placeholder="Votre commentaire (optionnel)" rows={3}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm resize-none" />
            <button onClick={envoyer}
              className="w-full py-3 rounded-xl text-white font-black text-sm transition-all hover:opacity-90 hover:shadow-md"
              style={{ background:couleur }}>
              Envoyer mon avis
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
