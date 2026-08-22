// src/utils/security.js
//
// NOTE SECURITE : React echappe deja automatiquement tout texte affiche via JSX
// ({valeur}) - c'est la vraie protection contre les injections XSS dans ce projet,
// et aucun composant n'utilise dangerouslySetInnerHTML sur une donnee utilisateur.
// sanitize() ne doit donc PAS ré-encoder en entites HTML (&#x27; etc.) : un texte
// deja echappe puis rendu par JSX s'afficherait tel quel (casse), au lieu d'un
// simple guillemet. Le role de sanitize() ici est de nettoyer l'entree (espaces,
// caracteres de controle invisibles, longueur), pas de la transformer en HTML.
export function sanitize(str) {
  if (typeof str !== 'string') return ''
  return str
    // eslint-disable-next-line no-control-regex
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '') // caracteres de controle invisibles
    .trim()
    .slice(0, 1000)
}

export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email))
}

/** Genere un identifiant aleatoire cryptographiquement sur (pour tokens CSRF, etc. cote Phase 2). */
export function generateCsrfToken() {
  const octets = new Uint8Array(24)
  window.crypto.getRandomValues(octets)
  return Array.from(octets).map(b => b.toString(16).padStart(2, '0')).join('')
}
