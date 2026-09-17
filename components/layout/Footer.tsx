'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useT } from '@/lib/i18n/useT';

export function Footer() {
  const t = useT();
  const pathname = usePathname();
  const year = new Date().getFullYear();

  // Timeline page is a full-viewport experience
  if (pathname === '/trasparenza' || pathname.startsWith('/trasparenza/')) {
    return null;
  }

  return (
    <footer className="border-t border-border/50 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-lg font-bold">Segno</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {t.footer.description}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold">{t.footer.navigation}</h4>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href="/trasparenza" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  {t.nav.trasparenza}
                </Link>
              </li>
              <li>
                <Link href="/#avanzamento" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  {t.home.roadmapTitle}
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  {t.home.faqTitle}
                </Link>
              </li>
              <li>
                <Link href="/chi-siamo" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  {t.nav.chiSiamo}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold">{t.footer.resources}</h4>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href="/strumenti" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  {t.nav.strumenti}
                </Link>
              </li>
              <li>
                <Link href="/percorsi" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  {t.nav.percorsi}
                </Link>
              </li>
              <li>
                <Link href="/mappa-digitale" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  {t.nav.mappaDigitale}
                </Link>
              </li>
              <li>
                <Link href="/stack-etico" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  {t.nav.stackEtico}
                </Link>
              </li>
              <li>
                <Link href="/process-designer" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  {t.nav.processDesigner}
                </Link>
              </li>
              <li>
                <Link href="/metodologia" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  {t.nav.metodologia}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold">{t.footer.contact}</h4>
            <ul className="mt-3 space-y-2">
              <li>
                <Link
                  href="/chi-siamo#contatti"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {t.footer.writeUs}
                </Link>
              </li>
              <li>
                <a
                  href="https://buymeacoffee.com/relatronica"
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
