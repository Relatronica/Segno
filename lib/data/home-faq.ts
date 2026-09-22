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
      it: 'Uno strumento per seguire il tono pubblico sull’IA — entusiasmo e timore nelle parole di Altman, Amodei, Musk, Huang e altri — su una timeline con citazioni e fonti. Sulla stessa mappa restano le regole europee e il lobbying, come seconda lente.',
      en: 'A tool to follow the public tone on AI — enthusiasm and fear in the words of Altman, Amodei, Musk, Huang and others — on a timeline with quotes and sources. Europe’s rules and lobbying stay on the same map, as a second lens.',
    },
  },
  {
    id: 'themes',
    question: {
      it: 'Cosa sono le “lenti” nella timeline?',
      en: 'What are timeline “lenses”?',
    },
    answer: {
      it: 'Modi diversi di guardare la stessa mappa. La lente primaria è il Sentiment: dichiarazioni pubbliche, filtri per persona, curva entusiasmo↔timore. La seconda mostra la pressione sulle regole europee sull’IA (incontri, spese, voti, sanzioni). Le cambi dalla barra laterale: i punti si aggiornano.',
      en: 'Different ways to look at the same map. The primary lens is Sentiment: public statements, filters by person, an enthusiasm↔fear curve. The second shows pressure on Europe’s AI rules (meetings, spend, votes, sanctions). Switch them in the sidebar: the pins update.',
    },
  },
  {
    id: 'sentiment',
    question: {
      it: 'Il “sentiment” è un punteggio oggettivo?',
      en: 'Is “sentiment” an objective score?',
    },
    answer: {
      it: 'No. È una lettura editoriale della citazione — allarme, cautela, ottimismo e così via. La prova resta il testo e il link alla fonte. La curva aiuta a vedere l’oscillazione nel tempo; non è una misura scientifica.',
      en: 'No. It is an editorial reading of the quote — alarm, caution, optimism, and so on. The proof remains the text and the source link. The curve helps you see the swing over time; it is not a scientific measure.',
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
