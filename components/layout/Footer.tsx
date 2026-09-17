'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useT } from '@/lib/i18n/useT';

const DONATE_URL = 'https://buymeacoffee.com/relatronica';

export function Footer() {
  const t = useT();
  const pathname = usePathname();
  const year = new Date().getFullYear();

  if (
    pathname === '/trasparenza' ||
    pathname.startsWith('/trasparenza/') ||
    pathname === '/redazione' ||
    pathname.startsWith('/redazione/')
  ) {
    return null;
  }

  return (
    <footer className="border-t border-border/50 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <h3 className="text-lg font-bold">Segno</h3>
            <p className="mt-2 max-w-sm text-sm text-muted-foreground">{t.footer.description}</p>
          </div>

          <div>
            <h4 className="text-sm font-semibold">{t.footer.navigation}</h4>
            <ul className="mt-3 space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {t.nav.home}
                </Link>
              </li>
              <li>
                <Link
                  href="/trasparenza"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {t.nav.trasparenza}
                </Link>
              </li>
              <li>
                <Link
                  href="/#faq"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {t.home.faqTitle}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold">{t.footer.contact}</h4>
            <ul className="mt-3 space-y-2">
              <li>
                <Link
                  href="/segnala"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {t.nav.segnala}
                </Link>
              </li>
              <li>
                <a
                  href={DONATE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {t.nav.donate}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border/50 pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {year} Segno. {t.footer.rights}
          </p>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span>{t.footer.madeWith}</span>
            <span className="text-border">|</span>
            <a
              href="https://relatronica.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              Relatronica
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
