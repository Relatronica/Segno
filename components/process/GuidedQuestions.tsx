'use client';

import { useState, useCallback, useMemo } from 'react';
import { useProcessStore } from '@/store/useProcessStore';
import { useAppStore } from '@/store/useAppStore';
import { useT } from '@/lib/i18n/useT';
import { generateFlowchart, analyzeEthics } from '@/lib/process/ai-client';
import { applyDagreLayout } from '@/lib/process/layout';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Loader2, MessageCircleQuestion } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.25, 0.4, 0.25, 1] as const },
  }),
};

export function GuidedQuestions() {
  const {
    questions,
    processTemplate,
    customDescription,
    aiProvider,
    apiKey,
    ollamaUrl,
    ollamaModel,
    updateAnswer,
    setNodes,
    setEdges,
    setEthicsAnalysis,
    setStep,
    setError,
    setIsGenerating,
  } = useProcessStore();
  const locale = useAppStore((s) => s.locale);
  const t = useT();
  const [loading, setLoading] = useState(false);

  const answeredCount = questions.filter((q) => q.answer.trim()).length;
  const canProceed = answeredCount >= 3;

  const aiOptions = useMemo(
    () => ({ provider: aiProvider, apiKey, ollamaUrl, ollamaModel }),
    [aiProvider, apiKey, ollamaUrl, ollamaModel]
  );

  const handleGenerate = useCallback(async () => {
    if (!canProceed || !processTemplate) return;

    setLoading(true);
    setIsGenerating(true);
    setError(null);

    try {
      const { nodes, edges } = await generateFlowchart(
        aiOptions,
        processTemplate,
        customDescription,
        questions,
        locale
      );

      const layouted = applyDagreLayout(nodes, edges);
      setNodes(layouted.nodes);
      setEdges(layouted.edges);

      try {
        const ethics = await analyzeEthics(aiOptions, layouted.nodes, layouted.edges, locale);
        setEthicsAnalysis(ethics);
      } catch {
        // Ethics analysis is non-blocking
      }

      setStep('canvas');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate flowchart');
    } finally {
      setLoading(false);
      setIsGenerating(false);
    }
  }, [canProceed, processTemplate, aiOptions, customDescription, questions, locale, setNodes, setEdges, setEthicsAnalysis, setStep, setError, setIsGenerating]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <motion.div initial="hidden" animate="visible">
        <motion.div custom={0} variants={fadeUp} className="text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10">
            <MessageCircleQuestion className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold sm:text-3xl">{t.processDesigner.questionsTitle}</h2>
          <p className="mt-3 text-muted-foreground">{t.processDesigner.questionsSubtitle}</p>
          <p className="mt-2 text-sm text-muted-foreground">
            {t.processDesigner.answered} {answeredCount}/{questions.length}
            {' '}&middot;{' '}
            {t.processDesigner.minAnswers}
          </p>
        </motion.div>

        <motion.div custom={1} variants={fadeUp} className="mt-10 space-y-6">
          {questions.map((q, i) => (
            <motion.div
              key={q.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-xl border border-border/50 bg-card p-5"
            >
              <label className="mb-3 block text-sm font-medium">
                <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-foreground/10 text-xs font-bold">
                  {i + 1}
                </span>
                {q.question}
              </label>
              <textarea
                value={q.answer}
                onChange={(e) => updateAnswer(q.id, e.target.value)}
                placeholder={t.processDesigner.answerPlaceholder}
                rows={2}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm transition-colors focus:border-foreground focus:outline-none"
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div custom={2} variants={fadeUp} className="mt-8 flex justify-between">
          <button
            onClick={() => setStep('processType')}
            className="inline-flex items-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-medium transition-colors hover:bg-accent"
          >
            <ArrowLeft className="h-4 w-4" />
            {t.common.back}
          </button>
          <button
            onClick={handleGenerate}
            disabled={!canProceed || loading}
            className="inline-flex items-center gap-2 rounded-xl bg-foreground px-6 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {t.processDesigner.generatingFlowchart}
              </>
            ) : (
              <>
                {t.processDesigner.generateFlowchart}
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
