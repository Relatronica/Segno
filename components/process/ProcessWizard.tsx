'use client';

import { useProcessStore } from '@/store/useProcessStore';
import { useT } from '@/lib/i18n/useT';
import { ApiKeySetup } from './ApiKeySetup';
import { ProcessTypeSelector } from './ProcessTypeSelector';
import { GuidedQuestions } from './GuidedQuestions';
import { motion } from 'framer-motion';
import { AlertCircle, X } from 'lucide-react';

const stepIndex: Record<string, number> = {
  apiKey: 0,
  processType: 1,
  questions: 2,
  canvas: 3,
};

export function ProcessWizard() {
  const { step, error, setError } = useProcessStore();
  const t = useT();
  const currentStep = stepIndex[step] ?? 0;
  const totalSteps = 3;

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Progress bar */}
      <div className="border-b border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="mx-auto max-w-4xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {t.processDesigner.wizardProgress
                .replace('{current}', String(currentStep + 1))
                .replace('{total}', String(totalSteps))}
            </p>
            <div className="flex gap-1.5">
              {Array.from({ length: totalSteps }).map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 w-8 rounded-full transition-colors ${
                    i <= currentStep ? 'bg-foreground' : 'bg-muted'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Error banner */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-b border-red-200 bg-red-50 dark:border-red-900/50 dark:bg-red-900/20"
        >
          <div className="mx-auto flex max-w-4xl items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
            <AlertCircle className="h-5 w-5 shrink-0 text-red-600" />
            <p className="flex-1 text-sm text-red-700 dark:text-red-400">{error}</p>
            <button
              onClick={() => setError(null)}
              className="rounded-lg p-1 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}

      {/* Step content */}
      {step === 'apiKey' && <ApiKeySetup />}
      {step === 'processType' && <ProcessTypeSelector />}
      {step === 'questions' && <GuidedQuestions />}
    </div>
  );
}
