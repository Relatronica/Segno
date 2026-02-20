import { create } from 'zustand';
import type { ServiceCategory, UsageFrequency } from '@/lib/data/services';
import { type ServiceUsage, type ScenarioInsights, calculateInsights } from '@/lib/scenario/insights';

export type WizardStep = 'landing' | 'categories' | 'services' | 'usage' | 'result';

type ScenarioState = {
  step: WizardStep;
  selectedCategories: ServiceCategory[];
  selectedServiceIds: string[];
  serviceUsages: Map<string, ServiceUsage>;
  insights: ScenarioInsights | null;
  expandedServiceId: string | null;

  setStep: (step: WizardStep) => void;
  toggleCategory: (category: ServiceCategory) => void;
  toggleService: (serviceId: string) => void;
  setServiceUsage: (serviceId: string, usage: Partial<ServiceUsage>) => void;
  computeInsights: () => void;
  setExpandedServiceId: (id: string | null) => void;
  reset: () => void;
};

const initialState = {
  step: 'landing' as WizardStep,
  selectedCategories: [] as ServiceCategory[],
  selectedServiceIds: [] as string[],
  serviceUsages: new Map<string, ServiceUsage>(),
  insights: null as ScenarioInsights | null,
  expandedServiceId: null as string | null,
};

export const useScenarioStore = create<ScenarioState>((set, get) => ({
  ...initialState,

  setStep: (step) => set({ step }),

  toggleCategory: (category) =>
    set((state) => {
      const cats = state.selectedCategories.includes(category)
        ? state.selectedCategories.filter((c) => c !== category)
        : [...state.selectedCategories, category];
      return { selectedCategories: cats };
    }),

  toggleService: (serviceId) =>
    set((state) => {
      const ids = state.selectedServiceIds.includes(serviceId)
        ? state.selectedServiceIds.filter((id) => id !== serviceId)
        : [...state.selectedServiceIds, serviceId];
      return { selectedServiceIds: ids };
    }),

  setServiceUsage: (serviceId, partial) =>
    set((state) => {
      const usages = new Map(state.serviceUsages);
      const existing = usages.get(serviceId) ?? {
        serviceId,
        frequency: 'weekly' as UsageFrequency,
      };
      usages.set(serviceId, { ...existing, ...partial });
      return { serviceUsages: usages };
    }),

  computeInsights: () => {
    const { selectedServiceIds, serviceUsages } = get();
    const usages: ServiceUsage[] = selectedServiceIds.map(
      (id) =>
        serviceUsages.get(id) ?? {
          serviceId: id,
          frequency: 'weekly' as UsageFrequency,
        }
    );
    const insights = calculateInsights(usages);
    set({ insights, step: 'result' });
  },

  setExpandedServiceId: (id) => set({ expandedServiceId: id }),

  reset: () => set({ ...initialState, serviceUsages: new Map() }),
}));
