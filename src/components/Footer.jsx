import { NICHES } from '../data/niches'

export default function Footer({ onNavigate }) {
  const go = (id) => {
    onNavigate?.(id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer style={{ background: 'linear-gradient(135deg,#0A1F5C 0%,#0D2B6E 100%)' }}className="text-white" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-8 border-b border-white/6">

          <div>
            <button
              onClick={() => go('accueil')}
              className="flex items-center gap-2 mb-3 group"
              aria-label="Retour à l'accueil"
            >
              <img
                src="/logos/innova.jpg"
                alt="Logo In-NOVA"
                className="w-8 h-8 rounded-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
              />
              <span
                className="font-black text-xl text-white"
                style={{ letterSpacing: '-0.04em', fontFamily: 'Arial, sans-serif' }}
              >
                In<span className="text-[#F9A825]">‑</span>NOVA
              </span>
            </button>
            <p className="text-white/30 text-xs leading-relaxed mb-4">
              Employabilité &amp; Entrepreneuriat pour les jeunes.<br />
              Club privé · 15 membres max.
            </p>
            <div className="flex gap-2" aria-label="Réseaux sociaux">
              {['f', 'in' , 'W'].map((s) => (
                <button
                  key={s}
                  aria-label={s}
                  className="w-8 h-8 rounded-lg bg-white/6 border border-white/10 hover:bg-[#0066CC] hover:border-[#0066CC] flex items-center justify-center text-white/40 hover:text-white text-xs font-bold transition-all duration-200"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <nav aria-label="Navigation secondaire">
            <h3 className="font-black text-xs uppercase tracking-widest text-white/35 mb-4">
              Navigation
            </h3>
            <ul className="space-y-2">
              {[
                ['accueil',      'Accueil'],
                ['entreprises',  'Entreprises'],
                ['programmes',   'Programmes'],
                ['opportunites', 'Opportunités'],
                ['volontariat',  'Volontariat'],
                ['bienfaisance', 'Bienfaisance'],
                ['rejoindre',    'Rejoindre'],
                ['contact',      'Contact'],
              ].map(([id, label]) => (
                <li key={id}>
                  <button
                    onClick={() => go(id)}
                    className="text-white/30 hover:text-[#F9A825] text-xs transition-colors duration-150"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Entreprises */}
          <div>
            <h3 className="font-black text-xs uppercase tracking-widest text-white/35 mb-4">
              Entreprises
            </h3>
            <ul className="space-y-3">
              {NICHES.map((n) => (
                <li key={n.id}>
                  <button
                    onClick={() => go('entreprises')}
                    className="flex items-center gap-2 text-white/30 hover:text-[#F9A825] text-xs transition-colors duration-150 group"
                  >
                    <img
                      src={n.logo}
                      alt={n.nom}
                      className="w-5 h-5 rounded-full object-cover opacity-60 group-hover:opacity-100 transition-opacity"
                    />
                    {n.nom}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/*  Contact */}
          <div>
            <h3 className="font-black text-xs uppercase tracking-widest text-white/35 mb-4">
              Contact
            </h3>
            <address className="not-italic space-y-2 text-xs text-white/30 mb-5">
           <li>  📧 <a href= "clubinnova08@gmail.com">clubinnova08@gmail.com</a></li>
              <li> <p>📍 Cotonou, Bénin</p></li> 
              
              <li> <a href= "www.in-nova.com">🌐 www.in-nova.com</a></li> 
          
            </address>
            <div className="pt-3 border-t border-white/6">
              <button
                onClick={() => go('admin')}
                className="text-white/15 hover:text-white/50 text-xs transition-colors duration-200"
                aria-label="Accès espace administration"
              >
                ⚙️ Espace admin
              </button>
            </div>
          </div>
        </div>
        <div className="pt-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/15">
          <span>© 2025 In-NOVA — Tous droits réservés</span>
        </div>
      </div>
    </footer>
  )
}
