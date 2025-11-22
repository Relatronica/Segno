/**
 * Helper functions to translate questions and actions dynamically
 */

'use client';

import { useAppStore } from '@/store/useAppStore';
import { getQuestionTranslation, getActionTranslation, type QuestionKey, type ActionKey } from './questionTranslations';
import type { CityActionGroup } from '@/modules/city-builder/utils/cityBlueprints';

// Define CityAction locally since it's not exported
type CityAction = {
  key: string;
  title: string;
  description: string;
};

// Map question labels to translation keys
const questionLabelToKey: Record<string, QuestionKey> = {
  'DOMANDA: Che tipo di informazioni raccogli?': 'q1-info-type',
  'DOMANDA: Raccogli dati sanitari o finanziari?': 'q2-health-financial',
  'DOMANDA: Come funziona il sistema che usi?': 'q3-how-works',
  'DOMANDA: Analizzi immagini, video o audio?': 'q4-media-analysis',
  'DOMANDA: Il sistema suggerisce o rileva anomalie?': 'q5-suggestions',
  'DOMANDA: Dove conservi i dati?': 'q6-storage',
  'DOMANDA: Come vengono utilizzati i risultati?': 'q7-output',
  'DOMANDA: Chi può vedere i tuoi dati e come sono protetti?': 'q8-protection',
  'DOMANDA: Quali rischi ti preoccupano di più?': 'q9-risks',
  'DOMANDA: Quale strumento AI stai usando?': 'uq1-which-tool',
  'DOMANDA: Per cosa lo usi?': 'uq2-what-for',
  'DOMANDA: Che tipo di informazioni condividi?': 'uq3-what-share',
  'DOMANDA: Dove viene salvato quello che condividi?': 'uq4-where-saved',
};

/**
 * Hook to get translation functions for questions and actions
 */
export function useQuestionTranslations() {
  const locale = useAppStore((state) => state.locale);

  const translateQuestionGroup = (group: CityActionGroup): CityActionGroup => {
    // Find translation key for the question
    const questionKey = questionLabelToKey[group.label];
    const translatedLabel = questionKey 
      ? getQuestionTranslation(locale, questionKey)
      : group.label.replace('DOMANDA: ', '');

    // Translate all actions
    const translatedActions: CityAction[] = group.actions.map(action => {
      const translation = getActionTranslation(locale, action.key as ActionKey);
      return {
        ...action,
        title: translation.title,
        description: translation.description,
      };
    });

    return {
      label: translatedLabel,
      actions: translatedActions,
    };
  };

  const translateAction = (action: CityAction): CityAction => {
    const translation = getActionTranslation(locale, action.key as ActionKey);
    return {
      ...action,
      title: translation.title,
      description: translation.description,
    };
  };

  const translateQuestionLabel = (label: string): string => {
    const questionKey = questionLabelToKey[label];
    if (questionKey) {
      return getQuestionTranslation(locale, questionKey);
    }
    // Fallback: remove "DOMANDA: " prefix if present
    return label.replace('DOMANDA: ', '');
  };

  return {
    translateQuestionGroup,
    translateAction,
    translateQuestionLabel,
  };
}

