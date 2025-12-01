/**
 * Knowledge base for whiteboard notes to enhance critical thinking and awareness
 * Maps risk/impact block labels to educational content
 */

export type NoteKnowledge = {
  simpleExplanation?: string; // Spiegazione divulgativa per utenti finali
  question?: string; // Domanda orientata all'utente finale (non al progettista)
  regulation?: {
    name: string;
    article: string;
    requirement: string;
    url?: string;
  };
  bestPractice?: string; // Per progettisti (riferimento tecnico)
  risk?: string; // What could go wrong
  example?: string; // Real-world example
  externalLink?: string; // Link esterno per approfondimento
  whatYouCanDo?: string[]; // Cosa puoi fare come utente finale
  redFlags?: string[]; // Segnali di allarme da riconoscere
};

const NOTE_KNOWLEDGE: Record<string, NoteKnowledge> = {
  // --- RISK: Supervisione Umana ---
  'Supervisione Umana': {
    simpleExplanation: 'Non lasciare che sia solo la macchina a decidere. Una persona deve sempre poter controllare e correggere le scelte importanti.',
    question: 'Se il sistema prende una decisione su di te (es. rifiuta un prestito), c\'è qualcuno che la controlla? Puoi chiedere una revisione?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 22',
      requirement: 'Diritto di non essere sottoposto a decisioni basate unicamente su trattamento automatizzato',
      url: 'https://gdpr-info.eu/art-22-gdpr/'
    },
    bestPractice: 'Definire un processo di revisione umana per le decisioni ad alto impatto. Documentare chi, quando e come interviene.',
    risk: 'Senza supervisione, errori del sistema possono avere conseguenze gravi senza possibilità di correzione.',
    example: 'Un sistema di credit scoring che rifiuta automaticamente prestiti senza possibilità di appello umano viola il GDPR.',
    whatYouCanDo: [
      'Leggere le condizioni del servizio per vedere se c\'è revisione umana',
      'Chiedere al fornitore come puoi contestare decisioni automatiche',
      'Esercitare il tuo diritto GDPR (Art. 22) di non essere soggetto a decisioni solo automatiche'
    ],
    redFlags: [
      'Il sistema decide tutto automaticamente senza possibilità di appello',
      'Non c\'è modo di parlare con una persona se qualcosa va storto',
      'Non ti hanno informato che le decisioni sono automatiche'
    ],
    externalLink: 'https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/artificial-intelligence/guidance-on-ai-and-data-protection/automated-decision-making-and-profiling/'
  },
  'Comitato Etico': {
    simpleExplanation: 'Un gruppo di persone diverse (legali, tecnici, rappresentanti dei cittadini) che controlla che il sistema sia giusto e non discrimini nessuno. Come un consiglio di amministrazione per l\'etica.',
    question: 'Sai chi controlla che il sistema sia giusto? Ci sono persone diverse (non solo tecnici) che lo verificano?',
    regulation: {
      name: 'AI Act',
      article: 'Art. 14',
      requirement: 'Sistemi ad alto rischio devono avere governance e supervisione umana',
      url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32021R2066'
    },
    bestPractice: 'Includere esperti di etica, diritto, tecnologia e rappresentanti delle comunità interessate. Riunioni periodiche documentate.',
    risk: 'Comitati solo tecnici possono trascurare impatti sociali e discriminazioni.',
    externalLink: 'https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai'
  },
  'DPO (Data Protection Officer)': {
    simpleExplanation: 'È la persona responsabile della protezione dei dati nell\'organizzazione. Come un consulente interno che ti aiuta a rispettare la privacy e ti avvisa se stai facendo qualcosa di sbagliato. Obbligatorio per enti pubblici e grandi aziende.',
    question: 'Sai chi è il responsabile della protezione dei tuoi dati in questa organizzazione? Puoi contattarlo per dubbi sulla privacy?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 37-39',
      requirement: 'Obbligatorio per enti pubblici o trattamenti su larga scala di dati sensibili',
      url: 'https://gdpr-info.eu/art-37-gdpr/'
    },
    bestPractice: 'Il DPO deve essere indipendente, avere competenze legali/tecniche e accesso diretto al top management.',
    risk: 'DPO senza indipendenza o competenze adeguate non può svolgere efficacemente il suo ruolo.',
    externalLink: 'https://edpb.europa.eu/our-work-tools/general-guidance/data-protection-officer-dpo_en'
  },

  // --- RISK: Consenso e Privacy ---
  'Perimetro Consenso': {
    simpleExplanation: 'Il consenso è come un contratto: deve essere chiaro, libero (non forzato) e si può cancellare quando si vuole.',
    question: 'Quando hai accettato di usare questo sistema, sapevi esattamente cosa avrebbero fatto con i tuoi dati? Puoi dire "no" quando vuoi?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 6-7',
      requirement: 'Consenso deve essere esplicito, documentato e revocabile in qualsiasi momento',
      url: 'https://gdpr-info.eu/art-7-gdpr/'
    },
    bestPractice: 'Usare linguaggio chiaro, separare consensi per finalità diverse, rendere facile la revoca. Evitare pre-ticked boxes.',
    risk: 'Consensi non validi rendono tutto il trattamento illecito, con multe fino al 4% del fatturato.',
    example: 'Un sito che pre-seleziona "Accetto cookie" senza possibilità di rifiuto non ha un consenso valido.',
    externalLink: 'https://edpb.europa.eu/our-work-tools/our-documents/guidelines/guidelines-052020-consent-under-regulation-2016679_en'
  },
  'Consenso Esplicito': {
    simpleExplanation: 'Per dati molto sensibili (salute, religione, opinioni politiche) serve un consenso ancora più chiaro e consapevole. Ma ricordati: puoi anche usare altre basi legali (come "necessità medica" per un ospedale).',
    question: 'Hai dato il consenso per dati molto sensibili (salute, religione)? Era chiaro e puoi revocarlo quando vuoi?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 9(2)',
      requirement: 'Per dati sensibili serve consenso esplicito O altra base giuridica (es. necessità medica)',
      url: 'https://gdpr-info.eu/art-9-gdpr/'
    },
    bestPractice: 'Per dati sanitari, considerare anche "necessità medica" o "interesse pubblico" come alternative al consenso.',
    risk: 'Consenso come unica base giuridica è fragile: se revocato, tutto il trattamento deve fermarsi.',
    externalLink: 'https://edpb.europa.eu/our-work-tools/our-documents/guidelines/guidelines-052020-consent-under-regulation-2016679_en'
  },
  'Consenso Registrazione': {
    simpleExplanation: 'Se registri le conversazioni (chiamate, chat vocali), devi dirlo PRIMA di iniziare e dare la possibilità di rifiutare. Come quando un call center ti dice "questa chiamata sarà registrata".',
    question: 'Gli utenti sanno che vengono registrati? Possono rifiutare?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 13-14',
      requirement: 'Obbligo di informare PRIMA della raccolta: chi, cosa, perché, per quanto tempo',
      url: 'https://gdpr-info.eu/art-13-gdpr/'
    },
    bestPractice: 'Informativa chiara prima della registrazione. Opzione "solo ascolto senza registrazione" quando possibile.',
    risk: 'Registrazioni nascoste o senza consenso sono illecite e possono comportare sanzioni penali.',
    externalLink: 'https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/at-a-glance/privacy-notices-transparency-and-control/'
  },
  'Privacy by Design': {
    simpleExplanation: 'Pensa alla privacy fin dall\'inizio, come quando costruisci una casa: è più facile mettere le porte blindate durante la costruzione che aggiungerle dopo. Raccogli solo i dati necessari e rendi difficile identificare le persone.',
    question: 'Quanti dati personali stai condividendo? Il sistema raccoglie solo quello che serve o anche di più? I tuoi dati sono protetti (difficili da identificare)?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 25',
      requirement: 'Privacy by design: protezione dati fin dalla progettazione, minimizzazione, pseudonimizzazione',
      url: 'https://gdpr-info.eu/art-25-gdpr/'
    },
    bestPractice: 'Raccogliere solo dati strettamente necessari. Separare identificativi dai dati sensibili. Usare token al posto di ID diretti.',
    risk: 'Raccogliere dati in eccesso aumenta superficie di attacco e violazioni GDPR.',
    example: 'Invece di salvare "Mario Rossi, 35 anni, diabetico", salvare "ID_ABC123, categoria_rischio_3" (pseudonimizzato).',
    externalLink: 'https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/accountability-and-governance/data-protection-by-design-and-default/'
  },

  // --- RISK: Sicurezza e Accessi ---
  'Sicurezza Informatica': {
    simpleExplanation: 'Proteggi i dati come se fossero gioielli in cassaforte: chiudi a chiave (cifratura) e controlla chi entra (accessi).',
    question: 'Dove vengono salvati i tuoi dati? Sono protetti (come una cassaforte)? Cosa succede se qualcuno li ruba? Hai mai chiesto al fornitore come protegge i tuoi dati?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 32',
      requirement: 'Misure tecniche e organizzative appropriate: cifratura, pseudonimizzazione, test regolari',
      url: 'https://gdpr-info.eu/art-32-gdpr/'
    },
    bestPractice: 'Cifratura end-to-end, accessi basati su ruoli (RBAC), monitoraggio continuo, test di penetrazione annuali.',
    risk: 'Violazioni di sicurezza possono esporre dati sensibili, causare danni reputazionali e multe GDPR.',
    example: 'Un database non cifrato con password deboli può essere compromesso in minuti da attaccanti.',
    externalLink: 'https://www.enisa.europa.eu/topics/data-protection'
  },
  'Controllo Accessi e Audit': {
    simpleExplanation: 'Come in un ufficio, non tutti possono accedere a tutto. Solo chi ne ha bisogno può vedere certi dati. E ogni accesso viene registrato (come un registro delle visite): chi, quando, cosa ha fatto.',
    question: 'Sai chi può vedere i tuoi dati? Quante persone hanno accesso? Puoi sapere chi ha guardato i tuoi dati e quando?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 32',
      requirement: 'Tracciabilità degli accessi, limitazione accessi a chi ne ha bisogno',
      url: 'https://gdpr-info.eu/art-32-gdpr/'
    },
    bestPractice: 'Principio del minimo privilegio. Log di tutti gli accessi con timestamp, IP, azione. Revisioni periodiche.',
    risk: 'Accessi non controllati permettono data breaches interni. Senza audit trail, impossibile investigare incidenti.',
    externalLink: 'https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/security/'
  },
  'Audit Trail': {
    simpleExplanation: 'È come il registro delle attività del sistema: chi ha fatto cosa, quando e perché. Serve per dimostrare che stai rispettando le regole e per capire cosa è successo se qualcosa va storto. Come le telecamere in un negozio.',
    question: 'Se qualcosa va storto con i tuoi dati, si può risalire a chi ha fatto cosa? C\'è un registro di tutte le operazioni?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 5(2)',
      requirement: 'Accountability: dimostrare conformità, tracciare tutte le operazioni',
      url: 'https://gdpr-info.eu/art-5-gdpr/'
    },
    bestPractice: 'Log immutabili, conservati per periodo legale, accessibili solo a DPO/auditor. Include: chi, cosa, quando, perché.',
    risk: 'Senza audit trail, impossibile dimostrare conformità GDPR o investigare incidenti.',
    externalLink: 'https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/accountability-and-governance/'
  },
  'Audit Trail Completo': {
    simpleExplanation: 'Non registrare solo chi entra, ma anche chi modifica, copia o cancella dati. Come un registro completo di tutte le attività, non solo degli accessi.',
    question: 'I log includono anche modifiche ai dati e alle configurazioni?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 5(2)',
      requirement: 'Accountability: dimostrare conformità, tracciare tutte le operazioni',
      url: 'https://gdpr-info.eu/art-5-gdpr/'
    },
    bestPractice: 'Tracciare: accessi, modifiche dati, cambi configurazione, export, cancellazioni. Conservare per 7-10 anni.',
    risk: 'Log incompleti rendono impossibile ricostruire eventi o dimostrare conformità.',
    externalLink: 'https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/accountability-and-governance/'
  },

  // --- RISK: Trasferimenti e Storage ---
  'Supervisione Transfer': {
    simpleExplanation: 'Quando sposti dati fuori dall\'Europa, assicurati che siano protetti come se fossero ancora qui. Le regole viaggiano con i dati.',
    question: 'I tuoi dati vengono salvati in Europa o all\'estero? Sai quali rischi comporta salvarli fuori dall\'UE (es. Stati Uniti)?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 44-49 (Schrems II)',
      requirement: 'Trasferimenti extra-UE richiedono SCC + misure supplementari o sono a rischio invalidazione',
      url: 'https://gdpr-info.eu/chapter-5/'
    },
    bestPractice: 'Verificare adeguatezza paese (es. UK post-Brexit). Usare SCC + cifratura end-to-end. Considerare data residency EU.',
    risk: 'Trasferimenti verso USA senza misure supplementari sono stati invalidati da Schrems II. Rischio multe.',
    example: 'Google Analytics trasferisce dati in USA: molti siti EU lo hanno rimosso o adottato proxy EU.',
    externalLink: 'https://noyb.eu/en/schrems-ii'
  },
  'Conservazione e Cancellazione': {
    simpleExplanation: 'Non tenere i dati per sempre. Decidi per quanto tempo ti servono (es. 1 anno per i CV) e poi cancellali automaticamente. Come quando fai spazio sul telefono: cancelli le foto vecchie che non servono più.',
    question: 'Per quanto tempo vengono conservati i tuoi dati? Cosa succede dopo? Vengono cancellati automaticamente?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 5(1)(e)',
      requirement: 'Limitation: conservare solo per tempo necessario alle finalità',
      url: 'https://gdpr-info.eu/art-5-gdpr/'
    },
    bestPractice: 'Definire policy di retention per tipo di dato. Automatizzare cancellazione dopo scadenza. Documentare eccezioni.',
    risk: 'Conservare dati oltre il necessario viola GDPR e aumenta superficie di attacco.',
    example: 'Dati di candidati non assunti: conservare max 1 anno, poi cancellazione automatica.',
    externalLink: 'https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/principles/storage-limitation/'
  },
  'Backup e Ripristino': {
    simpleExplanation: 'Avere una copia di sicurezza dei dati (come fare una fotocopia importante). Ma attenzione: anche le copie devono essere protette (cifrate) e devi saperle ripristinare davvero (non fidarti che funzionino, provale!).',
    question: 'Cosa succede se i tuoi dati vengono persi? Ci sono copie di sicurezza? Sono protette?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 32',
      requirement: 'Misure tecniche per integrità e disponibilità: backup, disaster recovery',
      url: 'https://gdpr-info.eu/art-32-gdpr/'
    },
    bestPractice: 'Backup cifrati, testati regolarmente, conservati separatamente. Piano di disaster recovery documentato e testato.',
    risk: 'Backup non cifrati o non testati possono esporre dati o rendere impossibile il ripristino.',
    externalLink: 'https://www.enisa.europa.eu/topics/incident-response/backup-recovery'
  },

  // --- RISK: Compliance ---
  'DPIA (Data Protection Impact Assessment)': {
    simpleExplanation: 'È una valutazione che fai PRIMA di iniziare un progetto: "Cosa potrebbe andare storto con i dati? Come lo prevengo?". Come fare un controllo prima di comprare una casa. Obbligatorio per progetti rischiosi (riconoscimento facciale, profilazione massiva, ecc.).',
    question: 'Hai mai chiesto quali rischi comporta l\'uso di questo sistema? Hanno fatto una valutazione prima di iniziare?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 35',
      requirement: 'Obbligatorio per trattamenti ad alto rischio: dati sensibili, profilazione, monitoraggio sistematico',
      url: 'https://gdpr-info.eu/art-35-gdpr/'
    },
    bestPractice: 'DPIA deve essere fatto PRIMA del trattamento. Coinvolgere DPO, esperti tecnici e legali. Documentare rischi e mitigazioni.',
    risk: 'DPIA mancante o insufficiente può bloccare il progetto o causare multe. Obbligatorio consultare autorità se rischi residui alti.',
    example: 'Un sistema di riconoscimento facciale in luoghi pubblici richiede DPIA obbligatorio.',
    externalLink: 'https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/accountability-and-governance/data-protection-impact-assessments-dpias/'
  },
  'Linee Guida Legali': {
    simpleExplanation: 'Scrivi regole chiare e semplici su come gestire i dati. Come un manuale d\'istruzioni per i dipendenti. Devono essere aggiornate quando cambiano le leggi e tutti devono conoscerle.',
    question: 'Le linee guida sono aggiornate? Tutti i team le conoscono?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 24',
      requirement: 'Responsabile del trattamento deve adottare misure tecniche e organizzative appropriate',
      url: 'https://gdpr-info.eu/art-24-gdpr/'
    },
    bestPractice: 'Linee guida chiare, aggiornate, accessibili a tutti. Training regolari. Processo di aggiornamento quando cambiano leggi.',
    risk: 'Linee guida obsolete o non conosciute portano a violazioni involontarie.',
    externalLink: 'https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/accountability-and-governance/'
  },
  'Revisioni Periodiche': {
    simpleExplanation: 'Controlla regolarmente il sistema (ogni 3-6 mesi): chi ha accesso? I dati sono ancora necessari? La sicurezza funziona? Come la revisione annuale dell\'auto: previeni problemi prima che diventino gravi.',
    question: 'Con quale frequenza rivedi il sistema? Cosa controlli?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 5(2)',
      requirement: 'Accountability: dimostrare conformità continua',
      url: 'https://gdpr-info.eu/art-5-gdpr/'
    },
    bestPractice: 'Revisioni trimestrali o semestrali. Verificare: accessi, log, consensi, retention, sicurezza. Documentare tutto.',
    risk: 'Senza revisioni, problemi si accumulano e conformità si degrada nel tempo.',
    externalLink: 'https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/accountability-and-governance/'
  },
  'Norme e Verifiche Legali': {
    simpleExplanation: 'Verifica che il tuo sistema rispetti tutte le leggi: GDPR, AI Act, leggi italiane. Come un controllo tecnico: non puoi guidare senza. Se non rispetti le regole, rischi multe pesanti (fino a 35 milioni di euro!).',
    question: 'Hai verificato conformità GDPR, AI Act, leggi nazionali?',
    regulation: {
      name: 'AI Act',
      article: 'Art. 10-15',
      requirement: 'Sistemi ad alto rischio: registrazione, marcatura CE, sistema qualità, human oversight',
      url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32021R2066'
    },
    bestPractice: 'Checklist di conformità per ogni regolamento. Coinvolgere consulenti legali specializzati. Documentare verifiche.',
    risk: 'Non conformità può bloccare il sistema, causare multe (fino a 35M€ o 7% fatturato per AI Act).',
    externalLink: 'https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai'
  },

  // --- IMPACT: Energia e Ambiente ---
  'Consumo di Energia': {
    simpleExplanation: 'L\'AI consuma molta elettricità. Cerca di usare modelli efficienti e fonti rinnovabili per ridurre l\'impatto sul pianeta.',
    question: 'Quanto consuma il sistema? Hai considerato alternative più efficienti?',
    regulation: {
      name: 'AI Act',
      article: 'Art. 60',
      requirement: 'Sistemi ad alto rischio devono documentare impatto ambientale',
      url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32021R2066'
    },
    bestPractice: 'Misurare consumo reale (non solo teorico). Considerare modelli più piccoli, quantizzazione, edge computing. Usare energia rinnovabile.',
    risk: 'Modelli LLM enormi consumano quanto migliaia di case. Impatto ambientale significativo.',
    example: 'GPT-3 training ha consumato ~1.3 GWh. Un modello più piccolo come BERT può essere 1000x più efficiente.',
    externalLink: 'https://huggingface.co/blog/carbon-emissions-on-the-hub'
  },
  'Dipendenze Geopolitiche': {
    simpleExplanation: 'Molte infrastrutture digitali (cloud, data center, chip) dipendono da pochi paesi o attori globali. Se cambiano i rapporti geopolitici o scoppiano crisi, servizi critici possono fermarsi improvvisamente.',
    question: 'Il sistema dipende da tecnologie o infrastrutture concentrate in pochi paesi (es. produzione di chip, cloud extra-UE)? Cosa succede se quelle risorse diventano meno disponibili?',
    regulation: {
      name: 'Strategia Digitale UE',
      article: 'Resilienza e sovranità digitale',
      requirement: 'Ridurre dipendenze critiche da fornitori extra-UE e aumentare la resilienza delle infrastrutture digitali',
      url: 'https://digital-strategy.ec.europa.eu/'
    },
    bestPractice: 'Mappare i punti di dipendenza geopolitica (cloud provider, supply chain hardware, piattaforme terze) e prevedere alternative locali o europee.',
    risk: 'Crisi geopolitiche (conflitti, sanzioni, blocchi commerciali) possono interrompere servizi essenziali, con impatti su cittadini, imprese e pubbliche amministrazioni.',
    example: 'Una città che basa i servizi essenziali solo su un cloud extra-UE senza piano B può trovarsi improvvisamente senza piattaforma in caso di sanzioni o blocchi.',
    whatYouCanDo: [
      'Identifica i fornitori critici del sistema (cloud, chip, piattaforme) e dove sono localizzati.',
      'Valuta opzioni alternative europee o on-prem per i servizi più critici.',
      'Inserisci la resilienza geopolitica come criterio nelle gare e nei contratti con i fornitori.'
    ],
    redFlags: [
      'Dipendenza da un solo grande provider extra-UE senza alternative.',
      'Assenza di analisi di rischio geopolitico nelle scelte infrastrutturali.',
      'Contratti che non prevedono piani di continuità in caso di crisi internazionali.'
    ],
    externalLink: 'https://digital-strategy.ec.europa.eu/en/policies/eu-digital-sovereignty'
  },
  'Supply Chain Critica': {
    simpleExplanation: 'Il funzionamento del sistema può dipendere da catene di fornitura lunghe e fragili (es. componenti hardware prodotti in poche regioni del mondo). Una crisi in un punto della catena può bloccare tutto.',
    question: 'Hai valutato se ci sono “colli di bottiglia” nella supply chain tecnologica (es. chip, sensori, data center)?',
    regulation: {
      name: 'EU Chips Act / Resilienza Supply Chain',
      article: 'Riduzione dipendenze critiche',
      requirement: 'Migliorare la resilienza delle catene di fornitura per componenti strategici (come i semiconduttori)',
      url: 'https://digital-strategy.ec.europa.eu/en/policies/european-chips-act'
    },
    bestPractice: 'Mappare la catena di fornitura end-to-end (hardware, servizi, manutenzione) e individuare i single point of failure.',
    risk: 'Una crisi in una regione (es. produttori di semiconduttori) può rallentare o bloccare upgrade, manutenzione o scalabilità del sistema.',
    example: 'Interruzioni nella produzione di chip hanno già rallentato per anni la fornitura di hardware critico (server, sensori, dispositivi IoT).',
    whatYouCanDo: [
      'Identifica componenti hardware/software che hanno pochi fornitori globali.',
      'Prevedi stock strategici o accordi con più fornitori per i componenti critici.',
      'Collega le scelte tecnologiche ai piani di continuità operativa della città/organizzazione.'
    ],
    redFlags: [
      'Dipendenza da un solo produttore di hardware critico senza alternative.',
      'Nessuna analisi dei tempi di sostituzione o riparazione in caso di blocchi della fornitura.',
      'Assenza di dialogo tra IT e chi si occupa di risk management / continuità operativa.'
    ],
    externalLink: 'https://digital-strategy.ec.europa.eu/en/policies/european-chips-act'
  },
  'Stabilità Istituzionale & Fiducia': {
    simpleExplanation: 'Sistemi AI e digitali che gestiscono servizi pubblici o dati sensibili influenzano la fiducia dei cittadini nelle istituzioni. Se sono percepiti come opachi, ingiusti o facilmente manipolabili, minano la legittimità democratica.',
    question: 'Il modo in cui usi l’AI e i dati rafforza o indebolisce la fiducia nelle istituzioni e nelle decisioni pubbliche?',
    regulation: {
      name: 'AI Act / Valori fondamentali UE',
      article: 'Trasparenza, non discriminazione, tutela dei diritti',
      requirement: 'Garantire che i sistemi ad alto impatto pubblico siano trasparenti, spiegabili e non discriminatori',
      url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32021R2066'
    },
    bestPractice: 'Coinvolgere cittadini e stakeholder vulnerabili nella progettazione; comunicare apertamente limiti, rischi e benefici; prevedere canali di contestazione chiari.',
    risk: 'Decisioni opache o percepite come imposte da “scatole nere” possono alimentare sfiducia, proteste e polarizzazione politica.',
    example: 'Sistemi di allocazione di risorse pubbliche o scoring territoriale usati senza spiegazioni chiare hanno generato proteste e perdita di fiducia in diverse città.',
    whatYouCanDo: [
      'Valuta quali decisioni supportate dall’AI hanno impatti politici o sociali sensibili.',
      'Progetta meccanismi di spiegazione accessibili anche a non esperti.',
      'Prevedi momenti di confronto pubblico (consultazioni, assemblee, test con comunità locali).'
    ],
    redFlags: [
      'Decisioni ad alto impatto prese da sistemi opachi senza possibilità di contestazione.',
      'Mancanza di spiegazioni comprensibili per cittadini e stakeholder.',
      'Assenza di canali strutturati per reclami, contestazioni o revisione umana.'
    ],
    externalLink: 'https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai'
  },

  // --- IMPACT: Sociale ---
  'Impatto sulla Società': {
    simpleExplanation: 'Il sistema deve funzionare per tutti, non solo per chi sa usare smartphone o computer avanzati. Pensa alle persone con disabilità, agli anziani, a chi ha meno risorse. Se escludi qualcuno, stai creando ingiustizia.',
    question: 'Chi potrebbe essere escluso da questo sistema? Funziona per tutti o solo per chi sa usare tecnologie avanzate? E le persone con disabilità?',
    regulation: {
      name: 'AI Act',
      article: 'Art. 10',
      requirement: 'Sistemi ad alto rischio devono essere accessibili e non discriminare',
      url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32021R2066'
    },
    bestPractice: 'Test con utenti diversificati. Design inclusivo. Monitorare impatti su gruppi vulnerabili. Canali di feedback.',
    risk: 'Sistemi non accessibili escludono persone con disabilità. Algoritmi possono perpetuare discriminazioni esistenti.',
    example: 'Un sistema di assunzione AI che penalizza candidati con nomi non occidentali discrimina illegalmente.',
    externalLink: 'https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai'
  },
  'Influenza su Policy Pubbliche': {
    simpleExplanation: 'Se il tuo sistema influenza decisioni pubbliche (es. allocazione di fondi, servizi ai cittadini), devi essere trasparente. Spiega come funziona e perché. I cittadini hanno il diritto di sapere e di contestare. Come quando un comune decide dove costruire un parco: tutti devono capire i criteri.',
    question: 'Come influisce il sistema sulle decisioni pubbliche? È trasparente?',
    regulation: {
      name: 'AI Act',
      article: 'Art. 13',
      requirement: 'Trasparenza: informare utenti che interagiscono con AI',
      url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32021R2066'
    },
    bestPractice: 'Pubblicare metodologia, dati di training, limiti del sistema. Consentire contestazione. Monitorare impatti su policy.',
    risk: 'Sistemi opachi che influenzano policy pubbliche minano fiducia democratica e possono perpetuare bias.',
    example: 'Un sistema di allocazione risorse pubbliche che non spiega i criteri può essere percepito come ingiusto.',
    externalLink: 'https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai'
  },
  'Impatto sulla Fiducia Pubblica': {
    simpleExplanation: 'La fiducia è fragile. Se nascondi errori o spieghi male come funziona il sistema, le persone smettono di fidarsi. E recuperare la fiducia è difficile. Sii onesto sui limiti e gli errori. Come quando una banca ti dice chiaramente i rischi di un investimento.',
    question: 'Ti hanno spiegato i limiti del sistema? Ti dicono quando sbaglia? Hai modo di segnalare errori o preoccupazioni?',
    regulation: {
      name: 'AI Act',
      article: 'Art. 13-14',
      requirement: 'Trasparenza e spiegabilità: utenti devono capire come funziona e poter contestare',
      url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32021R2066'
    },
    bestPractice: 'Comunicare onestamente limiti e errori. Fornire spiegazioni comprensibili. Meccanismi di appello chiari e accessibili.',
    risk: 'Errori nascosti o spiegazioni incomprensibili distruggono fiducia pubblica. Una volta persa, è difficile recuperarla.',
    example: 'Un sistema di riconoscimento facciale con falsi positivi su minoranze etniche ha causato perdita di fiducia pubblica.',
    externalLink: 'https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai'
  },

  // --- RISK: Biometria e Dati Sensibili ---
  'Perimetro Biometria': {
    simpleExplanation: 'I dati biometrici (faccia, impronta digitale, voce) sono speciali: non puoi cambiarli come una password. Per usarli serve una base legale molto forte o il consenso esplicito. Chiediti sempre: è davvero necessario? Non basta un badge o un PIN?',
    question: 'Stai usando dati biometrici (riconoscimento facciale, impronte)? È davvero necessario o potrebbero usare un\'alternativa meno invasiva? Hai dato consenso esplicito?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 9(2)',
      requirement: 'Dati biometrici sono categorie particolari: serve consenso esplicito o base giuridica eccezionale',
      url: 'https://gdpr-info.eu/art-9-gdpr/'
    },
    bestPractice: 'Valutare se la biometria è davvero necessaria. Considerare alternative meno invasive. Documentare base giuridica.',
    risk: 'Trattamento biometrico senza base giuridica valida è illecito. Multe fino al 4% del fatturato.',
    example: 'Riconoscimento facciale per accesso ufficio: valutare se badge o PIN sono sufficienti.',
    externalLink: 'https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/special-category-data/what-are-special-category-data/'
  },
  'Buffer Volatile': {
    simpleExplanation: 'I dati temporanei (come la memoria del computer quando processi qualcosa) devono essere cancellati subito dopo l\'uso. Come cancellare le note temporanee dopo averle lette. Non lasciare tracce in memoria.',
    question: 'I dati temporanei vengono cancellati immediatamente dopo l\'uso?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 5(1)(e)',
      requirement: 'Limitation: conservare dati solo per tempo necessario',
      url: 'https://gdpr-info.eu/art-5-gdpr/'
    },
    bestPractice: 'Buffer temporanei devono essere cancellati immediatamente dopo l\'elaborazione. Non salvare dati sensibili in cache.',
    risk: 'Buffer non cancellati possono esporre dati sensibili in caso di dump di memoria o attacchi.',
    externalLink: 'https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/principles/storage-limitation/'
  },

  // --- RISK: LLM e AI ---
  'Prompt Guard': {
    simpleExplanation: 'Proteggi il chatbot da input maliziosi. Come un filtro antispam: alcuni utenti potrebbero provare a fargli dire cose sbagliate o a fargli rivelare informazioni private. Controlla tutto ciò che entra nel sistema.',
    question: 'Hai filtri per prevenire prompt injection e output dannosi?',
    regulation: {
      name: 'AI Act',
      article: 'Art. 10',
      requirement: 'Sistemi ad alto rischio devono avere controlli di sicurezza e robustezza',
      url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32021R2066'
    },
    bestPractice: 'Validare input utente, filtrare prompt injection, limitare output a contesti sicuri. Monitorare tentativi di abuso.',
    risk: 'Prompt injection può far generare contenuti dannosi, esporre dati di training, o bypassare controlli di sicurezza.',
    example: 'Un chatbot che accetta qualsiasi input può essere manipolato per generare contenuti offensivi o informazioni sensibili.',
    externalLink: 'https://owasp.org/www-community/vulnerabilities/Prompt_Injection'
  },
  'Dataset Ombra': {
    simpleExplanation: 'Il dataset (i dati usati per addestrare l\'AI) deve essere documentato: da dove vengono? Sono aggiornati? Ci sono pregiudizi? Come quando compri ingredienti per cucinare: devi sapere cosa stai usando e da dove viene.',
    question: 'Su quali informazioni è stato addestrato questo sistema? Potrebbero contenere pregiudizi o dati obsoleti? Da dove vengono questi dati?',
    regulation: {
      name: 'AI Act',
      article: 'Art. 10',
      requirement: 'Sistemi ad alto rischio devono documentare dataset di training e loro caratteristiche',
      url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32021R2066'
    },
    bestPractice: 'Documentare: origine dati, pre-processing, bias noti, limiti. Mantenere dataset aggiornato e rappresentativo.',
    risk: 'Dataset obsoleti o con bias possono produrre decisioni discriminatorie o inaccurate.',
    externalLink: 'https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai'
  },
  'Monitoraggio Modelli': {
    simpleExplanation: 'I modelli AI non sono perfetti per sempre. Possono peggiorare nel tempo (come un\'auto che si usura). Devi controllare regolarmente che funzionino ancora bene. Se fanno errori, devi saperlo subito e sistemarli.',
    question: 'Come fai a capire se il sistema ti sta dando informazioni sbagliate? Chi controlla che funzioni sempre bene? Hai mai ricevuto risposte sbagliate?',
    regulation: {
      name: 'AI Act',
      article: 'Art. 15',
      requirement: 'Sistemi ad alto rischio devono avere monitoraggio continuo e aggiornamenti',
      url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32021R2066'
    },
    bestPractice: 'Monitorare accuracy, drift, performance in produzione. Alert automatici per anomalie. Retraining periodico.',
    risk: 'Modelli non monitorati possono degradarsi nel tempo, producendo decisioni errate senza che nessuno se ne accorga.',
    externalLink: 'https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai'
  },

  // --- RISK: Crittografia e Sicurezza ---
  'Crittografia Dati': {
    simpleExplanation: 'Cifrare i dati significa trasformarli in un codice che solo chi ha la chiave può leggere. Come mettere una lettera in una cassaforte: anche se qualcuno la ruba, non può leggerla senza la chiave. Falla sia quando i dati sono fermi (a riposo) sia quando viaggiano (in transito).',
    question: 'I tuoi dati sono protetti (cifrati) sia quando sono salvati che quando viaggiano in internet? Hai mai chiesto come vengono protetti?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 32',
      requirement: 'Misure tecniche appropriate: cifratura dei dati personali',
      url: 'https://gdpr-info.eu/art-32-gdpr/'
    },
    bestPractice: 'AES-256 per dati a riposo, TLS 1.3 per dati in transito. Gestione chiavi separata (HSM o servizi gestiti).',
    risk: 'Dati non cifrati sono vulnerabili a data breaches. Cifratura debole può essere violata.',
    example: 'Un database con password in chiaro esposto online può essere compromesso in secondi.',
    externalLink: 'https://www.enisa.europa.eu/topics/csirts-in-europe/glossary/encryption'
  },
  'Sicurezza Rafforzata': {
    simpleExplanation: 'Non affidarti a una sola protezione. Usa più livelli di sicurezza: come una casa con serratura, allarme, cancelli e guardiano. Se un livello fallisce, gli altri proteggono ancora. Firewall, monitoraggio, autenticazione forte: ogni strato conta.',
    question: 'Hai implementato sicurezza a più livelli? Come rilevi attacchi?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 32',
      requirement: 'Misure tecniche e organizzative appropriate per sicurezza dei dati',
      url: 'https://gdpr-info.eu/art-32-gdpr/'
    },
    bestPractice: 'Defense in depth: firewall, IDS/IPS, WAF, autenticazione multi-fattore, segmentazione rete, monitoraggio continuo.',
    risk: 'Sicurezza insufficiente espone a data breaches, ransomware, accessi non autorizzati.',
    externalLink: 'https://www.enisa.europa.eu/topics/csirts-in-europe/glossary/defense-in-depth'
  },
  'Monitoraggio Intrusioni': {
    simpleExplanation: 'Hai un sistema che ti avvisa se qualcuno sta cercando di entrare nel tuo sistema? Come un allarme antifurto: se qualcuno prova a forzare la porta, suona la sirena. E quando suona, devi avere un piano per rispondere subito.',
    question: 'Come rilevi tentativi di intrusione? Hai un piano di risposta?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 32',
      requirement: 'Misure per garantire sicurezza: rilevamento e risposta a incidenti',
      url: 'https://gdpr-info.eu/art-32-gdpr/'
    },
    bestPractice: 'IDS/IPS, SIEM, log analysis, alert automatici. Piano di incident response testato. Notifica autorità entro 72h se data breach.',
    risk: 'Intrusioni non rilevate possono causare data breaches prolungati, con danni maggiori e multe più severe.',
    externalLink: 'https://www.enisa.europa.eu/topics/incident-response'
  },
  'Perimetro BYOK': {
    simpleExplanation: 'Le chiavi di cifratura: le gestisci tu o le affidi al provider cloud? BYOK (Bring Your Own Key) significa che tu controlli le chiavi. Più sicuro ma più complesso. Se le chiavi sono del provider e il provider viene compromesso, anche i tuoi dati sono a rischio.',
    question: 'Gestisci tu le chiavi di cifratura o le affidi al provider?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 32',
      requirement: 'Misure tecniche appropriate per sicurezza, incluso controllo delle chiavi',
      url: 'https://gdpr-info.eu/art-32-gdpr/'
    },
    bestPractice: 'BYOK (Bring Your Own Key) dà più controllo ma richiede competenze. Valutare trade-off sicurezza vs complessità.',
    risk: 'Chiavi gestite dal provider possono essere esposte in caso di compromissione del provider.',
    externalLink: 'https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/security/'
  },

  // --- RISK: Retention e Cancellazione ---
  'Politica di Retention': {
    simpleExplanation: 'Decidi per quanto tempo conservare ogni tipo di dato (es. CV: 1 anno, dati navigazione: 13 mesi). Poi cancellali automaticamente quando scade il tempo. Come la scadenza del cibo: quando passa la data, lo butti via. Documenta le regole e rivedile ogni anno.',
    question: 'Hai definito tempi di conservazione per ogni tipo di dato? È documentata?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 5(1)(e)',
      requirement: 'Limitation: conservare dati solo per tempo necessario alle finalità',
      url: 'https://gdpr-info.eu/art-5-gdpr/'
    },
    bestPractice: 'Policy chiara per ogni categoria di dato. Automatizzare cancellazione. Eccezioni documentate. Revisione annuale.',
    risk: 'Conservare dati oltre il necessario viola GDPR e aumenta rischio di data breach.',
    example: 'Dati di navigazione web: conservare max 13 mesi (cookie), poi cancellazione automatica.',
    externalLink: 'https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/principles/storage-limitation/'
  },
  'Diritto all\'Oblio': {
    simpleExplanation: 'Se una persona ti chiede di cancellare i suoi dati, devi farlo entro 30 giorni. Ma attenzione: devi cancellarli DAPPERTUTTO (database principale, backup, cache, sistemi terzi). Come quando qualcuno chiede di rimuovere una foto: devi trovarla ovunque sia stata condivisa, non solo da un posto.',
    question: 'Puoi chiedere che cancellino tutti i tuoi dati? Cosa succede quando fai questa richiesta? Vengono cancellati ovunque (anche backup)?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 17',
      requirement: 'Diritto alla cancellazione: dati devono essere cancellati senza ritardo ingiustificato',
      url: 'https://gdpr-info.eu/art-17-gdpr/'
    },
    bestPractice: 'Processo chiaro per richieste. Cancellazione entro 30 giorni. Verificare backup, cache, sistemi terzi. Documentare.',
    risk: 'Non rispettare diritto all\'oblio può causare multe e danni reputazionali.',
    example: 'Utente chiede cancellazione ma dati rimangono in backup non cifrati: violazione GDPR.',
    externalLink: 'https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/individual-rights/right-to-erasure/'
  },
  'Cancellazione Automatica': {
    simpleExplanation: 'Non cancellare i dati a mano: è troppo facile dimenticare o sbagliare. Imposta cancellazioni automatiche quando scade il tempo. Ma testale regolarmente: non fidarti che funzionino, provale! Come verificare che l\'allarme della sveglia funzioni davvero.',
    question: 'I dati vengono cancellati automaticamente alla scadenza? È testato?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 5(1)(e)',
      requirement: 'Limitation: conservare solo per tempo necessario',
      url: 'https://gdpr-info.eu/art-5-gdpr/'
    },
    bestPractice: 'Job automatici per cancellazione. Test regolari. Log di tutte le cancellazioni. Eccezioni documentate.',
    risk: 'Cancellazione manuale è soggetta a errori. Dati obsoleti possono accumularsi.',
    externalLink: 'https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/principles/storage-limitation/'
  },

  // --- RISK: Privacy by Design ---
  'Minimizzazione Dati': {
    simpleExplanation: 'Raccogli solo i dati che ti servono davvero. Non chiedere tutto "per sicurezza". Come quando vai a comprare pane: il negoziante non ha bisogno di sapere dove vivi o che lavoro fai. Per ogni dato chiediti: è davvero necessario?',
    question: 'Il sistema ti chiede molti dati personali? Sono tutti davvero necessari o chiedono più del necessario?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 5(1)(c)',
      requirement: 'Minimizzazione: dati devono essere adeguati, pertinenti e limitati a quanto necessario',
      url: 'https://gdpr-info.eu/art-5-gdpr/'
    },
    bestPractice: 'Per ogni dato chiedersi: è davvero necessario? Posso usare dati meno sensibili? Rivedere periodicamente.',
    risk: 'Raccogliere dati in eccesso aumenta superficie di attacco, complessità e rischio di violazioni.',
    example: 'Per autenticazione, email è sufficiente. Non serve chiedere anche data di nascita o indirizzo completo.',
    externalLink: 'https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/principles/data-minimisation/'
  },
  'Pseudonimizzazione': {
    simpleExplanation: 'Invece di salvare "Mario Rossi, diabetico", salva "ID_ABC123, categoria_rischio_3" e tieni il nome in un posto separato e protetto. Così se qualcuno ruba i dati, non sa chi è Mario Rossi. Ma le chiavi per risalire all\'identità devono essere ben protette, altrimenti è inutile.',
    question: 'Hai separato identificativi dai dati sensibili? Le chiavi sono protette?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 4(5) & Art. 25',
      requirement: 'Pseudonimizzazione come misura tecnica per proteggere dati',
      url: 'https://gdpr-info.eu/art-4-gdpr/'
    },
    bestPractice: 'Separare ID pseudonimi da dati sensibili. Chiavi di mapping in sistema separato e cifrato. Limiti accessi.',
    risk: 'Pseudonimizzazione mal implementata offre falsa sicurezza. Se chiavi sono accessibili, pseudonimizzazione è inutile.',
    example: 'Invece di "Mario Rossi, diabetico", usare "ID_ABC123" + tabella separata con mapping (protetta).',
    externalLink: 'https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/key-definitions/what-is-personal-data/'
  },
  'Anonimizzazione': {
    simpleExplanation: 'Anonimizzare davvero i dati è molto difficile. Anche se togli nomi e cognomi, spesso si può risalire alle persone combinando altri dati (età, città, sesso, ecc.). Se i dati possono essere re-identificati, sono ancora "dati personali" e valgono le regole GDPR. Verifica sempre che l\'anonimizzazione sia davvero efficace.',
    question: 'I dati sono veramente anonimi o possono essere re-identificati?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 4(5)',
      requirement: 'Dati anonimi non sono dati personali e non sono soggetti a GDPR',
      url: 'https://gdpr-info.eu/art-4-gdpr/'
    },
    bestPractice: 'Anonimizzazione vera è difficile. Considerare k-anonymity, l-diversity, differential privacy. Testare re-identificazione.',
    risk: 'Dati "anonimizzati" che possono essere re-identificati sono ancora dati personali e soggetti a GDPR.',
    example: 'Dataset con "età, CAP, sesso" può essere re-identificato con altri dataset pubblici. Serve anonimizzazione più robusta.',
    externalLink: 'https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/key-definitions/what-is-personal-data/'
  },

  // --- RISK: Accessi e Permessi ---
  'Controllo Accessi': {
    simpleExplanation: 'Non tutti devono vedere tutto. Un contabile non ha bisogno di vedere i dati sanitari. Un programmatore non deve vedere i dati bancari. Dai a ognuno solo l\'accesso minimo necessario per il suo lavoro. Come in un ufficio: non tutti hanno le chiavi di tutte le stanze.',
    question: 'Quante persone possono vedere i tuoi dati? Solo chi ne ha davvero bisogno o anche altri? Hai mai chiesto chi ha accesso?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 32',
      requirement: 'Limitazione accessi a chi ne ha bisogno per le finalità del trattamento',
      url: 'https://gdpr-info.eu/art-32-gdpr/'
    },
    bestPractice: 'RBAC (Role-Based Access Control), principio del minimo privilegio, review periodiche degli accessi, revoca immediata quando non più necessari.',
    risk: 'Accessi troppo ampi permettono data breaches interni. Dipendenti possono vedere dati non necessari per il loro lavoro.',
    externalLink: 'https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/security/'
  },
  'Gestione Permessi': {
    simpleExplanation: 'I permessi devono essere gestiti centralmente e aggiornati automaticamente. Quando un dipendente cambia ruolo o lascia, i suoi accessi devono essere revocati subito. Come quando restituisci le chiavi quando cambi casa: l\'ex inquilino non deve più entrare.',
    question: 'Come gestisci permessi? Sono aggiornati quando cambiano i ruoli?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 32',
      requirement: 'Misure per limitare accessi a chi ne ha bisogno',
      url: 'https://gdpr-info.eu/art-32-gdpr/'
    },
    bestPractice: 'Sistema centralizzato di gestione permessi. Revoca automatica quando dipendente lascia. Review trimestrali.',
    risk: 'Permessi non aggiornati permettono accessi non autorizzati. Ex-dipendenti possono ancora accedere.',
    externalLink: 'https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/security/'
  },
  'Log Accessi': {
    simpleExplanation: 'Registra chi accede ai dati, quando e cosa fa. Come un registro visite: ogni accesso viene tracciato. I log devono essere conservati per anni e non modificabili (immutabili). Se qualcosa va storto, puoi vedere chi è stato e cosa ha fatto.',
    question: 'Tutti gli accessi sono tracciati? I log sono immutabili e conservati?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 32',
      requirement: 'Tracciabilità degli accessi per accountability',
      url: 'https://gdpr-info.eu/art-32-gdpr/'
    },
    bestPractice: 'Log di ogni accesso: chi, cosa, quando, IP, azione. Log immutabili, conservati per periodo legale. Alert su accessi sospetti.',
    risk: 'Senza log, impossibile investigare data breaches o dimostrare conformità.',
    externalLink: 'https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/accountability-and-governance/'
  },
  'Tracciabilità Operazioni': {
    simpleExplanation: 'Traccia TUTTE le operazioni sui dati, non solo gli accessi: anche chi modifica, chi cancella, chi esporta. Come un registro completo di tutto ciò che succede. Se qualcuno modifica o cancella dati, devi sapere chi è stato e quando.',
    question: 'Tutte le operazioni sui dati sono tracciate? Include modifiche e cancellazioni?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 5(2)',
      requirement: 'Accountability: dimostrare conformità, tracciare tutte le operazioni',
      url: 'https://gdpr-info.eu/art-5-gdpr/'
    },
    bestPractice: 'Tracciare: creazione, lettura, modifica, cancellazione, export, condivisione. Log immutabili, conservati per 7-10 anni.',
    risk: 'Senza tracciabilità, impossibile ricostruire eventi, investigare incidenti o dimostrare conformità.',
    externalLink: 'https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/accountability-and-governance/'
  },

  // --- RISK: Altri Controlli ---
  'Human-in-the-Loop': {
    simpleExplanation: 'Significa che una persona controlla le decisioni importanti del sistema. Non è sufficiente che l\'umano "appoggi sempre senza guardare". Deve davvero verificare e può cambiare la decisione. Come un supervisore che controlla il lavoro fatto dalla macchina, non che firma automaticamente.',
    question: 'Quando il sistema prende una decisione, c\'è sempre una persona che la controlla veramente? O firma solo automaticamente?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 22',
      requirement: 'Diritto di non essere sottoposto a decisioni basate unicamente su trattamento automatizzato',
      url: 'https://gdpr-info.eu/art-22-gdpr/'
    },
    bestPractice: 'Definire chiaramente quando serve intervento umano. Processo documentato. Training per operatori. Monitoraggio efficacia.',
    risk: 'Human-in-the-loop solo formale (umano approva sempre senza verificare) non soddisfa GDPR.',
    externalLink: 'https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/artificial-intelligence/guidance-on-ai-and-data-protection/automated-decision-making-and-profiling/'
  },
  'Review Decisioni Critiche': {
    simpleExplanation: 'Le decisioni importanti (rifiuto prestito, assunzione, accesso a servizi) devono essere riviste da una persona. L\'utente ha il diritto di chiedere una revisione umana. Come quando chiedi un secondo parere medico: hai il diritto di far controllare da qualcun altro.',
    question: 'Se il sistema rifiuta qualcosa di importante per te (es. prestito, assunzione), puoi chiedere che una persona lo riveda? Come fai?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 22',
      requirement: 'Diritto di contestazione e revisione di decisioni automatizzate',
      url: 'https://gdpr-info.eu/art-22-gdpr/'
    },
    bestPractice: 'Review obbligatoria per decisioni ad alto impatto (es. rifiuto prestito, assunzione). Processo chiaro e accessibile.',
    risk: 'Decisioni critiche senza review possono causare discriminazioni o errori gravi non corretti.',
    externalLink: 'https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/artificial-intelligence/guidance-on-ai-and-data-protection/automated-decision-making-and-profiling/'
  },
  'Ridondanza Locale': {
    simpleExplanation: 'Non tenere tutti i backup solo in cloud. Tieni anche copie locali (nella tua azienda). Perché? Se il provider cloud ha problemi (es. interruzione servizio), i tuoi backup cloud non sono accessibili. Come avere copie di documenti importanti sia in cloud che nel cassetto: se internet non funziona, hai ancora le copie locali.',
    question: 'Hai backup locali oltre a quelli cloud? Sono sincronizzati?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 32',
      requirement: 'Misure per garantire disponibilità e integrità dei dati',
      url: 'https://gdpr-info.eu/art-32-gdpr/'
    },
    bestPractice: 'Backup multipli, geograficamente distribuiti. Test di ripristino regolari. Ridondanza locale per continuità operativa.',
    risk: 'Solo backup cloud: se provider ha problemi, dati non accessibili. Backup non testati possono fallire quando servono.',
    externalLink: 'https://www.enisa.europa.eu/topics/incident-response/backup-recovery'
  },
  'Notifier Trasparenza': {
    simpleExplanation: 'Devi dire chiaramente agli utenti che stanno interagendo con un sistema AI, non con una persona. È obbligatorio. Non puoi far passare un chatbot per umano. Come quando vai al supermercato: se compri cibo "finto", deve essere scritto chiaramente sulla confezione.',
    question: 'Sapevi che stavi parlando con un sistema AI e non con una persona? Te l\'hanno detto chiaramente?',
    regulation: {
      name: 'AI Act',
      article: 'Art. 50',
      requirement: 'Obbligo di trasparenza: informare utenti che interagiscono con AI',
      url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32021R2066'
    },
    bestPractice: 'Disclaimer chiaro e visibile. Spiegare limiti del sistema. Fornire informazioni su come funziona.',
    risk: 'Utenti che non sanno di interagire con AI possono fare scelte basate su false aspettative.',
    example: 'Chatbot che si presenta come umano viola AI Act. Deve dire chiaramente "Sono un assistente AI".',
    externalLink: 'https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai'
  },
  'Filtro Bias': {
    simpleExplanation: 'Bias significa pregiudizi nel sistema. L\'AI potrebbe discriminare gruppi di persone (es. donne, minoranze) anche se non vuoi. Devi testare il sistema con persone diverse e vedere se funziona uguale per tutti. Se no, correggilo. Come quando fai un test: deve essere giusto per tutti, non solo per alcuni.',
    question: 'Hai mai notato che il sistema funziona diversamente per persone diverse? Pensi che potrebbe discriminare qualcuno?',
    regulation: {
      name: 'AI Act',
      article: 'Art. 10',
      requirement: 'Sistemi ad alto rischio devono essere progettati per evitare discriminazioni',
      url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32021R2066'
    },
    bestPractice: 'Test con dataset diversificati. Monitorare performance per gruppi demografici. Audit regolari per bias. Retraining se necessario.',
    risk: 'Bias non rilevati possono causare discriminazioni illegali, danni reputazionali e multe.',
    example: 'Sistema di assunzione che penalizza candidati donne o minoranze etniche viola leggi anti-discriminazione.',
    externalLink: 'https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai'
  },
  'Validazione Qualità': {
    simpleExplanation: 'Controlla la qualità delle immagini/video PRIMA di processarle. Se la qualità è bassa (immagine sfocata, video scuro), il sistema potrebbe fare errori o discriminare. Rifiuta input di qualità insufficiente. Come quando controlli che la foto sia ben fatta prima di usarla per un documento d\'identità.',
    question: 'Come valuti la qualità delle immagini/video processate? Cosa fai se qualità è bassa?',
    regulation: {
      name: 'AI Act',
      article: 'Art. 10',
      requirement: 'Sistemi ad alto rischio devono avere controlli di qualità e robustezza',
      url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32021R2066'
    },
    bestPractice: 'Validare qualità input prima di processare. Rifiutare input di qualità insufficiente. Alert per input sospetti.',
    risk: 'Processare input di bassa qualità può produrre risultati errati o discriminatori.',
    externalLink: 'https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai'
  },
  'Validazione Alert': {
    simpleExplanation: 'Quando il sistema rileva un\'anomalia e fa un "alert", devi verificare che sia vero. Troppi falsi allarmi (come un antifurto che suona per un gatto) fanno sì che tutti ignorino gli allarmi, anche quelli veri. Una persona deve controllare prima di agire.',
    question: 'Come verifichi che gli alert siano veri positivi e non falsi allarmi?',
    regulation: {
      name: 'AI Act',
      article: 'Art. 10',
      requirement: 'Sistemi ad alto rischio devono essere accurati e robusti',
      url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32021R2066'
    },
    bestPractice: 'Validazione umana degli alert prima di azione. Monitorare tasso di falsi positivi. Aggiustare soglie se necessario.',
    risk: 'Troppi falsi positivi causano "alert fatigue" e possono far ignorare veri problemi.',
    externalLink: 'https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai'
  },
  'Trascrizione Sicura': {
    simpleExplanation: 'Se trasformi audio in testo (trascrizione), cancella l\'audio originale subito dopo. Conserva solo il testo e proteggilo con cifratura. Perché conservare l\'audio? Aumenta solo il rischio. Come quando detti una lettera a una segretaria: distruggi il nastro, tieni solo il testo scritto.',
    question: 'Le registrazioni audio sono cancellate dopo la trascrizione? La trascrizione è cifrata?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 5(1)(e) & Art. 32',
      requirement: 'Limitation e sicurezza: conservare solo necessario, proteggere dati',
      url: 'https://gdpr-info.eu/art-5-gdpr/'
    },
    bestPractice: 'Cancellare audio originale dopo trascrizione. Cifrare trascrizioni. Conservare solo testo necessario.',
    risk: 'Conservare audio originale aumenta superficie di attacco. Trascrizioni non cifrate possono esporre conversazioni sensibili.',
    externalLink: 'https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/principles/storage-limitation/'
  },
  'Preferenze Utente': {
    simpleExplanation: 'Gli utenti devono poter controllare come vengono usati i loro dati. Crea una dashboard semplice dove possono scegliere: cosa condividere, con chi, per quanto tempo. Come le impostazioni privacy di un social network: l\'utente deve poter decidere.',
    question: 'Gli utenti possono controllare come vengono usati i loro dati?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 7(3)',
      requirement: 'Diritto di revocare consenso e controllare trattamento dati',
      url: 'https://gdpr-info.eu/art-7-gdpr/'
    },
    bestPractice: 'Dashboard utente per gestire preferenze. Opzioni chiare: cosa condividere, con chi, per quanto tempo. Facile da usare.',
    risk: 'Utenti senza controllo si sentono violati nella privacy, possono revocare consenso o fare reclami.',
    externalLink: 'https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/individual-rights/right-to-object/'
  },
  'Accesso Controllato': {
    simpleExplanation: 'Le dashboard con dati devono essere protette. Chi può accedere? Solo chi ne ha davvero bisogno. E usa dati aggregati (statistiche) quando possibile, non dati individuali. Come quando mostri statistiche di vendita: non mostri i nomi dei clienti, ma solo i totali.',
    question: 'Chi può accedere alla dashboard? I dati sono aggregati o individuali?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 32',
      requirement: 'Limitazione accessi a chi ne ha bisogno',
      url: 'https://gdpr-info.eu/art-32-gdpr/'
    },
    bestPractice: 'Dashboard con dati aggregati quando possibile. Accesso individuale solo se necessario. Autenticazione forte.',
    risk: 'Dashboard con dati individuali accessibili a troppe persone aumenta rischio di data breach.',
    externalLink: 'https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/security/'
  },
  'Controllo Trasferimenti': {
    simpleExplanation: 'Quando sposti dati fuori dall\'Europa (es. da server UE a server USA), devi verificare che sia legale. Serve un contratto speciale (SCC) e cifratura. I trasferimenti non conformi possono essere bloccati e causare multe. Come quando spedisci qualcosa all\'estero: devi avere la documentazione giusta.',
    question: 'Hai verificato che i trasferimenti di dati siano conformi? Hai SCC?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 44-49',
      requirement: 'Trasferimenti extra-UE richiedono garanzie adeguate (SCC, BCR, ecc.)',
      url: 'https://gdpr-info.eu/chapter-5/'
    },
    bestPractice: 'Verificare destinazione dati. Usare SCC per trasferimenti. Cifratura end-to-end. Documentare tutto.',
    risk: 'Trasferimenti non conformi possono essere invalidati, causando multe e interruzione servizio.',
    externalLink: 'https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/international-transfers/'
  },
  'Backup Automatico': {
    simpleExplanation: 'Fai copie di sicurezza automaticamente ogni giorno. Non fare backup manuali: è troppo facile dimenticarli. Ma le copie devono essere testate regolarmente (almeno una volta al mese). Perché? Perché se non funzionano quando ne hai bisogno, sono inutili. Come testare un\'assicurazione: devi essere sicuro che funzioni davvero.',
    question: 'I backup sono automatici? Sono testati? Dove sono conservati?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 32',
      requirement: 'Misure per garantire disponibilità: backup regolari',
      url: 'https://gdpr-info.eu/art-32-gdpr/'
    },
    bestPractice: 'Backup automatici giornalieri, conservati separatamente, cifrati, testati mensilmente. Retention policy chiara.',
    risk: 'Backup manuali possono essere dimenticati. Backup non testati possono fallire quando servono.',
    externalLink: 'https://www.enisa.europa.eu/topics/incident-response/backup-recovery'
  },
  'Disaster Recovery': {
    simpleExplanation: 'Hai un piano per quando succede un disastro (incendio, cyber attack, blackout)? Cosa fai? Quanto tempo ci vuole per ripristinare? Dove sono i backup? Chi chiamare? Questo piano deve essere scritto, testato regolarmente e conosciuto da tutto il team. Come un piano di evacuazione: devi sapere cosa fare quando succede qualcosa.',
    question: 'Hai un piano di disaster recovery? È testato? Qual è il RTO/RPO?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 32',
      requirement: 'Misure per garantire disponibilità e integrità dei dati',
      url: 'https://gdpr-info.eu/art-32-gdpr/'
    },
    bestPractice: 'Piano documentato, testato semestralmente. RTO (Recovery Time Objective) e RPO (Recovery Point Objective) definiti. Team addestrato.',
    risk: 'Senza piano testato, in caso di disastro (incendio, cyber attack) dati possono essere persi o sistema inaccessibile per giorni.',
    externalLink: 'https://www.enisa.europa.eu/topics/incident-response/disaster-recovery'
  },
  'Piano Continuità': {
    simpleExplanation: 'Come fai a garantire che il servizio continui anche se succede qualcosa? Hai sistemi di riserva (ridondanza)? Cosa succede se un server si rompe? Hai un team che sa come rispondere? Il piano deve assicurare che anche durante un incidente, il servizio continui (o riprenda velocemente).',
    question: 'Come garantisci continuità operativa in caso di incidenti?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 32',
      requirement: 'Misure per garantire disponibilità dei dati e dei servizi',
      url: 'https://gdpr-info.eu/art-32-gdpr/'
    },
    bestPractice: 'Piano di business continuity, sistemi ridondanti, failover automatico, team di risposta, comunicazione con stakeholder.',
    risk: 'Senza piano, incidenti possono causare interruzioni prolungate, perdita dati, danni reputazionali.',
    externalLink: 'https://www.enisa.europa.eu/topics/incident-response/business-continuity'
  },
  'Gestione Cookie': {
    simpleExplanation: 'I cookie non essenziali (tracciamento, pubblicità) richiedono consenso. Gli utenti devono poter rifiutare facilmente (non solo accettare). Il banner deve essere chiaro e il pulsante "Rifiuta tutto" deve essere facile da trovare quanto "Accetta". Cookie essenziali (funzionalità del sito) non richiedono consenso.',
    question: 'Gli utenti possono rifiutare cookie non essenziali? Il consenso è valido?',
    regulation: {
      name: 'GDPR + ePrivacy',
      article: 'Art. 5(3) Direttiva ePrivacy',
      requirement: 'Consenso necessario per cookie non essenziali. Rifiuto deve essere facile quanto accettazione.',
      url: 'https://eur-lex.europa.eu/legal-content/IT/TXT/?uri=CELEX%3A32002L0058'
    },
    bestPractice: 'Banner chiaro, opzione "Rifiuta tutto" prominente, cookie essenziali senza consenso, gestione preferenze accessibile.',
    risk: 'Cookie senza consenso valido violano ePrivacy. Multe fino a 4% fatturato.',
    example: 'Sito che richiede accettazione cookie per accedere non ha consenso valido (non è libero).',
    externalLink: 'https://ico.org.uk/for-organisations/guide-to-pecr/cookies-and-similar-technologies/'
  },
  'Accordi & SLA': {
    simpleExplanation: 'Quando usi fornitori esterni (es. cloud, servizi), devi avere contratti chiari che includano obblighi GDPR, sicurezza e disponibilità. Non fidarti solo di "fiducia": metti tutto per iscritto. Se il fornitore non rispetta GDPR, anche tu sei responsabile.',
    question: 'Hai contratti chiari con fornitori? SLA includono sicurezza e conformità GDPR?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 28',
      requirement: 'Contratti con processori devono includere obblighi di sicurezza e conformità',
      url: 'https://gdpr-info.eu/art-28-gdpr/'
    },
    bestPractice: 'DPA (Data Processing Agreement) con tutti i fornitori. SLA chiari su sicurezza, disponibilità, conformità. Audit periodici.',
    risk: 'Fornitori senza contratti adeguati possono non rispettare GDPR, causando responsabilità condivisa.',
    externalLink: 'https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/controllers-and-processors/contracts-between-controllers-and-processors/'
  },
  'Licenze & Attribution': {
    simpleExplanation: 'Quando usi dati, modelli o codice di altri, devi rispettare la loro licenza. Verifica sempre le licenze PRIMA di usare. Alcuni sono gratuiti (open source), altri richiedono pagamento o attribuzione (menzionare chi li ha creati). Violare licenze può costare caro: multe o obbligo di rimuovere tutto.',
    question: 'Hai verificato licenze di dati e modelli usati? Rispetti attribuzione richiesta?',
    regulation: {
      name: 'Copyright',
      article: 'Varie',
      requirement: 'Rispettare licenze di dati, modelli, codice usato',
      url: 'https://creativecommons.org/licenses/'
    },
    bestPractice: 'Verificare licenze prima di usare. Documentare attribuzioni. Rispettare condizioni (es. open source, commercial use).',
    risk: 'Violare licenze può causare cause legali, multe, obbligo di rimuovere sistema.',
    externalLink: 'https://opensource.org/licenses/'
  },

  // --- IMPACT: Energia e Ambiente (dettagli) ---
  'Consumo Energetico Training': {
    simpleExplanation: 'Addestrare un modello AI grande consuma ENORMEMENTE energia: quanto migliaia di case. Prima di addestrare un modello da zero, considera modelli già addestrati che puoi adattare (più efficiente) o modelli più piccoli. Come quando vai in viaggio: non compri un\'auto nuova ogni volta, a volte prendi quella che hai già.',
    question: 'Quanta energia serve per addestrare il modello? Hai considerato alternative?',
    regulation: {
      name: 'AI Act',
      article: 'Art. 60',
      requirement: 'Documentare impatto ambientale, incluso consumo energetico',
      url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32021R2066'
    },
    bestPractice: 'Misurare consumo reale. Considerare modelli pre-addestrati, transfer learning, quantizzazione. Usare energia rinnovabile.',
    risk: 'Training di modelli enormi può consumare quanto migliaia di case per mesi. Impatto ambientale significativo.',
    example: 'GPT-3 training: ~1.3 GWh (equivalente a 120 case per un anno). Modelli più piccoli possono essere 100-1000x più efficienti.',
    externalLink: 'https://huggingface.co/blog/carbon-emissions-on-the-hub'
  },
  'Emissioni CO2 Stimate': {
    simpleExplanation: 'Ogni kWh di energia produce anidride carbonica (CO2) che contribuisce al cambiamento climatico. Calcola quante emissioni produce il tuo sistema (addestramento + uso) e cerca di ridurle: usa energia rinnovabile, modelli efficienti, server con basso impatto. Come quando calcoli l\'impronta carbonica di un viaggio.',
    question: 'Hai calcolato l\'impronta carbonica del sistema? Come la riduci?',
    regulation: {
      name: 'AI Act',
      article: 'Art. 60',
      requirement: 'Documentare impatto ambientale',
      url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32021R2066'
    },
    bestPractice: 'Calcolare emissioni (training + inferenza). Usare data center con energia rinnovabile. Ottimizzare modelli per efficienza.',
    risk: 'Sistemi AI possono avere impronta carbonica significativa, contribuendo al cambiamento climatico.',
    externalLink: 'https://www.greenit.fr/en/'
  },
  'Energia Inferenza Real-time': {
    simpleExplanation: 'Quanto consuma il sistema quando è in uso (inferenza)? Non solo durante l\'addestramento, ma ogni volta che qualcuno lo usa. Con migliaia di utenti simultanei, può consumare molta energia. Usa modelli efficienti e ottimizzati. Come quando scegli una lampadina: LED consuma meno di una normale.',
    question: 'Quanto consuma il sistema in produzione? È ottimizzato?',
    regulation: {
      name: 'AI Act',
      article: 'Art. 60',
      requirement: 'Documentare impatto ambientale',
      url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32021R2066'
    },
    bestPractice: 'Misurare consumo in produzione. Usare modelli quantizzati, edge computing quando possibile. Monitorare e ottimizzare continuamente.',
    risk: 'Inferenza non ottimizzata può consumare molta energia, specialmente con molti utenti simultanei.',
    externalLink: 'https://huggingface.co/blog/carbon-emissions-on-the-hub'
  },
  'Impronta Carbonio Infrastruttura': {
    simpleExplanation: 'Non pensare solo al consumo del modello AI. Pensa anche ai server che lo ospitano, al raffreddamento dei data center, alla produzione dell\'hardware. Scegli provider che usano energia rinnovabile e sono efficienti. Come quando compri un\'auto: non guardi solo il consumo, ma anche quanto inquina produrla.',
    question: 'Hai considerato l\'impatto ambientale di server e data center?',
    regulation: {
      name: 'AI Act',
      article: 'Art. 60',
      requirement: 'Documentare impatto ambientale completo',
      url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32021R2066'
    },
    bestPractice: 'Considerare consumo di data center, cooling, produzione hardware. Preferire provider con energia rinnovabile e efficienza.',
    risk: 'Infrastruttura cloud può avere impatto ambientale significativo se non gestita con efficienza.',
    externalLink: 'https://www.greenit.fr/en/'
  },

  // --- IMPACT: Sociale (dettagli) ---
  'Disparità di Accesso': {
    simpleExplanation: 'Il sistema deve funzionare per TUTTI, non solo per chi ha smartphone avanzati o sa usare computer. Pensa a persone con disabilità visive, anziani, chi ha solo un telefono base, chi non parla la tua lingua. Se il sistema richiede tecnologie avanzate, escludi molte persone. Progetta per essere accessibile a tutti.',
    question: 'Tutti possono usare il sistema? Cosa serve per accedervi?',
    regulation: {
      name: 'AI Act',
      article: 'Art. 10',
      requirement: 'Sistemi ad alto rischio devono essere accessibili',
      url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32021R2066'
    },
    bestPractice: 'Design inclusivo, supporto per disabilità, interfacce multilingue, accesso anche senza smartphone/computer avanzato.',
    risk: 'Sistemi non accessibili escludono persone con disabilità, anziani, chi ha tecnologia limitata.',
    example: 'Sistema che richiede app smartphone esclude chi ha solo telefono base o non sa usare smartphone.',
    externalLink: 'https://www.w3.org/WAI/fundamentals/accessibility-intro/'
  },
  'Sostituzione Lavoro Umano': {
    simpleExplanation: 'Se il sistema sostituisce persone nel lavoro, valuta quanti posti di lavoro sono a rischio. E crea un piano: riqualificazione dei lavoratori, transizione graduale, supporto. Non licenziare tutti e basta. Le persone hanno diritto a essere aiutate a trovare un nuovo lavoro o a imparare nuove competenze.',
    question: 'Quanti posti di lavoro sono a rischio? Hai un piano di transizione?',
    regulation: {
      name: 'AI Act',
      article: 'Art. 60',
      requirement: 'Documentare impatti sociali ed economici',
      url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32021R2066'
    },
    bestPractice: 'Valutare impatto su posti di lavoro. Pianificare riqualificazione, transizione graduale, supporto per lavoratori interessati.',
    risk: 'Sostituzione lavoro senza transizione può causare disoccupazione, tensioni sociali, opposizione al sistema.',
    externalLink: 'https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai'
  },
  'Esclusione Digitale': {
    simpleExplanation: 'Chi potrebbe essere escluso? Persone senza internet, senza smartphone, con poca dimestichezza con la tecnologia. Fornisci alternative: canale telefonico, assistenza umana, uffici fisici. Non costringere tutti a usare solo il digitale. Alcune persone hanno bisogno di parlare con una persona vera.',
    question: 'Chi potrebbe essere escluso dal sistema? Come li includi?',
    regulation: {
      name: 'AI Act',
      article: 'Art. 10',
      requirement: 'Sistemi devono essere accessibili e non discriminare',
      url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32021R2066'
    },
    bestPractice: 'Identificare gruppi a rischio esclusione. Fornire alternative (es. canale telefonico, assistenza umana). Monitorare accesso.',
    risk: 'Esclusione digitale può perpetuare disuguaglianze esistenti, escludendo chi ha meno competenze digitali o risorse.',
    externalLink: 'https://digital-strategy.ec.europa.eu/en/policies/digital-skills-and-jobs'
  },
  'Impatto su Comunità Vulnerabili': {
    simpleExplanation: 'Pensa a gruppi vulnerabili: rifugiati, persone senza casa, disabili, anziani, minoranze. Il sistema potrebbe impattarli diversamente o discriminarli senza volerlo. Coinvolgi rappresentanti di queste comunità quando progetti e testi il sistema. Chiedi loro: questo funziona per voi? C\'è qualcosa che vi esclude?',
    question: 'Come impatta il sistema su gruppi vulnerabili? Hai coinvolto rappresentanti?',
    regulation: {
      name: 'AI Act',
      article: 'Art. 10',
      requirement: 'Sistemi devono evitare discriminazioni e essere accessibili',
      url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32021R2066'
    },
    bestPractice: 'Coinvolgere rappresentanti comunità vulnerabili in design e testing. Monitorare impatti specifici. Aggiustare se necessario.',
    risk: 'Sistemi non testati con comunità vulnerabili possono causare discriminazioni non intenzionali o esclusione.',
    externalLink: 'https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai'
  },
  'Bias Algoritmici': {
    simpleExplanation: 'I pregiudizi (bias) nel sistema possono discriminare gruppi di persone anche se non vuoi. Esempio: sistema di assunzione che penalizza candidati donne o minoranze. Devi testare il sistema con persone diverse e vedere se funziona uguale per tutti. Se discrimina, devi correggere. Come un test scolastico: deve essere giusto per tutti.',
    question: 'Hai testato il sistema per bias? Come li rilevi e correggi?',
    regulation: {
      name: 'AI Act',
      article: 'Art. 10',
      requirement: 'Sistemi devono evitare discriminazioni e bias',
      url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32021R2066'
    },
    bestPractice: 'Test con dataset diversificati. Audit regolari per bias. Monitorare performance per gruppi. Retraining se necessario.',
    risk: 'Bias non rilevati possono causare discriminazioni illegali, danni a individui e gruppi, perdita fiducia.',
    example: 'Sistema di prestiti che penalizza sistematicamente minoranze etniche viola leggi anti-discriminazione.',
    externalLink: 'https://algorithmwatch.org/en/'
  },

  // --- IMPACT: Governance e Trasparenza ---
  'Trasparenza Decisionale': {
    simpleExplanation: 'Puoi spiegare perché il sistema ha preso una certa decisione? Le persone hanno il diritto di saperlo. Non puoi dire "è l\'AI" e basta. Devi spiegare quali fattori ha considerato (es. "il punteggio è basso perché hai pochi anni di esperienza"). Come quando chiedi a un insegnante perché hai preso 6: deve spiegare.',
    question: 'Se il sistema prende una decisione su di te, te la spiega? Capisci perché ha deciso così o ti dicono solo "è l\'AI"?',
    regulation: {
      name: 'AI Act',
      article: 'Art. 13',
      requirement: 'Sistemi ad alto rischio devono essere trasparenti e spiegabili',
      url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32021R2066'
    },
    bestPractice: 'Fornire spiegazioni comprensibili delle decisioni. Mostrare fattori principali. Consentire contestazione.',
    risk: 'Decisioni opache minano fiducia, rendono difficile contestare errori, possono nascondere bias.',
    externalLink: 'https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai'
  },
  'Accountability Pubblica': {
    simpleExplanation: 'Chi è responsabile se il sistema sbaglia? Deve essere chiaro. Se il sistema fa un errore che danneggia qualcuno, c\'è qualcuno che risponde? Chi? Come lo contatti? Pubblica chi gestisce il sistema e chi è responsabile. Come quando vai in ospedale: se qualcosa va storto, sai chi è responsabile.',
    question: 'Chi è responsabile delle decisioni del sistema? È chiaro?',
    regulation: {
      name: 'AI Act',
      article: 'Art. 14',
      requirement: 'Sistemi ad alto rischio devono avere governance e accountability',
      url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32021R2066'
    },
    bestPractice: 'Definire chiaramente responsabilità. Pubblicare chi gestisce il sistema. Canali per reclami e responsabilità.',
    risk: 'Senza accountability chiara, errori o danni possono non essere attribuiti, vittime senza risarcimento.',
    externalLink: 'https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai'
  },
  'Fiducia dei Cittadini': {
    simpleExplanation: 'La fiducia si costruisce con onestà e trasparenza. Se nascondi errori o spieghi male, la perdi. E una volta persa, è difficile recuperarla. Sii onesto sui limiti del sistema, ammetti gli errori, rispondi alle preoccupazioni. Come una relazione: la fiducia si costruisce nel tempo con comportamenti onesti.',
    question: 'Come costruisci e mantieni fiducia nel sistema?',
    regulation: {
      name: 'AI Act',
      article: 'Art. 13-14',
      requirement: 'Trasparenza, spiegabilità, governance per costruire fiducia',
      url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32021R2066'
    },
    bestPractice: 'Comunicare onestamente limiti ed errori. Consentire feedback. Rispondere a preoccupazioni. Mostrare miglioramenti continui.',
    risk: 'Fiducia persa è difficile da recuperare. Errori nascosti o comunicazione opaca distruggono fiducia pubblica.',
    externalLink: 'https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai'
  },
  'Tabella Scoring': {
    simpleExplanation: 'Come viene calcolato il punteggio? Cosa conta di più? Cosa conta di meno? Deve essere spiegato chiaramente. E la persona deve poter contestare: "Perché ho questo punteggio? Cosa posso fare per migliorarlo?". Come quando chiedi spiegazioni su un voto a scuola.',
    question: 'Se il sistema ti dà un punteggio, capisci come è stato calcolato? Cosa conta di più? Puoi contestarlo se ti sembra sbagliato?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 22',
      requirement: 'Diritto di contestazione e spiegazione di decisioni automatizzate',
      url: 'https://gdpr-info.eu/art-22-gdpr/'
    },
    bestPractice: 'Spiegare criteri di scoring. Consentire accesso a dati usati. Fornire meccanismo di contestazione. Review umana disponibile.',
    risk: 'Scoring opaco può nascondere bias o errori. Senza contestazione, errori non possono essere corretti.',
    externalLink: 'https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/artificial-intelligence/guidance-on-ai-and-data-protection/automated-decision-making-and-profiling/'
  },
  'Messaggi ai cittadini': {
    simpleExplanation: 'I messaggi che invii ai cittadini devono essere chiari e comprensibili per tutti, non solo per esperti. Evita gergo tecnico, usa linguaggio semplice, spiega come se parlassi a una persona qualunque. Testa con persone reali: capiscono? Se non capiscono, riformula. Come quando spieghi qualcosa a un bambino: usi parole semplici.',
    question: 'I messaggi sono chiari e comprensibili? Evitano tecnicismi?',
    regulation: {
      name: 'AI Act',
      article: 'Art. 13',
      requirement: 'Informazioni devono essere comprensibili agli utenti',
      url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32021R2066'
    },
    bestPractice: 'Linguaggio semplice, evitare gergo tecnico. Testare comprensibilità con utenti reali. Fornire esempi concreti.',
    risk: 'Messaggi incomprensibili possono confondere utenti, causare scelte sbagliate, minare fiducia.',
    externalLink: 'https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai'
  },

  // --- BLOCCHI RISK PER UTENTI FINALI ---
  'Privacy Dati': {
    simpleExplanation: 'I tuoi dati personali sono preziosi e devono essere protetti. Quando li condividi con un sistema AI, hai diritto a sapere come vengono usati, dove vengono salvati e chi può accedervi. Se i tuoi dati vengono rubati o usati male, possono causarti problemi.',
    question: 'Sai come vengono usati i tuoi dati personali? Hai letto l\'informativa privacy? Puoi chiedere che vengano cancellati?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 13-14 & Art. 17',
      requirement: 'Hai diritto a sapere come vengono usati i tuoi dati e a chiederne la cancellazione',
      url: 'https://gdpr-info.eu/art-13-gdpr/'
    },
    bestPractice: 'Leggi sempre l\'informativa privacy prima di condividere dati. Usa solo servizi che ti permettono di controllare e cancellare i tuoi dati.',
    risk: 'Se condividi dati senza sapere come vengono usati, potrebbero essere venduti, usati male o finire nelle mani sbagliate.',
    example: 'Se condividi il tuo nome e email con ChatGPT senza leggere la privacy policy, quei dati possono essere usati da OpenAI per migliorare il sistema o condivisi con terze parti.',
    whatYouCanDo: [
      'Leggi sempre l\'informativa privacy prima di condividere dati personali',
      'Chiedi al fornitore del servizio di cancellare i tuoi dati se non vuoi più usarli',
      'Usa solo servizi che ti permettono di controllare i tuoi dati',
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
  'Esposizione Dati Lavoro': {
    simpleExplanation: 'I dati di lavoro (documenti aziendali, informazioni su clienti, ecc.) sono spesso confidenziali. Quando li condividi con un sistema AI, stai potenzialmente violando la confidenzialità della tua azienda. I dati di lavoro finiscono spesso su server americani, dove possono essere accessibili ad altre persone.',
    question: 'La tua azienda ti permette di condividere dati di lavoro con sistemi AI? Hai verificato le policy aziendali?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 32 & Art. 28',
      requirement: 'Dati aziendali devono essere protetti. Condividerli con fornitori richiede accordi specifici',
      url: 'https://gdpr-info.eu/art-28-gdpr/'
    },
    bestPractice: 'Verifica con il tuo capo o IT aziendale se puoi usare sistemi AI per dati di lavoro. Usa solo strumenti approvati dall\'azienda.',
    risk: 'Condividere dati di lavoro con sistemi AI non autorizzati può violare la confidenzialità, causare problemi legali, o esporre informazioni sensibili a competitor.',
    example: 'Se condividi un documento con informazioni su clienti con ChatGPT, stai potenzialmente violando la confidenzialità dei dati e il GDPR. L\'azienda potrebbe avere problemi legali.',
    whatYouCanDo: [
      'Verifica sempre con la tua azienda se è permesso usare sistemi AI per dati di lavoro',
      'Usa solo strumenti approvati dall\'azienda',
      'Non condividere dati confidenziali senza autorizzazione',
      'Leggi le policy aziendali sulla privacy e sicurezza dati'
    ],
    redFlags: [
      'Condividi dati di lavoro con sistemi AI senza autorizzazione',
      'Non sai se la tua azienda permette l\'uso di AI per dati confidenziali',
      'Usi strumenti AI pubblici per documenti aziendali senza verificare',
      'Non hai letto le policy aziendali sulla privacy'
    ],
    externalLink: 'https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/controllers-and-processors/'
  },
  'Rischio Discriminazione': {
    simpleExplanation: 'I sistemi AI possono avere pregiudizi e discriminare alcune persone o gruppi. Per esempio, un sistema di assunzione potrebbe preferire candidati maschi o un sistema di prestito potrebbe discriminare persone di certi gruppi etnici. Hai diritto a non essere discriminato.',
    question: 'Pensi che il sistema possa discriminarti? Hai mai notato trattamenti diversi o ingiusti?',
    regulation: {
      name: 'AI Act & GDPR',
      article: 'Art. 10 AI Act & Art. 22 GDPR',
      requirement: 'Sistemi AI non devono discriminare. Hai diritto a non essere soggetto a decisioni discriminatorie',
      url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32021R2066'
    },
    bestPractice: 'Se pensi di essere stato discriminato, chiedi spiegazioni al fornitore del servizio. Contatta il DPO (Data Protection Officer) dell\'organizzazione. Puoi anche contattare un\'autorità di protezione dati.',
    risk: 'Sistemi AI con bias possono escludere o discriminare gruppi di persone, perpetuare ingiustizie sociali, o violare diritti fondamentali.',
    example: 'Un sistema di screening CV che scarta automaticamente candidati con nomi stranieri discrimina ingiustamente. Un sistema di prestito che rifiuta più spesso persone di certi gruppi etnici è discriminatorio.',
    whatYouCanDo: [
      'Se pensi di essere stato discriminato, chiedi spiegazioni al fornitore',
      'Contatta il DPO (Data Protection Officer) dell\'organizzazione',
      'Puoi contattare l\'autorità di protezione dati (in Italia: Garante Privacy)',
      'Documenta le situazioni in cui pensi di essere stato discriminato'
    ],
    redFlags: [
      'Il sistema sembra trattare certi gruppi di persone in modo diverso',
      'Non ottieni spiegazioni quando chiedi perché sei stato rifiutato/escluso',
      'Hai notato pattern di discriminazione (es. sempre rifiutato per prestiti)',
      'Il sistema non monitora o non verifica la presenza di bias'
    ],
    externalLink: 'https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai'
  },
  'Decisioni Automatiche': {
    simpleExplanation: 'Quando un sistema AI prende decisioni importanti su di te automaticamente (es. rifiuta un prestito, approva/rifiuta un\'assunzione), hai diritto a sapere perché e a chiedere a un umano di ricontrollare. Non devi accettare decisioni automatiche senza possibilità di appello.',
    question: 'Se il sistema prende una decisione importante su di te (es. rifiuta un prestito), puoi contestarla? C\'è qualcuno che può rivederla?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 22',
      requirement: 'Hai diritto di non essere sottoposto a decisioni basate unicamente su trattamento automatizzato. Diritto di contestazione.',
      url: 'https://gdpr-info.eu/art-22-gdpr/'
    },
    bestPractice: 'Leggi le condizioni d\'uso del servizio per vedere se puoi contestare decisioni. Chiedi al fornitore come fare appello. Non accettare decisioni automatiche senza possibilità di revisione umana.',
    risk: 'Decisioni automatiche senza possibilità di contestazione violano GDPR. Potresti subire ingiustizie o discriminazioni senza rimedio.',
    example: 'Se un sistema di prestito ti rifiuta automaticamente e non puoi parlare con nessuno o chiedere una revisione, il sistema viola il GDPR. Hai diritto a una revisione umana.',
    whatYouCanDo: [
      'Leggi le condizioni d\'uso per vedere se puoi contestare decisioni',
      'Chiedi al fornitore come fare appello a decisioni automatiche',
      'Esercita il tuo diritto GDPR (Art. 22) di non essere soggetto a decisioni solo automatiche',
      'Richiedi una revisione umana se la decisione ti sembra ingiusta'
    ],
    redFlags: [
      'Il sistema decide tutto automaticamente senza possibilità di appello',
      'Non c\'è modo di parlare con una persona se qualcosa va storto',
      'Non ti hanno informato che le decisioni sono automatiche',
      'Non puoi chiedere una spiegazione della decisione'
    ],
    externalLink: 'https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/artificial-intelligence/guidance-on-ai-and-data-protection/automated-decision-making-and-profiling/'
  },
  'Mancanza Trasparenza': {
    simpleExplanation: 'Hai diritto a capire come funziona un sistema AI che usa i tuoi dati o prende decisioni su di te. Se il sistema è una "scatola nera" e non sai come funziona o perché prende certe decisioni, hai diritto a chiedere spiegazioni. La trasparenza è un tuo diritto.',
    question: 'Capisci come funziona questo sistema? Sai perché prende certe decisioni? Hai ricevuto spiegazioni comprensibili?',
    regulation: {
      name: 'AI Act & GDPR',
      article: 'Art. 13 AI Act & Art. 13-14 GDPR',
      requirement: 'Hai diritto a capire come funzionano i sistemi AI e perché prendono certe decisioni',
      url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32021R2066'
    },
    bestPractice: 'Chiedi spiegazioni al fornitore del servizio su come funziona il sistema. Leggi le condizioni d\'uso. Verifica se ci sono documenti che spiegano il funzionamento. Non usare sistemi che non ti spiegano come funzionano.',
    risk: 'Se non capisci come funziona il sistema, potresti accettare decisioni ingiuste, non riconoscere discriminazioni, o non sapere come proteggere i tuoi diritti.',
    example: 'Se un sistema di raccomandazione ti suggerisce sempre le stesse cose senza spiegarti perché, o un sistema di credit scoring ti rifiuta senza dire quali criteri usa, non c\'è trasparenza.',
    whatYouCanDo: [
      'Chiedi spiegazioni al fornitore su come funziona il sistema',
      'Leggi le condizioni d\'uso e la documentazione disponibile',
      'Chiedi informazioni sulle decisioni che il sistema prende su di te',
      'Non usare sistemi che non ti spiegano come funzionano'
    ],
    redFlags: [
      'Il sistema è una "scatola nera": non sai come funziona',
      'Non ricevi spiegazioni quando chiedi come funziona',
      'Le spiegazioni sono troppo tecniche o incomprensibili',
      'Il fornitore rifiuta di spiegare come funziona il sistema'
    ],
    externalLink: 'https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai'
  },
};

/**
 * Get educational knowledge for a note based on its label
 * @param label - The label of the note
 * @param locale - Optional: locale for translation ('it' | 'en')
 */
export function getNoteKnowledge(label: string, locale: 'it' | 'en' = 'it'): NoteKnowledge | null {
  const knowledge = NOTE_KNOWLEDGE[label];
  if (!knowledge) return null;
  
  // If locale is 'it', return as-is
  if (locale === 'it') {
    return knowledge;
  }
  
  // For 'en', try to translate
  if (locale === 'en') {
    // Dynamic import to avoid circular dependencies
    const { translateNoteKnowledge } = require('@/lib/i18n/noteKnowledgeTranslations');
    const translated = translateNoteKnowledge(knowledge, label);
    return translated || knowledge; // Use Italian as fallback if no translation
  }
  
  return knowledge;
}

/**
 * Get a critical question for the note (fallback to generic if not found)
 */
export function getNoteQuestion(label: string, type: 'risk' | 'impact', locale: 'it' | 'en' = 'it'): string {
  const knowledge = getNoteKnowledge(label, locale);
  if (knowledge?.question) {
    return knowledge.question;
  }

  // Generic questions based on type (orientate all'utente finale)
  if (type === 'risk') {
    return locale === 'en' 
      ? 'What risks do you see in using this system? What could go wrong?'
      : 'Quali rischi vedi nell\'uso di questo sistema? Cosa potrebbe andare storto?';
  }
  return locale === 'en'
    ? 'What impact does this system have on you or other people?'
    : 'Quale impatto ha questo sistema su di te o su altre persone?';
}

