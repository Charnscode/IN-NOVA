// src/utils/fichierImage.js
//
// Lecture securisee d'un fichier image uploade par l'utilisateur :
// - Verifie que c'est bien une image (type MIME)
// - Limite la taille (evite de saturer le localStorage ou de bloquer le
//   navigateur avec un fichier enorme)
// - Retourne l'image en base64 via callback, ou une erreur lisible

const TAILLE_MAX_MO = 5

export function lireImageUploadee(file, onSuccess, onError) {
  if (!file) return

  if (!file.type.startsWith('image/')) {
    onError?.('Le fichier doit être une image (JPG, PNG...).')
    return
  }

  const tailleMo = file.size / (1024 * 1024)
  if (tailleMo > TAILLE_MAX_MO) {
    onError?.(`Image trop lourde (max ${TAILLE_MAX_MO} Mo).`)
    return
  }

  const reader = new FileReader()
  reader.onload = () => onSuccess(reader.result)
  reader.onerror = () => onError?.("Impossible de lire l'image, réessayez.")
  reader.readAsDataURL(file)
}
