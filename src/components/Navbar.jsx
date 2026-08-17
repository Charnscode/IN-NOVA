// src/components/Navbar.jsx
import { useState } from 'react'

const LINKS = [
  { id:'accueil',      label:'Accueil'      },
  { id:'entreprises',  label:'Entreprises'  },
  { id:'partenaires',  label:'Partenaires'  },
  { id:'programmes',   label:'Programmes'   },
  { id:'opportunites', label:'Opportunites' },
  { id:'bienfaisance', label:'Bienfaisance' },
  { id:'volontariat',  label:'Volontariat'  },
  { id:'rejoindre',    label:'Rejoindre'    },
  { id:'contact',      label:'Contact'      },
]

export default function Navbar({ currentPage, onNavigate }) {
  const [open, setOpen] = useState(false)

  const nav = (id) => { onNavigate(id); setOpen(false) }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 shadow-md"
      style={{ backgroundColor:'#002268' }}
      role="navigation" aria-label="Navigation principale">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          <button onClick={() => nav('accueil')} className="flex items-center gap-2 flex-shrink-0">
            <img src="/logos/innova.jpg" alt="In-NOVA" className="h-8 w-8 rounded-lg object-cover" />
            <span className="font-black text-white text-lg hidden sm:block underline decoration-2 underline-offset-4"
              style={{ fontFamily:'Arial, sans-serif' }}>
              In-NOVA
            </span>
          </button>

          <div className="hidden lg:flex items-center gap-1">
            {LINKS.map(l => (
              <button key={l.id} onClick={() => nav(l.id)}
                className={[
                  'px-3 py-2 text-xs font-bold transition-all duration-200 border-b-2',
                  currentPage === l.id
                    ? 'text-white border-white'
                    : 'text-white/70 border-transparent hover:text-white hover:border-white/50'
                ].join(' ')}>
                {l.label}
              </button>
            ))}
          </div>

          <button onClick={() => setOpen(o => !o)}
            className="lg:hidden p-2 rounded-lg text-white hover:bg-white/10"
            aria-expanded={open} aria-label="Menu">
            <div className="w-5 h-4 flex flex-col justify-between">
              <span className={['block h-0.5 bg-current transition-all', open ? 'rotate-45 translate-y-1.5' : ''].join(' ')} />
              <span className={['block h-0.5 bg-current transition-all', open ? 'opacity-0' : ''].join(' ')} />
              <span className={['block h-0.5 bg-current transition-all', open ? '-rotate-45 -translate-y-2' : ''].join(' ')} />
            </div>
          </button>
        </div>

        {open && (
          <div className="lg:hidden border-t border-white/10 py-3 space-y-1">
            {LINKS.map(l => (
              <button key={l.id} onClick={() => nav(l.id)}
                className={[
                  'w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all',
                  currentPage === l.id ? 'bg-white/10 text-white' : 'text-white/70 hover:bg-white/5'
                ].join(' ')}>
                {l.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
