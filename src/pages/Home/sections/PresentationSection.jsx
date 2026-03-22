import { useScrollAnimation } from '../../../hooks/useScrollAnimation'

export default function PresentationSection() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 })

  return (
    <section
      ref={ref}
      className="bg-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8"
      aria-labelledby="presentation-title"
    >
      <div className="max-w-7xl mx-auto">
        <h2
          id="presentation-title"
          className={[
            'text-center font-black text-[#0066CC] text-2xl sm:text-3xl mb-8',
            'transition-all duration-700',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
          ].join(' ')}
          style={{ fontFamily: 'Arial, sans-serif' }}
        >
          Présentation du club
        </h2>
        <div
          className={[
            'bg-[#EFF6FF] rounded-2xl p-6 sm:p-8 border border-[#BFDBFE] max-w-4xl mx-auto',
            'transition-all duration-700 delay-100',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
          ].join(' ')}
        >
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-5">
            In-NOVA est un club privé regroupant un maximum de{' '}
            <strong className="text-[#0066CC]">15 membres</strong>, responsables
            d'entreprises ou aspirants entrepreneurs. Le Club favorise la création de projets
            innovants, le partage d'opportunités professionnelles et l'accompagnement des
            jeunes vers l'emploi et l'entrepreneuriat.
          </p>

          <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
            Chaque membre conserve la{' '}
            <strong className="text-[#0066CC]">propriété totale</strong> des projets auxquels
            il participe. Les projets sont organisés par{' '}
            <strong className="text-[#0066CC]">niches d'activités spécialisées</strong>.
          </p>
        </div>

        {/* Cartes */}
        <div
          className={[
            'hidden lg:grid grid-cols-4 gap-4 mt-10 max-w-4xl mx-auto',
            'transition-all duration-700 delay-200',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
          ].join(' ')}
        >
          {[
            { icon: '🎯', titre: 'Mission',     desc: "Favoriser l'employabilité via des opportunités concrètes." },
            { icon: '🌍', titre: 'Vision',      desc: "Communauté partageant projets, compétences et innovations." },
            { icon: '💡', titre: 'Innovation',  desc: "4 niches portées par des membres passionnés et engagés." },
            { icon: '🤝', titre: 'Réseau',      desc: "Liant jeunes, mentors, entreprises et institutions." },
          ].map((item, i) => (
            <div
              key={item.titre}
              className="bg-slate-50 rounded-2xl p-5 border border-slate-100 hover:border-[#0066CC]/30 hover:bg-blue-50/40 transition-all duration-200"
              style={{ transitionDelay: `${200 + i * 60}ms` }}
            >
              <div className="text-2xl mb-2" aria-hidden="true">{item.icon}</div>
              <div className="font-black text-slate-800 text-sm mb-1">{item.titre}</div>
              <div className="text-slate-500 text-xs leading-relaxed">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
