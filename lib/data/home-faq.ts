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
      it: 'Segno mette la storia dell’IA su un’unica timeline, letta per lenti: modelli, ricerca, mercato, cultura e politica, dal 2013 a oggi. Ogni segno è un dato con la sua fonte — un comunicato, un registro pubblico, un documento. Il sentiment è una delle letture.',
      en: 'Segno puts the story of AI on a single timeline, read by lens: models, research, business, culture and policy, from 2013 to today. Every mark is a datum with its source — a press release, a public register, a document. Sentiment is one of the readings.',
    },
  },
  {
    id: 'themes',
    question: {
      it: 'Cosa sono le “lenti” nella timeline?',
      en: 'What are timeline “lenses”?',
    },
    answer: {
      it: 'Sono i cinque modi di leggere la stessa timeline: ogni riga è una lente — modelli, ricerca, mercato, cultura, politica. Puoi mostrarle tutte o isolarne una sola, e filtrare per tipo, azienda, persona e anno dalla sidebar. Ogni segno apre il dato e la sua fonte.',
      en: 'They are the five ways to read the same timeline: each row is a lens — models, research, business, culture, policy. Show them all or isolate a single one, and filter by type, company, person and year in the sidebar. Every mark opens the datum and its source.',
    },
  },
  {
    id: 'sentiment',
    question: {
      it: 'Il “sentiment” è un punteggio oggettivo?',
      en: 'Is “sentiment” an objective score?',
    },
    answer: {
      it: 'No. È una lettura editoriale delle citazioni verificate, non un punteggio scientifico. Nell’interfaccia compare come una banda sopra la corsia Cultura e mostra come oscilla il tono nel tempo, con la fonte a un click.',
      en: 'No. It is an editorial reading of verified quotes, not a scientific score. In the interface it appears as a band above the Culture lane and shows how the tone swings over time, with the source one click away.',
    },
  },
  {
    id: 'causation',
    question: {
      it: 'Dimostrate che c’è un legame di causa tra gli eventi?',
      en: 'Do you prove a causal link between the events?',
    },
    answer: {
      it: 'No — e lo diciamo chiaramente. Mettiamo sullo stesso asse fatti verificabili, in ordine cronologico. La vicinanza nel tempo ti aiuta a leggere un rilascio accanto al paper che gli ha aperto la strada o alla regola che ne è seguita; non è prova di causalità.',
      en: 'No — and we say so clearly. We place verifiable facts on one axis, in chronological order. Temporal proximity helps you read a release next to the paper that paved its way or the rule that followed it; it is not proof of causation.',
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
      it: 'Condividi la timeline e le fonti. Usa la pagina Segnala per errori o pezzi mancanti. Sostieni Relatronica. Se sei una redazione o un’associazione, scrivici: i dati devono circolare.',
      en: 'Share the timeline and the sources. Use the Report page for errors or missing pieces. Support Relatronica. If you are a newsroom or an organisation, write to us: the data should circulate.',
    },
  },
];
