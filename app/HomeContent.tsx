'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle2,
  CircleDashed,
  Copy,
  Check,
  Link2,
  Share2,
  ChevronDown,
  Eye,
  Scale,
  Megaphone,
  Calendar,
  Quote,
  Waypoints,
} from 'lucide-react';
import { useT } from '@/lib/i18n/useT';
import { useAppStore } from '@/store/useAppStore';
import { roadmapPhases, type PhaseStatus } from '@/lib/data/roadmap';
import { homeFaqs } from '@/lib/data/home-faq';
import { getHomeSnapshot } from '@/lib/data/trasparenza';
import { cn } from '@/lib/utils';
import { SITE_URL } from '@/lib/seo';

const homeSnapshot = getHomeSnapshot();
const heroYears = Array.from(
  { length: homeSnapshot.toYear - homeSnapshot.fromYear + 1 },
  (_, i) => String(homeSnapshot.fromYear + i),
);

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

export default function HomeContent() {
  const t = useT();
  const locale = useAppStore((s) => s.locale) as 'it' | 'en';
  const [openFaq, setOpenFaq] = useState<string | null>(homeFaqs[0]?.id ?? null);
  const [copied, setCopied] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);

  useEffect(() => {
    setCanNativeShare(typeof navigator !== 'undefined' && typeof navigator.share === 'function');
  }, []);

  const shareUrl = SITE_URL;
  const shareText = t.home.shareText;

  const mastodonIntent = useMemo(() => {
    return (instance: string) => {
      const host = instance.replace(/^https?:\/\//, '').replace(/\/$/, '');
      return `https://${host}/share?text=${encodeURIComponent(`${shareText}\n${shareUrl}`)}`;
    };
  }, [shareText, shareUrl]);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
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

  const stats = [
    { value: String(homeSnapshot.eventCount), label: t.hero.statsEvents },
    { value: String(homeSnapshot.actorCount), label: t.hero.statsActors },
    {
      value: `${homeSnapshot.fromYear}–${homeSnapshot.toYear}`,
      label: t.hero.statsSpan,
    },
    { value: String(homeSnapshot.sourceCount), label: t.hero.statsSources },
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Hero */}
      <section className="relative isolate">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_-8%,color-mix(in_oklch,var(--mark)_16%,transparent),transparent_58%),radial-gradient(ellipse_at_100%_20%,color-mix(in_oklch,var(--ink)_10%,transparent),transparent_42%),radial-gradient(ellipse_at_0%_80%,color-mix(in_oklch,var(--ink)_8%,transparent),transparent_40%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.45] dark:opacity-[0.22] [background-image:linear-gradient(to_right,color-mix(in_oklch,var(--ink)_11%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_oklch,var(--ink)_9%,transparent)_1px,transparent_1px)] [background-size:4.5rem_4.5rem] [mask-image:radial-gradient(ellipse_at_50%_28%,black,transparent_78%)]"
        />

        <div className="relative mx-auto max-w-6xl px-4 pb-0 pt-20 sm:px-6 sm:pt-28 lg:px-8">
          <motion.div initial="hidden" animate="visible" className="mx-auto max-w-3xl text-center">
            <motion.p
              custom={0}
              variants={fadeUp}
              className="font-mono text-xs uppercase tracking-[0.22em] text-mark/80"
            >
              Segno
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
              className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
            >
              {t.hero.subtitle}
            </motion.p>
            <motion.div
              custom={3}
              variants={fadeUp}
              className="mt-10 flex flex-wrap items-center justify-center gap-3"
            >
              <Link
                href="/trasparenza"
                className="inline-flex items-center gap-2 rounded-md bg-foreground px-6 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90"
              >
                <Calendar className="h-4 w-4" />
                {t.hero.cta}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#problema"
                className="inline-flex items-center gap-2 rounded-md border border-border px-6 py-3 text-sm font-semibold transition-colors hover:bg-accent"
              >
                {t.hero.ctaSecondary}
              </a>
            </motion.div>
          </motion.div>

          <div aria-hidden className="relative mx-auto mt-16 hidden max-w-4xl sm:block">
            <div className="absolute inset-x-0 top-1 h-px bg-gradient-to-r from-transparent via-ink/35 to-transparent dark:via-mark/35" />
            <div className="relative flex items-start justify-between">
              {heroYears.map((year) => {
                const current = year === String(homeSnapshot.toYear);
                return (
                  <div key={year} className="flex flex-col items-center gap-2">
                    <span
                      className={cn(
                        'block h-2 w-2 rounded-full',
                        current
                          ? 'bg-mark shadow-[0_0_0_4px] shadow-mark/15'
                          : 'bg-ink/40 dark:bg-foreground/35',
                      )}
                    />
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                      {year}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="relative mt-14 border-t border-border/50 bg-background/55 sm:mt-16">
          <dl className="mx-auto grid max-w-6xl grid-cols-2 sm:grid-cols-4">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={cn(
                  'px-4 py-8 text-center sm:px-6',
                  i % 2 === 1 && 'border-l border-border/50',
                  i >= 2 && 'border-t border-border/50 sm:border-t-0',
                  i > 0 && 'sm:border-l sm:border-border/50',
                )}
              >
                <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                  {stat.label}
                </dt>
                <dd className="mt-2 font-serif text-3xl font-bold tracking-tight sm:text-4xl">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Problem */}
      <section id="problema" className="relative scroll-mt-20 border-y border-border/40 bg-background/70 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="max-w-2xl"
          >
            <motion.h2 custom={0} variants={fadeUp} className="text-3xl font-bold tracking-tight sm:text-4xl">
              {t.home.problemTitle}
            </motion.h2>
            <motion.p custom={1} variants={fadeUp} className="mt-4 text-muted-foreground leading-relaxed">
              {t.home.problemSubtitle}
            </motion.p>
          </motion.div>

          <div className="mt-12 grid gap-10 sm:grid-cols-3">
            {[
              { icon: Eye, title: t.home.problem1Title, text: t.home.problem1Text },
              { icon: Scale, title: t.home.problem2Title, text: t.home.problem2Text },
              { icon: Megaphone, title: t.home.problem3Title, text: t.home.problem3Text },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-60px' }}
                  custom={i}
                  variants={fadeUp}
                >
                  <div className="mb-4 inline-flex text-mark">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* What we do */}
      <section className="relative py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t.home.solutionTitle}</h2>
              <p className="mt-4 max-w-xl text-muted-foreground leading-relaxed">
                {t.home.solutionText}
              </p>
              <Link
                href="/trasparenza"
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold underline-offset-4 hover:underline"
              >
                {t.home.solutionCta}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <blockquote className="border-l-2 border-mark/40 pl-6 sm:pl-8">
              <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                {t.home.solutionAsideLabel}
              </p>
              <p className="mt-3 text-lg leading-relaxed text-foreground/90">{t.home.solutionAside}</p>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Themes */}
      <section className="relative border-y border-border/40 bg-muted/15 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t.home.themesTitle}</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">{t.home.themesSubtitle}</p>
          </div>

          <div className="mt-12 grid gap-10 sm:grid-cols-2">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              custom={0}
              variants={fadeUp}
            >
              <div className="mb-3 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-mark/85">
                <Waypoints className="h-3.5 w-3.5" />
                {t.home.themeAiTitle}
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">{t.home.themeAiText}</p>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              custom={1}
              variants={fadeUp}
            >
              <div className="mb-3 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-mark/85">
                <Quote className="h-3.5 w-3.5" />
                {t.home.themeSentimentTitle}
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">{t.home.themeSentimentText}</p>
            </motion.div>
          </div>

          <Link
            href="/trasparenza"
            className="mt-10 inline-flex items-center gap-2 rounded-md bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-opacity hover:opacity-90"
          >
            {t.home.themesCta}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Roadmap */}
      <section id="avanzamento" className="relative scroll-mt-20 py-16 sm:py-24">
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

      {/* Share */}
      <section id="diffondi" className="relative scroll-mt-20 border-y border-border/40 bg-muted/20 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t.home.shareTitle}</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">{t.home.shareSubtitle}</p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={copyLink}
              className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-4 py-2.5 text-sm font-medium transition-colors hover:bg-accent"
            >
              {copied ? <Check className="h-4 w-4 text-mark" /> : <Copy className="h-4 w-4" />}
              {copied ? t.home.copied : t.home.copyLink}
            </button>
            <button
              type="button"
              onClick={shareMastodon}
              className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-4 py-2.5 text-sm font-medium transition-colors hover:bg-accent"
            >
              <Link2 className="h-4 w-4" />
              Mastodon
            </button>
            <button
              type="button"
              onClick={shareBluesky}
              className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-4 py-2.5 text-sm font-medium transition-colors hover:bg-accent"
            >
              Bluesky
            </button>
            <button
              type="button"
              onClick={shareLinkedIn}
              className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-4 py-2.5 text-sm font-medium transition-colors hover:bg-accent"
            >
              LinkedIn
            </button>
            {canNativeShare && (
              <button
                type="button"
                onClick={shareNative}
                className="inline-flex items-center gap-2 rounded-md bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
              >
                <Share2 className="h-4 w-4" />
                {t.home.shareNative}
              </button>
            )}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="relative scroll-mt-20 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t.home.faqTitle}</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">{t.home.faqSubtitle}</p>

          <div className="mt-10 max-w-3xl divide-y divide-border/60">
            {homeFaqs.map((faq) => {
              const open = openFaq === faq.id;
              return (
                <div key={faq.id} className="py-1">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(open ? null : faq.id)}
                    className="flex w-full items-center justify-between gap-4 py-4 text-left"
                    aria-expanded={open}
                  >
                    <span className="text-base font-semibold tracking-tight">{faq.question[locale]}</span>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${
                        open ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <p className="pb-5 text-sm leading-relaxed text-muted-foreground">
                          {faq.answer[locale]}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="relative border-t border-border/40 bg-[radial-gradient(ellipse_at_50%_0%,oklch(0.48_0.17_25/_0.07),transparent_55%)] py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{t.home.ctaTitle}</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">{t.home.ctaSubtitle}</p>
          <Link
            href="/trasparenza"
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-foreground px-6 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90"
          >
            {t.home.ctaButton}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
