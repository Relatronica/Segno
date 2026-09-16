export type FaqItem = {
  id: string;
  question: { it: string; en: string };
  answer: { it: string; en: string };
};

export const homeFaqs: FaqItem[] = [
  {
    id: 'what',
    question: {
      it: 'Cos’è Segno?',
      en: 'What is Segno?',
    },
    answer: {
      it: 'Uno strumento di trasparenza attivista: rende leggibile — con fonti e citazioni — il lobbying e le narrazioni pubbliche delle big tech intorno alle leggi digitali europee. Una timeline, più temi (AI Act, Sentiment IA; poi DSA, DMA, GDPR).',
      en: 'An activist transparency tool: it makes Big Tech lobbying and public narratives around EU digital laws readable — with sources and quotes. One timeline, multiple themes (AI Act, AI Sentiment; then DSA, DMA, GDPR).',
    },
  },
  {
    id: 'themes',
    question: {
      it: 'Cosa sono i “temi” nella timeline?',
      en: 'What are timeline “themes”?',
    },
    answer: {
      it: 'Lenti sullo stesso canvas. AI Act mostra pressione normativa (incontri, spese, leggi, sanzioni). Sentiment IA mostra come cambia il tono dei leader (allarme, cautela, ottimismo…) con una curva editoriale. Cambi tema dalla sidebar: i pin si aggiornano.',
      en: 'Lenses on the same canvas. AI Act shows regulatory pressure (meetings, spend, laws, sanctions). AI Sentiment shows how leaders’ tone shifts (alarm, caution, optimism…) with an editorial curve. Switch themes in the sidebar: the pins update.',
    },
  },
  {
    id: 'causation',
    question: {
      it: 'Dimostrate che il lobbying ha cambiato le leggi?',
      en: 'Do you prove that lobbying changed the laws?',
    },
    answer: {
      it: 'No — e lo diciamo chiaramente. Mettiamo sullo stesso asse fatti verificabili. La vicinanza nel tempo aiuta a leggere le pressioni; non è prova di causalità.',
      en: 'No — and we say so clearly. We place verifiable facts on one axis. Temporal proximity helps you read pressure; it is not proof of causation.',
    },
  },
  {
    id: 'sources',
    question: {
      it: 'Quanto sono solide le fonti?',
      en: 'How solid are the sources?',
    },
    answer: {
      it: 'Ogni evento ha un link stabile. Preferiamo fonti istituzionali, LobbyFacts/Registro, documenti FOI e reporting citabile. Le dichiarazioni includono una citazione verificabile. I tag di sentiment sono una lettura editoriale, non un punteggio “scientifico”.',
      en: 'Every event has a stable link. We prefer institutional sources, LobbyFacts/Register, FOI documents and citable reporting. Statements include a verifiable quote. Sentiment tags are an editorial reading, not a “scientific” score.',
    },
  },
  {
    id: 'funding',
    question: {
      it: 'Come vi finanziate?',
      en: 'How are you funded?',
    },
    answer: {
      it: 'Donazioni, grant di fondazioni per i diritti digitali e, in prospettiva, licenza dei dati a redazioni. Nessuna pubblicità basata sul tracciamento.',
      en: 'Donations, grants from digital-rights foundations and, ahead, data licensing to newsrooms. No tracking-based advertising.',
    },
  },
  {
    id: 'contribute',
    question: {
      it: 'Come posso contribuire?',
      en: 'How can I contribute?',
    },
    answer: {
      it: 'Condividi la timeline. Segnala errori o fonti mancanti. Sostieni Relatronica. Se sei una redazione o un collettivo, scrivici: i dati devono circolare.',
      en: 'Share the timeline. Flag errors or missing sources. Support Relatronica. If you are a newsroom or a collective, write to us: the data should circulate.',
    },
  },
];
