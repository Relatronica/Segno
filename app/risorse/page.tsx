'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useT } from '@/lib/i18n/useT';
import { useAppStore } from '@/store/useAppStore';
import { resources } from '@/lib/data/resources';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  BookOpen,
  Wrench,
  FileText,
  Scale,
  Landmark,
  Eye,
  Mail,
  Globe,
  KeyRound,
  Shield,
  Lock,
  HardDrive,
  HeartPulse,
  FileSearch,
  Brain,
  Clock,
  Search,
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Mail, Globe, FileText, KeyRound, Eye, Landmark, BookOpen, Wrench, Scale,
  Shield, Lock, HardDrive, HeartPulse, FileSearch, Brain,
};

const categoryFilters = ['all', 'guide', 'tools', 'research', 'legal'] as const;

const categoryColors: Record<string, { bg: string; text: string; badge: string }> = {
  guide: { bg: 'bg-blue-500/10', text: 'text-blue-600', badge: 'bg-blue-500/10 text-blue-600' },
  tools: { bg: 'bg-emerald-500/10', text: 'text-emerald-600', badge: 'bg-emerald-500/10 text-emerald-600' },
  research: { bg: 'bg-violet-500/10', text: 'text-violet-600', badge: 'bg-violet-500/10 text-violet-600' },
  legal: { bg: 'bg-amber-500/10', text: 'text-amber-600', badge: 'bg-amber-500/10 text-amber-600' },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.4, ease: [0.25, 0.4, 0.25, 1] as const },
  }),
};

export default function RisorsePage() {
  const t = useT();
  const locale = useAppStore((s) => s.locale);
  const [activeFilter, setActiveFilter] = useState<(typeof categoryFilters)[number]>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = resources.filter((r) => {
    const matchesCategory = activeFilter === 'all' || r.category === activeFilter;
    const matchesSearch =
      searchQuery === '' ||
      r.title[locale].toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.description[locale].toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden border-b border-border/50">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-accent/50 to-background" />
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">{t.risorse.title}</h1>
            <p className="mt-3 max-w-2xl text-lg text-muted-foreground">{t.risorse.subtitle}</p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mt-8 flex flex-wrap gap-6"
          >
            {categoryFilters.filter((c) => c !== 'all').map((cat) => {
              const count = resources.filter((r) => r.category === cat).length;
              const colors = categoryColors[cat];
              return (
                <div key={cat} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className={`inline-flex h-6 w-6 items-center justify-center rounded-md text-xs font-bold ${colors.badge}`}>
                    {count}
                  </span>
                  {t.risorse.categories[cat]}
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Toolbar: search + filters */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Search */}
            <div className="relative max-w-xs flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.risorse.searchPlaceholder}
                className="h-10 w-full rounded-lg border border-border/50 bg-card pl-9 pr-4 text-sm outline-none transition-colors focus:border-foreground/30 focus:ring-1 focus:ring-foreground/10"
              />
            </div>

            {/* Category filters */}
            <div className="flex flex-wrap gap-2">
              {categoryFilters.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                    activeFilter === cat
                      ? 'bg-foreground text-background shadow-sm'
                      : 'bg-accent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {t.risorse.categories[cat]}
                </button>
              ))}
            </div>
          </div>

          {/* Resources grid */}
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((resource, i) => {
                const Icon = iconMap[resource.icon] || FileText;
                const colors = categoryColors[resource.category];
                return (
                  <motion.div
                    key={resource.id}
                    layout
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, scale: 0.95 }}
                    custom={i}
                    variants={fadeUp}
                  >
                    <Link
                      href={`/risorse/${resource.slug}`}
                      className="group flex h-full flex-col rounded-2xl border border-border/50 bg-card p-6 transition-all hover:shadow-lg hover:border-border"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`inline-flex rounded-lg p-2.5 ${colors.bg} ${colors.text}`}>
                            <Icon className="h-4 w-4" />
                          </div>
                          <span className={`rounded-md px-2 py-0.5 text-xs font-medium ${colors.badge}`}>
                            {t.risorse.categories[resource.category]}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {resource.readTime}
                        </div>
                      </div>
                      <h3 className="mt-4 font-semibold group-hover:text-foreground">
                        {resource.title[locale]}
                      </h3>
                      <p className="mt-2 flex-1 text-sm text-muted-foreground line-clamp-3">
                        {resource.description[locale]}
                      </p>
                      <div className="mt-5 flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors group-hover:text-foreground">
                        {t.risorse.readMore}
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Empty state */}
          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-20 text-center"
            >
              <Search className="mx-auto h-10 w-10 text-muted-foreground/30" />
              <p className="mt-4 text-muted-foreground">{t.risorse.noResults}</p>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}
