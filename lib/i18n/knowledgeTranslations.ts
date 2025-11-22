/**
 * Translations for knowledge base content (blockKnowledge and noteKnowledge)
 * These are extensive educational contents that need translation
 */

import type { Locale } from './translations';

export interface KnowledgeTranslation {
  simpleExplanation?: string;
  question?: string;
  regulation?: {
    name: string;
    article: string;
    requirement: string;
    url?: string;
  };
  bestPractice?: string;
  risk?: string;
  example?: string;
  whatYouCanDo?: string[];
  redFlags?: string[];
}

// Type guide translations
export interface TypeGuideTranslation {
  title: string;
  description: string;
  friendly: string;
}

export interface InsightTranslation {
  label: string;
  detail_user: string;
  detail_designer: string;
}

// Type guides for designers
const TYPE_GUIDE_DESIGNER_TRANSLATIONS: Record<Locale, Record<string, TypeGuideTranslation>> = {
  it: {
    input: {
      title: 'Fonte dati',
      description: 'Qui entrano le informazioni raccolte da persone, sensori o archivi.',
      friendly: 'Indica da dove arrivano i dati. Più è chiaro l\'ingresso, più è semplice spiegare chi raccoglie cosa.',
    },
    process: {
      title: 'Processo AI',
      description: 'Strato in cui gli algoritmi elaborano, classificano o generano contenuti.',
      friendly: 'Mostra come l\'IA trasforma i dati. Qui è utile indicare modelli, training e chi controlla i risultati.',
    },
    storage: {
      title: 'Infrastruttura',
      description: 'Server, data center o cloud che custodiscono i dati.',
      friendly: 'Serve a capire dove vengono conservate le informazioni e quali giurisdizioni si applicano.',
    },
    output: {
      title: 'Output / Servizio',
      description: 'Decisioni automatizzate, report o interfacce rivolte agli utenti finali.',
      friendly: 'È la parte visibile dell\'IA: cosa vede il cittadino e come può reagire alle decisioni.',
    },
    risk: {
      title: 'Controllo / Rischio',
      description: 'Perimetri legali, audit trail o interventi umani richiesti.',
      friendly: 'Ogni sistema AI deve avere controlli e protezioni per ridurre i rischi. Questi blocchi aiutano a identificare dove sono necessari controlli legali, tecnici o umani.',
    },
    impact: {
      title: 'Impatto Sistemico',
      description: 'Indicatori su energia, effetti sociali e governance politica.',
      friendly: 'Ti aiuta a raccontare gli impatti secondari: quanto consuma il sistema, chi potrebbe essere escluso o come gestire la fiducia pubblica.',
    },
  },
  en: {
    input: {
      title: 'Data Source',
      description: 'Information collected from people, sensors or archives enters here.',
      friendly: 'Indicates where data comes from. The clearer the entry, the easier it is to explain who collects what.',
    },
    process: {
      title: 'AI Process',
      description: 'Layer where algorithms process, classify or generate content.',
      friendly: 'Shows how AI transforms data. It\'s useful to indicate models, training and who controls the results.',
    },
    storage: {
      title: 'Infrastructure',
      description: 'Servers, data centers or cloud that store the data.',
      friendly: 'Helps understand where information is stored and which jurisdictions apply.',
    },
    output: {
      title: 'Output / Service',
      description: 'Automated decisions, reports or interfaces for end users.',
      friendly: 'This is the visible part of AI: what the citizen sees and how they can react to decisions.',
    },
    risk: {
      title: 'Control / Risk',
      description: 'Legal perimeters, audit trails or required human interventions.',
      friendly: 'Every AI system must have controls and protections to reduce risks. These blocks help identify where legal, technical or human controls are needed.',
    },
    impact: {
      title: 'Systemic Impact',
      description: 'Indicators on energy, social effects and political governance.',
      friendly: 'Helps you tell about secondary impacts: how much the system consumes, who might be excluded or how to manage public trust.',
    },
  },
};

// Type guides for users
const TYPE_GUIDE_USER_TRANSLATIONS: Record<Locale, Record<string, TypeGuideTranslation>> = {
  it: {
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
  },
  en: {
    input: {
      title: 'Your Data',
      description: 'Information you share with the system or that is collected about you.',
      friendly: 'This is your data or data you share. You have the right to know why it\'s collected and how it\'s used.',
    },
    process: {
      title: 'How AI Works',
      description: 'How AI processes your data to make decisions or perform analysis.',
      friendly: 'Here you see how AI transforms your data. You have the right to understand how it works and why it makes certain decisions.',
    },
    storage: {
      title: 'Where Your Data Is',
      description: 'Servers, cloud or devices where your data is stored.',
      friendly: 'Here you see where your data is stored. It\'s important to know if it\'s in Europe or other countries.',
    },
    output: {
      title: 'Results and Decisions',
      description: 'What you see: decisions, results or system responses.',
      friendly: 'This is what you see. If the system makes an important decision, you have the right to contest it.',
    },
    risk: {
      title: 'Risks and Protections',
      description: 'Risks to your privacy and rights, and how to protect yourself.',
      friendly: 'Every AI system can present risks to your data and rights. These blocks help you understand what risks to consider and how to protect yourself. Remember: you always have rights to protect and can exercise them.',
    },
    impact: {
      title: 'Impact on Society',
      description: 'How this system can influence society, the environment or democracy.',
      friendly: 'These are the broader impacts of the system: energy consumption, social effects, transparency.',
    },
  },
};

// Insight translations
const INSIGHT_TRANSLATIONS: Record<Locale, Record<string, InsightTranslation>> = {
  it: {
    'Dati delicati': {
      label: 'Dati delicati',
      detail_user: 'Questi sono dati biometrici molto sensibili. Hai dato il consenso esplicito? Hai verificato come vengono protetti?',
      detail_designer: 'Contiene informazioni biometriche. Richiede consenso esplicito e canali di archiviazione sicuri.',
    },
    'Decisione solo automatica': {
      label: 'Decisione solo automatica',
      detail_user: 'Il sistema prende decisioni automaticamente senza controllo umano. Puoi contestare queste decisioni? C\'è qualcuno che può rivederle?',
      detail_designer: 'Valuta se introdurre una revisione umana per spiegare o correggere l\'esito.',
    },
    'Trasferimento extra-UE': {
      label: 'Trasferimento extra-UE',
      detail_user: 'I tuoi dati vengono salvati su server americani. Le autorità USA possono accedervi. Hai verificato le protezioni?',
      detail_designer: 'Ricorda di documentare le clausole contrattuali standard (SCC) e la cifratura end-to-end dei dati.',
    },
    'Cifratura attiva': {
      label: 'Cifratura attiva',
      detail_user: 'I tuoi dati sono cifrati, quindi sono più protetti. Ottima cosa!',
      detail_designer: 'Questo nodo prevede la cifratura dei dati, ottima pratica di sicurezza.',
    },
    'Supervisione umana': {
      label: 'Supervisione umana',
      detail_user: 'C\'è un controllo umano sulle decisioni: puoi chiedere a una persona di rivedere le decisioni del sistema. Buono!',
      detail_designer: 'È previsto un controllo umano sul risultato: punto a favore della trasparenza.',
    },
  },
  en: {
    'Dati delicati': {
      label: 'Sensitive Data',
      detail_user: 'This is very sensitive biometric data. Did you give explicit consent? Have you verified how it\'s protected?',
      detail_designer: 'Contains biometric information. Requires explicit consent and secure storage channels.',
    },
    'Decisione solo automatica': {
      label: 'Fully Automatic Decision',
      detail_user: 'The system makes decisions automatically without human control. Can you contest these decisions? Is there someone who can review them?',
      detail_designer: 'Consider introducing human review to explain or correct the outcome.',
    },
    'Trasferimento extra-UE': {
      label: 'Extra-EU Transfer',
      detail_user: 'Your data is saved on US servers. US authorities can access it. Have you verified the protections?',
      detail_designer: 'Remember to document Standard Contractual Clauses (SCC) and end-to-end data encryption.',
    },
    'Cifratura attiva': {
      label: 'Active Encryption',
      detail_user: 'Your data is encrypted, so it\'s better protected. Great!',
      detail_designer: 'This node includes data encryption, a good security practice.',
    },
    'Supervisione umana': {
      label: 'Human Oversight',
      detail_user: 'There is human control over decisions: you can ask a person to review the system\'s decisions. Good!',
      detail_designer: 'Human control over the result is provided: a point in favor of transparency.',
    },
  },
};

export function getTypeGuideTranslation(
  locale: Locale,
  type: string,
  role: 'user' | 'designer'
): TypeGuideTranslation {
  const translations = role === 'user' 
    ? TYPE_GUIDE_USER_TRANSLATIONS[locale]
    : TYPE_GUIDE_DESIGNER_TRANSLATIONS[locale];
  return translations[type] || translations.input || { title: '', description: '', friendly: '' };
}

export function getInsightTranslation(
  locale: Locale,
  key: string,
  role: 'user' | 'designer'
): { label: string; detail: string } | null {
  const translations = INSIGHT_TRANSLATIONS[locale];
  const insight = translations[key];
  if (!insight) return null;
  
  const detail = role === 'user' ? insight.detail_user : insight.detail_designer;
  return {
    label: insight.label,
    detail: detail,
  };
}

// Note: blockKnowledge and noteKnowledge translations would need to be added here
// This is a large task as there are hundreds of knowledge entries
// For now, we'll create a structure that can be extended

