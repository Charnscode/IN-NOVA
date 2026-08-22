// src/pages/Admin/sections/Dashboard.jsx
import { useState } from 'react'
import {
  Store, Plus, Pencil, Trash2, X, Save, Camera, Briefcase, GraduationCap,
  Handshake, Package,
} from 'lucide-react'
import Reveal from '../../../components/Reveal'
import { PROFILS } from './Login'
import { lireImageUploadee } from '../../../utils/fichierImage'
import { sanitize } from '../../../utils/security'

import {
  getOpportunites, ajouterOpportunite, modifierOpportunite, supprimerOpportunite,
  STATS, TYPE_STYLES, TYPES,
} from '../../../data/opportunites'
import {
  getProgrammes, ajouterProgramme, modifierProgramme, supprimerProgramme, ICONES_PROGRAMMES,
} from '../../../pages/Programmes/Programmes'
import {
  getPartenaires, ajouterPartenaire, modifierPartenaire, supprimerPartenaire,
} from '../../../pages/Partenaires/Partenaires'
import {
  CONFIG_BOUTIQUES, getProduitsBoutique, ajouterProduitBoutique, modifierProduitBoutique, supprimerProduitBoutique,
} from '../../../pages/Boutique/Boutique'

export default function Dashboard({ profilId, onLogout }) {
  const profil = PROFILS.find(p => p.id === profilId) || PROFILS[0]
  const estInnova = profil.id === 'innova'
  const aUneBoutique = ['technova', 'agrinova', 'tradenova', 'aquanova'].includes(profil.id)

  const [, forceRefresh] = useState(0)
  const rafraichir = () => forceRefresh(n => n + 1)

  const OPPORTUNITES = getOpportunites()
  const oppsScopees = estInnova
    ? OPPORTUNITES
    : OPPORTUNITES.filter(o => o.org.toLowerCase().includes(profil.nom.toLowerCase()))

  const onglets = [
    { id:'apercu', label:'Aperçu' },
    ...(estInnova ? [
      { id:'opportunites', label:'Opportunités', Icon:Briefcase },
      { id:'programmes',   label:'Programmes',   Icon:GraduationCap },
      { id:'partenaires',  label:'Partenaires',  Icon:Handshake },
    ] : [
      { id:'opportunites', label:'Opportunités' },
    ]),
    ...(aUneBoutique ? [{ id:'boutique', label:'Ma boutique', Icon:Package }] : []),
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
        <div className="flex gap-2 mb-8 border-b border-slate-200 overflow-x-auto">
          {onglets.map(o => (
            <button key={o.id} onClick={() => setOnglet(o.id)}
              className={[
                'px-4 py-3 text-sm font-bold border-b-2 -mb-px transition-all whitespace-nowrap flex items-center gap-1.5',
                onglet === o.id ? 'text-slate-900' : 'border-transparent text-slate-400 hover:text-slate-600'
              ].join(' ')}
              style={onglet === o.id ? { borderColor: profil.couleur, color: profil.couleur } : {}}>
              {o.Icon && <o.Icon size={13} />} {o.label}
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
                  Modifications enregistrées dans ce navigateur &mdash; à connecter à l'API réelle en Phase 2.
                </p>
              </div>
            </Reveal>
          </div>
        )}

        {onglet === 'opportunites' && (
          estInnova
            ? <GestionOpportunites onChange={rafraichir} />
            : (
              <div className="space-y-3">
                {oppsScopees.length === 0 && (
                  <p className="text-slate-400 text-sm">Aucune opportunité publiée pour {profil.nom} pour le moment.</p>
                )}
                {oppsScopees.map((o, i) => {
                  const style = TYPE_STYLES[o.type] || { bg:'#F1F5F9', text:'#475569' }
                  return (
                    <Reveal key={o.id} delay={i * 60}>
                      <div className="bg-white rounded-2xl p-4 border border-slate-100 flex items-center gap-4 hover:shadow-md transition-all duration-300">
                        {o.photo && <img src={o.photo} alt={o.titre} className="w-14 h-14 rounded-xl object-cover flex-shrink-0" />}
                        <div className="flex-1 min-w-0">
                          <span className="text-[10px] font-black px-2 py-0.5 rounded-full" style={{ background:style.bg, color:style.text }}>{o.type}</span>
                          <p className="font-black text-sm text-slate-800 mt-1 truncate">{o.titre}</p>
                          <p className="text-slate-400 text-xs">{o.org} &middot; {o.lieu}</p>
                        </div>
                      </div>
                    </Reveal>
                  )
                })}
              </div>
            )
        )}

        {onglet === 'programmes'  && estInnova && <GestionProgrammes onChange={rafraichir} />}
        {onglet === 'partenaires' && estInnova && <GestionPartenaires onChange={rafraichir} />}
        {onglet === 'boutique'    && aUneBoutique && <GestionBoutique entrepriseId={profil.id} couleur={profil.couleur} onChange={rafraichir} />}

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

// ══════════════════════════ Opportunités ══════════════════════════
function GestionOpportunites({ onChange }) {
  const [liste, setListe] = useState(getOpportunites())
  const [edition, setEdition] = useState(null) // null | {} (nouveau) | objet existant

  const rafraichir = () => { setListe(getOpportunites()); onChange() }

  const supprimer = (id) => {
    if (!window.confirm('Supprimer cette opportunité ?')) return
    supprimerOpportunite(id)
    rafraichir()
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <p className="text-slate-500 text-xs">{liste.length} opportunité{liste.length > 1 ? 's' : ''} publiée{liste.length > 1 ? 's' : ''}</p>
        <button onClick={() => setEdition({})}
          className="flex items-center gap-1.5 bg-[#0066CC] hover:bg-[#004FA3] text-white font-black text-xs px-4 py-2.5 rounded-xl transition-all hover:-translate-y-0.5">
          <Plus size={14} /> Ajouter une opportunité
        </button>
      </div>

      <div className="space-y-3">
        {liste.map((o, i) => {
          const style = TYPE_STYLES[o.type] || { bg:'#F1F5F9', text:'#475569' }
          return (
            <Reveal key={o.id} delay={i * 50}>
              <div className="bg-white rounded-2xl p-4 border border-slate-100 flex items-center gap-4 hover:shadow-md transition-all duration-300">
                {o.photo && <img src={o.photo} alt={o.titre} className="w-14 h-14 rounded-xl object-cover flex-shrink-0" />}
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full" style={{ background:style.bg, color:style.text }}>{o.type}</span>
                  <p className="font-black text-sm text-slate-800 mt-1 truncate">{o.titre}</p>
                  <p className="text-slate-400 text-xs">{o.org} &middot; {o.lieu}</p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button onClick={() => setEdition(o)} className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100 transition-all"><Pencil size={14} /></button>
                  <button onClick={() => supprimer(o.id)} className="w-9 h-9 rounded-xl bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-100 transition-all"><Trash2 size={14} /></button>
                </div>
              </div>
            </Reveal>
          )
        })}
      </div>

      {edition && (
        <FormOpportunite donnees={edition} onClose={() => setEdition(null)} onSave={rafraichir} />
      )}
    </div>
  )
}

function FormOpportunite({ donnees, onClose, onSave }) {
  const estNouveau = !donnees.id
  const [form, setForm] = useState({
    type: donnees.type || 'Appel à projets', titre: donnees.titre || '', org: donnees.org || '',
    lieu: donnees.lieu || '', deadline: donnees.deadline || '', desc: donnees.desc || '',
    lien: donnees.lien || '', action: donnees.action || 'En savoir plus', extra: donnees.extra || '',
    photo: donnees.photo || null, epingle: donnees.epingle || false,
    date: donnees.date || "À l'instant", comp: donnees.comp || [],
  })
  const [erreurPhoto, setErreurPhoto] = useState('')

  const majPhoto = (file) => {
    lireImageUploadee(file, (b64) => setForm(f => ({ ...f, photo: b64 })), setErreurPhoto)
  }

  const enregistrer = () => {
    if (!form.titre.trim() || !form.org.trim()) return
    if (estNouveau) ajouterOpportunite(form)
    else modifierOpportunite(donnees.id, form)
    onSave()
    onClose()
  }

  return (
    <ModalFormulaire titre={estNouveau ? 'Nouvelle opportunité' : "Modifier l'opportunité"} onClose={onClose} onSave={enregistrer}>
      <ChampSelect label="Type" value={form.type} options={TYPES.filter(t => t !== 'Tous')}
        onChange={v => setForm(f => ({ ...f, type: v }))} />
      <Champ label="Titre" value={form.titre} onChange={v => setForm(f => ({ ...f, titre: sanitize(v) }))} />
      <Champ label="Organisation" value={form.org} onChange={v => setForm(f => ({ ...f, org: sanitize(v) }))} />
      <Champ label="Lieu" value={form.lieu} onChange={v => setForm(f => ({ ...f, lieu: sanitize(v) }))} />
      <Champ label="Description" value={form.desc} multiligne onChange={v => setForm(f => ({ ...f, desc: sanitize(v) }))} />
      <Champ label="Lien (site, mailto:, wa.me...)" value={form.lien} onChange={v => setForm(f => ({ ...f, lien: v }))} />
      <div className="grid grid-cols-2 gap-3">
        <Champ label="Date limite" value={form.deadline} onChange={v => setForm(f => ({ ...f, deadline: sanitize(v) }))} />
        <Champ label="Info complémentaire" value={form.extra} onChange={v => setForm(f => ({ ...f, extra: sanitize(v) }))} />
      </div>
      <Champ label="Texte du bouton" value={form.action} onChange={v => setForm(f => ({ ...f, action: sanitize(v) }))} />
      <ChampPhoto photo={form.photo} erreur={erreurPhoto} onChange={majPhoto} />
      <label className="flex items-center gap-2 text-xs font-bold text-slate-600">
        <input type="checkbox" checked={form.epingle} onChange={e => setForm(f => ({ ...f, epingle: e.target.checked }))} />
        Mettre à la une (page d'accueil)
      </label>
    </ModalFormulaire>
  )
}

// ══════════════════════════ Programmes ══════════════════════════
function GestionProgrammes({ onChange }) {
  const [liste, setListe] = useState(getProgrammes())
  const [edition, setEdition] = useState(null)

  const rafraichir = () => { setListe(getProgrammes()); onChange() }
  const supprimer = (id) => {
    if (!window.confirm('Supprimer ce programme ?')) return
    supprimerProgramme(id)
    rafraichir()
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <p className="text-slate-500 text-xs">{liste.length} programme{liste.length > 1 ? 's' : ''}</p>
        <button onClick={() => setEdition({})}
          className="flex items-center gap-1.5 bg-[#0066CC] hover:bg-[#004FA3] text-white font-black text-xs px-4 py-2.5 rounded-xl transition-all hover:-translate-y-0.5">
          <Plus size={14} /> Ajouter un programme
        </button>
      </div>

      <div className="space-y-3">
        {liste.map((p, i) => {
          const IconProg = ICONES_PROGRAMMES[p.icon] || GraduationCap
          return (
            <Reveal key={p.id} delay={i * 50}>
              <div className="bg-white rounded-2xl p-4 border border-slate-100 flex items-center gap-4 hover:shadow-md transition-all duration-300">
                <div className="w-12 h-12 rounded-xl overflow-hidden flex items-center justify-center flex-shrink-0" style={{ background: p.bg }}>
                  {p.affiche ? <img src={p.affiche} className="w-full h-full object-cover" /> : <IconProg size={20} color={p.couleur} />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-black text-sm text-slate-800 truncate">{p.titre}</p>
                  <p className="text-slate-400 text-xs">{p.realise ? 'Édition réalisée' : (p.inscriptionsOuvertes ? 'Inscriptions ouvertes' : 'Inscriptions fermées')}</p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button onClick={() => setEdition(p)} className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100 transition-all"><Pencil size={14} /></button>
                  <button onClick={() => supprimer(p.id)} className="w-9 h-9 rounded-xl bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-100 transition-all"><Trash2 size={14} /></button>
                </div>
              </div>
            </Reveal>
          )
        })}
      </div>

      {edition && <FormProgramme donnees={edition} onClose={() => setEdition(null)} onSave={rafraichir} />}
    </div>
  )
}

function FormProgramme({ donnees, onClose, onSave }) {
  const estNouveau = !donnees.id
  const [form, setForm] = useState({
    titre: donnees.titre || '', icon: donnees.icon || 'rocket', couleur: donnees.couleur || '#0066CC',
    bg: donnees.bg || '#EFF6FF', public: donnees.public || '', desc: donnees.desc || '',
    realise: donnees.realise || false, inscriptionsOuvertes: donnees.inscriptionsOuvertes || false,
    dateRealisee: donnees.dateRealisee || '', affiche: donnees.affiche || null,
    objectifs: donnees.objectifs || [], benefices: donnees.benefices || [],
  })
  const [erreurPhoto, setErreurPhoto] = useState('')

  const enregistrer = () => {
    if (!form.titre.trim()) return
    if (estNouveau) ajouterProgramme(form)
    else modifierProgramme(donnees.id, form)
    onSave()
    onClose()
  }

  return (
    <ModalFormulaire titre={estNouveau ? 'Nouveau programme' : 'Modifier le programme'} onClose={onClose} onSave={enregistrer}>
      <Champ label="Titre" value={form.titre} onChange={v => setForm(f => ({ ...f, titre: sanitize(v) }))} />
      <ChampSelect label="Icône" value={form.icon} options={Object.keys(ICONES_PROGRAMMES)}
        onChange={v => setForm(f => ({ ...f, icon: v }))} />
      <Champ label="Public visé" value={form.public} onChange={v => setForm(f => ({ ...f, public: sanitize(v) }))} />
      <Champ label="Description" value={form.desc} multiligne onChange={v => setForm(f => ({ ...f, desc: sanitize(v) }))} />
      <ChampPhoto label="Affiche du programme" photo={form.affiche} erreur={erreurPhoto}
        onChange={file => lireImageUploadee(file, (b64) => setForm(f => ({ ...f, affiche: b64 })), setErreurPhoto)} />
      <div className="grid grid-cols-2 gap-3">
        <label className="flex items-center gap-2 text-xs font-bold text-slate-600">
          <input type="checkbox" checked={form.realise} onChange={e => setForm(f => ({ ...f, realise: e.target.checked }))} />
          Édition déjà réalisée
        </label>
        <label className="flex items-center gap-2 text-xs font-bold text-slate-600">
          <input type="checkbox" checked={form.inscriptionsOuvertes} onChange={e => setForm(f => ({ ...f, inscriptionsOuvertes: e.target.checked }))} />
          Inscriptions ouvertes
        </label>
      </div>
      {form.realise && (
        <Champ label="Date de l'édition réalisée" value={form.dateRealisee} onChange={v => setForm(f => ({ ...f, dateRealisee: sanitize(v) }))} />
      )}
    </ModalFormulaire>
  )
}

// ══════════════════════════ Partenaires ══════════════════════════
function GestionPartenaires({ onChange }) {
  const [liste, setListe] = useState(getPartenaires())
  const [edition, setEdition] = useState(null)

  const rafraichir = () => { setListe(getPartenaires()); onChange() }
  const supprimer = (id) => {
    if (!window.confirm('Retirer ce partenaire ?')) return
    supprimerPartenaire(id)
    rafraichir()
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <p className="text-slate-500 text-xs">{liste.length} partenaire{liste.length > 1 ? 's' : ''}</p>
        <button onClick={() => setEdition({})}
          className="flex items-center gap-1.5 bg-[#0066CC] hover:bg-[#004FA3] text-white font-black text-xs px-4 py-2.5 rounded-xl transition-all hover:-translate-y-0.5">
          <Plus size={14} /> Ajouter un partenaire
        </button>
      </div>

      {liste.length === 0 && <p className="text-slate-400 text-sm">Aucun partenaire pour le moment.</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {liste.map((p, i) => (
          <Reveal key={p.nom + i} delay={i * 60}>
            <div className="bg-white rounded-2xl p-4 border border-slate-100 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-slate-50">
                {p.logo && <img src={p.logo} className="w-full h-full object-cover" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-black text-sm text-slate-800 truncate">{p.nom}</p>
                <p className="text-slate-400 text-xs truncate">{p.desc}</p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button onClick={() => setEdition(p)} className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100 transition-all"><Pencil size={14} /></button>
                <button onClick={() => supprimer(p.id)} className="w-9 h-9 rounded-xl bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-100 transition-all"><Trash2 size={14} /></button>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {edition && <FormPartenaire donnees={edition} onClose={() => setEdition(null)} onSave={rafraichir} />}
    </div>
  )
}

function FormPartenaire({ donnees, onClose, onSave }) {
  const estNouveau = !donnees.id
  const [form, setForm] = useState({ nom: donnees.nom || '', desc: donnees.desc || '', logo: donnees.logo || null })
  const [erreurPhoto, setErreurPhoto] = useState('')

  const enregistrer = () => {
    if (!form.nom.trim()) return
    if (estNouveau) ajouterPartenaire(form)
    else modifierPartenaire(donnees.id, form)
    onSave()
    onClose()
  }

  return (
    <ModalFormulaire titre={estNouveau ? 'Nouveau partenaire' : 'Modifier le partenaire'} onClose={onClose} onSave={enregistrer}>
      <Champ label="Nom du partenaire" value={form.nom} onChange={v => setForm(f => ({ ...f, nom: sanitize(v) }))} />
      <Champ label="Description courte" value={form.desc} onChange={v => setForm(f => ({ ...f, desc: sanitize(v) }))} />
      <ChampPhoto label="Logo" photo={form.logo} erreur={erreurPhoto}
        onChange={file => lireImageUploadee(file, (b64) => setForm(f => ({ ...f, logo: b64 })), setErreurPhoto)} />
    </ModalFormulaire>
  )
}

// ══════════════════════════ Boutique (leader d'entreprise) ═══════
function GestionBoutique({ entrepriseId, couleur, onChange }) {
  const [liste, setListe] = useState(getProduitsBoutique(entrepriseId))
  const [edition, setEdition] = useState(null)

  const rafraichir = () => { setListe(getProduitsBoutique(entrepriseId)); onChange() }
  const supprimer = (id) => {
    if (!window.confirm('Supprimer ce produit ?')) return
    supprimerProduitBoutique(entrepriseId, id)
    rafraichir()
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <p className="text-slate-500 text-xs">{liste.length} produit{liste.length > 1 ? 's' : ''} en ligne</p>
        <button onClick={() => setEdition({})}
          className="flex items-center gap-1.5 text-white font-black text-xs px-4 py-2.5 rounded-xl transition-all hover:-translate-y-0.5"
          style={{ background: couleur }}>
          <Plus size={14} /> Ajouter un produit
        </button>
      </div>

      {liste.length === 0 && <p className="text-slate-400 text-sm">Votre boutique est vide pour le moment.</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {liste.map((p, i) => (
          <Reveal key={p.id} delay={i * 60}>
            <div className="bg-white rounded-2xl p-4 border border-slate-100 flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-slate-50 flex items-center justify-center">
                {p.photo ? <img src={p.photo} className="w-full h-full object-cover" /> : <Package size={20} color={couleur} />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-black text-sm text-slate-800 truncate">{p.nom}</p>
                <p className="text-slate-400 text-xs">
                  {p.type === 'app' ? 'Application' : (p.enStock === false ? 'Stock non disponible' : (p.prix || 'Prix sur demande'))}
                </p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button onClick={() => setEdition(p)} className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100 transition-all"><Pencil size={14} /></button>
                <button onClick={() => supprimer(p.id)} className="w-9 h-9 rounded-xl bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-100 transition-all"><Trash2 size={14} /></button>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {edition && (
        <FormProduitBoutique entrepriseId={entrepriseId} couleur={couleur} donnees={edition}
          onClose={() => setEdition(null)} onSave={rafraichir} />
      )}
    </div>
  )
}

function FormProduitBoutique({ entrepriseId, couleur, donnees, onClose, onSave }) {
  const estNouveau = !donnees.id
  const [form, setForm] = useState({
    type: donnees.type || 'produit', nom: donnees.nom || '', prix: donnees.prix || '',
    quantiteMin: donnees.quantiteMin || '', enStock: donnees.enStock ?? true,
    desc: donnees.desc || '', descLongue: donnees.descLongue || '', photo: donnees.photo || null,
  })
  const [erreurPhoto, setErreurPhoto] = useState('')

  const enregistrer = () => {
    if (!form.nom.trim()) return
    if (estNouveau) ajouterProduitBoutique(entrepriseId, form)
    else modifierProduitBoutique(entrepriseId, donnees.id, form)
    onSave()
    onClose()
  }

  return (
    <ModalFormulaire titre={estNouveau ? 'Nouveau produit' : 'Modifier le produit'} onClose={onClose} onSave={enregistrer} couleur={couleur}>
      <ChampSelect label="Type" value={form.type} options={['produit', 'app']}
        onChange={v => setForm(f => ({ ...f, type: v }))} />
      <Champ label="Nom du produit" value={form.nom} onChange={v => setForm(f => ({ ...f, nom: sanitize(v) }))} />
      <ChampPhoto photo={form.photo} erreur={erreurPhoto}
        onChange={file => lireImageUploadee(file, (b64) => setForm(f => ({ ...f, photo: b64 })), setErreurPhoto)} />
      {form.type === 'produit' ? (
        <>
          <div className="grid grid-cols-2 gap-3">
            <Champ label="Prix" value={form.prix} onChange={v => setForm(f => ({ ...f, prix: sanitize(v) }))} />
            <Champ label="Quantité minimum" value={form.quantiteMin} onChange={v => setForm(f => ({ ...f, quantiteMin: sanitize(v) }))} />
          </div>
          <label className="flex items-center gap-2 text-xs font-bold text-slate-600">
            <input type="checkbox" checked={form.enStock} onChange={e => setForm(f => ({ ...f, enStock: e.target.checked }))} />
            Produit disponible (en stock)
          </label>
          <Champ label="Description détaillée" value={form.descLongue} multiligne onChange={v => setForm(f => ({ ...f, descLongue: sanitize(v) }))} />
        </>
      ) : (
        <Champ label="Description" value={form.desc} multiligne onChange={v => setForm(f => ({ ...f, desc: sanitize(v) }))} />
      )}
    </ModalFormulaire>
  )
}

// ══════════════════════════ Composants formulaire génériques ═══════
function ModalFormulaire({ titre, onClose, onSave, children, couleur = '#0066CC' }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background:'rgba(0,0,0,0.55)', animation:'fadeIn 0.25s ease' }} onClick={onClose}>
      <div className="bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8"
        style={{ animation:'fadeInUp 0.35s cubic-bezier(0.22,1,0.36,1)' }} onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-black text-slate-900 text-lg">{titre}</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center"><X size={15} /></button>
        </div>
        <div className="space-y-4">{children}</div>
        <button onClick={onSave}
          className="w-full mt-6 py-3 rounded-xl text-white font-black text-sm transition-all hover:opacity-90 hover:shadow-md flex items-center justify-center gap-2"
          style={{ background: couleur }}>
          <Save size={15} /> Enregistrer
        </button>
      </div>
    </div>
  )
}

function Champ({ label, value, onChange, multiligne }) {
  return (
    <div>
      <label className="block text-xs font-bold text-slate-600 mb-1">{label}</label>
      {multiligne ? (
        <textarea value={value} onChange={e => onChange(e.target.value)} rows={3} maxLength={800}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm resize-none" />
      ) : (
        <input value={value} onChange={e => onChange(e.target.value)} maxLength={200}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm" />
      )}
    </div>
  )
}

function ChampSelect({ label, value, options, onChange }) {
  return (
    <div>
      <label className="block text-xs font-bold text-slate-600 mb-1">{label}</label>
      <select value={value} onChange={e => onChange(e.target.value)}
        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm bg-white">
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  )
}

function ChampPhoto({ label = 'Photo', photo, erreur, onChange }) {
  return (
    <div>
      <label className="block text-xs font-bold text-slate-600 mb-1">{label}</label>
      <label className="cursor-pointer block">
        <div className={['w-full h-28 rounded-xl border-2 border-dashed flex items-center justify-center overflow-hidden transition-all',
          erreur ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-slate-50'].join(' ')}>
          {photo ? <img src={photo} className="w-full h-full object-cover" /> : <Camera size={20} className="text-slate-300" />}
        </div>
        <input type="file" accept="image/*" className="hidden" onChange={e => onChange(e.target.files[0])} />
      </label>
      {erreur && <p className="text-red-500 text-xs mt-1">{erreur}</p>}
    </div>
  )
}
