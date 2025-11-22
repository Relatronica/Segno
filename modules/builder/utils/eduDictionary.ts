export type EduTerm = {
  key: string;
  title: string;
  simpleDefinition: string; // Spiegazione "per la nonna"
  legalContext?: string; // Riferimento normativo soft
  example: string;
};

export const EDU_DICTIONARY: Record<string, EduTerm> = {
  // --- AI CONCEPTS ---
  'Chatbot LLM': {
    key: 'llm',
    title: 'Large Language Model (LLM)',
    simpleDefinition: 'Un modello AI addestrato su enormi quantità di testo per generare risposte simili a quelle umane. Immaginalo come un pappagallo super-intelligente che ha letto tutta internet.',
    legalContext: 'AI Act Art. 50: Gli utenti devono sapere che stanno parlando con una macchina.',
    example: 'ChatGPT, Claude, Gemini.'
  },
  'RAG / Embedding': {
    key: 'rag',
    title: 'RAG (Retrieval Augmented Generation)',
    simpleDefinition: 'Una tecnica per dare "memoria" all\'AI. Invece di inventare, il modello cerca prima la risposta nei tuoi documenti aziendali e poi te la riassume.',
    example: 'Un chatbot che risponde solo basandosi sui tuoi manuali PDF.'
  },
  'Analisi Biometrica': {
    key: 'biometrics',
    title: 'Biometria',
    simpleDefinition: 'Tecnologia che misura caratteristiche fisiche uniche (faccia, impronta, voce) per riconoscere le persone.',
    legalContext: 'GDPR Art. 9 & AI Act: È considerata "Alto Rischio" perché i dati biometrici non si possono cambiare (non sono come una password).',
    example: 'FaceID o riconoscimento facciale nelle telecamere.'
  },
  'Vector Database': {
    key: 'vectordb',
    title: 'Database Vettoriale',
    simpleDefinition: 'Un archivio speciale dove i testi/immagini sono salvati come numeri (vettori) per permettere all\'AI di capire i concetti e le somiglianze semantiche.',
    example: 'Serve per far funzionare la ricerca semantica ("trova documenti che parlano di vacanze" anche se non c\'è la parola "vacanza").'
  },

  // --- INFRASTRUCTURE ---
  'Cloud Server (USA)': {
    key: 'cloud-usa',
    title: 'Hosting Extra-UE (USA)',
    simpleDefinition: 'I server dove risiedono i dati si trovano fisicamente negli Stati Uniti.',
    legalContext: 'Caso Schrems II: Le leggi USA permettono alla sorveglianza statale di accedere ai dati, cosa che viola i diritti fondamentali europei.',
    example: 'Server AWS in Virginia, Google Cloud in Iowa.'
  },
  'On-Premise': {
    key: 'on-prem',
    title: 'On-Premise (Locale)',
    simpleDefinition: 'Il software gira sui computer fisici della tua azienda, non su internet. È come tenere i soldi sotto il materasso invece che in banca (massimo controllo).',
    example: 'Un server installato nel sottoscala dell\'ufficio.'
  },

  // --- LEGAL & OUTPUT ---
  'Decisione Automatica': {
    key: 'auto-decision',
    title: 'Decision making automatizzato',
    simpleDefinition: 'Quando è l\'algoritmo a scegliere (Sì/No) senza che un umano controlli prima.',
    legalContext: 'GDPR Art. 22: Hai diritto a non subire decisioni automatiche che impattano la tua vita (es. rifiuto mutuo).',
    example: 'Un sistema che scarta automaticamente i CV senza che un recruiter li legga.'
  },
  'Human in the Loop': {
    key: 'hitl',
    title: 'Human in the Loop (Supervisione)',
    simpleDefinition: 'L\'AI propone, ma è l\'umano a disporre. C\'è sempre una persona che controlla e conferma l\'output prima che diventi definitivo.',
    example: 'L\'AI scrive la bozza della mail, ma sei tu a cliccare "Invia".'
  }
};

