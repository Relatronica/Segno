'use client';

import { useMemo, useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle2,
  CircleDashed,
  Copy,
  Check,
  Link2,
  Share2,
  History,
} from 'lucide-react';
import { useT } from '@/lib/i18n/useT';
import { useAppStore } from '@/store/useAppStore';
import { roadmapPhases, type PhaseStatus } from '@/lib/data/roadmap';
import { homeFaqs } from '@/lib/data/home-faq';
import {
  ALL_LENSES,
  LENS_META,
  formatEventDate,
  getHomeSnapshot,
  lensOf,
  unifiedTheme,
} from '@/lib/data/trasparenza';
import { cyberEvents } from '@/lib/data/cyber-history';
import { dcEvents } from '@/lib/data/dc-history';
import { SITE_NAME, SITE_URL, paths } from '@/lib/seo';

const DONATE_URL = 'https://buymeacoffee.com/relatronica';
const RELATRONICA_URL = 'https://relatronica.com';
const LATEST_COUNT = 6;

const homeSnapshot = getHomeSnapshot();
const currentYear = new Date().getFullYear();

const latestEvents = [...unifiedTheme.events]
  .sort((a, b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id))
  .slice(0, LATEST_COUNT);

const lensIndex = ALL_LENSES.map((lens) => ({
  lens,
  meta: LENS_META[lens],
  count: unifiedTheme.events.filter((event) => lensOf(event) === lens).length,
}));

const METHOD_FAQ_IDS = ['what', 'sources', 'causation', 'sentiment'];
const methodFaqs = METHOD_FAQ_IDS.map((id) => homeFaqs.find((faq) => faq.id === id)).filter(
  (faq): faq is (typeof homeFaqs)[number] => Boolean(faq),
);

const timelineOverview = (() => {
  const domainRange = (events: typeof cyberEvents) => {
    const sorted = [...events].sort((a, b) => a.date.localeCompare(b.date));
    return {
      fromYear: Number(sorted[0]?.date.slice(0, 4) ?? currentYear),
      toYear: Number(sorted.at(-1)?.date.slice(0, 4) ?? currentYear),
    };
  };

  const cyberRange = domainRange(cyberEvents);
  const dcRange = domainRange(dcEvents);

  return [
    {
      slug: 'ai',
      titleKey: 'ecosystemAI',
      href: '/timeline',
      count: homeSnapshot.eventCount,
      fromYear: homeSnapshot.fromYear,
      toYear: homeSnapshot.toYear,
      color: '#3b6fe0',
    },
    {
      slug: 'cybersecurity',
      titleKey: 'ecosystemCyber',
      href: '/t/cybersecurity',
      count: cyberEvents.length,
      fromYear: cyberRange.fromYear,
      toYear: cyberRange.toYear,
      color: '#d97706',
    },
    {
      slug: 'datacenter',
      titleKey: 'ecosystemDatacenter',
      href: '/t/datacenter',
      count: dcEvents.length,
      fromYear: dcRange.fromYear,
      toYear: dcRange.toYear,
      color: '#0f9d8f',
    },
  ] as const;
})();

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.25, 0.4, 0.25, 1] as const },
  }),
};

const statusStyles: Record<
  PhaseStatus,
  { labelKey: 'statusDone' | 'statusActive' | 'statusNext'; icon: typeof CheckCircle2; className: string }
> = {
  done: {
    labelKey: 'statusDone',
    icon: CheckCircle2,
    className: 'text-mark bg-mark-muted',
  },
  active: {
    labelKey: 'statusActive',
    icon: CircleDashed,
    className: 'text-amber-800 bg-amber-500/10 dark:text-amber-300',
  },
  next: {
    labelKey: 'statusNext',
    icon: CircleDashed,
    className: 'text-muted-foreground bg-muted/60',
  },
};

const subscribeNoop = () => () => {};
const getNativeShareClient = () =>
  typeof navigator !== 'undefined' && typeof navigator.share === 'function';

export default function HomeContent() {
  const t = useT();
  const locale = useAppStore((s) => s.locale) as 'it' | 'en';
  const [copied, setCopied] = useState<'cite' | 'link' | null>(null);
  const canNativeShare = useSyncExternalStore(
    subscribeNoop,
    getNativeShareClient,
    () => false,
  );

  const shareUrl = SITE_URL;
  const shareText = t.home.shareText;
  const citation = `${SITE_NAME} (${currentYear}). ${t.home.citeWork}. Relatronica. ${SITE_URL}`;


  const mastodonIntent = useMemo(() => {
    return (instance: string) => {
      const host = instance.replace(/^https?:\/\//, '').replace(/\/$/, '');
      return `https://${host}/share?text=${encodeURIComponent(`${shareText}\n${shareUrl}`)}`;
    };
  }, [shareText, shareUrl]);

  const copy = async (text: string, key: 'cite' | 'link') => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      // ignore
    }
  };

  const shareNative = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Segno', text: shareText, url: shareUrl });
      } catch {
        // user cancelled
      }
    }
  };

  const shareMastodon = () => {
    const instance = window.prompt(t.home.mastodonPrompt, 'mastodon.social');
    if (!instance) return;
    window.open(mastodonIntent(instance), '_blank', 'noopener,noreferrer');
  };

  const shareBluesky = () => {
    const url = `https://bsky.app/intent/compose?text=${encodeURIComponent(`${shareText}\n${shareUrl}`)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const shareLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const quietButton =
    'inline-flex items-center gap-2 rounded-md border border-border bg-background px-3.5 py-2 text-sm font-medium transition-colors hover:bg-accent';

  return (
    <div className="relative overflow-hidden">
      {/* Masthead */}
      <section className="relative isolate">
        {/* Backdrop: warm glow, light from above */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_-10%,color-mix(in_oklch,var(--mark)_18%,transparent),transparent_60%),radial-gradient(ellipse_at_85%_12%,color-mix(in_oklch,var(--ink)_10%,transparent),transparent_50%),radial-gradient(ellipse_at_50%_125%,color-mix(in_oklch,var(--mark)_10%,transparent),transparent_55%)]"
        />

        <div className="relative mx-auto max-w-6xl px-4 pb-14 pt-[calc(var(--nav-clearance)+3.5rem)] sm:px-6 sm:pb-20 sm:pt-[calc(var(--nav-clearance)+5rem)] lg:px-8">
          <motion.div initial="hidden" animate="visible" className="max-w-3xl">
            <motion.p
              custom={0}
              variants={fadeUp}
              className="font-mono text-xs uppercase tracking-[0.22em] text-mark/80"
            >
              Segno ·{' '}
              <a
                href={RELATRONICA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="underline-offset-4 transition-colors hover:text-mark hover:underline"
              >
                {t.home.mastheadOrg}
              </a>
            </motion.p>
            <motion.h1
              custom={1}
              variants={fadeUp}
              className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl lg:leading-[1.08]"
            >
              {t.hero.title}
            </motion.h1>
            <motion.p
              custom={2}
              variants={fadeUp}
              className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
            >
              {t.hero.subtitle}
            </motion.p>
            <motion.div custom={3} variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-5">
              <Link
                href="/lab"
                className="inline-flex items-center gap-2 rounded-md bg-foreground px-6 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90"
              >
                <History className="h-4 w-4" />
                {t.hero.cta}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
            <motion.p
              custom={4}
              variants={fadeUp}
              className="mt-8 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground"
            >
              {t.home.updatedLabel} {formatEventDate(latestEvents[0].date, locale)} ·{' '}
              {homeSnapshot.eventCount} {t.hero.statsEvents} · {homeSnapshot.fromYear}–
              {homeSnapshot.toYear} · {homeSnapshot.sourceCount} {t.hero.statsSources}
            </motion.p>
          </motion.div>

          <motion.figure custom={5} variants={fadeUp} className="mt-14 sm:mt-20">
            <figcaption className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              {t.hero.systemCaption}
            </figcaption>

            <div className="mt-5 overflow-hidden rounded-xl border border-border/60 bg-card/30">
              <div className="divide-y divide-border/50">
                {timelineOverview.map((timeline) => {
                  const globalFrom = 2013;
                  const globalTo = currentYear;
                  const left = ((timeline.fromYear - globalFrom) / (globalTo - globalFrom)) * 100;
                  const width = ((timeline.toYear - timeline.fromYear) / (globalTo - globalFrom)) * 100;
                  const title = t.home[timeline.titleKey];
                  const range = t.hero.systemRange
                    .replace('{count}', String(timeline.count))
                    .replace('{from}', String(timeline.fromYear))
                    .replace('{to}', String(timeline.toYear));

                  return (
                    <Link
                      key={timeline.slug}
                      href={timeline.href}
                      className="group grid gap-3 px-4 py-4 transition-colors hover:bg-accent/40 sm:grid-cols-[160px_1fr] sm:items-center sm:px-5"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-semibold tracking-tight">{title}</p>
                        <p className="mt-1 font-mono text-[10px] tabular-nums text-muted-foreground">{range}</p>
                      </div>
                      <div className="relative h-8" aria-label={`${title}: ${range}`}>
                        <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-border" />
                        {[2016, 2019, 2022, 2025].map((year) => (
                          <span
                            key={year}
                            aria-hidden
                            className="absolute top-1/2 h-2 w-px -translate-y-1/2 bg-border"
                            style={{ left: `${((year - globalFrom) / (globalTo - globalFrom)) * 100}%` }}
                          />
                        ))}
                        <span
                          aria-hidden
                          className="absolute top-1/2 h-2 -translate-y-1/2 rounded-full ring-4 ring-background/70"
                          style={{
                            left: `${Math.max(0, left)}%`,
                            width: `${Math.max(3, width)}%`,
                            backgroundColor: timeline.color,
                          }}
                        />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </motion.figure>
        </div>
      </section>

      {/* Active timelines */}
      <section className="relative border-t border-border/50 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t.home.ecosystemsTitle}</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">{t.home.ecosystemsSubtitle}</p>
            </div>
            <Link
              href="/lab"
              className="inline-flex items-center gap-1.5 text-sm font-semibold underline-offset-4 hover:underline"
            >
              Lab
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { href: '/timeline', title: t.home.ecosystemAI },
              { href: '/t/cybersecurity', title: t.home.ecosystemCyber },
              { href: '/t/datacenter', title: t.home.ecosystemDatacenter },
            ].map((timeline) => (
              <li key={timeline.href}>
                <Link
                  href={timeline.href}
                  className="group flex h-full items-center justify-between rounded-xl border border-border/60 bg-card/30 p-5 transition-colors hover:border-mark/40 hover:bg-muted/30"
                >
                  <span className="font-serif text-lg font-semibold">{timeline.title}</span>
                  <ArrowRight className="h-4 w-4 text-mark transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Latest entries */}
      <section id="ultimi" className="relative scroll-mt-20 border-t border-border/50 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t.home.latestTitle}</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">{t.home.latestSubtitle}</p>
            </div>
            <Link
              href="/timeline"
              className="inline-flex items-center gap-1.5 text-sm font-semibold underline-offset-4 hover:underline"
            >
              {t.home.latestAll}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <ul className="mt-10 border-y border-border/50">
            {latestEvents.map((event) => {
              const meta = LENS_META[lensOf(event)];
              return (
                <li key={event.id} className="border-b border-border/50 last:border-b-0">
                  <Link
                    href={paths.timelineEvento(event.id)}
                    className="group flex flex-wrap items-baseline gap-x-4 gap-y-1 py-4"
                  >
                    <time className="w-24 shrink-0 font-mono text-xs tabular-nums text-muted-foreground">
                      {formatEventDate(event.date, locale)}
                    </time>
                    <span
                      className="inline-flex shrink-0 items-center gap-1.5 text-xs font-medium"
                      style={{ color: meta.color }}
                    >
                      <span
                        aria-hidden
                        className="block h-1.5 w-1.5 rounded-full"
                        style={{ backgroundColor: meta.color }}
                      />
                      {meta.label[locale]}
                    </span>
                    <span className="min-w-0 flex-1 text-sm font-medium leading-snug group-hover:underline">
                      {event.title[locale]}
                    </span>
                    <span className="shrink-0 text-xs text-muted-foreground">
                      {event.sourceLabel[locale]}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Method */}
      <section
        id="metodo"
        className="relative scroll-mt-20 border-t border-border/50 bg-muted/15 py-16 sm:py-20"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t.home.methodTitle}</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">{t.home.methodSubtitle}</p>
          </div>

          <dl className="mt-10 grid gap-x-12 gap-y-8 sm:grid-cols-2">
            {methodFaqs.map((faq) => (
              <div key={faq.id}>
                <dt className="text-sm font-semibold tracking-tight">{faq.question[locale]}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-pretty text-muted-foreground">
                  {faq.answer[locale]}
                </dd>
              </div>
            ))}
          </dl>

          <Link
            href="/chi-siamo"
            className="mt-10 inline-flex items-center gap-1.5 text-sm font-semibold underline-offset-4 hover:underline"
          >
            {t.home.aboutLink}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Data index */}
      <section id="indice" className="relative scroll-mt-20 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t.home.indexTitle}</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">{t.home.indexSubtitle}</p>
          </div>

          <ol className="mt-10 grid gap-px overflow-hidden rounded-xl border border-border/60 bg-border/50 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {lensIndex.map(({ lens, meta, count }) => (
              <li key={lens} className="bg-background">
                <Link
                  href={`/timeline?lente=${lens}`}
                  className="group flex h-full flex-col p-4 transition-colors hover:bg-accent/40"
                >
                  <span
                    aria-hidden
                    className="block h-1 w-8 rounded-full"
                    style={{ backgroundColor: meta.color }}
                  />
                  <span className="mt-4 text-base font-semibold tracking-tight">{meta.label[locale]}</span>
                  <p className="mt-1.5 flex-1 text-xs leading-relaxed text-pretty text-muted-foreground">
                    {meta.blurb[locale]}
                  </p>
                  <span className="mt-4 font-mono text-xs tabular-nums text-muted-foreground">
                    {t.home.indexEntries.replace('{count}', String(count))}
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Roadmap */}
      <section
        id="avanzamento"
        className="relative scroll-mt-20 border-t border-border/50 bg-muted/15 py-16 sm:py-20"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t.home.roadmapTitle}</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">{t.home.roadmapSubtitle}</p>
          </div>

          <ol className="mt-12 space-y-0">
            {roadmapPhases.map((phase, index) => {
              const meta = statusStyles[phase.status];
              const Icon = meta.icon;
              return (
                <motion.li
                  key={phase.id}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                  className="relative flex gap-4 border-l border-border/60 pb-10 pl-6 last:pb-0 sm:gap-6 sm:pl-8"
                >
                  <span
                    className={`absolute -left-3 top-0 flex h-6 w-6 items-center justify-center rounded-full ${meta.className}`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-semibold tracking-tight">{phase.title[locale]}</h3>
                      <span className={`rounded-md px-2 py-0.5 text-xs font-medium ${meta.className}`}>
                        {t.home[meta.labelKey]}
                      </span>
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {phase.description[locale]}
                    </p>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Cite & contact */}
      <section id="citare" className="relative scroll-mt-20 border-t border-border/50 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t.home.citeTitle}</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">{t.home.citeSubtitle}</p>
              <div className="mt-6 flex items-start gap-3 rounded-lg border border-border/60 bg-muted/20 p-4">
                <code className="min-w-0 flex-1 break-words font-mono text-xs leading-relaxed">
                  {citation}
                </code>
                <button
                  type="button"
                  onClick={() => copy(citation, 'cite')}
                  aria-label={t.home.copyLink}
                  className="shrink-0 rounded-md border border-border bg-background p-2 transition-colors hover:bg-accent"
                >
                  {copied === 'cite' ? (
                    <Check className="h-4 w-4 text-mark" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t.home.contactTitle}</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">{t.home.contactText}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/segnala"
                  className="inline-flex items-center gap-2 rounded-md bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-opacity hover:opacity-90"
                >
                  {t.nav.segnala}
                </Link>
                <a
                  href={DONATE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={quietButton}
                >
                  {t.nav.donate}
                </a>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-2">
                <span className="mr-1 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                  {t.home.shareLabel}
                </span>
                <button type="button" onClick={() => copy(shareUrl, 'link')} className={quietButton}>
                  {copied === 'link' ? (
                    <Check className="h-4 w-4 text-mark" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                  {copied === 'link' ? t.home.copied : t.home.copyLink}
                </button>
                <button type="button" onClick={shareMastodon} className={quietButton}>
                  <Link2 className="h-4 w-4" />
                  Mastodon
                </button>
                <button type="button" onClick={shareBluesky} className={quietButton}>
                  Bluesky
                </button>
                <button type="button" onClick={shareLinkedIn} className={quietButton}>
                  LinkedIn
                </button>
                {canNativeShare && (
                  <button
                    type="button"
                    onClick={shareNative}
                    className="inline-flex items-center gap-2 rounded-md bg-foreground px-3.5 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90"
                  >
                    <Share2 className="h-4 w-4" />
                    {t.home.shareNative}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
