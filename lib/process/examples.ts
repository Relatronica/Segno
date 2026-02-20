import type { Node, Edge } from '@xyflow/react';
import type { ProcessNodeData, EthicsAnalysis } from '@/store/useProcessStore';

export interface ProcessExample {
  id: string;
  title: { it: string; en: string };
  description: { it: string; en: string };
  badge: { it: string; en: string };
  badgeColor: string;
  iconName: string;
  color: string;
  nodes: Node<ProcessNodeData>[];
  edges: Edge[];
  ethicsAnalysis: EthicsAnalysis;
}

export const processExamples: ProcessExample[] = [
  {
    id: 'ecommerce-registration',
    title: {
      it: 'Registrazione e-commerce',
      en: 'E-commerce Registration',
    },
    description: {
      it: 'Processo di registrazione utente su un sito e-commerce con raccolta dati, profilazione e marketing automatizzato.',
      en: 'User registration process on an e-commerce site with data collection, profiling, and automated marketing.',
    },
    badge: { it: 'Rischio Medio', en: 'Medium Risk' },
    badgeColor: 'bg-amber-500/10 text-amber-600',
    iconName: 'ShoppingCart',
    color: 'from-blue-500 to-blue-600',
    nodes: [
      {
        id: 'n1',
        type: 'processNode',
        position: { x: 230, y: 0 },
        data: { label: 'Utente visita il sito', description: 'L\'utente accede al sito e-commerce', type: 'start' },
      },
      {
        id: 'n2',
        type: 'processNode',
        position: { x: 230, y: 120 },
        data: { label: 'Form di registrazione', description: 'Raccolta nome, email, indirizzo, telefono, data di nascita', type: 'data' },
      },
      {
        id: 'n3',
        type: 'processNode',
        position: { x: 230, y: 240 },
        data: { label: 'Consenso cookie e marketing', description: 'Richiesta consenso per cookie di profilazione e comunicazioni marketing', type: 'decision' },
      },
      {
        id: 'n4',
        type: 'processNode',
        position: { x: 50, y: 360 },
        data: { label: 'Solo cookie tecnici', description: 'Nessuna profilazione, solo funzionalità base', type: 'process' },
      },
      {
        id: 'n5',
        type: 'processNode',
        position: { x: 410, y: 360 },
        data: { label: 'Profilazione attivata', description: 'Cookie di terze parti, tracciamento comportamento, interessi', type: 'data', riskLevel: 'limited' },
      },
      {
        id: 'n6',
        type: 'processNode',
        position: { x: 230, y: 480 },
        data: { label: 'Creazione profilo utente', description: 'Salvataggio dati nel database, assegnazione ID cliente', type: 'process' },
      },
      {
        id: 'n7',
        type: 'processNode',
        position: { x: 410, y: 600 },
        data: { label: 'Segmentazione automatica', description: 'Algoritmo ML classifica utente in segmenti marketing', type: 'ai', riskLevel: 'limited' },
      },
      {
        id: 'n8',
        type: 'processNode',
        position: { x: 410, y: 720 },
        data: { label: 'Email marketing personalizzate', description: 'Invio automatico di offerte basate sul profilo', type: 'process' },
      },
      {
        id: 'n9',
        type: 'processNode',
        position: { x: 50, y: 600 },
        data: { label: 'Verifica email', description: 'Invio email di conferma con link di attivazione', type: 'process' },
      },
      {
        id: 'n10',
        type: 'processNode',
        position: { x: 230, y: 840 },
        data: { label: 'Account attivo', description: 'L\'utente può iniziare ad acquistare', type: 'end' },
      },
    ],
    edges: [
      { id: 'e1', source: 'n1', target: 'n2', type: 'smoothstep', animated: true },
      { id: 'e2', source: 'n2', target: 'n3', type: 'smoothstep', animated: true },
      { id: 'e3', source: 'n3', target: 'n4', label: 'Rifiuta', type: 'smoothstep', animated: true },
      { id: 'e4', source: 'n3', target: 'n5', label: 'Accetta', type: 'smoothstep', animated: true },
      { id: 'e5', source: 'n4', target: 'n6', type: 'smoothstep', animated: true },
      { id: 'e6', source: 'n5', target: 'n6', type: 'smoothstep', animated: true },
      { id: 'e7', source: 'n6', target: 'n7', type: 'smoothstep', animated: true },
      { id: 'e8', source: 'n6', target: 'n9', type: 'smoothstep', animated: true },
      { id: 'e9', source: 'n7', target: 'n8', type: 'smoothstep', animated: true },
      { id: 'e10', source: 'n8', target: 'n10', type: 'smoothstep', animated: true },
      { id: 'e11', source: 'n9', target: 'n10', type: 'smoothstep', animated: true },
    ],
    ethicsAnalysis: {
      overallScore: 62,
      gdpr: {
        score: 58,
        issues: [
          'La raccolta della data di nascita potrebbe non rispettare il principio di minimizzazione dei dati se non strettamente necessaria.',
          'La profilazione automatica richiede un consenso specifico e separato, non un semplice opt-in generico.',
          'Manca un riferimento chiaro alla base giuridica per il trattamento (art. 6 GDPR).',
          'Non è indicato per quanto tempo i dati vengono conservati (data retention policy).',
        ],
        suggestions: [
          'Implementare un meccanismo di consenso granulare: separare cookie tecnici, analitici e di marketing.',
          'Aggiungere un link all\'informativa privacy completa nel form di registrazione.',
          'Specificare la base giuridica: consenso per marketing, interesse legittimo per servizio base.',
          'Definire e comunicare i tempi di conservazione dei dati.',
        ],
      },
      aiAct: {
        riskLevel: 'limited',
        classification: 'Il sistema di segmentazione automatica ML rientra nella categoria di rischio limitato: non prende decisioni con impatto significativo ma influenza le comunicazioni ricevute.',
        issues: [
          'La segmentazione ML influenza le offerte mostrate all\'utente senza trasparenza sull\'algoritmo.',
          'L\'utente non ha modo di sapere perché riceve certe offerte e non altre.',
        ],
        suggestions: [
          'Aggiungere una sezione "Perché vedo questa offerta?" per garantire trasparenza algoritmica.',
          'Permettere all\'utente di modificare le proprie preferenze di segmentazione.',
        ],
      },
      ethicalConcerns: [
        'Il design potrebbe spingere verso l\'opt-in con dark patterns (es. pre-selezionare il consenso).',
        'La profilazione senza opt-out granulare limita l\'autonomia dell\'utente.',
        'La raccolta di dati non strettamente necessari (data di nascita) è una pratica discutibile.',
      ],
      improvements: [
        'Implementare Privacy by Design: chiedere solo i dati minimi necessari.',
        'Usare opt-in esplicito (non pre-selezionato) per ogni tipo di consenso.',
        'Offrire un pannello di controllo privacy dove l\'utente può gestire tutti i consensi.',
        'Aggiungere un processo di cancellazione dati semplice e accessibile.',
        'Documentare la DPIA (Data Protection Impact Assessment) per la profilazione automatica.',
      ],
    },
  },
  {
    id: 'ai-credit-scoring',
    title: {
      it: 'Credit scoring con IA',
      en: 'AI Credit Scoring',
    },
    description: {
      it: 'Sistema automatizzato di valutazione del credito basato su modelli ML che analizzano dati finanziari e comportamentali.',
      en: 'Automated credit scoring system based on ML models analyzing financial and behavioral data.',
    },
    badge: { it: 'Rischio Alto', en: 'High Risk' },
    badgeColor: 'bg-red-500/10 text-red-600',
    iconName: 'CreditCard',
    color: 'from-red-500 to-red-600',
    nodes: [
      {
        id: 'n1',
        type: 'processNode',
        position: { x: 230, y: 0 },
        data: { label: 'Richiesta di credito', description: 'Il cliente richiede un prestito o una carta di credito', type: 'start' },
      },
      {
        id: 'n2',
        type: 'processNode',
        position: { x: 230, y: 120 },
        data: { label: 'Raccolta dati finanziari', description: 'Reddito, storico bancario, debiti esistenti, patrimonio', type: 'data' },
      },
      {
        id: 'n3',
        type: 'processNode',
        position: { x: 230, y: 240 },
        data: { label: 'Raccolta dati comportamentali', description: 'Storico pagamenti, comportamento di spesa, dati social (opzionale)', type: 'data', riskLevel: 'high' },
      },
      {
        id: 'n4',
        type: 'processNode',
        position: { x: 230, y: 360 },
        data: { label: 'Modello ML di scoring', description: 'Algoritmo di machine learning calcola un punteggio di affidabilità creditizia', type: 'ai', riskLevel: 'high' },
      },
      {
        id: 'n5',
        type: 'processNode',
        position: { x: 230, y: 480 },
        data: { label: 'Decisione automatica', description: 'Il sistema decide automaticamente se approvare, rifiutare o richiedere revisione', type: 'decision', riskLevel: 'high' },
      },
      {
        id: 'n6',
        type: 'processNode',
        position: { x: 0, y: 600 },
        data: { label: 'Approvato', description: 'Il credito viene concesso con condizioni calcolate dal modello', type: 'process' },
      },
      {
        id: 'n7',
        type: 'processNode',
        position: { x: 230, y: 600 },
        data: { label: 'Revisione manuale', description: 'Un operatore umano rivede la richiesta', type: 'process' },
      },
      {
        id: 'n8',
        type: 'processNode',
        position: { x: 460, y: 600 },
        data: { label: 'Rifiutato', description: 'La richiesta viene negata con motivazione generica', type: 'process', riskLevel: 'high' },
      },
      {
        id: 'n9',
        type: 'processNode',
        position: { x: 460, y: 720 },
        data: { label: 'Notifica al cliente', description: 'Il cliente riceve comunicazione dell\'esito', type: 'process' },
      },
      {
        id: 'n10',
        type: 'processNode',
        position: { x: 230, y: 840 },
        data: { label: 'Fine processo', description: 'Il processo si conclude, dati archiviati', type: 'end' },
      },
    ],
    edges: [
      { id: 'e1', source: 'n1', target: 'n2', type: 'smoothstep', animated: true },
      { id: 'e2', source: 'n2', target: 'n3', type: 'smoothstep', animated: true },
      { id: 'e3', source: 'n3', target: 'n4', type: 'smoothstep', animated: true },
      { id: 'e4', source: 'n4', target: 'n5', type: 'smoothstep', animated: true },
      { id: 'e5', source: 'n5', target: 'n6', label: 'Score alto', type: 'smoothstep', animated: true },
      { id: 'e6', source: 'n5', target: 'n7', label: 'Score medio', type: 'smoothstep', animated: true },
      { id: 'e7', source: 'n5', target: 'n8', label: 'Score basso', type: 'smoothstep', animated: true },
      { id: 'e8', source: 'n6', target: 'n9', type: 'smoothstep', animated: true },
      { id: 'e9', source: 'n7', target: 'n9', type: 'smoothstep', animated: true },
      { id: 'e10', source: 'n8', target: 'n9', type: 'smoothstep', animated: true },
      { id: 'e11', source: 'n9', target: 'n10', type: 'smoothstep', animated: true },
    ],
    ethicsAnalysis: {
      overallScore: 35,
      gdpr: {
        score: 30,
        issues: [
          'La decisione automatizzata con effetti significativi sulla persona (art. 22 GDPR) richiede garanzie specifiche.',
          'La raccolta di dati social è sproporzionata e viola il principio di minimizzazione.',
          'L\'interessato non ha diritto effettivo a una spiegazione della decisione algoritmica.',
          'Manca un meccanismo di contestazione accessibile per il cliente.',
          'Non è chiaro se viene effettuata una DPIA obbligatoria per questo tipo di trattamento.',
        ],
        suggestions: [
          'Implementare il diritto a non essere sottoposti a decisioni automatizzate (art. 22 GDPR): permettere sempre la revisione umana.',
          'Eliminare la raccolta di dati social: non è proporzionata allo scopo.',
          'Fornire spiegazioni chiare e specifiche in caso di rifiuto, non motivazioni generiche.',
          'Creare un processo di contestazione semplice e documentato.',
          'Effettuare e documentare una DPIA prima del go-live del sistema.',
        ],
      },
      aiAct: {
        riskLevel: 'high',
        classification: 'Il credit scoring AI rientra esplicitamente nella categoria "alto rischio" dell\'AI Act (Allegato III, punto 5b): sistemi AI destinati alla valutazione dell\'affidabilità creditizia delle persone fisiche.',
        issues: [
          'Il sistema prende decisioni che impattano significativamente l\'accesso al credito delle persone.',
          'Manca documentazione sulla qualità dei dati di addestramento del modello.',
          'Non sono previsti audit periodici del modello per verificare bias e discriminazioni.',
          'La trasparenza algoritmica è insufficiente: il cliente non sa come è stato calcolato il suo score.',
        ],
        suggestions: [
          'Implementare un sistema di gestione del rischio conforme all\'AI Act (art. 9).',
          'Documentare rigorosamente dataset di training, metriche di performance e limitazioni del modello.',
          'Prevedere audit periodici indipendenti per verificare equità, bias e accuratezza.',
          'Garantire la supervisione umana effettiva: non solo "revisione manuale" opzionale.',
          'Implementare un registro delle decisioni automatizzate per accountability.',
        ],
      },
      ethicalConcerns: [
        'Il modello ML potrebbe perpetuare bias storici presenti nei dati di addestramento, discriminando gruppi vulnerabili.',
        'L\'uso di dati comportamentali e social crea un sistema di sorveglianza finanziaria sproporzionato.',
        'Le motivazioni generiche per il rifiuto impediscono al cliente di migliorare la propria posizione.',
        'Il sistema potrebbe ampliare le disuguaglianze: chi ha già difficoltà finanziarie viene ulteriormente penalizzato.',
        'La mancanza di trasparenza algoritmica mina la fiducia nel sistema finanziario.',
      ],
      improvements: [
        'Garantire che la revisione umana sia sempre disponibile, non solo per score medi.',
        'Eliminare dati social e comportamentali non direttamente legati alla capacità di rimborso.',
        'Implementare Explainable AI (XAI) per fornire spiegazioni comprensibili di ogni decisione.',
        'Testare regolarmente il modello per bias di genere, etnia, età e area geografica.',
        'Fornire al cliente un report dettagliato del proprio scoring con possibilità di rettifica.',
        'Considerare l\'adozione di un comitato etico indipendente per la supervisione del sistema.',
      ],
    },
  },
  {
    id: 'employee-wellness-ai',
    title: {
      it: 'Monitoraggio benessere dipendenti',
      en: 'Employee Wellness Monitoring',
    },
    description: {
      it: 'Sistema basato su IA che analizza dati di produttività e comunicazioni per valutare il benessere dei dipendenti e suggerire interventi.',
      en: 'AI-based system analyzing productivity data and communications to assess employee wellness and suggest interventions.',
    },
    badge: { it: 'Rischio Critico', en: 'Critical Risk' },
    badgeColor: 'bg-red-500/10 text-red-700',
    iconName: 'Users',
    color: 'from-violet-500 to-violet-600',
    nodes: [
      {
        id: 'n1',
        type: 'processNode',
        position: { x: 230, y: 0 },
        data: { label: 'Raccolta dati lavorativi', description: 'Orari di login, pause, volume email, messaggi Slack, task completati', type: 'start' },
      },
      {
        id: 'n2',
        type: 'processNode',
        position: { x: 230, y: 120 },
        data: { label: 'Analisi sentiment comunicazioni', description: 'NLP analizza tono e contenuto delle comunicazioni interne', type: 'ai', riskLevel: 'high' },
      },
      {
        id: 'n3',
        type: 'processNode',
        position: { x: 230, y: 240 },
        data: { label: 'Aggregazione metriche', description: 'Combinazione dati produttività + sentiment in un profilo benessere', type: 'data', riskLevel: 'high' },
      },
      {
        id: 'n4',
        type: 'processNode',
        position: { x: 230, y: 360 },
        data: { label: 'Modello predittivo burnout', description: 'ML predice il rischio di burnout per ogni dipendente', type: 'ai', riskLevel: 'unacceptable' },
      },
      {
        id: 'n5',
        type: 'processNode',
        position: { x: 230, y: 480 },
        data: { label: 'Classificazione rischio', description: 'Dipendenti classificati in basso/medio/alto rischio burnout', type: 'decision', riskLevel: 'high' },
      },
      {
        id: 'n6',
        type: 'processNode',
        position: { x: 0, y: 600 },
        data: { label: 'Nessun intervento', description: 'Rischio basso: il dipendente non viene contattato', type: 'process' },
      },
      {
        id: 'n7',
        type: 'processNode',
        position: { x: 230, y: 600 },
        data: { label: 'Alert al manager', description: 'Il manager riceve una notifica sul dipendente a rischio', type: 'process', riskLevel: 'high' },
      },
      {
        id: 'n8',
        type: 'processNode',
        position: { x: 460, y: 600 },
        data: { label: 'Intervento HR', description: 'HR contatta il dipendente per un colloquio', type: 'process' },
      },
      {
        id: 'n9',
        type: 'processNode',
        position: { x: 230, y: 720 },
        data: { label: 'Report dashboard', description: 'Dati aggregati visualizzati nella dashboard management', type: 'data' },
      },
      {
        id: 'n10',
        type: 'processNode',
        position: { x: 230, y: 840 },
        data: { label: 'Archiviazione dati', description: 'I profili individuali vengono archiviati per analisi trend', type: 'end' },
      },
    ],
    edges: [
      { id: 'e1', source: 'n1', target: 'n2', type: 'smoothstep', animated: true },
      { id: 'e2', source: 'n2', target: 'n3', type: 'smoothstep', animated: true },
      { id: 'e3', source: 'n3', target: 'n4', type: 'smoothstep', animated: true },
      { id: 'e4', source: 'n4', target: 'n5', type: 'smoothstep', animated: true },
      { id: 'e5', source: 'n5', target: 'n6', label: 'Basso', type: 'smoothstep', animated: true },
      { id: 'e6', source: 'n5', target: 'n7', label: 'Medio', type: 'smoothstep', animated: true },
      { id: 'e7', source: 'n5', target: 'n8', label: 'Alto', type: 'smoothstep', animated: true },
      { id: 'e8', source: 'n6', target: 'n9', type: 'smoothstep', animated: true },
      { id: 'e9', source: 'n7', target: 'n9', type: 'smoothstep', animated: true },
      { id: 'e10', source: 'n8', target: 'n9', type: 'smoothstep', animated: true },
      { id: 'e11', source: 'n9', target: 'n10', type: 'smoothstep', animated: true },
    ],
    ethicsAnalysis: {
      overallScore: 18,
      gdpr: {
        score: 15,
        issues: [
          'L\'analisi del sentiment delle comunicazioni interne è un trattamento altamente invasivo di dati personali.',
          'Il monitoraggio sistematico dei dipendenti richiede basi giuridiche estremamente solide e difficilmente il consenso è "libero" in un rapporto di lavoro.',
          'I profili di rischio burnout individuali costituiscono dati relativi alla salute (categoria speciale, art. 9 GDPR).',
          'La conservazione dei profili individuali per "analisi trend" viola il principio di limitazione della conservazione.',
          'L\'alert al manager espone dati sensibili sulla salute mentale del dipendente a terzi.',
        ],
        suggestions: [
          'Riconsiderare l\'intero approccio: il monitoraggio individuale delle comunicazioni è quasi certamente sproporzionato.',
          'Se il sistema viene mantenuto, utilizzare SOLO dati aggregati e anonimizzati, mai profili individuali.',
          'Il consenso nel rapporto di lavoro non è "libero" (WP29): cercare una base giuridica diversa o eliminare il trattamento.',
          'Non condividere profili individuali con manager: solo report aggregati di team.',
          'Definire tempi di conservazione brevi e cancellazione automatica dei dati grezzi.',
        ],
      },
      aiAct: {
        riskLevel: 'unacceptable',
        classification: 'Questo sistema si avvicina alla categoria di rischio inaccettabile dell\'AI Act: monitoraggio emotivo dei dipendenti sul luogo di lavoro (art. 5, par. 1, lett. f). L\'analisi del sentiment delle comunicazioni interne per inferire lo stato emotivo è esplicitamente proibita.',
        issues: [
          'L\'analisi del sentiment per inferire lo stato emotivo dei dipendenti è PROIBITA dall\'AI Act (art. 5).',
          'Il sistema di classificazione rischio burnout basato su monitoraggio comportamentale viola il divieto di social scoring in ambito lavorativo.',
          'La sorveglianza sistematica delle comunicazioni interne non rispetta la dignità del lavoratore.',
          'Manca completamente la trasparenza: i dipendenti non sanno di essere monitorati.',
        ],
        suggestions: [
          'INTERROMPERE IMMEDIATAMENTE l\'analisi del sentiment delle comunicazioni: è proibita dall\'AI Act.',
          'Riprogettare il sistema: usare solo survey anonime e volontarie per valutare il benessere.',
          'Se si desidera monitorare il benessere, utilizzare strumenti opt-in controllati dal dipendente.',
          'Garantire piena trasparenza su qualsiasi dato raccolto e come viene utilizzato.',
          'Consultare il DPO e un esperto di diritto del lavoro prima di qualsiasi implementazione.',
        ],
      },
      ethicalConcerns: [
        'Il sistema crea una sorveglianza pervasiva che mina la fiducia nel rapporto di lavoro.',
        'L\'analisi delle comunicazioni private è un\'invasione della privacy fondamentale del lavoratore.',
        'La classificazione in categorie di rischio etichetta le persone e può portare a discriminazione.',
        'Il dipendente "a rischio" potrebbe subire conseguenze negative (es. esclusione da progetti, promozioni mancate).',
        'Il sistema crea un forte squilibrio di potere: il datore di lavoro sa tutto, il dipendente non sa di essere monitorato.',
        'L\'approccio "predittivo" del burnout patologizza il normale stress lavorativo.',
      ],
      improvements: [
        'Eliminare completamente l\'analisi del sentiment e il monitoraggio delle comunicazioni.',
        'Sostituire con survey anonime periodiche (es. eNPS) che il dipendente compila volontariamente.',
        'Utilizzare solo dati aggregati a livello di team, mai profili individuali.',
        'Dare ai dipendenti il controllo: strumenti self-service per auto-valutare il proprio benessere.',
        'Implementare un comitato etico con rappresentanti dei lavoratori per supervisionare il sistema.',
        'Formare i manager sul benessere organizzativo senza bisogno di sorveglianza algoritmica.',
        'Pubblicare un report di trasparenza annuale sull\'uso dei dati dei dipendenti.',
      ],
    },
  },
];
