# Segno — Trasparenza sulle regole digitali

Timeline pubblica su lobbying, dichiarazioni e decisioni europee sul digitale — con fonti e citazioni.

## Stack

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS 4**
- **Framer Motion**
- **Zustand**
- **Resend** (form contatti)
- **Netlify Blobs** (coda redazionale)

## Struttura

```
app/
├── page.tsx            # Home
├── trasparenza/        # Timeline
├── segnala/            # Form segnalazioni
├── redazione/          # Revisione candidati (protetta)
└── api/
    ├── contact/        # Invio email
    └── pipeline/       # Discovery + candidati
```

## Sviluppo

```bash
npm install
npm run dev
```

Variabili utili: `RESEND_API_KEY`, `PIPELINE_SECRET`.

## Lingue

Italiano e inglese dalla navbar.
