/**
 * Knowledge base for main blocks (input, process, storage, output) to enhance critical thinking
 * Provides educational content specific to block types and labels
 */

export type BlockKnowledge = {
  simpleExplanation?: string; // Spiegazione divulgativa
  question?: string; // Critical question to prompt reflection (orientata all'utente finale)
  regulation?: {
    name: string;
    article: string;
    requirement: string;
    url?: string;
  };
  bestPractice?: string;
  risk?: string; // What could go wrong
  example?: string; // Real-world example
  externalLink?: string; // Link esterno per approfondimento
  whatYouCanDo?: string[]; // Cosa puoi fare come utente finale
  redFlags?: string[]; // Segnali di allarme da riconoscere
};

// Knowledge by block type (generic) - VERSIONE PROGETTISTI
const TYPE_KNOWLEDGE_DESIGNER: Record<string, BlockKnowledge> = {
  input: {
    simpleExplanation: 'Questi sono i dati che entrano nel sistema: da dove vengono? Chi li raccoglie? Perché? Devi informare le persone PRIMA di raccoglierli. Come quando bussi a una porta: devi dire chi sei e perché sei lì.',
    question: 'Da dove arrivano questi dati? Chi li raccoglie e con quale finalità?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 13-14',
      requirement: 'Obbligo di informare l\'interessato PRIMA della raccolta: chi, cosa, perché, per quanto tempo, diritti',
      url: 'https://gdpr-info.eu/art-13-gdpr/'
    },
    bestPractice: 'Documentare origine dati, finalità, base giuridica. Verificare che raccolta sia necessaria e proporzionata. Informativa chiara e accessibile.',
    risk: 'Raccogliere dati senza informativa o base giuridica valida è illecito. Multe fino al 4% del fatturato.',
    externalLink: 'https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/individual-rights/right-to-be-informed/'
  },
  process: {
    simpleExplanation: 'Qui l\'AI elabora i dati per fare decisioni o analisi. È come una scatola nera che prende dati e restituisce risultati. Devi essere in grado di spiegare come funziona, almeno in modo semplice. Le persone hanno il diritto di capire perché un sistema ha preso una certa decisione su di loro.',
    question: 'Come funziona questo processo? È trasparente e spiegabile?',
    regulation: {
      name: 'AI Act',
      article: 'Art. 13',
      requirement: 'Sistemi ad alto rischio devono essere trasparenti: utenti devono capire come funzionano',
      url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32021R2066'
    },
    bestPractice: 'Documentare algoritmo, dati di training, limiti del sistema. Fornire spiegazioni comprensibili delle decisioni. Monitorare performance e bias.',
    risk: 'Processi opachi possono nascondere bias, errori o discriminazioni. Difficile contestare decisioni se non si capisce come funzionano.',
    externalLink: 'https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai'
  },
  storage: {
    simpleExplanation: 'Dove conservi i dati? Su server in Europa o in altri paesi? È importante perché le leggi cambiano da paese a paese. Se li metti su server americani, devi proteggerli in modo particolare (cifratura) perché le leggi USA permettono alla loro intelligence di accedervi.',
    question: 'Dove sono conservati i dati? Quali giurisdizioni si applicano?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 32 & Art. 44-49',
      requirement: 'Dati devono essere protetti (cifratura) e trasferimenti extra-UE richiedono garanzie adeguate',
      url: 'https://gdpr-info.eu/chapter-5/'
    },
    bestPractice: 'Scegliere data center in UE quando possibile. Per trasferimenti extra-UE: SCC + cifratura. Documentare localizzazione e misure di sicurezza.',
    risk: 'Storage in paesi senza adeguate protezioni può violare GDPR. Dati non cifrati sono vulnerabili a data breaches.',
    externalLink: 'https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/international-transfers/'
  },
  output: {
    simpleExplanation: 'Questo è quello che vede l\'utente finale: la decisione del sistema, un report, una chat. Se la decisione è importante (es. rifiuto prestito), la persona deve poterla contestare e chiedere a un umano di ricontrollare. Non puoi dire "è il computer, non posso fare niente".',
    question: 'Cosa vede l\'utente? Può contestare o appellare le decisioni?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 22',
      requirement: 'Hai diritto di non essere sottoposto a decisioni basate unicamente su trattamento automatizzato. Diritto di contestazione.',
      url: 'https://gdpr-info.eu/art-22-gdpr/'
    },
    bestPractice: 'Leggi le condizioni d\'uso del servizio per vedere se puoi contestare decisioni. Chiedi al fornitore come fare appello. Non accettare decisioni automatiche senza possibilità di revisione.',
    risk: 'Se accetti decisioni automatiche senza poterle contestare, potresti subire discriminazioni o ingiustizie senza rimedio.',
    example: 'Se un sistema di prestito ti rifiuta automaticamente e non puoi parlare con nessuno, hai diritto a chiedere una revisione umana.',
    externalLink: 'https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/artificial-intelligence/guidance-on-ai-and-data-protection/automated-decision-making-and-profiling/'
  },
};

// Knowledge by block type (generic) - VERSIONE UTENTI FINALI
const TYPE_KNOWLEDGE_USER: Record<string, BlockKnowledge> = {
  input: {
    simpleExplanation: 'Questi sono i tuoi dati o i dati che condividi con il sistema. Hai diritto a sapere perché vengono raccolti, chi li usa e come vengono protetti. Come quando qualcuno ti chiede qualcosa: hai diritto a sapere perché.',
    question: 'Sai perché questo sistema raccoglie questi dati? Hai dato il consenso?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 13-14',
      requirement: 'Hai diritto a sapere perché vengono raccolti i tuoi dati PRIMA che vengano raccolti',
      url: 'https://gdpr-info.eu/art-13-gdpr/'
    },
    bestPractice: 'Leggi sempre l\'informativa privacy prima di condividere dati. Verifica che la raccolta sia necessaria. Puoi rifiutare se non vuoi.',
    risk: 'Se condividi dati senza sapere perché o senza consenso valido, potresti violare la tua privacy.',
    example: 'Se un\'app ti chiede di accedere alla tua rubrica senza spiegare perché, non dovresti accettare.',
    externalLink: 'https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/individual-rights/right-to-be-informed/'
  },
  process: {
    simpleExplanation: 'Qui l\'AI elabora i tuoi dati per prendere decisioni o fare analisi. È come una scatola nera: tu metti dentro i dati e esce un risultato. Hai diritto a capire come funziona, almeno in modo semplice. Hai diritto a sapere perché il sistema ha preso una certa decisione su di te.',
    question: 'Sai come funziona questo sistema? Capisci perché prende certe decisioni su di te?',
    regulation: {
      name: 'AI Act',
      article: 'Art. 13',
      requirement: 'Hai diritto a capire come funzionano i sistemi AI che usano i tuoi dati',
      url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32021R2066'
    },
    bestPractice: 'Chiedi spiegazioni al fornitore del servizio su come funziona il sistema. Leggi le condizioni d\'uso. Verifica se ci sono limiti o rischi.',
    risk: 'Se non capisci come funziona il sistema, potresti accettare decisioni ingiuste o discriminatorie senza saperlo.',
    example: 'Se un sistema di prestito ti rifiuta automaticamente senza spiegare perché, hai diritto a una spiegazione.',
    externalLink: 'https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai'
  },
  storage: {
    simpleExplanation: 'Dove vengono salvati i tuoi dati? Su server in Europa o in altri paesi? È importante perché le leggi cambiano da paese a paese. Se sono su server americani, le autorità USA possono accedervi. Hai diritto a sapere dove finiscono i tuoi dati.',
    question: 'Sai dove vengono salvati i tuoi dati? Sono in Europa o in altri paesi?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 32 & Art. 44-49',
      requirement: 'Hai diritto a sapere dove vengono salvati i tuoi dati. Trasferimenti extra-UE richiedono protezioni speciali',
      url: 'https://gdpr-info.eu/chapter-5/'
    },
    bestPractice: 'Chiedi al fornitore del servizio dove vengono salvati i dati. Preferisci servizi con server europei. Verifica che i dati siano cifrati.',
    risk: 'Dati su server extra-UE (specialmente USA) possono essere accessibili alle autorità di quei paesi senza che tu lo sappia.',
    example: 'ChatGPT salva i dati su server USA: se condividi informazioni sensibili, le autorità americane possono accedervi.',
    externalLink: 'https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/international-transfers/'
  },
  output: {
    simpleExplanation: 'Questo è quello che vedi tu: la decisione del sistema, un risultato, una risposta. Se la decisione è importante (es. rifiuto prestito, raccomandazione), hai diritto a contestarla e chiedere a un umano di ricontrollare. Non devi accettare decisioni senza poterle discutere.',
    question: 'Se il sistema prende una decisione importante su di te, puoi contestarla? C\'è qualcuno che può rivederla?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 22',
      requirement: 'Hai diritto di non essere sottoposto a decisioni basate unicamente su trattamento automatizzato. Diritto di contestazione.',
      url: 'https://gdpr-info.eu/art-22-gdpr/'
    },
    bestPractice: 'Leggi le condizioni d\'uso del servizio per vedere se puoi contestare decisioni. Chiedi al fornitore come fare appello. Non accettare decisioni automatiche senza possibilità di revisione.',
    risk: 'Se accetti decisioni automatiche senza poterle contestare, potresti subire discriminazioni o ingiustizie senza rimedio.',
    example: 'Se un sistema di prestito ti rifiuta automaticamente e non puoi parlare con nessuno, hai diritto a chiedere una revisione umana.',
    externalLink: 'https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/artificial-intelligence/guidance-on-ai-and-data-protection/automated-decision-making-and-profiling/'
  },
};

// Knowledge by specific block labels
const LABEL_KNOWLEDGE: Record<string, BlockKnowledge> = {
  // --- INPUT ---
  'Dati Personali': {
    simpleExplanation: 'Qualsiasi informazione che permette di riconoscere una persona (nome, email, ma anche un codice ID o la posizione). Trattali con cura.',
    question: 'Hai una base giuridica valida per raccogliere questi dati? Gli utenti sono informati?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 6 & Art. 13-14',
      requirement: 'Serve base giuridica (consenso, contratto, obbligo legale, ecc.) e informativa PRIMA della raccolta',
      url: 'https://gdpr-info.eu/art-6-gdpr/'
    },
    bestPractice: 'Definire base giuridica chiara. Informativa completa e accessibile. Consenso libero, specifico, informato, revocabile.',
    risk: 'Raccogliere dati senza base giuridica o informativa è illecito. Multe fino al 4% del fatturato.',
    example: 'Raccogliere email senza informativa o consenso viola GDPR. Serve informativa chiara prima della raccolta.',
    externalLink: 'https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/personal-information-what-is-it/'
  },
  'Video / Immagini': {
    simpleExplanation: 'Raccogliere foto o video (specialmente per riconoscimento facciale) è molto invasivo. Serve consenso esplicito o una base legale molto forte. In molti luoghi pubblici il riconoscimento facciale è vietato. Chiediti sempre: è davvero necessario? Non basta una telecamera normale che non riconosce le persone?',
    question: 'Hai consenso esplicito per raccogliere immagini/video? Per quale finalità?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 9(2)',
      requirement: 'Dati biometrici (riconoscimento facciale) sono categorie particolari: serve consenso esplicito o base giuridica eccezionale',
      url: 'https://gdpr-info.eu/art-9-gdpr/'
    },
    bestPractice: 'Chiedere consenso esplicito per immagini/video. Specificare finalità (es. sicurezza, identificazione). Considerare alternative meno invasive.',
    risk: 'Raccogliere immagini/video senza consenso o base giuridica valida è illecito. Riconoscimento facciale può essere vietato in alcuni contesti.',
    example: 'Telecamere in luoghi pubblici per riconoscimento facciale: richiede base giuridica eccezionale o è vietato (AI Act Art. 5).',
    externalLink: 'https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai'
  },
  'Dati Sanitari': {
    simpleExplanation: 'I dati sanitari (salute, malattie, trattamenti medici) sono molto sensibili. Serve consenso esplicito O una base legale forte (come "necessità medica" per un ospedale). Devono essere sempre protetti con cifratura. Chiediti: ho davvero bisogno di questi dati o posso usare dati meno sensibili?',
    question: 'Hai una base giuridica valida per dati sanitari? È davvero necessario raccoglierli?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 9(2)',
      requirement: 'Dati sanitari sono categorie particolari: serve consenso esplicito O altra base (necessità medica, interesse pubblico, ricerca)',
      url: 'https://gdpr-info.eu/art-9-gdpr/'
    },
    bestPractice: 'Valutare se dati sanitari sono necessari. Considerare "necessità medica" o "interesse pubblico" come alternative al consenso. Cifratura obbligatoria.',
    risk: 'Trattamento dati sanitari senza base giuridica valida è illecito. Multe severe (fino al 4% fatturato o 20M€).',
    example: 'App fitness che raccoglie dati sanitari: serve consenso esplicito o dimostrare necessità medica/interesse pubblico.',
    externalLink: 'https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/special-category-data/what-are-special-category-data/'
  },
  'Dati Finanziari': {
    simpleExplanation: 'Dati bancari, conti correnti, transazioni: sono dati molto sensibili che attirano criminali. Devono essere SEMPRE cifrati (come metterli in una cassaforte blindata). Serve una base legale chiara (es. contratto bancario) e accessi limitati solo a chi ne ha davvero bisogno.',
    question: 'Hai una base giuridica valida? I dati sono protetti con cifratura?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 9(2) & Art. 32',
      requirement: 'Dati finanziari richiedono protezione speciale. Cifratura obbligatoria per dati sensibili',
      url: 'https://gdpr-info.eu/art-32-gdpr/'
    },
    bestPractice: 'Base giuridica chiara (es. contratto, obbligo legale). Cifratura end-to-end. Accessi limitati. Audit regolari.',
    risk: 'Dati finanziari esposti possono causare frodi, danni reputazionali, multe GDPR.',
    example: 'Database con dati bancari non cifrato: violazione GDPR Art. 32. Obbligo di cifratura per dati finanziari.',
    externalLink: 'https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/security/'
  },
  'Dati di Localizzazione': {
    simpleExplanation: 'È davvero necessario sapere la posizione precisa? Spesso basta sapere la città, non le coordinate GPS. E non serve tracciare continuamente: solo quando necessario. Come quando chiami un taxi: serve sapere dove sei ora, non dove sei stato ieri. Più dati = più rischio.',
    question: 'È davvero necessario tracciare la posizione? Puoi usare dati meno precisi?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 5(1)(c)',
      requirement: 'Minimizzazione: raccogliere solo dati necessari. Posizione precisa può essere eccessiva',
      url: 'https://gdpr-info.eu/art-5-gdpr/'
    },
    bestPractice: 'Usare granularità minima necessaria (es. città invece di coordinate GPS). Chiedere consenso per tracciamento continuo.',
    risk: 'Tracciamento posizione continuo senza necessità viola principio di minimizzazione. Può essere percepito come invasivo.',
    example: 'App che traccia posizione ogni minuto quando serve solo sapere se utente è in città: viola minimizzazione.',
    externalLink: 'https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/principles/data-minimisation/'
  },
  'Dati Comportamentali': {
    simpleExplanation: 'Quando tracci quello che fanno gli utenti (cosa guardano, cosa comprano, dove cliccano), devi dirlo chiaramente. Questo si chiama "profilazione". Gli utenti hanno il diritto di rifiutare e di vedere cosa sai su di loro. Non farlo di nascosto. Come quando qualcuno ti segue: devi saperlo.',
    question: 'Gli utenti sanno che vengono profilati? Possono rifiutare?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 13-14 & Art. 21',
      requirement: 'Profilazione richiede informativa specifica. Diritto di opposizione alla profilazione',
      url: 'https://gdpr-info.eu/art-21-gdpr/'
    },
    bestPractice: 'Informativa chiara su profilazione. Opzione per rifiutare. Evitare profilazione nascosta. Consentire accesso a dati di profilazione.',
    risk: 'Profilazione senza informativa o consenso è illecita. Utenti possono opporsi e richiedere cancellazione.',
    example: 'Sito che profila utenti senza informarli: viola GDPR. Serve informativa specifica su profilazione.',
    externalLink: 'https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/individual-rights/right-to-object/'
  },
  'Registrazioni Audio': {
    simpleExplanation: 'Se registri le conversazioni (chiamate, chat vocali), devi dirlo PRIMA di iniziare. Gli utenti devono poter rifiutare o scegliere "solo ascolto senza registrazione". E dopo la trascrizione, cancella l\'audio originale. Come quando un call center ti dice "questa chiamata sarà registrata": lo sai prima di parlare.',
    question: 'Gli utenti sanno che vengono registrati? C\'è alternativa senza registrazione?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 13-14',
      requirement: 'Registrazioni richiedono informativa PRIMA. Consenso esplicito per registrazioni',
      url: 'https://gdpr-info.eu/art-13-gdpr/'
    },
    bestPractice: 'Informativa chiara prima di registrare. Opzione "solo ascolto senza registrazione" quando possibile. Cancellare registrazioni dopo trascrizione.',
    risk: 'Registrazioni nascoste o senza consenso sono illecite. Possono comportare sanzioni penali in alcuni paesi.',
    example: 'Call center che registra senza informare: viola GDPR. Serve informativa prima della chiamata.',
    externalLink: 'https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/individual-rights/right-to-be-informed/'
  },
  'Dati Pubblici': {
    simpleExplanation: 'Quando usi dati pubblici (es. Open Data, Creative Commons), verifica la licenza PRIMA di usarli. Alcune licenze richiedono di menzionare chi li ha creati (attribuzione). Altre permettono uso commerciale, altre no. Non dare per scontato che siano gratis da usare. Come quando usi una foto trovata online: devi verificare la licenza.',
    question: 'Hai verificato licenze e termini d\'uso dei dati pubblici?',
    regulation: {
      name: 'Copyright & Licenze',
      article: 'Varie',
      requirement: 'Rispettare licenze di dati pubblici (es. Open Data, Creative Commons)',
      url: 'https://creativecommons.org/licenses/'
    },
    bestPractice: 'Verificare licenza prima di usare. Rispettare attribuzione se richiesta. Documentare fonte e licenza.',
    risk: 'Usare dati pubblici senza rispettare licenza può causare problemi legali.',
    externalLink: 'https://opensource.org/licenses/'
  },
  'Sensori / IoT': {
    simpleExplanation: 'I sensori (temperatura, movimento, video, ecc.) raccolgono dati. Gli utenti devono sapere cosa raccolgono, perché e quando. E devono poter disattivarli se vogliono. Non raccogliere dati di nascosto. Come quando installi una telecamera: devi dirlo e chiedere permesso.',
    question: 'Gli utenti sanno che i sensori raccolgono dati? Possono disattivarli?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 13-14',
      requirement: 'Dati da sensori richiedono informativa. Utenti devono poter controllare raccolta',
      url: 'https://gdpr-info.eu/art-13-gdpr/'
    },
    bestPractice: 'Informativa chiara su cosa raccolgono i sensori. Opzione per disattivare. Minimizzare frequenza di raccolta.',
    risk: 'Sensori che raccolgono dati senza informativa violano GDPR.',
    externalLink: 'https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/individual-rights/right-to-be-informed/'
  },
  'Dati Fornitori': {
    simpleExplanation: 'Quando ricevi dati da un fornitore esterno, devi avere un contratto chiaro (DPA - Data Processing Agreement) che specifichi come usarli e proteggerli. E il fornitore deve avere il DIRITTO legale di trasferirti quei dati. Non accettare dati senza verificare: se il fornitore non aveva diritto a darti quei dati, anche tu sei responsabile.',
    question: 'Hai un contratto GDPR-compliant con il fornitore? Ha diritto a trasferire i dati?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 28',
      requirement: 'Contratti con fornitori devono includere obblighi GDPR. Fornitore deve avere diritto a trasferire dati',
      url: 'https://gdpr-info.eu/art-28-gdpr/'
    },
    bestPractice: 'DPA (Data Processing Agreement) con tutti i fornitori. Verificare che fornitore abbia diritto legale a trasferire dati.',
    risk: 'Ricevere dati da fornitore senza contratto adeguato o senza diritto legale può violare GDPR.',
    externalLink: 'https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/controllers-and-processors/contracts-between-controllers-and-processors/'
  },

  // --- PROCESS ---
  'LLM Core': {
    simpleExplanation: 'I modelli LLM (come ChatGPT) sono spesso su server americani. Se li usi, i dati degli utenti viaggiano in USA, dove le leggi permettono alla loro intelligence di accedervi. Questo è un problema per il GDPR. Preferisci modelli hostati in Europa o usa cifratura end-to-end. Come quando spedisci un pacco: scegli un corriere sicuro.',
    question: 'Hai verificato dove sono hostati i modelli LLM? I dati vengono trasferiti extra-UE?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 44-49',
      requirement: 'LLM spesso hostati in USA: trasferimenti richiedono SCC + misure supplementari',
      url: 'https://gdpr-info.eu/chapter-5/'
    },
    bestPractice: 'Verificare localizzazione provider LLM. Preferire provider con data center EU. Usare cifratura end-to-end. Considerare modelli self-hosted.',
    risk: 'LLM hostati in USA senza misure supplementari violano Schrems II. Rischio invalidazione trasferimenti.',
    example: 'ChatGPT/OpenAI: dati vengono trasferiti in USA. Serve SCC + cifratura o considerare alternative EU.',
    externalLink: 'https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/international-transfers/'
  },
  'Analisi Biometrica': {
    simpleExplanation: 'Riconoscere le persone in tempo reale in luoghi pubblici (faccia, voce) è VIETATO per legge, salvo casi eccezionali (terrorismo, ricerca dispersi). È molto invasivo e rischia di discriminare. Chiediti sempre: è davvero necessario? Non basta un badge o un PIN? Come quando entri in un ufficio: spesso basta mostrare un documento, non serve riconoscimento facciale automatico.',
    question: 'Hai una base giuridica eccezionale per riconoscimento biometrico? È in tempo reale?',
    regulation: {
      name: 'AI Act',
      article: 'Art. 5(1)',
      requirement: 'Riconoscimento biometrico remoto in tempo reale in spazi pubblici è VIETATO salvo eccezioni (terrorismo, ricerca dispersi)',
      url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32021R2066'
    },
    bestPractice: 'Evitare riconoscimento biometrico in tempo reale in spazi pubblici. Se necessario, limitare a casi eccezionali. Documentare base giuridica.',
    risk: 'Riconoscimento biometrico in tempo reale in spazi pubblici è vietato. Multe fino a 35M€ o 7% fatturato.',
    example: 'Telecamere che identificano persone in tempo reale in stazione: VIETATO salvo casi eccezionali (terrorismo).',
    externalLink: 'https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai'
  },
  'Motore RAG': {
    simpleExplanation: 'RAG (Retrieval-Augmented Generation) usa documenti per dare risposte migliori all\'AI. Ma quei documenti hanno copyright e licenze. Verifica PRIMA di indicizzarli che tu abbia il diritto di usarli. Non prendere documenti a caso da internet: rispettali licenze. Come quando usi citazioni in un tema: devi dire da dove vengono.',
    question: 'Hai verificato che i documenti indicizzati rispettino copyright e licenze?',
    regulation: {
      name: 'Copyright',
      article: 'Varie',
      requirement: 'Rispettare copyright e licenze di documenti usati per RAG',
      url: 'https://creativecommons.org/licenses/'
    },
    bestPractice: 'Verificare licenze documenti prima di indicizzare. Rispettare attribuzione se richiesta. Considerare solo documenti con licenza appropriata.',
    risk: 'Usare documenti protetti da copyright senza licenza può causare problemi legali.',
    externalLink: 'https://opensource.org/licenses/'
  },
  'Sistema di Raccomandazione': {
    simpleExplanation: 'I sistemi che suggeriscono cose agli utenti (prodotti, contenuti, ecc.) possono avere pregiudizi. Potrebbero mostrare sempre le stesse cose, creando "bolle" (filter bubbles), o discriminare alcuni gruppi. Testa il sistema con persone diverse e vedi se funziona uguale per tutti. Lascia che gli utenti vedano e modifichino le loro preferenze.',
    question: 'Hai testato il sistema per bias? Può creare "filter bubbles" o discriminazioni?',
    regulation: {
      name: 'AI Act',
      article: 'Art. 10',
      requirement: 'Sistemi di raccomandazione devono evitare bias e discriminazioni',
      url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32021R2066'
    },
    bestPractice: 'Test con dataset diversificati. Monitorare per bias. Consentire utenti di vedere e modificare preferenze. Evitare filter bubbles.',
    risk: 'Raccomandazioni con bias possono perpetuare discriminazioni o escludere gruppi.',
    example: 'Sistema di raccomandazione che suggerisce solo prodotti per uomini a utenti maschi: può escludere donne.',
    externalLink: 'https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai'
  },
  'Rilevamento Anomalie': {
    simpleExplanation: 'Quando il sistema rileva qualcosa di strano (anomalia) e fa un alert, devi verificare che sia vero prima di agire. Troppi falsi allarmi fanno sì che tutti ignorino gli alert, anche quelli veri. Una persona deve controllare prima di prendere decisioni critiche. Come un antifurto: se suona sempre per niente, nessuno ci fa più caso.',
    question: 'Hai validato che gli alert siano accurati? C\'è revisione umana prima di azioni?',
    regulation: {
      name: 'AI Act',
      article: 'Art. 10',
      requirement: 'Sistemi ad alto rischio devono essere accurati e robusti',
      url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32021R2066'
    },
    bestPractice: 'Validare accuracy degli alert. Revisione umana prima di azioni critiche. Monitorare tasso di falsi positivi. Aggiustare soglie se necessario.',
    risk: 'Troppi falsi positivi causano "alert fatigue". Falsi negativi possono lasciare passare problemi reali.',
    externalLink: 'https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai'
  },
  'Computer Vision': {
    simpleExplanation: 'I sistemi che analizzano immagini (riconoscere oggetti, persone, ecc.) devono funzionare in condizioni diverse: luce buona e cattiva, angoli diversi, qualità diverse. Testali con molti tipi di immagini PRIMA di usarli. Se funziona solo con foto perfette, fallirà nella realtà. Come quando guidi: la macchina deve funzionare anche quando piove o è buio.',
    question: 'Hai testato il sistema con immagini diverse? Funziona bene con tutte le condizioni?',
    regulation: {
      name: 'AI Act',
      article: 'Art. 10',
      requirement: 'Sistemi devono essere robusti e accurati in diverse condizioni',
      url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32021R2066'
    },
    bestPractice: 'Test con immagini diverse (illuminazione, angoli, qualità). Validare qualità input. Gestire errori gracefully.',
    risk: 'Sistemi non testati possono fallire in condizioni reali, causando errori o discriminazioni.',
    externalLink: 'https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai'
  },
  'Elaborazione Audio': {
    simpleExplanation: 'Quando processi audio (registrazioni, chiamate), dopo aver fatto quello che devi fare (es. trascrizione), cancella l\'audio originale. Conserva solo il testo (se necessario) e proteggilo con cifratura. Perché conservare l\'audio? Aumenta solo il rischio. Come quando registri una riunione: dopo aver scritto le note, cancella la registrazione.',
    question: 'Le registrazioni sono cancellate dopo elaborazione? La trascrizione è sicura?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 5(1)(e) & Art. 32',
      requirement: 'Limitation e sicurezza: cancellare dati non necessari, proteggere trascrizioni',
      url: 'https://gdpr-info.eu/art-5-gdpr/'
    },
    bestPractice: 'Cancellare audio originale dopo trascrizione. Cifrare trascrizioni. Conservare solo testo necessario.',
    risk: 'Conservare audio originale aumenta superficie di attacco. Trascrizioni non cifrate possono esporre conversazioni.',
    externalLink: 'https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/principles/storage-limitation/'
  },

  // --- STORAGE ---
  'Vault Dati (UE)': {
    simpleExplanation: 'Dove conservi i dati? Su server in Europa? Devono essere cifrati (come una cassaforte) e accessibili solo a chi ne ha bisogno. E devi avere backup regolari e testati. Come quando conservi documenti importanti: li metti in una cassaforte, controlli chi ha le chiavi, e fai copie di sicurezza.',
    question: 'I dati sono cifrati? Chi ha accesso? Hai backup?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 32',
      requirement: 'Dati devono essere cifrati e accessi limitati. Backup obbligatori',
      url: 'https://gdpr-info.eu/art-32-gdpr/'
    },
    bestPractice: 'Cifratura a riposo. Accessi basati su ruoli. Backup regolari e testati. Audit trail completo.',
    risk: 'Storage non cifrato o senza backup è vulnerabile a data breaches o perdita dati.',
    externalLink: 'https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/security/'
  },
  'Cloud (USA)': {
    simpleExplanation: 'Se salvi i dati su server americani (come AWS o Google in USA), le leggi USA permettono alla loro intelligence di accedervi. Questo è un problema per il GDPR.',
    question: 'Hai SCC e misure supplementari per trasferimenti USA? I dati sono cifrati?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 44-49 (Schrems II)',
      requirement: 'Trasferimenti USA richiedono SCC + misure supplementari (cifratura end-to-end) o sono a rischio invalidazione',
      url: 'https://gdpr-info.eu/chapter-5/'
    },
    bestPractice: 'SCC con provider. Cifratura end-to-end. Verificare che provider rispetti misure supplementari. Considerare data residency EU.',
    risk: 'Trasferimenti USA senza misure supplementari sono stati invalidati da Schrems II. Rischio multe.',
    example: 'AWS/Azure in USA: serve SCC + cifratura BYOK o considerare regioni EU.',
    externalLink: 'https://noyb.eu/en/project-schrems-ii'
  },
  'Server Proprietari': {
    simpleExplanation: 'Se i server sono nella tua azienda, devono essere fisicamente protetti. Chi può entrare nella stanza? C\'è controllo accessi? C\'è monitoraggio (telecamere, allarmi)? E devi avere backup regolari. Come quando proteggi un ufficio: controlli chi entra e quando.',
    question: 'I server sono fisicamente sicuri? Chi ha accesso? Hai monitoraggio?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 32',
      requirement: 'Misure tecniche e organizzative per sicurezza: accessi fisici, monitoraggio, backup',
      url: 'https://gdpr-info.eu/art-32-gdpr/'
    },
    bestPractice: 'Accessi fisici controllati. Monitoraggio continuo. Backup regolari. Disaster recovery plan.',
    risk: 'Server non protetti fisicamente o senza monitoraggio sono vulnerabili a accessi non autorizzati.',
    externalLink: 'https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/security/'
  },

  // --- OUTPUT ---
  'Decisione Automatica': {
    simpleExplanation: 'Quando un computer decide per te (es. rifiuta un prestito), hai il diritto di sapere perché e di chiedere a un umano di ricontrollare.',
    question: 'Gli utenti possono contestare la decisione? C\'è supervisione umana?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 22',
      requirement: 'Diritto di non essere sottoposto a decisioni basate unicamente su trattamento automatizzato. Diritto di contestazione.',
      url: 'https://gdpr-info.eu/art-22-gdpr/'
    },
    bestPractice: 'Meccanismo di contestazione chiaro e accessibile. Supervisione umana disponibile. Spiegazione della decisione.',
    risk: 'Decisioni automatiche senza possibilità di contestazione violano GDPR. Multe fino al 4% del fatturato.',
    example: 'Sistema che rifiuta prestito automaticamente senza possibilità di appello umano: viola GDPR Art. 22.',
    externalLink: 'https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/artificial-intelligence/guidance-on-ai-and-data-protection/automated-decision-making-and-profiling/'
  },
  'Interfaccia Chat': {
    simpleExplanation: 'Gli utenti devono sapere che stanno parlando con un sistema AI, non con una persona. È obbligatorio dirlo chiaramente. Non puoi far passare un chatbot per umano. Come quando compri un prodotto "finto": deve essere scritto chiaramente sulla confezione. L\'utente deve sapere con chi sta parlando.',
    question: 'Gli utenti sanno che stanno interagendo con un sistema AI?',
    regulation: {
      name: 'AI Act',
      article: 'Art. 50',
      requirement: 'Obbligo di trasparenza: informare utenti che interagiscono con AI',
      url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32021R2066'
    },
    bestPractice: 'Disclaimer chiaro e visibile. Spiegare limiti del sistema. Fornire informazioni su come funziona.',
    risk: 'Chatbot che si presenta come umano viola AI Act. Utenti possono fare scelte basate su false aspettative.',
    example: 'Chatbot che dice "Sono un operatore umano": viola AI Act. Deve dire chiaramente "Sono un assistente AI".',
    externalLink: 'https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai'
  },
  'Portale / API pubblica': {
    simpleExplanation: 'Se pubblichi dati pubblicamente (sito web, API), verifica che non ci siano informazioni personali. Anonimizza i dati (rimuovi nomi, ID, ecc.) o aggregali (statistiche, non dati individuali). Se qualcuno può risalire a una persona specifica, stai violando il GDPR. Come quando pubblichi statistiche: mostri i totali, non i nomi delle persone.',
    question: 'Hai verificato che i dati pubblicati non contengano informazioni personali?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 5(1)(f) & Art. 32',
      requirement: 'Integrità e riservatezza: dati pubblici non devono esporre dati personali',
      url: 'https://gdpr-info.eu/art-5-gdpr/'
    },
    bestPractice: 'Anonimizzare o aggregare dati prima di pubblicare. Verificare che dati pubblici non permettano re-identificazione.',
    risk: 'Pubblicare dati con informazioni personali viola GDPR. Può esporre individui a rischi.',
    example: 'API che espone dati con ID utente e informazioni personali: viola GDPR. Serve anonimizzazione.',
    externalLink: 'https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/key-definitions/what-is-personal-data/'
  },
  'Sistema di Notifiche': {
    simpleExplanation: 'Gli utenti devono poter controllare quali notifiche ricevono e quando. Devono poter disattivarle facilmente. Non bombardare gli utenti con notifiche senza controllo: vengono percepite come spam. Come le impostazioni di un\'app: l\'utente deve poter scegliere cosa vuole ricevere.',
    question: 'Gli utenti possono controllare quali notifiche ricevono? Possono disattivarle?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 7(3)',
      requirement: 'Diritto di revocare consenso e controllare trattamento dati',
      url: 'https://gdpr-info.eu/art-7-gdpr/'
    },
    bestPractice: 'Dashboard utente per gestire preferenze notifiche. Opzione per disattivare. Rispettare scelte utente immediatamente.',
    risk: 'Notifiche senza controllo utente possono essere percepite come spam o invasive.',
    externalLink: 'https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/individual-rights/right-to-object/'
  },
  'Dashboard Analitica': {
    simpleExplanation: 'Le dashboard con dati devono mostrare statistiche aggregate (totali, medie) quando possibile, non dati individuali. E solo chi ne ha davvero bisogno può accedere. Se mostri dati individuali a troppe persone, aumenti il rischio che qualcuno veda cose che non dovrebbe. Come quando mostri statistiche di vendita: totali, non nomi dei clienti.',
    question: 'I dati nella dashboard sono aggregati o individuali? Chi può accedervi?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 32',
      requirement: 'Limitazione accessi a chi ne ha bisogno. Dati aggregati quando possibile',
      url: 'https://gdpr-info.eu/art-32-gdpr/'
    },
    bestPractice: 'Usare dati aggregati quando possibile. Accesso individuale solo se necessario. Autenticazione forte. Audit trail.',
    risk: 'Dashboard con dati individuali accessibili a troppe persone aumenta rischio di data breach.',
    externalLink: 'https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/security/'
  },
  'Export Dati': {
    simpleExplanation: 'Quando esporti dati fuori dall\'Europa (es. a server americani), devi verificare che sia legale. Serve un contratto speciale (SCC) e cifratura. I trasferimenti non conformi possono essere bloccati e causare multe. Come quando spedisci qualcosa all\'estero: devi avere la documentazione giusta.',
    question: 'Hai verificato che i trasferimenti di dati siano conformi? Hai SCC?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 44-49',
      requirement: 'Export/trasferimenti extra-UE richiedono garanzie adeguate (SCC, BCR, ecc.)',
      url: 'https://gdpr-info.eu/chapter-5/'
    },
    bestPractice: 'Verificare destinazione dati. Usare SCC per trasferimenti. Cifratura end-to-end. Documentare tutto.',
    risk: 'Export non conformi possono essere invalidati, causando multe e interruzione servizio.',
    externalLink: 'https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/international-transfers/'
  },

  // --- BLOCKS FOR END USERS ---
  'ChatGPT': {
    simpleExplanation: 'ChatGPT è un sistema AI di OpenAI che funziona su server negli Stati Uniti. Quando usi ChatGPT, i tuoi dati vengono inviati in USA, dove le leggi permettono alla loro intelligence di accedervi. Questo può violare i tuoi diritti GDPR. Devi sapere che i dati vengono salvati e usati per migliorare il sistema.',
    question: 'Sapevi che ChatGPT salva i tuoi dati su server americani? Hai controllato le impostazioni privacy?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 44-49 (Schrems II)',
      requirement: 'Trasferimenti dati in USA richiedono protezioni speciali',
      url: 'https://gdpr-info.eu/chapter-5/'
    },
    bestPractice: 'Controlla le impostazioni privacy di ChatGPT. Evita di condividere dati sensibili. Considera alternative EU-hosted.',
    risk: 'I dati condivisi con ChatGPT vengono salvati in USA e possono essere accessibili alle autorità americane.',
    example: 'Se chiedi a ChatGPT di analizzare un documento aziendale confidenziale, quel documento viene salvato su server USA.',
    whatYouCanDo: [
      'Controlla le impostazioni privacy di ChatGPT: disattiva "Data training" se possibile',
      'Non condividere dati personali o aziendali sensibili con ChatGPT',
      'Chiedi alla tua azienda se è permesso usare ChatGPT per dati di lavoro',
      'Considera alternative con server europei (es. Mistral, LLaMA locale)'
    ],
    redFlags: [
      'Non sai se ChatGPT sta salvando le tue conversazioni',
      'Condividi dati aziendali confidenziali senza autorizzazione',
      'Non hai letto l\'informativa privacy di OpenAI',
      'Non hai disattivato il "Data training" nelle impostazioni'
    ],
    externalLink: 'https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/international-transfers/'
  },
  'Google Gemini': {
    simpleExplanation: 'Google Gemini è un sistema AI di Google. Quando lo usi, i tuoi dati vengono inviati a Google e possono essere salvati su server americani. Google può usare i tuoi dati per migliorare il sistema e per altri scopi. Devi sapere cosa condividi e dove vanno a finire.',
    question: 'Sapevi che Gemini salva i tuoi dati? Hai letto le condizioni di utilizzo?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 13-14',
      requirement: 'Google deve informarti su come usa i tuoi dati',
      url: 'https://gdpr-info.eu/art-13-gdpr/'
    },
    bestPractice: 'Leggi le condizioni di utilizzo. Controlla le impostazioni privacy. Evita dati sensibili.',
    risk: 'I dati condivisi con Gemini possono essere usati da Google per vari scopi, inclusi miglioramenti del sistema.',
    example: 'Se usi Gemini per analizzare documenti di lavoro, quei documenti possono essere salvati da Google.',
    whatYouCanDo: [
      'Leggi le condizioni di utilizzo e la privacy policy di Google',
      'Controlla le impostazioni privacy del tuo account Google',
      'Non condividere dati aziendali confidenziali senza autorizzazione',
      'Chiedi alla tua azienda se è permesso usare Gemini per dati di lavoro'
    ],
    redFlags: [
      'Non sai se Google salva i tuoi dati',
      'Condividi dati di lavoro senza autorizzazione',
      'Non hai letto la privacy policy di Google',
      'Non controlli le impostazioni privacy del tuo account'
    ],
    externalLink: 'https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/individual-rights/right-to-be-informed/'
  },
  'Claude': {
    simpleExplanation: 'Claude è un sistema AI di Anthropic. Quando lo usi, i tuoi dati vengono inviati a Anthropic e possono essere salvati. Anthropic promette di proteggere meglio la privacy rispetto ad altri, ma devi sempre sapere cosa condividi. Controlla le loro politiche privacy.',
    question: 'Hai letto la politica privacy di Claude? Sapevi dove vengono salvati i tuoi dati?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 13-14',
      requirement: 'Devi essere informato su come vengono usati i tuoi dati',
      url: 'https://gdpr-info.eu/art-13-gdpr/'
    },
    bestPractice: 'Leggi la politica privacy di Anthropic. Controlla le impostazioni. Evita dati molto sensibili.',
    risk: 'Anche se Anthropic è più attenta alla privacy, i dati vengono comunque inviati e salvati.',
    example: 'Se usi Claude per lavorare con documenti confidenziali, quei documenti vengono comunque inviati ai server di Anthropic.',
    externalLink: 'https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/individual-rights/right-to-be-informed/'
  },
  'I Miei Dati Personali': {
    simpleExplanation: 'I tuoi dati personali (nome, email, indirizzo) sono preziosi e devono essere protetti. Quando li condividi con un sistema AI, devi sapere dove finiscono e come vengono usati. Hai diritto a saperlo e a chiedere che vengano cancellati.',
    question: 'Hai letto come il sistema usa i tuoi dati personali? Puoi chiedere che vengano cancellati?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 13-14 & Art. 17',
      requirement: 'Hai diritto a sapere come vengono usati i tuoi dati e a chiederne la cancellazione',
      url: 'https://gdpr-info.eu/art-13-gdpr/'
    },
    bestPractice: 'Leggi sempre l\'informativa privacy prima di condividere dati. Usa solo servizi che ti permettono di cancellare i tuoi dati quando vuoi.',
    risk: 'Se condividi i tuoi dati personali senza sapere come vengono usati, potrebbero essere venduti o usati male.',
    example: 'Se inserisci il tuo nome e email in ChatGPT, quei dati vengono salvati e possono essere usati da OpenAI.',
    whatYouCanDo: [
      'Leggi sempre l\'informativa privacy prima di condividere dati personali',
      'Chiedi al fornitore del servizio di cancellare i tuoi dati se non vuoi più usarli',
      'Usa solo servizi che ti permettono di controllare e cancellare i tuoi dati',
      'Non condividere più dati del necessario: valuta sempre se è davvero necessario'
    ],
    redFlags: [
      'Non hai letto l\'informativa privacy prima di condividere dati',
      'Il servizio non ti permette di cancellare i tuoi dati',
      'Condividi dati personali senza sapere come vengono usati',
      'Non sai come chiedere la cancellazione dei tuoi dati'
    ],
    externalLink: 'https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/individual-rights/right-to-erasure/'
  },
  'Dati di Lavoro': {
    simpleExplanation: 'I dati di lavoro (documenti aziendali, informazioni su clienti, ecc.) sono spesso confidenziali. Quando li condividi con un sistema AI, stai potenzialmente violando la confidenzialità. Devo verificare con la tua azienda se è permesso. I dati di lavoro finiscono spesso su server americani, dove possono essere accessibili ad altre persone.',
    question: 'La tua azienda ti permette di condividere dati di lavoro con sistemi AI? Hai verificato le policy aziendali?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 32 & Art. 28',
      requirement: 'Dati aziendali devono essere protetti. Condividerli con fornitori richiede accordi specifici',
      url: 'https://gdpr-info.eu/art-28-gdpr/'
    },
    bestPractice: 'Verifica con il tuo capo o IT aziendale se puoi usare sistemi AI per dati di lavoro. Usa solo strumenti approvati dall\'azienda.',
    risk: 'Condividere dati di lavoro con sistemi AI non autorizzati può violare la confidenzialità e causare problemi legali.',
    example: 'Se condividi un documento con informazioni su clienti con ChatGPT, stai potenzialmente violando la confidenzialità dei dati.',
    externalLink: 'https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/controllers-and-processors/'
  },
  'Cloud Server (USA)': {
    simpleExplanation: 'I dati salvati su server americani (come AWS, Google Cloud in USA) possono essere accessibili alle autorità americane senza mandato del giudice. Questo viola i tuoi diritti GDPR. Se possibile, preferisci server europei.',
    question: 'Sapevi che i dati su server USA possono essere accessibili alle autorità americane? Hai alternative con server europei?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 44-49 (Schrems II)',
      requirement: 'Trasferimenti dati in USA richiedono protezioni speciali perché le leggi USA permettono accesso delle autorità',
      url: 'https://gdpr-info.eu/chapter-5/'
    },
    bestPractice: 'Chiedi al fornitore del servizio dove vengono salvati i dati. Preferisci server europei quando possibile.',
    risk: 'I dati su server USA possono essere accessibili alle autorità americane (NSA, FBI) senza che tu lo sappia.',
    example: 'ChatGPT salva i dati su server USA: se condividi informazioni sensibili, possono essere accessibili alle autorità americane.',
    whatYouCanDo: [
      'Chiedi al fornitore del servizio dove vengono salvati i dati (controlla l\'informativa privacy)',
      'Preferisci servizi con server europei quando possibile',
      'Evita di condividere dati molto sensibili con servizi che usano server USA',
      'Considera alternative con data residency europea'
    ],
    redFlags: [
      'Il servizio non dice chiaramente dove vengono salvati i dati',
      'Salvi dati sensibili su servizi USA senza saperlo',
      'Non hai alternative con server europei',
      'Non sai che le autorità USA possono accedere ai tuoi dati senza mandato'
    ],
    externalLink: 'https://noyb.eu/en/schrems-ii'
  },
  'Sul Mio Computer': {
    simpleExplanation: 'Se i dati sono salvati solo sul tuo computer, sono più al sicuro perché non viaggiano su internet. Ma devi comunque proteggerli con password e backup. Se il computer viene rubato o si rompe, i dati possono essere persi.',
    question: 'Hai password e backup per proteggere i dati sul tuo computer? Cosa succede se il computer si rompe?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 32',
      requirement: 'Dati devono essere protetti anche quando sono sul tuo dispositivo',
      url: 'https://gdpr-info.eu/art-32-gdpr/'
    },
    bestPractice: 'Usa password forti sul computer. Fai backup regolari. Cifra i dati sensibili. Mantieni il software aggiornato.',
    risk: 'Dati sul computer senza password o backup possono essere rubati o persi se il computer si rompe.',
    example: 'Se salvi dati di lavoro sul laptop senza password, chiunque può accedervi se il laptop viene rubato.',
    externalLink: 'https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/security/'
  },
  'Storage Sconosciuto': {
    simpleExplanation: 'Se non sai dove vengono salvati i tuoi dati, questo è un rischio. Non sai chi può accedervi, quali leggi si applicano, o come vengono protetti. Dovresti sempre sapere dove finiscono i tuoi dati.',
    question: 'Hai mai chiesto al fornitore del servizio dove vengono salvati i tuoi dati? Perché non l\'hai controllato?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 13-14',
      requirement: 'Hai diritto a sapere dove vengono salvati i tuoi dati',
      url: 'https://gdpr-info.eu/art-13-gdpr/'
    },
    bestPractice: 'Leggi sempre l\'informativa privacy del servizio. Cerca informazioni su dove vengono salvati i dati. Chiedi al supporto se non è chiaro.',
    risk: 'Non sapere dove vengono salvati i dati significa non sapere chi può accedervi o come vengono protetti.',
    example: 'Molte persone non sanno che ChatGPT salva i dati su server USA. Dovrebbero leggerlo nell\'informativa privacy.',
    externalLink: 'https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/individual-rights/right-to-be-informed/'
  },
  'Email Scritta': {
    simpleExplanation: 'Quando usi AI per scrivere email, i contenuti che generi possono contenere informazioni personali o aziendali. Questi contenuti vengono inviati al sistema AI e possono essere salvati. Devi sapere cosa condividi.',
    question: 'Quando usi AI per scrivere email, condividi dati personali o aziendali? Sai dove finiscono quei dati?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 13-14',
      requirement: 'Hai diritto a sapere come vengono usati i tuoi dati',
      url: 'https://gdpr-info.eu/art-13-gdpr/'
    },
    bestPractice: 'Evita di condividere dati sensibili quando generi email con AI. Controlla cosa invii al sistema.',
    risk: 'Le email generate con AI possono contenere informazioni personali che vengono salvate dal sistema.',
    example: 'Se chiedi a ChatGPT di scrivere un\'email con informazioni su un cliente, quelle informazioni vengono salvate.',
    externalLink: 'https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/individual-rights/right-to-be-informed/'
  },
  'Documenti Analizzati': {
    simpleExplanation: 'Quando usi AI per analizzare documenti, condividi tutto il contenuto del documento con il sistema. Se il documento contiene dati personali, confidenziali o sensibili, stai esponendo quei dati. Devi essere consapevole di cosa condividi.',
    question: 'Hai verificato che i documenti che analizzi non contengano dati sensibili o confidenziali? La tua azienda lo permette?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 32 & Art. 28',
      requirement: 'Dati confidenziali devono essere protetti. Condividere con fornitori richiede accordi',
      url: 'https://gdpr-info.eu/art-28-gdpr/'
    },
    bestPractice: 'Non condividere documenti con dati personali o confidenziali con sistemi AI non autorizzati. Verifica con la tua azienda.',
    risk: 'Analizzare documenti confidenziali con AI non autorizzata può violare la confidenzialità e causare problemi legali.',
    example: 'Se condividi un contratto con dati di clienti con Gemini, stai potenzialmente violando la confidenzialità.',
    externalLink: 'https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/controllers-and-processors/'
  },
  'Codice Generato': {
    simpleExplanation: 'Quando usi AI per generare codice, il codice può contenere errori o vulnerabilità di sicurezza. Inoltre, potrebbe usare codice protetto da copyright. Devi sempre controllare il codice generato e verificare che sia sicuro.',
    question: 'Hai controllato il codice generato da AI per errori o vulnerabilità? Hai verificato che non violi copyright?',
    regulation: {
      name: 'Copyright & Licenze',
      article: 'Varie',
      requirement: 'Codice generato può contenere parti protette da copyright',
      url: 'https://opensource.org/licenses/'
    },
    bestPractice: 'Sempre revisionare e testare codice generato da AI. Verificare che non contenga codice protetto. Testare per vulnerabilità.',
    risk: 'Codice generato da AI può contenere bug, vulnerabilità di sicurezza o violare copyright.',
    example: 'Codice generato da Copilot potrebbe contenere parti di codice protetto da copyright o vulnerabilità.',
    externalLink: 'https://opensource.org/licenses/'
  },
  'Cloud Server (EU)': {
    simpleExplanation: 'I dati salvati su server europei sono più protetti dal GDPR. Le leggi europee proteggono meglio i tuoi diritti rispetto a quelle di altri paesi. Ma devi comunque verificare che i dati siano cifrati e che solo persone autorizzate possano accedervi.',
    question: 'Hai verificato che i dati su server europei siano cifrati? Chi può accedervi?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 32',
      requirement: 'Dati devono essere cifrati e accessi limitati, anche su server EU',
      url: 'https://gdpr-info.eu/art-32-gdpr/'
    },
    bestPractice: 'Preferisci sempre server europei quando possibile. Verifica che i dati siano cifrati. Controlla chi ha accesso.',
    risk: 'Anche su server EU, i dati devono essere protetti con cifratura e accessi limitati.',
    example: 'Server europei sono più sicuri, ma i dati devono comunque essere cifrati e protetti.',
    externalLink: 'https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/security/'
  },
};

/**
 * Get educational knowledge for a block based on its type and label
 * @param block - The block to get knowledge for
 * @param userMode - Optional: 'use' for end users, 'design' for designers
 * @param locale - Optional: locale for translation ('it' | 'en')
 */
export function getBlockKnowledge(
  block: { type: string; label: string },
  userMode?: 'use' | 'design',
  locale: 'it' | 'en' = 'it'
): BlockKnowledge | null {
  // Get Italian knowledge first (source of truth)
  let knowledge: BlockKnowledge | null = null;
  
  // First try label-specific knowledge
  if (LABEL_KNOWLEDGE[block.label]) {
    knowledge = LABEL_KNOWLEDGE[block.label];
  } else {
    // Fallback to type-specific knowledge - usa la versione corretta in base al ruolo
    if (userMode === 'use') {
      if (TYPE_KNOWLEDGE_USER[block.type]) {
        knowledge = TYPE_KNOWLEDGE_USER[block.type];
      }
    } else {
      if (TYPE_KNOWLEDGE_DESIGNER[block.type]) {
        knowledge = TYPE_KNOWLEDGE_DESIGNER[block.type];
      }
    }
    
    // Fallback ulteriore se non esiste la versione specifica
    if (!knowledge && TYPE_KNOWLEDGE_DESIGNER[block.type]) {
      knowledge = TYPE_KNOWLEDGE_DESIGNER[block.type];
    }
  }
  
  if (!knowledge) return null;
  
  // If locale is 'it', return as-is
  if (locale === 'it') {
    return knowledge;
  }
  
  // For 'en', try to translate
  if (locale === 'en') {
    // Dynamic import to avoid circular dependencies
    const { translateBlockKnowledge } = require('@/lib/i18n/blockKnowledgeTranslations');
    const translated = translateBlockKnowledge(knowledge, block.label, block.type, userMode);
    return translated || knowledge; // Use Italian as fallback if no translation
  }
  
  return knowledge;
}

/**
 * Get a critical question for the block (fallback to generic if not found)
 * @param block - The block to get question for
 * @param userMode - Optional: 'use' for end users, 'design' for designers
 */
export function getBlockQuestion(
  block: { type: string; label: string },
  userMode?: 'use' | 'design'
): string {
  const knowledge = getBlockKnowledge(block, userMode);
  if (knowledge?.question) {
    return knowledge.question;
  }

  // Generic questions based on type and mode
  const genericQuestionsDesigner: Record<string, string> = {
    input: 'Da dove arrivano questi dati? Chi li raccoglie e perché?',
    process: 'Come funziona questo processo? È trasparente?',
    storage: 'Dove sono conservati i dati? Sono sicuri?',
    output: 'Cosa vede l\'utente? Può contestare le decisioni?',
  };

  const genericQuestionsUser: Record<string, string> = {
    input: 'Sai perché questo sistema raccoglie questi dati? Hai dato il consenso?',
    process: 'Sai come funziona questo sistema? Capisci perché prende certe decisioni?',
    storage: 'Sai dove vengono salvati i tuoi dati? Sono in Europa o in altri paesi?',
    output: 'Se il sistema prende una decisione importante su di te, puoi contestarla?',
  };

  const questions = userMode === 'use' ? genericQuestionsUser : genericQuestionsDesigner;
  return questions[block.type] || (userMode === 'use' 
    ? 'Hai considerato tutti i rischi e i tuoi diritti?' 
    : 'Hai considerato tutti gli aspetti normativi e di sicurezza?');
}

