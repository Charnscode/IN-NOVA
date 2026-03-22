import heroBg from '../../../assets/hero-bg.jpg'
import Btn    from '../../../components/Btn'

const STATS = [
  { valeur: '15',   label: 'Membres maximum'        },
  { valeur: '4',    label: 'Entreprises innovantes'  },
  { valeur: '100+', label: 'Jeunes accompagnés'      },
  { valeur: '∞',    label: 'Opportunités créées'     },
]

export default function HeroSection({ onNavigate }) {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-end overflow-hidden"
      aria-label="Présentation principale In-NOVA"
    >

      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroBg})`,
          filter: 'brightness(0.28) saturate(0.7)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(150deg, rgba(9, 73, 201, 0.96) 0%, rgba(8, 93, 219, 0.72) 50%, rgba(14, 110, 201, 0.25) 100%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 inset-x-0 h-56"
        style={{ background: 'linear-gradient(to top, rgba(27, 86, 204, 0.95), transparent)' }}
        aria-hidden="true"
      />
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-28 pb-0">
        <div className="max-w-3xl">
          <div
            className="inline-flex items-center gap-2.5 bg-[#F9A825] text-slate-900 font-black text-xs uppercase tracking-widest px-4 py-2 rounded-full mb-7 animate-fadeSlideUp stagger-1"
          >
            <span
              className="w-2 h-2 rounded-full bg-slate-900"
              style={{ animation: 'pulse-slow 2s ease-in-out infinite' }}
              aria-hidden="true"
            />
            Club Privé — 15 membres maximum
          </div>

          {/* Titre H1 */}
          <h1
            className="font-black text-justify text-white leading-none tracking-tight mb-5 animate-fadeSlideUp stagger-2"
            style={{
              fontSize: 'clamp(2.4rem, 5.5vw, 5rem)',
              fontFamily: 'Arial, sans-serif',
              lineHeight: '1.05',
            }}
          >
            In-NOVA —<br />
            Le Club des jeunes{' '}
            <span className="text-[#F9A825]">entrepreneurs</span>
            <br />
            et innovateurs
          </h1>
          <p
            className="text-white/70 text-justify sm:text-xl max-w-xl mb-9 leading-relaxed animate-fadeSlideUp stagger-3"
          >
            Une communauté dynamique dédiée à l'employabilité, à l'entrepreneuriat et aux opportunités 
            concrètes pour les jeunes.
          </p>

          <div className="flex flex-wrap gap-3 mb-14 animate-fadeSlideUp stagger-4">
            <Btn
              variant="primary"
              size="lg"
              onClick={() => onNavigate?.('entreprises')}
              ariaLabel="Découvrir nos entreprises"
            >
               Découvrir nos entreprises
            </Btn>
            <Btn
              variant="primary"
              size="lg"
              onClick={() => onNavigate?.('Volontariat')}
              ariaLabel="Rejoindre le volontariat"
            >
               Rejoindre le volontariat
            </Btn>
            </div>
<div className="flex flex-wrap gap-3 mb-14 animate-fadeSlideUp stagger-4">
            <Btn
              variant="ghost"
              size="lg"
              onClick={() => onNavigate?.('opportunites')}
              ariaLabel="Voir les opportunités"
            >
               Voir les opportunités
            </Btn>
            <Btn
              variant="ghost"
              size="lg"
              onClick={() => onNavigate?.('Programmes')}
              ariaLabel="Découvrez nos programmes"
            >
               Découvrez nos programmes
            </Btn>
          
          </div>
        </div>
        
        <div
          className="grid grid-cols-2 sm:grid-cols-4 rounded-2xl overflow-hidden border border-white/8 animate-fadeSlideUp"
          style={{
            background:      'rgba(14, 42, 126, 0.65)',
            backdropFilter:  'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            animationDelay:  '300ms',
          }}
          role="list"
          aria-label="Statistiques clés"
        >
          {STATS.map((s, i) => (
            <div
              key={s.label}
              role="listitem"
              className={[
                'py-6 text-center',
                i < STATS.length - 1
                  ? 'border-r border-white/8'
                  : '',
                i < 2 ? 'border-b sm:border-b-0 border-white/8' : '',
              ].join(' ')}
            >
              <div
                className="text-[#F9A825] font-black leading-none mb-1.5"
                style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', fontFamily: 'Arial, sans-serif' }}
                aria-label={`${s.valeur} ${s.label}`}
              >
                {s.valeur}
              </div>
              <div className="text-white/50 text-xs font-medium px-2 leading-snug">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="relative z-10 h-12" aria-hidden="true" />
    </section>
  )
}
