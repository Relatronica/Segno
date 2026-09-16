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
      it: 'Timeline: regole sull’IA',
      en: 'Timeline: AI rules',
    },
    description: {
      it: 'Incontri, spese dichiarate, dichiarazioni, passaggi legislativi e sanzioni — ogni punto con fonte e link.',
      en: 'Meetings, declared spend, statements, legislative steps and sanctions — every pin with source and link.',
    },
  },
  {
    id: 'sentiment',
    status: 'done',
    title: {
      it: 'Lente: tono dei leader sull’IA',
      en: 'Lens: leaders’ tone on AI',
    },
    description: {
      it: 'Dichiarazioni pubbliche 2022–oggi, tag di lettura e curva timore↔entusiasmo sullo stesso asse.',
      en: 'Public statements 2022–today, editorial tags and a fear↔enthusiasm curve on the same axis.',
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
      it: 'Sintesi periodiche in italiano sui movimenti più rilevanti — da condividere, non da archiviare.',
      en: 'Periodic Italian digests of the most relevant moves — meant to share, not to archive.',
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
