/**
 * Translations for blueprint titles, descriptions, and cluster labels
 * These are used when creating blocks from blueprints
 */

import type { Locale } from './translations';

type BlueprintTranslation = {
  title: string;
  description: string;
  clusterLabel?: string;
};

const BLUEPRINT_TRANSLATIONS: Record<string, Record<Locale, BlueprintTranslation>> = {
  'input-personal': {
    it: {
      title: 'Quartiere Dati Personali',
      description: 'Anagrafiche, CRM, account.',
      clusterLabel: 'Residenza Dati',
    },
    en: {
      title: 'Personal Data District',
      description: 'Demographics, CRM, accounts.',
      clusterLabel: 'Data Residence',
    },
  },
  'input-video': {
    it: {
      title: 'Sorveglianza / Video',
      description: 'CCTV, bodycam, feed live.',
      clusterLabel: 'Nodo Sorveglianza',
    },
    en: {
      title: 'Surveillance / Video',
      description: 'CCTV, bodycam, live feed.',
      clusterLabel: 'Surveillance Node',
    },
  },
  'input-public': {
    it: {
      title: 'Open & Pubblici',
      description: 'Dataset aperti, scraping.',
      clusterLabel: 'Biblioteca',
    },
    en: {
      title: 'Open & Public',
      description: 'Open datasets, scraping.',
      clusterLabel: 'Library',
    },
  },
  'input-operational': {
    it: {
      title: 'Dati Operativi / IoT',
      description: 'Log tecnici, sensori, macchinari.',
      clusterLabel: 'Operational Data',
    },
    en: {
      title: 'Operational Data / IoT',
      description: 'Technical logs, sensors, machinery.',
      clusterLabel: 'Operational Data',
    },
  },
  'input-partner': {
    it: {
      title: 'Dataset di Partner',
      description: 'Dati acquistati o ricevuti da terzi.',
      clusterLabel: 'Partner Data',
    },
    en: {
      title: 'Partner Dataset',
      description: 'Data purchased or received from third parties.',
      clusterLabel: 'Partner Data',
    },
  },
  'process-llm': {
    it: {
      title: 'Fabbrica LLM',
      description: 'Core AI, orchestratori.',
      clusterLabel: 'Fabbrica LLM',
    },
    en: {
      title: 'LLM Factory',
      description: 'Core AI, orchestrators.',
      clusterLabel: 'LLM Factory',
    },
  },
  'process-biometric': {
    it: {
      title: 'Laboratorio Biometrico',
      description: 'Matching, riconoscimento.',
    },
    en: {
      title: 'Biometric Laboratory',
      description: 'Matching, recognition.',
    },
  },
  'process-rag': {
    it: {
      title: 'Centro RAG',
      description: 'Retrieval + context injection.',
    },
    en: {
      title: 'RAG Center',
      description: 'Retrieval + context injection.',
    },
  },
  'process-automation': {
    it: {
      title: 'Automazione / Regole',
      description: 'Motori deterministici e scoring tradizionale.',
    },
    en: {
      title: 'Automation / Rules',
      description: 'Deterministic engines and traditional scoring.',
    },
  },
  'process-modelops': {
    it: {
      title: 'Training / MLOps',
      description: 'Pipeline di addestramento e monitoraggio.',
    },
    en: {
      title: 'Training / MLOps',
      description: 'Training and monitoring pipelines.',
    },
  },
  'storage-eu': {
    it: {
      title: 'Vault Europeo',
      description: 'Cluster EU resilienti.',
    },
    en: {
      title: 'European Vault',
      description: 'Resilient EU clusters.',
    },
  },
  'storage-us': {
    it: {
      title: 'Porto Franco (USA)',
      description: 'Servizi fuori UE.',
    },
    en: {
      title: 'Free Port (USA)',
      description: 'Services outside EU.',
    },
  },
  'storage-onprem': {
    it: {
      title: 'Infrastruttura On-Premise',
      description: 'Server proprietari o device edge.',
    },
    en: {
      title: 'On-Premise Infrastructure',
      description: 'Own servers or edge devices.',
    },
  },
  'output-decision': {
    it: {
      title: 'Decisione Automatizzata',
      description: 'Comitati digitali, scoring.',
    },
    en: {
      title: 'Automated Decision',
      description: 'Digital committees, scoring.',
    },
  },
  'output-chat': {
    it: {
      title: 'Sportello Conversazionale',
      description: 'Assistenti, chatbot, UI.',
    },
    en: {
      title: 'Conversational Interface',
      description: 'Assistants, chatbot, UI.',
    },
  },
  'output-public': {
    it: {
      title: 'Output Pubblico / API',
      description: 'Portali cittadini, comunicati, servizi aperti.',
    },
    en: {
      title: 'Public Output / API',
      description: 'Citizen portals, communications, open services.',
    },
  },
  'impact-energy': {
    it: {
      title: 'Consumo Energetico',
      description: 'Monitoraggio di energia e emissioni',
      clusterLabel: 'Energia & Clima',
    },
    en: {
      title: 'Energy Consumption',
      description: 'Energy and emissions monitoring',
      clusterLabel: 'Energy & Climate',
    },
  },
  'impact-social': {
    it: {
      title: 'Impatto Sociale',
      description: 'Effetti su persone, lavoro e comunità',
      clusterLabel: 'Impatto Sociale',
    },
    en: {
      title: 'Social Impact',
      description: 'Effects on people, work and communities',
      clusterLabel: 'Social Impact',
    },
  },
  'impact-political': {
    it: {
      title: 'Impatto Politico',
      description: 'Governance, bias e fiducia pubblica',
      clusterLabel: 'Impatto Politico',
    },
    en: {
      title: 'Political Impact',
      description: 'Governance, bias and public trust',
      clusterLabel: 'Political Impact',
    },
  },
  'risk-compliance': {
    it: {
      title: 'Policy & Compliance',
      description: 'Audit interni, DPIA, linee guida.',
      clusterLabel: 'Compliance & Policy',
    },
    en: {
      title: 'Policy & Compliance',
      description: 'Internal audits, DPIA, guidelines.',
      clusterLabel: 'Compliance & Policy',
    },
  },
  'risk-transfer': {
    it: {
      title: 'Supervisione Transfer',
      description: 'Controllo trasferimenti extra-UE.',
    },
    en: {
      title: 'Transfer Supervision',
      description: 'Extra-EU transfer control.',
    },
  },
  'risk-oversight': {
    it: {
      title: 'Oversight Board',
      description: 'Comitato etico e supervisione umana.',
    },
    en: {
      title: 'Oversight Board',
      description: 'Ethics committee and human supervision.',
    },
  },
  // User mode blueprints
  'input-personal-user': {
    it: {
      title: 'Dati Personali',
      description: 'Condivido i miei dati personali',
      clusterLabel: 'Dati Personali',
    },
    en: {
      title: 'Personal Data',
      description: 'I share my personal data',
      clusterLabel: 'Personal Data',
    },
  },
  'input-sensitive': {
    it: {
      title: 'Informazioni Sensibili',
      description: 'Condivido dati sensibili',
      clusterLabel: 'Dati Sensibili',
    },
    en: {
      title: 'Sensitive Information',
      description: 'I share sensitive data',
      clusterLabel: 'Sensitive Data',
    },
  },
  'input-others': {
    it: {
      title: 'Dati di Altri',
      description: 'Condivido dati di altre persone',
    },
    en: {
      title: 'Others\' Data',
      description: 'I share other people\'s data',
    },
  },
  'input-work': {
    it: {
      title: 'Informazioni di Lavoro',
      description: 'Condivido dati aziendali',
    },
    en: {
      title: 'Work Information',
      description: 'I share business data',
    },
  },
  'input-public-user': {
    it: {
      title: 'Solo Informazioni Pubbliche',
      description: 'Uso solo dati pubblici',
    },
    en: {
      title: 'Public Information Only',
      description: 'I only use public data',
    },
  },
  'storage-cloud-usa': {
    it: {
      title: 'Cloud Server (USA)',
      description: 'I dati vengono salvati su server americani',
    },
    en: {
      title: 'Cloud Server (USA)',
      description: 'Data is saved on US servers',
    },
  },
  'storage-cloud-eu': {
    it: {
      title: 'Cloud Server (EU)',
      description: 'I dati vengono salvati su server europei',
    },
    en: {
      title: 'Cloud Server (EU)',
      description: 'Data is saved on European servers',
    },
  },
  'storage-cloud-unknown': {
    it: {
      title: 'Storage Sconosciuto',
      description: 'Non so dove vengono salvati i dati',
    },
    en: {
      title: 'Unknown Storage',
      description: 'I don\'t know where data is saved',
    },
  },
  'storage-local-user': {
    it: {
      title: 'Sul Mio Computer',
      description: 'I dati restano sul mio dispositivo',
    },
    en: {
      title: 'On My Computer',
      description: 'Data stays on my device',
    },
  },
  'use-chatgpt': {
    it: {
      title: 'ChatGPT',
      description: 'Uso ChatGPT per scrivere email, testi, risposte o generare contenuti.',
    },
    en: {
      title: 'ChatGPT',
      description: 'I use ChatGPT to write emails, texts, responses or generate content.',
    },
  },
  'use-gemini': {
    it: {
      title: 'Google Gemini',
      description: 'Uso Gemini per analizzare documenti, rispondere domande o generare contenuti.',
    },
    en: {
      title: 'Google Gemini',
      description: 'I use Gemini to analyze documents, answer questions or generate content.',
    },
  },
  'use-claude': {
    it: {
      title: 'Claude (Anthropic)',
      description: 'Uso Claude per lavorare con documenti, codici o conversazioni complesse.',
    },
    en: {
      title: 'Claude (Anthropic)',
      description: 'I use Claude to work with documents, code or complex conversations.',
    },
  },
  'use-case-email': {
    it: {
      title: 'Scrivere email e messaggi',
      description: 'Uso AI per aiutarmi a scrivere email professionali o personali.',
    },
    en: {
      title: 'Writing emails and messages',
      description: 'I use AI to help me write professional or personal emails.',
    },
  },
  'use-case-documents': {
    it: {
      title: 'Analizzare o revisionare documenti',
      description: 'Uso AI per leggere, riassumere o correggere documenti aziendali.',
    },
    en: {
      title: 'Analyze or review documents',
      description: 'I use AI to read, summarize or correct business documents.',
    },
  },
  'risk-privacy-user': {
    it: {
      title: 'I miei dati personali rubati o usati male',
      description: 'Temo che i miei dati vengano rubati, venduti o usati senza il mio consenso.',
    },
    en: {
      title: 'My personal data stolen or misused',
      description: 'I fear my data will be stolen, sold or used without my consent.',
    },
  },
  'risk-work': {
    it: {
      title: 'Informazioni di lavoro esposte',
      description: 'Preoccupato che dati aziendali o informazioni confidenziali finiscano nelle mani sbagliate.',
    },
    en: {
      title: 'Work information exposed',
      description: 'Concerned that business data or confidential information will fall into the wrong hands.',
    },
  },
};

/**
 * Get translated blueprint metadata
 * @param blueprintKey - The blueprint key
 * @param locale - The target locale
 * @returns Translated title, description, and clusterLabel
 */
export function getBlueprintTranslation(
  blueprintKey: string,
  locale: Locale
): BlueprintTranslation | null {
  const translations = BLUEPRINT_TRANSLATIONS[blueprintKey];
  if (!translations) {
    return null;
  }
  
  return translations[locale] || translations.it;
}

/**
 * Get translated blueprint title
 * @param blueprintKey - The blueprint key
 * @param locale - The target locale
 * @param fallback - Fallback title if no translation exists
 */
export function getBlueprintTitle(
  blueprintKey: string,
  locale: Locale,
  fallback: string
): string {
  const translation = getBlueprintTranslation(blueprintKey, locale);
  return translation?.title || fallback;
}

/**
 * Get translated blueprint description
 * @param blueprintKey - The blueprint key
 * @param locale - The target locale
 * @param fallback - Fallback description if no translation exists
 */
export function getBlueprintDescription(
  blueprintKey: string,
  locale: Locale,
  fallback: string
): string {
  const translation = getBlueprintTranslation(blueprintKey, locale);
  return translation?.description || fallback;
}

/**
 * Get translated blueprint cluster label
 * @param blueprintKey - The blueprint key
 * @param locale - The target locale
 * @param fallback - Fallback cluster label if no translation exists
 */
export function getBlueprintClusterLabel(
  blueprintKey: string,
  locale: Locale,
  fallback?: string
): string | undefined {
  const translation = getBlueprintTranslation(blueprintKey, locale);
  return translation?.clusterLabel || fallback;
}

