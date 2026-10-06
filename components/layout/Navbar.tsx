'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore';
import { useT } from '@/lib/i18n/useT';
import { Menu, X, Globe, Quote, Heart, Flag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DONATE_URL = 'https://buymeacoffee.com/relatronica';

export function Navbar() {
  const pathname = usePathname();
  const { locale, setLocale, mobileMenuOpen, setMobileMenuOpen } = useAppStore();
  const t = useT();

  const toggleLocale = () => {
    setLocale(locale === 'it' ? 'en' : 'it');
  };

  const timelineActive = pathname === '/trasparenza' || pathname.startsWith('/trasparenza/');
  const segnalaActive = pathname === '/segnala' || pathname.startsWith('/segnala/');
  const homeActive = pathname === '/';

  const closeMobile = () => setMobileMenuOpen(false);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname, setMobileMenuOpen]);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center p-2.5 sm:p-4">
      <div className="pointer-events-auto relative w-fit max-w-full">
        <nav className="flex h-12 items-center gap-2 rounded-2xl border border-border/50 bg-background/80 px-2.5 shadow-[0_8px_30px_rgba(15,23,42,0.06)] backdrop-blur-xl sm:gap-3 sm:px-3">
          <Link
            href="/"
            className="flex shrink-0 items-center rounded-md p-1"
            onClick={closeMobile}
            aria-label="Segno"
          >
            <Image src="/segno_logo.png" alt="Segno" width={26} height={26} className="dark:hidden" />
            <Image
              src="/segno_logo_white.png"
              alt="Segno"
              width={26}
              height={26}
              className="hidden dark:block"
            />
          </Link>

          <div className="flex items-center gap-0.5 sm:gap-1">
            <div className="hidden items-center gap-0.5 md:flex">
              <Link
                href="/"
                className={`relative rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  homeActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {t.nav.home}
                {homeActive && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-foreground"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                  />
                )}
              </Link>

              <Link
                href="/trasparenza"
                className={`relative inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  timelineActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Quote className="h-3.5 w-3.5" />
                {t.nav.trasparenza}
                {timelineActive && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-foreground"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                  />
                )}
              </Link>

              <Link
                href="/segnala"
                className={`relative inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  segnalaActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Flag className="h-3.5 w-3.5" />
                {t.nav.segnala}
                {segnalaActive && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-foreground"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                  />
                )}
              </Link>
            </div>

            <a
              href={DONATE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-1.5 rounded-md border border-mark/30 bg-mark-muted px-2.5 py-1.5 text-sm font-semibold text-mark transition-colors hover:bg-mark/15 sm:inline-flex"
            >
              <Heart className="h-3.5 w-3.5" />
              {t.nav.donate}
            </a>

            <button
              type="button"
              onClick={toggleLocale}
              className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Change language"
            >
              <Globe className="h-4 w-4" />
              <span className="uppercase">{locale}</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-md p-2 text-muted-foreground transition-colors hover:text-foreground md:hidden"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
              className="absolute left-1/2 top-[calc(100%+0.5rem)] w-[min(18rem,calc(100vw-1.25rem))] -translate-x-1/2 overflow-hidden rounded-2xl border border-border/50 bg-background/95 shadow-[0_12px_40px_rgba(15,23,42,0.1)] backdrop-blur-xl md:hidden"
            >
              <div className="space-y-1 p-2">
                <Link
                  href="/"
                  onClick={closeMobile}
                  className={`block rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                    homeActive ? 'bg-accent text-foreground' : 'text-muted-foreground hover:bg-accent'
                  }`}
                >
                  {t.nav.home}
                </Link>
                <Link
                  href="/trasparenza"
                  onClick={closeMobile}
                  className={`flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                    timelineActive
                      ? 'bg-accent text-foreground'
                      : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                  }`}
                >
                  <Quote className="h-4 w-4" />
                  {t.nav.trasparenza}
                </Link>
                <Link
                  href="/segnala"
                  onClick={closeMobile}
                  className={`flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                    segnalaActive
                      ? 'bg-accent text-foreground'
                      : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                  }`}
                >
                  <Flag className="h-4 w-4" />
                  {t.nav.segnala}
                </Link>
                <a
                  href={DONATE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMobile}
                  className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold text-mark"
                >
                  <Heart className="h-4 w-4" />
                  {t.nav.donate}
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
