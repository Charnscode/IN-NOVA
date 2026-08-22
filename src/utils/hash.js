// src/utils/hash.js
//
// Utilitaire de hachage cote client, base sur l'API Web Crypto native
// (disponible nativement dans tous les navigateurs modernes, sur HTTPS).
//
// ATTENTION SECURITE : un hash calcule et compare cote client n'est jamais
// une vraie protection - le code (et donc les empreintes de reference)
// reste visible dans le bundle JS envoye au navigateur. Ce mecanisme sert
// uniquement de barriere temporaire en attendant une authentification
// serveur reelle (Phase 2).
export async function sha256Hex(texte) {
  const encoder = new TextEncoder()
  const donnees = encoder.encode(texte)
  const buffer  = await window.crypto.subtle.digest('SHA-256', donnees)
  return Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
}
