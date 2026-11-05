'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useT } from '@/lib/i18n/useT';
import { useAppStore } from '@/store/useAppStore';
import type { LocalizedText } from '@/lib/trasparenza/spec';
import { cn } from '@/lib/utils';

/** One registry row, already resolved server-side to something renderable. */
export type LabEntry = {
  slug: string;
  name: LocalizedText;
  intro?: LocalizedText;
  href: string;
  flagship: boolean;
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.25, 0.4, 0.25, 1] as const },
  }),
};

export default function LabContent({
  entries,
  registryReadable,
}: {
  entries: LabEntry[];
  /** False when the registry could not be read — the flagship still shows. */
  registryReadable: boolean;
}) {
  const t = useT();
  const locale = useAppStore((s) => s.locale) as 'it' | 'en';
  const l = t.lab;

  return (
    <div className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[45vh] bg-[radial-gradient(ellipse_at_18%_-10%,color-mix(in_oklch,var(--mark)_12%,transparent),transparent_55%),radial-gradient(ellipse_at_92%_8%,color-mix(in_oklch,var(--ink)_8%,transparent),transparent_45%)]"
      />

      <section className="relative mx-auto max-w-6xl px-4 pb-12 pt-[calc(var(--nav-clearance)+3rem)] sm:px-6 sm:pt-[calc(var(--nav-clearance)+4rem)] lg:px-8">
        <motion.div initial="hidden" animate="visible" className="max-w-3xl">
          <motion.p
            custom={0}
            variants={fadeUp}
            className="font-mono text-xs uppercase tracking-[0.22em] text-mark/80"
          >
            {l.eyebrow}
          </motion.p>
          <motion.h1
            custom={1}
            variants={fadeUp}
            className="mt-4 text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-5xl lg:leading-[1.1]"
          >
            {l.title}
          </motion.h1>
          <motion.p
            custom={2}
            variants={fadeUp}
            className="mt-6 text-lg leading-relaxed text-pretty text-muted-foreground"
          >
            {l.subtitle}
          </motion.p>
        </motion.div>
      </section>

      <section className="relative border-t border-border/50">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {entries.map((entry) => (
              <li key={entry.slug} className="flex">
                <Link
                  href={entry.href}
                  className="group flex w-full flex-col rounded-xl border border-border/60 bg-card p-5 transition-colors hover:border-mark/40 hover:bg-muted/30"
                >
                  <span
                    className={cn(
                      'self-start rounded px-1.5 py-px font-mono text-[10px] font-medium uppercase tracking-wide',
                      entry.flagship ? 'bg-mark-muted text-mark' : 'bg-muted text-muted-foreground',
                    )}
                  >
                    {entry.flagship ? l.flagshipBadge : l.experimentalBadge}
                  </span>

                  <h2 className="mt-3 text-lg font-semibold tracking-tight text-foreground">
                    {entry.name[locale]}
                  </h2>

                  {entry.intro && (
                    <p className="mt-2 line-clamp-3 text-[13px] leading-relaxed text-muted-foreground">
                      {entry.intro[locale]}
                    </p>
                  )}

                  <span className="mt-4 inline-flex items-center gap-1.5 text-[12px] font-medium text-mark">
                    {l.open}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          {!registryReadable && <p className="mt-6 text-sm text-muted-foreground">{l.empty}</p>}
        </div>
      </section>
    </div>
  );
}
