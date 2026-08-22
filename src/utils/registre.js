// src/utils/registre.js
//
// Systeme temporaire de comptes et anti-doublon base sur localStorage,
// en attendant le vrai backend (Phase 2 : remplacer entierement par des
// appels API avec authentification et base de donnees reelles).
//
// ATTENTION : localStorage est propre a chaque navigateur/appareil - ce
// n'est donc pas un vrai systeme de comptes multi-appareils, seulement
// une passerelle pour eviter les doublons et permettre une reconnexion
// simple en attendant le backend.

function lire(cle) {
  try {
    const brut = window.localStorage.getItem(cle)
    return brut ? JSON.parse(brut) : []
  } catch {
    return []
  }
}

function ecrire(cle, valeur) {
  try {
    window.localStorage.setItem(cle, JSON.stringify(valeur))
  } catch {
    /* stockage indisponible - on ignore silencieusement */
  }
}

/** Retourne le compte existant pour cet email (insensible a la casse), ou null. */
export function trouverCompte(cle, email) {
  const comptes = lire(cle)
  const cherche = email.trim().toLowerCase()
  return comptes.find(c => c.email.trim().toLowerCase() === cherche) || null
}

/** Enregistre un nouveau compte. Retourne false si un compte existe deja pour cet email. */
export function creerCompte(cle, donnees) {
  if (trouverCompte(cle, donnees.email)) return false
  const comptes = lire(cle)
  comptes.push(donnees)
  ecrire(cle, comptes)
  return true
}

/** Verifie si un email a deja soumis ce formulaire (candidatures a usage unique). */
export function dejaSoumis(cle, email) {
  return !!trouverCompte(cle, email)
}

/** Enregistre une soumission simple (candidature) pour eviter les doublons. */
export function enregistrerSoumission(cle, email, donnees = {}) {
  if (dejaSoumis(cle, email)) return false
  const comptes = lire(cle)
  comptes.push({ email, ...donnees })
  ecrire(cle, comptes)
  return true
}
