// src/pages/Politique/PolitiqueConfidentialite.jsx
import { ShieldCheck } from 'lucide-react'
import Reveal from '../../components/Reveal'

const SECTIONS = [
  {
    titre: '1. Données que nous collectons',
    texte: "Selon les formulaires que vous remplissez sur le site (inscription au Club, candidature à un programme, inscription vendeur ou acheteur sur TradeNOVA Market, demande de contact ou de partenariat), nous pouvons collecter : votre nom et prénom, votre email, votre numéro de téléphone, une photo de profil ou de pièce d'identité, les informations de votre boutique (lieu, RCCM ou numéro IFU) ainsi que votre numéro de paiement Mobile Money.",
  },
  {
    titre: '2. Utilisation des données',
    texte: "Ces informations servent uniquement à traiter votre demande (candidature, inscription, commande, message), à vous contacter, à sécuriser les transactions sur TradeNOVA Market et à améliorer nos services. Elles ne sont jamais vendues à des tiers.",
  },
  {
    titre: '3. Cookies',
    texte: "Le site utilise des cookies pour mémoriser vos préférences et mesurer la fréquentation. Vous pouvez accepter ou refuser les cookies non essentiels depuis la bannière affichée lors de votre première visite.",
  },
  {
    titre: '4. Paiements en ligne',
    texte: "Les paiements effectués sur le site (achats, commandes, retraits) sont traités par des prestataires de paiement tiers (Mobile Money, KKiaPay). In-NOVA ne stocke aucune donnée bancaire complète : seules les informations nécessaires au traitement de la transaction sont transmises au prestataire de paiement.",
  },
  {
    titre: '5. TradeNOVA Market',
    texte: "La marketplace TradeNOVA Market applique des règles complémentaires détaillées dans sa propre politique de confidentialité, notamment sur l'obligation de conduire toutes les discussions, commandes et paiements directement sur le site.",
  },
  {
    titre: '6. Vos droits',
    texte: "Vous pouvez à tout moment demander l'accès, la correction ou la suppression de vos données personnelles en écrivant à clubinnova08@gmail.com.",
  },
]

export default function PolitiqueConfidentialite() {
  return (
    <main className="min-h-screen bg-slate-50 pt-16">
      <header style={{ background:'linear-gradient(135deg, #0A1F5C 0%, #0055BB 100%)' }}
        className="py-12 px-4 sm:px-6 text-center">
        <Reveal>
          <ShieldCheck className="mx-auto mb-3 text-white" size={36} />
          <h1 className="font-black text-white text-3xl mb-2" style={{ fontFamily:'Arial, sans-serif' }}>
            Politique de confidentialité
          </h1>
          <p className="text-white/70 text-sm">Dernière mise à jour : Août 2026</p>
        </Reveal>
      </header>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12 space-y-6">
        {SECTIONS.map((s, i) => (
          <Reveal key={s.titre} delay={i * 70} className="bg-white rounded-2xl p-6 border border-slate-100">
            <h2 className="font-black text-[#001A4D] text-base mb-2">{s.titre}</h2>
            <p className="text-slate-600 text-sm leading-relaxed">{s.texte}</p>
          </Reveal>
        ))}
      </div>
    </main>
  )
}
