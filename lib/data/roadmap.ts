export type PhaseStatus = 'done' | 'active' | 'next';

export type RoadmapPhase = {
  id: string;
  status: PhaseStatus;
  title: { it: string; en: string };
  description: { it: string; en: string };
};

export const roadmapPhases: RoadmapPhase[] = [
  {
    id: 'ai-act',
    status: 'done',
    title: {
      it: 'Timeline AI Act',
      en: 'AI Act timeline',
    },
    description: {
      it: 'Lobbying, spese LobbyFacts, dichiarazioni, passaggi legislativi e sanzioni — ogni pin con fonte e link.',
      en: 'Lobbying, LobbyFacts spend, statements, legislative steps and sanctions — every pin with source and link.',
    },
  },
  {
    id: 'sentiment',
    status: 'done',
    title: {
      it: 'Tema Sentiment IA',
      en: 'AI Sentiment theme',
    },
    description: {
      it: 'Dichiarazioni dei leader big tech 2022–oggi, tag editoriali e curva timore↔entusiasmo sullo stesso canvas.',
      en: 'Big-tech leader statements 2022–today, editorial tags and a fear↔enthusiasm curve on the same canvas.',
    },
  },
  {
    id: 'sources',
    status: 'active',
    title: {
      it: 'Precisione delle fonti',
      en: 'Source precision',
    },
    description: {
      it: 'Solo eventi citabili: istituzionali, LobbyFacts, FOI e reporting verificabile. Niente pin “illustrativi”.',
      en: 'Citable events only: institutional, LobbyFacts, FOI and verifiable reporting. No “illustrative” pins.',
    },
  },
  {
    id: 'digest',
    status: 'active',
    title: {
      it: 'Digest per attivisti e redazioni',
      en: 'Digest for activists & newsrooms',
    },
    description: {
      it: 'Storie periodiche in italiano che sintetizzano i movimenti più rilevanti — da condividere, non da archiviare.',
      en: 'Periodic Italian stories that surface the most relevant moves — meant to share, not to archive.',
    },
  },
  {
    id: 'dsa-dma',
    status: 'next',
    title: {
      it: 'Nuovi temi: DSA e DMA',
      en: 'Next themes: DSA & DMA',
    },
    description: {
      it: 'Stessa timeline, pin diversi — Digital Services Act e Digital Markets Act come lenti successive.',
      en: 'Same timeline, different pins — Digital Services Act and Digital Markets Act as the next lenses.',
    },
  },
  {
    id: 'gdpr',
    status: 'next',
    title: {
      it: 'Nodi chiave del GDPR',
      en: 'Key GDPR moments',
    },
    description: {
      it: 'I passaggi e le pressioni che hanno segnato privacy UE: enforcement, riforme, lobbying.',
      en: 'The steps and pressures that shaped EU privacy: enforcement, reforms, lobbying.',
    },
  },
];
