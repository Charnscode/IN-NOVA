
import { useScrollAnimation } from '../../../hooks/useScrollAnimation'
import Btn from '../../../components/Btn'

const AVANTAGES = [
  { icon: '🎓', titre: 'Certificat officiel',     desc: 'Reconnu par tout le réseau In-NOVA.' },
  { icon: '🤝', titre: 'Réseau professionnel',    desc: 'Accès direct aux mentors et entrepreneurs.' },
  { icon: '💡', titre: 'Compétences concrètes',   desc: 'Formation et mise en pratique réelle.' },
  { icon: '🌍', titre: 'Impact social direct',    desc: 'Contribution à la jeunesse africaine.' },
]

export default function VolontariatCTA({ onNavigate }) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 })

  return (
    <section
      ref={ref}
      className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #001A4D 0%, #003380 50%, #0066CC 100%)' }}
      aria-labelledby="volontariat-title"
    >
      
      <div
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'rgba(255,255,255,0.04)' }}
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: 'rgba(249,168,37,0.06)' }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* ── Gauche : texte ── */}
        <div
          className={[
            'transition-all duration-700',
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8',
          ].join(' ')}
        >
          <p className="text-[#F9A825] font-black text-xs uppercase tracking-widest mb-3">
            Impact &amp; Engagement
          </p>
          <h2
            id="volontariat-title"
            className="font-black text-white leading-tight mb-5"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              fontFamily: 'Arial, sans-serif',
            }}
          >
            Devenez volontaire<br />
            <span className="text-[#F9A825]">In-NOVA</span>
          </h2>
          <p className="text-white/60 mb-8 max-w-md leading-relaxed">
            Contribuez à notre mission, développez vos compétences et bâtissez
            un réseau solide aux côtés d'entrepreneurs passionnés.
          </p>

          {/* Avantages */}
          <ul className="space-y-3 mb-8" role="list">
            {AVANTAGES.map((a, i) => (
              <li
                key={a.titre}
                className={[
                  'flex items-center gap-3 transition-all duration-500',
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4',
                ].join(' ')}
                style={{ transitionDelay: `${150 + i * 70}ms` }}
              >
                <span
                  className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-base shrink-0"
                  aria-hidden="true"
                >
                  {a.icon}
                </span>
                <div>
                  <span className="text-white font-bold text-sm">{a.titre}</span>
                  <span className="text-white/45 text-xs ml-2">{a.desc}</span>
                </div>
              </li>
            ))}
          </ul>

          <Btn
            variant="primary"
            size="lg"
            onClick={() => onNavigate?.('volontariat')}
            ariaLabel="Postuler au volontariat In-NOVA"
          >
            Postuler au volontariat →
          </Btn>
        </div>

        {/* ── Droite : card CTA ── */}
        <div
          className={[
            'rounded-2xl p-8 text-center border border-white/12 transition-all duration-700 delay-200',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
          ].join(' ')}
          style={{
            background:          'rgba(255,255,255,0.07)',
            backdropFilter:      'blur(12px)',
            WebkitBackdropFilter:'blur(12px)',
          }}
        >
          <div className="text-5xl mb-4" aria-hidden="true">🤝</div>
          <p
            className="text-white font-black text-xl mb-2"
            style={{ fontFamily: 'Arial, sans-serif' }}
          >
            Rejoignez la mission
          </p>
          <p className="text-white/50 text-sm mb-6 leading-relaxed">
            Formulaire de candidature disponible sur la page dédiée.
            <br />
            Notre équipe vous répondra sous 48h.
          </p>

          <div className="space-y-3">
            <Btn
              variant="primary"
              full
              onClick={() => onNavigate?.('volontariat')}
            >
              Voir la page Volontariat →
            </Btn>
            <Btn
              variant="ghost"
              full
              onClick={() => onNavigate?.('rejoindre')}
            >
              Rejoindre le Club
            </Btn>
          </div>
        </div>
      </div>
    </section>
  )
}
