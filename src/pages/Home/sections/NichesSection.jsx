import { useScrollAnimationList } from '../../../hooks/useScrollAnimation'
import { NICHES }                  from '../../../data/niches'
import Btn                         from '../../../components/Btn'

export default function NichesSection({ onNavigate }) {
  const { ref, isVisible } = useScrollAnimationList({ threshold: 0.05 })

  return (
    <section
      className="bg-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8"
      aria-labelledby="niches-title"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-[#0066CC] font-black text-xs uppercase tracking-widest mb-2">
              Nos entreprises
            </p>
            <h2
              id="niches-title"
              className="font-black text-slate-900 text-3xl sm:text-4xl tracking-tight"
              style={{ fontFamily: 'Arial, sans-serif' }}
            >
              Nos piliers d'innovation
            </h2>
          </div>
          <Btn variant="outline" onClick={() => onNavigate?.('entreprises')}>
            Toutes les entreprises →
          </Btn>
        </div>

        {/* Grille 4 cards */}
        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          role="list"
        >
          {NICHES.map((niche, i) => (
            <NicheCard
              key={niche.id}
              niche={niche}
              index={i}
              isVisible={isVisible}
              onClick={() => onNavigate?.('entreprises')}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function NicheCard({ niche, index, isVisible, onClick }) {
  return (
    <article
      role="listitem"
      className={[
        'rounded-2xl p-6 border-2 cursor-pointer group',
        'transition-all duration-500',
        'hover:-translate-y-2 hover:shadow-xl',
        
        // Animationnnn
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-8',
      ].join(' ')}
      style={{
        background:       niche.bg,
        borderColor:      isVisible ? niche.border : 'transparent',
        transitionDelay:  `${index * 80}ms`,
      }}
      onClick={onClick}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      tabIndex={0}
      aria-label={`${niche.nom} — ${niche.desc}`}
    >
      <div
        className="w-16 h-16 rounded-2xl bg-white shadow-md flex items-center justify-center mb-4 overflow-hidden group-hover:scale-105 transition-transform duration-300"
        aria-hidden="true"
      >
        <img
          src={niche.logo}
          alt={`Logo ${niche.nom}`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <h3
        className="font-black text-lg mb-1 group-hover:opacity-80 transition-opacity"
        style={{ color: niche.couleur, fontFamily: 'Arial, sans-serif' }}
      >
        {niche.nom}
      </h3>
      <p className="text-slate-600 text-xs leading-relaxed">
        {niche.desc}
      </p>
      <div
        className="mt-4 w-8 h-8 rounded-full flex items-center justify-center text-sm font-black transition-all duration-200 opacity-0 group-hover:opacity-100 group-hover:translate-x-1"
        style={{ background: niche.couleur, color: '#fff' }}
        aria-hidden="true"
      >
        →
      </div>
    </article>
  )
}
