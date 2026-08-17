// src/pages/Volontariat/Volontariat.jsx
import { useState } from 'react'
import { Laptop, GraduationCap, LineChart, HeartHandshake, Sprout, Smartphone,
  Trophy, Users, FileText, Rocket, Bell, CheckCircle2 } from 'lucide-react'
import Reveal from '../../components/Reveal'
import { sanitize, isValidEmail } from '../../utils/security'

const MISSIONS = [
  { Icon: Laptop,         titre: 'Support Digital',       desc: "Aide à la gestion des réseaux sociaux, création de contenus et communication digitale du Club." },
  { Icon: GraduationCap,  titre: 'Formation et Coaching',  desc: "Animation d'ateliers, accompagnement de jeunes entrepreneurs et transfert de compétences." },
  { Icon: LineChart,      titre: 'Recherche et Analyse',   desc: "Veille sur les opportunités, analyse de marché et production de rapports pour le Club." },
  { Icon: HeartHandshake, titre: 'Soutien Évènementiel',   desc: "Organisation et logistique des évènements, salons et programmes du Club In-NOVA." },
  { Icon: Sprout,         titre: 'Agriculture et Terrain', desc: "Support aux activités AgriNOVA et AquaNOVA sur le terrain et dans les exploitations." },
  { Icon: Smartphone,     titre: 'Tech et Innovation',     desc: "Contribution aux projets TechNOVA et développement de solutions numériques pour le Club." },
]

const AVANTAGES = [
  { Icon: Trophy,        titre: 'Expérience valorisante', desc: "Un parcours concret qui enrichit votre CV et renforce votre profil professionnel." },
  { Icon: Users,         titre: 'Réseau professionnel',   desc: "Intégrez un réseau de jeunes entrepreneurs dynamiques en Afrique de l'Ouest." },
  { Icon: FileText,      titre: 'Certificat officiel',    desc: "Recevez un certificat de volontariat reconnu signé par le Club In-NOVA." },
  { Icon: GraduationCap, titre: 'Formations gratuites',   desc: "Accès prioritaire à tous les programmes et formations organisés par le Club." },
  { Icon: Rocket,        titre: 'Évolution rapide',       desc: "Possibilité de rejoindre le Club comme membre à part entière après 6 mois." },
  { Icon: Bell,          titre: 'Opportunités en avant',  desc: "Soyez les premiers informés des opportunités exclusives du réseau In-NOVA." },
]

export default function Volontariat() {
  const [form,   setForm]   = useState({ nom:'', prenom:'', email:'', tel:'', domaine:'', motivation:'' })
  const [errors, setErrors] = useState({})
  const [ok,     setOk]     = useState(false)

  const DOMAINES = ['Digital et Marketing','Agriculture','Technologie','Évènementiel','Coaching','Recherche','Autre']

  const update = (k, v) => {
    setForm(p => ({ ...p, [k]: sanitize(v) }))
    setErrors(p => ({ ...p, [k]: '' }))
  }

  const soumettre = () => {
    const err = {}
    if (!form.nom.trim())          err.nom        = 'Nom requis'
    if (!form.prenom.trim())       err.prenom     = 'Prénom requis'
    if (!isValidEmail(form.email)) err.email      = 'Email invalide'
    if (!form.tel.trim())          err.tel        = 'Téléphone requis'
    if (!form.domaine)             err.domaine    = 'Choisissez un domaine'
    if (!form.motivation.trim())   err.motivation = 'Motivation requise'
    if (Object.keys(err).length > 0) { setErrors(err); return }
    setOk(true)
    // TODO Phase 2 : POST /api/volunteers/ { ...form }
    // + envoi email a clubinnova08@gmail.com
  }

  return (
    <main className="min-h-screen bg-slate-50 pt-16">

      <header style={{ background:'linear-gradient(135deg, #0A1F5C 0%, #0055BB 100%)' }}
        className="py-12 px-4 sm:px-6 text-center">
        <Reveal>
          <h1 className="font-black text-white text-3xl sm:text-4xl mb-3"
            style={{ fontFamily:'Arial, sans-serif' }}>
            Devenir Volontaire
          </h1>
          <p className="text-white/70 text-sm max-w-xl mx-auto">
            Rejoignez le mouvement In-NOVA et contribuez au développement de l'entrepreneuriat jeune en Afrique de l'Ouest.
          </p>
        </Reveal>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-12">

        {/* Pourquoi devenir volontaire */}
        <section>
          <Reveal>
            <h2 className="font-black text-slate-900 text-2xl mb-8 text-center"
              style={{ fontFamily:'Arial, sans-serif' }}>
              Pourquoi devenir volontaire In-NOVA ?
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {AVANTAGES.map((a, i) => (
              <Reveal key={i} delay={i * 70}>
                <div className="bg-white rounded-2xl p-5 border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 h-full">
                  <a.Icon className="mb-3" size={26} color="#0066CC" />
                  <h3 className="font-black text-slate-800 text-sm mb-2">{a.titre}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed">{a.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Missions */}
        <section>
          <Reveal>
            <h2 className="font-black text-slate-900 text-2xl mb-8 text-center"
              style={{ fontFamily:'Arial, sans-serif' }}>
              Missions disponibles
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {MISSIONS.map((m, i) => (
              <Reveal key={i} delay={i * 70}>
                <div className="bg-white rounded-2xl p-5 border-2 hover:shadow-md hover:-translate-y-1 transition-all duration-300 h-full"
                  style={{ borderColor:'#BFDBFE' }}>
                  <m.Icon className="mb-3" size={26} color="#0066CC" />
                  <h3 className="font-black text-[#0066CC] text-sm mb-2">{m.titre}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed">{m.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Formulaire */}
        <Reveal as="section" className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-100">
          <h2 className="font-black text-slate-900 text-2xl mb-2" style={{ fontFamily:'Arial, sans-serif' }}>
            Postuler maintenant
          </h2>
          <p className="text-slate-500 text-sm mb-6">
            Remplissez ce formulaire pour rejoindre l'équipe de volontaires In-NOVA.
          </p>

          {ok ? (
            <div className="text-center py-10">
              <CheckCircle2 className="mx-auto mb-4" size={56} color="#0066CC" />
              <p className="font-black text-slate-800 text-xl mb-2">Candidature envoyée !</p>
              <p className="text-slate-500 text-sm">
                L'équipe In-NOVA examinera votre candidature et vous contactera dans les 48h.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Champ label="Nom" value={form.nom} error={errors.nom}
                  ph="Votre nom" onChange={v => update('nom', v)} />
                <Champ label="Prénom" value={form.prenom} error={errors.prenom}
                  ph="Votre prénom" onChange={v => update('prenom', v)} />
              </div>
              <Champ label="Email" type="email" value={form.email} error={errors.email}
                ph="votre@email.com" onChange={v => update('email', v)} />
              <Champ label="Téléphone" type="tel" value={form.tel} error={errors.tel}
                ph="+229 00 00 00 00" onChange={v => update('tel', v)} />

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Domaine de compétence</label>
                <select value={form.domaine}
                  onChange={e => { setForm(p => ({ ...p, domaine: e.target.value })); setErrors(p => ({ ...p, domaine:'' })) }}
                  className={['w-full px-4 py-3 rounded-xl border text-sm bg-white focus:outline-none focus:ring-2',
                    errors.domaine ? 'border-red-400' : 'border-slate-200'].join(' ')}>
                  <option value="">Choisissez votre domaine...</option>
                  {DOMAINES.map(d => <option key={d}>{d}</option>)}
                </select>
                {errors.domaine && <p className="text-red-500 text-xs mt-1">{errors.domaine}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Motivation</label>
                <textarea value={form.motivation}
                  onChange={e => { setForm(p => ({ ...p, motivation: sanitize(e.target.value) })); setErrors(p => ({ ...p, motivation:'' })) }}
                  placeholder="Pourquoi souhaitez-vous devenir volontaire In-NOVA ?"
                  rows={4} maxLength={500}
                  className={['w-full px-4 py-3 rounded-xl border text-sm bg-white focus:outline-none focus:ring-2 resize-none',
                    errors.motivation ? 'border-red-400' : 'border-slate-200'].join(' ')} />
                {errors.motivation && <p className="text-red-500 text-xs mt-1">{errors.motivation}</p>}
              </div>

              <button onClick={soumettre}
                className="w-full py-4 rounded-xl text-white font-black text-sm transition-all hover:opacity-90 hover:shadow-md hover:-translate-y-0.5"
                style={{ background:'linear-gradient(135deg, #0A1F5C, #0055BB)' }}>
                Soumettre ma candidature de volontaire
              </button>
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
          error ? 'border-red-400 bg-red-50' : 'border-slate-200'].join(' ')}
        aria-invalid={!!error} />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )
}
