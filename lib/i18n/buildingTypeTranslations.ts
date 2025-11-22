/**
 * Translations for building type descriptions
 * These descriptions appear below block labels on the board
 */

import type { Locale } from './translations';

// Translations for building type descriptions
const BUILDING_TYPE_DESCRIPTIONS: Record<string, Record<Locale, string>> = {
  'input-personal': {
    it: 'Fonte di Dati Personali',
    en: 'Personal Data Source'
  },
  'input-video': {
    it: 'Fonte Video/Immagini',
    en: 'Video/Images Source'
  },
  'input-public': {
    it: 'Dati Pubblici/Open Source',
    en: 'Public/Open Source Data'
  },
  'input-operational': {
    it: 'Log tecnici, sensori e dispositivi connessi',
    en: 'Technical logs, sensors and connected devices'
  },
  'input-partner': {
    it: 'Dataset acquistati o forniti da partner',
    en: 'Datasets purchased or provided by partners'
  },
  'process-llm': {
    it: 'Elaborazione del Linguaggio',
    en: 'Language Processing'
  },
  'process-biometric': {
    it: 'Analisi Tratti Fisici',
    en: 'Physical Trait Analysis'
  },
  'process-rag': {
    it: 'Recupero Informazioni',
    en: 'Information Retrieval'
  },
  'process-automation': {
    it: 'Motori deterministici e automazioni',
    en: 'Deterministic engines and automations'
  },
  'process-modelops': {
    it: 'Pipeline di training e tuning modelli',
    en: 'Model training and tuning pipelines'
  },
  'storage-eu': {
    it: 'Archiviazione Europea',
    en: 'European Storage'
  },
  'storage-us': {
    it: 'Trasferimento Extra-UE',
    en: 'Extra-EU Transfer'
  },
  'storage-onprem': {
    it: 'Server proprietari o dispositivi in campo',
    en: 'Own servers or field devices'
  },
  'output-decision': {
    it: 'Decisioni Automatizzate',
    en: 'Automated Decisions'
  },
  'output-chat': {
    it: 'Interfaccia Chat',
    en: 'Chat Interface'
  },
  'output-public': {
    it: 'Portali, comunicati, integrazioni esterne',
    en: 'Portals, communications, external integrations'
  },
  'impact-energy': {
    it: 'Monitoraggio energia e emissioni',
    en: 'Energy and emissions monitoring'
  },
  'impact-social': {
    it: 'Effetti su persone e comunità',
    en: 'Effects on people and communities'
  },
  'impact-political': {
    it: 'Bias, governance e aspettative pubbliche',
    en: 'Bias, governance and public expectations'
  },
  'risk-compliance': {
    it: 'DPIA, linee guida e revisioni periodiche',
    en: 'DPIA, guidelines and periodic reviews'
  },
};

/**
 * Get translated building type description
 * @param buildingTypeKey - The building type key (e.g., 'input-personal')
 * @param locale - The target locale
 * @returns The translated description, or the Italian original if no translation exists
 */
export function getBuildingTypeDescription(buildingTypeKey: string, locale: Locale): string {
  const translations = BUILDING_TYPE_DESCRIPTIONS[buildingTypeKey];
  if (translations && translations[locale]) {
    return translations[locale];
  }
  
  // Fallback: if no translation, try to get Italian or return empty
  if (translations && translations.it) {
    return translations.it;
  }
  
  return '';
}

