import { create } from 'zustand';
import type { Node, Edge } from '@xyflow/react';

export type AIProvider = 'openai' | 'anthropic' | 'google' | 'ollama';

export type ProcessWizardStep = 'landing' | 'apiKey' | 'processType' | 'questions' | 'canvas';

export type ProcessTemplate =
  | 'data_collection'
  | 'automated_decision'
  | 'ml_pipeline'
  | 'business_workflow'
  | 'health_data'
  | 'custom';

export type RiskLevel = 'unacceptable' | 'high' | 'limited' | 'minimal';

export interface EthicsAnalysis {
  overallScore: number;
  gdpr: {
    score: number;
    issues: string[];
    suggestions: string[];
  };
  aiAct: {
    riskLevel: RiskLevel;
    classification: string;
    issues: string[];
    suggestions: string[];
  };
  ethicalConcerns: string[];
  improvements: string[];
}

export interface ProcessQuestion {
  id: string;
  question: string;
  answer: string;
}

export interface ProcessNodeData {
  label: string;
  description: string;
  type: 'start' | 'process' | 'decision' | 'data' | 'end' | 'ai';
  riskLevel?: RiskLevel;
  [key: string]: unknown;
}

interface ProcessState {
  step: ProcessWizardStep;
  aiProvider: AIProvider;
  apiKey: string;
  apiKeyValidated: boolean;
  ollamaUrl: string;
  ollamaModel: string;
  processTemplate: ProcessTemplate | null;
  customDescription: string;
  questions: ProcessQuestion[];
  nodes: Node<ProcessNodeData>[];
  edges: Edge[];
  ethicsAnalysis: EthicsAnalysis | null;
  isGenerating: boolean;
  isAnalyzing: boolean;
  error: string | null;

  setStep: (step: ProcessWizardStep) => void;
  setAIProvider: (provider: AIProvider) => void;
  setApiKey: (key: string) => void;
  setApiKeyValidated: (validated: boolean) => void;
  setOllamaUrl: (url: string) => void;
  setOllamaModel: (model: string) => void;
  setProcessTemplate: (template: ProcessTemplate | null) => void;
  setCustomDescription: (desc: string) => void;
  setQuestions: (questions: ProcessQuestion[]) => void;
  updateAnswer: (questionId: string, answer: string) => void;
  setNodes: (nodes: Node<ProcessNodeData>[]) => void;
  setEdges: (edges: Edge[]) => void;
  setEthicsAnalysis: (analysis: EthicsAnalysis | null) => void;
  setIsGenerating: (generating: boolean) => void;
  setIsAnalyzing: (analyzing: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

const initialState = {
  step: 'landing' as ProcessWizardStep,
  aiProvider: 'openai' as AIProvider,
  apiKey: '',
  apiKeyValidated: false,
  ollamaUrl: 'http://localhost:11434',
  ollamaModel: 'llama3.1',
  processTemplate: null as ProcessTemplate | null,
  customDescription: '',
  questions: [] as ProcessQuestion[],
  nodes: [] as Node<ProcessNodeData>[],
  edges: [] as Edge[],
  ethicsAnalysis: null as EthicsAnalysis | null,
  isGenerating: false,
  isAnalyzing: false,
  error: null as string | null,
};

export const useProcessStore = create<ProcessState>((set) => ({
  ...initialState,

  setStep: (step) => set({ step }),
  setAIProvider: (provider) => set({ aiProvider: provider }),
  setApiKey: (key) => set({ apiKey: key }),
  setApiKeyValidated: (validated) => set({ apiKeyValidated: validated }),
  setOllamaUrl: (url) => set({ ollamaUrl: url }),
  setOllamaModel: (model) => set({ ollamaModel: model }),
  setProcessTemplate: (template) => set({ processTemplate: template }),
  setCustomDescription: (desc) => set({ customDescription: desc }),
  setQuestions: (questions) => set({ questions }),
  updateAnswer: (questionId, answer) =>
    set((state) => ({
      questions: state.questions.map((q) =>
        q.id === questionId ? { ...q, answer } : q
      ),
    })),
  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),
  setEthicsAnalysis: (analysis) => set({ ethicsAnalysis: analysis }),
  setIsGenerating: (generating) => set({ isGenerating: generating }),
  setIsAnalyzing: (analyzing) => set({ isAnalyzing: analyzing }),
  setError: (error) => set({ error }),
  reset: () => set({ ...initialState }),
}));
