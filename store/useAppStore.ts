import { create } from 'zustand';
import type { Locale } from '@/lib/i18n/translations';

export type UserMode = 'design' | 'use'; // 'design' = progettare app AI, 'use' = capire rischi uso

export type UserProfile = {
  name: string;
  avatarId: string; // e.g., 'robot-1', 'human-2'
  mode?: UserMode; // Modalità: progettare o usare
};

export type BlockCategory = 'input' | 'process' | 'storage' | 'output' | 'risk' | 'impact';

export type BlockVisual = {
  background?: string;
  border?: string;
  opacity?: number;
  pattern?: 'perimeter' | 'grid' | 'dots';
  accent?: string;
};

export type BlockClusterMeta = {
  id: string;
  order: number;
  label?: string;
  offset?: { x: number; y: number }; // offset expressed in grid units
  category?: BlockCategory;
};

export type BlockConfig = {
  dataTypes?: string[]; // Per Input: es. 'email', 'biometric', 'financial'
  isEncrypted?: boolean; // Per Input/Process
  aiModel?: string; // Per Process: es. 'gpt-4', 'custom-model'
  humanInTheLoop?: boolean; // Per Output/Process
  retention?: string; // Per Output
  footprint?: { width: number; height: number }; // px dimensions for schematic layout
  visual?: BlockVisual;
  cluster?: BlockClusterMeta;
  blueprintKey?: string; // Track which blueprint created this block
  parentBlueprintKey?: string; // Track the original blueprint that triggered creation of this block
};

export type Connection = {
  id: string;
  from: string; // Block ID
  to: string;   // Block ID
};

export type ScenarioBlock = {
  id: string;
  type: BlockCategory;
  label: string;
  position: { x: number; y: number };
  config?: BlockConfig;
};

type AppState = {
  // User State
  user: UserProfile | null;
  setUser: (user: UserProfile) => void;

  // Language State
  locale: Locale;
  setLocale: (locale: Locale) => void;

  // Scenario State
  scenarioBlocks: ScenarioBlock[];
  connections: Connection[];
  addBlock: (block: ScenarioBlock) => void;
  removeBlock: (blockId: string) => void;
  removeBlocksByBlueprint: (blueprintKey: string) => void;
  updateBlockPosition: (blockId: string, position: { x: number; y: number }) => void;
  updateBlockConfig: (blockId: string, config: BlockConfig) => void;
  
  // Connections
  addConnection: (fromId: string, toId: string) => void;
  removeConnection: (connectionId: string) => void;

  // App Flow State
  currentStep: 'onboarding' | 'builder' | 'analysis' | 'wiki';
  setStep: (step: 'onboarding' | 'builder' | 'analysis' | 'wiki') => void;
  
  // Wiki State
  currentArticleId: string | null;
  setCurrentArticleId: (id: string | null) => void;
  
  // Board Storage
  loadBoard: (boardData: { user: UserProfile | null; scenarioBlocks: ScenarioBlock[]; connections: Connection[] }) => void;
};

export const useAppStore = create<AppState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),

  // Always initialize with 'it' to avoid hydration mismatch
  // The locale will be synced from localStorage on client mount
  locale: 'it' as Locale,
  setLocale: (locale) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('segno-locale', locale);
    }
    set({ locale });
  },

  scenarioBlocks: [],
  connections: [],
  
  addBlock: (block) => {
    set((state) => {
      const newBlocks = [...state.scenarioBlocks, block];
      return { scenarioBlocks: newBlocks };
    });
  },
  removeBlock: (blockId) =>
    set((state) => ({
      scenarioBlocks: state.scenarioBlocks.filter((b) => b.id !== blockId),
      connections: state.connections.filter(c => c.from !== blockId && c.to !== blockId)
    })),
  removeBlocksByBlueprint: (blueprintKey: string) =>
    set((state) => {
      // Remove blocks that match the blueprintKey OR have this as parentBlueprintKey
      const blocksToRemove = state.scenarioBlocks.filter((b) => 
        b.config?.blueprintKey === blueprintKey || b.config?.parentBlueprintKey === blueprintKey
      );
      const blockIdsToRemove = new Set(blocksToRemove.map((b) => b.id));
      const remainingBlocks = state.scenarioBlocks.filter((b) => 
        b.config?.blueprintKey !== blueprintKey && b.config?.parentBlueprintKey !== blueprintKey
      );
      const remainingConnections = state.connections.filter(c => !blockIdsToRemove.has(c.from) && !blockIdsToRemove.has(c.to));
      return {
        scenarioBlocks: remainingBlocks,
        connections: remainingConnections
      };
    }),
  updateBlockPosition: (blockId, position) =>
    set((state) => ({
      scenarioBlocks: state.scenarioBlocks.map((b) =>
        b.id === blockId ? { ...b, position } : b
      ),
    })),
  updateBlockConfig: (blockId, config) =>
    set((state) => ({
      scenarioBlocks: state.scenarioBlocks.map((b) =>
        b.id === blockId ? { ...b, config: { ...b.config, ...config } } : b
      ),
    })),

  addConnection: (fromId, toId) => 
    set((state) => {
      // Evita duplicati
      if (state.connections.some(c => c.from === fromId && c.to === toId)) return state;
      // Genera ID unico usando timestamp + random per evitare collisioni
      const uniqueId = `conn-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
      return {
        connections: [...state.connections, { id: uniqueId, from: fromId, to: toId }]
      };
    }),
  removeConnection: (connectionId) =>
    set((state) => ({
      connections: state.connections.filter(c => c.id !== connectionId)
    })),

  currentStep: 'onboarding',
  setStep: (step) => set({ currentStep: step }),
  
  currentArticleId: null,
  setCurrentArticleId: (id) => set({ currentArticleId: id }),
  
  loadBoard: (boardData) => set({
    user: boardData.user,
    scenarioBlocks: boardData.scenarioBlocks,
    connections: boardData.connections,
  }),
}));

