'use client';

import { useState, useCallback } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe, Search, Mail, MessageCircle, Cloud, Users, MapPin,
  Brain, Check, ShieldCheck, Code2, ArrowRight, X, GripVertical,
  KeyRound, Shield, Monitor, Video, FileText,
} from 'lucide-react';
import {
  categories, type ToolCategory, type StackTool,
  calculateSovereigntyScore, getToolById, getToolsByCategory,
  getPrivacyColor, getScoreColor, getScoreLabel, buildEmptySelections,
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

const privacyDots = (score: number) => {
  const filled = Math.round(score / 2);
  return Array.from({ length: 5 }, (_, i) => (
    <span
      key={i}
      className={`inline-block h-1.5 w-1.5 rounded-full ${
        i < filled ? 'bg-current' : 'bg-current/20'
      }`}
    />
  ));
};

type Translations = {
  builderTitle: string;
  toolsTitle: string;
  emptySlot: string;
  dragHint: string;
  company: string;
  openSource: string;
  privacyScore: string;
  ethical: string;
  sovereigntyScore: string;
  seeResults: string;
  fillMore: string;
  excellent: string;
  good: string;
  fair: string;
  poor: string;
};

type Props = {
  t: Translations;
  onComplete: (selections: Record<ToolCategory, string | null>) => void;
};

export function StackBuilder({ t, onComplete }: Props) {
  const locale = useAppStore((s) => s.locale);

  const [selectedTools, setSelectedTools] = useState<Record<ToolCategory, string | null>>(buildEmptySelections);

  const [activeCategory, setActiveCategory] = useState<ToolCategory>('browser');
  const [dragOverSlot, setDragOverSlot] = useState<ToolCategory | null>(null);

  const filledCount = Object.values(selectedTools).filter(Boolean).length;
  const score = calculateSovereigntyScore(selectedTools);
  const scoreLabel = getScoreLabel(score);
  const scoreColorClass = getScoreColor(score);

  const selectTool = useCallback((toolId: string, category: ToolCategory) => {
    setSelectedTools((prev) => ({
      ...prev,
      [category]: prev[category] === toolId ? null : toolId,
    }));
  }, []);

  const removeTool = useCallback((category: ToolCategory) => {
    setSelectedTools((prev) => ({ ...prev, [category]: null }));
  }, []);

  const handleDragStart = (e: React.DragEvent, tool: StackTool) => {
    e.dataTransfer.setData('application/json', JSON.stringify({ id: tool.id, category: tool.category }));
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, category: ToolCategory) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverSlot(category);
  };

  const handleDragLeave = () => {
    setDragOverSlot(null);
  };

  const handleDrop = (e: React.DragEvent, slotCategory: ToolCategory) => {
    e.preventDefault();
    setDragOverSlot(null);
    try {
      const data = JSON.parse(e.dataTransfer.getData('application/json'));
      if (data.category === slotCategory) {
        selectTool(data.id, slotCategory);
      }
    } catch { /* invalid data */ }
  };

  const activeCategoryTools = getToolsByCategory(activeCategory);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      {/* Score bar */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 rounded-2xl border border-border/50 bg-card p-4 sm:p-6"
      >
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-3">
            <ShieldCheck className={`h-6 w-6 ${filledCount > 0 ? scoreColorClass : 'text-muted-foreground'}`} />
            <div>
              <p className="text-sm font-medium text-muted-foreground">{t.sovereigntyScore}</p>
              <div className="flex items-baseline gap-2">
                <motion.span
                  key={score}
                  initial={{ scale: 1.3, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className={`text-2xl font-bold ${filledCount > 0 ? scoreColorClass : 'text-muted-foreground'}`}
                >
                  {score}
                </motion.span>
                <span className="text-sm text-muted-foreground">/100</span>
                {filledCount > 0 && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`text-sm font-medium ${scoreColorClass}`}
                  >
                    {t[scoreLabel]}
                  </motion.span>
                )}
              </div>
            </div>
          </div>

          <div className="flex w-full items-center gap-3 sm:w-80">
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
              <motion.div
                className="h-full rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${score}%` }}
                transition={{ type: 'spring', bounce: 0.15, duration: 0.6 }}
                style={{
                  background: filledCount > 0
                    ? `linear-gradient(90deg, ${score <= 25 ? '#ef4444' : score <= 50 ? '#f59e0b' : score <= 75 ? '#10b981' : '#22c55e'}, ${score <= 25 ? '#f87171' : score <= 50 ? '#fbbf24' : score <= 75 ? '#34d399' : '#4ade80'})`
                    : '#a3a3a3',
                }}
              />
            </div>
            <span className="text-xs text-muted-foreground">{filledCount}/{categories.length}</span>
          </div>
        </div>
      </motion.div>

      {/* Stack grid */}
      <div>
        <h2 className="mb-4 text-lg font-semibold">{t.builderTitle}</h2>
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {categories.map((cat, i) => {
            const Icon = categoryIcons[cat.id];
            const selectedId = selectedTools[cat.id];
            const selectedTool = selectedId ? getToolById(selectedId) : null;
            const isDragOver = dragOverSlot === cat.id;
            const isActive = activeCategory === cat.id;

            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className={`relative cursor-pointer rounded-xl border-2 p-3 transition-all ${
                  isDragOver
                    ? 'border-emerald-400 bg-emerald-500/5 scale-[1.02] shadow-lg shadow-emerald-500/10'
                    : selectedTool
                      ? 'border-border bg-card shadow-sm'
                      : isActive
                        ? 'border-foreground/30 bg-accent'
                        : 'border-dashed border-border bg-muted/40 hover:border-foreground/20 hover:bg-accent/60'
                }`}
                onClick={() => setActiveCategory(cat.id)}
                onDragOver={(e) => handleDragOver(e, cat.id)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, cat.id)}
              >
                <div className="flex items-center gap-2">
                  <div className={`inline-flex shrink-0 rounded-lg p-1.5 ${cat.colorClass}`}>
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                  <span className="truncate text-xs font-medium text-muted-foreground">
                    {cat.name[locale]}
                  </span>
                </div>

                <AnimatePresence mode="wait">
                  {selectedTool ? (
                    <motion.div
                      key={selectedTool.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ type: 'spring', bounce: 0.3, duration: 0.4 }}
                      className="mt-2"
                    >
                      <p className="truncate text-sm font-semibold">{selectedTool.name}</p>
                      <div className="mt-1 flex items-center gap-1.5">
                        <div className={`flex items-center gap-0.5 ${getPrivacyColor(selectedTool.privacyScore).split(' ')[0]}`}>
                          {privacyDots(selectedTool.privacyScore)}
                        </div>
                        {selectedTool.isEthical && (
                          <Check className="h-3.5 w-3.5 text-green-500" />
                        )}
                      </div>
                      <button
                        onClick={(e) => { e.stopPropagation(); removeTool(cat.id); }}
                        className="absolute right-2 top-2 rounded-md p-0.5 text-muted-foreground/50 transition-colors hover:text-foreground"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </motion.div>
                  ) : (
                    <motion.p
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="mt-2 text-xs text-muted-foreground/60"
                    >
                      {t.emptySlot}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* See results button */}
        <div className="mt-5">
          <AnimatePresence>
            {filledCount >= 4 ? (
              <motion.button
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                onClick={() => onComplete(selectedTools)}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-foreground px-6 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90 sm:w-auto"
              >
                {t.seeResults}
                <ArrowRight className="h-4 w-4" />
              </motion.button>
            ) : (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-sm text-muted-foreground"
              >
                {t.fillMore}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Divider */}
      <div className="my-8 h-px bg-border/50" />

      {/* Tool palette */}
      <div>
        <h2 className="mb-4 text-lg font-semibold">{t.toolsTitle}</h2>

        {/* Category tabs */}
        <div className="mb-5 flex flex-wrap gap-1.5">
          {categories.map((cat) => {
            const Icon = categoryIcons[cat.id];
            const isActive = activeCategory === cat.id;
            const hasSelection = selectedTools[cat.id] !== null;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`relative flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-foreground text-background'
                    : 'bg-accent/50 text-muted-foreground hover:bg-accent hover:text-foreground'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">{cat.name[locale]}</span>
                {hasSelection && !isActive && (
                  <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-green-500" />
                )}
              </button>
            );
          })}
        </div>

        {/* Tools grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.2 }}
            className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {activeCategoryTools.map((tool) => {
              const isSelected = selectedTools[tool.category] === tool.id;
              const privacyColorClass = getPrivacyColor(tool.privacyScore);

              return (
                <motion.div
                  key={tool.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e as unknown as React.DragEvent, tool)}
                  onClick={() => selectTool(tool.id, tool.category)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`group relative cursor-grab rounded-xl border-2 p-4 transition-all active:cursor-grabbing ${
                    isSelected
                      ? 'border-emerald-400 bg-emerald-500/5 shadow-sm'
                      : 'border-border/50 bg-card hover:border-border hover:shadow-md'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="truncate text-sm font-semibold">{tool.name}</h3>
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500"
                          >
                            <Check className="h-3 w-3 text-white" />
                          </motion.div>
                        )}
                      </div>
                      <p className="mt-0.5 text-xs text-muted-foreground">{tool.company}</p>
                    </div>
                    <GripVertical className="h-4 w-4 shrink-0 text-muted-foreground/30 transition-colors group-hover:text-muted-foreground/60" />
                  </div>

                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {tool.description[locale]}
                  </p>

                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <div className={`flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium ${privacyColorClass}`}>
                      <span className="flex gap-0.5">{privacyDots(tool.privacyScore)}</span>
                      <span>{tool.privacyScore}/10</span>
                    </div>
                    {tool.isEthical && (
                      <span className="inline-flex items-center gap-1 rounded-md bg-green-500/10 px-2 py-0.5 text-xs font-medium text-green-600">
                        <ShieldCheck className="h-3 w-3" />
                        {t.ethical}
                      </span>
                    )}
                    {tool.openSource && (
                      <span className="inline-flex items-center gap-1 rounded-md bg-blue-500/10 px-2 py-0.5 text-xs font-medium text-blue-600">
                        <Code2 className="h-3 w-3" />
                        {t.openSource}
                      </span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        <p className="mt-4 text-center text-xs text-muted-foreground/60">
          {t.dragHint}
        </p>
      </div>
    </div>
  );
}
