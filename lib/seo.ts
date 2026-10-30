export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://segno.app';
export const SITE_NAME = 'Segno';
export const SITE_TAGLINE = 'Il tono pubblico sull’IA, con fonti';
export const SITE_TITLE = `${SITE_NAME} — ${SITE_TAGLINE}`;
export const SITE_DESCRIPTION =
  'Segno mette una riga per soggetto: le dichiarazioni dei leader sull’IA nel tempo, con citazione e fonte, e sullo stesso asse le regole europee.';

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

/** Internal paths for the transparency hub and its permalinks. */
export const paths = {
  trasparenza: '/trasparenza',
  trasparenzaEvento: (id: string) => `/trasparenza/evento/${encodeURIComponent(id)}`,
  trasparenzaPersona: (id: string) => `/trasparenza/persona/${encodeURIComponent(id)}`,
  trasparenzaTema: (slug: string) => `/trasparenza/tema/${encodeURIComponent(slug)}`,
} as const;

export const pages = {
  trasparenza: {
    title: 'Sentiment',
    description:
      'Una riga per soggetto: dichiarazioni con citazione, incontri, spese e passaggi legislativi UE sullo stesso asse temporale. Sempre con fonte.',
  },
  segnala: {
    title: 'Segnala',
    description:
      'Segnala un errore, una fonte mancante o proponi un contributo alla timeline di Segno.',
  },
} as const;
