'use client';

import { useState, useCallback, useMemo } from 'react';
import { useProcessStore } from '@/store/useProcessStore';
import { useAppStore } from '@/store/useAppStore';
import { useT } from '@/lib/i18n/useT';
import { processTemplates } from '@/lib/process/templates';
import { generateQuestions } from '@/lib/process/ai-client';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ArrowLeft,
  Loader2,
  Database,
  GitBranch,
  Brain,
  Building2,
  Heart,
  Pencil,
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Database,
  GitBranch,
  Brain,
  Building2,
  Heart,
  Pencil,
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.25, 0.4, 0.25, 1] as const },
  }),
};

export function ProcessTypeSelector() {
  const {
    processTemplate,
    customDescription,
    aiProvider,
    apiKey,
    ollamaUrl,
    ollamaModel,
    setProcessTemplate,
    setCustomDescription,
    setQuestions,
    setStep,
    setError,
    setIsGenerating,
  } = useProcessStore();
  const locale = useAppStore((s) => s.locale);
  const t = useT();
  const [loading, setLoading] = useState(false);

  const aiOptions = useMemo(
    () => ({ provider: aiProvider, apiKey, ollamaUrl, ollamaModel }),
    [aiProvider, apiKey, ollamaUrl, ollamaModel]
  );

  const handleNext = useCallback(async () => {
    if (!processTemplate) return;
    if (processTemplate === 'custom' && !customDescription.trim()) return;

    setLoading(true);
    setIsGenerating(true);
    setError(null);

    try {
      const templateDef = processTemplates.find((tpl) => tpl.id === processTemplate);

      if (processTemplate !== 'custom' && templateDef?.defaultQuestions.length) {
        const questions = templateDef.defaultQuestions.map((q, i) => ({
          id: `q${i + 1}`,
          question: q[locale],
          answer: '',
        }));
        setQuestions(questions);
      } else {
        const questions = await generateQuestions(
          aiOptions,
          processTemplate,
          customDescription,
          locale
        );
        setQuestions(questions);
      }
      setStep('questions');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate questions');
    } finally {
      setLoading(false);
      setIsGenerating(false);
    }
  }, [processTemplate, customDescription, aiOptions, locale, setQuestions, setStep, setError, setIsGenerating]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <motion.div initial="hidden" animate="visible">
        <motion.div custom={0} variants={fadeUp} className="text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">{t.processDesigner.typeTitle}</h2>
          <p className="mt-3 text-muted-foreground">{t.processDesigner.typeSubtitle}</p>
        </motion.div>

        <motion.div custom={1} variants={fadeUp} className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {processTemplates.map((tpl) => {
            const Icon = iconMap[tpl.icon] || Database;
            const isSelected = processTemplate === tpl.id;

            return (
              <button
                key={tpl.id}
                onClick={() => setProcessTemplate(tpl.id)}
                className={`group rounded-2xl border p-6 text-left transition-all hover:shadow-md ${
                  isSelected
                    ? 'border-foreground bg-foreground/5 shadow-md'
                    : 'border-border/50 hover:border-foreground/30'
                }`}
              >
                <div
                  className={`inline-flex rounded-xl bg-gradient-to-br ${tpl.color} p-3`}
                >
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="mt-4 font-semibold">{tpl.title[locale]}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{tpl.description[locale]}</p>
              </button>
            );
          })}
        </motion.div>

        {processTemplate === 'custom' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-6"
          >
            <label className="mb-2 block text-sm font-medium">
              {t.processDesigner.customDescLabel}
            </label>
            <textarea
              value={customDescription}
              onChange={(e) => setCustomDescription(e.target.value)}
              placeholder={t.processDesigner.customDescPlaceholder}
              rows={4}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm transition-colors focus:border-foreground focus:outline-none"
            />
          </motion.div>
        )}

        <motion.div custom={2} variants={fadeUp} className="mt-8 flex justify-between">
          <button
            onClick={() => setStep('apiKey')}
            className="inline-flex items-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-medium transition-colors hover:bg-accent"
          >
            <ArrowLeft className="h-4 w-4" />
            {t.common.back}
          </button>
          <button
            onClick={handleNext}
            disabled={!processTemplate || loading || (processTemplate === 'custom' && !customDescription.trim())}
            className="inline-flex items-center gap-2 rounded-xl bg-foreground px-6 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {t.processDesigner.generating}
              </>
            ) : (
              <>
                {t.common.next}
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
