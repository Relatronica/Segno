# Segno — Sovranità digitale

Piattaforma per la consapevolezza e la sovranità digitale.

Percorsi formativi, risorse, glossario e news per comprendere, difendere e rivendicare i tuoi diritti nel mondo digitale.

## Stack

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS 4**
- **shadcn/ui** + Radix UI
- **Framer Motion**
- **Zustand**

## Struttura

```
app/
├── page.tsx            # Homepage
├── percorsi/           # Percorsi formativi / corsi
├── risorse/            # Risorse e guide
├── glossario/          # Glossario della sovranità digitale
├── news/               # Feed notizie (RSS)
├── chi-siamo/          # Chi siamo
└── api/news/           # API RSS news
components/
├── layout/             # Navbar, Footer
└── ui/                 # Componenti base (shadcn/ui)
lib/
├── data/               # Dati statici (corsi, risorse, glossario)
├── i18n/               # Traduzioni IT/EN
└── utils.ts
store/
└── useAppStore.ts      # Stato globale (Zustand)
```

## Sviluppo

```bash
npm install
npm run dev
```

## Bilingue

Il sito supporta italiano e inglese. La lingua si cambia dal pulsante nella navbar.
