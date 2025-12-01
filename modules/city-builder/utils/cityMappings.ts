// New Schematic / PCB Theme
export const CITY_THEME = {
  colors: {
    ground: '#F7F9FB', // Light neutral background
    grid: '#E5EDF5',   // Subtle slate grid
    line: '#2A2A2A',   // Dark grey for connections
  },
  gridSize: 40,
  blockDimensions: {
    width: 184,
    height: 88,
  },
  layout: {
    paddingX: 200,
    paddingY: 180,
    clusterGapX: 520,
    clusterGapY: 360,
    clustersPerRow: 6,
    // Aggiungiamo una colonna dedicata all'impatto geo-politico / ambientale
    categoryOrder: ['input', 'process', 'storage', 'output', 'risk', 'impact'] as const,
  },
};

export const BUILDING_TYPES: Record<string, { 
  label: string; 
  color: string; 
  borderColor: string;
  description: string;
}> = {
  // INPUTS (Sources) - GREEN shades
  'input-personal': { 
    label: 'Personal Data', 
    color: '#5E8B4B', 
    borderColor: '#3A5A2A',
    description: 'Fonte di Dati Personali' 
  },
  'input-video': { 
    label: 'Surveillance', 
    color: '#4A6F3B', 
    borderColor: '#2A3F22',
    description: 'Fonte Video/Immagini' 
  },
  'input-public': { 
    label: 'Public Data', 
    color: '#73A560', 
    borderColor: '#466938',
    description: 'Dati Pubblici/Open Source' 
  },
  'input-operational': {
    label: 'Operational / IoT',
    color: '#4C7A5A',
    borderColor: '#2F4F37',
    description: 'Log tecnici, sensori e dispositivi connessi'
  },
  'input-partner': {
    label: 'Third-Party Data',
    color: '#5AA6A9',
    borderColor: '#2B6F72',
    description: 'Dataset acquistati o forniti da partner'
  },

  // PROCESS (Industry) - DARK / BLACK shades
  'process-llm': { 
    label: 'LLM Model', 
    color: '#2F2F2F', 
    borderColor: '#1A1A1A',
    description: 'Elaborazione del Linguaggio' 
  },
  'process-biometric': { 
    label: 'Bio Analysis', 
    color: '#3F3F3F', 
    borderColor: '#1A1A1A',
    description: 'Analisi Tratti Fisici' 
  },
  'process-rag': { 
    label: 'RAG System', 
    color: '#4A4A4A', 
    borderColor: '#1A1A1A',
    description: 'Recupero Informazioni' 
  },
  'process-automation': {
    label: 'Rules / Scoring',
    color: '#8B5CF6',
    borderColor: '#6D28D9',
    description: 'Motori deterministici e automazioni'
  },
  'process-modelops': {
    label: 'Training / MLOps',
    color: '#7C3AED',
    borderColor: '#5B21B6',
    description: 'Pipeline di training e tuning modelli'
  },

  // INFRASTRUCTURE (Storage) - PINK / PURPLE shades
  'storage-eu': { 
    label: 'EU Storage', 
    color: '#C77DFF', 
    borderColor: '#8A4DB8',
    description: 'Archiviazione Europea' 
  },
  'storage-us': { 
    label: 'US Storage', 
    color: '#E0AAFF', 
    borderColor: '#9A6DB8',
    description: 'Trasferimento Extra-UE' 
  },
  'storage-onprem': {
    label: 'On-Prem / Edge',
    color: '#6B7280',
    borderColor: '#4B5563',
    description: 'Server proprietari o dispositivi in campo'
  },

  // OUTPUT (Services) - RED / ORANGE shades
  'output-decision': { 
    label: 'Decision', 
    color: '#D65D5D', 
    borderColor: '#8A2D2D',
    description: 'Decisioni Automatizzate' 
  },
  'output-chat': { 
    label: 'Chat UI', 
    color: '#E67D7D', 
    borderColor: '#9A3D3D',
    description: 'Interfaccia Chat' 
  },
  'output-public': {
    label: 'Output pubblico / API',
    color: '#FB7185',
    borderColor: '#9F1239',
    description: 'Portali, comunicati, integrazioni esterne'
  },
  // IMPACT / SYSTEMIC
  'impact-energy': {
    label: 'Consumo Energetico',
    color: '#F59E0B',
    borderColor: '#B45309',
    description: 'Energia, emissioni e dipendenze infrastrutturali'
  },
  'impact-social': {
    label: 'Impatto Sociale',
    color: '#F472B6',
    borderColor: '#BE185D',
    description: 'Effetti su persone, comunità e coesione sociale'
  },
  'impact-political': {
    label: 'Impatto Geo-politico',
    color: '#94A3B8',
    borderColor: '#475569',
    description: 'Equilibri geo-politici, governance istituzionale e fiducia pubblica'
  },
  'risk-compliance': {
    label: 'Policy & Audit',
    color: '#FCD34D',
    borderColor: '#B45309',
    description: 'DPIA, linee guida e revisioni periodiche'
  },
};

// Helper to map legacy builder types to new schematic types
export const mapBlockToBuilding = (blockType: string, label: string) => {
  if (blockType === 'input') {
    if (label.toLowerCase().includes('video')) return 'input-video';
    if (label.toLowerCase().includes('pubblic')) return 'input-public';
    if (label.toLowerCase().includes('iot') || label.toLowerCase().includes('operat')) return 'input-operational';
    if (label.toLowerCase().includes('partner') || label.toLowerCase().includes('terze')) return 'input-partner';
    return 'input-personal';
  }
  if (blockType === 'process') {
    if (label.toLowerCase().includes('bio')) return 'process-biometric';
    if (label.toLowerCase().includes('rag')) return 'process-rag';
    if (
      label.toLowerCase().includes('regol') ||
      label.toLowerCase().includes('rule') ||
      label.toLowerCase().includes('auto')
    ) {
      return 'process-automation';
    }
    if (
      label.toLowerCase().includes('mlops') ||
      label.toLowerCase().includes('training')
    ) {
      return 'process-modelops';
    }
    return 'process-llm';
  }
  if (blockType === 'storage') {
    if (label.toLowerCase().includes('usa')) return 'storage-us';
    if (
      label.toLowerCase().includes('prem') ||
      label.toLowerCase().includes('edge')
    ) {
      return 'storage-onprem';
    }
    return 'storage-eu';
  }
  if (blockType === 'output') {
    if (label.toLowerCase().includes('chat')) return 'output-chat';
    if (
      label.toLowerCase().includes('api') ||
      label.toLowerCase().includes('pubblic')
    ) {
      return 'output-public';
    }
    return 'output-decision';
  }
  if (blockType === 'impact') {
    if (label.toLowerCase().includes('energia')) return 'impact-energy';
    if (label.toLowerCase().includes('social')) return 'impact-social';
    return 'impact-political';
  }
  if (blockType === 'risk') {
    if (
      label.toLowerCase().includes('policy') ||
      label.toLowerCase().includes('audit')
    ) {
      return 'risk-compliance';
    }
    return 'risk-oversight';
  }
  return 'input-personal';
};
