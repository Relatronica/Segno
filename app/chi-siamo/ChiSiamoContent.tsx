'use client';

import Link from 'next/link';
import { useT } from '@/lib/i18n/useT';
import { useAppStore } from '@/store/useAppStore';
import { motion } from 'framer-motion';
import {
  Heart, Users, BookOpen, Shield, Eye, Scale,
  ExternalLink, ArrowRight, Sparkles, Zap, Crown, CheckCircle2,
} from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.25, 0.4, 0.25, 1] as const },
  }),
};

const values = {
  it: [
    { icon: Eye, title: 'Trasparenza', description: 'Crediamo che la conoscenza debba essere accessibile e che le tecnologie debbano essere comprensibili.' },
    { icon: Shield, title: 'Privacy', description: 'Difendiamo il diritto alla privacy come pilastro fondamentale della libertà individuale.' },
    { icon: Users, title: 'Comunità', description: 'Il cambiamento parte dalle persone. Costruiamo insieme una comunità consapevole.' },
    { icon: BookOpen, title: 'Educazione', description: 'La consapevolezza nasce dalla conoscenza. Offriamo strumenti per comprendere il mondo digitale.' },
    { icon: Scale, title: 'Giustizia digitale', description: 'Lavoriamo per un ecosistema digitale equo, dove i diritti siano rispettati e le tecnologie servano le persone.' },
    { icon: Heart, title: 'Etica', description: 'Poniamo l\'etica al centro dello sviluppo tecnologico, perché l\'innovazione deve essere al servizio dell\'umanità.' },
  ],
  en: [
    { icon: Eye, title: 'Transparency', description: 'We believe knowledge should be accessible and technologies should be understandable.' },
    { icon: Shield, title: 'Privacy', description: 'We defend the right to privacy as a fundamental pillar of individual freedom.' },
    { icon: Users, title: 'Community', description: 'Change starts with people. Together we build an aware community.' },
    { icon: BookOpen, title: 'Education', description: 'Awareness comes from knowledge. We offer tools to understand the digital world.' },
    { icon: Scale, title: 'Digital justice', description: 'We work for a fair digital ecosystem, where rights are respected and technologies serve people.' },
    { icon: Heart, title: 'Ethics', description: 'We put ethics at the center of technological development, because innovation must serve humanity.' },
  ],
};

const tierIcons = [Sparkles, Zap, Crown];
const tierColors = [
  'border-blue-500/20 bg-blue-500/5',
  'border-violet-500/20 bg-violet-500/5',
  'border-amber-500/20 bg-amber-500/5',
];
const tierIconColors = ['text-blue-500', 'text-violet-500', 'text-amber-500'];
const tierCtaColors = [
  'bg-blue-600 hover:bg-blue-700',
  'bg-violet-600 hover:bg-violet-700',
  'bg-amber-600 hover:bg-amber-700',
];

export default function ChiSiamoContent() {
  const t = useT();
  const locale = useAppStore((s) => s.locale);
  const currentValues = values[locale as 'it' | 'en'];

  const tiers = [
    { name: t.chiSiamo.tierObserverName, desc: t.chiSiamo.tierObserverDesc, cta: t.chiSiamo.tierObserverCta },
    { name: t.chiSiamo.tierExplorerName, desc: t.chiSiamo.tierExplorerDesc, cta: t.chiSiamo.tierExplorerCta },
    { name: t.chiSiamo.tierArchitectName, desc: t.chiSiamo.tierArchitectDesc, cta: t.chiSiamo.tierArchitectCta },
  ];

  const supportReasons = [
    t.chiSiamo.supportWhy1,
    t.chiSiamo.supportWhy2,
    t.chiSiamo.supportWhy3,
    t.chiSiamo.supportWhy4,
  ];

  return (
    <>
      {/* Header */}
      <section className="border-b border-border/50 bg-muted/30 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold sm:text-4xl"
          >
            {t.chiSiamo.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-3 max-w-2xl text-muted-foreground"
          >
            {t.chiSiamo.subtitle}
          </motion.p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="mx-auto max-w-3xl"
          >
            <motion.h2 custom={0} variants={fadeUp} className="text-2xl font-bold sm:text-3xl">
              {t.chiSiamo.missionTitle}
            </motion.h2>
            <motion.p custom={1} variants={fadeUp} className="mt-6 text-lg leading-relaxed text-muted-foreground">
              {t.chiSiamo.missionText}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="border-t border-border/50 bg-muted/30 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-bold sm:text-3xl"
          >
            {t.chiSiamo.valuesTitle}
          </motion.h2>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {currentValues.map((value, i) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-60px' }}
                  custom={i}
                  variants={fadeUp}
                  className="rounded-2xl border border-border/50 bg-card p-6 transition-shadow hover:shadow-md"
                >
                  <div className="inline-flex rounded-xl bg-accent p-3">
                    <Icon className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <h3 className="mt-4 font-semibold">{value.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Relatronica */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="mx-auto max-w-3xl"
          >
            <motion.h2 custom={0} variants={fadeUp} className="text-2xl font-bold sm:text-3xl">
              {t.chiSiamo.relatronicaTitle}
            </motion.h2>
            <motion.p custom={1} variants={fadeUp} className="mt-6 text-lg leading-relaxed text-muted-foreground">
              {t.chiSiamo.relatronicaText}
            </motion.p>
            <motion.div custom={2} variants={fadeUp} className="mt-6">
              <a
                href="https://relatronica.com/about"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-foreground"
              >
                {t.chiSiamo.relatronicaLink}
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Support */}
      <section className="border-t border-border/50 bg-muted/30 py-16 sm:py-24" id="sostieni">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="text-center"
          >
            <motion.div custom={0} variants={fadeUp} className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-500/10">
              <Heart className="h-7 w-7 text-rose-500" />
            </motion.div>
            <motion.h2 custom={1} variants={fadeUp} className="mt-6 text-2xl font-bold sm:text-3xl">
              {t.chiSiamo.supportTitle}
            </motion.h2>
            <motion.p custom={2} variants={fadeUp} className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              {t.chiSiamo.supportSubtitle}
            </motion.p>
          </motion.div>

          {/* Why support */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="mx-auto mt-12 max-w-2xl"
          >
            <motion.h3 custom={0} variants={fadeUp} className="text-center text-lg font-semibold">
              {t.chiSiamo.supportWhyTitle}
            </motion.h3>
            <div className="mt-6 space-y-3">
              {supportReasons.map((reason, i) => (
                <motion.div
                  key={i}
                  custom={i + 1}
                  variants={fadeUp}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                  <span className="text-muted-foreground">{reason}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Tiers */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="mt-16"
          >
            <motion.h3 custom={0} variants={fadeUp} className="text-center text-lg font-semibold">
              {t.chiSiamo.supportTiersTitle}
            </motion.h3>
            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              {tiers.map((tier, i) => {
                const Icon = tierIcons[i];
                return (
                  <motion.div
                    key={tier.name}
                    custom={i + 1}
                    variants={fadeUp}
                    className={`flex flex-col rounded-2xl border p-6 transition-shadow hover:shadow-lg ${tierColors[i]}`}
                  >
                    <div className={`inline-flex self-start rounded-xl p-3 ${tierColors[i]}`}>
                      <Icon className={`h-6 w-6 ${tierIconColors[i]}`} />
                    </div>
                    <h4 className="mt-4 text-lg font-semibold">{tier.name}</h4>
                    <p className="mt-2 flex-1 text-sm text-muted-foreground">{tier.desc}</p>
                    <a
                      href="https://buymeacoffee.com/relatronica"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`mt-6 flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition-colors ${tierCtaColors[i]}`}
                    >
                      {tier.cta}
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
