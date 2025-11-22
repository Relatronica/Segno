import { ScenarioBlock, Connection } from '@/store/useAppStore';
import { matchesLabel, hasDataFlow, receivesFromType, findBlocksByLabel, normalizeLabel } from './riskHelpers';

export type Regulation = 'AI_ACT' | 'GDPR' | 'COPYRIGHT';

export type Rule = {
  id: string;
  regulation: Regulation;
  article: string; // es. "Art. 5(1)(d)"
  description: string;
  simpleExplanation?: string; // Spiegazione divulgativa per non esperti
  severity: 'prohibited' | 'high_risk' | 'obligation' | 'best_practice';
  trigger: (blocks: ScenarioBlock[], connections: Connection[]) => boolean;
  mitigation?: string;
  mitigationSimple?: string; // Spiegazione semplice della mitigazione
};

export const KNOWLEDGE_BASE: Rule[] = [
  // --- AI ACT RULES ---
  {
    id: 'aiact-prohibited-biometric',
    regulation: 'AI_ACT',
    article: 'Art. 5(1)',
    description: "È VIETATO l'uso di sistemi di identificazione biometrica remota 'in tempo reale' in spazi accessibili al pubblico per fini di contrasto.",
    simpleExplanation: "La legge vieta di usare sistemi che riconoscono le persone in tempo reale tramite volto/impronta nelle telecamere pubbliche. È una delle poche pratiche completamente vietate dall'AI Act.",
    severity: 'prohibited',
    trigger: (blocks, connections) => {
      const biometric = findBlocksByLabel(blocks, ['Analisi Biometrica', 'Bio Analysis', 'Biometrica'])[0];
      const video = findBlocksByLabel(blocks, ['Video', 'Immagini', 'Surveillance'])[0];
      
      if (!biometric || !video) return false;
      
      // Verifica che ci sia flusso dati tra video e biometrica
      return biometric.type === 'process' && 
             video.type === 'input' && 
             hasDataFlow(blocks, connections, 'input', 'process');
    },
    mitigation: "Rimuovere l'identificazione in tempo reale o limitarla strettamente ai casi di eccezione (terrorismo, ricerca dispersi).",
    mitigationSimple: "Non usare il riconoscimento facciale in tempo reale nelle telecamere pubbliche. Puoi usarlo solo per casi eccezionali (terrorismo) e devi avere autorizzazione specifica."
  },
  {
    id: 'aiact-highrisk-biometric',
    regulation: 'AI_ACT',
    article: 'Art. 6 & Annex III',
    description: "I sistemi di identificazione biometrica remota (non in tempo reale) sono classificati ad ALTO RISCHIO.",
    simpleExplanation: "Anche se non è in tempo reale, riconoscere le persone tramite volto/impronta è considerato ad alto rischio. Devi seguire regole precise: registrare il sistema in un database europeo, fare test di qualità, e permettere controlli.",
    severity: 'high_risk',
    trigger: (blocks) => findBlocksByLabel(blocks, ['Analisi Biometrica', 'Bio Analysis', 'Biometrica']).length > 0,
    mitigation: "Obbligo di registrazione nel database UE, marcatura CE, e sistema di gestione della qualità.",
    mitigationSimple: "Devi registrare il sistema in un database europeo, fare test per verificare che funzioni bene, e permettere controlli periodici."
  },
  {
    id: 'aiact-transparency-chat',
    regulation: 'AI_ACT',
    article: 'Art. 50(1)',
    description: "Obbligo di trasparenza: le persone devono essere informate che stanno interagendo con un sistema di IA.",
    simpleExplanation: "Quando qualcuno parla con un chatbot, deve sapere che sta parlando con una macchina, non con una persona. È come quando compri qualcosa: devi sapere chi stai comprando da.",
    severity: 'obligation',
    trigger: (blocks) => findBlocksByLabel(blocks, ['Chatbot LLM', 'LLM', 'LLM Model']).length > 0,
    mitigation: "Inserire un disclaimer chiaro nell'interfaccia utente.",
    mitigationSimple: "Metti un messaggio chiaro che dice 'Stai parlando con un sistema di intelligenza artificiale' prima che l'utente inizi a usarlo."
  },
  
  // --- GDPR: DATA TRANSFERS & INFRASTRUCTURE ---
  {
    id: 'gdpr-data-transfer-usa',
    regulation: 'GDPR',
    article: 'Art. 44-49 (Schrems II)',
    description: "Il trasferimento di dati personali verso provider USA richiede misure supplementari (SCC + Encryption) o è a rischio di invalidazione.",
    simpleExplanation: "Se metti i dati dei tuoi utenti su server americani (come AWS, Google Cloud), devi proteggerli in modo particolare perché le leggi USA permettono al governo di accedere ai dati. Se non li proteggi bene, rischi multe.",
    severity: 'high_risk',
    trigger: (blocks, connections) => {
      const usaStorage = findBlocksByLabel(blocks, ['Cloud', 'USA', 'US Storage', 'Trasferimento Extra-UE'])[0];
      if (!usaStorage) return false;
      
      // Verifica se ci sono dati personali che fluiscono verso lo storage USA
      const hasPersonalData = blocks.some(b => 
        b.type === 'input' && 
        (b.config?.dataTypes?.some((dt: string) => 
          ['Personali', 'Biometrici', 'Sanitari', 'Identificativi'].includes(dt)
        ))
      );
      
      if (!hasPersonalData) return false;
      
      // Verifica se i dati personali fluiscono verso lo storage USA
      return receivesFromType(blocks, connections, 'storage', 'input') ||
             hasDataFlow(blocks, connections, 'input', 'storage');
    },
    mitigation: "Verificare la localizzazione dei dati. Preferire provider con data center EU o adottare cifratura BYOK.",
    mitigationSimple: "Scegli server in Europa (Francoforte, Dublino, Milano) invece di quelli USA. Se devi usare server USA, cifra i dati e tieni tu le chiavi di cifratura (BYOK - Bring Your Own Key)."
  },
  {
    id: 'gdpr-security-storage',
    regulation: 'GDPR',
    article: 'Art. 32',
    description: "I dati sensibili/biometrici devono essere archiviati su infrastrutture sicure e cifrate.",
    simpleExplanation: "I dati sensibili (come impronte digitali o informazioni sanitarie) devono essere conservati in modo sicuro, con cifratura. È come mettere documenti importanti in una cassaforte invece che in un cassetto aperto.",
    severity: 'obligation',
    trigger: (blocks, connections) => {
      const biometricInput = blocks.find(b => 
        b.type === 'input' && b.config?.dataTypes?.includes('Biometrici')
      );
      const storage = blocks.find(b => b.type === 'storage');
      
      // Se ci sono dati biometrici ma non c'è storage esplicito
      if (biometricInput && !storage) return true;
      
      // Se c'è storage ma non è cifrato e contiene dati sensibili
      if (storage && !storage.config?.isEncrypted) {
        const hasBiometricData = blocks.some(b => 
          b.config?.dataTypes?.includes('Biometrici')
        );
        return hasBiometricData && hasDataFlow(blocks, connections, 'input', 'storage');
      }
      
      return false;
    },
    mitigation: "Aggiungi un blocco 'Infrastruttura' per definire dove risiedono i dati sensibili e assicurati che sia cifrata.",
    mitigationSimple: "Aggiungi un blocco che mostra dove conservi i dati e verifica che siano cifrati. I dati biometrici non possono essere conservati senza cifratura."
  },
  {
    id: 'gdpr-special-categories',
    regulation: 'GDPR',
    article: 'Art. 9',
    description: "Trattamento di categorie particolari di dati (biometrici, sanitari) è vietato salvo esplicito consenso o necessità legale.",
    simpleExplanation: "I dati biometrici (volto, impronta) e sanitari sono dati speciali: non puoi usarli liberamente. Devi chiedere consenso esplicito o avere una ragione legale specifica. Non basta dire 'accetto i termini', serve un consenso separato e chiaro.",
    severity: 'high_risk',
    trigger: (blocks) => 
      blocks.some(b => 
        b.config?.dataTypes?.some((dt: string) => 
          ['Biometrici', 'Sanitari'].includes(dt)
        )
      ),
    mitigation: "Acquisire consenso esplicito o verificare base giuridica (Art. 9.2).",
    mitigationSimple: "Chiedi un consenso separato e specifico per questi dati. Non puoi includerlo nei termini generali. La persona deve capire esattamente a cosa sta dando il consenso."
  },
  {
    id: 'gdpr-automated-decision',
    regulation: 'GDPR',
    article: 'Art. 22',
    description: "L'interessato ha il diritto di non essere sottoposto a una decisione basata unicamente sul trattamento automatizzato.",
    simpleExplanation: "Non puoi lasciare che sia solo la macchina a prendere decisioni importanti su una persona (es. concedere un prestito, assumere, bocciare). Una persona deve sempre poter controllare e correggere.",
    severity: 'high_risk',
    trigger: (blocks) => {
      const decision = findBlocksByLabel(blocks, ['Decisione Automatica'])[0];
      if (!decision) return false;
      
      // Verifica se NON c'è supervisione umana
      const hasHumanLoop = blocks.some(b => b.config?.humanInTheLoop);
      return !hasHumanLoop;
    },
    mitigation: "Introdurre un meccanismo di intervento umano (Human-in-the-loop).",
    mitigationSimple: "Assicurati che ci sia sempre una persona che può rivedere e cambiare le decisioni automatiche. Non puoi lasciare che sia solo la macchina a decidere cose importanti."
  },
  {
    id: 'gdpr-storage-limitation',
    regulation: 'GDPR',
    article: 'Art. 5(1)(e)',
    description: "I dati devono essere conservati per un arco di tempo non superiore al conseguimento delle finalità.",
    simpleExplanation: "Non puoi tenere i dati per sempre. Devi dire per quanto tempo li conservi e cancellarli quando non ti servono più. È come non tenere vecchie fatture per 20 anni se non ti servono.",
    severity: 'obligation',
    trigger: (blocks) => blocks.some(b => b.config?.retention === 'indefinite'),
    mitigation: "Definire una policy di ritenzione dati specifica e limitata nel tempo.",
    mitigationSimple: "Decidi per quanto tempo conservi i dati (es. 2 anni, 5 anni) e programma la loro cancellazione automatica quando scade il tempo. Non tenerli per sempre 'nel caso servano'."
  },

  // --- GDPR: INFORMATION & TRANSPARENCY ---
  {
    id: 'gdpr-information-duty',
    regulation: 'GDPR',
    article: 'Art. 13-14',
    description: "Obbligo di informare l'interessato PRIMA della raccolta: chi, cosa, perché, per quanto tempo, diritti.",
    simpleExplanation: "Prima di raccogliere i dati di una persona, devi dirle esattamente: chi sei, cosa raccogli, perché lo fai, per quanto tempo li tieni, e quali diritti ha (vedere, correggere, cancellare i suoi dati).",
    severity: 'obligation',
    trigger: (blocks) => {
      const hasPersonalData = blocks.some(b => 
        b.type === 'input' && 
        b.config?.dataTypes?.some((dt: string) => 
          ['Personali', 'Biometrici', 'Sanitari', 'Identificativi'].includes(dt)
        )
      );
      
      // Verifica se c'è un blocco che rappresenta l'informativa
      const hasInfoBlock = blocks.some(b => 
        matchesLabel(b, ['Informativa', 'Privacy Notice', 'Informativa Privacy'])
      );
      
      return hasPersonalData && !hasInfoBlock;
    },
    mitigation: "Aggiungi un'informativa privacy chiara e accessibile che spiega tutti questi dettagli prima della raccolta dati.",
    mitigationSimple: "Crea un documento chiaro (informativa privacy) che spiega tutto questo e mostralo all'utente prima di raccogliere i suoi dati. Non nasconderlo nei termini di servizio."
  },
  
  // --- GDPR: PRIVACY BY DESIGN ---
  {
    id: 'gdpr-privacy-by-design',
    regulation: 'GDPR',
    article: 'Art. 25',
    description: "Privacy by design: protezione dati fin dalla progettazione e di default (minimizzazione, cifratura, pseudonimizzazione).",
    simpleExplanation: "Devi proteggere i dati fin dall'inizio, non dopo. È meglio progettare il sistema pensando alla privacy piuttosto che aggiungere protezioni dopo. Esempi: cifrare di default, non raccogliere più dati del necessario.",
    severity: 'best_practice',
    trigger: (blocks) => {
      // Verifica se ci sono best practices implementate
      const hasEncryption = blocks.some(b => b.config?.isEncrypted);
      const hasMinimization = blocks.every(b => {
        const dataTypes = b.config?.dataTypes || [];
        // Se ci sono molti tipi di dati, potrebbe non esserci minimizzazione
        return dataTypes.length <= 3;
      });
      
      // Se non ci sono best practices, è un problema
      return blocks.some(b => 
        b.type === 'input' && 
        b.config?.dataTypes?.some((dt: string) => 
          ['Personali'].includes(dt)
        )
      ) && !hasEncryption && !hasMinimization;
    },
    mitigation: "Implementare privacy by design: minimizzazione dati, cifratura di default, pseudonimizzazione.",
    mitigationSimple: "Pensa alla privacy fin dall'inizio: raccogli solo i dati che ti servono davvero, cifra tutto di default, non tenere dati che possono identificare le persone se non è necessario."
  },
  
  // --- GDPR: DATA PROCESSING RECORD ---
  {
    id: 'gdpr-processing-record',
    regulation: 'GDPR',
    article: 'Art. 30',
    description: "Obbligo di tenere un registro dei trattamenti: chi, cosa, perché, dove, per quanto tempo (per organizzazioni >250 dipendenti o trattamento ad alto rischio).",
    simpleExplanation: "Devi tenere un registro (come un diario) che documenta: quali dati raccogli, da chi, perché, dove li tieni, per quanto tempo. Non serve per tutte le aziende, ma se sei grande o tratti dati sensibili sì.",
    severity: 'obligation',
    trigger: (blocks) => {
      const hasHighRiskData = blocks.some(b => 
        b.config?.dataTypes?.some((dt: string) => 
          ['Biometrici', 'Sanitari'].includes(dt)
        )
      );
      
      const hasProcessingRecord = blocks.some(b => 
        matchesLabel(b, ['Registro Trattamenti', 'Processing Record', 'Audit Trail'])
      );
      
      return hasHighRiskData && !hasProcessingRecord;
    },
    mitigation: "Tenere un registro dei trattamenti conforme all'Art. 30 GDPR, aggiornato e accessibile all'autorità di controllo.",
    mitigationSimple: "Crea un documento che elenca tutti i trattamenti di dati che fai, aggiornalo quando cambi qualcosa, e tienilo a disposizione per eventuali controlli."
  },
  
  // --- GDPR: DPIA ---
  {
    id: 'gdpr-dpia',
    regulation: 'GDPR',
    article: 'Art. 35',
    description: "Data Protection Impact Assessment (DPIA): valutazione obbligatoria prima di trattamenti ad alto rischio.",
    simpleExplanation: "Se fai qualcosa di rischioso con i dati (es. analisi biometrica, decisioni automatizzate), devi fare una valutazione dei rischi prima di iniziare. È come un controllo tecnico per la privacy: valuti i rischi e decidi come proteggerti.",
    severity: 'obligation',
    trigger: (blocks) => {
      const hasHighRiskProcessing = 
        findBlocksByLabel(blocks, ['Analisi Biometrica', 'Biometrica']).length > 0 ||
        blocks.some(b => b.config?.dataTypes?.includes('Biometrici')) ||
        blocks.some(b => b.config?.dataTypes?.includes('Sanitari')) ||
        (findBlocksByLabel(blocks, ['Decisione Automatica']).length > 0 && 
         !blocks.some(b => b.config?.humanInTheLoop));
      
      const hasDPIA = blocks.some(b => 
        matchesLabel(b, ['DPIA', 'Impact Assessment', 'Valutazione Impatto'])
      );
      
      return hasHighRiskProcessing && !hasDPIA;
    },
    mitigation: "Eseguire una DPIA conforme all'Art. 35 GDPR prima di avviare il trattamento ad alto rischio.",
    mitigationSimple: "Fai una valutazione dei rischi per la privacy prima di usare dati sensibili o sistemi ad alto rischio. Documenta i rischi e come li gestisci. Se serve, consulta il DPO o l'autorità di controllo."
  },
  
  // --- AI ACT: HIGH RISK SYSTEMS ---
  {
    id: 'aiact-highrisk-systems',
    regulation: 'AI_ACT',
    article: 'Art. 6 & Annex III',
    description: "I sistemi AI ad alto rischio richiedono marcatura CE, gestione qualità, documentazione utente, supervisione umana.",
    simpleExplanation: "Se usi AI in settori delicati (sanità, trasporti, istruzione, HR, giustizia), devi seguire regole precise: testare che funzioni bene, documentare come funziona, permettere controlli umani. È come un'automobile: devi avere il certificato di conformità.",
    severity: 'high_risk',
    trigger: (blocks) => {
      // Verifica se ci sono sistemi AI in settori ad alto rischio
      const highRiskProcesses = findBlocksByLabel(blocks, [
        'Analisi Biometrica',
        'Chatbot LLM',
        'Decisione Automatica',
        'LLM',
        'RAG System'
      ]);
      
      return highRiskProcesses.length > 0;
    },
    mitigation: "Verificare se il sistema è classificato ad alto rischio secondo AI Act Annex III. Se sì, implementare gestione qualità, documentazione utente, supervisione umana.",
    mitigationSimple: "Verifica se il tuo sistema AI è classificato ad alto rischio. Se sì, devi fare test di qualità, scrivere documentazione su come funziona, e permettere controlli umani. Potresti aver bisogno di marcatura CE."
  },
  
  // --- AI ACT: USER DOCUMENTATION ---
  {
    id: 'aiact-user-documentation',
    regulation: 'AI_ACT',
    article: 'Art. 13',
    description: "Sistemi ad alto rischio devono fornire documentazione chiara all'utente: come funziona, limiti, supervisione umana.",
    simpleExplanation: "Se hai un sistema AI ad alto rischio, devi spiegare all'utente come funziona in modo chiaro: cosa fa, quali sono i suoi limiti, se c'è una persona che lo controlla. È come un manuale d'uso, ma per l'AI.",
    severity: 'obligation',
    trigger: (blocks) => {
      const hasHighRiskAI = findBlocksByLabel(blocks, [
        'Analisi Biometrica',
        'Decisione Automatica'
      ]).length > 0;
      
      const hasDocumentation = blocks.some(b => 
        matchesLabel(b, ['Documentazione', 'User Documentation', 'Manuale'])
      );
      
      return hasHighRiskAI && !hasDocumentation;
    },
    mitigation: "Fornire documentazione utente chiara che spiega funzionamento, limiti, supervisione umana del sistema AI ad alto rischio.",
    mitigationSimple: "Scrivi una documentazione semplice che spiega come funziona il tuo sistema AI, quali sono i suoi limiti, e chi lo controlla. Fallo in modo che anche una persona non tecnica possa capirlo."
  }
];

