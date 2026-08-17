// src/pages/TradeNovaMarket/TradeNovaMarket.jsx
import { useState } from 'react'
import {
  Store, ArrowLeft, UserRound, ShoppingBag, Camera, Mail, Phone, User, MapPin,
  LayoutDashboard, PlusCircle, Package, MessageCircle, Wallet, CreditCard,
  ShieldCheck, CheckCircle2, Send, X,
} from 'lucide-react'
import { sanitize, isValidEmail } from '../../utils/security'
import Reveal from '../../components/Reveal'
import PaiementKKiaPay from '../../components/PaiementKKiaPay'

const COULEUR = '#7E22CE'

const PRODUITS_DEMO = [
  { id: 1, photo: null, quantite: 12, prix: '2 500', article: 'Écouteurs sans fil', vendeur: 'Boutique Awa' },
  { id: 2, photo: null, quantite: 5,  prix: '15 000', article: 'Sac à dos imprimé', vendeur: 'Atelier Ken' },
  { id: 3, photo: null, quantite: 30, prix: '800',    article: 'Savon artisanal', vendeur: 'NatureShop' },
]

export default function TradeNovaMarket({ onNavigate }) {
  const [screen,   setScreen]   = useState('accueil') // accueil | choix | inscription-vendeur | inscription-acheteur | dashboard-vendeur | vue-acheteur
  const [vendeur,  setVendeur]  = useState(null)
  const [acheteur, setAcheteur] = useState(null)
  const [produits, setProduits] = useState(PRODUITS_DEMO)
  const [conversation, setConversation] = useState(null) // { vendeurNom, article }
  const [politiqueOuverte, setPolitiqueOuverte] = useState(false)

  return (
    <main className="min-h-screen bg-slate-50 pt-16 flex flex-col">
      <header style={{ background:'linear-gradient(135deg, #0A1F5C 0%, ' + COULEUR + ' 100%)' }}
        className="py-8 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4 flex-wrap">
          <button onClick={() => onNavigate('entreprises')}
            className="text-[#FCD603] hover:text-white text-sm font-bold flex items-center gap-2 transition-colors">
            <ArrowLeft size={14} /> Retour aux entreprises
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-white/15 flex items-center justify-center">
              <img src="/logos/tradenova.jpg" alt="TradeNOVA Market" className="w-full h-full object-cover" />
            </div>
            <span className="font-black text-white text-lg">TradeNOVA Market</span>
          </div>
          <div className="w-24 hidden sm:block" />
        </div>
      </header>

      <div className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-10">
        {screen === 'accueil' && (
          <Accueil onStart={() => setScreen('choix')} />
        )}

        {screen === 'choix' && (
          <ChoixProfil
            onVendeur={() => setScreen('inscription-vendeur')}
            onAcheteur={() => setScreen('inscription-acheteur')}
          />
        )}

        {screen === 'inscription-vendeur' && (
          <InscriptionVendeur
            onBack={() => setScreen('choix')}
            onDone={(data) => { setVendeur(data); setScreen('dashboard-vendeur') }}
          />
        )}

        {screen === 'inscription-acheteur' && (
          <InscriptionAcheteur
            onBack={() => setScreen('choix')}
            onDone={(data) => { setAcheteur(data); setScreen('vue-acheteur') }}
          />
        )}

        {screen === 'dashboard-vendeur' && vendeur && (
          <DashboardVendeur
            vendeur={vendeur}
            produits={produits.filter(p => p.vendeur === vendeur.nom)}
            onPublier={(article) => setProduits(p => [...p, { id: Date.now(), vendeur: vendeur.nom, ...article }])}
            onDeconnecter={() => { setVendeur(null); setScreen('accueil') }}
          />
        )}

        {screen === 'vue-acheteur' && acheteur && (
          <VueAcheteur
            acheteur={acheteur}
            produits={produits}
            conversation={conversation}
            onCommander={(p) => setConversation({ vendeurNom: p.vendeur, article: p.article })}
            onFermerConversation={() => setConversation(null)}
            onDeconnecter={() => { setAcheteur(null); setScreen('accueil') }}
          />
        )}
      </div>

      {/* Politique de confidentialite - toujours accessible en bas */}
      <footer className="border-t border-slate-200 bg-white py-4 px-4 sm:px-6 text-center">
        <button onClick={() => setPolitiqueOuverte(true)}
          className="text-slate-400 hover:text-slate-600 text-xs font-bold inline-flex items-center gap-1.5">
          <ShieldCheck size={13} /> Politique de confidentialité
        </button>
      </footer>

      {politiqueOuverte && <PolitiqueModal onClose={() => setPolitiqueOuverte(false)} />}
    </main>
  )
}

// ── Accueil ───────────────────────────────────────────────────
function Accueil({ onStart }) {
  return (
    <Reveal className="text-center max-w-xl mx-auto">
      <div className="w-16 h-16 rounded-2xl overflow-hidden mx-auto mb-6 animate-float-slow" style={{ background:'#FDF4FF' }}>
        <img src="/logos/tradenova.jpg" alt="TradeNOVA Market" className="w-full h-full object-cover" />
      </div>
      <h1 className="font-black text-[#001A4D] text-2xl sm:text-3xl mb-3" style={{ fontFamily:'Arial, sans-serif' }}>
        Achetez et vendez en toute simplicité
      </h1>
      <p className="text-slate-500 text-sm mb-8 leading-relaxed">
        TradeNOVA Market est la marketplace du Club In-NOVA. Publiez vos articles en tant que vendeur, ou parcourez
        les produits disponibles et commandez directement en tant qu'acheteur.
      </p>
      <button onClick={onStart}
        className="text-white font-black text-sm px-8 py-4 rounded-xl transition-all hover:opacity-90 hover:shadow-lg hover:-translate-y-0.5 inline-flex items-center gap-2"
        style={{ background: COULEUR }}>
        <UserRound size={18} /> S'inscrire
      </button>
    </Reveal>
  )
}

// ── Choix du profil ───────────────────────────────────────────
function ChoixProfil({ onVendeur, onAcheteur }) {
  return (
    <div className="max-w-2xl mx-auto text-center">
      <Reveal>
        <h2 className="font-black text-[#001A4D] text-2xl mb-2" style={{ fontFamily:'Arial, sans-serif' }}>
          Je m'inscris en tant que...
        </h2>
        <p className="text-slate-500 text-sm mb-8">Choisissez le profil qui correspond à votre besoin.</p>
      </Reveal>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Reveal delay={0}>
          <button onClick={onVendeur}
            className="bg-white rounded-2xl p-8 border-2 hover:shadow-md hover:-translate-y-1 transition-all duration-300 w-full h-full"
            style={{ borderColor:'#E9D5FF' }}>
            <Store className="mx-auto mb-4" size={36} color={COULEUR} />
            <p className="font-black text-slate-800 text-lg mb-1">Vendeur</p>
            <p className="text-slate-400 text-xs">Publiez vos articles et gérez vos ventes</p>
          </button>
        </Reveal>
        <Reveal delay={100}>
          <button onClick={onAcheteur}
            className="bg-white rounded-2xl p-8 border-2 hover:shadow-md hover:-translate-y-1 transition-all duration-300 w-full h-full"
            style={{ borderColor:'#E9D5FF' }}>
            <ShoppingBag className="mx-auto mb-4" size={36} color={COULEUR} />
            <p className="font-black text-slate-800 text-lg mb-1">Acheteur</p>
            <p className="text-slate-400 text-xs">Parcourez les produits et commandez</p>
          </button>
        </Reveal>
      </div>
    </div>
  )
}

// ── Inscription Vendeur ──────────────────────────────────────
function InscriptionVendeur({ onBack, onDone }) {
  const [form, setForm] = useState({
    nom:'', email:'', tel:'', photoId:null, lieuBoutique:'', rccm:'', ifu:'',
  })
  const [errors, setErrors] = useState({})

  const majPhoto = (file) => {
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setForm(f => ({ ...f, photoId: reader.result }))
    reader.readAsDataURL(file)
  }

  const soumettre = () => {
    const err = {}
    if (!form.nom.trim())          err.nom          = 'Nom complet requis'
    if (!isValidEmail(form.email)) err.email        = 'Email invalide'
    if (!form.tel.trim())          err.tel          = 'Numéro de téléphone requis'
    if (!form.photoId)             err.photoId      = "Photo de la carte d'identité requise"
    if (!form.lieuBoutique.trim()) err.lieuBoutique = 'Lieu de la boutique requis'
    if (!form.rccm.trim() && !form.ifu.trim()) {
      err.rccm = 'Renseignez au moins le RCCM ou le numéro IFU'
    }
    if (Object.keys(err).length > 0) { setErrors(err); return }
    onDone(form)
    // TODO Phase 2 : POST /api/tradenova/vendeurs/ { ...form }
    // + email automatique au vendeur : rappel de la commission de 10% prelevee sur chaque retrait
  }

  return (
    <div className="max-w-md mx-auto">
      <button onClick={onBack} className="text-slate-400 hover:text-slate-600 text-sm mb-6 flex items-center gap-2">
        <ArrowLeft size={14} /> Retour
      </button>
      <Reveal className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-100">
        <h2 className="font-black text-[#001A4D] text-xl mb-1">Inscription vendeur</h2>
        <p className="text-slate-400 text-xs mb-5">Toutes les informations ci-dessous sont nécessaires pour valider votre boutique.</p>

        <div className="rounded-xl px-4 py-3 mb-5 text-xs leading-relaxed" style={{ background:'#FDF4FF', color:'#7E22CE' }}>
          <strong>À savoir :</strong> une commission de 10% est prélevée sur chaque retrait d'argent effectué depuis votre compte vendeur.
        </div>

        <div className="space-y-4">
          <Champ label="Nom complet" icon={User} value={form.nom} error={errors.nom}
            ph="Votre nom complet" onChange={v => { setForm(f => ({ ...f, nom: sanitize(v) })); setErrors(x => ({ ...x, nom:'' })) }} />
          <Champ label="Email" icon={Mail} type="email" value={form.email} error={errors.email}
            ph="votre@email.com" onChange={v => { setForm(f => ({ ...f, email: v })); setErrors(x => ({ ...x, email:'' })) }} />
          <Champ label="Numéro de téléphone" icon={Phone} type="tel" value={form.tel} error={errors.tel}
            ph="+229 00 00 00 00" onChange={v => { setForm(f => ({ ...f, tel: v })); setErrors(x => ({ ...x, tel:'' })) }} />
          <Champ label="Lieu de la boutique" icon={MapPin} value={form.lieuBoutique} error={errors.lieuBoutique}
            ph="Ville, quartier..." onChange={v => { setForm(f => ({ ...f, lieuBoutique: sanitize(v) })); setErrors(x => ({ ...x, lieuBoutique:'' })) }} />

          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">Photo de la carte d'identité</label>
            <label className="cursor-pointer block">
              <div className={['w-full h-28 rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-1 overflow-hidden transition-all',
                errors.photoId ? 'border-red-400 bg-red-50' : 'border-purple-200 bg-purple-50'].join(' ')}>
                {form.photoId
                  ? <img src={form.photoId} className="w-full h-full object-cover" alt="Carte d'identité" />
                  : <><Camera size={20} color={COULEUR} /><span className="text-[11px] text-slate-400">Ajouter une photo</span></>}
              </div>
              <input type="file" accept="image/*" className="hidden" onChange={e => { majPhoto(e.target.files[0]); setErrors(x => ({ ...x, photoId:'' })) }} />
            </label>
            {errors.photoId && <p className="text-red-500 text-xs mt-1">{errors.photoId}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Champ label="RCCM" value={form.rccm} error={errors.rccm}
              ph="Optionnel" onChange={v => { setForm(f => ({ ...f, rccm: sanitize(v) })); setErrors(x => ({ ...x, rccm:'' })) }} />
            <Champ label="Numéro IFU" value={form.ifu}
              ph="Optionnel" onChange={v => { setForm(f => ({ ...f, ifu: sanitize(v) })); setErrors(x => ({ ...x, rccm:'' })) }} />
          </div>
          {errors.rccm && <p className="text-red-500 text-xs -mt-2">{errors.rccm}</p>}

          <button onClick={soumettre}
            className="w-full py-3.5 rounded-xl text-white font-black text-sm transition-all hover:opacity-90 hover:shadow-md hover:-translate-y-0.5"
            style={{ background: COULEUR }}>
            Créer mon compte vendeur
          </button>
        </div>
      </Reveal>
    </div>
  )
}

// ── Inscription Acheteur ─────────────────────────────────────
function InscriptionAcheteur({ onBack, onDone }) {
  const [form, setForm] = useState({ email:'', tel:'', nom:'' })
  const [errors, setErrors] = useState({})

  const soumettre = () => {
    const err = {}
    if (!isValidEmail(form.email)) err.email = 'Email invalide'
    if (!form.tel.trim())          err.tel   = 'Numéro de téléphone requis'
    if (!form.nom.trim())          err.nom   = 'Nom et prénom requis'
    if (Object.keys(err).length > 0) { setErrors(err); return }
    onDone(form)
    // TODO Phase 2 : POST /api/tradenova/acheteurs/ { ...form }
  }

  return (
    <div className="max-w-md mx-auto">
      <button onClick={onBack} className="text-slate-400 hover:text-slate-600 text-sm mb-6 flex items-center gap-2">
        <ArrowLeft size={14} /> Retour
      </button>
      <Reveal className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-100">
        <h2 className="font-black text-[#001A4D] text-xl mb-1">Inscription acheteur</h2>
        <p className="text-slate-400 text-xs mb-6">Renseignez vos informations pour commencer à acheter.</p>

        <div className="space-y-4">
          <Champ label="Email" icon={Mail} type="email" value={form.email} error={errors.email}
            ph="votre@email.com" onChange={v => { setForm(f => ({ ...f, email: v })); setErrors(x => ({ ...x, email:'' })) }} />
          <Champ label="Numéro de téléphone" icon={Phone} type="tel" value={form.tel} error={errors.tel}
            ph="+229 00 00 00 00" onChange={v => { setForm(f => ({ ...f, tel: v })); setErrors(x => ({ ...x, tel:'' })) }} />
          <Champ label="Nom et prénom" icon={User} value={form.nom} error={errors.nom}
            ph="Votre nom complet" onChange={v => { setForm(f => ({ ...f, nom: sanitize(v) })); setErrors(x => ({ ...x, nom:'' })) }} />
          <button onClick={soumettre}
            className="w-full py-3.5 rounded-xl text-white font-black text-sm transition-all hover:opacity-90 hover:shadow-md hover:-translate-y-0.5"
            style={{ background: COULEUR }}>
            Créer mon compte acheteur
          </button>
        </div>
      </Reveal>
    </div>
  )
}

// ── Dashboard Vendeur ─────────────────────────────────────────
function DashboardVendeur({ vendeur, produits, onPublier, onDeconnecter }) {
  const [tab, setTab] = useState('publier')
  const TABS = [
    { id:'publier',    label:'Publier',   Icon:PlusCircle },
    { id:'articles',   label:'Mes articles', Icon:Package },
    { id:'messagerie', label:'Messagerie', Icon:MessageCircle },
    { id:'retrait',    label:'Retrait',   Icon:Wallet },
    { id:'achat',      label:'Achat',     Icon:CreditCard },
  ]

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-full bg-purple-50 overflow-hidden flex items-center justify-center flex-shrink-0">
          {vendeur.photo ? <img src={vendeur.photo} className="w-full h-full object-cover" /> : <UserRound color={COULEUR} />}
        </div>
        <div className="flex-1">
          <p className="font-black text-slate-800 text-sm">{vendeur.nom}</p>
          <p className="text-slate-400 text-xs flex items-center gap-1"><LayoutDashboard size={12} /> Tableau de bord vendeur</p>
        </div>
        <button onClick={onDeconnecter} className="text-slate-400 hover:text-red-500 text-xs font-bold">Déconnexion</button>
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={['flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all border-2',
              tab === t.id ? 'text-white border-transparent' : 'bg-white text-slate-600 border-slate-200'].join(' ')}
            style={tab === t.id ? { background: COULEUR } : {}}>
            <t.Icon size={13} /> {t.label}
          </button>
        ))}
      </div>

      {tab === 'publier'    && <PublierArticle onPublier={onPublier} />}
      {tab === 'articles'   && <MesArticles produits={produits} />}
      {tab === 'messagerie' && <MessagerieVendeur />}
      {tab === 'retrait'    && <RetraitMomo />}
      {tab === 'achat'      && <AchatVendeur />}
    </div>
  )
}

function PublierArticle({ onPublier }) {
  const [form, setForm] = useState({ photo:null, article:'', quantite:'', prix:'' })
  const [ok, setOk] = useState(false)

  const majPhoto = (file) => {
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setForm(f => ({ ...f, photo: reader.result }))
    reader.readAsDataURL(file)
  }

  const publier = () => {
    if (!form.quantite || !form.prix) return
    onPublier({ ...form, article: form.article || 'Article sans nom' })
    setForm({ photo:null, article:'', quantite:'', prix:'' })
    setOk(true)
    setTimeout(() => setOk(false), 2500)
  }

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 max-w-md">
      <h3 className="font-black text-slate-800 text-base mb-4">Publier un article</h3>
      <div className="flex justify-center mb-5">
        <label className="cursor-pointer">
          <div className="w-24 h-24 rounded-xl bg-purple-50 border-2 border-dashed flex items-center justify-center overflow-hidden" style={{ borderColor:'#E9D5FF' }}>
            {form.photo ? <img src={form.photo} className="w-full h-full object-cover" /> : <Camera size={24} color={COULEUR} />}
          </div>
          <input type="file" accept="image/*" className="hidden" onChange={e => majPhoto(e.target.files[0])} />
        </label>
      </div>
      <div className="space-y-3">
        <input placeholder="Nom de l'article" value={form.article}
          onChange={e => setForm(f => ({ ...f, article: sanitize(e.target.value) }))}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm" maxLength={100} />
        <input placeholder="Quantité disponible" type="number" value={form.quantite}
          onChange={e => setForm(f => ({ ...f, quantite: e.target.value }))}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm" />
        <input placeholder="Prix (FCFA)" type="number" value={form.prix}
          onChange={e => setForm(f => ({ ...f, prix: e.target.value }))}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm" />
        <button onClick={publier}
          className="w-full py-3 rounded-xl text-white font-black text-sm transition-all hover:opacity-90 hover:shadow-md"
          style={{ background: COULEUR }}>
          Publier l'article
        </button>
        {ok && <p className="text-green-600 text-xs font-bold text-center flex items-center justify-center gap-1"><CheckCircle2 size={13} /> Article publié !</p>}
      </div>
    </div>
  )
}

function MesArticles({ produits }) {
  if (produits.length === 0) {
    return <p className="text-slate-400 text-sm">Vous n'avez pas encore publié d'article.</p>
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {produits.map((p, i) => (
        <Reveal key={p.id} delay={i * 70}>
          <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
            <div className="h-32 bg-purple-50 flex items-center justify-center overflow-hidden">
              {p.photo ? <img src={p.photo} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" /> : <Package color={COULEUR} size={28} />}
            </div>
            <div className="p-4">
              <p className="font-black text-slate-800 text-sm mb-1">{p.article}</p>
              <p className="text-slate-400 text-xs">Quantité : {p.quantite}</p>
              <p className="font-black text-sm" style={{ color: COULEUR }}>{p.prix} FCFA</p>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  )
}

function MessagerieVendeur() {
  const conversations = [
    { nom:'Client Aïcha', dernier:"Bonjour, l'article est-il toujours dispo ?" },
    { nom:'Client Ben',   dernier:"D'accord, je passe commande." },
  ]
  const [active, setActive] = useState(0)
  return <ChatBox titre="Messagerie" conversations={conversations} active={active} setActive={setActive} />
}

function RetraitMomo() {
  const [operateur, setOperateur] = useState('')
  const [numero, setNumero]       = useState('')
  const [montant, setMontant]     = useState('')
  const [ok, setOk] = useState(false)

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 max-w-md">
      <h3 className="font-black text-slate-800 text-base mb-4">Retrait de mes ventes</h3>
      {ok ? (
        <div className="text-center py-6">
          <CheckCircle2 className="mx-auto mb-3" color={COULEUR} size={40} />
          <p className="font-black text-slate-800 mb-1">Demande de retrait envoyée</p>
          <p className="text-slate-400 text-xs">Vous recevrez la confirmation par Mobile Money.</p>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-xs font-bold text-slate-600 mb-1">Choisissez votre Mobile Money</p>
          <div className="grid grid-cols-2 gap-3 mb-2">
            {['Moov', 'MTN'].map(op => (
              <button key={op} onClick={() => setOperateur(op)}
                className={['py-3 rounded-xl text-sm font-black border-2 transition-all',
                  operateur === op ? 'text-white border-transparent' : 'bg-white text-slate-600 border-slate-200'].join(' ')}
                style={operateur === op ? { background: op === 'Moov' ? '#F97316' : '#FFCB05', color: op === 'MTN' ? '#001A4D' : '#fff' } : {}}>
                {op}
              </button>
            ))}
          </div>
          <input placeholder="Numéro Mobile Money" value={numero} onChange={e => setNumero(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm" />
          <input placeholder="Montant à retirer (FCFA)" type="number" value={montant} onChange={e => setMontant(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm" />
          <button onClick={() => operateur && numero && montant && setOk(true)}
            className="w-full py-3 rounded-xl text-white font-black text-sm transition-all hover:opacity-90 hover:shadow-md"
            style={{ background: COULEUR }}>
            Demander le retrait
          </button>
        </div>
      )}
    </div>
  )
}

function AchatVendeur() {
  const [quantite, setQuantite] = useState('')
  const [cout, setCout]         = useState('')
  const [valide, setValide]     = useState(false)

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 max-w-md">
      <h3 className="font-black text-slate-800 text-base mb-4">Acheter du stock</h3>
      {!valide ? (
        <div className="space-y-3">
          <input placeholder="Quantité" type="number" value={quantite} onChange={e => setQuantite(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm" />
          <input placeholder="Coût total (FCFA)" type="number" value={cout} onChange={e => setCout(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm" />
          <button onClick={() => quantite && cout && setValide(true)}
            className="w-full py-3 rounded-xl text-white font-black text-sm transition-all hover:opacity-90 hover:shadow-md"
            style={{ background: COULEUR }}>
            Continuer vers le paiement
          </button>
        </div>
      ) : (
        <PaiementKKiaPay couleur={COULEUR} montantLabel={`${quantite} article(s) — ${cout} FCFA`} />
      )}
    </div>
  )
}

// ── Vue Acheteur ──────────────────────────────────────────────
function VueAcheteur({ acheteur, produits, conversation, onCommander, onFermerConversation, onDeconnecter }) {
  const [tab, setTab] = useState('produits')

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center flex-shrink-0">
          <UserRound color={COULEUR} />
        </div>
        <div className="flex-1">
          <p className="font-black text-slate-800 text-sm">{acheteur.nom}</p>
          <p className="text-slate-400 text-xs flex items-center gap-1"><ShoppingBag size={12} /> Espace acheteur</p>
        </div>
        <button onClick={onDeconnecter} className="text-slate-400 hover:text-red-500 text-xs font-bold">Déconnexion</button>
      </div>

      <div className="flex gap-2 mb-6">
        {[{id:'produits',label:'Produits',Icon:Package},{id:'messagerie',label:'Messagerie',Icon:MessageCircle}].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={['flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all border-2',
              tab === t.id ? 'text-white border-transparent' : 'bg-white text-slate-600 border-slate-200'].join(' ')}
            style={tab === t.id ? { background: COULEUR } : {}}>
            <t.Icon size={13} /> {t.label}
          </button>
        ))}
      </div>

      {tab === 'produits' && (
        conversation ? (
          <ChatBox titre={`Discussion avec ${conversation.vendeurNom}`}
            conversations={[{ nom: conversation.vendeurNom, dernier: `Bonjour, je suis intéressé par : ${conversation.article}` }]}
            active={0} setActive={() => {}} onBack={onFermerConversation} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {produits.map((p, i) => (
              <Reveal key={p.id} delay={i * 80}>
                <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                  <div className="h-36 bg-purple-50 flex items-center justify-center overflow-hidden">
                    {p.photo ? <img src={p.photo} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" /> : <Package color={COULEUR} size={30} />}
                  </div>
                  <div className="p-4">
                    <p className="font-black text-slate-800 text-sm mb-1">{p.article}</p>
                    <p className="text-slate-400 text-xs mb-1">Vendu par {p.vendeur}</p>
                    <p className="font-black text-base mb-3" style={{ color: COULEUR }}>{p.prix} FCFA</p>
                    <button onClick={() => onCommander(p)}
                      className="w-full py-2.5 rounded-xl text-white font-bold text-sm transition-all hover:opacity-90"
                      style={{ background: COULEUR }}>
                      Passer une commande
                    </button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )
      )}

      {tab === 'messagerie' && (
        <ChatBox titre="Messagerie"
          conversations={[{ nom:'Boutique Awa', dernier:'Votre commande est en préparation.' }]}
          active={0} setActive={() => {}} />
      )}
    </div>
  )
}

// ── Chat generique ────────────────────────────────────────────
function ChatBox({ titre, conversations, active, setActive, onBack }) {
  const [messages, setMessages] = useState([
    { de:'eux', texte: conversations[active]?.dernier || '' },
  ])
  const [saisie, setSaisie] = useState('')

  const envoyer = () => {
    if (!saisie.trim()) return
    setMessages(m => [...m, { de:'moi', texte: saisie }])
    setSaisie('')
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden max-w-2xl">
      <div className="px-5 py-3 border-b border-slate-100 flex items-center gap-3">
        {onBack && <button onClick={onBack} className="text-slate-400 hover:text-slate-600"><ArrowLeft size={16} /></button>}
        <MessageCircle size={16} color={COULEUR} />
        <p className="font-black text-slate-800 text-sm">{titre}</p>
      </div>
      <div className="p-5 space-y-3 min-h-[220px] max-h-80 overflow-y-auto">
        {messages.map((m, i) => (
          <div key={i} className={m.de === 'moi' ? 'text-right' : 'text-left'}>
            <span className={['inline-block px-4 py-2 rounded-2xl text-sm max-w-xs',
              m.de === 'moi' ? 'text-white' : 'bg-slate-100 text-slate-700'].join(' ')}
              style={m.de === 'moi' ? { background: COULEUR } : {}}>
              {m.texte}
            </span>
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-slate-100 flex gap-2">
        <input value={saisie} onChange={e => setSaisie(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && envoyer()}
          placeholder="Écrire un message..." maxLength={500}
          className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-sm" />
        <button onClick={envoyer} className="w-10 h-10 rounded-xl text-white flex items-center justify-center flex-shrink-0"
          style={{ background: COULEUR }}>
          <Send size={15} />
        </button>
      </div>
    </div>
  )
}

// ── Champ reutilisable ────────────────────────────────────────
function Champ({ label, icon: Icon, value, onChange, error, ph, type='text' }) {
  return (
    <div>
      <label className="block text-xs font-bold text-slate-600 mb-1">{label}</label>
      <div className="relative">
        {Icon && <Icon size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300" />}
        <input type={type} value={value} onChange={e => onChange(e.target.value)}
          placeholder={ph} maxLength={150}
          className={['w-full py-3 rounded-xl border text-sm bg-white focus:outline-none focus:ring-2 transition-all',
            Icon ? 'pl-10 pr-4' : 'px-4',
            error ? 'border-red-400 bg-red-50' : 'border-slate-200'].join(' ')} />
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )
}

// ── Politique de confidentialite (modal) ─────────────────────
function PolitiqueModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background:'rgba(0,0,0,0.55)' }} onClick={onClose}>
      <div className="bg-white w-full sm:max-w-lg rounded-t-3xl sm:rounded-2xl max-h-[85vh] overflow-y-auto p-6 sm:p-8"
        onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-black text-[#001A4D] text-lg flex items-center gap-2">
            <ShieldCheck size={18} color={COULEUR} /> Politique de confidentialité
          </h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center">
            <X size={15} />
          </button>
        </div>
        <div className="text-slate-600 text-sm leading-relaxed space-y-3">
          <p>TradeNOVA Market, plateforme du Club In-NOVA, collecte les informations nécessaires à la mise en relation entre vendeurs et acheteurs : nom complet, email, numéro de téléphone, photo de la pièce d'identité, lieu de la boutique et identifiant fiscal (RCCM ou numéro IFU) pour les vendeurs.</p>
          <p className="font-black text-slate-800">Toutes les discussions, commandes et paiements doivent obligatoirement se faire directement sur TradeNOVA Market.</p>
          <p>In-NOVA décline toute responsabilité en cas d'accord, de transaction, de paiement ou de litige survenant en dehors de la plateforme (réseaux sociaux, messagerie externe, especes en main propre, etc.). Toute demande de paiement ou d'échange hors site expose l'utilisateur à ses propres risques.</p>
          <p>Les informations de paiement (numéro Mobile Money) sont utilisées exclusivement pour le traitement des retraits et des achats, et ne sont jamais partagées avec des tiers non autorisés.</p>
          <p className="font-black text-slate-800">Une commission de 10% est prélevée par la plateforme sur chaque retrait effectué par un vendeur. Cette commission couvre les frais de fonctionnement et de sécurisation de TradeNOVA Market.</p>
          <p>Les échanges via la messagerie restent strictement confidentiels entre le vendeur et l'acheteur concernés, et peuvent être consultés par l'équipe In-NOVA en cas de litige signalé.</p>
          <p>Pour toute question relative à vos données personnelles, contactez le Club In-NOVA à clubinnova08@gmail.com.</p>
        </div>
      </div>
    </div>
  )
}
