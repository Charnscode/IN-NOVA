// src/components/Footer.jsx
export default function Footer({ onNavigate }) {
  return (
    <footer style={{ background:'linear-gradient(135deg, #0A1F5C 0%, #0055BB 100%)' }}
      className="text-white" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">

          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src="/logos/innova.jpg" alt="In-NOVA" className="h-10 w-10 rounded-xl object-cover" />
              <span className="font-black text-xl">In-NOVA</span>
            </div>
            <p className="text-white/60 text-xs leading-relaxed">
              Favoriser l'employabilité et l'entrepreneuriat des jeunes grâce à des opportunités concrètes et des formations de qualité.
            </p>
          </div>

          <div>
            <h3 className="font-black text-sm mb-4">Entreprises</h3>
            <ul className="space-y-2">
              {['TechNOVA','AgriNOVA','TradeNOVA','AquaNOVA'].map(e => (
                <li key={e}>
                  <button onClick={() => onNavigate('entreprises')}
                    className="text-white/60 hover:text-[#F9A825] text-xs transition-colors text-left">
                    {e}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-black text-sm mb-4">Programmes</h3>
            <ul className="space-y-2">
              {['Bootcamp','In-NOVA Summer','In-NOVA Challenge','Accompagnement'].map(p => (
                <li key={p}>
                  <button onClick={() => onNavigate('programmes')}
                    className="text-white/60 hover:text-[#F9A825] text-xs transition-colors text-left">
                    {p}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-black text-sm mb-4">Contact</h3>
            <ul className="space-y-2 text-white/60 text-xs">
              <li>
                <a href="mailto:clubinnova08@gmail.com" className="hover:text-[#F9A825] transition-colors">
                  clubinnova08@gmail.com
                </a>
              </li>
              <li>Abomey-Calavi, Bénin</li>
              <li className="pt-2">
                <button onClick={() => onNavigate('contact')}
                  className="text-[#F9A825] font-bold hover:underline text-xs">
                  Nous contacter →
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-xs">
            © 2026 Club In-NOVA. Tous droits réservés.
          </p>
          <div className="flex items-center gap-4">
            <button onClick={() => onNavigate('partenaires')}
              className="text-white/40 hover:text-white/70 text-xs transition-colors">
              Partenaires
            </button>
            <button onClick={() => onNavigate('politique')}
              className="text-white/40 hover:text-white/70 text-xs transition-colors">
              Politique de confidentialité
            </button>
            <button onClick={() => onNavigate('admin')}
              className="text-white/20 hover:text-white/50 text-xs transition-colors">
              Administration
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
