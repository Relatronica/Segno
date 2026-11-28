export type PhaseStatus = 'done' | 'active' | 'next';

export type RoadmapPhase = {
  id: string;
  status: PhaseStatus;
  title: { it: string; en: string };
  description: { it: string; en: string };
};

export const roadmapPhases: RoadmapPhase[] = [
  {
    id: 'timeline',
    status: 'done',
    title: {
      it: 'Timeline IA: l’evoluzione per lenti',
      en: 'AI timeline: evolution by lens',
    },
    description: {
      it: 'Dal 2013 a oggi: modelli, capacità, ricerca, mercato, cultura e politica su un solo asse. Ogni punto con la sua fonte.',
      en: 'From 2013 to today: lab releases, research, business, culture and policy on one axis. Every point with its source.',
    },
  },
  {
    id: 'multi-timeline',
    status: 'done',
    title: {
      it: 'Timeline multitema',
      en: 'Multi-domain timelines',
    },
    description: {
      it: 'IA, cybersicurezza e data center condividono lo stesso motore con ontologie, corsie e fonti dedicate a ogni dominio.',
      en: 'AI, cybersecurity and data centres share the same engine with ontologies, lanes and sources dedicated to each domain.',
    },
  },
  {
    id: 'sentiment',
    status: 'done',
    title: {
      it: 'Banda del sentiment',
      en: 'Sentiment band',
    },
    description: {
      it: 'Sopra la corsia Cultura, il tono delle citazioni verificate: entusiasmo e timore misurati nel tempo, con la fonte a un click.',
      en: 'Above the Culture lane, the tone of verified quotes: enthusiasm and fear measured over time, with the source one click away.',
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
      it: 'Sintesi periodiche in italiano sui passaggi più rilevanti dell’evoluzione dell’IA — da condividere, non da archiviare.',
      en: 'Periodic Italian digests of the most relevant steps in AI’s evolution — meant to share, not to archive.',
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
      it: 'Nuovi domini e nuove letture',
      en: 'New domains and reading axes',
    },
    description: {
      it: 'Il motore è pronto per nuovi sistemi complessi: energia, privacy, mercati, piattaforme e policy con assi e fonti proprie.',
      en: 'The engine is ready for more complex systems: energy, privacy, markets, platforms and policy, each with dedicated axes and sources.',
    },
  },
];
