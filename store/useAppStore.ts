import { create } from 'zustand';

export type Locale = 'it' | 'en';

type AppState = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
};

export const useAppStore = create<AppState>((set) => ({
  locale: 'it',
  setLocale: (locale) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('segno-locale', locale);
    }
    set({ locale });
  },
  mobileMenuOpen: false,
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
}));
