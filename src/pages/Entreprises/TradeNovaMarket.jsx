import { useState, useRef, useEffect } from 'react'
import { sanitize, isValidEmail } from '../../utils/security'

const C = {
  primary:  '#B45309',
  light:    '#FFFBEB',
  border:   '#FDE68A',
  gradient: 'linear-gradient(135deg, #B45309 100%)',
}

const MOCK_ARTICLES = [
  { id: 1, vendeur: 'Kofi Mensah',  photo: null, titre: 'Chaussures Nike Air Max', qte: 10, prix: '45 000 FCFA', desc: 'Pointure 42, neuves, importees de Chine.' },
  { id: 2, vendeur: 'Aisha Bello',  photo: null, titre: 'Sac a main cuir',          qte: 5,  prix: '22 000 FCFA', desc: 'Cuir veritable, differentes couleurs.'   },
]

const MOCK_MESSAGES = [
  { id: 1, de: 'Aisha Bello', texte: 'Bonjour, est-ce disponible en rouge ?', heure: '10:30' },
  { id: 2, de: 'Moi',         texte: 'Oui, j ai 2 pieces en rouge.',           heure: '10:35' },
]

export default function TradeNovaMarket({ onBack }) {
  const [ecran, setEcran] = useState('accueil')
  const [role,  setRole]  = useState(null)
  const [user,  setUser]  = useState(null)

  const aller = (e, r, u) => {
    setEcran(e)
    if (r !== undefined) setRole(r)
    if (u !== undefined) setUser(u)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <main className="min-h-screen bg-slate-50 pt-16">

      <header style={{ background: C.gradient }} className="py-10 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <button onClick={onBack}
            className="text-white/70 hover:text-white text-sm mb-4 flex items-center gap-2">
            &larr; Retour aux entreprises
          </button>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl overflow-hidden border-2 border-white/30 flex-shrink-0">
              <img src="/logos/tradenova.jpg" alt="TradeNOVA" className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="font-black text-white text-2xl sm:text-3xl"
                style={{ fontFamily: 'Arial, sans-serif' }}>
                TradeNOVA Market
              </h1>
              <p className="text-white/70 text-sm">Marketplace -- Achetez et vendez en toute confiance</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {ecran === 'accueil'              && <Accueil              aller={aller} />}
        {ecran === 'inscription-vendeur'  && <InscriptionVendeur  aller={aller} setUser={setUser} />}
        {ecran === 'inscription-acheteur' && <InscriptionAcheteur aller={aller} setUser={setUser} />}
        {ecran === 'dashboard-vendeur'    && <DashboardVendeur    aller={aller} user={user} />}
        {ecran === 'vue-acheteur'         && <VueAcheteur         aller={aller} user={user} />}
        {ecran === 'politique'            && <PolitiqueConfidentialite aller={aller} />}
      </div>
    </main>
  )
}

function Accueil({ aller }) {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl p-6 text-center"
        style={{ background: C.light, border: '2px solid ' + C.border }}>
        <div className="text-5xl mb-3">&#128722;</div>
        <h2 className="font-black text-slate-900 text-2xl mb-2">Bienvenue sur TradeNOVA Market</h2>
        <p className="text-slate-600 text-sm max-w-md mx-auto">
          La marketplace de l'entreprise TradeNova. Vendez vos produits ou achetez en toute simplicité.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button onClick={() => aller('inscription-vendeur', 'vendeur')}
          className="bg-white rounded-2xl p-6 border-2 hover:shadow-xl hover:-translate-y-1
            transition-all duration-300 text-left group"
          style={{ borderColor: C.border }}>
          <div className="text-4xl mb-3">&#127978;</div>
          <h3 className="font-black text-slate-900 text-lg mb-2 group-hover:text-amber-700">
            Je suis Vendeur
          </h3>
          <p className="text-slate-500 text-sm">
            Publiez vos articles, gérez vos ventes et retirez vos gains via Momo.
          </p>
          <div className="mt-4 text-sm font-bold text-amber-700">S'inscrire comme vendeur &rarr;</div>
        </button>

        <button onClick={() => aller('inscription-acheteur', 'acheteur')}
          className="bg-white rounded-2xl p-6 border-2 hover:shadow-xl hover:-translate-y-1
            transition-all duration-300 text-left group"
          style={{ borderColor: C.border }}>
          <div className="text-4xl mb-3">&#128717;</div>
          <h3 className="font-black text-slate-900 text-lg mb-2 group-hover:text-amber-700">
            Je suis Acheteur
          </h3>
          <p className="text-slate-500 text-sm">
            Parcourez les produits disponibles et passez vos commandes facilement.
          </p>
          <div className="mt-4 text-sm font-bold text-amber-700">S'inscrire comme acheteur &rarr;</div>
        </button>
      </div>

      <div className="text-center text-sm text-slate-400">
        Déja inscrit ?{' '}
        <button onClick={() => aller('dashboard-vendeur', 'vendeur', { nom: 'Vendeur Demo' })}
          className="text-amber-700 font-bold hover:underline">Espace vendeur</button>
        {' · '}
        <button onClick={() => aller('vue-acheteur', 'acheteur', { nom: 'Acheteur Demo' })}
          className="text-amber-700 font-bold hover:underline">Espace acheteur</button>
      </div>

      <div className="text-center pt-6 border-t border-slate-100">
        <button onClick={() => aller('politique')}
          className="text-xs text-slate-400 hover:text-amber-700 transition-colors">
          Politique de confidentialité et Conditions d'utilisation
        </button>
      </div>
    </div>
  )
}

function InscriptionVendeur({ aller, setUser }) {
  const [form,    setForm]    = useState({ nom: '', email: '', tel: '', photo: null })
  const [errors,  setErrors]  = useState({})
  const [preview, setPreview] = useState(null)
  const fileRef = useRef(null)

  const update = (f, v) => {
    setForm(p => ({ ...p, [f]: sanitize(v) }))
    setErrors(p => ({ ...p, [f]: '' }))
  }

  const handlePhoto = (e) => {
    const file = e.target.files[0]
    if (!file) return
    if (file.size > 2 * 1024 * 1024) { setErrors(p => ({ ...p, photo: 'Photo max 2MB' })); return }
    setForm(p => ({ ...p, photo: file }))
    setPreview(URL.createObjectURL(file))
  }

  const soumettre = () => {
    const err = {}
    if (!form.nom.trim())          err.nom   = 'Nom requis'
    if (!isValidEmail(form.email)) err.email = 'Email invalide'
    if (!form.tel.trim())          err.tel   = 'Telephone requis'
    if (Object.keys(err).length > 0) { setErrors(err); return }
    const u = { nom: form.nom, email: form.email, tel: form.tel, photo: preview, role: 'vendeur' }
    setUser(u)
    aller('dashboard-vendeur', 'vendeur', u)
  }

  return (
    <div className="max-w-md mx-auto">
      <button onClick={() => aller('accueil')} className="text-amber-700 text-sm mb-4">&larr; Retour</button>
      <div className="bg-white rounded-2xl p-6 border-2" style={{ borderColor: C.border }}>
        <h2 className="font-black text-slate-900 text-xl mb-1">Inscription Vendeur</h2>
        <p className="text-slate-500 text-sm mb-6">Créez votre compte pour commencer à vendre.</p>

        <div className="text-center mb-6">
          <div className="w-24 h-24 rounded-full mx-auto border-4 overflow-hidden cursor-pointer
            hover:opacity-80 transition-opacity flex items-center justify-center bg-slate-50"
            style={{ borderColor: C.border }}
            onClick={() => fileRef.current?.click()}>
            {preview
              ? <img src={preview} alt="Photo" className="w-full h-full object-cover" />
              : <span className="text-3xl">&#128247;</span>
            }
          </div>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
          <button onClick={() => fileRef.current?.click()}
            className="text-xs text-amber-700 font-bold mt-2 hover:underline">
            Ajouter une photo
          </button>
          {errors.photo && <p className="text-red-500 text-xs mt-1">{errors.photo}</p>}
        </div>

        <div className="space-y-4">
          <ChampInput label="Nom et Prénom" value={form.nom} error={errors.nom}
            placeholder="Votre nom et prénom" onChange={v => update('nom', v)} />
          <ChampInput label="E-mail" type="email" value={form.email} error={errors.email}
            placeholder=".....@gmail.com" onChange={v => update('email', v)} />
          <ChampInput label="Numéro de téléphone" type="tel" value={form.tel} error={errors.tel}
            placeholder="+229 01 00 00 00 00" onChange={v => update('tel', v)} />
        </div>

        <button onClick={soumettre}
          className="w-full mt-6 py-3 rounded-xl text-white font-black text-sm
            transition-all hover:opacity-90 hover:shadow-md hover:-translate-y-0.5"
          style={{ background: C.primary }}>
          Créer mon compte vendeur &rarr;
        </button>
      </div>
    </div>
  )
}

function InscriptionAcheteur({ aller, setUser }) {
  const [form,   setForm]   = useState({ email: '', tel: '', nom: '' })
  const [errors, setErrors] = useState({})

  const update = (f, v) => {
    setForm(p => ({ ...p, [f]: sanitize(v) }))
    setErrors(p => ({ ...p, [f]: '' }))
  }

  const soumettre = () => {
    const err = {}
    if (!isValidEmail(form.email)) err.email = 'E-mail invalide'
    if (!form.tel.trim())          err.tel   = 'Téléphone requis'
    if (!form.nom.trim())          err.nom   = 'Nom requis'
    if (Object.keys(err).length > 0) { setErrors(err); return }
    const u = { ...form, role: 'acheteur' }
    setUser(u)
    aller('vue-acheteur', 'acheteur', u)
  }

  return (
    <div className="max-w-md mx-auto">
      <button onClick={() => aller('accueil')} className="text-amber-700 text-sm mb-4">&larr; Retour</button>
      <div className="bg-white rounded-2xl p-6 border-2" style={{ borderColor: C.border }}>
        <h2 className="font-black text-slate-900 text-xl mb-1">Inscription Acheteur</h2>
        <p className="text-slate-500 text-sm mb-6">Accédez aux produits disponibles sur la marketplace.</p>

        <div className="space-y-4">
          <ChampInput label="Email" type="e-mail" value={form.email} error={errors.email}
            placeholder="...... @email.com" onChange={v => update('email', v)} />
          <ChampInput label="Numero de telephone" type="tel" value={form.tel} error={errors.tel}
            placeholder="+229 01 00 00 00 00" onChange={v => update('tel', v)} />
          <ChampInput label="Nom et Prénom" value={form.nom} error={errors.nom}
            placeholder="Votre nom et prénom" onChange={v => update('nom', v)} />
        </div>

        <button onClick={soumettre}
          className="w-full mt-6 py-3 rounded-xl text-white font-black text-sm
            transition-all hover:opacity-90 hover:shadow-md hover:-translate-y-0.5"
          style={{ background: C.primary }}>
          Accéder a la marketplace &rarr;
        </button>
      </div>
    </div>
  )
}

function DashboardVendeur({ aller, user }) {
  const [onglet,   setOnglet]   = useState('articles')
  const [articles, setArticles] = useState(MOCK_ARTICLES.filter(a => a.vendeur === 'Kofi Mensah'))

  const onglets = [
    { id: 'articles',   label: 'Mes articles', icon: '&#128230;' },
    { id: 'poster',     label: 'Poster',        icon: '&#43;'     },
    { id: 'messagerie', label: 'Messages',      icon: '&#128172;' },
    { id: 'retrait',    label: 'Retrait',        icon: '&#128176;' },
    { id: 'achat',      label: 'Achat',          icon: '&#128722;' },
  ]

  return (
    <div>
      <div className="flex items-center gap-4 mb-6 p-4 bg-white rounded-2xl border"
        style={{ borderColor: C.border }}>
        <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center
          text-amber-700 font-black text-lg overflow-hidden flex-shrink-0">
          {user?.photo
            ? <img src={user.photo} alt="" className="w-full h-full object-cover" />
            : <span>&#128100;</span>
          }
        </div>
        <div>
          <p className="font-black text-slate-900">Bonjour, {user?.nom || 'Vendeur'} !</p>
          <p className="text-xs text-slate-400">Tableau de bord vendeur</p>
        </div>
        <button onClick={() => aller('accueil')}
          className="ml-auto text-xs text-slate-400 hover:text-red-500 transition-colors">
          Déconnexion
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
        {onglets.map(o => (
          <button key={o.id} onClick={() => setOnglet(o.id)}
            className={[
              'flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap',
              'transition-all duration-200 flex-shrink-0',
              onglet === o.id
                ? 'text-white shadow-md'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-amber-400'
            ].join(' ')}
            style={onglet === o.id ? { background: C.primary } : {}}>
            <span dangerouslySetInnerHTML={{ __html: o.icon }} /> {o.label}
          </button>
        ))}
      </div>

      {onglet === 'articles'   && <MesArticles   articles={articles} setArticles={setArticles} />}
      {onglet === 'poster'     && <PostArticle   articles={articles} setArticles={setArticles} setOnglet={setOnglet} />}
      {onglet === 'messagerie' && <Messagerie    role="vendeur" />}
      {onglet === 'retrait'    && <Retrait />}
      {onglet === 'achat'      && <Achat />}
    </div>
  )
}

//  Mes Articles
function MesArticles({ articles, setArticles }) {
  const supprimer = (id) => setArticles(p => p.filter(a => a.id !== id))

  if (articles.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-2xl border" style={{ borderColor: C.border }}>
        <div className="text-4xl mb-3">&#128237;</div>
        <p className="font-bold text-slate-600">Aucun article publié</p>
        <p className="text-slate-400 text-sm">Utilisez Poster pour ajouter vos produits.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {articles.map(a => (
        <div key={a.id} className="bg-white rounded-2xl p-4 border-2 hover:shadow-md transition-all"
          style={{ borderColor: C.border }}>
          <div className="w-full h-32 bg-slate-100 rounded-xl mb-3 flex items-center justify-center overflow-hidden">
            {a.photo
              ? <img src={a.photo} alt={a.titre} className="w-full h-full object-cover rounded-xl" />
              : <span className="text-4xl">&#128230;</span>
            }
          </div>
          <h3 className="font-black text-slate-800 text-sm mb-1">{a.titre}</h3>
          <p className="text-slate-500 text-xs mb-2">{a.desc}</p>
          <div className="flex items-center justify-between">
            <div>
              <span className="font-black text-amber-700 text-sm">{a.prix}</span>
              <span className="text-xs text-slate-400 ml-2">Qte: {a.qte}</span>
            </div>
            <button onClick={() => supprimer(a.id)}
              className="text-xs text-red-400 hover:text-red-600 font-bold">Supprimer</button>
          </div>
        </div>
      ))}
    </div>
  )
}

// Poster Article
function PostArticle({ articles, setArticles, setOnglet }) {
  const [form,    setForm]    = useState({ titre: '', qte: '', prix: '', desc: '' })
  const [preview, setPreview] = useState(null)
  const [errors,  setErrors]  = useState({})
  const [ok,      setOk]      = useState(false)
  const fileRef = useRef(null)

  const update = (f, v) => {
    setForm(p => ({ ...p, [f]: f === 'titre' || f === 'desc' ? sanitize(v) : v }))
    setErrors(p => ({ ...p, [f]: '' }))
  }

  const handlePhoto = (e) => {
    const file = e.target.files[0]
    if (!file) return
    if (file.size > 5 * 1024 * 1024) { setErrors(p => ({ ...p, photo: 'Photo max 5MB' })); return }
    setPreview(URL.createObjectURL(file))
  }

  const publier = () => {
    const err = {}
    if (!form.titre.trim())                      err.titre = 'Titre requis'
    if (!form.qte || isNaN(form.qte) || +form.qte <= 0) err.qte = 'Quantité invalide'
    if (!form.prix.trim())                       err.prix  = 'Prix requis'
    if (Object.keys(err).length > 0) { setErrors(err); return }
    setArticles(p => [{ id: Date.now(), vendeur: 'Moi', photo: preview,
      titre: form.titre, qte: +form.qte, prix: form.prix, desc: form.desc || 'Aucune description.' }, ...p])
    setOk(true)
    setTimeout(() => { setOk(false); setOnglet('articles') }, 1500)
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl p-6 border-2" style={{ borderColor: C.border }}>
      <h3 className="font-black text-slate-900 text-lg mb-5">Publier un article</h3>

      <div className="w-full h-40 bg-slate-50 rounded-xl border-2 border-dashed mb-5
        flex flex-col items-center justify-center cursor-pointer hover:bg-slate-100 transition-colors"
        style={{ borderColor: C.border }}
        onClick={() => fileRef.current?.click()}>
        {preview
          ? <img src={preview} alt="Article" className="w-full h-full object-cover rounded-xl" />
          : <><span className="text-4xl mb-2">&#128247;</span><p className="text-xs text-slate-400">Cliquez pour ajouter la photo</p></>
        }
      </div>
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
      {errors.photo && <p className="text-red-500 text-xs -mt-3 mb-3">{errors.photo}</p>}

      <div className="space-y-4">
        <ChampInput label="Nom de l'article" value={form.titre} error={errors.titre}
          placeholder="Nom de votre produit" onChange={v => update('titre', v)} />
        <div className="grid grid-cols-2 gap-3">
          <ChampInput label="Quantité" type="number" value={form.qte} error={errors.qte}
            placeholder="10" onChange={v => update('qte', v)} />
          <ChampInput label="Prix" value={form.prix} error={errors.prix}
            placeholder="prix en FCFA" onChange={v => update('prix', v)} />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-600 mb-1">Description (optionnel)</label>
          <textarea value={form.desc} onChange={e => update('desc', e.target.value)}
            placeholder="Décrivez votre article..." rows={3} maxLength={300}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm bg-white
              text-slate-800 focus:outline-none focus:ring-2 resize-none" />
        </div>
      </div>

      <button onClick={publier}
        className={['w-full mt-5 py-3 rounded-xl text-white font-black text-sm transition-all',
          ok ? 'bg-green-500' : 'hover:opacity-90 hover:shadow-md hover:-translate-y-0.5'].join(' ')}
        style={ok ? {} : { background: C.primary }}>
        {ok ? 'Article publie !' : "Publier l'article"}
      </button>
    </div>
  )
}


// Messagerie
function Messagerie({ role }) {
  const [msg,  setMsg]  = useState('')
  const [msgs, setMsgs] = useState(MOCK_MESSAGES)
  const bottomRef = useRef(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [msgs])

  const envoyer = () => {
    const texte = sanitize(msg.trim())
    if (!texte) return
    const heure = new Date().toLocaleTimeString('fr', { hour: '2-digit', minute: '2-digit' })
    setMsgs(p => [...p, { id: Date.now(), de: 'Moi', texte, heure }])
    setMsg('')
  }

  return (
    <div className="bg-white rounded-2xl border-2 overflow-hidden" style={{ borderColor: C.border }}>
      <div className="px-4 py-3 border-b" style={{ borderColor: C.border, background: C.light }}>
        <p className="font-black text-slate-800 text-sm">
          {role === 'vendeur' ? 'Discussion avec vos acheteurs' : 'Discussion avec le vendeur'}
        </p>
      </div>

      <div className="h-72 overflow-y-auto p-4 space-y-3">
        {msgs.map(m => (
          <div key={m.id} className={['flex', m.de === 'Moi' ? 'justify-end' : 'justify-start'].join(' ')}>
            <div className={['max-w-xs px-4 py-2 rounded-2xl text-sm',
              m.de === 'Moi' ? 'text-white rounded-br-sm' : 'bg-slate-100 text-slate-800 rounded-bl-sm'].join(' ')}
              style={m.de === 'Moi' ? { background: C.primary } : {}}>
              {m.de !== 'Moi' && <p className="text-xs font-bold mb-1 opacity-70">{m.de}</p>}
              <p>{m.texte}</p>
              <p className="text-xs opacity-50 mt-1 text-right">{m.heure}</p>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="flex gap-2 p-3 border-t" style={{ borderColor: C.border }}>
        <input type="text" value={msg} onChange={e => setMsg(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && envoyer()}
          placeholder="Votre message..." maxLength={500}
          className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-sm
            focus:outline-none focus:ring-2 bg-white" />
        <button onClick={envoyer}
          className="w-10 h-10 rounded-xl text-white flex items-center justify-center
            transition-all hover:opacity-90 flex-shrink-0 font-bold"
          style={{ background: C.primary }} aria-label="Envoyer">
          &#9658;
        </button>
      </div>
    </div>
  )
}

// Partie pour le retrait
function Retrait() {
  const [reseau,  setReseau]  = useState(null)
  const [numero,  setNumero]  = useState('')
  const [montant, setMontant] = useState('')
  const [ok,      setOk]      = useState(false)
  const [error,   setError]   = useState('')

  const soumettre = () => {
    if (!reseau)                   { setError('Choisissez un réseau Momo'); return }
    if (!numero.trim())            { setError('Numéro requis'); return }
    if (!montant || +montant <= 0) { setError('Montant invalide'); return }
    setError('')
    setOk(true)
  }

  if (ok) {
    return (
      <div className="max-w-md mx-auto bg-white rounded-2xl p-6 border-2 text-center"
        style={{ borderColor: C.border }}>
        <div className="text-5xl mb-3">&#10003;</div>
        <p className="font-black text-slate-800 mb-1">Demande de retrait envoyée !</p>
        <p className="text-slate-500 text-sm">Vous recevrez votre paiement sous 24h.</p>
        <button onClick={() => { setOk(false); setReseau(null); setNumero(''); setMontant('') }}
          className="mt-4 text-sm text-amber-700 font-bold hover:underline">Nouveau retrait</button>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl p-6 border-2" style={{ borderColor: C.border }}>
      <h3 className="font-black text-slate-900 text-lg mb-1">Retrait Momo</h3>
      <p className="text-slate-500 text-sm mb-6">Retirez vos gains via Mobile Money.</p>

      <p className="text-xs font-bold text-slate-600 mb-3">Choisissez votre réseau</p>
      <div className="grid grid-cols-2 gap-3 mb-5">
        {[{ id: 'Moov', label: 'Moov Money', bg: '#003087', color: '#fff' },
          { id: 'MTN',  label: 'MTN MoMo',   bg: '#FFC200', color: '#000' }].map(r => (
          <button key={r.id} onClick={() => { setReseau(r.id); setError('') }}
            className={['py-4 rounded-xl border-2 font-black text-sm transition-all',
              reseau === r.id ? 'shadow-md' : 'bg-white text-slate-600'].join(' ')}
            style={reseau === r.id
              ? { background: r.bg, color: r.color, borderColor: 'transparent' }
              : { borderColor: C.border }}>
            {r.label}
          </button>
        ))}
      </div>

      <div className="space-y-4 mb-4">
        <ChampInput label="Numéro Momo" type="tel" value={numero}
          placeholder="+229 01 00 00 00 00" onChange={v => { setNumero(sanitize(v)); setError('') }} />
        <ChampInput label="Montant (FCFA)" type="number" value={montant}
          placeholder="Ex: 10000" onChange={v => { setMontant(v); setError('') }} />
      </div>

      {error && <p className="text-red-500 text-xs mb-3">{error}</p>}

      <button onClick={soumettre}
        className="w-full py-3 rounded-xl text-white font-black text-sm transition-all hover:opacity-90"
        style={{ background: C.primary }}>
        Demander le retrait
      </button>
    </div>
  )
}

// Bloc pour vendeur
function Achat() {
  const [form,   setForm]   = useState({ qte: '', cout: '', numero: '' })
  const [reseau, setReseau] = useState(null)
  const [errors, setErrors] = useState({})
  const [ok,     setOk]     = useState(false)

  const update = (f, v) => {
    setForm(p => ({ ...p, [f]: sanitize(v) }))
    setErrors(p => ({ ...p, [f]: '' }))
  }

  const payer = () => {
    const err = {}
    if (!form.qte || +form.qte <= 0)   err.qte    = 'Quantité invalide'
    if (!form.cout || +form.cout <= 0)  err.cout   = 'Cout invalide'
    if (!form.numero.trim())            err.numero = 'Numéro requis'
    if (!reseau)                         err.reseau = 'Choisissez un réseau'
    if (Object.keys(err).length > 0) { setErrors(err); return }
    setOk(true)
  }

  if (ok) {
    return (
      <div className="max-w-md mx-auto bg-white rounded-2xl p-6 border-2 text-center"
        style={{ borderColor: C.border }}>
        <div className="text-5xl mb-3">&#128241;</div>
        <p className="font-black text-slate-800 mb-1">Confirmation envoyée !</p>
        <p className="text-slate-500 text-sm px-4">
          Vous allez recevoir un message de confirmation de paiement sur votre téléphone.
        </p>
        <button onClick={() => { setOk(false); setForm({ qte: '', cout: '', numero: '' }); setReseau(null) }}
          className="mt-4 text-sm text-amber-700 font-bold hover:underline">Nouvel achat</button>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl p-6 border-2" style={{ borderColor: C.border }}>
      <h3 className="font-black text-slate-900 text-lg mb-1">Achat</h3>
      <p className="text-slate-500 text-sm mb-6">Payez votre stock via Mobile Money.</p>

      <div className="space-y-4 mb-5">
        <ChampInput label="Quantite" type="number" value={form.qte} error={errors.qte}
          placeholder="Ex: 20" onChange={v => update('qte', v)} />
        <ChampInput label="Cout total (FCFA)" type="number" value={form.cout} error={errors.cout}
          placeholder="Ex: 500000" onChange={v => update('cout', v)} />
        <ChampInput label="Numero de paiement" type="tel" value={form.numero} error={errors.numero}
          placeholder="+229 00 00 00 00" onChange={v => update('numero', v)} />
      </div>

      <p className="text-xs font-bold text-slate-600 mb-3">Réseau de paiement</p>
      <div className="grid grid-cols-2 gap-3 mb-2">
        {[{ id: 'Moov', label: 'Moov', bg: '#003087', color: '#fff' },
          { id: 'MTN',  label: 'MTN',  bg: '#FFC200', color: '#000' }].map(r => (
          <button key={r.id} onClick={() => { setReseau(r.id); setErrors(p => ({ ...p, reseau: '' })) }}
            className={['py-3 rounded-xl border-2 font-bold text-sm transition-all',
              reseau === r.id ? 'shadow-md' : 'bg-white text-slate-600'].join(' ')}
            style={reseau === r.id
              ? { background: r.bg, color: r.color, borderColor: 'transparent' }
              : { borderColor: C.border }}>
            {r.label}
          </button>
        ))}
      </div>
      {errors.reseau && <p className="text-red-500 text-xs mb-3">{errors.reseau}</p>}

      <button onClick={payer}
        className="w-full mt-4 py-3 rounded-xl text-white font-black text-sm
          transition-all hover:opacity-90 hover:shadow-md"
        style={{ background: C.primary }}>
        &#128241; Payer par Momo
      </button>
    </div>
  )
}

// pour les acheteurs

function VueAcheteur({ aller, user }) {
  const [onglet,   setOnglet]   = useState('produits')
  const [commande, setCommande] = useState(null)

  return (
    <div>
      <div className="flex items-center gap-4 mb-6 p-4 bg-white rounded-2xl border"
        style={{ borderColor: C.border }}>
        <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center
          text-amber-700 font-black flex-shrink-0">
          &#128717;
        </div>
        <div>
          <p className="font-black text-slate-900">Bonjour, {user?.nom || 'Acheteur'} !</p>
          <p className="text-xs text-slate-400">Espace acheteur</p>
        </div>
        <button onClick={() => aller('accueil')}
          className="ml-auto text-xs text-slate-400 hover:text-red-500 transition-colors">
          Déconnexion
        </button>
      </div>

      <div className="flex gap-2 mb-6">
        {[{ id: 'produits', label: 'Produits', icon: '&#128722;' },
          { id: 'messagerie', label: 'Messages', icon: '&#128172;' }].map(o => (
          <button key={o.id} onClick={() => setOnglet(o.id)}
            className={['flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all',
              onglet === o.id ? 'text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:border-amber-400'].join(' ')}
            style={onglet === o.id ? { background: C.primary } : {}}>
            <span dangerouslySetInnerHTML={{ __html: o.icon }} /> {o.label}
          </button>
        ))}
      </div>

      {onglet === 'produits'   && <ProduitsAcheteur setCommande={setCommande} />}
      {onglet === 'messagerie' && <Messagerie role="acheteur" />}

      {commande && <ModalCommande article={commande} onClose={() => setCommande(null)} />}
    </div>
  )
}

function ProduitsAcheteur({ setCommande }) {
  return (
    <div>
      <h3 className="font-black text-slate-800 text-lg mb-4">Produits disponibles</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {MOCK_ARTICLES.map(a => (
          <div key={a.id} className="bg-white rounded-2xl border-2 overflow-hidden hover:shadow-lg transition-all"
            style={{ borderColor: C.border }}>
            <div className="w-full h-36 bg-slate-100 flex items-center justify-center">
              {a.photo
                ? <img src={a.photo} alt={a.titre} className="w-full h-full object-cover" />
                : <span className="text-5xl">&#128230;</span>
              }
            </div>
            <div className="p-4">
              <p className="text-xs text-slate-400 mb-1">Vendeur : {a.vendeur}</p>
              <h4 className="font-black text-slate-800 text-sm mb-1">{a.titre}</h4>
              <p className="text-xs text-slate-500 mb-3">{a.desc}</p>
              <div className="flex items-center justify-between mb-3">
                <span className="font-black text-amber-700">{a.prix}</span>
                <span className="text-xs text-slate-400">Qte: {a.qte}</span>
              </div>
              <button onClick={() => setCommande(a)}
                className="w-full py-2.5 rounded-xl text-white font-bold text-xs
                  transition-all hover:opacity-90 hover:shadow-md"
                style={{ background: C.primary }}>
                Passer une commande &rarr;
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ModalCommande({ article, onClose }) {
  const closeRef = useRef(null)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const fn = e => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', fn)
    return () => { window.removeEventListener('keydown', fn); document.body.style.overflow = '' }
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }}
      onClick={onClose} role="dialog" aria-modal="true">
      <div className="bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-2xl shadow-2xl"
        onClick={e => e.stopPropagation()}>
        <div className="flex justify-center pt-3 pb-1 sm:hidden">
          <div className="w-10 h-1 bg-slate-200 rounded-full" />
        </div>
        <div className="p-6">
          <button ref={closeRef} onClick={onClose}
            className="float-right w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200
              flex items-center justify-center text-slate-500 text-sm">x</button>
          <h3 className="font-black text-slate-900 text-lg mb-1">Commander</h3>
          <p className="text-sm font-bold mb-4" style={{ color: C.primary }}>
            {article.titre} -- {article.prix}
          </p>
          <p className="text-slate-500 text-sm mb-6">
            Votre demande sera envoyée directement au vendeur <strong>{article.vendeur}</strong> via la messagerie.
          </p>
          <div className="flex gap-3">
            <button onClick={onClose}
              className="flex-1 py-3 rounded-xl text-white font-black text-sm transition-all hover:opacity-90"
              style={{ background: C.primary }}>
              &#128172; Contacter le vendeur
            </button>
            <button onClick={onClose}
              className="px-5 py-3 rounded-xl border-2 border-slate-200 text-slate-500 text-sm font-bold hover:bg-slate-50">
              Annuler
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// POLITIQUE DE CONFIDENTIALITE

function PolitiqueConfidentialite({ aller }) {
  const sections = [
    { titre: '1. Collecte des données', texte: 'TradeNOVA Market collecte uniquement les informations nécessaires : nom, email, téléphone et photo de profil. Ces données ne sont jamais vendues a des tiers.' },
    { titre: '2. Utilisation des donnée', texte: 'Vos donnée servent a creer et gerer votre compte, faciliter les transactions entre vendeurs et acheteurs, et vous contacter si necessaire.' },
    { titre: '3. Paiements Mobile Money', texte: 'Les transactions Momo (Moov Money, MTN MoMo) sont traitées via les operateurs officiels. TradeNOVA Market ne stocke aucun code PIN ni donnee bancaire sensible.' },
    { titre: '4. Messagerie', texte: 'Les messages entre vendeurs et acheteurs sont confidentiels. Ils ne sont consultes qu en cas de signalement de comportement abusif.' },
    { titre: '5. Responsabilité des articles', texte: 'Chaque vendeur est responsable de l exactitude des informations de ses articles. Tout contenu frauduleux entraine la suspension du compte.' },
    { titre: '6. Droit de suppression', texte: 'Vous pouvez demander la suppression de votre compte et de vos donnée en contactant l administrateur via le Club In-NOVA.' },
    { titre: '7. Modifications', texte: 'TradeNOVA Market peut modifier cette politique a tout moment. Les utilisateurs seront informés de tout changement majeur.' },
  ]

  return (
    <div className="max-w-2xl mx-auto">
      <button onClick={() => aller('accueil')} className="text-amber-700 text-sm mb-4">&larr; Retour</button>
      <div className="bg-white rounded-2xl p-6 border-2" style={{ borderColor: C.border }}>
        <h2 className="font-black text-slate-900 text-xl mb-1">Politique de confidentialité</h2>
        <p className="text-slate-400 text-xs mb-6">Dernière mise à jour : Mars 2026  TradeNOVA Market</p>
        <div className="space-y-5">
          {sections.map((s, i) => (
            <div key={i}>
              <h3 className="font-black text-sm mb-2" style={{ color: C.primary }}>{s.titre}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{s.texte}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 pt-4 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-400">
            En utilisant TradeNOVA Market, vous acceptez cette politique de confidentialité.
          </p>
        </div>
      </div>
    </div>
  )
}

// CHAMP INPUT UTILITAIRE

function ChampInput({ label, value, onChange, error, placeholder, type = 'text' }) {
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
