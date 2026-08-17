// src/pages/Rejoindre/Rejoindre.jsx
import { useState } from 'react'
import { CalendarCheck, Target, HeartHandshake, Clock, Trophy } from 'lucide-react'
import Reveal from '../../components/Reveal'
import { sanitize, isValidEmail } from '../../utils/security'

const CONDITIONS = [
  { Icon: CalendarCheck,  label: '18 à 35 ans',           desc: "Le Club est réservé aux jeunes adultes en phase de construction professionnelle." },
  { Icon: Target,         label: 'Projet concret',        desc: "Avoir une idée ou un projet dans une des niches In-NOVA (Tech, Agri, Trade, Aqua)." },
  { Icon: HeartHandshake, label: 'Engagement solidaire',  desc: "Partager les valeurs de collaboration, d'innovation et d'entraide du Club." },
  { Icon: Clock,          label: 'Disponibilité',         desc: "Pouvoir consacrer au moins 5 heures par semaine aux activités du Club." },
]

const PHILOSOPHIE = [
  "Nous croyons que l'innovation naît de la diversité des esprits et de la force du collectif.",
  "Chaque membre est propriétaire de son projet — le Club soutient sans jamais s'approprier.",
  "La réussite individuelle nourrit la réussite collective et vice-versa.",
  "L'excellence est un standard, pas une exception.",
]

export default function Rejoindre() {
  const [form,   setForm]   = useState({ nom:'', prenom:'', email:'', tel:'', age:'', niche:'', projet:'', engagement:'' })
  const [errors, setErrors] = useState({})
  const [ok,     setOk]     = useState(false)

  const NICHES = ['TechNOVA - Technologie et Digital', 'AgriNOVA - Agriculture et Agroalimentaire', 'TradeNOVA - Commerce et Distribution', 'AquaNOVA - Eau et Environnement']

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
    if (!form.age.trim())          err.age        = 'Âge requis'
    if (!form.niche)               err.niche      = 'Choisissez une niche'
    if (!form.projet.trim())       err.projet     = 'Décrivez votre projet'
    if (!form.engagement.trim())   err.engagement = 'Décrivez votre engagement'
    if (Object.keys(err).length > 0) { setErrors(err); return }
    setOk(true)
    // TODO Phase 2 : POST /api/membership/apply/ { ...form }
    // + email a clubinnova08@gmail.com
  }

  return (
    <main className="min-h-screen bg-slate-50 pt-16">

      <header style={{ background:'linear-gradient(135deg, #0A1F5C 0%, #F59E0B 100%)' }}
        className="py-12 px-4 sm:px-6 text-center">
        <Reveal>
          <h1 className="font-black text-white text-3xl sm:text-4xl mb-3"
            style={{ fontFamily:'Arial, sans-serif' }}>
            Rejoindre In-NOVA
          </h1>
          <p className="text-white/70 text-sm max-w-xl mx-auto">
            Le Club In-NOVA est un club privé de 15 membres maximum. Chaque membre est propriétaire de son projet et bénéficie du soutien de tout le réseau.
          </p>
        </Reveal>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-10">

        {/* Philosophie */}
        <Reveal as="section" className="bg-white rounded-2xl p-6 border border-slate-100">
          <h2 className="font-black text-slate-900 text-xl mb-5" style={{ color:'#F59E0B' }}>
            La philosophie du Club
          </h2>
          <div className="space-y-3">
            {PHILOSOPHIE.map((p, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-[#F59E0B] font-black flex-shrink-0 mt-0.5">0{i+1}</span>
                <p className="text-slate-600 text-sm leading-relaxed">{p}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Conditions */}
        <section>
          <Reveal>
            <h2 className="font-black text-slate-900 text-2xl mb-6 text-center"
              style={{ fontFamily:'Arial, sans-serif' }}>
              Conditions d'entrée
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {CONDITIONS.map((c, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="bg-white rounded-2xl p-5 border-2 hover:shadow-md hover:-translate-y-1 transition-all duration-300 h-full"
                  style={{ borderColor:'#FDE68A' }}>
                  <c.Icon className="mb-3" size={26} color="#B45309" />
                  <h3 className="font-black text-slate-800 text-sm mb-2" style={{ color:'#B45309' }}>
                    {c.label}
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed">{c.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Formulaire candidature */}
        <Reveal as="section" className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-100">
          <h2 className="font-black text-slate-900 text-xl mb-2" style={{ fontFamily:'Arial, sans-serif' }}>
            Formulaire de candidature
          </h2>
          <p className="text-slate-500 text-sm mb-6">
            Toutes les candidatures sont examinées par le Comité In-NOVA. Réponse sous 5 jours ouvrables.
          </p>

          {ok ? (
            <div className="text-center py-10">
              <Trophy className="mx-auto mb-4" size={56} color="#F59E0B" />
              <p className="font-black text-slate-800 text-xl mb-2">Candidature soumise !</p>
              <p className="text-slate-500 text-sm max-w-sm mx-auto">
                Le Comité In-NOVA examinera votre dossier et vous contactera par email dans les 5 jours ouvrables.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Champ label="Nom" value={form.nom} error={errors.nom} ph="Votre nom"
                  onChange={v => update('nom', v)} />
                <Champ label="Prénom" value={form.prenom} error={errors.prenom} ph="Votre prénom"
                  onChange={v => update('prenom', v)} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Champ label="Email" type="email" value={form.email} error={errors.email}
                  ph="votre@email.com" onChange={v => update('email', v)} />
                <Champ label="Téléphone" type="tel" value={form.tel} error={errors.tel}
                  ph="+229 00 00 00 00" onChange={v => update('tel', v)} />
              </div>
              <Champ label="Âge" type="number" value={form.age} error={errors.age}
                ph="Votre âge" onChange={v => update('age', v)} />

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Niche d'intérêt</label>
                <select value={form.niche}
                  onChange={e => { setForm(p => ({ ...p, niche: e.target.value })); setErrors(p => ({ ...p, niche:'' })) }}
                  className={['w-full px-4 py-3 rounded-xl border text-sm bg-white focus:outline-none focus:ring-2',
                    errors.niche ? 'border-red-400' : 'border-slate-200'].join(' ')}>
                  <option value="">Choisissez votre niche...</option>
                  {NICHES.map(n => <option key={n}>{n}</option>)}
                </select>
                {errors.niche && <p className="text-red-500 text-xs mt-1">{errors.niche}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Votre projet</label>
                <textarea value={form.projet}
                  onChange={e => { setForm(p => ({ ...p, projet: sanitize(e.target.value) })); setErrors(p => ({ ...p, projet:'' })) }}
                  placeholder="Décrivez votre idée ou projet en quelques lignes..."
                  rows={4} maxLength={600}
                  className={['w-full px-4 py-3 rounded-xl border text-sm bg-white focus:outline-none focus:ring-2 resize-none',
                    errors.projet ? 'border-red-400' : 'border-slate-200'].join(' ')} />
                {errors.projet && <p className="text-red-500 text-xs mt-1">{errors.projet}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Votre engagement</label>
                <textarea value={form.engagement}
                  onChange={e => { setForm(p => ({ ...p, engagement: sanitize(e.target.value) })); setErrors(p => ({ ...p, engagement:'' })) }}
                  placeholder="Comment comptez-vous contribuer au Club In-NOVA ?"
                  rows={3} maxLength={400}
                  className={['w-full px-4 py-3 rounded-xl border text-sm bg-white focus:outline-none focus:ring-2 resize-none',
                    errors.engagement ? 'border-red-400' : 'border-slate-200'].join(' ')} />
                {errors.engagement && <p className="text-red-500 text-xs mt-1">{errors.engagement}</p>}
              </div>

              <button onClick={soumettre}
                className="w-full py-4 rounded-xl text-white font-black text-sm transition-all hover:opacity-90 hover:shadow-md hover:-translate-y-0.5"
                style={{ background:'linear-gradient(135deg, #0A1F5C, #F59E0B)' }}>
                Soumettre ma candidature
              </button>
              <p className="text-xs text-slate-400 text-center">
                En soumettant ce formulaire, votre candidature sera envoyée à clubinnova08@gmail.com
              </p>
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
