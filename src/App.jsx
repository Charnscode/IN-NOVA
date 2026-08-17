// src/App.jsx
// Router principal In-NOVA -- toutes les pages connectees
// Phase 2 : remplacer par React Router v6

import { useState, useEffect, Suspense, lazy } from 'react'
import Navbar  from './components/Navbar'
import Footer  from './components/Footer'

import Home         from './pages/Home/Home'
import Opportunites from './pages/Opportunites/Opportunites'
import Entreprises  from './pages/Entreprises/Entreprises'
import Programmes   from './pages/Programmes/Programmes'
import Volontariat  from './pages/Volontariat/Volontariat'
import Bienfaisance from './pages/Bienfaisance/Bienfaisance'
import Rejoindre    from './pages/Rejoindre/Rejoindre'
import Contact      from './pages/Contact/Contact'
import Admin        from './pages/Admin/Admin'
import TradeNovaMarket from './pages/TradeNovaMarket/TradeNovaMarket'
import Boutique      from './pages/Boutique/Boutique'
import Partenaires   from './pages/Partenaires/Partenaires'
import PolitiqueConfidentialite from './pages/Politique/PolitiqueConfidentialite'
import CookieBanner  from './components/CookieBanner'
import { ToastProvider } from './components/Toast'

const PAGE_NAMES = {
  accueil:      'Accueil',
  opportunites: 'Opportunités',
  entreprises:  'Entreprises',
  programmes:   'Programmes',
  volontariat:  'Volontariat',
  bienfaisance: 'Bienfaisance',
  rejoindre:    'Rejoindre',
  contact:      'Contact',
  admin:        'Admin',
  'tradenova-market': 'TradeNOVA Market',
  partenaires: 'Partenaires',
  politique: 'Politique de confidentialité',
}

function ComingSoon({ pageName, onBack }) {
  return (
    <main className="min-h-screen pt-16 flex items-center justify-center bg-slate-50 px-4">
      <div className="text-center">
        <h1 className="font-black text-slate-900 text-3xl mb-3"
          style={{ fontFamily:'Arial, sans-serif' }}>
          Page en cours
        </h1>
        <p className="text-slate-500 text-sm mb-6 max-w-xs mx-auto">
          Cette page sera disponible prochainement.
        </p>
        <button onClick={onBack}
          className="bg-[#0066CC] hover:bg-[#004FA3] text-white font-bold px-6 py-3 rounded-xl transition-all">
          Retour à l'accueil
        </button>
      </div>
    </main>
  )
}

export default function App() {
  const [page, setPage] = useState('accueil')

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [page])

  const navigate = (id) => setPage(id)

  const renderPage = () => {
    if (page === 'accueil')      return <Home         onNavigate={navigate} />
    if (page === 'opportunites') return <Opportunites onNavigate={navigate} />
    if (page === 'entreprises')  return <Entreprises  onNavigate={navigate} />
    if (page === 'programmes')   return <Programmes   onNavigate={navigate} />
    if (page === 'volontariat')  return <Volontariat  onNavigate={navigate} />
    if (page === 'bienfaisance') return <Bienfaisance onNavigate={navigate} />
    if (page === 'rejoindre')    return <Rejoindre    onNavigate={navigate} />
    if (page === 'contact')      return <Contact      onNavigate={navigate} />
    if (page === 'admin')        return <Admin        onNavigate={navigate} />
    if (page === 'tradenova-market') return <TradeNovaMarket onNavigate={navigate} />
    if (page === 'partenaires')  return <Partenaires  onNavigate={navigate} />
    if (page === 'politique')    return <PolitiqueConfidentialite onNavigate={navigate} />
    if (page.startsWith('boutique-')) {
      return <Boutique entrepriseId={page.replace('boutique-', '')} onNavigate={navigate} />
    }

    return (
      <ComingSoon
        pageName={PAGE_NAMES[page] || page}
        onBack={() => navigate('accueil')}
      />
    )
  }

  const hideFooter = page === 'admin' || page === 'tradenova-market'

  return (
    <div className="font-sora">
      <ToastProvider>
        <Navbar currentPage={page} onNavigate={navigate} />
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-slate-400 text-sm">Chargement...</div>
          </div>
        }>
          <div key={page} className="page-transition">
            {renderPage()}
          </div>
        </Suspense>
        {!hideFooter && <Footer onNavigate={navigate} />}
        <CookieBanner onNavigate={navigate} />
      </ToastProvider>
    </div>
  )
}
