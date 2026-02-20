'use client';

import { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { useT } from '@/lib/i18n/useT';
import { motion } from 'framer-motion';
import { Blocks, ArrowRight, ShieldCheck, Lightbulb, BarChart3 } from 'lucide-react';
import { StackBuilder } from '@/components/stack/StackBuilder';
import { StackResults } from '@/components/stack/StackResults';
import type { ToolCategory } from '@/lib/data/stack-tools';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.25, 0.4, 0.25, 1] as const },
  }),
};

const features = [
  {
    icon: Blocks,
    colorClass: 'bg-emerald-500/10 text-emerald-600',
    title: { it: 'Scegli i tuoi strumenti', en: 'Choose your tools' },
    desc: {
      it: 'Per ogni categoria, seleziona lo strumento che usi o che vorresti usare.',
      en: 'For each category, select the tool you use or would like to use.',
    },
  },
  {
    icon: BarChart3,
    colorClass: 'bg-blue-500/10 text-blue-600',
    title: { it: 'Scopri il tuo punteggio', en: 'Discover your score' },
    desc: {
      it: 'Un punteggio di sovranità digitale calcolato in tempo reale sul tuo stack.',
      en: 'A digital sovereignty score calculated in real-time on your stack.',
    },
  },
  {
    icon: Lightbulb,
    colorClass: 'bg-amber-500/10 text-amber-600',
    title: { it: 'Ricevi suggerimenti', en: 'Get suggestions' },
    desc: {
      it: 'Scopri alternative etiche e open source per migliorare la tua privacy.',
      en: 'Discover ethical and open source alternatives to improve your privacy.',
    },
  },
];

type Phase = 'landing' | 'builder' | 'results';

export default function StackEticoContent() {
  const locale = useAppStore((s) => s.locale);
  const t = useT();

  const [phase, setPhase] = useState<Phase>('landing');
  const [selections, setSelections] = useState<Record<ToolCategory, string | null> | null>(null);

  const st = t.stackEtico;

  if (phase === 'results' && selections) {
    return (
      <StackResults
        t={{
          resultTitle: st.resultTitle,
          excellent: st.excellent,
          good: st.good,
          fair: st.fair,
          poor: st.poor,
          excellentDesc: st.excellentDesc,
          goodDesc: st.goodDesc,
          fairDesc: st.fairDesc,
          poorDesc: st.poorDesc,
          categoryBreakdown: st.categoryBreakdown,
          improvements: st.improvements,
          replaceWith: st.replaceWith,
          instead: st.instead,
          restart: st.restart,
          exploreResources: st.exploreResources,
          privacyScore: st.privacyScore,
          ethical: st.ethical,
          openSource: st.openSource,
          yourScore: st.yourScore,
        }}
        selectedTools={selections}
        onRestart={() => {
          setPhase('landing');
          setSelections(null);
        }}
      />
    );
  }

  if (phase === 'builder') {
    return (
      <StackBuilder
        t={{
          builderTitle: st.builderTitle,
          toolsTitle: st.toolsTitle,
          emptySlot: st.emptySlot,
          dragHint: st.dragHint,
          company: st.company,
          openSource: st.openSource,
          privacyScore: st.privacyScore,
          ethical: st.ethical,
          sovereigntyScore: st.sovereigntyScore,
          seeResults: st.seeResults,
          fillMore: st.fillMore,
          excellent: st.excellent,
          good: st.good,
          fair: st.fair,
          poor: st.poor,
        }}
        onComplete={(sel) => {
          setSelections(sel);
          setPhase('results');
        }}
      />
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-emerald-500/10 to-background" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(16,185,129,0.12),transparent)]" />
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
          <motion.div
            initial="hidden"
            animate="visible"
            className="mx-auto max-w-3xl text-center"
          >
            <motion.div
              custom={0}
              variants={fadeUp}
              className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10"
            >
              <ShieldCheck className="h-8 w-8 text-emerald-600" />
            </motion.div>
            <motion.h1
              custom={1}
              variants={fadeUp}
              className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
            >
              {st.heroTitle}
            </motion.h1>
            <motion.p
              custom={2}
              variants={fadeUp}
              className="mt-6 text-lg text-muted-foreground sm:text-xl"
            >
              {st.heroSubtitle}
            </motion.p>
            <motion.div custom={3} variants={fadeUp} className="mt-10">
              <button
                onClick={() => setPhase('builder')}
                className="inline-flex items-center gap-2 rounded-xl bg-foreground px-8 py-4 text-base font-semibold text-background transition-opacity hover:opacity-90"
              >
                {st.heroCta}
                <ArrowRight className="h-5 w-5" />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-3">
            {features.map((feat, i) => {
              const Icon = feat.icon;
              return (
                <motion.div
                  key={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-80px' }}
                  custom={i}
                  variants={fadeUp}
                  className="rounded-2xl border border-border/50 bg-card p-8 transition-shadow hover:shadow-lg"
                >
                  <div className={`inline-flex rounded-xl p-3 ${feat.colorClass}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{feat.title[locale]}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{feat.desc[locale]}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
