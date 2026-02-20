'use client';

import { useScenarioStore } from '@/store/useScenarioStore';
import { useAppStore } from '@/store/useAppStore';
import { useT } from '@/lib/i18n/useT';
import { motion } from 'framer-motion';
import { Fingerprint, ArrowRight, Shield, Eye, Brain } from 'lucide-react';
import { ScenarioWizard } from '@/components/scenario/ScenarioWizard';
import { ScenarioCanvas } from '@/components/scenario/ScenarioCanvas';

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
    icon: Eye,
    colorClass: 'bg-rose-500/10 text-rose-600',
    title: { it: 'Scopri chi ha i tuoi dati', en: 'Discover who has your data' },
    desc: {
      it: 'Visualizza quante aziende accedono alle tue informazioni e quali dati raccolgono.',
      en: 'See how many companies access your information and what data they collect.',
    },
  },
  {
    icon: Shield,
    colorClass: 'bg-emerald-500/10 text-emerald-600',
    title: { it: 'Trova alternative etiche', en: 'Find ethical alternatives' },
    desc: {
      it: 'Per ogni servizio a rischio, scopri alternative che rispettano la tua privacy.',
      en: 'For every risky service, discover alternatives that respect your privacy.',
    },
  },
  {
    icon: Brain,
    colorClass: 'bg-violet-500/10 text-violet-600',
    title: { it: "Capire l'impatto dell'IA", en: 'Understand the AI impact' },
    desc: {
      it: 'Scopri se i tuoi dati vengono usati per addestrare modelli di intelligenza artificiale.',
      en: 'Find out if your data is being used to train artificial intelligence models.',
    },
  },
];

export default function MappaDigitalePage() {
  const { step, setStep } = useScenarioStore();
  const locale = useAppStore((s) => s.locale);
  const t = useT();

  if (step === 'result') {
    return <ScenarioCanvas />;
  }

  if (step !== 'landing') {
    return <ScenarioWizard />;
  }

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-violet-500/10 to-background" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(139,92,246,0.12),transparent)]" />
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
          <motion.div
            initial="hidden"
            animate="visible"
            className="mx-auto max-w-3xl text-center"
          >
            <motion.div
              custom={0}
              variants={fadeUp}
              className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-500/10"
            >
              <Fingerprint className="h-8 w-8 text-violet-600" />
            </motion.div>
            <motion.h1
              custom={1}
              variants={fadeUp}
              className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
            >
              {t.mappaDigitale.heroTitle}
            </motion.h1>
            <motion.p
              custom={2}
              variants={fadeUp}
              className="mt-6 text-lg text-muted-foreground sm:text-xl"
            >
              {t.mappaDigitale.heroSubtitle}
            </motion.p>
            <motion.div custom={3} variants={fadeUp} className="mt-10">
              <button
                onClick={() => setStep('categories')}
                className="inline-flex items-center gap-2 rounded-xl bg-foreground px-8 py-4 text-base font-semibold text-background transition-opacity hover:opacity-90"
              >
                {t.mappaDigitale.heroCta}
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
