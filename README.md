# Segno

Timeline pubblica su lobbying, dichiarazioni e decisioni europee sul digitale — con fonti e citazioni.

Chi influenza le regole digitali in Europa? Segno mette incontri, spese dichiarate, dichiarazioni pubbliche e passaggi legislativi sullo stesso asse temporale. Ogni punto ha un link stabile.

Sito: [segno.app](https://segno.app) · Progetto [Relatronica](https://relatronica.com)

## Pagine

| Percorso | Cosa fa |
| --- | --- |
| `/` | Home: manifesto e numeri presi dai dati della timeline |
| `/trasparenza` | Timeline interattiva, due lenti (regole sull’IA, tono dei leader) |
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

- **Segnali automatici.** Un nome completo (o un account X ufficiale) più un tag sopra soglia diventano un segnale. Non hanno citazione. In timeline gli articoli dello stesso giorno diventano un solo punto sulla curva. La redazione può correggere il tag, nascondere il pezzo o promuoverlo in coda.
- **Coda editoriale.** Gli altri candidati restano `pending`. Pubblicare richiede una citazione: quel pin resta un vertice suo, distinto dal punto automatico del giorno.

Il workflow `.github/workflows/pipeline-discover.yml` chiama `POST /api/pipeline/discover` ogni giorno (06:30 UTC). Senza `GROQ_API_KEY` il tag viene da un lessico; con la chiave gratuita di Groq, i titoli incerti passano da un modello.

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
| `GROQ_API_KEY` | Facoltativa. Piano gratuito Groq (console.groq.com, senza carta). Classifica i titoli quando il lessico è incerto. Va sull’hosting, non nel repo |
| `SENTIMENT_MODEL` | Facoltativa. Default `openai/gpt-oss-20b`, un modello del piano gratuito. Se Groq cambia l’elenco, usa l’id che vedi nella pagina Limits |

## SEO

- Metadata e copy in `lib/seo.ts`
- `app/opengraph-image.tsx` genera la card 1200×630 con i numeri della timeline
- `app/sitemap.ts` e `app/robots.ts` (la redazione e `/api/` sono esclusi)
- JSON-LD: `WebSite` + `Organization` sul layout, `Dataset` in homepage

Per un dominio diverso da segno.app imposta `NEXT_PUBLIC_SITE_URL`.

## Stack

Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, Framer Motion, Zustand, Resend, Netlify Blobs.
