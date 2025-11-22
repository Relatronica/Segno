import { ScenarioBlock, Connection } from '@/store/useAppStore';

export type WizardTemplate = {
  id: string;
  title: string;
  description: string;
  icon: string;
  questions: WizardQuestion[];
};

export type WizardQuestion = {
  id: string;
  text: string;
  options: {
    label: string;
    value: string;
    // Azioni che questa risposta provoca sulla generazione
    actions: {
      addBlocks?: Partial<ScenarioBlock>[];
      addConnections?: boolean;
    }
  }[];
};

export const SCENARIO_TEMPLATES: WizardTemplate[] = [
  {
    id: 'generative',
    title: 'Generazione Contenuti (GenAI)',
    description: 'Creazione di testi, immagini o codice (es. Marketing, Copywriting).',
    icon: 'wand-2',
    questions: [
      {
        id: 'q1',
        text: 'Qual è la fonte dei dati?',
        options: [
          { 
            label: 'Dati pubblici / Web scraping', 
            value: 'public',
            actions: {
              addBlocks: [
                { type: 'input', label: 'Dati Pubblici', config: { dataTypes: [] } }
              ]
            }
          },
          { 
            label: 'Documenti interni aziendali', 
            value: 'internal',
            actions: {
              addBlocks: [
                { type: 'input', label: 'Dati Aziendali', config: { isEncrypted: true } },
                { type: 'storage', label: 'Vector Database' }
              ]
            }
          }
        ]
      },
      {
        id: 'q2',
        text: 'Che tipo di modello utilizzi?',
        options: [
          { 
            label: 'Modello Cloud (es. GPT-4, Claude)', 
            value: 'cloud',
            actions: {
              addBlocks: [
                { type: 'process', label: 'Chatbot LLM', config: { aiModel: 'gpt-4' } },
                { type: 'storage', label: 'Cloud Server (USA)' }
              ]
            }
          },
          { 
            label: 'Modello Locale / Open Source', 
            value: 'local',
            actions: {
              addBlocks: [
                { type: 'process', label: 'Chatbot LLM', config: { aiModel: 'custom' } },
                { type: 'storage', label: 'On-Premise' }
              ]
            }
          }
        ]
      },
      {
        id: 'q3',
        text: 'Come viene usato l\'output?',
        options: [
          { 
            label: 'Revisione umana prima della pubblicazione', 
            value: 'review',
            actions: {
              addBlocks: [
                { type: 'output', label: 'Report Analitico', config: { humanInTheLoop: true } }
              ]
            }
          },
          { 
            label: 'Pubblicazione diretta automatica', 
            value: 'direct',
            actions: {
              addBlocks: [
                { type: 'output', label: 'Interfaccia Chat', config: { humanInTheLoop: false } }
              ]
            }
          }
        ]
      }
    ]
  },
  {
    id: 'classification',
    title: 'Analisi & Classificazione',
    description: 'Analisi di documenti, immagini o dati per estrarre informazioni.',
    icon: 'scan-search',
    questions: [
        {
        id: 'q1',
        text: 'Che cosa deve analizzare il sistema?',
        options: [
          { 
            label: 'Persone (Volti, Voci, Biometria)', 
            value: 'people',
            actions: {
              addBlocks: [
                { type: 'input', label: 'Video/Immagini', config: { dataTypes: ['Biometrici'] } },
                { type: 'process', label: 'Analisi Biometrica' }
              ]
            }
          },
          { 
            label: 'Documenti / Testi (CV, Contratti)', 
            value: 'docs',
            actions: {
              addBlocks: [
                { type: 'input', label: 'Dati Personali', config: { dataTypes: ['Nome/Cognome', 'Email'] } },
                { type: 'process', label: 'Classificatore AI' } // Nota: Block label custom
              ]
            }
          }
        ]
      },
       {
        id: 'q2',
        text: 'Qual è l\'obiettivo dell\'analisi?',
        options: [
          { 
            label: 'Supporto alla decisione (Ranking/Scoring)', 
            value: 'ranking',
            actions: {
              addBlocks: [
                { type: 'output', label: 'Report Analitico' }
              ]
            }
          },
          { 
            label: 'Decisione automatica (Approvazione/Rifiuto)', 
            value: 'decision',
            actions: {
              addBlocks: [
                { type: 'output', label: 'Decisione Automatica' }
              ]
            }
          }
        ]
      }
    ]
  },
  {
    id: 'prediction',
    title: 'Previsione & Forecasting',
    description: 'Sistemi predittivi su dati storici (es. Finanza, Manutenzione, Salute).',
    icon: 'line-chart',
    questions: [
        {
        id: 'q1',
        text: 'Qual è la natura dei dati storici?',
        options: [
          { 
            label: 'Dati anonimi / Macchinari (IoT)', 
            value: 'iot',
            actions: {
              addBlocks: [
                { type: 'input', label: 'Dati Pubblici', config: { dataTypes: [] } }, // Placeholder per dati tecnici
                { type: 'storage', label: 'Cloud Server (UE)' }
              ]
            }
          },
          { 
            label: 'Dati comportamentali umani / Salute', 
            value: 'health',
            actions: {
              addBlocks: [
                { type: 'input', label: 'Dati Personali', config: { dataTypes: ['Sanitari', 'Finanziari'] } },
                { type: 'storage', label: 'On-Premise', config: { isEncrypted: true } }
              ]
            }
          }
        ]
      },
       {
        id: 'q2',
        text: 'Che impatto ha la previsione?',
        options: [
          { 
            label: 'Basso (ottimizzazione interna)', 
            value: 'low',
            actions: {
              addBlocks: [
                { type: 'process', label: 'Algoritmo Predittivo' },
                { type: 'output', label: 'Report Analitico' }
              ]
            }
          },
          { 
            label: 'Alto (impatto sulla vita delle persone)', 
            value: 'high',
            actions: {
              addBlocks: [
                { type: 'process', label: 'Algoritmo Predittivo' },
                { type: 'output', label: 'Decisione Automatica', config: { humanInTheLoop: true } } // Forziamo la best practice
              ]
            }
          }
        ]
      }
    ]
  }
];
