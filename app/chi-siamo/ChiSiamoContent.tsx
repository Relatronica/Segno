'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useT } from '@/lib/i18n/useT';

const RELATRONICA_URL = 'https://relatronica.com';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.25, 0.4, 0.25, 1] as const },
  }),
};

const inView = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.25, 0.4, 0.25, 1] as const },
  },
};

export default function ChiSiamoContent() {
  const t = useT();
  const a = t.chiSiamo;
  const points = Object.values(a.independencePoints);

  return (
    <div className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[55vh] bg-[radial-gradient(ellipse_at_18%_-10%,color-mix(in_oklch,var(--mark)_12%,transparent),transparent_55%),radial-gradient(ellipse_at_92%_8%,color-mix(in_oklch,var(--ink)_8%,transparent),transparent_45%)]"
      />

      {/* Hero */}
      <section className="relative mx-auto max-w-6xl px-4 pb-14 pt-[calc(var(--nav-clearance)+3rem)] sm:px-6 sm:pt-[calc(var(--nav-clearance)+4rem)] lg:px-8">
        <motion.div initial="hidden" animate="visible" className="max-w-3xl">
          <motion.p
            custom={0}
            variants={fadeUp}
            className="font-mono text-xs uppercase tracking-[0.22em] text-mark/80"
          >
            {a.eyebrow}
          </motion.p>
          <motion.h1
            custom={1}
            variants={fadeUp}
            className="mt-4 text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-5xl lg:leading-[1.1]"
          >
            {a.title}
          </motion.h1>
          <motion.p
            custom={2}
            variants={fadeUp}
            className="mt-6 text-lg leading-relaxed text-pretty text-muted-foreground"
          >
            {a.intro}
          </motion.p>
        </motion.div>
      </section>

      {/* Why */}
      <section className="relative border-t border-border/50 bg-muted/15">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={inView}
            className="max-w-3xl"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{a.whyTitle}</h2>
            <p className="mt-5 leading-relaxed text-pretty text-muted-foreground">{a.whyText1}</p>
            <p className="mt-4 leading-relaxed text-pretty text-muted-foreground">{a.whyText2}</p>
          </motion.div>
        </div>
      </section>

      {/* Identity */}
      <section className="relative border-t border-border/50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={inView}
            className="max-w-3xl"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{a.identityTitle}</h2>
            <p className="mt-5 leading-relaxed text-pretty text-muted-foreground">{a.identityText1}</p>
            <p className="mt-4 leading-relaxed text-pretty text-muted-foreground">{a.identityText2}</p>
            <a
              href={RELATRONICA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold underline-offset-4 hover:underline"
            >
              {a.identityCta}
              <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Independence */}
      <section className="relative border-t border-border/50 bg-muted/15">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={inView}
            className="max-w-3xl"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{a.independenceTitle}</h2>
            <p className="mt-5 leading-relaxed text-pretty text-muted-foreground">
              {a.independenceText}
            </p>
          </motion.div>
          <ul className="mt-10 grid gap-6 sm:grid-cols-3">
            {points.map((point) => (
              <li key={point} className="border-t border-mark/50 pt-4">
                <p className="text-sm leading-relaxed text-pretty text-muted-foreground">{point}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Method */}
      <section className="relative border-t border-border/50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={inView}
            className="max-w-3xl"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{a.methodTitle}</h2>
            <p className="mt-5 leading-relaxed text-pretty text-muted-foreground">{a.methodText1}</p>
            <p className="mt-4 leading-relaxed text-pretty text-muted-foreground">{a.methodText2}</p>
            <Link
              href="/#metodo"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold underline-offset-4 hover:underline"
            >
              {a.methodCta}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Closing */}
      <section className="relative border-t border-border/50 bg-muted/15">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <p className="max-w-2xl text-lg leading-relaxed text-pretty text-muted-foreground">
              {a.closingText}
            </p>
            <Link
              href="/segnala"
              className="inline-flex items-center gap-2 rounded-md bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-opacity hover:opacity-90"
            >
              {a.closingCta}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
