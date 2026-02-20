export type GlossaryTerm = {
  id: string;
  term: { it: string; en: string };
  definition: { it: string; en: string };
  category: string;
};

export const glossaryTerms: GlossaryTerm[] = [
  {
    id: '1',
    term: { it: 'Sovranità digitale', en: 'Digital sovereignty' },
    definition: {
      it: 'Il diritto e la capacità di individui, comunità e stati di controllare i propri dati, la propria infrastruttura tecnologica e le proprie scelte digitali.',
      en: 'The right and ability of individuals, communities and states to control their own data, technological infrastructure and digital choices.',
    },
    category: 'concetti',
  },
  {
    id: '2',
    term: { it: 'GDPR', en: 'GDPR' },
    definition: {
      it: 'General Data Protection Regulation. Il regolamento europeo sulla protezione dei dati personali, in vigore dal 2018. Stabilisce i diritti dei cittadini e gli obblighi delle organizzazioni nel trattamento dei dati.',
      en: 'General Data Protection Regulation. The European regulation on personal data protection, in force since 2018. It establishes citizens\' rights and organizations\' obligations in data processing.',
    },
    category: 'normativa',
  },
  {
    id: '3',
    term: { it: 'AI Act', en: 'AI Act' },
    definition: {
      it: 'Il regolamento europeo sull\'intelligenza artificiale. Classifica i sistemi AI per livello di rischio e stabilisce regole per il loro sviluppo e utilizzo.',
      en: 'The European regulation on artificial intelligence. It classifies AI systems by risk level and establishes rules for their development and use.',
    },
    category: 'normativa',
  },
  {
    id: '4',
    term: { it: 'Crittografia end-to-end', en: 'End-to-end encryption' },
    definition: {
      it: 'Sistema di comunicazione in cui solo le persone coinvolte possono leggere i messaggi. Nemmeno il fornitore del servizio può accedere al contenuto.',
      en: 'A communication system where only the people involved can read the messages. Not even the service provider can access the content.',
    },
    category: 'sicurezza',
  },
  {
    id: '5',
    term: { it: 'Open source', en: 'Open source' },
    definition: {
      it: 'Software il cui codice sorgente è pubblicamente disponibile, modificabile e redistribuibile. Favorisce la trasparenza, la sicurezza e l\'indipendenza tecnologica.',
      en: 'Software whose source code is publicly available, modifiable and redistributable. It promotes transparency, security and technological independence.',
    },
    category: 'tecnologia',
  },
  {
    id: '6',
    term: { it: 'Profilazione', en: 'Profiling' },
    definition: {
      it: 'Qualsiasi forma di trattamento automatizzato di dati personali per valutare aspetti della personalità, comportamento, interessi o movimenti di una persona.',
      en: 'Any form of automated processing of personal data to evaluate aspects of a person\'s personality, behavior, interests or movements.',
    },
    category: 'privacy',
  },
  {
    id: '7',
    term: { it: 'Consenso informato', en: 'Informed consent' },
    definition: {
      it: 'Un\'espressione di volontà libera, specifica, informata e inequivocabile con cui l\'interessato accetta il trattamento dei propri dati personali.',
      en: 'A freely given, specific, informed and unambiguous expression of will by which the data subject accepts the processing of their personal data.',
    },
    category: 'normativa',
  },
  {
    id: '8',
    term: { it: 'Diritto all\'oblio', en: 'Right to be forgotten' },
    definition: {
      it: 'Il diritto di ottenere la cancellazione dei propri dati personali quando non sono più necessari, quando si revoca il consenso o quando il trattamento è illecito.',
      en: 'The right to have your personal data deleted when it is no longer necessary, when consent is withdrawn or when processing is unlawful.',
    },
    category: 'diritti',
  },
  {
    id: '9',
    term: { it: 'Portabilità dei dati', en: 'Data portability' },
    definition: {
      it: 'Il diritto di ricevere i propri dati personali in un formato strutturato e di trasferirli a un altro fornitore di servizi senza impedimenti.',
      en: 'The right to receive your personal data in a structured format and to transfer it to another service provider without hindrance.',
    },
    category: 'diritti',
  },
  {
    id: '10',
    term: { it: 'Bias algoritmico', en: 'Algorithmic bias' },
    definition: {
      it: 'Errori sistematici nei risultati di un algoritmo che creano risultati ingiusti, come discriminazioni basate su genere, etnia o condizione socioeconomica.',
      en: 'Systematic errors in an algorithm\'s results that create unfair outcomes, such as discrimination based on gender, ethnicity or socioeconomic status.',
    },
    category: 'AI',
  },
  {
    id: '11',
    term: { it: 'VPN', en: 'VPN' },
    definition: {
      it: 'Virtual Private Network. Una rete privata virtuale che cripta la connessione internet e nasconde l\'indirizzo IP, proteggendo la navigazione da occhi indiscreti.',
      en: 'Virtual Private Network. A virtual private network that encrypts the internet connection and hides the IP address, protecting browsing from prying eyes.',
    },
    category: 'strumenti',
  },
  {
    id: '12',
    term: { it: 'Capitalismo della sorveglianza', en: 'Surveillance capitalism' },
    definition: {
      it: 'Modello economico basato sulla raccolta e monetizzazione massiva di dati personali e comportamentali degli utenti, teorizzato da Shoshana Zuboff.',
      en: 'Economic model based on the massive collection and monetization of users\' personal and behavioral data, theorized by Shoshana Zuboff.',
    },
    category: 'concetti',
  },
];
