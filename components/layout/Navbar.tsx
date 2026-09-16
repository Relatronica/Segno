'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore';
import { useT } from '@/lib/i18n/useT';
import { Menu, X, Globe, Calendar, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DONATE_URL = 'https://buymeacoffee.com/relatronica';

const secondaryLinks = [
  { href: '/chi-siamo', key: 'chiSiamo' as const },
  { href: '/strumenti', key: 'strumenti' as const },
  { href: '/news', key: 'news' as const },
];

export function Navbar() {
  const pathname = usePathname();
  const { locale, setLocale, mobileMenuOpen, setMobileMenuOpen } = useAppStore();
  const t = useT();

  const toggleLocale = () => {
    setLocale(locale === 'it' ? 'en' : 'it');
  };

  const timelineActive = pathname === '/trasparenza' || pathname.startsWith('/trasparenza/');

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-2.5" onClick={() => setMobileMenuOpen(false)}>
          <Image
            src="/segno_logo.png"
            alt="Segno"
            width={28}
            height={28}
            className="dark:hidden"
          />
          <Image
            src="/segno_logo_white.png"
            alt="Segno"
            width={28}
            height={28}
            className="hidden dark:block"
          />
          <span className="text-lg font-bold tracking-tight">Segno</span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          <div className="hidden items-center gap-1 md:flex">
            <Link
              href="/trasparenza"
              className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-semibold transition-colors ${
                timelineActive
                  ? 'bg-foreground text-background'
                  : 'bg-foreground/95 text-background hover:opacity-90'
              }`}
            >
              <Calendar className="h-3.5 w-3.5" />
              {t.nav.trasparenza}
            </Link>

            {secondaryLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {t.nav[link.key]}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute inset-x-1 -bottom-[calc(0.5rem+1px)] h-0.5 rounded-full bg-foreground"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          <a
            href={DONATE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1.5 rounded-md border border-mark/30 bg-mark-muted px-3 py-2 text-sm font-semibold text-mark transition-colors hover:bg-mark/15 sm:inline-flex"
          >
            <Heart className="h-3.5 w-3.5" />
            {t.nav.donate}
          </a>

          <button
            onClick={toggleLocale}
            className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Change language"
          >
            <Globe className="h-4 w-4" />
            <span className="uppercase">{locale}</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-muted-foreground transition-colors hover:text-foreground md:hidden"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-border/50 bg-background md:hidden"
          >
            <div className="space-y-1 px-4 py-4">
              <Link
                href="/trasparenza"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors ${
                  timelineActive
                    ? 'bg-foreground text-background'
                    : 'bg-accent text-foreground'
                }`}
              >
                <Calendar className="h-4 w-4" />
                {t.nav.trasparenza}
              </Link>
              {secondaryLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-accent text-foreground'
                        : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                    }`}
                  >
                    {t.nav[link.key]}
                  </Link>
                );
              })}
              <a
                href={DONATE_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-semibold text-mark"
              >
                <Heart className="h-4 w-4" />
                {t.nav.donate}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
