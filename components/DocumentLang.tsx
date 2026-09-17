'use client';

import { useEffect } from 'react';
import { useAppStore, type Locale } from '@/store/useAppStore';

function isLocale(value: string | null): value is Locale {
  return value === 'it' || value === 'en';
}

export function DocumentLang() {
  const locale = useAppStore((s) => s.locale);
  const setLocale = useAppStore((s) => s.setLocale);

  useEffect(() => {
    const stored = window.localStorage.getItem('segno-locale');
    if (isLocale(stored) && stored !== useAppStore.getState().locale) {
      setLocale(stored);
    }
  }, [setLocale]);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}
