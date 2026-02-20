'use client';

import { useT } from '@/lib/i18n/useT';
import { Heart, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export function SupportBanner() {
  const t = useT();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] as const }}
      className="mt-10 rounded-2xl border border-rose-500/15 bg-rose-500/5 p-6 sm:p-8"
    >
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-rose-500/10">
          <Heart className="h-5 w-5 text-rose-500" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold">{t.support.lessonBannerTitle}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{t.support.lessonBannerText}</p>
        </div>
        <a
          href="https://buymeacoffee.com/relatronica"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-rose-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-rose-700"
        >
          {t.support.lessonBannerCta}
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </motion.div>
  );
}
