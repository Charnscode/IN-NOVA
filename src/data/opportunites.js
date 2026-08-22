// src/data/opportunites.js
// Phase 2 : remplacer par GET /api/opportunities/
import { fusionnerContenu, ajouterContenu, modifierContenu, supprimerContenu } from '../utils/contenu'

const CLE = 'innova_contenu_opportunites'

export const OPPORTUNITES_BASE = [
  {
    id:       1,
    type:     "Appel à projets",
    titre:    "SIALO 2026 - Salon international de l'Agriculture",
    org:      "SIALO Togo",
    lieu:     "CETEF, Lomé, Togo 2000",
    date:     "Il y a 1 jour",
    deadline: "25 Oct 2026",
    budget:   null,
    epingle:  true,
    photo:    "/images/sialo-salon.jpg",
    lien:     "https://wa.me/22944219814?text=Bonjour%2C%20je%20souhaite%20r%C3%A9server%20un%20stand%20pour%20le%20SIALO%202026.",
    desc:     "Participez à la 13ᵉ édition du Salon International de l'Agriculture et de l'Agroalimentaire de Lomé, couplée à la 3ᵉ Exposition Élevage. Réservez votre stand aux côtés des filières céréales, élevage, maraîchage et machinisme agricole, et rejoignez le plus grand rendez-vous agricole d'Afrique de l'Ouest, du 20 au 25 octobre 2026 au CETEF, Togo 2000. SIALO, de la terre à la table.",
    comp:     ["Agriculture", "Agroalimentaire", "Élevage", "Exposition"],
    action:   "Réserver mon stand",
    extra:    "20-25 Oct 2026",
  },
  {
    id:       2,
    type:     "Appel à projets",
    titre:    "Investir dans la ferme avicole SIALO",
    org:      "SIALO Togo",
    lieu:     "CETEF, Lomé, Togo 2000",
    date:     "Il y a 1 jour",
    deadline: "25 Oct 2026",
    budget:   null,
    epingle:  true,
    photo:    "/images/sialo-avicole.jpg",
    lien:     "https://wa.me/22944219814?text=Bonjour%2C%20je%20souhaite%20avoir%20plus%20d'informations%20sur%20la%20ferme%20avicole%20SIALO.",
    desc:     "Dans le cadre du SIALO 2026, participez au développement de ce qui s'annonce comme la plus grande ferme avicole d'Afrique. Une opportunité pour les jeunes entrepreneurs intéressés par l'aviculture de découvrir la filière œufs et poussins et d'échanger avec les exposants sur place, du 20 au 25 octobre 2026 au CETEF, Togo 2000.",
    comp:     ["Aviculture", "Élevage", "Agroalimentaire"],
    action:   "En savoir plus",
    extra:    "20-25 Oct 2026",
  },
  {
    id:       3,
    type:     "Appel à projets",
    titre:    "Appel à candidatures - Obtiens ton financement",
    org:      "In-NOVA",
    lieu:     "Bénin",
    date:     "Il y a 2 jours",
    deadline: "02 Août 2026",
    budget:   null,
    epingle:  true,
    photo:    "/images/innova-financement.jpg",
    lien:     "mailto:clubinnova08@gmail.com",
    desc:     "In-NOVA lance un appel à candidatures pour accompagner les jeunes vers le financement de leur projet, à travers un parcours complet en 4 étapes : orientation et insertion en opportunités, formation, coaching personnalisé puis financement. Les candidatures féminines sont vivement encouragées. Contact WhatsApp : 0144451855 / 53 90 07 13, appel : 0198709188, mail : clubinnova08@gmail.com.",
    comp:     ["Financement", "Entrepreneuriat", "Coaching", "Jeunes"],
    action:   "Candidater",
    extra:    "Candidatures féminines encouragées",
  },
  {
    id:       4,
    type:     "Formation",
    titre:    "In-NOVA Summer - Gestion de projets",
    org:      "In-NOVA",
    lieu:     "Bénin",
    date:     "Il y a 4 jours",
    deadline: null,
    budget:   null,
    epingle:  false,
    photo:    "/images/innova-summer.jpg",
    lien:     "mailto:clubinnova08@gmail.com",
    desc:     "In-NOVA Summer revient avec une nouvelle session consacrée à la gestion de projets. Un programme intensif pour outiller les jeunes entrepreneurs et porteurs de projets sur les fondamentaux de la planification, du pilotage et du suivi de projet. Programme bientôt disponible, restez connectés.",
    comp:     ["Gestion de projets", "Formation", "Entrepreneuriat"],
    action:   "Être informé",
    extra:    "Bientôt disponible",
  },
  {
    id:       5,
    type:     "Formation",
    titre:    "Certificats gratuits Numérique & IA - EMN Bénin",
    org:      "École des Métiers du Numérique / Force-N Bénin",
    lieu:     "100% en ligne, Bénin",
    date:     "Il y a 3 jours",
    deadline: "09 Août 2026",
    budget:   null,
    epingle:  false,
    photo:    null,
    lien:     "https://lc.cx/BENIN-EMN-EDU-HSIG2607",
    desc:     "L'École des Métiers du Numérique (EMN) et Force-N Bénin, en partenariat avec la Mastercard Foundation, ouvrent deux parcours de certification 100% gratuits et en ligne : Certificat Informatique et Internet pour l'Éducation, et Certificat Intelligence Artificielle pour l'Éducation. Accessible aux actifs comme aux personnes en recherche d'opportunités. Les candidatures féminines sont vivement encouragées.",
    comp:     ["Numérique", "Intelligence artificielle", "Formation", "Gratuit"],
    action:   "Candidater",
    extra:    "Source : EMN Bénin / Force-N",
  },
  {
    id:       6,
    type:     "Formation",
    titre:    "In-NOVA Bootcamp 2026 — Édition 1",
    org:      "In-NOVA",
    lieu:     "Abomey-Calavi, Bénin",
    date:     "Édition passée",
    deadline: null,
    budget:   null,
    epingle:  false,
    photo:    "/images/bootcamp-2026.jpg",
    lien:     null,
    desc:     "Première édition du In-NOVA Bootcamp, sur le thème \"Entrepreneuriat et Employabilité\", tenue le 15 juin 2026 à Abomey-Calavi. Programme gratuit d'une semaine, non interné. Cette édition est terminée — les candidatures sont closes, la prochaine édition sera annoncée ici.",
    comp:     ["Entrepreneuriat", "Employabilité", "Formation"],
    action:   "Édition déjà passée",
    extra:    "Terminé — 15 juin 2026",
  },
]

/** Liste des opportunités a afficher (donnees de base + ajouts/modifs/suppressions admin). */
export function getOpportunites() {
  return fusionnerContenu(CLE, OPPORTUNITES_BASE)
}

export function ajouterOpportunite(donnees) {
  return ajouterContenu(CLE, donnees)
}

export function modifierOpportunite(id, updates) {
  modifierContenu(CLE, id, updates)
}

export function supprimerOpportunite(id) {
  supprimerContenu(CLE, id)
}

export const TYPES = ["Tous", "Emploi", "Stage", "Financement", "Subvention", "Appel à projets", "Volontariat", "Formation"]

export const STATS = [
  { valeur: "15",   label: "Membres maximum"       },
  { valeur: "4",    label: "Entreprises innovantes" },
  { valeur: "10+",  label: "Jeunes accompagnés"     },
  { valeur: "∞",    label: "Opportunités créées"    },
]

export const TYPE_STYLES = {
  "Emploi":          { bg: "#EFF6FF", text: "#1D4ED8", border: "#1D4ED8" },
  "Stage":           { bg: "#FFF7ED", text: "#C2410C", border: "#C2410C" },
  "Financement":     { bg: "#F0FDF4", text: "#15803D", border: "#15803D" },
  "Subvention":      { bg: "#FDF4FF", text: "#7E22CE", border: "#7E22CE" },
  "Appel à projets": { bg: "#FFFBEB", text: "#B45309", border: "#B45309" },
  "Volontariat":     { bg: "#F0F9FF", text: "#0369A1", border: "#0369A1" },
  "Formation":       { bg: "#ECFEFF", text: "#0E7490", border: "#0E7490" },
}
