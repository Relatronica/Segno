import { ScenarioBlock } from '@/store/useAppStore';

// Guide per PROGETTISTI
const TYPE_GUIDE_DESIGNER: Record<
  ScenarioBlock['type'],
  { title: string; description: string; friendly: string }
> = {
  input: {
    title: 'Fonte dati',
    description: 'Qui entrano le informazioni raccolte da persone, sensori o archivi.',
    friendly:
      'Indica da dove arrivano i dati. Più è chiaro l\'ingresso, più è semplice spiegare chi raccoglie cosa.',
  },
  process: {
    title: 'Processo AI',
    description: 'Strato in cui gli algoritmi elaborano, classificano o generano contenuti.',
    friendly:
      'Mostra come l\'IA trasforma i dati. Qui è utile indicare modelli, training e chi controlla i risultati.',
  },
  storage: {
    title: 'Infrastruttura',
    description: 'Server, data center o cloud che custodiscono i dati.',
    friendly:
      'Serve a capire dove vengono conservate le informazioni e quali giurisdizioni si applicano.',
  },
  output: {
    title: 'Output / Servizio',
    description: 'Decisioni automatizzate, report o interfacce rivolte agli utenti finali.',
    friendly:
      'È la parte visibile dell\'IA: cosa vede il cittadino e come può reagire alle decisioni.',
  },
  risk: {
    title: 'Controllo / Rischio',
    description: 'Perimetri legali, audit trail o interventi umani richiesti.',
    friendly:
      'Ogni sistema AI deve avere controlli e protezioni per ridurre i rischi. Questi blocchi aiutano a identificare dove sono necessari controlli legali, tecnici o umani.',
  },
  impact: {
    title: 'Impatto Sistemico',
    description: 'Indicatori su energia, effetti sociali e governance politica.',
    friendly:
      'Ti aiuta a raccontare gli impatti secondari: quanto consuma il sistema, chi potrebbe essere escluso o come gestire la fiducia pubblica.',
  },
};

type Insight = {
  label: string;
  detail: string;
  tone: 'neutral' | 'warning' | 'positive';
};

const buildInsights = (block: ScenarioBlock, userRole?: 'user' | 'designer'): Insight[] => {
  const hints: Insight[] = [];
  const isUser = userRole === 'user';

  if (block.config?.dataTypes?.includes('Biometrici') || block.label.toLowerCase().includes('video')) {
    hints.push({
      label: 'Dati delicati',
      detail: isUser
        ? 'Questi sono dati biometrici molto sensibili. Hai dato il consenso esplicito? Hai verificato come vengono protetti?'
        : 'Contiene informazioni biometriche. Richiede consenso esplicito e canali di archiviazione sicuri.',
      tone: 'warning',
    });
  }

  if (block.type === 'process' && !block.config?.humanInTheLoop && block.label.toLowerCase().includes('decision')) {
    hints.push({
      label: 'Decisione solo automatica',
      detail: isUser
        ? 'Il sistema prende decisioni automaticamente senza controllo umano. Puoi contestare queste decisioni? C\'è qualcuno che può rivederle?'
        : 'Valuta se introdurre una revisione umana per spiegare o correggere l\'esito.',
      tone: 'warning',
    });
  }

  if (block.type === 'storage' && block.label.toLowerCase().includes('usa')) {
    hints.push({
      label: 'Trasferimento extra-UE',
      detail: isUser
        ? 'I tuoi dati vengono salvati su server americani. Le autorità USA possono accedervi. Hai verificato le protezioni?'
        : 'Ricorda di documentare le clausole contrattuali standard (SCC) e la cifratura end-to-end dei dati.',
      tone: 'warning',
    });
  }

  if (block.config?.isEncrypted) {
    hints.push({
      label: 'Cifratura attiva',
      detail: isUser
        ? 'I tuoi dati sono cifrati, quindi sono più protetti. Ottima cosa!'
        : 'Questo nodo prevede la cifratura dei dati, ottima pratica di sicurezza.',
      tone: 'positive',
    });
  }

  if (block.config?.humanInTheLoop) {
    hints.push({
      label: 'Supervisione umana',
      detail: isUser
        ? 'C\'è un controllo umano sulle decisioni: puoi chiedere a una persona di rivedere le decisioni del sistema. Buono!'
        : 'È previsto un controllo umano sul risultato: punto a favore della trasparenza.',
      tone: 'positive',
    });
  }

  // Non aggiungere hint generico: mostriamo "Punti da ricordare" solo se ci sono hints reali
  return hints;
};

// Guide per UTENTI FINALI
const TYPE_GUIDE_USER: Record<
  ScenarioBlock['type'],
  { title: string; description: string; friendly: string }
> = {
  input: {
    title: 'I tuoi dati',
    description: 'Le informazioni che condividi con il sistema o che vengono raccolte su di te.',
    friendly: 'Questi sono i tuoi dati o i dati che condividi. Hai diritto a sapere perché vengono raccolti e come vengono usati.',
  },
  process: {
    title: 'Come funziona l\'AI',
    description: 'Come l\'AI elabora i tuoi dati per prendere decisioni o fare analisi.',
    friendly: 'Qui vedi come l\'AI trasforma i tuoi dati. Hai diritto a capire come funziona e perché prende certe decisioni.',
  },
  storage: {
    title: 'Dove sono i tuoi dati',
    description: 'Server, cloud o dispositivi dove vengono salvati i tuoi dati.',
    friendly: 'Qui vedi dove vengono conservati i tuoi dati. È importante sapere se sono in Europa o in altri paesi.',
  },
  output: {
    title: 'Risultati e decisioni',
    description: 'Quello che vedi tu: decisioni, risultati o risposte del sistema.',
    friendly: 'Questo è quello che vedi tu. Se il sistema prende una decisione importante, hai diritto a contestarla.',
  },
  risk: {
    title: 'Rischi e protezioni',
    description: 'I rischi per la tua privacy e i tuoi diritti, e come proteggerti.',
    friendly: 'Ogni sistema AI può presentare rischi per i tuoi dati e i tuoi diritti. Questi blocchi ti aiutano a capire quali rischi devi considerare e come proteggerti. Ricorda: hai sempre diritti da proteggere e puoi esercitarli.',
  },
  impact: {
    title: 'Impatto sulla società',
    description: 'Come questo sistema può influenzare la società, l\'ambiente o la democrazia.',
    friendly: 'Questi sono gli impatti più ampi del sistema: consumo energetico, effetti sociali, trasparenza.',
  },
};

export const buildBlockSummary = (
  block: ScenarioBlock | null | undefined,
  userRole?: 'user' | 'designer'
) => {
  if (!block) return null;
  const guide = userRole === 'user' ? TYPE_GUIDE_USER[block.type] : TYPE_GUIDE_DESIGNER[block.type];
  const hints = buildInsights(block, userRole);

  return {
    ...guide,
    hints,
  };
};

export const TYPE_GUIDE_MAP = TYPE_GUIDE_DESIGNER;
