'use client';

import { useEffect } from 'react';
import { useAppStore } from '@/store/useAppStore';
import type { Locale } from '@/lib/i18n/translations';

/**
 * Component that:
 * 1. Syncs locale from localStorage on client mount (avoids hydration mismatch)
 * 2. Updates the HTML lang attribute based on current locale
 */
export function LanguageHandler() {
  const locale = useAppStore((state) => state.locale);
  const setLocale = useAppStore((state) => state.setLocale);

  // Sync locale from localStorage only on client mount
  useEffect(() => {
    const saved = localStorage.getItem('segno-locale');
    if (saved === 'it' || saved === 'en') {
      setLocale(saved as Locale);
    }
  }, [setLocale]);

  // Update HTML lang attribute
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  return null;
}

