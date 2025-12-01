/**
 * Centralized translation system for Segno
 * Provides type-safe translations for Italian and English
 */

export type Locale = 'it' | 'en';

export interface Translations {
  onboarding: {
    title: string;
    subtitle: string;
    nameLabel: string;
    namePlaceholder: string;
    modeLabel: string;
    modeUseTitle: string;
    modeUseDescription: string;
    modeDesignTitle: string;
    modeDesignDescription: string;
    avatarLabel: string;
    howItWorksTitle: string;
    howItWorksDescription: string;
    startButton: string;
  };
  common: {
    language: string;
    selectLanguage: string;
    italian: string;
    english: string;
    selected: string;
    chooseOneOrMore: string;
    selectedOf: string;
    close: string;
    of: string;
    selectedLower: string;
  };
  cityBuilder: {
    buildScenario: string;
    selectQuestion: string;
    chooseAnswer: string;
    quickGuide: string;
    howToStart: string;
    howToStartStep1: string;
    howToStartStep2: string;
    howToStartStep3: string;
    howToStartStep4: string;
    howToReadMap: string;
    howToReadMapDesc: string;
    mapLeft: string;
    mapCenter: string;
    mapRight: string;
    clickBlock: string;
    notesTip: string;
    disclaimer: string;
    disclaimerText: string;
    developedBy: string;
    showNotes: string;
    hideNotes: string;
    save: string;
    load: string;
    saveTitle: string;
    loadTitle: string;
    analyzeRisks: string;
    news: string;
    guideTitle: string;
    invalidFile: string;
    invalidFileDesc: string;
    confirmLoad: string;
    loadSuccess: string;
    loadError: string;
    saveError: string;
  };
  analysis: {
    title: string;
    reportFor: string;
    editScenario: string;
    exportPdf: string;
    riskIndex: string;
    level: string;
    analyzedElements: string;
    connections: string;
    analyzedBlocks: string;
    violationsDetected: string;
    noViolations: string;
    mitigationsImplemented: string;
    regulatoryFindings: string;
    analysisError: string;
    analysisErrorDesc: string;
    noIssues: string;
    noIssuesDesc: string;
    inSimpleTerms: string;
    whatTheLawSays: string;
    whatToDo: string;
    technicalDetails: string;
    affectedBlocks: string;
    practiceProhibited: string;
    highRisk: string;
    legalObligation: string;
  };
  insights: {
    whyItMatters: string;
    criticalQuestion: string;
    regulatoryReference: string;
    bestPractice: string;
    whatCouldGoWrong: string;
    concreteExample: string;
    whatYouCanDo: string;
    redFlags: string;
    learnMore: string;
    keyPoints: string;
    geoEnvPanelTitle: string;
    geoImplicationsTitle: string;
    envImplicationsTitle: string;
    riskAnalysis: string;
    overallIndex: string;
    score: string;
    scoreDescription: string;
    mainFindings: string;
    noIssuesFound: string;
    mitigation: string;
    backToGuide: string;
  };
  wiki: {
    title: string;
    subtitle: string;
    backToBuilder: string;
    backToLibrary: string;
    searchPlaceholder: string;
  };
  columns: {
    input: {
      label: string;
      title: string;
      subtitle: string;
      description: string;
    };
    process: {
      label: string;
      title: string;
      subtitle: string;
      description: string;
    };
    storage: {
      label: string;
      title: string;
      subtitle: string;
      description: string;
    };
    output: {
      label: string;
      title: string;
      subtitle: string;
      description: string;
    };
    risk: {
      label: string;
      title: string;
      subtitle: string;
      description: string;
    };
    impact: {
      label: string;
      title: string;
      subtitle: string;
      description: string;
    };
  };
}

const translations: Record<Locale, Translations> = {
  it: {
    onboarding: {
      title: 'Segno',
      subtitle: "Costruisci il tuo scenario AI e scopri l'impatto.",
      nameLabel: 'Come ti chiami?',
      namePlaceholder: 'Il tuo nome o azienda',
      modeLabel: 'Cosa vuoi fare?',
      modeUseTitle: "Capire i rischi dell'uso dell'IA",
      modeUseDescription: 'Usi ChatGPT, Gemini o altri strumenti AI?',
      modeDesignTitle: "Progettare un'applicazione AI",
      modeDesignDescription: 'Stai costruendo un sistema AI?',
      avatarLabel: 'Scegli il tuo avatar',
      howItWorksTitle: 'Come funziona',
      howItWorksDescription:
        "Rispondi alle domande nella sidebar per costruire il tuo scenario. Ogni elemento include note educative con riferimenti normativi e best practices.",
      startButton: 'Inizia',
    },
    common: {
      language: 'Lingua',
      selectLanguage: 'Seleziona lingua',
      italian: 'Italiano',
      english: 'Inglese',
      selected: 'Selezionato',
      chooseOneOrMore: 'Scegli una o più opzioni',
      selectedOf: 'di',
      close: 'Chiudi',
      of: 'di',
      selectedLower: 'selezionati',
    },
    cityBuilder: {
      buildScenario: 'Costruisci il tuo scenario',
      selectQuestion: 'Seleziona una domanda e scegli la risposta più adatta.',
      chooseAnswer: 'Scegli una o più opzioni',
      quickGuide: 'Guida rapida',
      howToStart: 'Come iniziare',
      howToStartStep1: 'Guarda la barra laterale a sinistra: contiene 9 domande chiave',
      howToStartStep2: 'Seleziona una domanda (es. "Che tipo di informazioni raccogli?")',
      howToStartStep3: 'Scegli una o più risposte dalla lista che appare',
      howToStartStep4: 'I blocchi vengono aggiunti automaticamente alla mappa',
      howToReadMap: 'Come leggere la mappa',
      howToReadMapDesc: 'La mappa mostra come i dati si muovono nel tuo sistema, da sinistra a destra:',
      mapLeft: 'Sinistra: da dove arrivano i dati (input)',
      mapCenter: 'Centro: come vengono elaborati (processo AI) e dove vengono conservati (storage)',
      mapRight: 'Destra: cosa vede l\'utente finale (output)',
      clickBlock: 'Clicca su qualsiasi blocco per vedere una spiegazione semplice, cosa dice la legge, e cosa potresti rischiare.',
      notesTip: 'Suggerimento: le note colorate accanto ai blocchi mostrano controlli e rischi. Cliccaci sopra per approfondire.',
      disclaimer: 'Disclaimer:',
      disclaimerText: 'Questo strumento ha finalità di consapevolezza, formative e di supporto informativo. Non deve essere inteso come sostituto di una consulenza legale, tecnica o professionale specializzata. Per valutazioni approfondite e assistenza specifica, è consigliabile rivolgersi a consulenti qualificati.',
      developedBy: 'Strumento sviluppato da',
      showNotes: 'Mostra note',
      hideNotes: 'Nascondi note',
      save: 'Salva',
      load: 'Carica',
      saveTitle: 'Salva la board in un file protetto',
      loadTitle: 'Carica una board da file',
      analyzeRisks: 'Analizza Rischi',
      news: 'News',
      guideTitle: 'Guida rapida',
      invalidFile: 'Il file selezionato non è un file Segno valido. Per favore seleziona un file .segno',
      invalidFileDesc: '',
      confirmLoad: 'Caricando un file, i dati attuali verranno sostituiti. Vuoi continuare?',
      loadSuccess: 'Board caricata con successo!',
      loadError: 'Errore nel caricamento del file',
      saveError: 'Errore nel salvataggio della board',
    },
    analysis: {
      title: 'Analisi di Conformità',
      reportFor: 'Report legale generato per lo scenario di',
      editScenario: 'Modifica Scenario',
      exportPdf: 'Esporta PDF',
      riskIndex: 'Indice di Rischio',
      level: 'Livello:',
      analyzedElements: 'Elementi Analizzati',
      connections: 'Connessioni',
      analyzedBlocks: 'Analizzati',
      violationsDetected: 'Rilevate',
      noViolations: 'Nessuna violazione rilevata',
      mitigationsImplemented: 'Implementate',
      regulatoryFindings: 'Rilievi Normativi',
      analysisError: "Errore nell'analisi",
      analysisErrorDesc: 'Verifica che tutti i blocchi siano configurati correttamente e riprova.',
      noIssues: 'Nessuna criticità rilevata',
      noIssuesDesc: 'Lo scenario sembra conforme alle regole normative analizzate. Verifica comunque di aver implementato tutte le best practices richieste.',
      inSimpleTerms: 'In parole semplici:',
      whatTheLawSays: 'Cosa dice la norma:',
      whatToDo: 'Cosa fare:',
      technicalDetails: 'Dettagli tecnici',
      affectedBlocks: 'Blocchi coinvolti:',
      practiceProhibited: '⚠️ PRATICA VIETATA',
      highRisk: '🔴 ALTO RISCHIO',
      legalObligation: '📋 OBBLIGO LEGALE',
    },
    insights: {
      whyItMatters: 'Perché conta',
      criticalQuestion: 'Domanda critica',
      regulatoryReference: 'Riferimento normativo',
      bestPractice: 'Best practice',
      whatCouldGoWrong: 'Cosa potrebbe andare storto',
      concreteExample: 'Esempio concreto',
      whatYouCanDo: 'Cosa puoi fare',
      redFlags: 'Segnali di allarme',
      learnMore: 'Approfondisci (Link esterno)',
      keyPoints: 'Punti da ricordare',
      geoEnvPanelTitle: 'Implicazioni geo-politiche, ambientali e sistemiche',
      geoImplicationsTitle: 'Implicazioni geo-politiche e di governance',
      envImplicationsTitle: 'Energia, ambiente e impatto sistemico',
      riskAnalysis: 'Analisi rischi',
      overallIndex: 'Indice complessivo',
      score: 'Score',
      scoreDescription: '0 = rischio minimo, 100 = rischio massimo',
      mainFindings: 'Rilievi principali',
      noIssuesFound: 'Nessuna criticità rilevata sulle regole disponibili.',
      mitigation: 'Mitigazione:',
      backToGuide: 'Torna alla guida',
    },
    wiki: {
      title: 'Knowledge Hub',
      subtitle: 'Impara i concetti fondamentali di AI e Compliance.',
      backToBuilder: 'Torna al Builder',
      backToLibrary: 'Torna alla Libreria',
      searchPlaceholder: 'Cerca argomenti (es. AI Act, RAG...)',
    },
    columns: {
      input: {
        label: 'Input',
        title: 'Dati in Entrata',
        subtitle: 'Da dove arrivano le informazioni',
        description: 'Tutti i dati che entrano nel sistema: email, form, sensori, file, database esterni',
      },
      process: {
        label: 'Processo',
        title: 'Elaborazione & Intelligenza Artificiale',
        subtitle: 'Come i dati vengono analizzati',
        description: 'I dati vengono elaborati da algoritmi, modelli AI o sistemi di analisi per estrarre informazioni utili',
      },
      storage: {
        label: 'Storage',
        title: 'Archiviazione Dati',
        subtitle: 'Dove vengono conservati',
        description: 'I dati vengono salvati su server, database o cloud. La posizione geografica è importante per la privacy',
      },
      output: {
        label: 'Output',
        title: 'Risultati & Azioni',
        subtitle: 'Cosa produce il sistema',
        description: 'I risultati dell\'elaborazione: decisioni automatiche, raccomandazioni, interfacce utente o comunicazioni',
      },
      risk: {
        label: 'Risk',
        title: 'Controlli & Policy',
        subtitle: 'Audit e governance',
        description: 'Controlli legali, audit trail e interventi umani richiesti per garantire conformità e sicurezza',
      },
      impact: {
        label: 'Impatto',
        title: 'Impatto & Sistema',
        subtitle: 'Effetti sul contesto',
        description: 'Impatto sistemico: consumo energetico, effetti sociali, governance politica e fiducia pubblica',
      },
    },
  },
  en: {
    onboarding: {
      title: 'Segno',
      subtitle: 'Build your AI scenario and discover its impact.',
      nameLabel: "What's your name?",
      namePlaceholder: 'Your name or company',
      modeLabel: 'What do you want to do?',
      modeUseTitle: 'Understand AI usage risks',
      modeUseDescription: 'Do you use ChatGPT, Gemini or other AI tools?',
      modeDesignTitle: 'Design an AI application',
      modeDesignDescription: 'Are you building an AI system?',
      avatarLabel: 'Choose your avatar',
      howItWorksTitle: 'How it works',
      howItWorksDescription:
        'Answer questions in the sidebar to build your scenario. Each element includes educational notes with regulatory references and best practices.',
      startButton: 'Start',
    },
    common: {
      language: 'Language',
      selectLanguage: 'Select language',
      italian: 'Italian',
      english: 'English',
      selected: 'Selected',
      chooseOneOrMore: 'Choose one or more options',
      selectedOf: 'of',
      close: 'Close',
      of: 'of',
      selectedLower: 'selected',
    },
    cityBuilder: {
      buildScenario: 'Build your scenario',
      selectQuestion: 'Select a question and choose the most appropriate answer.',
      chooseAnswer: 'Choose one or more options',
      quickGuide: 'Quick Guide',
      howToStart: 'How to start',
      howToStartStep1: 'Look at the left sidebar: it contains 9 key questions',
      howToStartStep2: 'Select a question (e.g., "What type of information do you collect?")',
      howToStartStep3: 'Choose one or more answers from the list that appears',
      howToStartStep4: 'Blocks are automatically added to the map',
      howToReadMap: 'How to read the map',
      howToReadMapDesc: 'The map shows how data flows through your system, from left to right:',
      mapLeft: 'Left: where data comes from (input)',
      mapCenter: 'Center: how it\'s processed (AI process) and where it\'s stored (storage)',
      mapRight: 'Right: what the end user sees (output)',
      clickBlock: 'Click on any block to see a simple explanation, what the law says, and what you might risk.',
      notesTip: '💡 Tip: colored notes next to blocks show controls and risks. Click on them to learn more.',
      disclaimer: 'Disclaimer:',
      disclaimerText: 'This tool is for awareness, educational, and informational support purposes. It should not be considered a substitute for specialized legal, technical, or professional consultation. For in-depth evaluations and specific assistance, it is advisable to consult qualified professionals.',
      developedBy: 'Tool developed by',
      showNotes: 'Show notes',
      hideNotes: 'Hide notes',
      save: 'Save',
      load: 'Load',
      saveTitle: 'Save the board to a protected file',
      loadTitle: 'Load a board from file',
      analyzeRisks: 'Analyze Risks',
      news: 'News',
      guideTitle: 'Quick Guide',
      invalidFile: 'The selected file is not a valid Segno file. Please select a .segno file',
      invalidFileDesc: '',
      confirmLoad: 'Loading a file will replace current data. Do you want to continue?',
      loadSuccess: 'Board loaded successfully!',
      loadError: 'Error loading file',
      saveError: 'Error saving board',
    },
    analysis: {
      title: 'Compliance Analysis',
      reportFor: 'Legal report generated for scenario by',
      editScenario: 'Edit Scenario',
      exportPdf: 'Export PDF',
      riskIndex: 'Risk Index',
      level: 'Level:',
      analyzedElements: 'Analyzed Elements',
      connections: 'Connections',
      analyzedBlocks: 'Analyzed',
      violationsDetected: 'Detected',
      noViolations: 'No violations detected',
      mitigationsImplemented: 'Implemented',
      regulatoryFindings: 'Regulatory Findings',
      analysisError: 'Analysis Error',
      analysisErrorDesc: 'Verify that all blocks are configured correctly and try again.',
      noIssues: 'No issues detected',
      noIssuesDesc: 'The scenario appears compliant with the analyzed regulatory rules. However, verify that you have implemented all required best practices.',
      inSimpleTerms: 'In simple terms:',
      whatTheLawSays: 'What the law says:',
      whatToDo: 'What to do:',
      technicalDetails: 'Technical details',
      affectedBlocks: 'Affected blocks:',
      practiceProhibited: '⚠️ PROHIBITED PRACTICE',
      highRisk: '🔴 HIGH RISK',
      legalObligation: '📋 LEGAL OBLIGATION',
    },
    insights: {
      whyItMatters: 'Why it matters',
      criticalQuestion: 'Critical question',
      regulatoryReference: 'Regulatory reference',
      bestPractice: 'Best practice',
      whatCouldGoWrong: 'What could go wrong',
      concreteExample: 'Concrete example',
      whatYouCanDo: 'What you can do',
      redFlags: 'Red flags',
      learnMore: 'Learn more (External link)',
      keyPoints: 'Key points to remember',
      geoEnvPanelTitle: 'Geo-political, environmental and systemic implications',
      geoImplicationsTitle: 'Geo-political and governance implications',
      envImplicationsTitle: 'Energy, environment and systemic impact',
      riskAnalysis: 'Risk Analysis',
      overallIndex: 'Overall Index',
      score: 'Score',
      scoreDescription: '0 = minimum risk, 100 = maximum risk',
      mainFindings: 'Main Findings',
      noIssuesFound: 'No issues found on available rules.',
      mitigation: 'Mitigation:',
      backToGuide: 'Back to guide',
    },
    wiki: {
      title: 'Knowledge Hub',
      subtitle: 'Learn the fundamentals of AI and Compliance.',
      backToBuilder: 'Back to Builder',
      backToLibrary: 'Back to Library',
      searchPlaceholder: 'Search topics (e.g. AI Act, RAG...)',
    },
    columns: {
      input: {
        label: 'Input',
        title: 'Data Input',
        subtitle: 'Where information comes from',
        description: 'All data entering the system: emails, forms, sensors, files, external databases',
      },
      process: {
        label: 'Process',
        title: 'Processing & Artificial Intelligence',
        subtitle: 'How data is analyzed',
        description: 'Data is processed by algorithms, AI models or analysis systems to extract useful information',
      },
      storage: {
        label: 'Storage',
        title: 'Data Storage',
        subtitle: 'Where it\'s stored',
        description: 'Data is saved on servers, databases or cloud. Geographic location is important for privacy',
      },
      output: {
        label: 'Output',
        title: 'Results & Actions',
        subtitle: 'What the system produces',
        description: 'Processing results: automated decisions, recommendations, user interfaces or communications',
      },
      risk: {
        label: 'Risk',
        title: 'Controls & Policy',
        subtitle: 'Audit and governance',
        description: 'Legal controls, audit trails and required human interventions to ensure compliance and security',
      },
      impact: {
        label: 'Impact',
        title: 'Impact & System',
        subtitle: 'Effects on context',
        description: 'Systemic impact: energy consumption, social effects, political governance and public trust',
      },
    },
  },
};

export function getTranslations(locale: Locale): Translations {
  return translations[locale];
}

export function t(locale: Locale, key: keyof Translations, subKey?: string): string {
  const translation = translations[locale][key];
  if (subKey && typeof translation === 'object') {
    return (translation as any)[subKey] || '';
  }
  return typeof translation === 'string' ? translation : '';
}
