export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://segno.app';
export const SITE_NAME = 'Segno';
export const SITE_TAGLINE = 'Il tono pubblico sull’IA, con fonti';
export const SITE_TITLE = `${SITE_NAME} — ${SITE_TAGLINE}`;
export const SITE_DESCRIPTION =
  'Segno segue entusiasmo e timore nelle dichiarazioni dei leader sull’IA — e sullo stesso asse le regole europee. Una timeline con citazioni e fonti.';

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

export const pages = {
  trasparenza: {
    title: 'Sentiment',
    description:
      'Curva entusiasmo↔timore dalle dichiarazioni pubbliche, più incontri, spese e passaggi legislativi UE sullo stesso asse. Sempre con fonte.',
  },
  segnala: {
    title: 'Segnala',
    description:
      'Segnala un errore, una fonte mancante o proponi un contributo alla timeline di Segno.',
  },
} as const;
