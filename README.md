# Segno

[![CI](https://github.com/Relatronica/Segno/actions/workflows/ci.yml/badge.svg)](https://github.com/Relatronica/Segno/actions/workflows/ci.yml)
[![Codice: AGPL-3.0](https://img.shields.io/badge/codice-AGPL--3.0-blue.svg)](LICENSE)
[![Dati: CC BY 4.0](https://img.shields.io/badge/dati-CC%20BY%204.0-lightgrey.svg)](LICENSE-CONTENT)

Timeline pubblica su lobbying, dichiarazioni e decisioni europee sul digitale — con fonti e citazioni.

Chi influenza le regole digitali in Europa? Segno mette incontri, spese dichiarate, dichiarazioni pubbliche e passaggi legislativi sullo stesso asse temporale. Ogni punto ha un link stabile.

Sito: [segno.app](https://segno.app) · Progetto [Relatronica](https://relatronica.com)

## Pagine

| Percorso | Cosa fa |
| --- | --- |
| `/` | Home: manifesto e numeri presi dai dati della timeline |
| `/timeline` | Timeline interattiva, sei lenti (modelli, capacità, ricerca, mercato, cultura, politica) |
| `/segnala` | Errori, fonti mancanti, contributi |
| `/redazione` | Coda candidati (protetta, non indicizzata) |

Italiano e inglese si cambiano dalla navbar.

## Dati

La timeline curata vive in `lib/data/trasparenza.ts`:

- due temi (`ai-act`, `sentiment`)
- aziende, persone, eventi con `sourceUrl` obbligatorio
- `getHomeSnapshot()` calcola eventi, aziende, anni e fonti uniche — usati in homepage e nell’immagine Open Graph

I numeri in homepage non sono copy: se aggiungi un evento, si aggiornano da soli.

## Pipeline redazionale

`lib/pipeline/` scopre dichiarazioni da feed RSS su host autorizzati (`lib/pipeline/sources.ts`).

Due flussi:

- **Segnali automatici.** Un titolo che nomina una persona tracciata diventa una voce del diario automatico. Non ha citazione, quindi non ha tono e non entra in curva: il tono di un titolo non è la posizione della persona che nomina. La redazione può nascondere il pezzo o promuoverlo in coda.
- **Coda editoriale.** Gli altri candidati restano `pending`. Pubblicare richiede una citazione: solo quella citazione diventa un vertice della curva.

Il workflow `.github/workflows/pipeline-discover.yml` chiama `POST /api/pipeline/discover` ogni giorno (06:30 UTC). La scansione raccoglie i titoli che nominano le persone tracciate; il tag di tono resta solo un suggerimento mostrato in redazione, mai applicato d’ufficio alle voci del diario.

- Store: Netlify Blobs in produzione, `.data/pipeline-store.json` in locale (`candidates` e `signals`)
- UI: `/redazione` con `PIPELINE_SECRET`
- La timeline unisce eventi curati, pin pubblicati e segnali automatici

## Sviluppo

```bash
npm install
npm run dev
```

Altri script: `npm run lint`, `npm run type-check`, `npm run build`.

### Variabili d’ambiente

| Variabile | Uso |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical, sitemap, Open Graph (default `https://segno.app`) |
| `RESEND_API_KEY` | Form /segnala |
| `CONTACT_TO_EMAIL` | Destinatario segnalazioni |
| `CONTACT_FROM_EMAIL` | Mittente Resend |
| `PIPELINE_SECRET` | Auth redazione e API `/api/pipeline/*` |

## SEO

- Metadata e copy in `lib/seo.ts`
- `app/opengraph-image.tsx` genera la card 1200×630 con i numeri della timeline
- `app/sitemap.ts` e `app/robots.ts` (la redazione e `/api/` sono esclusi)
- JSON-LD: `WebSite` + `Organization` sul layout, `Dataset` in homepage

Per un dominio diverso da segno.app imposta `NEXT_PUBLIC_SITE_URL`.

## Licenza

Questo repository distribuisce codice e contenuti con due licenze diverse.

| Cosa | Dove | Licenza |
| --- | --- | --- |
| Codice | `app/`, `components/`, `lib/pipeline/`, `lib/trasparenza/`, `store/` | [AGPL-3.0-or-later](LICENSE) |
| Dati e testi | `lib/data/`, `lib/i18n/`, `lib/seo.ts`, `public/` | [CC BY 4.0](LICENSE-CONTENT) |

**Codice.** Chi mette online una versione modificata di Segno deve pubblicarne il sorgente: è la clausola di rete della AGPL (§13), ed è il motivo per cui la licenza è questa e non una permissiva. Il link alla repository è nel footer e nella sezione "Codice e dati aperti" di `/chi-siamo`.

**Dati.** Redazioni, ricercatori e amministrazioni possono riusare eventi, citazioni e analisi di tono anche in contesti commerciali, senza vincoli di copyleft: serve solo attribuire il progetto, linkare la fonte del singolo dato e citare la licenza. Le citazioni restano di chi le ha pronunciate.

Dettagli e casi limite in [LICENSE-CONTENT](LICENSE-CONTENT). Per contribuire vedi [CONTRIBUTING.md](CONTRIBUTING.md); per problemi di sicurezza [SECURITY.md](SECURITY.md).

## Stack

Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, Framer Motion, Zustand, Resend, Netlify Blobs.
