# Site In-NOVA

Plateforme web officielle du Club In-NOVA.

## Lancement rapide

```bash
bash lancer.sh
```

Ou manuellement :

```bash
npm install
npm run dev
```

Ouvre ensuite : http://localhost:5173

## Structure

```
src/
├── components/     Navbar, Footer, AdBanner
├── data/           Donnees mockees (opportunites, entreprises, admin)
├── hooks/          useScrollAnimation, useAdminAuth
├── pages/          Accueil, Opportunites, Entreprises, Programmes,
│                   Volontariat, Bienfaisance, Rejoindre, Contact, Admin
├── styles/         globals.css
└── utils/          security.js, validatePassword.js
```

## Identifiants Admin

| Espace     | Login      | Mot de passe |
|------------|------------|-------------|
| General    | admin      | innova2026  |
| TechNOVA   | technova   | tech2026    |
| AgriNOVA   | agrinova   | agri2026    |
| TradeNOVA  | tradenova  | trade2026   |
| AquaNOVA   | aquanova   | aqua2026    |

## Contact

innova@gmail.com

## Phase 2

Le backend Django prendra en charge toutes les API.
Les points d integration sont commentes dans le code avec : TODO Phase 2
