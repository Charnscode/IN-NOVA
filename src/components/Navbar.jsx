import { useState, useEffect } from 'react'
import Btn from './Btn'

const NAV_LINKS = [
  { id: 'accueil',      label: 'Accueil'      },
  { id: 'entreprises',  label: 'Entreprises'  },
  { id: 'programmes',   label: 'Programmes'   },
  { id: 'opportunites', label: 'Opportunités' },
  { id: 'volontariat',  label: 'Volontariat'  },
  { id: 'bienfaisance', label: 'Bienfaisance' },
  { id: 'rejoindre',    label: 'Rejoindre'    },
  { id: 'contact',      label: 'Contact'      },
]

export default function Navbar({ currentPage = 'accueil', onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const go = (id) => {
    onNavigate?.(id)
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <nav
      role="navigation"
      aria-label="Navigation principale"
      className={[
        'fixed top-0 inset-x-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-[#001A4D]/98 shadow-2xl shadow-black/30 backdrop-blur-xl'
          : 'bg-[#001A4D]/90 backdrop-blur-md',
      ].join(' ')}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">

        <button
          onClick={() => go('accueil')}
          aria-label="Retour à l'accueil In-NOVA"
          className="flex items-center gap-2.5 shrink-0 group"
        >
          <img
            src="/logos/innova.jpg"
            alt="Logo In-NOVA"
            className="w-8 h-8 rounded-full object-cover ring-2 ring-white/20 group-hover:ring-[#F9A825]/60 transition-all"
          />
          <span
            className="font-black text-xl text-white group-hover:text-[#F9A825] transition-colors"
            style={{ letterSpacing: '-0.04em', fontFamily: 'Arial, sans-serif' }}
          >
            In<span className="text-[#F9A825]">‑</span>NOVA
          </span>
        </button>

        <ul className="hidden xl:flex items-center gap-0.5" role="menubar">
          {NAV_LINKS.map((link) => (
            <li key={link.id} role="none">
              <button
                role="menuitem"
                onClick={() => go(link.id)}
                aria-current={currentPage === link.id ? 'page' : undefined}
                className={[
                  'px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-150',
                  currentPage === link.id
                    ? 'text-[#F9A825] bg-white/10'
                    : 'text-white/70 hover:text-white hover:bg-white/8',
                ].join(' ')}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

  
        <div className="hidden xl:flex items-center gap-3">
          <Btn variant="primary" size="sm" onClick={() => go('rejoindre')}>
            Rejoindre →
          </Btn>
        </div>

        {/* Hamburger mobile */}
        <button
          className="xl:hidden p-2 rounded-lg hover:bg-white/10 transition-colors focus-visible:outline-2"
          onClick={() => setMenuOpen((p) => !p)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
        >
          <span className="sr-only">{menuOpen ? 'Fermer' : 'Menu'}</span>
          <div className="w-6 h-5 flex flex-col justify-between" aria-hidden="true">
            <span className={`block h-0.5 bg-white rounded transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-[9px]' : ''}`} />
            <span className={`block h-0.5 bg-white rounded transition-all duration-300 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
            <span className={`block h-0.5 bg-white rounded transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-[9px]' : ''}`} />
          </div>
        </button>
      </div>

      {/* Menu mobile */}
      <div
        id="mobile-menu"
        aria-hidden={!menuOpen}
        className={[
          'xl:hidden overflow-hidden transition-all duration-300',
          menuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0',
        ].join(' ')}
      >
        <div className="bg-[#001A4D] border-t border-white/8 px-4 pt-2 pb-4 space-y-1">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => go(link.id)}
              aria-current={currentPage === link.id ? 'page' : undefined}
              className={[
                'block w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors',
                currentPage === link.id
                  ? 'bg-white/12 text-[#F9A825]'
                  : 'text-white/75 hover:bg-white/8 hover:text-white',
              ].join(' ')}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2">
            <Btn variant="primary" full onClick={() => go('rejoindre')}>
              Rejoindre In-NOVA →
            </Btn>
          </div>
        </div>
      </div>
    </nav>
  )
}
