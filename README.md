# Segno

[![CI](https://github.com/Relatronica/Segno/actions/workflows/ci.yml/badge.svg)](https://github.com/Relatronica/Segno/actions/workflows/ci.yml)
[![Code: AGPL-3.0](https://img.shields.io/badge/code-AGPL--3.0-blue.svg)](LICENSE)
[![Data: CC BY 4.0](https://img.shields.io/badge/data-CC%20BY%204.0-lightgrey.svg)](LICENSE-CONTENT)

A public timeline of how AI evolved, read through six lenses — with sources and quotes.

Where is AI actually going? Segno puts model releases, research, capabilities, market moves, cultural shifts and policy decisions on a single time axis. Every point has a stable link and a citable source.

Site: [segno.app](https://segno.app) · A [Relatronica](https://relatronica.com) project

## Pages

| Route | What it does |
| --- | --- |
| `/` | Home: the thesis, plus numbers read from the timeline dataset |
| `/timeline` | Interactive timeline: one axis, six lenses (models, research, capabilities, business, culture, policy) |
| `/segnala` | Errors, missing sources, contributions |
| `/chi-siamo` | Project identity, method, independence and licensing |
| `/redazione` | Candidate queue (protected, not indexed) |

Italian and English switch from the navbar.

## Data

The curated timeline lives in `lib/data/trasparenza.ts`:

- one unified theme, "AI evolution" (`unifiedTheme` in [lib/data/trasparenza.ts](lib/data/trasparenza.ts))
- six lenses in reading order — models, research, capabilities, business, culture, policy
- actors, people and events, each with a mandatory `sourceUrl`
- `getHomeSnapshot()` counts events, actors, the year range and unique sources — used by the homepage and the Open Graph image

Numbers on the homepage are not copy: add an event and they update by themselves.

## Editorial pipeline

`lib/pipeline/` discovers statements from RSS feeds on allowlisted hosts (`lib/pipeline/sources.ts`).

Two streams:

- **Automatic signals.** A headline naming a tracked person becomes an entry in the automatic log. It has no quote, so it carries no tone and stays out of the tone curve: the tone of a headline is not the position of the person it names. Editors can hide the item or promote it into the queue.
- **Editorial queue.** Other candidates stay `pending`. Publishing requires a quote: only that quote becomes a point on the curve.

The workflow `.github/workflows/pipeline-discover.yml` calls `POST /api/pipeline/discover` once a day (06:30 UTC). The scan collects headlines that name tracked people; the tone tag stays a suggestion shown in the newsroom, never applied automatically to log entries.

- Store: Netlify Blobs in production, `.data/pipeline-store.json` locally (`candidates` and `signals`)
- UI: `/redazione` behind `PIPELINE_SECRET`
- The timeline merges curated events, published pins and automatic signals

## Development

```bash
npm install
npm run dev
```

Other scripts: `npm run lint`, `npm run type-check`, `npm run build`.

### Environment variables

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URLs, sitemap, Open Graph (defaults to `https://segno.app`) |
| `RESEND_API_KEY` | `/segnala` form |
| `CONTACT_TO_EMAIL` | Where reports are delivered |
| `CONTACT_FROM_EMAIL` | Resend sender |
| `PIPELINE_SECRET` | Newsroom auth and `/api/pipeline/*` |

## SEO

- Metadata and copy in `lib/seo.ts`
- `app/opengraph-image.tsx` renders the 1200×630 card with the timeline numbers
- `app/sitemap.ts` and `app/robots.ts` (newsroom and `/api/` are excluded)
- JSON-LD: `WebSite` + `Organization` in the layout, `Dataset` on the homepage

For a domain other than segno.app, set `NEXT_PUBLIC_SITE_URL`.

## License

This repository ships code and content under two different licenses.

| What | Where | License |
| --- | --- | --- |
| Code | `app/`, `components/`, `lib/pipeline/`, `lib/trasparenza/`, `store/` | [AGPL-3.0-or-later](LICENSE) |
| Data and text | `lib/data/`, `lib/i18n/`, `lib/seo.ts`, `public/` | [CC BY 4.0](LICENSE-CONTENT) |

**Code.** Anyone who puts a modified version of Segno online must publish its source: that is the network clause of the AGPL (§13), and it is why the license is this one and not a permissive one. The repository link is in the footer and in the "Open code and data" section of `/chi-siamo`.

**Data.** Newsrooms, researchers and public bodies can reuse events, quotes and tone analysis even in commercial settings, with no copyleft obligation: just credit the project, link the source of each data point, and cite the license. Quotes remain the property of whoever said them.

Edge cases and details in [LICENSE-CONTENT](LICENSE-CONTENT). To contribute, see [CONTRIBUTING.md](CONTRIBUTING.md); for security issues, [SECURITY.md](SECURITY.md).

## Stack

Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, Framer Motion, Zustand, Resend, Netlify Blobs.
