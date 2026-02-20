'use client';

import { useEffect, useCallback } from 'react';
import { useProcessStore } from '@/store/useProcessStore';
import { useAppStore } from '@/store/useAppStore';
import { useT } from '@/lib/i18n/useT';
import { ProcessWizard } from '@/components/process/ProcessWizard';
import { ProcessCanvas } from '@/components/process/ProcessCanvas';
import { processExamples, type ProcessExample } from '@/lib/process/examples';
import { motion } from 'framer-motion';
import {
  Workflow,
  ArrowRight,
  Shield,
  Scale,
  Brain,
  ShoppingCart,
  CreditCard,
  Users,
  Play,
  GitBranch,
  Database,
  Cog,
  AlertTriangle,
} from 'lucide-react';

const exampleIconMap: Record<string, React.ElementType> = {
  ShoppingCart,
  CreditCard,
  Users,
};

const nodeTypeIcons: Record<string, React.ElementType> = {
  start: Play,
  decision: GitBranch,
  data: Database,
  ai: Brain,
  process: Cog,
  end: AlertTriangle,
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.25, 0.4, 0.25, 1] as const },
  }),
};

function MiniFlowPreview({ example }: { example: ProcessExample }) {
  const nodeCount = example.nodes.length;
  const aiNodes = example.nodes.filter((n) => n.data.type === 'ai').length;
  const dataNodes = example.nodes.filter((n) => n.data.type === 'data').length;
  const decisionNodes = example.nodes.filter((n) => n.data.type === 'decision').length;

  const nodeTypeSummary = [
    { type: 'ai', count: aiNodes, label: 'AI' },
    { type: 'data', count: dataNodes, label: 'Data' },
    { type: 'decision', count: decisionNodes, label: 'Decision' },
  ].filter((n) => n.count > 0);

  return (
    <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
      <span className="font-medium">{nodeCount} nodi</span>
      <span className="text-border">|</span>
      <div className="flex gap-2">
        {nodeTypeSummary.map(({ type, count, label }) => {
          const Icon = nodeTypeIcons[type] || Cog;
          return (
            <span key={type} className="inline-flex items-center gap-1">
              <Icon className="h-3 w-3" />
              {count} {label}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default function ProcessDesignerContent() {
  const {
    step,
    setStep,
    setApiKey,
    setAIProvider,
    setApiKeyValidated,
    setNodes,
    setEdges,
    setEthicsAnalysis,
  } = useProcessStore();
  const locale = useAppStore((s) => s.locale);
  const t = useT();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedKey = localStorage.getItem('segno-ai-key');
      const savedProvider = localStorage.getItem('segno-ai-provider');
      if (savedKey) setApiKey(savedKey);
      if (savedProvider && ['openai', 'anthropic', 'google'].includes(savedProvider)) {
        setAIProvider(savedProvider as 'openai' | 'anthropic' | 'google');
        if (savedKey) setApiKeyValidated(true);
      }
    }
  }, [setApiKey, setAIProvider, setApiKeyValidated]);

  const handleLoadExample = useCallback(
    (example: ProcessExample) => {
      setNodes(example.nodes);
      setEdges(example.edges);
      setEthicsAnalysis(example.ethicsAnalysis);
      setStep('canvas');
      window.scrollTo({ top: 0, behavior: 'instant' });
    },
    [setNodes, setEdges, setEthicsAnalysis, setStep]
  );

  if (step === 'canvas') {
    return <ProcessCanvas />;
  }

  if (step !== 'landing') {
    return <ProcessWizard />;
  }

  const features = [
    {
      icon: Brain,
      colorClass: 'bg-violet-500/10 text-violet-600',
      title: {
        it: 'Generazione assistita dall\'IA',
        en: 'AI-Assisted Generation',
      },
      desc: {
        it: 'Un wizard ti guida passo passo. L\'IA genera il flowchart del processo basandosi sulle tue risposte.',
        en: 'A wizard guides you step by step. The AI generates the process flowchart based on your answers.',
      },
    },
    {
      icon: Shield,
      colorClass: 'bg-emerald-500/10 text-emerald-600',
      title: {
        it: 'Analisi GDPR e AI Act',
        en: 'GDPR & AI Act Analysis',
      },
      desc: {
        it: 'Ricevi un\'analisi dettagliata di conformità GDPR e classificazione del rischio AI Act.',
        en: 'Get a detailed GDPR compliance analysis and AI Act risk classification.',
      },
    },
    {
      icon: Scale,
      colorClass: 'bg-amber-500/10 text-amber-600',
      title: {
        it: 'Suggerimenti etici',
        en: 'Ethical Suggestions',
      },
      desc: {
        it: 'Scopri criticità etiche e ricevi suggerimenti concreti per migliorare il tuo processo.',
        en: 'Discover ethical issues and get concrete suggestions to improve your process.',
      },
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-cyan-500/10 to-background" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(6,182,212,0.12),transparent)]" />
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
          <motion.div initial="hidden" animate="visible" className="mx-auto max-w-3xl text-center">
            <motion.div
              custom={0}
              variants={fadeUp}
              className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/10"
            >
              <Workflow className="h-8 w-8 text-cyan-600" />
            </motion.div>
            <motion.h1
              custom={1}
              variants={fadeUp}
              className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
            >
              {t.processDesigner.heroTitle}
            </motion.h1>
            <motion.p
              custom={2}
              variants={fadeUp}
              className="mt-6 text-lg text-muted-foreground sm:text-xl"
            >
              {t.processDesigner.heroSubtitle}
            </motion.p>
            <motion.div custom={3} variants={fadeUp} className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <button
                onClick={() => setStep('apiKey')}
                className="inline-flex items-center gap-2 rounded-xl bg-foreground px-8 py-4 text-base font-semibold text-background transition-opacity hover:opacity-90"
              >
                {t.processDesigner.heroCta}
                <ArrowRight className="h-5 w-5" />
              </button>
              <a
                href="#examples"
                className="inline-flex items-center gap-2 rounded-xl border border-border px-8 py-4 text-base font-semibold transition-colors hover:bg-accent"
              >
                {t.processDesigner.seeExamples}
              </a>
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

      {/* Examples */}
      <section id="examples" className="border-y border-border/50 bg-muted/30 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="text-center"
          >
            <motion.h2 custom={0} variants={fadeUp} className="text-3xl font-bold sm:text-4xl">
              {t.processDesigner.examplesTitle}
            </motion.h2>
            <motion.p custom={1} variants={fadeUp} className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              {t.processDesigner.examplesSubtitle}
            </motion.p>
          </motion.div>

          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {processExamples.map((example, i) => {
              const Icon = exampleIconMap[example.iconName] || Workflow;
              const score = example.ethicsAnalysis.overallScore;
              const scoreColor =
                score >= 60
                  ? 'text-amber-600 bg-amber-500/10'
                  : score >= 40
                    ? 'text-orange-600 bg-orange-500/10'
                    : 'text-red-600 bg-red-500/10';

              return (
                <motion.div
                  key={example.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-60px' }}
                  custom={i}
                  variants={fadeUp}
                  className="group flex flex-col rounded-2xl border border-border/50 bg-card transition-all hover:shadow-lg hover:border-border"
                >
                  {/* Header */}
                  <div className="p-6 pb-0">
                    <div className="flex items-start justify-between">
                      <div className={`inline-flex rounded-xl bg-gradient-to-br ${example.color} p-3`}>
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <span className={`rounded-lg px-2.5 py-1 text-xs font-semibold ${example.badgeColor}`}>
                        {example.badge[locale]}
                      </span>
                    </div>
                    <h3 className="mt-4 text-lg font-semibold">{example.title[locale]}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{example.description[locale]}</p>
                  </div>

                  {/* Mini preview + score */}
                  <div className="flex-1 px-6 py-4">
                    <MiniFlowPreview example={example} />

                    {/* Score bar */}
                    <div className="mt-4">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">{t.processDesigner.overallScore}</span>
                        <span className={`rounded-md px-2 py-0.5 font-bold ${scoreColor}`}>{score}/100</span>
                      </div>
                      <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-muted">
                        <motion.div
                          className={`h-full rounded-full ${score >= 60 ? 'bg-amber-500' : score >= 40 ? 'bg-orange-500' : 'bg-red-500'}`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${score}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.3 + i * 0.15 }}
                        />
                      </div>
                    </div>

                    {/* Key issues preview */}
                    <div className="mt-4 space-y-1.5">
                      {example.ethicsAnalysis.ethicalConcerns.slice(0, 2).map((concern, j) => (
                        <div key={j} className="flex gap-2 text-xs text-muted-foreground">
                          <AlertTriangle className="mt-0.5 h-3 w-3 shrink-0 text-amber-500" />
                          <span className="line-clamp-1">{concern}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="border-t border-border/50 p-4">
                    <button
                      onClick={() => handleLoadExample(example)}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-foreground/5 px-4 py-3 text-sm font-semibold transition-colors hover:bg-foreground hover:text-background"
                    >
                      {t.processDesigner.tryExample}
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Explainer under examples */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <motion.p custom={0} variants={fadeUp} className="text-sm text-muted-foreground">
              {t.processDesigner.examplesNote}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* BYOK Note */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.p custom={0} variants={fadeUp} className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
              {t.processDesigner.byokTitle}
            </motion.p>
            <motion.p custom={1} variants={fadeUp} className="mt-3 text-muted-foreground">
              {t.processDesigner.byokText}
            </motion.p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
