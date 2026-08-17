// src/pages/Programmes/Programmes.jsx
import { useState } from 'react'
import { Rocket, Sun, Trophy, Sprout, Users, ArrowLeft, Check, Star, Lock, Images, Bell } from 'lucide-react'
import Reveal from '../../components/Reveal'

const PROGRAMMES = [
  {
    id: 'bootcamp',
    titre: 'In-NOVA Bootcamp',
    Icon: Rocket,
    couleur: '#0066CC',
    bg: '#EFF6FF',
    realise: true,
    affiche: '/images/bootcamp-2026.jpg',
    dateRealisee: '15 juin 2026 — Abomey-Calavi',
    inscriptionsOuvertes: true,
    public: 'Étudiants, jeunes diplômés et porteurs de projets',
    desc: "Premier programme du Parcours Entrepreneurial In-NOVA. Formation intensive et immersive conçue pour préparer les jeunes aux exigences du monde professionnel et entrepreneurial : leadership, esprit d'initiative, gestion de projet et compréhension des réalités de l'entrepreneuriat.",
    objectifs: [
      "Découvrir les fondamentaux de l'entrepreneuriat",
      "Développer son leadership et sa communication professionnelle",
      "Renforcer sa capacité à travailler en équipe",
      "Acquérir les bases de la gestion de projet et de l'éducation financière",
      "Mieux préparer son insertion professionnelle",
    ],
    benefices: [
      "Renforcement des compétences entrepreneuriales et professionnelles",
      "Création de réseaux entre jeunes participants",
      "Identification des talents à fort potentiel",
      "Préparation aux programmes avancés (Summer, Challenge)",
    ],
  },
  {
    id: 'summer',
    titre: 'In-NOVA Summer',
    Icon: Sun,
    couleur: '#F59E0B',
    bg: '#FFFBEB',
    realise: false,
    affiche: null,
    inscriptionsOuvertes: true,
    public: 'Participants du Bootcamp et jeunes porteurs de projets',
    desc: "Deuxième programme du Parcours Entrepreneurial In-NOVA. Formation intensive de haut niveau en gestion de projet, planification stratégique et structuration d'initiatives, pour préparer les participants à l'In-NOVA Challenge.",
    objectifs: [
      "Maîtriser les principes fondamentaux de la gestion de projet",
      "Structurer une idée en projet réalisable",
      "Planifier les étapes de mise en œuvre d'une initiative",
      "Développer une culture de gestion des risques et de suivi",
      "Préparer son projet pour une présentation devant investisseurs",
    ],
    benefices: [
      "Amélioration de la qualité des projets présentés au Challenge",
      "Culture de gestion de projet renforcée",
      "Coaching et mentorat personnalisé",
      "Collaboration entre participants",
    ],
  },
  {
    id: 'challenge',
    titre: 'In-NOVA Challenge',
    Icon: Trophy,
    couleur: '#7E22CE',
    bg: '#FDF4FF',
    realise: false,
    affiche: null,
    inscriptionsOuvertes: false,
    public: "Jeunes entrepreneurs, étudiants et équipes en phase de démarrage",
    desc: "Programme phare du Parcours Entrepreneurial In-NOVA. Plus qu'un concours, c'est une plateforme de rencontre entre jeunes porteurs d'initiatives et les acteurs de l'écosystème : jury de professionnels, incubateurs, investisseurs et partenaires techniques.",
    objectifs: [
      "Identifier des projets innovants portés par des jeunes",
      "Promouvoir une culture de l'innovation et de la résolution de problèmes",
      "Mettre en relation les porteurs de projets avec incubateurs et investisseurs",
      "Offrir une visibilité accrue aux initiatives les plus prometteuses",
    ],
    benefices: [
      "Présentation du projet devant un jury d'experts et d'investisseurs",
      "Opportunités de mentorat et d'accompagnement",
      "Mise en relation avec incubateurs et partenaires techniques",
      "Visibilité institutionnelle lors de l'évènement",
    ],
  },
  {
    id: 'accompagnement',
    titre: "Programme d'Accompagnement",
    Icon: Sprout,
    couleur: '#15803D',
    bg: '#F0FDF4',
    realise: false,
    affiche: null,
    inscriptionsOuvertes: false,
    public: "Jeunes ayant démontré une réelle motivation entrepreneuriale",
    desc: "Continuité naturelle du Parcours Entrepreneurial In-NOVA. Un accompagnement de proximité pour orienter les jeunes entrepreneurs dans les premières étapes du développement de leur projet, sans se substituer aux incubateurs et structures spécialisées.",
    objectifs: [
      "Orienter les jeunes dans les premières étapes de leur parcours",
      "Favoriser la maturation des projets à fort potentiel",
      "Faciliter les échanges avec des professionnels et experts",
      "Préparer les porteurs de projets aux exigences des structures d'accompagnement",
    ],
    benefices: [
      "Suivi adapté aux besoins de chaque participant",
      "Mise en relation avec un réseau d'incubateurs, investisseurs et experts",
      "Renforcement de la confiance et de l'autonomie",
      "Orientation vers les structures les plus adaptées au projet",
    ],
  },
]

export default function Programmes() {
  const [selected, setSelected] = useState(null)

  if (selected) {
    return <ProgrammeDetail programme={selected} onBack={() => setSelected(null)} />
  }

  return (
    <main className="min-h-screen bg-slate-50 pt-16">
      <header style={{ background:'linear-gradient(135deg, #0A1F5C 0%, #0055BB 100%)' }}
        className="py-12 px-4 sm:px-6 text-center">
        <Reveal>
          <h1 className="font-black text-white text-3xl sm:text-4xl mb-3"
            style={{ fontFamily:'Arial, sans-serif' }}>
            Nos Programmes
          </h1>
          <p className="text-white/70 text-sm max-w-xl mx-auto">
            Des formations et programmes conçus pour accélérer votre développement professionnel et entrepreneurial.
          </p>
        </Reveal>
      </header>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {PROGRAMMES.map((p, i) => (
            <Reveal key={p.id} delay={i * 90}>
              <article
                className="bg-white rounded-2xl overflow-hidden border-2 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group h-full"
                style={{ borderColor: p.bg }}
                onClick={() => setSelected(p)}>
                <div className="h-2" style={{ background: p.couleur }} />
                <div className="p-6">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                    style={{ background: p.bg }}>
                    <p.Icon size={26} color={p.couleur} />
                  </div>
                  <h2 className="font-black text-slate-900 text-xl mb-2 group-hover:opacity-80"
                    style={{ fontFamily:'Arial, sans-serif', color: p.couleur }}>
                    {p.titre}
                  </h2>
                  <p className="text-slate-500 text-sm leading-relaxed mb-4"
                    style={{ display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>
                    {p.desc}
                  </p>
                  <div className="flex flex-wrap gap-3 text-xs text-slate-400 mb-3">
                    <span className="flex items-center gap-1"><Users size={12} /> {p.public}</span>
                  </div>
                  <span className="inline-block text-[10px] font-black px-2 py-1 rounded-full mb-5"
                    style={{ background: p.bg, color: p.couleur }}>
                    {p.realise ? 'Édition réalisée' : (p.inscriptionsOuvertes ? 'Inscriptions ouvertes' : 'Inscriptions non ouvertes')}
                  </span>
                  <button
                    className="w-full py-3 rounded-xl text-white font-bold text-sm transition-all hover:opacity-90 hover:shadow-md"
                    style={{ background: p.couleur }}>
                    Découvrir ce programme
                  </button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  )
}

function ProgrammeDetail({ programme: p, onBack }) {
  const [form,     setForm]     = useState({ nom:'', email:'', tel:'', motivation:'' })
  const [errors,   setErrors]   = useState({})
  const [inscrit,  setInscrit]  = useState(false)
  const [galerieOuverte, setGalerieOuverte] = useState(false)

  const soumettre = () => {
    const err = {}
    if (!form.nom.trim())   err.nom   = 'Nom requis'
    if (!form.email.trim()) err.email = 'Email requis'
    if (!form.tel.trim())   err.tel   = 'Téléphone requis'
    if (Object.keys(err).length > 0) { setErrors(err); return }
    setInscrit(true)
    // TODO Phase 2 : POST /api/programmes/apply/ { programme_id, ...form }
  }

  return (
    <main className="min-h-screen bg-slate-50 pt-16">
      <header style={{ background: 'linear-gradient(135deg, #0A1F5C 0%, ' + p.couleur + ' 100%)' }}
        className="py-12 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <button onClick={onBack}
            className="text-[#FCD603] hover:text-white text-sm font-bold mb-6 flex items-center gap-2 transition-colors">
            <ArrowLeft size={14} /> Retour aux programmes
          </button>

          {p.realise && p.affiche ? (
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
              <div className="w-40 h-40 rounded-2xl overflow-hidden flex-shrink-0 border-4 border-white/20 shadow-xl">
                <img src={p.affiche} alt={p.titre} className="w-full h-full object-cover" />
              </div>
              <div className="text-center sm:text-left">
                <h1 className="font-black text-white text-3xl" style={{ fontFamily:'Arial, sans-serif' }}>
                  {p.titre}
                </h1>
                <p className="text-white/70 text-sm mt-1">{p.dateRealisee}</p>
                <span className="inline-flex items-center gap-1.5 bg-white/15 text-white text-[11px] font-black px-3 py-1.5 rounded-full mt-3">
                  <Lock size={11} /> Candidatures fermées
                </span>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ background:'rgba(255,255,255,0.15)' }}>
                <p.Icon size={30} color="#FFFFFF" />
              </div>
              <div>
                <h1 className="font-black text-white text-3xl" style={{ fontFamily:'Arial, sans-serif' }}>
                  {p.titre}
                </h1>
                <div className="flex flex-wrap gap-3 mt-2 text-white/70 text-sm items-center">
                  <span className="flex items-center gap-1"><Users size={13} /> {p.public}</span>
                  <span className="bg-white/15 text-white text-[10px] font-black px-2 py-1 rounded-full">
                    {p.inscriptionsOuvertes ? 'Inscriptions ouvertes' : 'Inscriptions non ouvertes'}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-8">

        <Reveal as="section" className="bg-white rounded-2xl p-6 border border-slate-100">
          <h2 className="font-black text-slate-900 text-xl mb-4" style={{ color: p.couleur }}>
            Description
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">{p.desc}</p>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Reveal as="section" className="bg-white rounded-2xl p-6 border border-slate-100">
            <h2 className="font-black text-slate-900 text-lg mb-4" style={{ color: p.couleur }}>
              Objectifs
            </h2>
            <ul className="space-y-2">
              {p.objectifs.map((o, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                  <Check size={16} style={{ color: p.couleur }} className="flex-shrink-0 mt-0.5" />
                  {o}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal as="section" delay={100} className="bg-white rounded-2xl p-6 border border-slate-100">
            <h2 className="font-black text-slate-900 text-lg mb-4" style={{ color: p.couleur }}>
              Bénéfices
            </h2>
            <ul className="space-y-2">
              {p.benefices.map((b, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                  <Star size={16} style={{ color: p.couleur }} className="flex-shrink-0 mt-0.5" />
                  {b}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {p.realise ? (
          <Reveal as="section" className="bg-white rounded-2xl p-6 border border-slate-100">
            <div className="flex items-center justify-between flex-wrap gap-3 mb-2">
              <h2 className="font-black text-slate-900 text-xl" style={{ color: p.couleur }}>
                Édition {p.dateRealisee}
              </h2>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-black px-3 py-1.5 rounded-full"
                style={{ background: p.bg, color: p.couleur }}>
                <Lock size={11} /> Candidatures fermées
              </span>
            </div>
            <p className="text-slate-500 text-sm mb-5">
              Cette édition est terminée. Les prochaines dates seront annoncées sur cette page et sur nos réseaux sociaux.
            </p>
            <button onClick={() => setGalerieOuverte(o => !o)}
              className="font-black text-sm px-6 py-3 rounded-xl border-2 transition-all hover:-translate-y-0.5 inline-flex items-center gap-2"
              style={{ borderColor: p.couleur, color: p.couleur }}>
              <Images size={16} /> {galerieOuverte ? 'Masquer' : 'Voir plus'}
            </button>

            {galerieOuverte && (
              <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[1,2,3].map(n => (
                  <div key={n} className="aspect-square rounded-xl flex items-center justify-center border-2 border-dashed"
                    style={{ background: p.bg, borderColor: p.couleur+'40' }}>
                    <Images size={22} color={p.couleur} />
                  </div>
                ))}
                <p className="col-span-full text-slate-400 text-xs text-center pt-1">
                  Photos et vidéos de cette édition bientôt disponibles.
                </p>
              </div>
            )}
          </Reveal>
        ) : (
          <Reveal as="section" className="bg-white rounded-2xl p-6 border border-slate-100 text-center">
            <Bell className="mx-auto mb-3" size={32} color={p.couleur} />
            <h2 className="font-black text-slate-900 text-lg mb-2">
              {p.inscriptionsOuvertes ? 'Postuler au programme' : "Les inscriptions ne sont pas encore ouvertes"}
            </h2>

            {!p.inscriptionsOuvertes ? (
              <p className="text-slate-500 text-sm max-w-sm mx-auto">
                La date d'ouverture des candidatures pour {p.titre} sera annoncée prochainement. Revenez bientôt !
              </p>
            ) : inscrit ? (
              <div className="py-2">
                <p className="font-black text-slate-800 text-lg mb-2">Candidature envoyée !</p>
                <p className="text-slate-500 text-sm">L'équipe In-NOVA vous contactera dans les 48h.</p>
              </div>
            ) : (
              <div className="space-y-4 text-left mt-4">
                {[
                  { label:'Nom et prénom', key:'nom',   type:'text',  ph:'Votre nom complet' },
                  { label:'Email',         key:'email', type:'email', ph:'votre@email.com'   },
                  { label:'Téléphone',     key:'tel',   type:'tel',   ph:'+229 00 00 00 00'  },
                ].map(f => (
                  <div key={f.key}>
                    <label className="block text-xs font-bold text-slate-600 mb-1">{f.label}</label>
                    <input type={f.type} value={form[f.key]}
                      onChange={e => { setForm(x => ({ ...x, [f.key]: e.target.value })); setErrors(x => ({ ...x, [f.key]:'' })) }}
                      placeholder={f.ph} maxLength={150}
                      className={['w-full px-4 py-3 rounded-xl border text-sm bg-white focus:outline-none focus:ring-2 transition-all',
                        errors[f.key] ? 'border-red-400 bg-red-50' : 'border-slate-200'].join(' ')} />
                    {errors[f.key] && <p className="text-red-500 text-xs mt-1">{errors[f.key]}</p>}
                  </div>
                ))}
                <button onClick={soumettre}
                  className="w-full py-3 rounded-xl text-white font-black text-sm transition-all hover:opacity-90 hover:shadow-md hover:-translate-y-0.5"
                  style={{ background: p.couleur }}>
                  Envoyer ma candidature
                </button>
              </div>
            )}
          </Reveal>
        )}
      </div>
    </main>
  )
}
