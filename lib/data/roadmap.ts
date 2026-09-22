export type PhaseStatus = 'done' | 'active' | 'next';

export type RoadmapPhase = {
  id: string;
  status: PhaseStatus;
  title: { it: string; en: string };
  description: { it: string; en: string };
};

export const roadmapPhases: RoadmapPhase[] = [
  {
    id: 'sentiment',
    status: 'done',
    title: {
      it: 'Sentiment: tono dei leader sull’IA',
      en: 'Sentiment: leaders’ tone on AI',
    },
      description: {
      it: 'Dichiarazioni pubbliche dal 2021 a oggi, filtri per persona, citazione e fonte — con curva entusiasmo↔timore sullo stesso asse.',
      en: 'Public statements from 2021 to today, filters by person, quote and source — with an enthusiasm↔fear curve on the same axis.',
    },
  },
  {
    id: 'ai-act',
    status: 'done',
    title: {
      it: 'Timeline: regole sull’IA in Europa',
      en: 'Timeline: AI rules in Europe',
    },
    description: {
      it: 'Incontri, spese dichiarate, passaggi legislativi e sanzioni — ogni punto con fonte e link.',
      en: 'Meetings, declared spend, legislative steps and sanctions — every pin with source and link.',
    },
  },
  {
    id: 'sources',
    status: 'active',
    title: {
      it: 'Fonti più precise',
      en: 'More precise sources',
    },
    description: {
      it: 'Solo eventi citabili: istituzionali, registri pubblici, accesso agli atti e reporting verificabile. Niente punti “di illustrazione”.',
      en: 'Citable events only: institutional, public registers, FOI and verifiable reporting. No “illustrative” pins.',
    },
  },
  {
    id: 'digest',
    status: 'active',
    title: {
      it: 'Racconti per cittadini e redazioni',
      en: 'Stories for citizens & newsrooms',
    },
    description: {
      it: 'Sintesi periodiche in italiano sui movimenti di tono più rilevanti — da condividere, non da archiviare.',
      en: 'Periodic Italian digests of the most relevant tone shifts — meant to share, not to archive.',
    },
  },
  {
    id: 'dsa-dma',
    status: 'next',
    title: {
      it: 'Nuove lenti: piattaforme e mercati',
      en: 'Next lenses: platforms & markets',
    },
    description: {
      it: 'Stessa timeline, altri pin — le norme europee su servizi digitali e mercati digitali come prossime letture.',
      en: 'Same timeline, different pins — Europe’s digital services and markets rules as the next readings.',
    },
  },
  {
    id: 'gdpr',
    status: 'next',
    title: {
      it: 'Nodi chiave della privacy UE',
      en: 'Key moments in EU privacy',
    },
    description: {
      it: 'I passaggi e le pressioni che hanno segnato le regole sulla privacy: enforcement, riforme, lobbying.',
      en: 'The steps and pressures that shaped privacy rules: enforcement, reforms, lobbying.',
    },
  },
];
