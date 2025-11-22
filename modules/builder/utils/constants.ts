import { Database, Cpu, FileInput, Layout } from 'lucide-react';

export const BLOCK_TYPES = [
  // INPUT
  { type: 'input', label: 'Dati Personali', color: 'bg-blue-500', icon: 'user' },
  { type: 'input', label: 'Video/Immagini', color: 'bg-blue-400', icon: 'image' },
  { type: 'input', label: 'Dati Pubblici', color: 'bg-blue-300', icon: 'globe' },
  
  // AI PROCESS
  { type: 'process', label: 'Chatbot LLM', color: 'bg-purple-400', icon: 'bot' },
  { type: 'process', label: 'Analisi Biometrica', color: 'bg-purple-600', icon: 'scan' },
  { type: 'process', label: 'RAG / Embedding', color: 'bg-purple-500', icon: 'brain' },
  
  // INFRASTRUCTURE (NEW)
  { type: 'storage', label: 'Cloud Server (UE)', color: 'bg-orange-400', icon: 'server' },
  { type: 'storage', label: 'Cloud Server (USA)', color: 'bg-orange-500', icon: 'cloud' },
  { type: 'storage', label: 'Vector Database', color: 'bg-orange-300', icon: 'database' },
  { type: 'storage', label: 'On-Premise', color: 'bg-slate-600', icon: 'hard-drive' },

  // OUTPUT
  { type: 'output', label: 'Decisione Automatica', color: 'bg-emerald-500', icon: 'gavel' },
  { type: 'output', label: 'Report Analitico', color: 'bg-emerald-400', icon: 'file-text' },
  { type: 'output', label: 'Interfaccia Chat', color: 'bg-emerald-300', icon: 'message-square' },
];

export const CATEGORIES = [
  { id: 'input', label: 'Dati & Input', icon: FileInput },
  { id: 'process', label: 'Modelli AI', icon: Cpu },
  { id: 'storage', label: 'Infrastruttura', icon: Database },
  { id: 'output', label: 'Output & UI', icon: Layout },
];

