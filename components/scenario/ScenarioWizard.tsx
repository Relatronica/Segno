'use client';

import { useScenarioStore } from '@/store/useScenarioStore';
import { useT } from '@/lib/i18n/useT';
import { motion, AnimatePresence } from 'framer-motion';
import { CategorySelector } from './CategorySelector';
import { ServiceSelector } from './ServiceSelector';
import { UsageConfigurator } from './UsageConfigurator';

const stepIndex = { categories: 0, services: 1, usage: 2 } as const;

export function ScenarioWizard() {
  const { step, selectedCategories, selectedServiceIds, setStep, computeInsights } =
    useScenarioStore();
  const t = useT();

  if (step === 'landing' || step === 'result') return null;

  const current = stepIndex[step as keyof typeof stepIndex] + 1;
  const total = 3;

  const canGoNext =
    (step === 'categories' && selectedCategories.length > 0) ||
    (step === 'services' && selectedServiceIds.length > 0) ||
    step === 'usage';

  const handleNext = () => {
    if (step === 'categories') setStep('services');
    else if (step === 'services') setStep('usage');
    else if (step === 'usage') computeInsights();
  };

  const handleBack = () => {
    if (step === 'services') setStep('categories');
    else if (step === 'usage') setStep('services');
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>
            {t.mappaDigitale.wizardProgress
              .replace('{current}', String(current))
              .replace('{total}', String(total))}
          </span>
          <button
            onClick={handleBack}
            className={`text-sm font-medium transition-colors hover:text-foreground ${
              step === 'categories' ? 'invisible' : ''
            }`}
          >
            {t.mappaDigitale.back}
          </button>
        </div>
        <div className="mt-2 h-1.5 w-full rounded-full bg-accent">
          <motion.div
            className="h-full rounded-full bg-foreground"
            initial={{ width: 0 }}
            animate={{ width: `${(current / total) * 100}%` }}
            transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
          />
        </div>
      </div>

      {/* Step content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {step === 'categories' && <CategorySelector />}
          {step === 'services' && <ServiceSelector />}
          {step === 'usage' && <UsageConfigurator />}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="mt-10 flex justify-end">
        <button
          onClick={handleNext}
          disabled={!canGoNext}
          className="inline-flex items-center gap-2 rounded-xl bg-foreground px-6 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {step === 'usage' ? t.mappaDigitale.generate : t.mappaDigitale.next}
        </button>
      </div>
    </div>
  );
}
