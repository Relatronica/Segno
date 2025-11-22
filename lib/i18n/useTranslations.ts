/**
 * Hook to access translations based on current locale
 */
'use client';

import { useAppStore } from '@/store/useAppStore';
import { getTranslations, type Translations } from './translations';

export function useTranslations(): Translations {
  const locale = useAppStore((state) => state.locale);
  return getTranslations(locale);
}

