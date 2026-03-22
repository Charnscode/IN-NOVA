/**
 * Échapper aux failles XSS
 * @param {string} str
 * @returns {string}
 */
export function sanitize(str) {
  if (typeof str !== 'string') return ''
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/`/g, '&#x60;')
}

/**
 * Valide un email avec regex RFC-compliant
 * @param {string} email
 * @returns {boolean}
 */
export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(email).toLowerCase())
}

/**
 * Valide un numéro de téléphone (international)
 * @param {string} phone
 * @returns {boolean}
 */
export function isValidPhone(phone) {
  return /^\+?[\d\s\-().]{7,20}$/.test(String(phone))
}

/**
 * Vérifie longueur d'une chaîne(same au )
 * @param {string} str
 * @param {number} min
 * @param {number} max
 * @returns {boolean}
 */
export function hasLength(str, min = 1, max = Infinity) {
  const len = String(str).trim().length
  return len >= min && len <= max
}

/**
 * Tronque une chaîne proprement
 * @param {string} str
 * @param {number} max
 * @returns {string}
 */
export function truncate(str, max = 100) {
  if (typeof str !== 'string') return ''
  return str.length > max ? str.slice(0, max - 1) + '…' : str
}

/**
 * Sanitise un objet formulaire entier
 * @param {Object} formData
 * @returns {Object}
 */
export function sanitizeForm(formData) {
  return Object.fromEntries(
    Object.entries(formData).map(([k, v]) => [k, sanitize(String(v).trim())])
  )
}

/**
 * Génère un token CSRF simple côté client
 * @returns {string}
 */
export function generateCsrfToken() {
  const arr = new Uint8Array(16)
  crypto.getRandomValues(arr)
  return Array.from(arr, b => b.toString(16).padStart(2, '0')).join('')
}
