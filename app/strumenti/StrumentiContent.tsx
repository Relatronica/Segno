'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BookOpen,
  Blocks,
  Fingerprint,
  Workflow,
  Library,
  FileText,
  Calendar,
} from 'lucide-react';
import { useT } from '@/lib/i18n/useT';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.4, ease: [0.25, 0.4, 0.25, 1] as const },
  }),
};

const tools = [
  {
    href: '/percorsi',
    key: 'percorsi' as const,
    icon: BookOpen,
    getSubtitle: (t: ReturnType<typeof useT>) => t.sections.percorsi.subtitle,
  },
  {
    href: '/mappa-digitale',
    key: 'mappaDigitale' as const,
    icon: Fingerprint,
    getSubtitle: (t: ReturnType<typeof useT>) => t.sections.mappaDigitale.subtitle,
  },
  {
    href: '/stack-etico',
    key: 'stackEtico' as const,
    icon: Blocks,
    getSubtitle: (t: ReturnType<typeof useT>) => t.stackEtico.heroSubtitle,
  },
  {
    href: '/process-designer',
    key: 'processDesigner' as const,
    icon: Workflow,
    getSubtitle: (t: ReturnType<typeof useT>) => t.processDesigner.heroSubtitle,
  },
  {
    href: '/risorse',
    key: 'risorse' as const,
    icon: FileText,
    getSubtitle: (t: ReturnType<typeof useT>) => t.sections.risorse.subtitle,
  },
  {
    href: '/glossario',
    key: 'glossario' as const,
    icon: Library,
    getSubtitle: (t: ReturnType<typeof useT>) => t.sections.glossario.subtitle,
  },
];

export default function StrumentiContent() {
  const t = useT();

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <motion.div initial="hidden" animate="visible" className="max-w-2xl">
        <motion.p
          custom={0}
          variants={fadeUp}
          className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground"
        >
          Segno
        </motion.p>
        <motion.h1 custom={1} variants={fadeUp} className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          {t.strumenti.title}
        </motion.h1>
        <motion.p custom={2} variants={fadeUp} className="mt-4 text-muted-foreground leading-relaxed">
          {t.strumenti.subtitle}
        </motion.p>
        <motion.div custom={3} variants={fadeUp} className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/trasparenza"
            className="inline-flex items-center gap-2 rounded-xl bg-foreground px-4 py-2.5 text-sm font-semibold text-background transition-opacity hover:opacity-90"
          >
            <Calendar className="h-4 w-4" />
            {t.strumenti.openTimeline}
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-medium transition-colors hover:bg-accent"
          >
            {t.strumenti.backHome}
          </Link>
        </motion.div>
      </motion.div>

      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool, i) => {
          const Icon = tool.icon;
          const title = t.nav[tool.key];
          const subtitle = tool.getSubtitle(t);

          return (
            <motion.div
              key={tool.href}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              custom={i}
              variants={fadeUp}
            >
              <Link
                href={tool.href}
                className="group flex h-full flex-col rounded-2xl border border-border/50 bg-card/50 p-6 transition-colors hover:border-border hover:bg-card"
              >
                <div className="inline-flex w-fit rounded-xl bg-muted p-2.5 text-foreground/80">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="mt-4 text-lg font-semibold tracking-tight group-hover:underline group-hover:underline-offset-4">
                  {title}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                  {subtitle}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-foreground/80">
                  {t.common.seeAll}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
