export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://segno.app';
export const SITE_NAME = 'Segno';
export const SITE_TAGLINE = 'Chi influenza le regole digitali in Europa';
export const SITE_TITLE = `${SITE_NAME} — ${SITE_TAGLINE}`;
export const SITE_DESCRIPTION =
  'Timeline di trasparenza sul lobbying e le regole digitali in Europa: incontri, spese dichiarate, dichiarazioni e decisioni — ogni punto con fonte citabile.';

export const SITE_KEYWORDS = [
  'trasparenza',
  'lobbying',
  'AI Act',
  'intelligenza artificiale',
  'timeline',
  'DSA',
  'DMA',
  'GDPR',
  'big tech',
  'Registro trasparenza UE',
  'diritti digitali',
  'sovranità digitale',
  'dichiarazioni CEO',
];

export const pages = {
  trasparenza: {
    title: 'Timeline',
    description:
      'Lobbying sull’AI Act e tono dei leader sull’IA: incontri, spese, dichiarazioni e passaggi legislativi sulla stessa timeline, con fonti e citazioni.',
  },
  segnala: {
    title: 'Segnala',
    description:
      'Segnala un errore, una fonte mancante o proponi un contributo alla timeline di Segno.',
  },
} as const;
