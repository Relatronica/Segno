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
      it: 'Uno strumento per capire chi influenza le regole digitali in Europa. Mette su una timeline — con fonti e citazioni — incontri, spese dichiarate, dichiarazioni pubbliche e decisioni legislative. Puoi cambiare lente (regole sull’IA, tono dei leader, e in seguito altre norme).',
      en: 'A tool to understand who influences digital rules in Europe. It places meetings, declared spend, public statements and legislative decisions on one timeline — with sources and quotes. You can switch lenses (AI rules, leaders’ tone, and later other norms).',
    },
  },
  {
    id: 'themes',
    question: {
      it: 'Cosa sono le “lenti” nella timeline?',
      en: 'What are timeline “lenses”?',
    },
    answer: {
      it: 'Modi diversi di guardare la stessa storia. Una lente mostra la pressione sulle regole europee sull’IA (incontri, spese, voti, sanzioni). Un’altra mostra come cambia il tono dei leader del settore (allarme, cautela, ottimismo…). Le cambi dalla barra laterale: i punti sulla timeline si aggiornano.',
      en: 'Different ways to look at the same story. One lens shows pressure on Europe’s AI rules (meetings, spend, votes, sanctions). Another shows how industry leaders’ tone shifts (alarm, caution, optimism…). Switch them in the sidebar: the pins update.',
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
      it: 'Da dove vengono le informazioni?',
      en: 'Where does the information come from?',
    },
    answer: {
      it: 'Ogni punto ha un link stabile. Preferiamo fonti istituzionali, registri pubblici di trasparenza, documenti ottenuti con accesso agli atti e giornalismo citabile. Le dichiarazioni includono una citazione verificabile. I tag sul “tono” sono una lettura editoriale, non un punteggio scientifico.',
      en: 'Every pin has a stable link. We prefer institutional sources, public transparency registers, freedom-of-information documents and citable journalism. Statements include a verifiable quote. Tone tags are an editorial reading, not a scientific score.',
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
      it: 'Condividi la timeline. Usa la pagina Segnala per errori o fonti mancanti. Sostieni Relatronica. Se sei una redazione o un’associazione, scrivici: i dati devono circolare.',
      en: 'Share the timeline. Use the Report page for errors or missing sources. Support Relatronica. If you are a newsroom or an organisation, write to us: the data should circulate.',
    },
  },
];
