'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore';
import { useT } from '@/lib/i18n/useT';
import { Menu, X, Globe, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DONATE_URL = 'https://buymeacoffee.com/relatronica';

export function Navbar() {
  const pathname = usePathname();
  const { locale, setLocale, mobileMenuOpen, setMobileMenuOpen } = useAppStore();
  const t = useT();

  const toggleLocale = () => {
    setLocale(locale === 'it' ? 'en' : 'it');
  };

  const timelineActive = pathname === '/timeline' || pathname.startsWith('/timeline/');
  const segnalaActive = pathname === '/segnala' || pathname.startsWith('/segnala/');
  const homeActive = pathname === '/';

  const closeMobile = () => setMobileMenuOpen(false);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname, setMobileMenuOpen]);

  const items = [
    { href: '/', label: t.nav.home, active: homeActive },
    { href: '/timeline', label: t.nav.timeline, active: timelineActive },
    { href: '/segnala', label: t.nav.segnala, active: segnalaActive },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="relative mx-auto flex h-[var(--nav-bar-h)] max-w-6xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex shrink-0 items-center"
          onClick={closeMobile}
          aria-label="Segno"
        >
          <Image
            src="/segno_logo.png"
            alt=""
            width={28}
            height={28}
            className="dark:hidden"
            priority
          />
          <Image
            src="/segno_logo_white.png"
            alt=""
            width={28}
            height={28}
            className="hidden dark:block"
            priority
          />
        </Link>

        <span aria-hidden className="hidden h-4 w-px bg-border md:block" />

        <nav className="hidden flex-1 items-center gap-0.5 md:flex">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                item.active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {item.label}
              {item.active && (
                <motion.span
                  layoutId="navbar-indicator"
                  className="absolute inset-x-3 -bottom-[3px] h-px rounded-full bg-mark"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                />
              )}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1 md:ml-0">
          <button
            type="button"
            onClick={toggleLocale}
            className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Change language"
          >
            <Globe className="h-4 w-4" />
            <span className="uppercase">{locale}</span>
          </button>

          <span aria-hidden className="mx-0.5 hidden h-4 w-px bg-border sm:block" />

          <a
            href={DONATE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
          >
            <Heart className="h-3.5 w-3.5" />
            {t.nav.donate}
          </a>

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

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
              className="absolute right-4 top-full mt-2 w-[min(18rem,calc(100vw-2rem))] overflow-hidden rounded-xl border border-border/60 bg-background/95 shadow-[0_12px_40px_rgba(15,23,42,0.1)] backdrop-blur-xl sm:right-6 lg:right-8 md:hidden"
            >
              <div className="space-y-1 p-2">
                {items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMobile}
                    className={`block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                      item.active
                        ? 'bg-accent text-foreground'
                        : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
                <a
                  href={DONATE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMobile}
                  className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
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
