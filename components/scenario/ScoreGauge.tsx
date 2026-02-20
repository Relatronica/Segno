'use client';

import { motion } from 'framer-motion';
import { useT } from '@/lib/i18n/useT';

function scoreLabel(score: number, t: ReturnType<typeof useT>) {
  if (score >= 75) return { label: t.mappaDigitale.insights.scoreExcellent, color: 'text-emerald-500' };
  if (score >= 50) return { label: t.mappaDigitale.insights.scoreGood, color: 'text-blue-500' };
  if (score >= 30) return { label: t.mappaDigitale.insights.scoreFair, color: 'text-amber-500' };
  return { label: t.mappaDigitale.insights.scorePoor, color: 'text-rose-500' };
}

function arcColor(score: number) {
  if (score >= 75) return '#10b981';
  if (score >= 50) return '#3b82f6';
  if (score >= 30) return '#f59e0b';
  return '#ef4444';
}

export function ScoreGauge({ score }: { score: number }) {
  const t = useT();
  const { label, color } = scoreLabel(score, t);

  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const filled = (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative h-36 w-36">
        <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            strokeWidth="8"
            className="stroke-accent"
          />
          <motion.circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            strokeWidth="8"
            strokeLinecap="round"
            stroke={arcColor(score)}
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: circumference - filled }}
            transition={{ duration: 1.2, ease: [0.25, 0.4, 0.25, 1], delay: 0.3 }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className="text-3xl font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {score}
          </motion.span>
          <span className={`text-xs font-medium ${color}`}>{label}</span>
        </div>
      </div>
      <span className="mt-2 text-sm font-medium text-muted-foreground">
        {t.mappaDigitale.insights.privacyScore}
      </span>
    </div>
  );
}
