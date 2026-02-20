'use client';

import Link from 'next/link';
import { useT } from '@/lib/i18n/useT';
import { useAppStore } from '@/store/useAppStore';
import type { ScenarioInsights } from '@/lib/scenario/insights';
import type { DataType } from '@/lib/data/services';
import { motion } from 'framer-motion';
import {
  AlertTriangle,
  Lightbulb,
  Building2,
  Database,
  BookOpen,
  ArrowRight,
  ShieldAlert,
  Brain,
} from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4 },
  }),
};

function severityBadge(severity: 'high' | 'medium' | 'low', t: ReturnType<typeof useT>) {
  const map = {
    high: { bg: 'bg-rose-500/10 text-rose-600', label: t.mappaDigitale.insights.highRisk },
    medium: { bg: 'bg-amber-500/10 text-amber-600', label: t.mappaDigitale.insights.mediumRisk },
    low: { bg: 'bg-emerald-500/10 text-emerald-600', label: t.mappaDigitale.insights.lowRisk },
  };
  return map[severity];
}

function contentLink(type: 'course' | 'resource' | 'glossary', slug: string) {
  if (type === 'course') return `/percorsi/${slug}`;
  if (type === 'resource') return '/risorse';
  return '/glossario';
}

export function InsightsPanel({ insights }: { insights: ScenarioInsights }) {
  const t = useT();
  const locale = useAppStore((s) => s.locale);

  return (
    <div className="space-y-8">
      {/* Company Exposure */}
      <motion.div custom={0} initial="hidden" animate="visible" variants={fadeUp}>
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Building2 className="h-4 w-4 text-muted-foreground" />
          {t.mappaDigitale.insights.companies}
        </div>
        <div className="mt-3 space-y-2">
          {insights.companyExposure.slice(0, 5).map((company) => (
            <div
              key={company.company}
              className="flex items-center justify-between rounded-lg border border-border/50 bg-card px-4 py-2.5"
            >
              <span className="text-sm font-medium">{company.company}</span>
              <span className="text-xs text-muted-foreground">
                {company.services.length} {t.mappaDigitale.insights.servicesOf}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* AI Training */}
      {insights.aiTrainingCount > 0 && (
        <motion.div custom={1} initial="hidden" animate="visible" variants={fadeUp}>
          <div className="flex items-center gap-2 rounded-xl border border-violet-500/20 bg-violet-500/5 p-4">
            <Brain className="h-5 w-5 flex-shrink-0 text-violet-500" />
            <p className="text-sm">
              <span className="font-semibold text-violet-600">{insights.aiTrainingCount}</span>{' '}
              {t.mappaDigitale.insights.aiTraining}
            </p>
          </div>
        </motion.div>
      )}

      {/* Data Types */}
      <motion.div custom={2} initial="hidden" animate="visible" variants={fadeUp}>
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Database className="h-4 w-4 text-muted-foreground" />
          {t.mappaDigitale.insights.dataTypes} ({insights.totalDataTypes.length})
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {insights.totalDataTypes.map((d) => (
            <span
              key={d}
              className="rounded-md bg-accent px-2.5 py-1 text-xs text-muted-foreground"
            >
              {t.mappaDigitale.dataTypes[d as DataType]}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Category Scores */}
      {insights.categoryScores.length > 0 && (
        <motion.div custom={3} initial="hidden" animate="visible" variants={fadeUp}>
          <div className="flex items-center gap-2 text-sm font-semibold">
            <ShieldAlert className="h-4 w-4 text-muted-foreground" />
            {t.mappaDigitale.insights.categoryScore}
          </div>
          <div className="mt-3 space-y-2">
            {insights.categoryScores.map((cs) => (
              <div key={cs.category} className="flex items-center gap-3">
                <span className="w-28 text-xs text-muted-foreground">
                  {t.mappaDigitale.categories[cs.category]}
                </span>
                <div className="flex-1">
                  <div className="h-2 w-full rounded-full bg-accent">
                    <motion.div
                      className="h-full rounded-full"
                      style={{
                        backgroundColor:
                          cs.score >= 70 ? '#10b981' : cs.score >= 40 ? '#f59e0b' : '#ef4444',
                      }}
                      initial={{ width: 0 }}
                      animate={{ width: `${cs.score}%` }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                    />
                  </div>
                </div>
                <span className="w-8 text-right text-xs font-medium">{cs.score}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Risks */}
      {insights.risks.length > 0 && (
        <motion.div custom={4} initial="hidden" animate="visible" variants={fadeUp}>
          <div className="flex items-center gap-2 text-sm font-semibold">
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            {t.mappaDigitale.insights.risks}
          </div>
          <div className="mt-3 space-y-3">
            {insights.risks.map((risk, i) => {
              const badge = severityBadge(risk.severity, t);
              return (
                <div
                  key={i}
                  className="rounded-xl border border-border/50 bg-card p-4"
                >
                  <div className="flex items-center gap-2">
                    <span className={`rounded-md px-2 py-0.5 text-[10px] font-semibold ${badge.bg}`}>
                      {badge.label}
                    </span>
                    <span className="text-sm font-medium">{risk.title[locale]}</span>
                  </div>
                  <p className="mt-1.5 text-xs text-muted-foreground">
                    {risk.description[locale]}
                  </p>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Quick Wins */}
      {insights.quickWins.length > 0 && (
        <motion.div custom={5} initial="hidden" animate="visible" variants={fadeUp}>
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Lightbulb className="h-4 w-4 text-muted-foreground" />
            {t.mappaDigitale.insights.quickWins}
          </div>
          <div className="mt-3 space-y-3">
            {insights.quickWins.map((win, i) => (
              <div
                key={i}
                className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4"
              >
                <div className="flex items-center gap-2">
                  <span className="rounded-md bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-600">
                    {win.impact === 'high'
                      ? t.mappaDigitale.insights.highImpact
                      : t.mappaDigitale.insights.mediumImpact}
                  </span>
                  <span className="text-sm font-medium">{win.action[locale]}</span>
                </div>
                <p className="mt-1.5 text-xs text-muted-foreground">{win.detail[locale]}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Suggested Content */}
      {insights.suggestedContent.length > 0 && (
        <motion.div custom={6} initial="hidden" animate="visible" variants={fadeUp}>
          <div className="flex items-center gap-2 text-sm font-semibold">
            <BookOpen className="h-4 w-4 text-muted-foreground" />
            {t.mappaDigitale.insights.suggestedContent}
          </div>
          <div className="mt-3 space-y-2">
            {insights.suggestedContent.map((item) => (
              <Link
                key={`${item.type}-${item.slug}`}
                href={contentLink(item.type, item.slug)}
                className="flex items-center justify-between rounded-lg border border-border/50 bg-card px-4 py-3 transition-all hover:border-border hover:shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <span className="rounded-md bg-accent px-2 py-0.5 text-[10px] font-medium text-muted-foreground uppercase">
                    {item.type}
                  </span>
                  <span className="text-sm">{item.slug.replace(/-/g, ' ')}</span>
                </div>
                <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
