'use client';

import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { useT } from '@/lib/i18n/useT';

/**
 * Icon-only toggle between light and dark. Which icon shows is decided by CSS
 * (`dark:`), so there is no hydration mismatch and no mount guard. The first
 * click pins an explicit choice; until then the theme follows the OS via
 * next-themes.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const t = useT();

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      aria-label={t.nav.themeToggle}
      title={t.nav.themeToggle}
      className={`rounded-md p-2 text-muted-foreground transition-colors hover:text-foreground ${
        className ?? ''
      }`}
    >
      <Sun className="h-4 w-4 dark:hidden" />
      <Moon className="hidden h-4 w-4 dark:block" />
    </button>
  );
}
