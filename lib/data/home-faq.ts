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
      it: 'Uno strumento per seguire il tono pubblico sull’IA — e sullo stesso asse le regole europee e il lobbying. La curva unisce citazioni curate e tono automatico dei titoli; incontri, spese e voti restano contesto con fonte.',
      en: 'A tool to follow the public tone on AI — and, on the same axis, Europe’s rules and lobbying. The curve joins curated quotes and the automatic tone of headlines; meetings, spend and votes stay as sourced context.',
    },
  },
  {
    id: 'themes',
    question: {
      it: 'Cosa sono le “lenti” nella timeline?',
      en: 'What are timeline “lenses”?',
    },
    answer: {
      it: 'La curva usa le citazioni con tag di tono e, per i giorni recenti, un punto automatico ricavato dai titoli. Nella cronologia trovi anche incontri, spese e passaggi legislativi. Filtri per tipo e persona nella sidebar.',
      en: 'The curve uses tagged quotes and, for recent days, one automatic point drawn from headlines. The feed also lists meetings, spend and legislative steps. Filter by type and person in the sidebar.',
    },
  },
  {
    id: 'sentiment',
    question: {
      it: 'Il “sentiment” è un punteggio oggettivo?',
      en: 'Is “sentiment” an objective score?',
    },
    answer: {
      it: 'No. Sulle citazioni è una lettura editoriale della frase. Sui titoli recenti è una lettura automatica della copertura, con link e senza citazione. In entrambi i casi la curva mostra l’oscillazione, non una misura scientifica.',
      en: 'No. On quotes it is an editorial reading of the sentence. On recent headlines it is an automatic reading of the coverage, with a link and no quote. Either way the curve shows the swing, not a scientific measure.',
    },
  },
  {
    id: 'causation',
    question: {
      it: 'Dimostrate che il tono (o il lobbying) ha cambiato le leggi?',
      en: 'Do you prove that tone (or lobbying) changed the laws?',
    },
    answer: {
      it: 'No — e lo diciamo chiaramente. Mettiamo sullo stesso asse fatti verificabili. La vicinanza nel tempo aiuta a leggere pressioni e messaggi; non è prova di causalità.',
      en: 'No — and we say so clearly. We place verifiable facts on one axis. Temporal proximity helps you read pressure and messaging; it is not proof of causation.',
    },
  },
  {
    id: 'sources',
    question: {
      it: 'Da dove vengono le informazioni?',
      en: 'Where does the information come from?',
    },
    answer: {
      it: 'Ogni punto ha un link stabile. Preferiamo fonti istituzionali, registri pubblici, documenti con accesso agli atti e giornalismo citabile. Le dichiarazioni includono una citazione verificabile.',
      en: 'Every pin has a stable link. We prefer institutional sources, public registers, freedom-of-information documents and citable journalism. Statements include a verifiable quote.',
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
      it: 'Condividi la curva e le fonti. Usa la pagina Segnala per errori o pezzi mancanti. Sostieni Relatronica. Se sei una redazione o un’associazione, scrivici: i dati devono circolare.',
      en: 'Share the curve and the sources. Use the Report page for errors or missing pieces. Support Relatronica. If you are a newsroom or an organisation, write to us: the data should circulate.',
    },
  },
];
