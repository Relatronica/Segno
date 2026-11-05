export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://segno.app';
export const SITE_NAME = 'Segno';
export const SITE_TAGLINE = 'Il tono pubblico sull’IA, con fonti';
export const SITE_TITLE = `${SITE_NAME} — ${SITE_TAGLINE}`;
export const SITE_DESCRIPTION =
  'Segno mette una riga per soggetto: le dichiarazioni dei leader sull’IA nel tempo, con citazione e fonte, e sullo stesso asse le regole europee.';

/** Public repository and license tags shown in the UI (AGPL section 13). */
export const SOURCE_URL = 'https://github.com/Relatronica/Segno';
export const CODE_LICENSE = 'AGPL-3.0';
export const CONTENT_LICENSE = 'CC BY 4.0';

export const SITE_KEYWORDS = [
  'sentiment IA',
  'dichiarazioni CEO',
  'tono sull’intelligenza artificiale',
  'Altman',
  'Amodei',
  'timeline',
  'trasparenza',
  'AI Act',
  'lobbying',
  'big tech',
  'fonti citabili',
  'diritti digitali',
  'entusiasmo',
  'timore',
];

/** Internal paths for the timeline hub and its permalinks. */
export const paths = {
  chiSiamo: '/chi-siamo',
  timeline: '/timeline',
  lab: '/lab',
  /** Any timeline in the registry, addressed by slug. */
  timelineBySlug: (slug: string) => `/t/${encodeURIComponent(slug)}`,
  timelineEvento: (id: string) => `/timeline/evento/${encodeURIComponent(id)}`,
  timelinePersona: (id: string) => `/timeline/persona/${encodeURIComponent(id)}`,
  timelineTema: (slug: string) => `/timeline/tema/${encodeURIComponent(slug)}`,
} as const;

export const pages = {
  chiSiamo: {
    title: 'Chi siamo',
    description:
      'Segno è un progetto indipendente di Relatronica: perché lo facciamo, chi c’è dietro, come ci finanziamo e quali limiti ha il metodo.',
  },
  timeline: {
    title: 'Timeline',
    description:
      'Una riga per soggetto: dichiarazioni con citazione, incontri, spese e passaggi legislativi UE sullo stesso asse temporale. Sempre con fonte.',
  },
  segnala: {
    title: 'Segnala',
    description:
      'Segnala un errore, una fonte mancante o proponi un contributo alla timeline di Segno.',
  },
  lab: {
    title: 'Lab',
    description:
      'Le timeline di Segno: quella dell’IA e le altre in lavorazione. Stesso motore, assi diversi.',
  },
} as const;
