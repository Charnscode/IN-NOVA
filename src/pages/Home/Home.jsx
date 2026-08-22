// src/pages/Home/Home.jsx
import { Building2, Briefcase, HeartHandshake, Rocket, Sun, Trophy, Sprout, ArrowRight } from 'lucide-react'
import { STATS, getOpportunites } from '../../data/opportunites'
import { getPartenaires } from '../Partenaires/Partenaires'
import Reveal from '../../components/Reveal'
import { useInView, useCountUp } from '../../hooks/useScrollAnimation'

const PILIERS = [
  {
    nom:     'TechNOVA',
    sigle:   'TN',
    logo:    '/logos/technova.jpg',
    couleur: '#0066CC',
    bg:      '#EFF6FF',
    desc:    "Développement de solutions technologiques et numériques, favorisant l'innovation, la transformation digitale et la création d'outils répondant aux besoins des entreprises et des populations.",
  },
  {
    nom:     'AgriNOVA',
    sigle:   'AG',
    logo:    '/logos/agrinova.jpg',
    couleur: '#15803D',
    bg:      '#F0FDF4',
    desc:    "Dédié à l'agriculture, à l'agroalimentaire et aux innovations permettant de renforcer la productivité, la transformation locale et la sécurité alimentaire.",
  },
  {
    nom:     'TradeNOVA',
    sigle:   'TR',
    logo:    '/logos/tradenova.jpg',
    couleur: '#7E22CE',
    bg:      '#FDF4FF',
    desc:    "Orienté vers le commerce, le développement des activités marchandes, le commerce électronique et les nouvelles opportunités offertes par l'économie numérique.",
  },
  {
    nom:     'AquaNOVA',
    sigle:   'AQ',
    logo:    '/logos/aquanova.jpg',
    couleur: '#0369A1',
    bg:      '#F0F9FF',
    desc:    "Consacré aux problématiques liées à l'eau, à l'environnement, au développement durable et aux solutions innovantes répondant aux enjeux environnementaux.",
  },
]

const PROGRAMMES_APERCU = [
  { titre:'Bootcamp In-NOVA',   Icon:Rocket,  couleur:'#0066CC', tag:'15-19 juin 2026'  },
  { titre:'In-NOVA Summer',     Icon:Sun,     couleur:'#F59E0B', tag:'14-27 sept 2026'  },
  { titre:'In-NOVA Challenge',  Icon:Trophy,  couleur:'#7E22CE', tag:'14-26 déc 2026'   },
  { titre:'Accompagnement',     Icon:Sprout,  couleur:'#15803D', tag:'Programme continu'},
]

function StatCard({ s, delay = 0 }) {
  const [ref, inView] = useInView(0.4)
  const count = useCountUp(s.valeur, 1600, inView)
  return (
    <div ref={ref}
      className="bg-white rounded-2xl p-5 text-center border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'scale(1) translateY(0)' : 'scale(0.85) translateY(20px)',
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}ms, box-shadow 0.3s ease`,
      }}>
      <p className="font-black text-2xl sm:text-3xl mb-1" style={{ color:'#0066CC' }}>{count}</p>
      <p className="text-slate-500 text-xs font-bold">{s.label}</p>
    </div>
  )
}

export default function Home({ onNavigate }) {
  const OPPORTUNITES = getOpportunites()
  const PARTENAIRES = getPartenaires()
  return (
    <main className="min-h-screen bg-slate-50 pt-16">

      {/* HERO */}
      <header className="px-4 sm:px-6 py-16 sm:py-20 text-center relative overflow-hidden"
        style={{
          backgroundImage: 'linear-gradient(135deg, rgba(10,31,92,0.88) 0%, rgba(0,85,187,0.82) 100%), url(/images/home-hero.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}>
        {/* Formes flottantes discretes pour la fluidite */}
        <div className="absolute -top-10 -left-10 w-64 h-64 rounded-full bg-white/5 animate-float-slow pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-[#FCD603]/10 animate-float-slow pointer-events-none" style={{ animationDelay:'2s' }} />
        <div className="absolute top-1/3 right-10 w-24 h-24 rounded-full bg-white/5 animate-float-slow pointer-events-none" style={{ animationDelay:'4s' }} />

        {/* Carte semi-transparente : le fond photo reste visible au travers */}
        <Reveal className="max-w-3xl mx-auto relative rounded-3xl px-5 py-10 sm:px-10 sm:py-12 border border-white/20"
          style={{ background:'rgba(10,31,92,0.35)', backdropFilter:'blur(6px)' }}>
          <span className="inline-block bg-[#FCD603] text-[#001A4D] font-black text-xs px-4 py-1.5 rounded-full mb-6 animate-pulse-soft hover-grow">
            Club privé &mdash; 15 membres maximum
          </span>
          <h1 className="font-black text-white text-3xl sm:text-5xl leading-tight mb-5 transition-transform duration-500 hover:scale-[1.02]"
            style={{ fontFamily:'Arial, sans-serif' }}>
            In-NOVA &mdash; Le Club des jeunes entrepreneurs et innovateurs
          </h1>
          <p className="text-white/80 text-sm sm:text-base max-w-2xl mx-auto mb-8 leading-relaxed">
            Une communauté dynamique dédiée à l'employabilité, à l'entrepreneuriat et aux opportunités concrètes pour les jeunes.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button onClick={() => onNavigate('entreprises')}
              className="bg-[#FCD603] hover:bg-[#EAC600] text-[#001A4D] font-black text-sm px-5 py-3 rounded-xl transition-all hover:-translate-y-0.5 hover:scale-105 hover:shadow-lg flex items-center gap-2">
              <Building2 size={16} /> Découvrez nos entreprises
            </button>
            <button onClick={() => onNavigate('opportunites')}
              className="bg-white hover:bg-slate-100 text-[#001A4D] font-black text-sm px-5 py-3 rounded-xl transition-all hover:-translate-y-0.5 hover:scale-105 hover:shadow-lg flex items-center gap-2">
              <Briefcase size={16} /> Voir les opportunités
            </button>
            <button onClick={() => onNavigate('volontariat')}
              className="border-2 border-white/40 hover:border-white text-white font-bold text-sm px-5 py-3 rounded-xl transition-all hover:-translate-y-0.5 hover:scale-105">
              Rejoindre le volontariat
            </button>
            <button onClick={() => onNavigate('programmes')}
              className="border-2 border-white/40 hover:border-white text-white font-bold text-sm px-5 py-3 rounded-xl transition-all hover:-translate-y-0.5 hover:scale-105">
              Découvrez nos programmes
            </button>
          </div>
        </Reveal>

        {/* Teaser In-NOVA COMM, intégré au fond du hero */}
        <Reveal delay={150} className="max-w-3xl mx-auto mt-16 pt-12 border-t border-white/10 relative">
          <div className="flex items-center justify-center gap-2 mb-2">
            <HeartHandshake className="text-white animate-pulse-soft" size={24} />
            <h2 className="font-black text-white text-2xl" style={{ fontFamily:'Arial, sans-serif' }}>
              In-NOVA COMM
            </h2>
          </div>
          <p className="text-[#FCD603] font-bold text-sm mb-4">Opportunités &amp; Communication</p>
          <p className="text-white/70 text-sm max-w-xl mx-auto mb-6 leading-relaxed">
            La plateforme officielle de communication du Club. Centralise et diffuse : offres de stages,
            offres d'emplois, appels à projets, subventions et opportunités de financement.
          </p>
          <button onClick={() => onNavigate('opportunites')}
            className="bg-[#FCD603] hover:bg-[#EAC600] text-[#001A4D] font-black text-sm px-6 py-3 rounded-xl transition-all hover:-translate-y-0.5 hover:scale-105 hover:shadow-lg">
            Accéder aux opportunités
          </button>
        </Reveal>
      </header>

      {/* STATS */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 -mt-8 relative z-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {STATS.map((s, i) => <StatCard key={i} s={s} delay={i * 100} />)}
        </div>
      </section>

      {/* PRESENTATION DU CLUB */}
      <Reveal as="section" className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <h2 className="font-black text-[#001A4D] text-2xl sm:text-3xl text-center mb-8"
          style={{ fontFamily:'Arial, sans-serif' }}>
          Présentation du Club
        </h2>
        <div className="rounded-2xl p-6 sm:p-8 space-y-4" style={{ background:'#EFF6FF' }}>
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
            In-NOVA est un club privé regroupant un maximum de 15 membres, dédié à la promotion de l'entrepreneuriat,
            de l'innovation et de l'employabilité des jeunes. Né de la conviction que les talents et les idées
            existent, mais que leur transformation en projets viables nécessite un environnement propice,
            In-NOVA se positionne comme un catalyseur qui prépare les jeunes à saisir les opportunités offertes
            par les incubateurs, les investisseurs et les entreprises partenaires.
          </p>
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
            Notre démarche repose sur une logique de complémentarité : nous ne remplaçons pas les structures
            d'accompagnement existantes, nous contribuons à préparer les futurs entrepreneurs afin qu'ils puissent
            tirer pleinement parti des dispositifs déjà mis en place par les acteurs publics et privés.
          </p>
        </div>
      </Reveal>

      {/* PILIERS D'INNOVATION */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-16">
        <Reveal>
          <h2 className="font-black text-[#001A4D] text-2xl sm:text-3xl text-center mb-10"
            style={{ fontFamily:'Arial, sans-serif' }}>
            Nos piliers d'innovation
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PILIERS.map((p, i) => (
            <Reveal key={p.nom} delay={i * 100}>
              <button onClick={() => onNavigate('entreprises')}
                className="text-left bg-white rounded-2xl p-6 border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 w-full h-full group">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center overflow-hidden mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                  style={{ background:p.bg }}>
                  <img src={p.logo} alt={p.nom} className="w-full h-full object-cover" />
                </div>
                <h3 className="font-black text-lg mb-2 transition-colors" style={{ color:p.couleur, fontFamily:'Arial, sans-serif' }}>
                  {p.nom}
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed">{p.desc}</p>
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      {/* EVENEMENTS ET SALONS PARTENAIRES */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-16">
        <Reveal>
          <h2 className="font-black text-[#001A4D] text-2xl sm:text-3xl text-center mb-2"
            style={{ fontFamily:'Arial, sans-serif' }}>
            Événements &amp; Salons partenaires
          </h2>
          <p className="text-slate-500 text-sm text-center mb-10 max-w-xl mx-auto">
            In-NOVA relaie aussi les salons, foires et évènements de ses partenaires ouverts aux jeunes
            entrepreneurs et porteurs de projets.
          </p>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {OPPORTUNITES.filter(o => o.epingle && o.photo).map((o, i) => (
            <Reveal key={o.id} delay={i * 100}>
              <button onClick={() => onNavigate('opportunites')}
                className="text-left bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 w-full h-full group">
                <div className="h-36 w-full overflow-hidden">
                  <img src={o.photo} alt={o.titre} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div className="p-5">
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full" style={{ background:'#FFFBEB', color:'#B45309' }}>
                    {o.type}
                  </span>
                  <h3 className="font-black text-slate-900 text-sm mt-2 mb-1">{o.titre}</h3>
                  <p className="text-slate-400 text-xs mb-1">{o.org} &middot; {o.lieu}</p>
                  {o.extra && <p className="text-[#0066CC] text-xs font-bold">{o.extra}</p>}
                </div>
              </button>
            </Reveal>
          ))}
        </div>
        <Reveal className="text-center mt-8">
          <button onClick={() => onNavigate('opportunites')}
            className="border-2 border-[#0066CC] text-[#0066CC] hover:bg-[#0066CC] hover:text-white font-black text-sm px-6 py-3 rounded-xl transition-all hover:scale-105 inline-flex items-center gap-2">
            Voir tous les évènements et opportunités <ArrowRight size={16} />
          </button>
        </Reveal>
      </section>

      {/* PROGRAMMES EN APERCU */}
      <section className="px-4 sm:px-6 py-16" style={{ background:'#F1F5F9' }}>
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <h2 className="font-black text-[#001A4D] text-2xl sm:text-3xl text-center mb-2"
              style={{ fontFamily:'Arial, sans-serif' }}>
              Nos Programmes
            </h2>
            <p className="text-slate-500 text-sm text-center mb-10 max-w-xl mx-auto">
              Plusieurs programmes pour renforcer les compétences des jeunes et accompagner leurs projets.
            </p>
          </Reveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {PROGRAMMES_APERCU.map((p, i) => (
              <Reveal key={p.titre} delay={i * 90}>
                <div className="bg-white rounded-2xl p-5 text-center border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 h-full group">
                  <div className="w-12 h-12 mx-auto rounded-xl flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6"
                    style={{ background:p.couleur+'1A' }}>
                    <p.Icon size={20} color={p.couleur} />
                  </div>
                  <p className="font-black text-sm text-slate-800 mb-1">{p.titre}</p>
                  <p className="text-xs font-bold" style={{ color:p.couleur }}>{p.tag}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="text-center">
            <button onClick={() => onNavigate('programmes')}
              className="bg-[#0066CC] hover:bg-[#004FA3] text-white font-black text-sm px-6 py-3 rounded-xl transition-all hover:-translate-y-0.5 hover:scale-105 hover:shadow-lg">
              Découvrez tous nos programmes
            </button>
          </Reveal>
        </div>
      </section>

      {/* CTA FINAL */}
      <Reveal as="section" className="max-w-3xl mx-auto px-4 sm:px-6 py-16 text-center">
        <h2 className="font-black text-[#001A4D] text-2xl sm:text-3xl mb-3"
          style={{ fontFamily:'Arial, sans-serif' }}>
          Prêts à rejoindre l'aventure In-NOVA ?
        </h2>
        <p className="text-slate-500 text-sm mb-8 max-w-xl mx-auto">
          Que vous soyez porteur de projet, volontaire ou à la recherche d'opportunités, le Club In-NOVA vous accompagne.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button onClick={() => onNavigate('rejoindre')}
            className="bg-[#FCD603] hover:bg-[#EAC600] text-[#001A4D] font-black text-sm px-6 py-3 rounded-xl transition-all hover:-translate-y-0.5 hover:scale-105 hover:shadow-lg">
            Rejoindre le Club
          </button>
          <button onClick={() => onNavigate('contact')}
            className="border-2 border-[#0066CC] text-[#0066CC] hover:bg-[#0066CC] hover:text-white font-black text-sm px-6 py-3 rounded-xl transition-all hover:-translate-y-0.5 hover:scale-105">
            Nous contacter
          </button>
        </div>
      </Reveal>

      {/* PARTENAIRES */}
      {PARTENAIRES.length > 0 && (
        <section className="px-4 sm:px-6 py-14" style={{ background:'#F1F5F9' }}>
          <Reveal className="max-w-4xl mx-auto text-center">
            <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-6">Ils nous font confiance</p>
            <div className="flex flex-wrap items-center justify-center gap-8 mb-6">
              {PARTENAIRES.map((p, i) => (
                <button key={p.nom} onClick={() => onNavigate('partenaires')}
                  className="w-16 h-16 rounded-2xl overflow-hidden bg-white border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                  style={{ transitionDelay:`${i*80}ms` }} title={p.nom}>
                  <img src={p.logo} alt={p.nom} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
            <button onClick={() => onNavigate('partenaires')}
              className="text-[#0066CC] text-xs font-black hover:underline">
              Voir tous nos partenaires &rarr;
            </button>
          </Reveal>
        </section>
      )}
    </main>
  )
}
