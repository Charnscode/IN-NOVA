import { useState, useEffect, Suspense, lazy } from 'react'
import Navbar       from './components/Navbar'
import Footer       from './components/Footer'
import Home         from './pages/Home/Home'
import Opportunites from './pages/Opportunites/Opportunites'
import Entreprises  from './pages/Entreprises/Entreprises'


function ComingSoon({ pageName, onBack }) {
  return (
    <main className="min-h-screen pt-16 flex items-center justify-center bg-slate-50">
      <div className="text-center px-4">
        <div className="text-6xl mb-6">🚧</div>
        <h1
          className="font-black text-slate-900 text-3xl mb-3"
          style={{ fontFamily: 'Arial, sans-serif' }}
        >
          Page en cours
        </h1>
        <p className="text-slate-500 text-sm mb-6 max-w-xs mx-auto">
          La page <strong className="text-[#0066CC]">{pageName}</strong> sera disponible
          lors du prochain commit de développement.
        </p>
        <button
          onClick={onBack}
          className="bg-[#0066CC] hover:bg-[#004FA3] text-white font-bold px-6 py-3 rounded-xl transition-all hover:-translate-y-0.5"
        >
          ← Retour à l'accueil
        </button>
      </div>
    </main>
  )
}

const PAGE_TITLES = {
  accueil:      'In-NOVA — Club des jeunes entrepreneurs',
  entreprises:  'In-NOVA — Entreprises',
  programmes:   'In-NOVA — Programmes',
  opportunites: 'In-NOVA — Opportunités',
  volontariat:  'In-NOVA — Volontariat',
  bienfaisance: 'In-NOVA — Bienfaisance',
  rejoindre:    'In-NOVA — Rejoindre',
  contact:      'In-NOVA — Contact',
}

const PAGE_NAMES = {
  entreprises:  'Entreprises',
  programmes:   'Programmes',
  opportunites: 'Opportunités',
  volontariat:  'Volontariat',
  bienfaisance: 'Bienfaisance',
  rejoindre:    'Rejoindre',
  contact:      'Contact',
}

export default function App() {
  const [page, setPage] = useState('accueil')

  useEffect(() => {
    document.title = PAGE_TITLES[page] || 'In-NOVA'
  }, [page])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [page])

  const navigate = (id) => setPage(id)

  const renderPage = () => {
    if (page === 'accueil') {
      return <Home onNavigate={navigate} />
    }

    if (page === 'opportunites') {
      return <Opportunites onNavigate={navigate} />
    }

    if (page === 'entreprises') {
      return <Entreprises onNavigate={navigate} />
    }
    return (
      <ComingSoon
        pageName={PAGE_NAMES[page] || page}
        onBack={() => navigate('accueil')}
      />
    )
  }

  return (
    <div className="font-Arial">
      
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-[#F9A825] text-slate-900 font-bold px-4 py-2 rounded-lg z-[100] text-sm"
      >
        Aller au contenu principal
      </a>
      <Navbar currentPage={page} onNavigate={navigate} />

      {/* Contenu */}
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <div className="flex flex-col items-center gap-4">
              <div className="w-10 h-10 border-4 border-[#0066CC]/20 border-t-[#0066CC] rounded-full animate-spin" />
              <p className="text-slate-400 text-sm font-medium">Chargement…</p>
            </div>
          </div>
        }
      >
        {renderPage()}
      </Suspense>

      {/* Footer */}
      <Footer onNavigate={navigate} />
    </div>
  )
}
