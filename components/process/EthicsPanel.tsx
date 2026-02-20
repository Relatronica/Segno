'use client';

import { useProcessStore } from '@/store/useProcessStore';
import { useT } from '@/lib/i18n/useT';
import { ComplianceScore } from './ComplianceScore';
import { motion } from 'framer-motion';
import {
  Shield,
  Scale,
  Brain,
  AlertTriangle,
  CheckCircle2,
  Lightbulb,
  Info,
} from 'lucide-react';

const riskColors: Record<string, { bg: string; text: string; label: string }> = {
  unacceptable: { bg: 'bg-red-500/10', text: 'text-red-600', label: 'Unacceptable' },
  high: { bg: 'bg-orange-500/10', text: 'text-orange-600', label: 'High' },
  limited: { bg: 'bg-amber-500/10', text: 'text-amber-600', label: 'Limited' },
  minimal: { bg: 'bg-emerald-500/10', text: 'text-emerald-600', label: 'Minimal' },
};

export function EthicsPanel() {
  const { ethicsAnalysis } = useProcessStore();
  const t = useT();

  if (!ethicsAnalysis) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <div className="text-center">
          <Info className="mx-auto h-10 w-10 text-muted-foreground/50" />
          <p className="mt-3 text-sm text-muted-foreground">{t.processDesigner.noAnalysis}</p>
        </div>
      </div>
    );
  }

  const { gdpr, aiAct, ethicalConcerns, improvements, overallScore } = ethicsAnalysis;
  const risk = riskColors[aiAct.riskLevel] || riskColors.minimal;

  return (
    <div className="space-y-6 p-6">
      {/* Overall Score */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h3 className="mb-4 text-lg font-bold">{t.processDesigner.ethicsTitle}</h3>
        <ComplianceScore score={overallScore} label={t.processDesigner.overallScore} />
      </motion.div>

      {/* GDPR Section */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-xl border border-border/50 p-4"
      >
        <div className="mb-3 flex items-center gap-2">
          <Shield className="h-5 w-5 text-blue-600" />
          <h4 className="font-semibold">GDPR</h4>
          <div className="ml-auto">
            <ComplianceScore score={gdpr.score} label="" size="sm" />
          </div>
        </div>

        {gdpr.issues.length > 0 && (
          <div className="mb-3">
            <p className="mb-1.5 text-xs font-medium text-muted-foreground">{t.processDesigner.issues}</p>
            <ul className="space-y-1.5">
              {gdpr.issues.map((issue, i) => (
                <li key={i} className="flex gap-2 text-xs">
                  <AlertTriangle className="mt-0.5 h-3 w-3 shrink-0 text-amber-500" />
                  <span>{issue}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {gdpr.suggestions.length > 0 && (
          <div>
            <p className="mb-1.5 text-xs font-medium text-muted-foreground">{t.processDesigner.suggestions}</p>
            <ul className="space-y-1.5">
              {gdpr.suggestions.map((sug, i) => (
                <li key={i} className="flex gap-2 text-xs">
                  <CheckCircle2 className="mt-0.5 h-3 w-3 shrink-0 text-emerald-500" />
                  <span>{sug}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </motion.div>

      {/* AI Act Section */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-xl border border-border/50 p-4"
      >
        <div className="mb-3 flex items-center gap-2">
          <Scale className="h-5 w-5 text-violet-600" />
          <h4 className="font-semibold">AI Act</h4>
        </div>

        <div className={`mb-3 inline-flex items-center gap-2 rounded-lg ${risk.bg} px-3 py-1.5`}>
          <Brain className={`h-4 w-4 ${risk.text}`} />
          <span className={`text-sm font-medium ${risk.text}`}>
            {t.processDesigner.riskLevel}: {risk.label}
          </span>
        </div>

        {aiAct.classification && (
          <p className="mb-3 text-xs text-muted-foreground">{aiAct.classification}</p>
        )}

        {aiAct.issues.length > 0 && (
          <div className="mb-3">
            <p className="mb-1.5 text-xs font-medium text-muted-foreground">{t.processDesigner.issues}</p>
            <ul className="space-y-1.5">
              {aiAct.issues.map((issue, i) => (
                <li key={i} className="flex gap-2 text-xs">
                  <AlertTriangle className="mt-0.5 h-3 w-3 shrink-0 text-amber-500" />
                  <span>{issue}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {aiAct.suggestions.length > 0 && (
          <div>
            <p className="mb-1.5 text-xs font-medium text-muted-foreground">{t.processDesigner.suggestions}</p>
            <ul className="space-y-1.5">
              {aiAct.suggestions.map((sug, i) => (
                <li key={i} className="flex gap-2 text-xs">
                  <CheckCircle2 className="mt-0.5 h-3 w-3 shrink-0 text-emerald-500" />
                  <span>{sug}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </motion.div>

      {/* Ethical Concerns */}
      {ethicalConcerns.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-xl border border-border/50 p-4"
        >
          <div className="mb-3 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-600" />
            <h4 className="font-semibold">{t.processDesigner.ethicalConcerns}</h4>
          </div>
          <ul className="space-y-2">
            {ethicalConcerns.map((concern, i) => (
              <li key={i} className="flex gap-2 text-xs">
                <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                <span>{concern}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Improvements */}
      {improvements.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-xl border border-border/50 p-4"
        >
          <div className="mb-3 flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-emerald-600" />
            <h4 className="font-semibold">{t.processDesigner.improvementsTitle}</h4>
          </div>
          <ul className="space-y-2">
            {improvements.map((imp, i) => (
              <li key={i} className="flex gap-2 text-xs">
                <CheckCircle2 className="mt-0.5 h-3 w-3 shrink-0 text-emerald-500" />
                <span>{imp}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Disclaimer */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="rounded-xl bg-muted/50 p-4"
      >
        <p className="text-xs text-muted-foreground">
          <strong>{t.processDesigner.disclaimerTitle}:</strong>{' '}
          {t.processDesigner.disclaimerText}
        </p>
      </motion.div>
    </div>
  );
}
