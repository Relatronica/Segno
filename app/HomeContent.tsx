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
import { SITE_URL } from '@/lib/seo';

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

  return (
    <div className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[75vh] bg-[radial-gradient(ellipse_at_12%_0%,oklch(0.48_0.17_25/_0.08),transparent_50%),radial-gradient(ellipse_at_90%_10%,oklch(0.32_0.04_255/_0.06),transparent_45%),linear-gradient(to_bottom,oklch(0.972_0.006_250),transparent)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-24 h-px bg-gradient-to-r from-transparent via-mark/30 to-transparent"
      />

      {/* Hero */}
      <section className="relative">
        <div className="mx-auto max-w-6xl px-4 pb-16 pt-20 sm:px-6 sm:pb-24 sm:pt-28 lg:px-8">
          <motion.div initial="hidden" animate="visible" className="max-w-3xl">
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
              className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
            >
              {t.hero.subtitle}
            </motion.p>
            <motion.div custom={3} variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-3">
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
