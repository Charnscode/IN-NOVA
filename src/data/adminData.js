// src/data/adminData.js
// Donnees mockees admin -- Phase 2 : remplacer par API Django

export const ADMIN_CREDENTIALS = {
  general:   { user: 'admin',     pass: 'innova2026', nom: 'Admin In-NOVA'   },
  technova:  { user: 'technova',  pass: 'tech2026',   nom: 'Admin TechNOVA'  },
  agrinova:  { user: 'agrinova',  pass: 'agri2026',   nom: 'Admin AgriNOVA'  },
  tradenova: { user: 'tradenova', pass: 'trade2026',  nom: 'Admin TradeNOVA' },
  aquanova:  { user: 'aquanova',  pass: 'aqua2026',   nom: 'Admin AquaNOVA'  },
}

export const ADMIN_OPPORTUNITES = [
  { id:1, titre:'Assistant Marketing Digital',  type:'Stage',           lieu:'Lome',     statut:'publie',     date:'2026-03-01' },
  { id:2, titre:'Responsable Production',        type:'Emploi',          lieu:'Cotonou',  statut:'publie',     date:'2026-03-05' },
  { id:3, titre:'Innovation Environnementale',   type:'Appel a projets', lieu:'Benin',    statut:'en attente', date:'2026-03-08' },
  { id:4, titre:'Fonds Startup Innovation',      type:'Subvention',      lieu:'Afrique',  statut:'publie',     date:'2026-03-10' },
  { id:5, titre:'Pret Entrepreneur Etudiant',    type:'Financement',     lieu:'National', statut:'publie',     date:'2026-03-12' },
  { id:6, titre:'Programme Volontaire',           type:'Volontariat',     lieu:'National', statut:'publie',     date:'2026-03-15' },
]

export const ADMIN_PUBLICITES = [
  { id:1, titre:'Formation Django Backend', lien:'#', duree:5, actif:true,  expiration:'2026-06-01' },
  { id:2, titre:'Startup Weekend Cotonou',  lien:'#', duree:8, actif:true,  expiration:'2026-04-15' },
  { id:3, titre:'Bourse Etudes France',     lien:'#', duree:6, actif:false, expiration:'2026-05-01' },
]

export const ADMIN_COMMANDES = [
  { id:1, client:'Kofi Mensah',   produit:'Site web vitrine',   entreprise:'TechNOVA',  montant:'150 000', statut:'en cours',   date:'2026-03-10' },
  { id:2, client:'Aisha ZINSOU',   produit:'Panier de legumes',  entreprise:'AgriNOVA',  montant:'5 000',   statut:'livre',      date:'2026-03-12' },
  { id:3, client:'Jean Dupont',   produit:'Systeme irrigation', entreprise:'AquaNOVA',  montant:'350 000', statut:'en attente', date:'2026-03-14' },
  { id:4, client:'Marie Diallo',  produit:'Boutique en ligne',  entreprise:'TradeNOVA', montant:'200 000', statut:'en cours',   date:'2026-03-15' },
]

export const ADMIN_PRODUITS = {
  technova: [
    { id:1, nom:'Site web vitrine',       prix:'150 000 FCFA', actif:true  },
    { id:2, nom:'Application mobile',     prix:'500 000 FCFA', actif:true  },
    { id:3, nom:'Audit cybersecurite',    prix:'80 000 FCFA',  actif:true  },
    { id:4, nom:'Formation developpeurs', prix:'50 000 FCFA',  actif:false },
  ],
  agrinova: [
    { id:1, nom:'Panier de legumes',    prix:'5 000 FCFA',  stock:50,  actif:true  },
    { id:2, nom:'Formation maraichage', prix:'30 000 FCFA', stock:null,actif:true  },
    { id:3, nom:'Consultation',         prix:'25 000 FCFA', stock:null,actif:true  },
    { id:4, nom:'Produits transformes', prix:'8 000 FCFA',  stock:30,  actif:false },
  ],
  aquanova: [
    { id:1, nom:'Systeme irrigation',    prix:'350 000 FCFA', actif:true },
    { id:2, nom:'Forage puits',          prix:'Sur devis',    actif:true },
    { id:3, nom:'Traitement eau',        prix:'120 000 FCFA', actif:true },
    { id:4, nom:'Audit environnemental', prix:'60 000 FCFA',  actif:true },
  ],
  tradenova: [
    { id:1, nom:'Boutique en ligne',  prix:'200 000 FCFA', actif:true  },
    { id:2, nom:'Service livraison',  prix:'3 000 FCFA',   actif:true  },
    { id:3, nom:'Conseil commercial', prix:'40 000 FCFA',  actif:false },
    { id:4, nom:'Import-export',      prix:'Sur devis',    actif:true  },
  ],
}

export const ADMIN_VENDEURS = [
  { id:1, nom:'Kofi Mensah',    email:'kofi@email.com',  tel:'+229 11 11 11 11', articles:3, statut:'actif'    },
  { id:2, nom:'Sara Ouedraogo', email:'sara@email.com',  tel:'+229 22 22 22 22', articles:1, statut:'actif'    },
  { id:3, nom:'Paul Koffi',     email:'paul@email.com',  tel:'+229 33 33 33 33', articles:0, statut:'suspendu' },
]

export const ADMIN_ACHETEURS = [
  { id:1, nom:'Aisha ZINSOU',  email:'aisha@email.com', tel:'+229 44 44 44 44', commandes:2 },
  { id:2, nom:'Marie Diallo', email:'marie@email.com', tel:'+229 55 55 55 55', commandes:1 },
]

export const ADMIN_RETRAITS = [
  { id:1, vendeur:'Kofi Mensah',    montant:'45 000', reseau:'MTN',  statut:'traite',     date:'2026-03-10' },
  { id:2, vendeur:'Sara Ouedraogo', montant:'22 000', reseau:'Moov', statut:'en attente', date:'2026-03-15' },
]

export const ADMIN_STATS = {
  opportunites:6, entreprises:4, commandes:4, vendeurs:3, acheteurs:2, publicites:3,
}

// ── Utilisateurs ─────────────────────────────────────────────
export const ADMIN_UTILISATEURS = [
  { id:1, nom:'Kofi Mensah',    email:'kofi@email.com',  tel:'+229 11 11 11 11', role:'vendeur',  statut:'actif',    date:'2026-03-01' },
  { id:2, nom:'Aisha ZINSOU',    email:'aisha@email.com', tel:'+229 22 22 22 22', role:'acheteur', statut:'actif',    date:'2026-03-05' },
  { id:3, nom:'Sara Ouedraogo', email:'sara@email.com',  tel:'+229 33 33 33 33', role:'vendeur',  statut:'actif',    date:'2026-03-08' },
  { id:4, nom:'Paul Koffi',     email:'paul@email.com',  tel:'+229 44 44 44 44', role:'vendeur',  statut:'suspendu', date:'2026-03-10' },
  { id:5, nom:'Marie Diallo',   email:'marie@email.com', tel:'+229 55 55 55 55', role:'acheteur', statut:'actif',    date:'2026-03-12' },
]

// ── Notifications ────────────────────────────────────────────
export const ADMIN_NOTIFICATIONS = [
  { id:1, type:'commande',    msg:'Nouvelle commande de Kofi Mensah -- Site web vitrine',    lu:false, date:'2026-03-15 10:30' },
  { id:2, type:'inscription', msg:'Nouveau vendeur inscrit -- Sara Ouedraogo',                lu:false, date:'2026-03-15 09:15' },
  { id:3, type:'article',     msg:'Nouvel article en attente de validation -- Montre connectee',lu:false,date:'2026-03-14 14:20' },
  { id:4, type:'retrait',     msg:'Demande de retrait -- Sara Ouedraogo -- 22 000 FCFA',      lu:true,  date:'2026-03-14 11:00' },
  { id:5, type:'commande',    msg:'Nouvelle commande de Marie Diallo -- Boutique en ligne',  lu:true,  date:'2026-03-13 16:45' },
]

// ── Logs activite ────────────────────────────────────────────
export const ADMIN_LOGS = [
  { id:1, admin:'admin',     action:'Opportunite publiee',         cible:'Fonds Startup Innovation',    date:'2026-03-15 10:00' },
  { id:2, admin:'tradenova', action:'Article valide',               cible:'Chaussures Nike Air Max',     date:'2026-03-15 09:30' },
  { id:3, admin:'agrinova',  action:'Produit ajoute',               cible:'Nouveau panier bio',          date:'2026-03-14 15:00' },
  { id:4, admin:'tradenova', action:'Vendeur suspendu',              cible:'Paul Koffi',                  date:'2026-03-14 11:30' },
  { id:5, admin:'admin',     action:'Publicite desactivee',         cible:'Bourse Etudes France',        date:'2026-03-13 09:00' },
  { id:6, admin:'technova',  action:'Commande statut modifie',      cible:'Site web vitrine -- en cours',date:'2026-03-12 14:00' },
]

// ── Avis clients ─────────────────────────────────────────────
export const ADMIN_AVIS = {
  technova: [
    { id:1, client:'Kofi Mensah',  note:5, commentaire:'Excellent travail, site livre dans les delais.', date:'2026-03-10', statut:'publie'    },
    { id:2, client:'Jean Dupont',  note:4, commentaire:'Tres bonne equipe, je recommande.',               date:'2026-03-12', statut:'publie'    },
    { id:3, client:'Anne Koffi',   note:3, commentaire:'Correct mais quelques retards.',                  date:'2026-03-14', statut:'en attente'},
  ],
  agrinova: [
    { id:1, client:'Aisha ZINSOU',  note:5, commentaire:'Legumes frais et de qualite.',  date:'2026-03-11', statut:'publie' },
    { id:2, client:'Paul Mensah',  note:4, commentaire:'Livraison rapide, je reviendrai.',date:'2026-03-13',statut:'publie' },
  ],
  aquanova: [
    { id:1, client:'Jean Dupont',  note:5, commentaire:'Systeme irrigation parfait.',   date:'2026-03-09', statut:'publie' },
  ],
  tradenova: [
    { id:1, client:'Marie Diallo', note:4, commentaire:'Bonne boutique, produits varies.',date:'2026-03-10',statut:'publie' },
    { id:2, client:'Kofi Koffi',   note:2, commentaire:'Livraison lente.',               date:'2026-03-14',statut:'en attente'},
  ],
}

// ── Articles a valider (TradeNOVA) ────────────────────────────
export const ADMIN_ARTICLES_PENDING = [
  { id:1, vendeur:'Kofi Mensah',    titre:'Montre connectee Samsung', prix:'35 000 FCFA', qte:8,  date:'2026-03-14', statut:'en attente' },
  { id:2, vendeur:'Sara Ouedraogo', titre:'Robe africaine wax',        prix:'18 000 FCFA', qte:15, date:'2026-03-15', statut:'en attente' },
  { id:3, vendeur:'Paul Koffi',     titre:'Casque audio Bluetooth',    prix:'25 000 FCFA', qte:5,  date:'2026-03-15', statut:'rejete'     },
]

// ── Historique transactions (TradeNOVA) ───────────────────────
export const ADMIN_TRANSACTIONS = [
  { id:1, type:'achat',   vendeur:'Kofi Mensah',    acheteur:'Aisha ZINSOU',  montant:'45 000', reseau:'MTN',  statut:'complete',   date:'2026-03-10' },
  { id:2, type:'retrait', vendeur:'Kofi Mensah',    acheteur:null,           montant:'30 000', reseau:'MTN',  statut:'complete',   date:'2026-03-11' },
  { id:3, type:'achat',   vendeur:'Sara Ouedraogo', acheteur:'Marie Diallo', montant:'22 000', reseau:'Moov', statut:'complete',   date:'2026-03-12' },
  { id:4, type:'retrait', vendeur:'Sara Ouedraogo', acheteur:null,           montant:'22 000', reseau:'Moov', statut:'en attente', date:'2026-03-15' },
  { id:5, type:'achat',   vendeur:'Kofi Mensah',    acheteur:'Jean Dupont',  montant:'35 000', reseau:'MTN',  statut:'complete',   date:'2026-03-15' },
]

// ── Stats par entreprise ──────────────────────────────────────
export const ADMIN_STATS_ENTREPRISES = {
  technova: {
    ca_total:    '980 000',
    commandes:   4,
    produits:    4,
    avis_moy:    4.3,
    evolution:   [120000, 150000, 200000, 180000, 250000, 280000],
  },
  agrinova: {
    ca_total:    '245 000',
    commandes:   8,
    produits:    4,
    avis_moy:    4.5,
    evolution:   [30000, 35000, 40000, 38000, 55000, 47000],
  },
  aquanova: {
    ca_total:    '1 200 000',
    commandes:   3,
    produits:    4,
    avis_moy:    5.0,
    evolution:   [200000, 250000, 300000, 150000, 200000, 100000],
  },
  tradenova: {
    ca_total:    '590 000',
    commandes:   6,
    produits:    4,
    avis_moy:    3.8,
    evolution:   [80000, 90000, 100000, 120000, 110000, 90000],
  },
}
