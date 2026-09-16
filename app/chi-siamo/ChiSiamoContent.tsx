'use client';

import { useT } from '@/lib/i18n/useT';
import { useAppStore } from '@/store/useAppStore';
import { motion } from 'framer-motion';
import {
  Heart,
  Users,
  BookOpen,
  Shield,
  Eye,
  Scale,
  ExternalLink,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { ContactForm } from '@/components/contact/ContactForm';

const DONATE_URL = 'https://buymeacoffee.com/relatronica';

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
    {
      icon: Eye,
      title: 'Trasparenza',
      description:
        'Rendere leggibile il potere: lobbying, dichiarazioni e leggi digitali con fonti verificabili.',
    },
    {
      icon: Shield,
      title: 'Indipendenza',
      description:
        'Niente pubblicità basata sul tracciamento. Strumenti pubblici, mantenuti senza dover vendere attenzione.',
    },
    {
      icon: Users,
      title: 'Comunità',
      description:
        'Cittadini, giornalisti e attivisti: la trasparenza conta se circola e si può controllare insieme.',
    },
    {
      icon: BookOpen,
      title: 'Consapevolezza',
      description:
        'Educazione digitale come diritto: capire le regole per poterle discutere e difendere.',
    },
    {
      icon: Scale,
      title: 'Giustizia digitale',
      description:
        'Un ecosistema equo, dove le tecnologie servono le persone e non solo le piattaforme.',
    },
    {
      icon: Heart,
      title: 'Responsabilità',
      description:
        'Ogni pin ha una fonte. Non fingiamo causalità: costruiamo strumenti precisi per leggere il potere.',
    },
  ],
  en: [
    {
      icon: Eye,
      title: 'Transparency',
      description:
        'Make power readable: lobbying, statements and digital laws with verifiable sources.',
    },
    {
      icon: Shield,
      title: 'Independence',
      description:
        'No tracking-based ads. Public tools, maintained without selling attention.',
    },
    {
      icon: Users,
      title: 'Community',
      description:
        'Citizens, journalists and activists: transparency matters when it circulates and can be checked together.',
    },
    {
      icon: BookOpen,
      title: 'Awareness',
      description:
        'Digital education as a right: understand the rules so they can be debated and defended.',
    },
    {
      icon: Scale,
      title: 'Digital justice',
      description:
        'A fair ecosystem where technologies serve people — not only platforms.',
    },
    {
      icon: Heart,
      title: 'Responsibility',
      description:
        'Every pin has a source. We do not fake causation: we build precise tools to read power.',
    },
  ],
};

export default function ChiSiamoContent() {
  const t = useT();
  const locale = useAppStore((s) => s.locale);
  const currentValues = values[locale as 'it' | 'en'];

  const supportReasons = [
    t.chiSiamo.supportWhy1,
    t.chiSiamo.supportWhy2,
    t.chiSiamo.supportWhy3,
    t.chiSiamo.supportWhy4,
  ];

  return (
    <>
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

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
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
                >
                  <div className="mb-3 inline-flex text-mark">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold tracking-tight">{value.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

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
                className="inline-flex items-center gap-2 text-sm font-medium underline-offset-4 transition-colors hover:underline"
              >
                {t.chiSiamo.relatronicaLink}
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section id="contatti" className="scroll-mt-20 border-t border-border/50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="mx-auto max-w-2xl"
          >
            <motion.h2 custom={0} variants={fadeUp} className="text-2xl font-bold sm:text-3xl">
              {t.chiSiamo.contactTitle}
            </motion.h2>
            <motion.p custom={1} variants={fadeUp} className="mt-4 text-muted-foreground leading-relaxed">
              {t.chiSiamo.contactSubtitle}
            </motion.p>
            <motion.div custom={2} variants={fadeUp} className="relative mt-10">
              <ContactForm />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="border-t border-border/50 bg-muted/30 py-16 sm:py-24" id="sostieni">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="mx-auto max-w-2xl text-center"
          >
            <motion.div
              custom={0}
              variants={fadeUp}
              className="mx-auto inline-flex text-mark"
            >
              <Heart className="h-7 w-7" />
            </motion.div>
            <motion.h2 custom={1} variants={fadeUp} className="mt-6 text-2xl font-bold sm:text-3xl">
              {t.chiSiamo.supportTitle}
            </motion.h2>
            <motion.p custom={2} variants={fadeUp} className="mt-4 text-muted-foreground leading-relaxed">
              {t.chiSiamo.supportSubtitle}
            </motion.p>
          </motion.div>

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
                <motion.div key={i} custom={i + 1} variants={fadeUp} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-mark" />
                  <span className="text-sm leading-relaxed text-muted-foreground">{reason}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-12 flex justify-center"
          >
            <a
              href={DONATE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-foreground px-6 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90"
            >
              <Heart className="h-4 w-4" />
              {t.chiSiamo.donateCta}
              <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
