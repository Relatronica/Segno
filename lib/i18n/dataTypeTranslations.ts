/**
 * Translations for data type labels
 * These appear in notes and blocks to indicate what types of data are being processed
 */

import type { Locale } from './translations';

// Translations for data type labels
const DATA_TYPE_TRANSLATIONS: Record<string, Record<Locale, string>> = {
  'Personali': {
    it: 'Personali',
    en: 'Personal'
  },
  'Biometrici': {
    it: 'Biometrici',
    en: 'Biometric'
  },
  'Sanitari': {
    it: 'Sanitari',
    en: 'Health'
  },
  'Finanziari': {
    it: 'Finanziari',
    en: 'Financial'
  },
  'Identificativi': {
    it: 'Identificativi',
    en: 'Identifiers'
  },
  'Dati di Localizzazione': {
    it: 'Dati di Localizzazione',
    en: 'Location Data'
  },
  'Dati Comportamentali': {
    it: 'Dati Comportamentali',
    en: 'Behavioral Data'
  },
  'Registrazioni Audio': {
    it: 'Registrazioni Audio',
    en: 'Audio Recordings'
  },
  'Dati Pubblici': {
    it: 'Dati Pubblici',
    en: 'Public Data'
  },
  'Sensori / IoT': {
    it: 'Sensori / IoT',
    en: 'Sensors / IoT'
  },
  'Dati Fornitori': {
    it: 'Dati Fornitori',
    en: 'Supplier Data'
  },
};

/**
 * Translate a data type label
 * @param dataType - The original data type label (usually in Italian)
 * @param locale - The target locale
 * @returns The translated label, or the original if no translation exists
 */
export function translateDataType(dataType: string, locale: Locale): string {
  if (locale === 'it') {
    return dataType; // Return original Italian
  }
  
  const translation = DATA_TYPE_TRANSLATIONS[dataType];
  if (translation && translation[locale]) {
    return translation[locale];
  }
  
  // Fallback: return original if no translation found
  return dataType;
}

/**
 * Translate an array of data types
 * @param dataTypes - Array of data type labels
 * @param locale - The target locale
 * @returns Array of translated labels
 */
export function translateDataTypes(dataTypes: string[] | string, locale: Locale): string[] {
  const typesArray = Array.isArray(dataTypes) ? dataTypes : [dataTypes];
  return typesArray.map(type => translateDataType(type, locale));
}

