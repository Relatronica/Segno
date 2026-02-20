'use client';

import { useAppStore } from '@/store/useAppStore';
import { getTranslations } from './translations';

export function useT() {
  const locale = useAppStore((s) => s.locale);
  return getTranslations(locale);
}
