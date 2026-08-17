// src/utils/validatePassword.js
export function validatePassword(pass) {
  const errors = []
  if (!pass || pass.length < 8)  errors.push('Minimum 8 caracteres')
  if (!/[A-Z]/.test(pass))       errors.push('Au moins 1 majuscule')
  if (!/[0-9]/.test(pass))       errors.push('Au moins 1 chiffre')
  if (/\s/.test(pass))           errors.push('Pas d espace autorise')
  return { valid: errors.length === 0, errors, score: Math.min(4, 4 - errors.length) }
}

export function passwordStrengthLabel(score) {
  const labels = ['Tres faible','Faible','Moyen','Fort','Tres fort']
  const colors  = ['#DC2626','#F59E0B','#F59E0B','#16A34A','#15803D']
  return { label: labels[score], color: colors[score] }
}
