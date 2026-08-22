// src/pages/Bienfaisance/Bienfaisance.jsx
import { useState } from 'react'
import { Gift, FileText, HeartHandshake, GraduationCap, ShoppingBag, Target, Rocket, Star, CheckCircle2 } from 'lucide-react'
import Reveal from '../../components/Reveal'
import { sanitize, isValidEmail } from '../../utils/security'
import { dejaSoumis, enregistrerSoumission } from '../../utils/registre'

const ACTIONS = [
  { Icon: Gift,           titre: 'Dons et Ressources',       desc: "Collecte et redistribution de ressources matérielles et financières pour les femmes commerçantes en difficulté." },
  { Icon: FileText,       titre: 'Business Plans Gratuits',  desc: "Élaboration de plans d'affaires complets et gratuits pour les femmes souhaitant formaliser ou développer leur activité." },
  { Icon: HeartHandshake, titre: 'Accompagnement Personnel', desc: "Suivi individuel par des mentors du Club pour aider chaque bénéficiaire à atteindre ses objectifs commerciaux." },
  { Icon: GraduationCap,  titre: 'Formations Gratuites',     desc: "Sessions de formation en gestion, marketing et outils digitaux pour renforcer les compétences des bénéficiaires." },
]

const TEMOIGNAGES = [
  { nom:'Ama K.', ville:'Lomé', texte:"Grâce à In-NOVA, j'ai pu relancer mon commerce après une période difficile. Le business plan qu'ils m'ont fait m'a ouvert des portes que je ne pensais plus accessibles.", note:5 },
  { nom:'Fatou D.', ville:'Cotonou', texte:"L'accompagnement de l'équipe In-NOVA a changé ma vision des affaires. Je gère maintenant mon activité avec beaucoup plus de confiance et de structure.", note:5 },
]

export default function Bienfaisance() {
  const [tab,    setTab]    = useState('accompagnement')
  const [form,   setForm]   = useState({ nom:'', email:'', tel:'', activite:'', besoin:'' })
  const [errors, setErrors] = useState({})
  const [ok,     setOk]     = useState(false)

  const update = (k, v) => {
    setForm(p => ({ ...p, [k]: sanitize(v) }))
    setErrors(p => ({ ...p, [k]: '' }))
  }

  const soumettre = () => {
    const err = {}
    if (!form.nom.trim())          err.nom     = 'Nom requis'
    if (!isValidEmail(form.email)) err.email   = 'Email invalide'
    if (!form.tel.trim())          err.tel     = 'Téléphone requis'
    if (!form.activite.trim())     err.activite= 'Décrivez votre activité'
    if (Object.keys(err).length > 0) { setErrors(err); return }
    if (dejaSoumis('innova_demandes_bienfaisance', form.email)) {
      setErrors(x => ({ ...x, email: 'Une demande a déjà été envoyée avec cet email.' }))
      return
    }
    enregistrerSoumission('innova_demandes_bienfaisance', form.email)
    setOk(true)
    // TODO Phase 2 : POST /api/bienfaisance/request/ { ...form }
    // + email a clubinnova08@gmail.com
  }

  return (
    <main className="min-h-screen bg-slate-50 pt-16">

      <header style={{ background:'linear-gradient(135deg, #0A1F5C 0%, #7E22CE 100%)' }}
        className="py-12 px-4 sm:px-6 text-center">
        <Reveal>
          <HeartHandshake className="mx-auto mb-3 text-white" size={40} />
          <h1 className="font-black text-white text-3xl sm:text-4xl mb-3"
            style={{ fontFamily:'Arial, sans-serif' }}>
            Bienfaisance In-NOVA
          </h1>
          <p className="text-white/70 text-sm max-w-xl mx-auto">
            Soutenir les femmes commerçantes en difficulté par des actions concrètes, solidaires et durables.
          </p>
        </Reveal>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-10">

        {/* Mission */}
        <Reveal as="section" className="bg-white rounded-2xl p-6 border border-slate-100">
          <h2 className="font-black text-slate-900 text-xl mb-4" style={{ color:'#7E22CE' }}>
            Notre Mission Sociale
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            Le programme Bienfaisance In-NOVA est né d'une conviction profonde : l'entrepreneuriat ne doit pas être réservé à ceux qui ont déjà tout. Nous croyons que chaque femme commerçante, aussi modeste soit son activité, mérite un soutien concret pour surmonter ses difficultés et construire un avenir meilleur pour elle et sa famille.
          </p>
          <p className="text-slate-600 text-sm leading-relaxed mt-3">
            En collaboration avec nos entreprises partenaires et nos membres volontaires, nous mettons en place des actions ciblées pour autonomiser les femmes commerçantes d'Afrique de l'Ouest.
          </p>
        </Reveal>

        {/* Public cible */}
        <Reveal as="section" className="rounded-2xl p-6 border" style={{ background:'#FDF4FF', borderColor:'#E9D5FF' }}>
          <h2 className="font-black text-slate-900 text-xl mb-4" style={{ color:'#7E22CE' }}>
            Public cible
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { Icon: ShoppingBag, label: "Femmes commerçantes informelles en difficulté financière" },
              { Icon: Target,      label: "Porteuses de projets sans accès aux financements classiques" },
              { Icon: Rocket,      label: "Entrepreneuses cherchant à formaliser et structurer leur activité" },
            ].map((t, i) => (
              <div key={i} className="bg-white rounded-xl p-4 border border-purple-100 text-center hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                <t.Icon className="mx-auto mb-2" size={26} color="#7E22CE" />
                <p className="text-slate-600 text-xs leading-relaxed">{t.label}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Nos actions */}
        <section>
          <Reveal>
            <h2 className="font-black text-slate-900 text-2xl mb-6 text-center"
              style={{ fontFamily:'Arial, sans-serif' }}>
              Nos types d'actions
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {ACTIONS.map((a, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="bg-white rounded-2xl p-5 border-2 hover:shadow-md hover:-translate-y-1 transition-all duration-300 h-full"
                  style={{ borderColor:'#E9D5FF' }}>
                  <a.Icon className="mb-3" size={26} color="#7E22CE" />
                  <h3 className="font-black text-slate-800 text-sm mb-2" style={{ color:'#7E22CE' }}>
                    {a.titre}
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed">{a.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Temoignages */}
        <section>
          <Reveal>
            <h2 className="font-black text-slate-900 text-2xl mb-6 text-center">
              Témoignages
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {TEMOIGNAGES.map((t, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="bg-white rounded-2xl p-5 border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 h-full">
                  <div className="flex gap-0.5 mb-3">
                    {[1,2,3,4,5].map(s => (
                      <Star key={s} size={14} fill="#F59E0B" color="#F59E0B" />
                    ))}
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4 italic">
                    "{t.texte}"
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-black"
                      style={{ background:'#7E22CE' }}>
                      {t.nom[0]}
                    </div>
                    <div>
                      <p className="font-black text-slate-800 text-xs">{t.nom}</p>
                      <p className="text-slate-400 text-xs">{t.ville}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* CTA Boutons */}
        <div className="flex gap-3 mb-4">
          <button onClick={() => setTab('accompagnement')}
            className={['flex-1 py-3 rounded-xl font-black text-sm transition-all border-2',
              tab === 'accompagnement' ? 'text-white border-transparent' : 'bg-white text-slate-600 border-slate-200'].join(' ')}
            style={tab === 'accompagnement' ? { background:'#7E22CE' } : {}}>
            Demander un accompagnement
          </button>
          <button onClick={() => setTab('partenaire')}
            className={['flex-1 py-3 rounded-xl font-black text-sm transition-all border-2',
              tab === 'partenaire' ? 'text-white border-transparent' : 'bg-white text-slate-600 border-slate-200'].join(' ')}
            style={tab === 'partenaire' ? { background:'#0A1F5C' } : {}}>
            Devenir partenaire social
          </button>
        </div>

        {/* Formulaire */}
        <Reveal as="section" className="bg-white rounded-2xl p-6 border border-slate-100">
          {tab === 'accompagnement' ? (
            <>
              <h2 className="font-black text-slate-900 text-xl mb-5" style={{ color:'#7E22CE' }}>
                Demander un accompagnement
              </h2>
              {ok ? (
                <div className="text-center py-8">
                  <CheckCircle2 className="mx-auto mb-3" size={44} color="#7E22CE" />
                  <p className="font-black text-slate-800 text-lg mb-2">Demande envoyée !</p>
                  <p className="text-slate-500 text-sm">L'équipe Bienfaisance vous contactera rapidement.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <Champ label="Nom complet" value={form.nom} error={errors.nom}
                    ph="Votre nom" onChange={v => update('nom', v)} />
                  <Champ label="Email" type="email" value={form.email} error={errors.email}
                    ph="votre@email.com" onChange={v => update('email', v)} />
                  <Champ label="Téléphone" type="tel" value={form.tel} error={errors.tel}
                    ph="+229 00 00 00 00" onChange={v => update('tel', v)} />
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Décrivez votre activité</label>
                    <textarea value={form.activite} onChange={e => { update('activite', e.target.value) }}
                      placeholder="Quelle est votre activité commerciale et quelle difficulté rencontrez-vous ?"
                      rows={4} maxLength={500}
                      className={['w-full px-4 py-3 rounded-xl border text-sm bg-white focus:outline-none focus:ring-2 resize-none',
                        errors.activite ? 'border-red-400' : 'border-slate-200'].join(' ')} />
                    {errors.activite && <p className="text-red-500 text-xs mt-1">{errors.activite}</p>}
                  </div>
                  <button onClick={soumettre}
                    className="w-full py-3 rounded-xl text-white font-black text-sm transition-all hover:opacity-90 hover:shadow-md hover:-translate-y-0.5"
                    style={{ background:'#7E22CE' }}>
                    Envoyer ma demande
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-8">
              <HeartHandshake className="mx-auto mb-4" size={44} color="#7E22CE" />
              <h2 className="font-black text-slate-900 text-xl mb-2">Devenir Partenaire Social</h2>
              <p className="text-slate-500 text-sm mb-6 max-w-sm mx-auto">
                Rejoignez le programme Bienfaisance In-NOVA en tant que partenaire et contribuez au développement de l'entrepreneuriat féminin.
              </p>
              <a href="mailto:clubinnova08@gmail.com?subject=Partenariat Social Bienfaisance In-NOVA"
                className="inline-block px-8 py-3 rounded-xl text-white font-black text-sm transition-all hover:opacity-90 hover:shadow-md hover:-translate-y-0.5"
                style={{ background:'#0A1F5C' }}>
                Contacter l'équipe In-NOVA
              </a>
            </div>
          )}
        </Reveal>

      </div>
    </main>
  )
}

function Champ({ label, value, onChange, error, ph, type='text' }) {
  return (
    <div>
      <label className="block text-xs font-bold text-slate-600 mb-1">{label}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)}
        placeholder={ph} maxLength={150}
        className={['w-full px-4 py-3 rounded-xl border text-sm bg-white focus:outline-none focus:ring-2 transition-all',
          error ? 'border-red-400 bg-red-50' : 'border-slate-200'].join(' ')} />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )
}
