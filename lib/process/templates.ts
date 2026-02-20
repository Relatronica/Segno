import type { ProcessTemplate } from '@/store/useProcessStore';

export interface TemplateDefinition {
  id: ProcessTemplate;
  icon: string;
  title: { it: string; en: string };
  description: { it: string; en: string };
  color: string;
  defaultQuestions: { it: string; en: string }[];
}

export const processTemplates: TemplateDefinition[] = [
  {
    id: 'data_collection',
    icon: 'Database',
    title: {
      it: 'Raccolta dati utente',
      en: 'User Data Collection',
    },
    description: {
      it: 'Processi di raccolta, archiviazione e utilizzo di dati personali degli utenti.',
      en: 'Processes for collecting, storing, and using personal user data.',
    },
    color: 'from-blue-500 to-blue-600',
    defaultQuestions: [
      { it: 'Quali tipi di dati personali vengono raccolti?', en: 'What types of personal data are collected?' },
      { it: 'Qual è la base giuridica per il trattamento?', en: 'What is the legal basis for processing?' },
      { it: 'Come vengono conservati i dati e per quanto tempo?', en: 'How is data stored and for how long?' },
      { it: 'Chi ha accesso ai dati raccolti?', en: 'Who has access to the collected data?' },
      { it: 'I dati vengono condivisi con terze parti?', en: 'Is data shared with third parties?' },
      { it: 'Quali misure di sicurezza sono implementate?', en: 'What security measures are in place?' },
    ],
  },
  {
    id: 'automated_decision',
    icon: 'GitBranch',
    title: {
      it: 'Processo decisionale automatizzato',
      en: 'Automated Decision Making',
    },
    description: {
      it: 'Sistemi che prendono decisioni automatiche che impattano le persone.',
      en: 'Systems that make automatic decisions impacting people.',
    },
    color: 'from-violet-500 to-violet-600',
    defaultQuestions: [
      { it: 'Che tipo di decisioni vengono automatizzate?', en: 'What types of decisions are being automated?' },
      { it: 'Le decisioni impattano diritti o accesso a servizi?', en: 'Do decisions impact rights or access to services?' },
      { it: 'Esiste un meccanismo di revisione umana?', en: 'Is there a human review mechanism?' },
      { it: 'Come viene garantita la trasparenza del processo?', en: 'How is process transparency ensured?' },
      { it: 'Quali dati vengono utilizzati per le decisioni?', en: 'What data is used for decisions?' },
      { it: 'Come vengono gestiti eventuali bias algoritmici?', en: 'How are potential algorithmic biases handled?' },
    ],
  },
  {
    id: 'ml_pipeline',
    icon: 'Brain',
    title: {
      it: 'Pipeline ML/AI',
      en: 'ML/AI Pipeline',
    },
    description: {
      it: 'Pipeline di machine learning: dalla raccolta dati all\'addestramento al deployment.',
      en: 'Machine learning pipeline: from data collection to training to deployment.',
    },
    color: 'from-rose-500 to-rose-600',
    defaultQuestions: [
      { it: 'Da dove provengono i dati di addestramento?', en: 'Where does the training data come from?' },
      { it: 'Che tipo di modello viene utilizzato?', en: 'What type of model is being used?' },
      { it: 'Come viene validata la qualità del modello?', en: 'How is model quality validated?' },
      { it: 'Quali output produce il modello e chi li usa?', en: 'What outputs does the model produce and who uses them?' },
      { it: 'Come viene monitorato il modello in produzione?', en: 'How is the model monitored in production?' },
      { it: 'Esistono meccanismi per gestire errori o allucinazioni?', en: 'Are there mechanisms to handle errors or hallucinations?' },
    ],
  },
  {
    id: 'business_workflow',
    icon: 'Building2',
    title: {
      it: 'Workflow aziendale',
      en: 'Business Workflow',
    },
    description: {
      it: 'Processi aziendali che coinvolgono dati personali o decisioni rilevanti.',
      en: 'Business processes involving personal data or significant decisions.',
    },
    color: 'from-amber-500 to-amber-600',
    defaultQuestions: [
      { it: 'Quali sono le fasi principali del processo?', en: 'What are the main stages of the process?' },
      { it: 'Quali attori sono coinvolti nel workflow?', en: 'Which actors are involved in the workflow?' },
      { it: 'Vengono trattati dati personali in qualche fase?', en: 'Is personal data processed at any stage?' },
      { it: 'Ci sono decisioni che impattano dipendenti o clienti?', en: 'Are there decisions impacting employees or customers?' },
      { it: 'Come viene documentato il processo?', en: 'How is the process documented?' },
      { it: 'Quali strumenti digitali vengono utilizzati?', en: 'What digital tools are used?' },
    ],
  },
  {
    id: 'health_data',
    icon: 'Heart',
    title: {
      it: 'Trattamento dati sanitari',
      en: 'Health Data Processing',
    },
    description: {
      it: 'Processi che trattano dati sanitari, clinici o relativi alla salute.',
      en: 'Processes handling health, clinical, or wellness data.',
    },
    color: 'from-emerald-500 to-emerald-600',
    defaultQuestions: [
      { it: 'Che tipo di dati sanitari vengono trattati?', en: 'What type of health data is processed?' },
      { it: 'Chi sono i soggetti i cui dati vengono trattati?', en: 'Who are the data subjects?' },
      { it: 'Come viene ottenuto il consenso?', en: 'How is consent obtained?' },
      { it: 'Quali misure di sicurezza proteggono i dati?', en: 'What security measures protect the data?' },
      { it: 'I dati vengono anonimizzati o pseudonimizzati?', en: 'Is data anonymized or pseudonymized?' },
      { it: 'Ci sono trasferimenti di dati fuori dall\'UE?', en: 'Are there data transfers outside the EU?' },
    ],
  },
  {
    id: 'custom',
    icon: 'Pencil',
    title: {
      it: 'Processo libero',
      en: 'Custom Process',
    },
    description: {
      it: 'Descrivi il tuo processo e l\'IA genererà le domande appropriate.',
      en: 'Describe your process and the AI will generate appropriate questions.',
    },
    color: 'from-gray-500 to-gray-600',
    defaultQuestions: [],
  },
];
