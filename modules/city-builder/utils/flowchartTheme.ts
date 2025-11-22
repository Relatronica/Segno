'use client';

import type { BlockCategory, ScenarioBlock } from '@/store/useAppStore';
import type { LucideIcon } from 'lucide-react';
import { Activity, Cpu, Database, Globe2, Inbox, Share2, ShieldCheck } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { getTranslations } from '@/lib/i18n/translations';
import type { Locale } from '@/lib/i18n/translations';

export type FlowStageKey = BlockCategory;

export type FlowStageTheme = {
  key: FlowStageKey;
  label: string;
  title: string;
  subtitle: string;
  description?: string; // More detailed explanation for non-experts
  background: string;
  tint: string;
  accent: string;
  line: string;
  shadow: string;
  badge: string;
  icon: LucideIcon;
};

export const FLOW_STAGES: Record<FlowStageKey, FlowStageTheme> = {
  input: {
    key: 'input',
    label: 'Input',
    title: 'Dati in Entrata',
    subtitle: 'Da dove arrivano le informazioni',
    description: 'Tutti i dati che entrano nel sistema: email, form, sensori, file, database esterni',
    background: 'linear-gradient(180deg, #F0FDF4 0%, #DCFCE7 100%)',
    tint: 'rgba(16, 185, 129, 0.08)',
    accent: '#0F766E',
    line: '#0D9488',
    shadow: 'rgba(5, 150, 105, 0.35)',
    badge: '#059669',
    icon: Inbox,
  },
  process: {
    key: 'process',
    label: 'Processo',
    title: 'Elaborazione & Intelligenza Artificiale',
    subtitle: 'Come i dati vengono analizzati',
    description: 'I dati vengono elaborati da algoritmi, modelli AI o sistemi di analisi per estrarre informazioni utili',
    background: 'linear-gradient(180deg, #EEF2FF 0%, #E0E7FF 100%)',
    tint: 'rgba(79, 70, 229, 0.08)',
    accent: '#4338CA',
    line: '#4C1D95',
    shadow: 'rgba(79, 70, 229, 0.3)',
    badge: '#4C1D95',
    icon: Cpu,
  },
  storage: {
    key: 'storage',
    label: 'Storage',
    title: 'Archiviazione Dati',
    subtitle: 'Dove vengono conservati',
    description: 'I dati vengono salvati su server, database o cloud. La posizione geografica è importante per la privacy',
    background: 'linear-gradient(180deg, #F5F3FF 0%, #FAE8FF 100%)',
    tint: 'rgba(192, 132, 252, 0.1)',
    accent: '#9333EA',
    line: '#7E22CE',
    shadow: 'rgba(147, 51, 234, 0.3)',
    badge: '#7E22CE',
    icon: Database,
  },
  output: {
    key: 'output',
    label: 'Output',
    title: 'Risultati & Azioni',
    subtitle: 'Cosa produce il sistema',
    description: 'I risultati dell\'elaborazione: decisioni automatiche, raccomandazioni, interfacce utente o comunicazioni',
    background: 'linear-gradient(180deg, #FFF7ED 0%, #FFE4E6 100%)',
    tint: 'rgba(249, 115, 22, 0.1)',
    accent: '#EA580C',
    line: '#DC2626',
    shadow: 'rgba(234, 88, 12, 0.35)',
    badge: '#EA580C',
    icon: Share2,
  },
  risk: {
    key: 'risk',
    label: 'Risk',
    title: 'Controlli & Policy',
    subtitle: 'Audit e governance',
    background: 'linear-gradient(180deg, #FEF9C3 0%, #FDE68A 100%)',
    tint: 'rgba(234, 179, 8, 0.12)',
    accent: '#B45309',
    line: '#92400E',
    shadow: 'rgba(180, 83, 9, 0.35)',
    badge: '#B45309',
    icon: ShieldCheck,
  },
  impact: {
    key: 'impact',
    label: 'Impatto',
    title: 'Impatto & Sistema',
    subtitle: 'Effetti sul contesto',
    background: 'linear-gradient(180deg, #ECFDF5 0%, #E0F2FE 100%)',
    tint: 'rgba(14, 165, 233, 0.12)',
    accent: '#0EA5E9',
    line: '#0284C7',
    shadow: 'rgba(14, 165, 233, 0.35)',
    badge: '#0EA5E9',
    icon: Globe2,
  },
};

export const getStageKey = (block?: ScenarioBlock | null): FlowStageKey => {
  if (!block) return 'process';
  return block.config?.cluster?.category ?? block.type ?? 'process';
};

export const getStageTheme = (block?: ScenarioBlock | null, locale?: Locale): FlowStageTheme => {
  const stageKey = getStageKey(block);
  return getStageThemeByKey(stageKey, locale);
};

export const getStageThemeByKey = (stageKey: FlowStageKey, locale?: Locale): FlowStageTheme => {
  const currentLocale = locale || useAppStore.getState().locale;
  const t = getTranslations(currentLocale);
  const baseStage = FLOW_STAGES[stageKey] ?? FLOW_STAGES.process;
  
  // Get translated texts for this stage
  const columnTexts = t.columns[stageKey];
  
  return {
    ...baseStage,
    label: columnTexts?.label || baseStage.label,
    title: columnTexts?.title || baseStage.title,
    subtitle: columnTexts?.subtitle || baseStage.subtitle,
    description: columnTexts?.description || baseStage.description,
  };
};

