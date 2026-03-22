
export const OPPORTUNITES = [
  {
    id:       1,
    type:     'Stage',
    titre:    'Agent de banque' ,
    org:      'UBA',
    lieu:     'Cotonou, Bénin',
    date:     'Il y a 5 jours',
    deadline: '27 Mars 2026',
    budget:   null,
    epingle:  false,
    desc:     'Agent Banque Digitale chargé de la chaîne de valeur',
    comp:     ['Marketing', 'Comptabilité', 'Analytics'],
    action:   'Candidater',
    lien:     null,
  },
  {
    id:       2,
    type:     'Emploi',
    titre:    'Responsable Production Agricole',
    org:      'AgriNOVA recrute un responsable pour superviser les opérations de production.',
    lieu:     'Cotonou, Bénin',
    date:     'Il y a 5 jours',
    deadline: null,
    budget:   null,
    epingle:  false,
    desc:     'AgriNOVA recrute un responsable pour superviser les opérations de production agricole et coordonner les équipes terrain.',
    comp:     ['Agriculture', 'Management', 'Logistique'],
    action:   'Candidater',
    lien:     null,
  },
  
  {
    id:       3,
    type:     'Subvention',
    titre:    'Fonds Startup Innovation',
    org:      'Subvention de 5 millions FCFA pour les startups technologiques en phase de démarrage.',
    lieu:     "Afrique de l'Ouest",
    date:     'Il y a 3 jours',
    deadline: '15 Déc',
    budget:   '5M FCFA',
    epingle:  false,
    desc:     'Subvention de 5 millions FCFA pour les startups technologiques en phase de démarrage.',
    comp:     ['Startup', 'Tech', 'Finance'],
    action:   'Candidater',
    lien:     null,
  },
  
  {
    id:       4,
    type:     'Volontariat',
    titre:    'Programme Volontaire In-NOVA',
    org:      'Rejoignez le Club en tant que volontaire pour acquérir une expérience concrète.',
    lieu:     'National',
    date:     'Permanent',
    deadline: null,
    budget:   null,
    epingle:  false,
    desc:     'Rejoignez le Club en tant que volontaire pour acquérir une expérience concrète au sein du réseau In-NOVA.',
    comp:     ['Engagement', 'Réseau', 'Expérience'],
    action:   'Devenir volontaire',
    extra:    'Flexible',
    lien:     null,
  },
]

export const TYPES = ['Tous', 'Emploi', 'Stage', 'Financement', 'Subvention', 'Appel à projets', 'Volontariat']

export const STATS = [
  { valeur: '15',   label: 'Membres maximum'       },
  { valeur: '4',    label: 'Entreprises innovantes' },
  { valeur: '100+', label: 'Jeunes accompagnés'     },
  { valeur: '∞',    label: 'Opportunités créées'    },
]

export const TYPE_STYLES = {
  'Emploi':          { bg: '#EFF6FF', text: '#1D4ED8', border: '#1D4ED8' },
  'Stage':           { bg: '#FFF7ED', text: '#C2410C', border: '#C2410C' },
  'Financement':     { bg: '#F0FDF4', text: '#15803D', border: '#15803D' },
  'Subvention':      { bg: '#FDF4FF', text: '#7E22CE', border: '#7E22CE' },
  'Appel à projets': { bg: '#FFFBEB', text: '#B45309', border: '#B45309' },
  'Volontariat':     { bg: '#F0F9FF', text: '#0369A1', border: '#0369A1' },
}
