// src/pages/Admin/Admin.jsx
import { useState } from 'react'
import Login     from './sections/Login'
import Dashboard from './sections/Dashboard'

export default function Admin() {
  const [profilId, setProfilId] = useState(null)

  if (!profilId) return <Login onSuccess={(id) => setProfilId(id)} />
  return <Dashboard profilId={profilId} onLogout={() => setProfilId(null)} />
}
