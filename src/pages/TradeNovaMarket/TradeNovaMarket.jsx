// src/pages/TradeNovaMarket/TradeNovaMarket.jsx
import { useState } from 'react'
import {
  Store, ArrowLeft, UserRound, ShoppingBag, Camera, Mail, Phone, User, MapPin,
  LayoutDashboard, PlusCircle, Package, MessageCircle, Wallet, CreditCard,
  ShieldCheck, Send, X, LogIn, UserPlus, AlertTriangle, Lock, Eye, EyeOff,
  BarChart3, ClipboardList, Search, ArrowUpDown, CheckCircle2,
} from 'lucide-react'
import { sanitize, isValidEmail } from '../../utils/security'
import { trouverCompte, creerCompte } from '../../utils/registre'
import { sha256Hex } from '../../utils/hash'
import { lireImageUploadee } from '../../utils/fichierImage'
import Reveal from '../../components/Reveal'
import PaiementKKiaPay from '../../components/PaiementKKiaPay'

const COULEUR = '#7E22CE'
const CLE_VENDEURS  = 'innova_market_vendeurs'
const CLE_ACHETEURS = 'innova_market_acheteurs'

const PRODUITS_DEMO = [
  { id: 1, photo: null, quantite: 12, prix: 2500,  article: 'Écouteurs sans fil', vendeur: 'Boutique Awa' },
  { id: 2, photo: null, quantite: 5,  prix: 15000, article: 'Sac à dos imprimé', vendeur: 'Atelier Ken' },
  { id: 3, photo: null, quantite: 30, prix: 800,   article: 'Savon artisanal', vendeur: 'NatureShop' },
]

const STATUTS_COMMANDE = {
  'En attente':  { bg:'#FFFBEB', text:'#B45309' },
  'Confirmée':   { bg:'#EFF6FF', text:'#1D4ED8' },
  'Livrée':      { bg:'#F0FDF4', text:'#15803D' },
}

// ATTENTION SECURITE : les comptes vendeur/acheteur (et leurs mots de passe, sous
// forme de hash SHA-256) sont stockes dans le localStorage du navigateur, faute de
// backend reel. Ce n'est pas un vrai systeme d'authentification multi-appareils -
// Phase 2 : remplacer par un vrai backend (hash + sel cote serveur, sessions/JWT).

export default function TradeNovaMarket({ onNavigate }) {
  const [screen,   setScreen]   = useState('accueil')
  const [vendeur,  setVendeur]  = useState(null)
  const [acheteur, setAcheteur] = useState(null)
  const [produits, setProduits] = useState(PRODUITS_DEMO)
  const [commandes, setCommandes] = useState([])
  const [conversations, setConversations] = useState({}) // { [vendeurNom]: [{de, texte, heure}] }
  const [conversationActive, setConversationActive] = useState(null) // vendeurNom
  const [politiqueOuverte, setPolitiqueOuverte] = useState(false)

  const envoyerMessage = (vendeurNom, texte, de = 'acheteur') => {
    setConversations(c => ({
      ...c,
      [vendeurNom]: [...(c[vendeurNom] || []), { de, texte, heure: new Date().toLocaleTimeString('fr-FR', { hour:'2-digit', minute:'2-digit' }) }],
    }))
  }

  const passerCommande = (p) => {
    const commande = {
      id: Date.now(), article: p.article, prix: p.prix, vendeur: p.vendeur,
      acheteurNom: acheteur?.nom || 'Acheteur', statut: 'En attente',
      date: new Date().toLocaleDateString('fr-FR'),
    }
    setCommandes(c => [commande, ...c])
    envoyerMessage(p.vendeur,
      `Bonjour, je souhaite passer une commande pour : ${p.article} (${p.prix.toLocaleString('fr-FR')} FCFA). Merci de me confirmer la disponibilité.`,
      'acheteur')
    setConversationActive(p.vendeur)
  }

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
          <Accueil onInscription={() => setScreen('choix')} onConnexion={() => setScreen('connexion-role')} />
        )}

        {screen === 'choix' && (
          <ChoixProfil titre="Je m'inscris en tant que..."
            onVendeur={() => setScreen('inscription-vendeur')}
            onAcheteur={() => setScreen('inscription-acheteur')}
            piedTexte="Vous avez déjà un compte ?" piedAction={() => setScreen('connexion-role')} piedLabel="Se connecter" />
        )}

        {screen === 'connexion-role' && (
          <ChoixProfil titre="Je me connecte en tant que..."
            onVendeur={() => setScreen('connexion-vendeur')}
            onAcheteur={() => setScreen('connexion-acheteur')}
            piedTexte="Pas encore de compte ?" piedAction={() => setScreen('choix')} piedLabel="S'inscrire" />
        )}

        {screen === 'connexion-vendeur' && (
          <Connexion role="vendeur" cle={CLE_VENDEURS} couleur={COULEUR}
            onBack={() => setScreen('connexion-role')} onInscrireIci={() => setScreen('inscription-vendeur')}
            onSuccess={(compte) => { setVendeur(compte); setScreen('dashboard-vendeur') }} />
        )}

        {screen === 'connexion-acheteur' && (
          <Connexion role="acheteur" cle={CLE_ACHETEURS} couleur={COULEUR}
            onBack={() => setScreen('connexion-role')} onInscrireIci={() => setScreen('inscription-acheteur')}
            onSuccess={(compte) => { setAcheteur(compte); setScreen('vue-acheteur') }} />
        )}

        {screen === 'inscription-vendeur' && (
          <InscriptionVendeur onBack={() => setScreen('choix')} onSeConnecter={() => setScreen('connexion-vendeur')}
            onDone={(data) => { setVendeur(data); setScreen('dashboard-vendeur') }} />
        )}

        {screen === 'inscription-acheteur' && (
          <InscriptionAcheteur onBack={() => setScreen('choix')} onSeConnecter={() => setScreen('connexion-acheteur')}
            onDone={(data) => { setAcheteur(data); setScreen('vue-acheteur') }} />
        )}

        {screen === 'dashboard-vendeur' && vendeur && (
          <DashboardVendeur
            vendeur={vendeur}
            produits={produits.filter(p => p.vendeur === vendeur.nom)}
            commandes={commandes.filter(c => c.vendeur === vendeur.nom)}
            conversations={conversations}
            onPublier={(article) => setProduits(p => [...p, { id: Date.now(), vendeur: vendeur.nom, ...article }])}
            onEnvoyerMessage={(texte) => envoyerMessage(vendeur.nom, texte, 'vendeur')}
            onDeconnecter={() => { setVendeur(null); setScreen('accueil') }}
          />
        )}

        {screen === 'vue-acheteur' && acheteur && (
          <VueAcheteur
            acheteur={acheteur}
            produits={produits}
            conversations={conversations}
            conversationActive={conversationActive}
            onOuvrirConversation={setConversationActive}
            onCommander={passerCommande}
            onEnvoyerMessage={(vendeurNom, texte) => envoyerMessage(vendeurNom, texte, 'acheteur')}
            onDeconnecter={() => { setAcheteur(null); setScreen('accueil') }}
          />
        )}
      </div>

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
function Accueil({ onInscription, onConnexion }) {
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
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button onClick={onInscription}
          className="text-white font-black text-sm px-8 py-4 rounded-xl transition-all hover:opacity-90 hover:shadow-lg hover:-translate-y-0.5 inline-flex items-center gap-2"
          style={{ background: COULEUR }}>
          <UserPlus size={18} /> S'inscrire
        </button>
        <button onClick={onConnexion}
          className="font-black text-sm px-8 py-4 rounded-xl border-2 transition-all hover:-translate-y-0.5 inline-flex items-center gap-2"
          style={{ borderColor: COULEUR, color: COULEUR }}>
          <LogIn size={18} /> Se connecter
        </button>
      </div>
    </Reveal>
  )
}

// ── Choix du profil ───────────────────────────────────────────
function ChoixProfil({ titre, onVendeur, onAcheteur, piedTexte, piedAction, piedLabel }) {
  return (
    <div className="max-w-2xl mx-auto text-center">
      <Reveal>
        <h2 className="font-black text-[#001A4D] text-2xl mb-2" style={{ fontFamily:'Arial, sans-serif' }}>{titre}</h2>
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
      {piedTexte && (
        <Reveal delay={180} className="mt-6">
          <p className="text-slate-400 text-xs">
            {piedTexte}{' '}
            <button onClick={piedAction} className="font-black hover:underline" style={{ color: COULEUR }}>{piedLabel}</button>
          </p>
        </Reveal>
      )}
    </div>
  )
}

// ── Connexion (email + mot de passe) ────────────────────────────
function Connexion({ role, cle, couleur, onBack, onInscrireIci, onSuccess }) {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError]       = useState('')
  const [verifying, setVerifying] = useState(false)

  const seConnecter = async () => {
    if (!isValidEmail(email)) { setError('Email invalide'); return }
    if (!password.trim())     { setError('Mot de passe requis'); return }

    const compte = trouverCompte(cle, email)
    if (!compte) { setError(`Aucun compte ${role} trouvé avec cet email. Merci de vous inscrire.`); return }

    setVerifying(true)
    const empreinte = await sha256Hex(password)
    setVerifying(false)

    if (empreinte !== compte.motDePasseHash) { setError('Email ou mot de passe incorrect.'); return }
    setError('')
    onSuccess(compte)
  }

  return (
    <div className="max-w-md mx-auto">
      <button onClick={onBack} className="text-slate-400 hover:text-slate-600 text-sm mb-6 flex items-center gap-2">
        <ArrowLeft size={14} /> Retour
      </button>
      <Reveal className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-100">
        <h2 className="font-black text-[#001A4D] text-xl mb-1">Connexion {role}</h2>
        <p className="text-slate-400 text-xs mb-6">Entrez l'email et le mot de passe utilisés lors de votre inscription.</p>

        <div className="space-y-4">
          <Champ label="Email" icon={Mail} type="email" value={email}
            onChange={v => { setEmail(v); setError('') }} ph="votre@email.com" />
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">Mot de passe</label>
            <div className="relative">
              <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300" />
              <input type={showPass ? 'text' : 'password'} value={password}
                onChange={e => { setPassword(e.target.value); setError('') }}
                placeholder="********" maxLength={100}
                className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2" />
              <button type="button" onClick={() => setShowPass(s => !s)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="rounded-xl px-4 py-3 text-xs leading-relaxed flex items-start gap-2" style={{ background:'#FEF2F2', color:'#B91C1C' }}>
              <AlertTriangle size={14} className="flex-shrink-0 mt-0.5" />
              <span>
                {error}{' '}
                {error.includes('Merci de vous inscrire') && (
                  <button onClick={onInscrireIci} className="font-black underline">S'inscrire maintenant</button>
                )}
              </span>
            </div>
          )}

          <button onClick={seConnecter} disabled={verifying}
            className="w-full py-3.5 rounded-xl text-white font-black text-sm transition-all hover:opacity-90 hover:shadow-md hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-60"
            style={{ background: couleur }}>
            <LogIn size={16} /> {verifying ? 'Vérification...' : 'Se connecter'}
          </button>
        </div>
      </Reveal>
    </div>
  )
}

// ── Inscription Vendeur ──────────────────────────────────────
function InscriptionVendeur({ onBack, onSeConnecter, onDone }) {
  const [form, setForm] = useState({
    nom:'', email:'', tel:'', motDePasse:'', photoId:null, photoBoutique:null, lieuBoutique:'', rccm:'', ifu:'',
  })
  const [errors, setErrors] = useState({})
  const [showPass, setShowPass] = useState(false)
  const [compteExiste, setCompteExiste] = useState(false)
  const [envoi, setEnvoi] = useState(false)

  const majPhotoId = (file) => {
    lireImageUploadee(file,
      (b64) => { setForm(f => ({ ...f, photoId: b64 })); setErrors(x => ({ ...x, photoId:'' })) },
      (msg) => setErrors(x => ({ ...x, photoId: msg })))
  }

  const majPhotoBoutique = (file) => {
    lireImageUploadee(file,
      (b64) => { setForm(f => ({ ...f, photoBoutique: b64 })); setErrors(x => ({ ...x, photoBoutique:'' })) },
      (msg) => setErrors(x => ({ ...x, photoBoutique: msg })))
  }

  const soumettre = async () => {
    const err = {}
    if (!form.nom.trim())          err.nom          = 'Nom complet requis'
    if (!isValidEmail(form.email)) err.email        = 'Email invalide'
    if (!form.tel.trim())          err.tel          = 'Numéro de téléphone requis'
    if (form.motDePasse.length < 6) err.motDePasse  = 'Au moins 6 caractères'
    if (!form.photoId)             err.photoId      = "Photo de la carte d'identité requise"
    if (!form.photoBoutique)       err.photoBoutique = 'Photo de profil de la boutique requise'
    if (!form.lieuBoutique.trim()) err.lieuBoutique = 'Lieu de la boutique requis'
    if (!form.rccm.trim() && !form.ifu.trim()) err.rccm = 'Renseignez au moins le RCCM ou le numéro IFU'
    if (Object.keys(err).length > 0) { setErrors(err); return }

    setEnvoi(true)
    const motDePasseHash = await sha256Hex(form.motDePasse)
    const { motDePasse, ...donneesPubliques } = form
    const cree = creerCompte(CLE_VENDEURS, { ...donneesPubliques, motDePasseHash })
    setEnvoi(false)
    if (!cree) { setCompteExiste(true); return }
    setCompteExiste(false)
    onDone({ ...donneesPubliques, motDePasseHash })
    // TODO Phase 2 : POST /api/tradenova/vendeurs/ { ...form } (hash + sel cote serveur)
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

        {compteExiste && (
          <div className="rounded-xl px-4 py-3 mb-5 text-xs leading-relaxed flex items-start gap-2" style={{ background:'#FEF2F2', color:'#B91C1C' }}>
            <AlertTriangle size={14} className="flex-shrink-0 mt-0.5" />
            <span>
              Un compte vendeur existe déjà avec cet email.{' '}
              <button onClick={onSeConnecter} className="font-black underline">Se connecter à la place</button>
            </span>
          </div>
        )}

        <div className="space-y-4">
          <Champ label="Nom complet" icon={User} value={form.nom} error={errors.nom}
            ph="Votre nom complet" onChange={v => { setForm(f => ({ ...f, nom: sanitize(v) })); setErrors(x => ({ ...x, nom:'' })); setCompteExiste(false) }} />
          <Champ label="Email" icon={Mail} type="email" value={form.email} error={errors.email}
            ph="votre@email.com" onChange={v => { setForm(f => ({ ...f, email: v })); setErrors(x => ({ ...x, email:'' })); setCompteExiste(false) }} />
          <Champ label="Numéro de téléphone" icon={Phone} type="tel" value={form.tel} error={errors.tel}
            ph="+229 00 00 00 00" onChange={v => { setForm(f => ({ ...f, tel: v })); setErrors(x => ({ ...x, tel:'' })) }} />

          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">Mot de passe</label>
            <div className="relative">
              <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300" />
              <input type={showPass ? 'text' : 'password'} value={form.motDePasse}
                onChange={e => { setForm(f => ({ ...f, motDePasse: e.target.value })); setErrors(x => ({ ...x, motDePasse:'' })) }}
                placeholder="6 caractères minimum" maxLength={100}
                className={['w-full pl-10 pr-10 py-3 rounded-xl border text-sm bg-white focus:outline-none focus:ring-2',
                  errors.motDePasse ? 'border-red-400 bg-red-50' : 'border-slate-200'].join(' ')} />
              <button type="button" onClick={() => setShowPass(s => !s)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
            {errors.motDePasse && <p className="text-red-500 text-xs mt-1">{errors.motDePasse}</p>}
          </div>

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
              <input type="file" accept="image/*" className="hidden" onChange={e => majPhotoId(e.target.files[0])} />
            </label>
            {errors.photoId && <p className="text-red-500 text-xs mt-1">{errors.photoId}</p>}
            <p className="text-slate-400 text-[11px] mt-1">Document de vérification uniquement — jamais affiché publiquement.</p>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">Photo de profil de la boutique</label>
            <label className="cursor-pointer block">
              <div className={['w-full h-28 rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-1 overflow-hidden transition-all',
                errors.photoBoutique ? 'border-red-400 bg-red-50' : 'border-purple-200 bg-purple-50'].join(' ')}>
                {form.photoBoutique
                  ? <img src={form.photoBoutique} className="w-full h-full object-cover" alt="Photo de la boutique" />
                  : <><Camera size={20} color={COULEUR} /><span className="text-[11px] text-slate-400">Ajouter une photo</span></>}
              </div>
              <input type="file" accept="image/*" className="hidden" onChange={e => majPhotoBoutique(e.target.files[0])} />
            </label>
            {errors.photoBoutique && <p className="text-red-500 text-xs mt-1">{errors.photoBoutique}</p>}
            <p className="text-slate-400 text-[11px] mt-1">Cette photo sera visible par les acheteurs comme avatar de votre boutique.</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Champ label="RCCM" value={form.rccm} error={errors.rccm}
              ph="Optionnel" onChange={v => { setForm(f => ({ ...f, rccm: sanitize(v) })); setErrors(x => ({ ...x, rccm:'' })) }} />
            <Champ label="Numéro IFU" value={form.ifu}
              ph="Optionnel" onChange={v => { setForm(f => ({ ...f, ifu: sanitize(v) })); setErrors(x => ({ ...x, rccm:'' })) }} />
          </div>
          {errors.rccm && <p className="text-red-500 text-xs -mt-2">{errors.rccm}</p>}

          <button onClick={soumettre} disabled={envoi}
            className="w-full py-3.5 rounded-xl text-white font-black text-sm transition-all hover:opacity-90 hover:shadow-md hover:-translate-y-0.5 disabled:opacity-60"
            style={{ background: COULEUR }}>
            {envoi ? 'Création...' : 'Créer mon compte vendeur'}
          </button>

          <p className="text-center text-slate-400 text-xs">
            Déjà inscrit ?{' '}
            <button onClick={onSeConnecter} className="font-black hover:underline" style={{ color: COULEUR }}>Se connecter</button>
          </p>
        </div>
      </Reveal>
    </div>
  )
}

// ── Inscription Acheteur ─────────────────────────────────────
function InscriptionAcheteur({ onBack, onSeConnecter, onDone }) {
  const [form, setForm] = useState({ email:'', tel:'', nom:'', motDePasse:'' })
  const [errors, setErrors] = useState({})
  const [showPass, setShowPass] = useState(false)
  const [compteExiste, setCompteExiste] = useState(false)
  const [envoi, setEnvoi] = useState(false)

  const soumettre = async () => {
    const err = {}
    if (!isValidEmail(form.email)) err.email = 'Email invalide'
    if (!form.tel.trim())          err.tel   = 'Numéro de téléphone requis'
    if (!form.nom.trim())          err.nom   = 'Nom et prénom requis'
    if (form.motDePasse.length < 6) err.motDePasse = 'Au moins 6 caractères'
    if (Object.keys(err).length > 0) { setErrors(err); return }

    setEnvoi(true)
    const motDePasseHash = await sha256Hex(form.motDePasse)
    const { motDePasse, ...donneesPubliques } = form
    const cree = creerCompte(CLE_ACHETEURS, { ...donneesPubliques, motDePasseHash })
    setEnvoi(false)
    if (!cree) { setCompteExiste(true); return }
    setCompteExiste(false)
    onDone({ ...donneesPubliques, motDePasseHash })
    // TODO Phase 2 : POST /api/tradenova/acheteurs/ { ...form } (hash + sel cote serveur)
  }

  return (
    <div className="max-w-md mx-auto">
      <button onClick={onBack} className="text-slate-400 hover:text-slate-600 text-sm mb-6 flex items-center gap-2">
        <ArrowLeft size={14} /> Retour
      </button>
      <Reveal className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-100">
        <h2 className="font-black text-[#001A4D] text-xl mb-1">Inscription acheteur</h2>
        <p className="text-slate-400 text-xs mb-6">Renseignez vos informations pour commencer à acheter.</p>

        {compteExiste && (
          <div className="rounded-xl px-4 py-3 mb-5 text-xs leading-relaxed flex items-start gap-2" style={{ background:'#FEF2F2', color:'#B91C1C' }}>
            <AlertTriangle size={14} className="flex-shrink-0 mt-0.5" />
            <span>
              Un compte acheteur existe déjà avec cet email.{' '}
              <button onClick={onSeConnecter} className="font-black underline">Se connecter à la place</button>
            </span>
          </div>
        )}

        <div className="space-y-4">
          <Champ label="Email" icon={Mail} type="email" value={form.email} error={errors.email}
            ph="votre@email.com" onChange={v => { setForm(f => ({ ...f, email: v })); setErrors(x => ({ ...x, email:'' })); setCompteExiste(false) }} />
          <Champ label="Numéro de téléphone" icon={Phone} type="tel" value={form.tel} error={errors.tel}
            ph="+229 00 00 00 00" onChange={v => { setForm(f => ({ ...f, tel: v })); setErrors(x => ({ ...x, tel:'' })) }} />
          <Champ label="Nom et prénom" icon={User} value={form.nom} error={errors.nom}
            ph="Votre nom complet" onChange={v => { setForm(f => ({ ...f, nom: sanitize(v) })); setErrors(x => ({ ...x, nom:'' })) }} />

          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">Mot de passe</label>
            <div className="relative">
              <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300" />
              <input type={showPass ? 'text' : 'password'} value={form.motDePasse}
                onChange={e => { setForm(f => ({ ...f, motDePasse: e.target.value })); setErrors(x => ({ ...x, motDePasse:'' })) }}
                placeholder="6 caractères minimum" maxLength={100}
                className={['w-full pl-10 pr-10 py-3 rounded-xl border text-sm bg-white focus:outline-none focus:ring-2',
                  errors.motDePasse ? 'border-red-400 bg-red-50' : 'border-slate-200'].join(' ')} />
              <button type="button" onClick={() => setShowPass(s => !s)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
            {errors.motDePasse && <p className="text-red-500 text-xs mt-1">{errors.motDePasse}</p>}
          </div>

          <button onClick={soumettre} disabled={envoi}
            className="w-full py-3.5 rounded-xl text-white font-black text-sm transition-all hover:opacity-90 hover:shadow-md hover:-translate-y-0.5 disabled:opacity-60"
            style={{ background: COULEUR }}>
            {envoi ? 'Création...' : 'Créer mon compte acheteur'}
          </button>

          <p className="text-center text-slate-400 text-xs">
            Déjà inscrit ?{' '}
            <button onClick={onSeConnecter} className="font-black hover:underline" style={{ color: COULEUR }}>Se connecter</button>
          </p>
        </div>
      </Reveal>
    </div>
  )
}

// ── Dashboard Vendeur ─────────────────────────────────────────
function DashboardVendeur({ vendeur, produits, commandes, conversations, onPublier, onEnvoyerMessage, onDeconnecter }) {
  const [tab, setTab] = useState('publier')
  const [articleDetail, setArticleDetail] = useState(null)
  const TABS = [
    { id:'publier',      label:'Publier',       Icon:PlusCircle },
    { id:'articles',     label:'Mes articles',  Icon:Package },
    { id:'commandes',    label:'Commandes',     Icon:ClipboardList },
    { id:'statistiques', label:'Statistiques',  Icon:BarChart3 },
    { id:'messagerie',   label:'Messagerie',    Icon:MessageCircle },
    { id:'retrait',      label:'Retrait',       Icon:Wallet },
    { id:'achat',        label:'Achat',         Icon:CreditCard },
  ]
  const messagesVendeur = conversations[vendeur.nom] || []

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-full bg-purple-50 overflow-hidden flex items-center justify-center flex-shrink-0 border-2" style={{ borderColor:COULEUR }}>
          {vendeur.photoBoutique ? <img src={vendeur.photoBoutique} className="w-full h-full object-cover" alt={vendeur.nom} /> : <UserRound color={COULEUR} />}
        </div>
        <div className="flex-1">
          <p className="font-black text-slate-800 text-sm">{vendeur.nom}</p>
          <p className="text-slate-400 text-xs flex items-center gap-1"><LayoutDashboard size={12} /> Boutique en ligne &middot; {vendeur.lieuBoutique}</p>
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

      {tab === 'publier'      && <PublierArticle onPublier={onPublier} />}
      {tab === 'articles'     && <MesArticles produits={produits} onSelect={setArticleDetail} />}
      {tab === 'commandes'    && <CommandesVendeur commandes={commandes} />}
      {tab === 'statistiques' && <StatistiquesVentes commandes={commandes} produits={produits} />}
      {tab === 'messagerie'   && <MessagerieVendeur messages={messagesVendeur} onEnvoyer={onEnvoyerMessage} />}
      {tab === 'retrait'      && <RetraitMomo />}
      {tab === 'achat'        && <AchatVendeur />}

      {articleDetail && <ArticleDetailModal article={articleDetail} onClose={() => setArticleDetail(null)} />}
    </div>
  )
}

function PublierArticle({ onPublier }) {
  const [form, setForm] = useState({ photo:null, article:'', quantite:'', prix:'' })
  const [ok, setOk] = useState(false)
  const [erreurPhoto, setErreurPhoto] = useState('')

  const majPhoto = (file) => {
    lireImageUploadee(file,
      (b64) => { setForm(f => ({ ...f, photo: b64 })); setErreurPhoto('') },
      (msg) => setErreurPhoto(msg))
  }

  const publier = () => {
    if (!form.quantite || !form.prix) return
    onPublier({ ...form, prix: Number(form.prix), article: form.article || 'Article sans nom' })
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
      {erreurPhoto && <p className="text-red-500 text-xs text-center mb-3">{erreurPhoto}</p>}
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

function MesArticles({ produits, onSelect }) {
  if (produits.length === 0) {
    return <p className="text-slate-400 text-sm">Vous n'avez pas encore publié d'article.</p>
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {produits.map((p, i) => (
        <Reveal key={p.id} delay={i * 70}>
          <button onClick={() => onSelect(p)}
            className="text-left w-full bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
            <div className="h-32 bg-purple-50 flex items-center justify-center overflow-hidden">
              {p.photo ? <img src={p.photo} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" /> : <Package color={COULEUR} size={28} />}
            </div>
            <div className="p-4">
              <p className="font-black text-slate-800 text-sm mb-1">{p.article}</p>
              <p className="text-slate-400 text-xs">Quantité : {p.quantite}</p>
              <p className="font-black text-sm" style={{ color: COULEUR }}>{Number(p.prix).toLocaleString('fr-FR')} FCFA</p>
            </div>
          </button>
        </Reveal>
      ))}
    </div>
  )
}

function ArticleDetailModal({ article, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background:'rgba(0,0,0,0.55)', animation:'fadeIn 0.25s ease' }} onClick={onClose}>
      <div className="bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-2xl overflow-hidden"
        style={{ animation:'fadeInUp 0.35s cubic-bezier(0.22,1,0.36,1)' }} onClick={e => e.stopPropagation()}>
        <div className="h-56 bg-purple-50 relative flex items-center justify-center">
          {article.photo ? <img src={article.photo} className="w-full h-full object-cover" /> : <Package color={COULEUR} size={40} />}
          <button onClick={onClose} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 hover:bg-white flex items-center justify-center">
            <X size={15} />
          </button>
        </div>
        <div className="p-6">
          <h2 className="font-black text-slate-900 text-xl mb-2">{article.article}</h2>
          <p className="font-black text-lg mb-4" style={{ color: COULEUR }}>{Number(article.prix).toLocaleString('fr-FR')} FCFA</p>
          <div className="flex items-center justify-between text-sm text-slate-500 border-t border-slate-100 pt-4">
            <span>Quantité disponible</span>
            <span className="font-black text-slate-800">{article.quantite}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function CommandesVendeur({ commandes }) {
  if (commandes.length === 0) {
    return <p className="text-slate-400 text-sm">Aucune commande pour le moment.</p>
  }
  return (
    <div className="space-y-3">
      {commandes.map((c, i) => {
        const s = STATUTS_COMMANDE[c.statut] || STATUTS_COMMANDE['En attente']
        return (
          <Reveal key={c.id} delay={i * 60}>
            <div className="bg-white rounded-2xl p-4 border border-slate-100 flex items-center justify-between gap-4">
              <div>
                <p className="font-black text-slate-800 text-sm">{c.article}</p>
                <p className="text-slate-400 text-xs">{c.acheteurNom} &middot; {c.date}</p>
              </div>
              <div className="text-right">
                <p className="font-black text-sm mb-1" style={{ color: COULEUR }}>{Number(c.prix).toLocaleString('fr-FR')} FCFA</p>
                <span className="text-[10px] font-black px-2 py-1 rounded-full" style={{ background: s.bg, color: s.text }}>{c.statut}</span>
              </div>
            </div>
          </Reveal>
        )
      })}
    </div>
  )
}

// ── Statistiques (mini graphique anime, sans dependance) ───────
function StatistiquesVentes({ commandes, produits }) {
  const total = commandes.reduce((s, c) => s + Number(c.prix), 0)
  const JOURS = ['Lun','Mar','Mer','Jeu','Ven','Sam','Dim']
  // Repartition simulee sur la semaine a partir des commandes reelles (demo)
  const donnees = JOURS.map((j, i) => ({
    jour: j,
    valeur: commandes.length ? Math.max(8, ((commandes.length * 37 + i * 53) % 100)) : 0,
  }))
  const max = Math.max(...donnees.map(d => d.valeur), 1)

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-3 gap-4">
        {[
          { label:'Ventes totales', valeur:`${total.toLocaleString('fr-FR')} FCFA` },
          { label:'Commandes',      valeur: commandes.length },
          { label:'Articles en ligne', valeur: produits.length },
        ].map((s, i) => (
          <Reveal key={s.label} delay={i * 80}>
            <div className="bg-white rounded-2xl p-4 border border-slate-100 text-center">
              <p className="font-black text-lg" style={{ color: COULEUR }}>{s.valeur}</p>
              <p className="text-slate-400 text-[11px] font-bold">{s.label}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="bg-white rounded-2xl p-6 border border-slate-100">
        <h3 className="font-black text-slate-800 text-sm mb-5 flex items-center gap-2">
          <BarChart3 size={15} color={COULEUR} /> Activité de la semaine
        </h3>
        <div className="flex items-end justify-between gap-2 h-40">
          {donnees.map((d, i) => (
            <div key={d.jour} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full rounded-t-lg transition-all duration-700 ease-out"
                style={{
                  height: `${(d.valeur / max) * 100}%`,
                  background: COULEUR,
                  opacity: 0.55 + (d.valeur / max) * 0.45,
                  transitionDelay: `${i * 60}ms`,
                }} />
              <span className="text-[10px] font-bold text-slate-400">{d.jour}</span>
            </div>
          ))}
        </div>
        {commandes.length === 0 && (
          <p className="text-slate-400 text-xs text-center mt-4">Les statistiques réelles apparaîtront dès vos premières ventes.</p>
        )}
      </Reveal>
    </div>
  )
}

function MessagerieVendeur({ messages, onEnvoyer }) {
  return <ChatBox titre="Messagerie" messages={messages} onEnvoyer={onEnvoyer} placeholderVide="Aucun message pour le moment." />
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
          <p className="text-slate-400 text-xs">Une commission de 10% est déduite automatiquement. Confirmation par Mobile Money.</p>
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
function VueAcheteur({ acheteur, produits, conversations, conversationActive, onOuvrirConversation, onCommander, onEnvoyerMessage, onDeconnecter }) {
  const [tab, setTab] = useState('produits')
  const [recherche, setRecherche] = useState('')
  const [tri, setTri] = useState('recents')

  const boutiques = [...new Set(produits.map(p => p.vendeur))]

  const produitsFiltres = produits
    .filter(p => {
      const q = recherche.trim().toLowerCase()
      if (!q) return true
      return p.article.toLowerCase().includes(q) || p.vendeur.toLowerCase().includes(q)
    })
    .sort((a, b) => {
      if (tri === 'prix-asc')  return a.prix - b.prix
      if (tri === 'prix-desc') return b.prix - a.prix
      return b.id - a.id // plus recents d'abord
    })

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
        <div>
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300" />
              <input value={recherche} onChange={e => setRecherche(e.target.value)}
                placeholder="Rechercher un produit ou une boutique..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-white" />
            </div>
            <div className="relative">
              <ArrowUpDown size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300" />
              <select value={tri} onChange={e => setTri(e.target.value)}
                className="pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs bg-white appearance-none">
                <option value="recents">Plus récents</option>
                <option value="prix-asc">Prix croissant</option>
                <option value="prix-desc">Prix décroissant</option>
              </select>
            </div>
          </div>

          {boutiques.length > 1 && (
            <p className="text-slate-400 text-xs mb-4">{boutiques.length} boutiques &middot; {produitsFiltres.length} produit{produitsFiltres.length > 1 ? 's' : ''}</p>
          )}

          {produitsFiltres.length === 0 ? (
            <p className="text-slate-400 text-sm">Aucun produit ne correspond à votre recherche.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {produitsFiltres.map((p, i) => (
                <Reveal key={p.id} delay={i * 70}>
                  <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                    <div className="h-36 bg-purple-50 flex items-center justify-center overflow-hidden">
                      {p.photo ? <img src={p.photo} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" /> : <Package color={COULEUR} size={30} />}
                    </div>
                    <div className="p-4">
                      <p className="font-black text-slate-800 text-sm mb-1">{p.article}</p>
                      <button onClick={() => { onOuvrirConversation(p.vendeur); setTab('messagerie') }}
                        className="text-slate-400 text-xs mb-1 hover:underline">Vendu par {p.vendeur}</button>
                      <p className="font-black text-base mb-3" style={{ color: COULEUR }}>{Number(p.prix).toLocaleString('fr-FR')} FCFA</p>
                      <button onClick={() => { onCommander(p); setTab('messagerie') }}
                        className="w-full py-2.5 rounded-xl text-white font-bold text-sm transition-all hover:opacity-90">
                        Passer une commande
                      </button>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      )}

      {tab === 'messagerie' && (
        <MessagerieAcheteur boutiques={boutiques} conversations={conversations}
          conversationActive={conversationActive} onOuvrir={onOuvrirConversation}
          onEnvoyer={(texte) => conversationActive && onEnvoyerMessage(conversationActive, texte)} />
      )}
    </div>
  )
}

function MessagerieAcheteur({ boutiques, conversations, conversationActive, onOuvrir, onEnvoyer }) {
  const boutiquesAvecConversation = boutiques.filter(b => (conversations[b] || []).length > 0)

  if (!conversationActive) {
    if (boutiquesAvecConversation.length === 0) {
      return <p className="text-slate-400 text-sm">Aucune conversation pour le moment. Passez une commande pour contacter une boutique.</p>
    }
    return (
      <div className="space-y-3 max-w-lg">
        {boutiquesAvecConversation.map((b, i) => {
          const msgs = conversations[b] || []
          const dernier = msgs[msgs.length - 1]
          return (
            <Reveal key={b} delay={i * 70}>
              <button onClick={() => onOuvrir(b)}
                className="w-full text-left bg-white rounded-2xl p-4 border border-slate-100 hover:shadow-md transition-all duration-300 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center flex-shrink-0">
                  <Store size={16} color={COULEUR} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-black text-slate-800 text-sm">{b}</p>
                  <p className="text-slate-400 text-xs truncate">{dernier?.texte}</p>
                </div>
              </button>
            </Reveal>
          )
        })}
      </div>
    )
  }

  return (
    <ChatBox titre={conversationActive} messages={conversations[conversationActive] || []}
      onEnvoyer={onEnvoyer} onBack={() => onOuvrir(null)} placeholderVide="Écrivez le premier message." />
  )
}

// ── Chat generique ────────────────────────────────────────────
function ChatBox({ titre, messages, onEnvoyer, onBack, placeholderVide }) {
  const [saisie, setSaisie] = useState('')

  const envoyer = () => {
    if (!saisie.trim()) return
    onEnvoyer(saisie)
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
        {messages.length === 0 && <p className="text-slate-400 text-xs text-center pt-10">{placeholderVide}</p>}
        {messages.map((m, i) => (
          <div key={i} className={m.de === 'vendeur' ? 'text-left' : 'text-right'} style={{ animation:'fadeInUp 0.3s ease' }}>
            <span className={['inline-block px-4 py-2 rounded-2xl text-sm max-w-xs',
              m.de === 'vendeur' ? 'bg-slate-100 text-slate-700' : 'text-white'].join(' ')}
              style={m.de === 'vendeur' ? {} : { background: COULEUR }}>
              {m.texte}
            </span>
            {m.heure && <p className="text-slate-300 text-[10px] mt-0.5">{m.heure}</p>}
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-slate-100 flex gap-2">
        <input value={saisie} onChange={e => setSaisie(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && envoyer()}
          placeholder="Écrire un message..." maxLength={500}
          className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-sm" />
        <button onClick={envoyer} className="w-10 h-10 rounded-xl text-white flex items-center justify-center flex-shrink-0 transition-all hover:opacity-90"
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
      style={{ background:'rgba(0,0,0,0.55)', animation:'fadeIn 0.25s ease' }} onClick={onClose}>
      <div className="bg-white w-full sm:max-w-lg rounded-t-3xl sm:rounded-2xl max-h-[85vh] overflow-y-auto p-6 sm:p-8"
        style={{ animation:'fadeInUp 0.35s cubic-bezier(0.22,1,0.36,1)' }} onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-black text-[#001A4D] text-lg flex items-center gap-2">
            <ShieldCheck size={18} color={COULEUR} /> Politique de confidentialité
          </h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center">
            <X size={15} />
          </button>
        </div>
        <div className="text-slate-600 text-sm leading-relaxed space-y-3">
          <p>TradeNOVA Market, plateforme du Club In-NOVA, collecte les informations nécessaires à la mise en relation entre vendeurs et acheteurs : nom complet, email, numéro de téléphone, mot de passe (protégé), lieu de la boutique et identifiant fiscal (RCCM ou numéro IFU) pour les vendeurs. Deux photos distinctes sont demandées au vendeur : une photo de pièce d'identité, utilisée uniquement à des fins de vérification et jamais affichée publiquement, et une photo de profil de boutique, visible par les acheteurs.</p>
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
