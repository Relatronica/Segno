/**
 * Translations for block labels
 * This file provides translations for common block labels used in the city builder
 */

import type { Locale } from './translations';

// Translations for block labels
const BLOCK_LABEL_TRANSLATIONS: Record<string, Record<Locale, string>> = {
  // Input blocks
  'Dati Personali': { it: 'Dati Personali', en: 'Personal Data' },
  'Video / Immagini': { it: 'Video / Immagini', en: 'Video / Images' },
  'Dati Sanitari': { it: 'Dati Sanitari', en: 'Health Data' },
  'Dati Finanziari': { it: 'Dati Finanziari', en: 'Financial Data' },
  'Dati di Localizzazione': { it: 'Dati di Localizzazione', en: 'Location Data' },
  'Dati Comportamentali': { it: 'Dati Comportamentali', en: 'Behavioral Data' },
  'Registrazioni Audio': { it: 'Registrazioni Audio', en: 'Audio Recordings' },
  'Dati Pubblici': { it: 'Dati Pubblici', en: 'Public Data' },
  'Sensori / IoT': { it: 'Sensori / IoT', en: 'Sensors / IoT' },
  'Dati Fornitori': { it: 'Dati Fornitori', en: 'Supplier Data' },
  
  // Process blocks
  'LLM Core': { it: 'LLM Core', en: 'LLM Core' },
  'Analisi Biometrica': { it: 'Analisi Biometrica', en: 'Biometric Analysis' },
  'Motore RAG': { it: 'Motore RAG', en: 'RAG Engine' },
  'Sistema di Raccomandazione': { it: 'Sistema di Raccomandazione', en: 'Recommendation System' },
  'Rilevamento Anomalie': { it: 'Rilevamento Anomalie', en: 'Anomaly Detection' },
  'Computer Vision': { it: 'Computer Vision', en: 'Computer Vision' },
  'Elaborazione Audio': { it: 'Elaborazione Audio', en: 'Audio Processing' },
  
  // Storage blocks
  'Vault Dati (UE)': { it: 'Vault Dati (UE)', en: 'Data Vault (EU)' },
  'Cloud (USA)': { it: 'Cloud (USA)', en: 'Cloud (USA)' },
  'Server Proprietari': { it: 'Server Proprietari', en: 'Own Servers' },
  
  // Output blocks
  'Decisione Automatica': { it: 'Decisione Automatica', en: 'Automated Decision' },
  'Interfaccia Chat': { it: 'Interfaccia Chat', en: 'Chat Interface' },
  'Portale / API pubblica': { it: 'Portale / API pubblica', en: 'Portal / Public API' },
  'Sistema di Notifiche': { it: 'Sistema di Notifiche', en: 'Notification System' },
  'Dashboard Analitica': { it: 'Dashboard Analitica', en: 'Analytics Dashboard' },
  'Export Dati': { it: 'Export Dati', en: 'Data Export' },
  
  // Risk/Impact blocks (notes)
  'Supervisione Umana': { it: 'Supervisione Umana', en: 'Human Supervision' },
  'Comitato Etico': { it: 'Comitato Etico', en: 'Ethics Committee' },
  'DPO (Data Protection Officer)': { it: 'DPO (Data Protection Officer)', en: 'DPO (Data Protection Officer)' },
  'Perimetro Consenso': { it: 'Perimetro Consenso', en: 'Consent Perimeter' },
  'Consenso Esplicito': { it: 'Consenso Esplicito', en: 'Explicit Consent' },
  'Consenso Registrazione': { it: 'Consenso Registrazione', en: 'Recording Consent' },
  'Privacy by Design': { it: 'Privacy by Design', en: 'Privacy by Design' },
  'Sicurezza Informatica': { it: 'Sicurezza Informatica', en: 'Cybersecurity' },
  'Controllo Accessi e Audit': { it: 'Controllo Accessi e Audit', en: 'Access Control and Audit' },
  'Audit Trail': { it: 'Audit Trail', en: 'Audit Trail' },
  'Audit Trail Completo': { it: 'Audit Trail Completo', en: 'Complete Audit Trail' },
  'Supervisione Transfer': { it: 'Supervisione Transfer', en: 'Transfer Supervision' },
  'Conservazione e Cancellazione': { it: 'Conservazione e Cancellazione', en: 'Retention and Deletion' },
  'Backup e Ripristino': { it: 'Backup e Ripristino', en: 'Backup and Recovery' },
  'DPIA (Data Protection Impact Assessment)': { it: 'DPIA (Data Protection Impact Assessment)', en: 'DPIA (Data Protection Impact Assessment)' },
  'Linee Guida Legali': { it: 'Linee Guida Legali', en: 'Legal Guidelines' },
  'Revisioni Periodiche': { it: 'Revisioni Periodiche', en: 'Periodic Reviews' },
  'Norme e Verifiche Legali': { it: 'Norme e Verifiche Legali', en: 'Legal Standards and Checks' },
  'Consumo di Energia': { it: 'Consumo di Energia', en: 'Energy Consumption' },
  'Impatto sulla Società': { it: 'Impatto sulla Società', en: 'Social Impact' },
  'Influenza su Policy Pubbliche': { it: 'Influenza su Policy Pubbliche', en: 'Influence on Public Policies' },
  'Impatto sulla Fiducia Pubblica': { it: 'Impatto sulla Fiducia Pubblica', en: 'Impact on Public Trust' },
  'Perimetro Biometria': { it: 'Perimetro Biometria', en: 'Biometrics Perimeter' },
  'Buffer Volatile': { it: 'Buffer Volatile', en: 'Volatile Buffer' },
  'Prompt Guard': { it: 'Prompt Guard', en: 'Prompt Guard' },
  'Dataset Ombra': { it: 'Dataset Ombra', en: 'Shadow Dataset' },
  'Monitoraggio Modelli': { it: 'Monitoraggio Modelli', en: 'Model Monitoring' },
  'Crittografia Dati': { it: 'Crittografia Dati', en: 'Data Encryption' },
  'Sicurezza Rafforzata': { it: 'Sicurezza Rafforzata', en: 'Enhanced Security' },
  'Monitoraggio Intrusioni': { it: 'Monitoraggio Intrusioni', en: 'Intrusion Monitoring' },
  'Perimetro BYOK': { it: 'Perimetro BYOK', en: 'BYOK Perimeter' },
  'Politica di Retention': { it: 'Politica di Retention', en: 'Retention Policy' },
  'Diritto all\'Oblio': { it: 'Diritto all\'Oblio', en: 'Right to be Forgotten' },
  'Cancellazione Automatica': { it: 'Cancellazione Automatica', en: 'Automatic Deletion' },
  'Minimizzazione Dati': { it: 'Minimizzazione Dati', en: 'Data Minimization' },
  'Pseudonimizzazione': { it: 'Pseudonimizzazione', en: 'Pseudonymization' },
  'Anonimizzazione': { it: 'Anonimizzazione', en: 'Anonymization' },
  'Controllo Accessi': { it: 'Controllo Accessi', en: 'Access Control' },
  'Gestione Permessi': { it: 'Gestione Permessi', en: 'Permission Management' },
  'Log Accessi': { it: 'Log Accessi', en: 'Access Logs' },
  'Tracciabilità Operazioni': { it: 'Tracciabilità Operazioni', en: 'Operation Traceability' },
  'Human-in-the-Loop': { it: 'Human-in-the-Loop', en: 'Human-in-the-Loop' },
  'Review Decisioni Critiche': { it: 'Review Decisioni Critiche', en: 'Critical Decision Review' },
  'Ridondanza Locale': { it: 'Ridondanza Locale', en: 'Local Redundancy' },
  'Notifier Trasparenza': { it: 'Notifier Trasparenza', en: 'Transparency Notifier' },
  'Filtro Bias': { it: 'Filtro Bias', en: 'Bias Filter' },
  'Validazione Qualità': { it: 'Validazione Qualità', en: 'Quality Validation' },
  'Validazione Alert': { it: 'Validazione Alert', en: 'Alert Validation' },
  'Trascrizione Sicura': { it: 'Trascrizione Sicura', en: 'Secure Transcription' },
  'Preferenze Utente': { it: 'Preferenze Utente', en: 'User Preferences' },
  'Accesso Controllato': { it: 'Accesso Controllato', en: 'Controlled Access' },
  'Controllo Trasferimenti': { it: 'Controllo Trasferimenti', en: 'Transfer Control' },
  'Backup Automatico': { it: 'Backup Automatico', en: 'Automatic Backup' },
  'Disaster Recovery': { it: 'Disaster Recovery', en: 'Disaster Recovery' },
  'Piano Continuità': { it: 'Piano Continuità', en: 'Continuity Plan' },
  'Gestione Cookie': { it: 'Gestione Cookie', en: 'Cookie Management' },
  'Accordi & SLA': { it: 'Accordi & SLA', en: 'Agreements & SLA' },
  'Licenze & Attribution': { it: 'Licenze & Attribution', en: 'Licenses & Attribution' },
  
  // User mode blocks
  'ChatGPT': { it: 'ChatGPT', en: 'ChatGPT' },
  'Google Gemini': { it: 'Google Gemini', en: 'Google Gemini' },
  'Claude': { it: 'Claude', en: 'Claude' },
  'I Miei Dati Personali': { it: 'I Miei Dati Personali', en: 'My Personal Data' },
  'Dati di Lavoro': { it: 'Dati di Lavoro', en: 'Work Data' },
  'Cloud Server (USA)': { it: 'Cloud Server (USA)', en: 'Cloud Server (USA)' },
  'Sul Mio Computer': { it: 'Sul Mio Computer', en: 'On My Computer' },
  'Storage Sconosciuto': { it: 'Storage Sconosciuto', en: 'Unknown Storage' },
  'Email Scritta': { it: 'Email Scritta', en: 'Written Email' },
  'Documenti Analizzati': { it: 'Documenti Analizzati', en: 'Analyzed Documents' },
  'Codice Generato': { it: 'Codice Generato', en: 'Generated Code' },
  'Cloud Server (EU)': { it: 'Cloud Server (EU)', en: 'Cloud Server (EU)' },
  
  // Additional common labels
  'Log Operativi': { it: 'Log Operativi', en: 'Operational Logs' },
  'Indice Embedding': { it: 'Indice Embedding', en: 'Embedding Index' },
  'Motore di Regole': { it: 'Motore di Regole', en: 'Rules Engine' },
  'Tabella Scoring': { it: 'Tabella Scoring', en: 'Scoring Table' },
  'Pipeline Training': { it: 'Pipeline Training', en: 'Training Pipeline' },
  'Messaggi ai cittadini': { it: 'Messaggi ai cittadini', en: 'Messages to Citizens' },
  'Testi Tradotti': { it: 'Testi Tradotti', en: 'Translated Texts' },
  'Contenuto Personale': { it: 'Contenuto Personale', en: 'Personal Content' },
  'Mancanza Trasparenza': { it: 'Mancanza Trasparenza', en: 'Lack of Transparency' },
  'Oversight Board': { it: 'Oversight Board', en: 'Oversight Board' },
  'Minimizzazione Posizione': { it: 'Minimizzazione Posizione', en: 'Location Minimization' },
  'Contenuti Creati': { it: 'Contenuti Creati', en: 'Created Content' },
  'Assistente Vocale AI': { it: 'Assistente Vocale AI', en: 'AI Voice Assistant' },
  'Consumo Energetico Training': { it: 'Consumo Energetico Training', en: 'Training Energy Consumption' },
  'Emissioni CO2 Stimate': { it: 'Emissioni CO2 Stimate', en: 'Estimated CO2 Emissions' },
  'Energia Inferenza Real-time': { it: 'Energia Inferenza Real-time', en: 'Real-time Inference Energy' },
  'Impronta Carbonio Infrastruttura': { it: 'Impronta Carbonio Infrastruttura', en: 'Infrastructure Carbon Footprint' },
  'Disparità di Accesso': { it: 'Disparità di Accesso', en: 'Access Disparity' },
  'Sostituzione Lavoro Umano': { it: 'Sostituzione Lavoro Umano', en: 'Human Labor Replacement' },
  'Esclusione Digitale': { it: 'Esclusione Digitale', en: 'Digital Exclusion' },
  'Impatto su Comunità Vulnerabili': { it: 'Impatto su Comunità Vulnerabili', en: 'Impact on Vulnerable Communities' },
  'Risultati Ricerca': { it: 'Risultati Ricerca', en: 'Research Results' },
  'Trascrizioni': { it: 'Trascrizioni', en: 'Transcriptions' },
  'Privacy Dati': { it: 'Privacy Dati', en: 'Data Privacy' },
  'Rischio Discriminazione': { it: 'Rischio Discriminazione', en: 'Discrimination Risk' },
  'Traduzione Automatica': { it: 'Traduzione Automatica', en: 'Automatic Translation' },
  'Strumento AI': { it: 'Strumento AI', en: 'AI Tool' },
  'Accountability Pubblica': { it: 'Accountability Pubblica', en: 'Public Accountability' },
  'Bias Algoritmici': { it: 'Bias Algoritmici', en: 'Algorithmic Bias' },
  'Copilot': { it: 'Copilot', en: 'Copilot' },
  'Dati Sensibili': { it: 'Dati Sensibili', en: 'Sensitive Data' },
  'Dati di Altre Persone': { it: 'Dati di Altre Persone', en: 'Other People\'s Data' },
  'Decisioni Automatiche': { it: 'Decisioni Automatiche', en: 'Automated Decisions' },
  'Esposizione Dati Lavoro': { it: 'Esposizione Dati Lavoro', en: 'Work Data Exposure' },
  'Fiducia dei Cittadini': { it: 'Fiducia dei Cittadini', en: 'Citizen Trust' },
  'Generazione Immagini AI': { it: 'Generazione Immagini AI', en: 'AI Image Generation' },
  'Trasparenza Decisionale': { it: 'Trasparenza Decisionale', en: 'Decision Transparency' },
};

/**
 * Translate a block label based on the current locale
 * @param label - The original label (usually in Italian)
 * @param locale - The target locale
 * @returns The translated label, or the original if no translation exists
 */
export function translateBlockLabel(label: string, locale: Locale): string {
  if (locale === 'it') {
    return label; // Return original Italian
  }
  
  const translation = BLOCK_LABEL_TRANSLATIONS[label];
  if (translation && translation[locale]) {
    return translation[locale];
  }
  
  // Fallback: return original label if no translation found
  return label;
}

