'use client';

import { useScenarioStore } from '@/store/useScenarioStore';
import { useT } from '@/lib/i18n/useT';
import { digitalServices } from '@/lib/data/services';
import type { UsageFrequency } from '@/lib/data/services';
import { motion } from 'framer-motion';

const frequencies: UsageFrequency[] = ['daily', 'weekly', 'rarely'];

export function UsageConfigurator() {
  const { selectedServiceIds, serviceUsages, setServiceUsage } = useScenarioStore();
  const t = useT();

  const services = selectedServiceIds
    .map((id) => digitalServices.find((s) => s.id === id))
    .filter(Boolean) as typeof digitalServices;

  return (
    <div>
      <h2 className="text-2xl font-bold sm:text-3xl">{t.mappaDigitale.step3Title}</h2>
      <p className="mt-2 text-muted-foreground">{t.mappaDigitale.step3Subtitle}</p>

      <div className="mt-8 space-y-6">
        {services.map((svc, i) => {
          const usage = serviceUsages.get(svc.id);
          const currentFreq = usage?.frequency ?? 'weekly';
          const isAI = svc.category === 'ai';

          return (
            <motion.div
              key={svc.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
              className="rounded-xl border border-border/50 bg-card p-5"
            >
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold">{svc.name}</span>
                <span className="text-xs text-muted-foreground">{svc.companyOwner}</span>
              </div>

              {/* Frequency */}
              <div className="mt-4">
                <label className="text-xs font-medium text-muted-foreground">
                  {t.mappaDigitale.usageQuestions.frequency}
                </label>
                <div className="mt-2 flex gap-2">
                  {frequencies.map((freq) => (
                    <button
                      key={freq}
                      onClick={() => setServiceUsage(svc.id, { serviceId: svc.id, frequency: freq })}
                      className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                        currentFreq === freq
                          ? 'bg-foreground text-background'
                          : 'bg-accent text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {t.mappaDigitale.frequency[freq]}
                    </button>
                  ))}
                </div>
              </div>

              {/* AI-specific questions */}
              {isAI && (
                <div className="mt-4 space-y-3 border-t border-border/50 pt-4">
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={usage?.sharesPersonalData ?? false}
                      onChange={(e) =>
                        setServiceUsage(svc.id, {
                          serviceId: svc.id,
                          sharesPersonalData: e.target.checked,
                        })
                      }
                      className="h-4 w-4 rounded border-muted-foreground/30 accent-foreground"
                    />
                    <span className="text-sm">
                      {t.mappaDigitale.usageQuestions.sharesPersonalData}
                    </span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={usage?.uploadsDocuments ?? false}
                      onChange={(e) =>
                        setServiceUsage(svc.id, {
                          serviceId: svc.id,
                          uploadsDocuments: e.target.checked,
                        })
                      }
                      className="h-4 w-4 rounded border-muted-foreground/30 accent-foreground"
                    />
                    <span className="text-sm">
                      {t.mappaDigitale.usageQuestions.uploadsDocuments}
                    </span>
                  </label>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
