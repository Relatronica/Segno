'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/store/useAppStore';
import { motion } from 'framer-motion';
import {
  Globe, Search, Mail, MessageCircle, Cloud, Users, MapPin,
  Brain, ArrowRight, RotateCcw, ShieldCheck, Code2, ArrowRightLeft,
  BookOpen, KeyRound, Shield, Monitor, Video, FileText,
} from 'lucide-react';
import {
  categories, type ToolCategory, type StackTool,
  calculateSovereigntyScore, getToolById, getScoreLabel,
  getScoreStrokeColor, getPrivacyColor, getBestEthicalAlternative,
  getCategoryMeta,
} from '@/lib/data/stack-tools';

const categoryIcons: Record<ToolCategory, React.ElementType> = {
  browser: Globe,
  search: Search,
  email: Mail,
  messaging: MessageCircle,
  cloud: Cloud,
  social: Users,
  maps: MapPin,
  ai: Brain,
  password: KeyRound,
  vpn: Shield,
  os: Monitor,
  videoconference: Video,
  notes: FileText,
};

const CIRCLE_RADIUS = 80;
const CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS;

type Translations = {
  resultTitle: string;
  excellent: string;
  good: string;
  fair: string;
  poor: string;
  excellentDesc: string;
  goodDesc: string;
  fairDesc: string;
  poorDesc: string;
  categoryBreakdown: string;
  improvements: string;
  replaceWith: string;
  instead: string;
  restart: string;
  exploreResources: string;
  privacyScore: string;
  ethical: string;
  openSource: string;
  yourScore: string;
};

type Props = {
  t: Translations;
  selectedTools: Record<ToolCategory, string | null>;
  onRestart: () => void;
};

export function StackResults({ t, selectedTools, onRestart }: Props) {
  const locale = useAppStore((s) => s.locale);
  const score = calculateSovereigntyScore(selectedTools);
  const label = getScoreLabel(score);
  const strokeColor = getScoreStrokeColor(score);
  const offset = CIRCUMFERENCE - (score / 100) * CIRCUMFERENCE;

  const improvements = useMemo(() => {
    const result: { current: StackTool; alternative: StackTool; category: ToolCategory }[] = [];
    for (const cat of categories) {
      const toolId = selectedTools[cat.id];
      if (!toolId) continue;
      const tool = getToolById(toolId);
      if (!tool || tool.isEthical) continue;
      const alt = getBestEthicalAlternative(cat.id);
      if (alt) result.push({ current: tool, alternative: alt, category: cat.id });
    }
    return result;
  }, [selectedTools]);

  const filledCategories = useMemo(() => {
    return categories
      .map((cat) => {
        const toolId = selectedTools[cat.id];
        const tool = toolId ? getToolById(toolId) : null;
        return { category: cat, tool };
      })
      .filter((c) => c.tool !== null) as { category: typeof categories[0]; tool: StackTool }[];
  }, [selectedTools]);

  const ethicalCount = filledCategories.filter((c) => c.tool.isEthical).length;
  const openSourceCount = filledCategories.filter((c) => c.tool.openSource).length;

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-20 lg:px-8">
      {/* Score circle */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-2xl font-bold sm:text-3xl">{t.resultTitle}</h1>

        <div className="mx-auto mt-10 flex items-center justify-center">
          <div className="relative">
            <svg width="200" height="200" viewBox="0 0 200 200">
              <circle
                cx="100"
                cy="100"
                r={CIRCLE_RADIUS}
                fill="none"
                stroke="currentColor"
                className="text-muted/50"
                strokeWidth="10"
              />
              <motion.circle
                cx="100"
                cy="100"
                r={CIRCLE_RADIUS}
                fill="none"
                stroke={strokeColor}
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={CIRCUMFERENCE}
                initial={{ strokeDashoffset: CIRCUMFERENCE }}
                animate={{ strokeDashoffset: offset }}
                transition={{ duration: 1.5, ease: [0.25, 0.4, 0.25, 1] }}
                transform="rotate(-90 100 100)"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="text-4xl font-bold"
                style={{ color: strokeColor }}
              >
                {score}
              </motion.span>
              <span className="text-xs text-muted-foreground">{t.yourScore}</span>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-6"
        >
          <span
            className="inline-flex rounded-full px-4 py-1.5 text-sm font-semibold"
            style={{ color: strokeColor, backgroundColor: `${strokeColor}15` }}
          >
            {t[label]}
          </span>
          <p className="mt-3 text-muted-foreground">
            {t[`${label}Desc`]}
          </p>
        </motion.div>

        {/* Quick stats */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mx-auto mt-8 flex max-w-md justify-center gap-6"
        >
          <div className="text-center">
            <p className="text-2xl font-bold text-emerald-500">{ethicalCount}</p>
            <p className="text-xs text-muted-foreground">{t.ethical}</p>
          </div>
          <div className="h-10 w-px bg-border" />
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-500">{openSourceCount}</p>
            <p className="text-xs text-muted-foreground">{t.openSource}</p>
          </div>
          <div className="h-10 w-px bg-border" />
          <div className="text-center">
            <p className="text-2xl font-bold">{filledCategories.length}</p>
            <p className="text-xs text-muted-foreground">categorie</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Category breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="mt-16"
      >
        <h2 className="text-xl font-bold">{t.categoryBreakdown}</h2>
        <div className="mt-6 space-y-3">
          {filledCategories.map(({ category: cat, tool }, i) => {
            const Icon = categoryIcons[cat.id];
            const barWidth = (tool.privacyScore / 10) * 100;
            const privacyColorClasses = getPrivacyColor(tool.privacyScore);

            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.3 + i * 0.08 }}
                className="rounded-xl border border-border/50 bg-card p-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`inline-flex rounded-lg p-2 ${cat.colorClass}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{tool.name}</p>
                      <p className="text-xs text-muted-foreground">{cat.name[locale]}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {tool.isEthical && (
                      <ShieldCheck className="h-4 w-4 text-green-500" />
                    )}
                    {tool.openSource && (
                      <Code2 className="h-4 w-4 text-blue-500" />
                    )}
                    <span className={`rounded-md px-2 py-0.5 text-xs font-bold ${privacyColorClasses}`}>
                      {tool.privacyScore}/10
                    </span>
                  </div>
                </div>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${barWidth}%` }}
                    transition={{ delay: 1.5 + i * 0.08, duration: 0.6, ease: 'easeOut' }}
                    className="h-full rounded-full"
                    style={{
                      backgroundColor: tool.privacyScore <= 3
                        ? '#ef4444'
                        : tool.privacyScore <= 6
                          ? '#f59e0b'
                          : tool.privacyScore <= 8
                            ? '#10b981'
                            : '#22c55e',
                    }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Improvements */}
      {improvements.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8 }}
          className="mt-12"
        >
          <h2 className="text-xl font-bold">{t.improvements}</h2>
          <div className="mt-6 space-y-3">
            {improvements.map(({ current, alternative, category }) => {
              const cat = getCategoryMeta(category);
              const Icon = categoryIcons[category];
              return (
                <div
                  key={category}
                  className="flex flex-col items-center gap-3 rounded-xl border border-border/50 bg-card p-4 sm:flex-row"
                >
                  <div className={`inline-flex rounded-lg p-2 ${cat.colorClass}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex flex-1 flex-col items-center gap-2 text-center sm:flex-row sm:text-left">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-medium text-muted-foreground line-through">
                        {current.name}
                      </span>
                      <span className={`rounded-md px-1.5 py-0.5 text-xs font-bold ${getPrivacyColor(current.privacyScore)}`}>
                        {current.privacyScore}/10
                      </span>
                    </div>
                    <ArrowRightLeft className="h-4 w-4 shrink-0 text-muted-foreground" />
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-semibold text-green-600">
                        {alternative.name}
                      </span>
                      <span className={`rounded-md px-1.5 py-0.5 text-xs font-bold ${getPrivacyColor(alternative.privacyScore)}`}>
                        {alternative.privacyScore}/10
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
        className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
      >
        <button
          onClick={onRestart}
          className="inline-flex items-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-semibold transition-colors hover:bg-accent"
        >
          <RotateCcw className="h-4 w-4" />
          {t.restart}
        </button>
        <Link
          href="/risorse"
          className="inline-flex items-center gap-2 rounded-xl bg-foreground px-6 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90"
        >
          <BookOpen className="h-4 w-4" />
          {t.exploreResources}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </motion.div>
    </div>
  );
}
