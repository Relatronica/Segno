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
      it: 'Segno costruisce timeline di sistemi complessi. Ogni dominio usa assi propri: IA, cybersicurezza e data center hanno oggi corsie diverse, ma condividono il metodo. Ogni segno è un fatto verificabile con una fonte stabile.',
      en: 'Segno builds timelines of complex systems. Each domain uses its own axes: AI, cybersecurity and data centres currently have different lanes, but share the same method. Every mark is a verifiable fact with a stable source.'
    },
  },
  {
    id: 'themes',
    question: {
      it: 'Cosa sono le “lenti” nella timeline?',
      en: 'What are timeline “lenses”?',
    },
    answer: {
      it: 'Sono gli assi di lettura di una timeline. Nell’IA sono modelli, capacità, ricerca, mercato, cultura e politica; nella cybersicurezza vulnerabilità, attacchi, attori, difese e politica; nei data center energia, rete, territorio e regolazione. Le lenti cambiano dominio, ma ogni segno resta verificabile e filtrabile.',
      en: 'They are a timeline’s reading axes. In AI they are models, capabilities, research, business, culture and policy; in cybersecurity they are vulnerabilities, attacks, actors, defence and policy; in data centres they are energy, grid, territory and regulation. Lenses change with the domain, but every mark remains verifiable and filterable.'
    },
  },
  {
    id: 'sentiment',
    question: {
      it: 'Il “sentiment” è un punteggio oggettivo?',
      en: 'Is “sentiment” an objective score?',
    },
    answer: {
      it: 'No. Dove presente, come nella timeline IA, è una lettura editoriale delle citazioni verificate, non un punteggio scientifico né una caratteristica comune a tutte le timeline. Confronta soltanto il tono registrato nel testo citato.',
      en: 'No. Where present, as in the AI timeline, it is an editorial reading of verified quotes, not a scientific score or a feature shared by every timeline. It only compares the tone recorded in the cited text.'
    },
  },
  {
    id: 'causation',
    question: {
      it: 'Dimostrate che c’è un legame di causa tra gli eventi?',
      en: 'Do you prove a causal link between the events?',
    },
    answer: {
      it: 'No — e lo diciamo chiaramente. Mettiamo sullo stesso asse fatti verificabili, in ordine cronologico. La vicinanza nel tempo aiuta a leggere eventi correlati o contrastanti; non dimostra causalità e non sostituisce l’analisi tecnica o giuridica.',
      en: 'No — and we say so clearly. We place verifiable facts on one axis, in chronological order. Temporal proximity helps readers compare related or contrasting events; it does not prove causation or replace technical or legal analysis.'
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
      it: 'Condividi le timeline e le fonti. Usa la pagina Segnala per errori o pezzi mancanti. Sostieni Relatronica. Se gestisci dati, documenti o una redazione su un nuovo dominio, scrivici: i dati devono circolare.',
      en: 'Share timelines and sources. Use the Report page for errors or missing pieces. Support Relatronica. If you manage data or documents or run a newsroom covering a new domain, write to us: the data should circulate.'
    },
  },
];
