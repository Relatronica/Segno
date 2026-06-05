'use client';

import { useT } from '@/lib/i18n/useT';
import { motion } from 'framer-motion';
import { Shield, Target, Fingerprint, Calculator } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.25, 0.4, 0.25, 1] as const },
  }),
};

export default function MetodologiaContent() {
  const t = useT();

  const sections = [
    {
      title: t.metodologia.mappaDigitaleTitle,
      text: t.metodologia.mappaDigitaleText,
      icon: Fingerprint,
      color: 'text-violet-500',
      bg: 'bg-violet-500/10',
    },
    {
      title: t.metodologia.stackEticoTitle,
      text: t.metodologia.stackEticoText,
      icon: Shield,
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10',
    },
    {
      title: t.metodologia.processDesignerTitle,
      text: t.metodologia.processDesignerText,
      icon: Target,
      color: 'text-cyan-500',
      bg: 'bg-cyan-500/10',
    },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      {/* Header */}
      <motion.div
        initial="hidden"
        animate="visible"
        className="text-center"
      >
        <motion.h1 custom={0} variants={fadeUp} className="text-4xl font-bold tracking-tight sm:text-5xl">
          {t.metodologia.title}
        </motion.h1>
        <motion.p custom={1} variants={fadeUp} className="mt-6 text-lg text-muted-foreground">
          {t.metodologia.subtitle}
        </motion.p>
      </motion.div>

      {/* Intro */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="mt-20"
      >
        <motion.div custom={0} variants={fadeUp} className="flex items-center gap-4 border-b border-border/50 pb-6">
          <div className="rounded-xl bg-accent p-3">
            <Calculator className="h-6 w-6 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-bold">{t.metodologia.introTitle}</h2>
        </motion.div>
        <motion.p custom={1} variants={fadeUp} className="mt-6 text-muted-foreground leading-relaxed">
          {t.metodologia.introText}
        </motion.p>
      </motion.div>

      {/* Sections */}
      <div className="mt-16 space-y-12">
        {sections.map((section, i) => {
          const Icon = section.icon;
          return (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              custom={i}
              variants={fadeUp}
              className="rounded-2xl border border-border/50 bg-card p-8"
            >
              <div className={`inline-flex rounded-xl p-3 ${section.bg}`}>
                <Icon className={`h-6 w-6 ${section.color}`} />
              </div>
              <h3 className="mt-6 text-xl font-bold">{section.title}</h3>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                {section.text}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
