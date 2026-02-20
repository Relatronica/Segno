'use client';

import { useScenarioStore } from '@/store/useScenarioStore';
import { useT } from '@/lib/i18n/useT';
import { digitalServices, serviceCategories } from '@/lib/data/services';
import { useAppStore } from '@/store/useAppStore';
import { motion } from 'framer-motion';
import { RotateCcw } from 'lucide-react';
import { ScoreGauge } from './ScoreGauge';
import { ServiceNode } from './ServiceNode';
import { InsightsPanel } from './InsightsPanel';

export function ScenarioCanvas() {
  const { insights, selectedServiceIds, selectedCategories, reset } = useScenarioStore();
  const locale = useAppStore((s) => s.locale);
  const t = useT();

  if (!insights) return null;

  const services = selectedServiceIds
    .map((id) => digitalServices.find((s) => s.id === id))
    .filter(Boolean) as typeof digitalServices;

  const groupedByCategory = selectedCategories
    .map((catId) => {
      const cat = serviceCategories.find((c) => c.id === catId);
      const catServices = services.filter((s) => s.category === catId);
      return cat && catServices.length > 0 ? { cat, services: catServices } : null;
    })
    .filter(Boolean) as { cat: (typeof serviceCategories)[0]; services: typeof digitalServices }[];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold sm:text-4xl">{t.mappaDigitale.resultTitle}</h2>
        <p className="mt-2 text-muted-foreground">{t.mappaDigitale.resultSubtitle}</p>
      </motion.div>

      {/* Score + Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-10 flex flex-col items-center gap-6 rounded-2xl border border-border/50 bg-card p-8 sm:flex-row sm:justify-around"
      >
        <ScoreGauge score={insights.privacyScore} />
        <div className="grid grid-cols-2 gap-6 text-center sm:grid-cols-3">
          <div>
            <span className="text-2xl font-bold">{insights.totalServices}</span>
            <span className="block text-xs text-muted-foreground">
              {locale === 'it' ? 'Servizi analizzati' : 'Services analyzed'}
            </span>
          </div>
          <div>
            <span className="text-2xl font-bold">{insights.totalDataTypes.length}</span>
            <span className="block text-xs text-muted-foreground">
              {t.mappaDigitale.insights.dataTypes}
            </span>
          </div>
          <div>
            <span className="text-2xl font-bold">{insights.companyExposure.length}</span>
            <span className="block text-xs text-muted-foreground">
              {t.mappaDigitale.insights.companies}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Two-column layout: Map + Insights */}
      <div className="mt-12 grid gap-10 lg:grid-cols-5">
        {/* Service Map */}
        <div className="lg:col-span-3">
          <div className="space-y-8">
            {groupedByCategory.map(({ cat, services: catServices }) => (
              <div key={cat.id}>
                <h3 className="mb-3 text-lg font-semibold">{cat.label[locale]}</h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {catServices.map((svc, i) => (
                    <ServiceNode key={svc.id} service={svc} index={i} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Insights sidebar */}
        <div className="lg:col-span-2">
          <InsightsPanel insights={insights} />
        </div>
      </div>

      {/* Restart */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-16 text-center"
      >
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-semibold transition-colors hover:bg-accent"
        >
          <RotateCcw className="h-4 w-4" />
          {t.mappaDigitale.restart}
        </button>
      </motion.div>
    </div>
  );
}
