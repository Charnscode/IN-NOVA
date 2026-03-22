import { useScrollAnimation } from '../../../hooks/useScrollAnimation'
import AdBanner                from '../../../components/AdBanner'
import Btn                     from '../../../components/Btn'
import { OPPORTUNITES, STATS } from '../../../data/opportunites'

const BADGE_COLORS = {
  'Emploi':         { bg: '#EFF6FF', text: '#1D4ED8' },
  'Stage':          { bg: '#FFF7ED', text: '#C2410C' },
  'Financement':    { bg: '#F0FDF4', text: '#15803D' },
  'Appel à projet': { bg: '#FAF5FF', text: '#7E22CE' },
}

export default function CommSection({ onNavigate }) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.08 })

  return (
    <section
      ref={ref}
      className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8"
      style={{ background: '#F8FAFC' }}
      aria-labelledby="comm-title"
    >
      <div className="max-w-7xl mx-auto">

        {/*  Bloc In-NOVA COMM */}
        <div
          className={[
            'rounded-2xl p-8 sm:p-10 text-center mb-10',
            'transition-all duration-700',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
          ].join(' ')}
          style={{ background: 'linear-gradient(135deg, #0D2B6E 0%, #0066CC 100%)' }}
        >

          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="text-white/80 text-lg" aria-hidden="true">((·))</span>
            <h2
              id="comm-title"
              className="font-black text-white text-2xl sm:text-3xl"
              style={{ fontFamily: 'Arial, sans-serif' }}
            >
              In-NOVA COMM
            </h2>
          </div>

          <p className="text-white/70 text-sm mb-1">Opportunités &amp; Communication</p>

          <p className="text-white/60 text-sm max-w-xl mx-auto leading-relaxed mb-8">
            La plateforme officielle de communication du Club. Elle centralise et diffuse
            toutes les opportunités professionnelles pour les jeunes : offres de stages,
            d'emplois, appels à projets, subventions et opportunités de financement.
          </p>

          <Btn
            variant="primary"
            size="lg"
            onClick={() => onNavigate?.('opportunites')}
            ariaLabel="Accéder aux opportunités"
          >
            Accéder aux opportunités →
          </Btn>
        </div>
  <div className="flex items-center justify-between mb-5">
            <h3
              className="font-black text-slate-900 text-xl"
              style={{ fontFamily: 'Arial, sans-serif' }}
            >
              Dernières opportunités
            </h3>
            <button
              onClick={() => onNavigate?.('opportunites')}
              className="text-[#0066CC] text-sm font-bold hover:underline transition-all"
            >
              Tout voir →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {OPPORTUNITES.map((opp, i) => {
              const badgeStyle = BADGE_COLORS[opp.type] || { bg: '#F1F5F9', text: '#475569' }
              return (
                <article
                  key={opp.id}
                  className="bg-white rounded-2xl p-5 border border-slate-100 hover:border-[#0066CC]/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
                  style={{ transitionDelay: `${i * 60}ms` }}
                  onClick={() => onNavigate?.('opportunites')}
                  onKeyDown={(e) => e.key === 'Enter' && onNavigate?.('opportunites')}
                  tabIndex={0}
                  aria-label={`Opportunité : ${opp.titre}`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <span
                      className="text-xs font-black uppercase tracking-wide px-3 py-1 rounded-full"
                      style={{ background: badgeStyle.bg, color: badgeStyle.text }}
                    >
                      {opp.type}
                    </span>
                    {opp.epingle && (
                      <span className="text-[#F9A825] text-sm" aria-label="Épinglé">📌</span>
                    )}
                  </div>

                  <h4 className="font-bold text-slate-800 text-sm mb-2 group-hover:text-[#0066CC] transition-colors line-clamp-2">
                    {opp.titre}
                  </h4>

                  <div className="flex flex-wrap gap-2 text-xs text-slate-400 mb-3">
                    <span>🏢 {opp.org}</span>
                    <span>📍 {opp.lieu}</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {opp.comp.map((c) => (
                      <span key={c} className="text-xs bg-slate-50 text-slate-500 px-2 py-0.5 rounded-full border border-slate-100">
                        {c}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                    <span className="text-xs text-slate-300">{opp.date}</span>
                    <span className="text-xs font-bold text-[#0066CC] group-hover:underline">Voir →</span>
                  </div>
                </article>
              )
            })}
          </div>
          <AdBanner />
        </div>
    </section>
  )
}
