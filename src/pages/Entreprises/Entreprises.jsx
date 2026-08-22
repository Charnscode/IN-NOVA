// src/pages/Entreprises/Entreprises.jsx
import { useState } from 'react'
import { ArrowRight, ArrowLeft, Check, Store, Mail } from 'lucide-react'
import Reveal from '../../components/Reveal'
import { useToast } from '../../components/Toast'
import { getProduitsBoutique } from '../Boutique/Boutique'

// Une boutique est "disponible" (le bouton mene vers la page) des qu'elle a
// au moins un produit publie (donnees de base + ajouts admin). Tant qu'elle
// est vide, le bouton affiche "Pas encore disponible".
function boutiqueDisponible(entrepriseId) {
  return getProduitsBoutique(entrepriseId).length > 0
}

export const EMAILS_ENTREPRISES = {
  technova:  'entreprisetechnova@gmail.com',
  agrinova:  'agrinovaentreprise@gmail.com',
  tradenova: 'tradenovaentreprise@gmail.com',
  'tradenova-market': 'tradenovaentreprise@gmail.com',
  aquanova:  'aquanovaentreprise@gmail.com',
}

const ENTREPRISES = [
  {
    id: 'technova',
    nom: 'TechNOVA',
    logo: '/logos/technova.jpg',
    couleur: '#0066CC',
    bg: '#EFF6FF',
    secteur: 'Technologie & Digital',
    desc: "Consacré au développement de solutions technologiques et numériques, favorisant l'innovation, la transformation digitale et la création d'outils répondant aux besoins des entreprises et des populations.",
    activites: [
      "Développement de solutions numériques",
      "Accompagnement de la transformation digitale",
      "Formation aux outils et compétences numériques",
      "Création d'outils au service des entreprises et des populations",
    ],
  },
  {
    id: 'agrinova',
    nom: 'AgriNOVA',
    logo: '/logos/agrinova.jpg',
    couleur: '#15803D',
    bg: '#F0FDF4',
    secteur: 'Agriculture & Agroalimentaire',
    desc: "Dédié à l'agriculture, à l'agroalimentaire et aux innovations permettant de renforcer la productivité, la transformation locale et la sécurité alimentaire.",
    activites: [
      "Renforcement de la productivité agricole",
      "Soutien à la transformation agroalimentaire locale",
      "Innovations au service de la sécurité alimentaire",
      "Partenariats avec les salons et acteurs du secteur",
    ],
  },
  {
    id: 'tradenova',
    nom: 'TradeNOVA',
    logo: '/logos/tradenova.jpg',
    couleur: '#7E22CE',
    bg: '#FDF4FF',
    secteur: 'Produits digitaux',
    desc: "Orienté vers le commerce et la vente de produits digitaux, le développement des activités marchandes, le commerce électronique et les nouvelles opportunités offertes par l'économie numérique.",
    activites: [
      "Vente de produits et services digitaux",
      "Accompagnement vers le commerce électronique",
      "Veille sur les opportunités de l'économie numérique",
      "Commande de produits directement depuis la Chine",
    ],
    doubleCTA: true,
  },
  {
    id: 'tradenova-market',
    nom: 'TradeNOVA Market',
    logo: '/logos/tradenova.jpg',
    couleur: '#7E22CE',
    bg: '#FDF4FF',
    secteur: 'Marketplace en ligne',
    badge: 'Nouveau',
    desc: "La marketplace du Club In-NOVA : les vendeurs publient leurs articles (photo, quantité, prix) et les acheteurs commandent directement en ligne, avec messagerie intégrée et retrait des ventes par Mobile Money.",
    activites: [
      "Inscription vendeur ou acheteur en quelques minutes",
      "Publication d'articles avec photo, quantité et prix",
      "Messagerie directe entre vendeur et acheteur",
      "Retrait des ventes par Mobile Money (Moov, MTN)",
    ],
    ctaLabel: "S'inscrire",
    ctaPage: 'tradenova-market',
  },
  {
    id: 'aquanova',
    nom: 'AquaNOVA',
    logo: '/logos/aquanova.jpg',
    couleur: '#0369A1',
    bg: '#F0F9FF',
    secteur: 'Eau & Environnement',
    desc: "Consacré aux problématiques liées à l'eau, à l'environnement, au développement durable et aux solutions innovantes répondant aux enjeux environnementaux.",
    activites: [
      "Gestion durable de l'eau",
      "Protection de l'environnement",
      "Vente de solutions et équipements liés à l'eau",
      "Accompagnement technique des porteurs de projet",
    ],
  },
]

export default function Entreprises({ onNavigate }) {
  const [selection, setSelection] = useState(null)

  if (selection) {
    return <EntrepriseDetail e={selection} onBack={() => setSelection(null)} onNavigate={onNavigate} />
  }

  return (
    <main className="min-h-screen bg-slate-50 pt-16">
      <header style={{ background:'linear-gradient(135deg, #0A1F5C 0%, #0055BB 100%)' }}
        className="py-12 px-4 sm:px-6 text-center">
        <Reveal>
          <h1 className="font-black text-white text-3xl sm:text-4xl mb-3"
            style={{ fontFamily:'Arial, sans-serif' }}>
            Nos Entreprises
          </h1>
          <p className="text-white/70 text-sm max-w-xl mx-auto">
            Les filiales spécialisées portées par les membres du Club In-NOVA, présentes sur la plateforme
            pour vendre leurs produits et services.
          </p>
        </Reveal>
      </header>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {ENTREPRISES.map((e, i) => (
            <Reveal key={e.id} delay={i * 90}>
              <button onClick={() => setSelection(e)}
                className="text-left bg-white rounded-2xl p-6 border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 w-full h-full relative">
                {e.badge && (
                  <span className="absolute top-4 right-4 text-[10px] font-black px-2 py-1 rounded-full text-white"
                    style={{ background:e.couleur }}>
                    {e.badge}
                  </span>
                )}
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center overflow-hidden mb-4"
                  style={{ background:e.bg }}>
                  <img src={e.logo} alt={e.nom} className="w-full h-full object-cover" />
                </div>
                <h2 className="font-black text-xl mb-1" style={{ color:e.couleur, fontFamily:'Arial, sans-serif' }}>
                  {e.nom}
                </h2>
                <p className="text-xs font-bold text-slate-400 mb-3">{e.secteur}</p>
                <p className="text-slate-500 text-sm leading-relaxed mb-4">{e.desc}</p>
                <span className="text-xs font-black inline-flex items-center gap-1" style={{ color:e.couleur }}>
                  En savoir plus <ArrowRight size={13} />
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      <Reveal as="section" className="max-w-3xl mx-auto px-4 sm:px-6 pb-16 text-center">
        <h2 className="font-black text-[#001A4D] text-2xl mb-3" style={{ fontFamily:'Arial, sans-serif' }}>
          Une opportunité à partager avec le Club ?
        </h2>
        <p className="text-slate-500 text-sm mb-6">
          Retrouvez toutes les offres de stage, d'emploi, d'appels à projets et de financement publiées par In-NOVA COMM.
        </p>
        <button onClick={() => onNavigate('opportunites')}
          className="bg-[#0066CC] hover:bg-[#004FA3] text-white font-black text-sm px-6 py-3 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-lg">
          Voir les opportunités
        </button>
      </Reveal>
    </main>
  )
}

function EntrepriseDetail({ e, onBack, onNavigate }) {
  const showToast  = useToast()
  const estMarket  = e.id === 'tradenova-market'
  const ctaLabel   = e.ctaLabel || 'Visiter notre boutique'
  const ctaPage    = e.ctaPage  || `boutique-${e.id}`
  const disponible = e.ctaPage ? true : (e.id ? boutiqueDisponible(e.id) : false)
  const email      = EMAILS_ENTREPRISES[e.id]

  const visiterBoutique = () => {
    if (!disponible) { showToast('Pas encore disponible'); return }
    onNavigate(ctaPage)
  }

  return (
    <main className="min-h-screen bg-slate-50 pt-16">
      <header style={{ background:'linear-gradient(135deg, #0A1F5C 0%, ' + e.couleur + ' 100%)' }}
        className="py-12 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <button onClick={onBack}
            className="text-[#FCD603] hover:text-white text-sm font-bold mb-6 flex items-center gap-2 transition-colors">
            <ArrowLeft size={14} /> Retour aux entreprises
          </button>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0"
              style={{ background:'rgba(255,255,255,0.15)' }}>
              <img src={e.logo} alt={e.nom} className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="font-black text-white text-3xl" style={{ fontFamily:'Arial, sans-serif' }}>
                {e.nom}
              </h1>
              <p className="text-white/70 text-sm mt-1">{e.secteur}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-6">
        <Reveal as="section" className="bg-white rounded-2xl p-6 border border-slate-100">
          <h2 className="font-black text-lg mb-3" style={{ color:e.couleur }}>Présentation</h2>
          <p className="text-slate-600 text-sm leading-relaxed">{e.desc}</p>
        </Reveal>

        <Reveal as="section" className="bg-white rounded-2xl p-6 border border-slate-100">
          <h2 className="font-black text-lg mb-4" style={{ color:e.couleur }}>Activités</h2>
          <ul className="space-y-2">
            {e.activites.map((a, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                <Check size={16} style={{ color:e.couleur }} className="flex-shrink-0 mt-0.5" />
                {a}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal as="section" className="bg-white rounded-2xl p-6 border border-slate-100 text-center space-y-3">
          <p className="text-slate-500 text-sm mb-1">
            {estMarket
              ? "Créez votre compte vendeur ou acheteur et rejoignez la marketplace TradeNOVA."
              : `Découvrez les produits et services proposés par ${e.nom}.`}
          </p>

          {estMarket ? (
            <button onClick={() => onNavigate(ctaPage)}
              className="text-white font-black text-sm px-6 py-3 rounded-xl transition-all hover:opacity-90 hover:shadow-md hover:-translate-y-0.5 inline-flex items-center gap-2"
              style={{ background:e.couleur }}>
              <Store size={16} /> {ctaLabel}
            </button>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <button onClick={visiterBoutique}
                className="text-white font-black text-sm px-6 py-3 rounded-xl transition-all hover:opacity-90 hover:shadow-md hover:-translate-y-0.5 inline-flex items-center gap-2"
                style={{ background:e.couleur }}>
                <Store size={16} /> Visiter notre boutique
              </button>

              {e.doubleCTA && (
                <a href="mailto:tradenovaentreprise@gmail.com?subject=Commande en Chine - TradeNOVA"
                  target="_blank" rel="noopener noreferrer"
                  className="text-sm font-black px-6 py-3 rounded-xl border-2 transition-all hover:-translate-y-0.5"
                  style={{ borderColor:e.couleur, color:e.couleur }}>
                  Commander en Chine
                </a>
              )}
            </div>
          )}

          {email && (
            <a href={`mailto:${email}?subject=Contact ${e.nom}`}
              className="block text-slate-400 hover:text-slate-600 text-xs font-bold pt-2 transition-colors inline-flex items-center gap-1.5 justify-center">
              <Mail size={13} /> Envoyer un mail à {e.nom}
            </a>
          )}
        </Reveal>
      </div>
    </main>
  )
}
