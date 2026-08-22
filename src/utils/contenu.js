// src/utils/contenu.js
//
// Store generique pour le contenu editable depuis l'espace Admin
// (opportunites, programmes, partenaires, produits de boutique...),
// en attendant le vrai backend.
//
// Principe : chaque page publique part d'une liste de "graine" (les
// donnees par defaut ecrites dans le code) puis on applique par dessus
// les ajouts / modifications / suppressions faites depuis l'Admin et
// stockees dans le localStorage du navigateur.
//
// ATTENTION : le localStorage est propre a CHAQUE navigateur/appareil.
// Un ajout fait par l'admin sur son ordinateur ne sera donc visible que
// dans CE navigateur, pas pour les autres visiteurs du site - c'est
// une limite connue, le vrai fonctionnement multi-utilisateurs necessite
// le backend (Phase 2 : remplacer entierement par une API + base de donnees).

function lireEtat(cle) {
  try {
    const brut = window.localStorage.getItem(cle)
    return brut ? JSON.parse(brut) : { ajouts: [], modifs: {}, suppressions: [] }
  } catch {
    return { ajouts: [], modifs: {}, suppressions: [] }
  }
}

function ecrireEtat(cle, etat) {
  try {
    window.localStorage.setItem(cle, JSON.stringify(etat))
  } catch {
    /* stockage indisponible - on ignore silencieusement */
  }
}

/** Fusionne la liste de base avec les ajouts/modifs/suppressions stockes pour cette cle. */
export function fusionnerContenu(cle, listeBase) {
  const { ajouts, modifs, suppressions } = lireEtat(cle)
  const base = listeBase
    .filter(item => !suppressions.includes(item.id))
    .map(item => (modifs[item.id] ? { ...item, ...modifs[item.id] } : item))
  return [...base, ...ajouts]
}

/** Ajoute un nouvel element (genere un id unique cote client). */
export function ajouterContenu(cle, donnees) {
  const etat = lireEtat(cle)
  const item = { ...donnees, id: `admin_${Date.now()}_${Math.random().toString(36).slice(2, 7)}` }
  etat.ajouts.push(item)
  ecrireEtat(cle, etat)
  return item
}

/** Modifie un element existant (de la base ou ajoute par l'admin), quel que soit son origine. */
export function modifierContenu(cle, id, updates) {
  const etat = lireEtat(cle)
  const indexAjout = etat.ajouts.findIndex(a => a.id === id)
  if (indexAjout !== -1) {
    etat.ajouts[indexAjout] = { ...etat.ajouts[indexAjout], ...updates }
  } else {
    etat.modifs[id] = { ...(etat.modifs[id] || {}), ...updates }
  }
  ecrireEtat(cle, etat)
}

/** Supprime un element (de la base ou ajoute par l'admin). */
export function supprimerContenu(cle, id) {
  const etat = lireEtat(cle)
  etat.ajouts = etat.ajouts.filter(a => a.id !== id)
  if (!etat.suppressions.includes(id)) etat.suppressions.push(id)
  ecrireEtat(cle, etat)
}

/** Reinitialise entierement une cle (retour aux donnees par defaut). */
export function reinitialiserContenu(cle) {
  ecrireEtat(cle, { ajouts: [], modifs: {}, suppressions: [] })
}
