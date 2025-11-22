/**
 * Maps wizard block labels to blueprint keys
 * This ensures wizard-created blocks use the same blueprints as manual selection,
 * generating risk/impact notes and tracking selections correctly
 */

export const WIZARD_LABEL_TO_BLUEPRINT: Record<string, string> = {
  // INPUT
  'Dati Pubblici': 'input-public',
  'Dati Personali': 'input-personal',
  'Video/Immagini': 'input-video',
  'Dati Aziendali': 'input-personal', // Fallback to personal data
  'Dati Sanitari': 'input-health',
  'Dati Finanziari': 'input-financial',
  'Dati di Localizzazione': 'input-location',
  'Dati Comportamentali': 'input-behavioral',
  'Registrazioni Audio': 'input-audio',
  'Sensori / IoT': 'input-operational',
  'Dati Fornitori': 'input-partner',
  'Log Operativi': 'input-operational',

  // PROCESS
  'Chatbot LLM': 'process-llm',
  'Analisi Biometrica': 'process-biometric',
  'Classificatore AI': 'process-rag', // Fallback for document classification
  'Algoritmo Predittivo': 'process-modelops',
  'Computer Vision': 'process-vision',
  'Elaborazione Audio': 'process-audio',
  'Sistema di Raccomandazione': 'process-recommendation',
  'Rilevamento Anomalie': 'process-anomaly',
  'Motore RAG': 'process-rag',
  'Motore di Regole': 'process-automation',

  // STORAGE
  'Cloud Server (USA)': 'storage-us',
  'Cloud Server (UE)': 'storage-eu',
  'Cloud (USA)': 'storage-us',
  'Vault Dati (UE)': 'storage-eu',
  'On-Premise': 'storage-onprem',
  'Server Proprietari': 'storage-onprem',
  'Vector Database': 'storage-eu', // Fallback

  // OUTPUT
  'Decisione Automatica': 'output-decision',
  'Interfaccia Chat': 'output-chat',
  'Report Analitico': 'output-dashboard', // Fallback to dashboard
  'Portale / API pubblica': 'output-public',
  'Sistema di Notifiche': 'output-notification',
  'Dashboard Analitica': 'output-dashboard',
  'Export Dati': 'output-export',
};

/**
 * Get blueprint key for a block label
 * Returns null if no mapping found
 */
export function getBlueprintKeyForLabel(label: string, type: string): string | null {
  // Try exact match first
  if (WIZARD_LABEL_TO_BLUEPRINT[label]) {
    return WIZARD_LABEL_TO_BLUEPRINT[label];
  }

  // Try partial matches for common patterns
  if (type === 'input') {
    if (label.toLowerCase().includes('personali') || label.toLowerCase().includes('personale')) {
      return 'input-personal';
    }
    if (label.toLowerCase().includes('pubblic') || label.toLowerCase().includes('open')) {
      return 'input-public';
    }
    if (label.toLowerCase().includes('video') || label.toLowerCase().includes('immagini')) {
      return 'input-video';
    }
  }

  if (type === 'process') {
    if (label.toLowerCase().includes('llm') || label.toLowerCase().includes('chatbot') || label.toLowerCase().includes('gpt')) {
      return 'process-llm';
    }
    if (label.toLowerCase().includes('biometric')) {
      return 'process-biometric';
    }
    if (label.toLowerCase().includes('rag') || label.toLowerCase().includes('document')) {
      return 'process-rag';
    }
  }

  if (type === 'storage') {
    if (label.toLowerCase().includes('usa') || label.toLowerCase().includes('usa')) {
      return 'storage-us';
    }
    if (label.toLowerCase().includes('ue') || label.toLowerCase().includes('europa')) {
      return 'storage-eu';
    }
    if (label.toLowerCase().includes('on-prem') || label.toLowerCase().includes('locale') || label.toLowerCase().includes('proprietar')) {
      return 'storage-onprem';
    }
  }

  if (type === 'output') {
    if (label.toLowerCase().includes('decision') || label.toLowerCase().includes('automatic')) {
      return 'output-decision';
    }
    if (label.toLowerCase().includes('chat') || label.toLowerCase().includes('interfaccia')) {
      return 'output-chat';
    }
    if (label.toLowerCase().includes('dashboard') || label.toLowerCase().includes('report') || label.toLowerCase().includes('analitico')) {
      return 'output-dashboard';
    }
  }

  return null;
}

