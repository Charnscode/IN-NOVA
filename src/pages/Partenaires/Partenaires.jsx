// src/pages/Partenaires/Partenaires.jsx
import { Handshake, Mail, Users } from 'lucide-react'
import Reveal from '../../components/Reveal'

// Aucun partenaire officiel confirme pour le moment
// Phase 2 : GET /api/partenaires/
export const PARTENAIRES = []

export default function Partenaires() {
  return (
    <main className="min-h-screen bg-slate-50 pt-16">
      <header style={{ background:'linear-gradient(135deg, #0A1F5C 0%, #0055BB 100%)' }}
        className="py-12 px-4 sm:px-6 text-center">
        <Reveal>
          <h1 className="font-black text-white text-3xl sm:text-4xl mb-3" style={{ fontFamily:'Arial, sans-serif' }}>
            Nos Partenaires
          </h1>
          <p className="text-white/70 text-sm max-w-xl mx-auto">
            Ils accompagnent le Club In-NOVA et ses membres dans le développement de projets innovants.
          </p>
        </Reveal>
      </header>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-14">
        {PARTENAIRES.length === 0 ? (
          <Reveal className="bg-white rounded-2xl p-10 border border-slate-100 text-center max-w-md mx-auto">
            <Users className="mx-auto mb-4" size={36} color="#0066CC" />
            <p className="font-black text-slate-800 mb-1">Aucun partenaire pour le moment</p>
            <p className="text-slate-400 text-sm">Le Club In-NOVA construit son réseau de partenaires. Revenez bientôt !</p>
          </Reveal>
        ) : (
          <div className="flex flex-wrap items-center justify-center gap-8">
            {PARTENAIRES.map((p, i) => (
              <Reveal key={p.nom} delay={i * 90}>
                <div className="bg-white rounded-2xl p-6 border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-center w-44">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden mx-auto mb-3">
                    <img src={p.logo} alt={p.nom} className="w-full h-full object-cover" />
                  </div>
                  <p className="font-black text-slate-800 text-sm mb-1">{p.nom}</p>
                  <p className="text-slate-400 text-[11px] leading-snug">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </section>

      <Reveal as="section" className="max-w-2xl mx-auto px-4 sm:px-6 pb-16 text-center">
        <div className="bg-white rounded-2xl p-8 border border-slate-100">
          <Handshake className="mx-auto mb-4" size={36} color="#0066CC" />
          <h2 className="font-black text-[#001A4D] text-xl mb-2" style={{ fontFamily:'Arial, sans-serif' }}>
            Devenir partenaire d'In-NOVA
          </h2>
          <p className="text-slate-500 text-sm mb-6">
            Vous représentez une entreprise, une institution ou une organisation et souhaitez accompagner les jeunes
            entrepreneurs du Club ? Écrivez-nous.
          </p>
          <a href="mailto:clubinnova08@gmail.com?subject=Demande de partenariat In-NOVA"
            className="inline-flex items-center gap-2 bg-[#0066CC] hover:bg-[#004FA3] text-white font-black text-sm px-6 py-3 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-lg">
            <Mail size={16} /> Demander un partenariat
          </a>
        </div>
      </Reveal>
    </main>
  )
}
