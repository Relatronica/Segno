'use client';

import { use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useT } from '@/lib/i18n/useT';
import { useAppStore } from '@/store/useAppStore';
import { getResourceBySlug, resources } from '@/lib/data/resources';
import type { ContentBlock } from '@/lib/data/courses';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  Info,
  AlertTriangle,
  Lightbulb,
  Quote,
  Clock,
  BookOpen,
  Wrench,
  FileText,
  Scale,
} from 'lucide-react';

type Locale = 'it' | 'en';

const categoryIcons: Record<string, React.ElementType> = {
  guide: BookOpen,
  tools: Wrench,
  research: FileText,
  legal: Scale,
};

const categoryColor: Record<string, string> = {
  guide: 'bg-blue-500/10 text-blue-600',
  tools: 'bg-emerald-500/10 text-emerald-600',
  research: 'bg-violet-500/10 text-violet-600',
  legal: 'bg-amber-500/10 text-amber-600',
};

function ContentBlockRenderer({ block, locale }: { block: ContentBlock; locale: Locale }) {
  switch (block.type) {
    case 'heading':
      return (
        <h2 className="mt-10 mb-4 text-xl font-bold sm:text-2xl">
          {block.content[locale]}
        </h2>
      );
    case 'text':
      return (
        <p className="mb-4 leading-relaxed text-muted-foreground">
          {block.content[locale]}
        </p>
      );
    case 'list':
      return (
        <ul className="mb-6 space-y-2 pl-1">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3 text-muted-foreground">
              <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-foreground/40" />
              <span className="leading-relaxed">{item[locale]}</span>
            </li>
          ))}
        </ul>
      );
    case 'callout': {
      const variants = {
        info: { icon: Info, bg: 'bg-blue-500/5 border-blue-500/20', iconColor: 'text-blue-500' },
        warning: { icon: AlertTriangle, bg: 'bg-amber-500/5 border-amber-500/20', iconColor: 'text-amber-500' },
        tip: { icon: Lightbulb, bg: 'bg-emerald-500/5 border-emerald-500/20', iconColor: 'text-emerald-500' },
      };
      const v = variants[block.variant];
      const Icon = v.icon;
      return (
        <div className={`mb-6 flex gap-3 rounded-xl border p-4 ${v.bg}`}>
          <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${v.iconColor}`} />
          <p className="text-sm leading-relaxed">{block.content[locale]}</p>
        </div>
      );
    }
    case 'quote':
      return (
        <blockquote className="mb-6 flex gap-3 border-l-2 border-foreground/20 pl-4">
          <div>
            <Quote className="mb-1 h-4 w-4 text-muted-foreground/50" />
            <p className="italic leading-relaxed text-muted-foreground">
              {block.content[locale]}
            </p>
            {block.author && (
              <cite className="mt-2 block text-sm font-medium not-italic">— {block.author}</cite>
            )}
          </div>
        </blockquote>
      );
    default:
      return null;
  }
}

export default function ResourceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const resource = getResourceBySlug(slug);
  const t = useT();
  const locale = useAppStore((s) => s.locale) as Locale;

  if (!resource) notFound();

  const currentIndex = resources.findIndex((r) => r.slug === slug);
  const prev = currentIndex > 0 ? resources[currentIndex - 1] : null;
  const next = currentIndex < resources.length - 1 ? resources[currentIndex + 1] : null;

  const CategoryIcon = categoryIcons[resource.category] || FileText;

  return (
    <>
      {/* Top bar */}
      <div className="sticky top-16 z-40 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-12 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            href="/risorse"
            className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            {t.risorse.title}
          </Link>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />
            {resource.readTime}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_280px]">
          {/* Main content */}
          <motion.article
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="min-w-0"
          >
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3">
                <div className={`inline-flex rounded-lg p-2 ${categoryColor[resource.category]}`}>
                  <CategoryIcon className="h-4 w-4" />
                </div>
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {t.risorse.categories[resource.category]}
                </span>
              </div>
              <h1 className="mt-4 text-2xl font-bold sm:text-3xl lg:text-4xl">
                {resource.title[locale]}
              </h1>
              <p className="mt-3 text-lg text-muted-foreground">
                {resource.description[locale]}
              </p>
            </div>

            {/* Content blocks */}
            <div className="prose-custom">
              {resource.content.map((block, i) => (
                <ContentBlockRenderer key={i} block={block} locale={locale} />
              ))}
            </div>

            {/* Navigation */}
            <div className="mt-12 flex flex-col gap-3 border-t border-border/50 pt-8 sm:flex-row sm:justify-between">
              {prev ? (
                <Link
                  href={`/risorse/${prev.slug}`}
                  className="group flex items-center gap-3 rounded-xl border border-border/50 px-5 py-4 transition-all hover:border-border hover:shadow-sm"
                >
                  <ArrowLeft className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-x-0.5" />
                  <div className="min-w-0">
                    <div className="text-xs text-muted-foreground">{t.common.back}</div>
                    <div className="mt-0.5 truncate text-sm font-medium">{prev.title[locale]}</div>
                  </div>
                </Link>
              ) : (
                <div />
              )}
              {next ? (
                <Link
                  href={`/risorse/${next.slug}`}
                  className="group flex items-center gap-3 rounded-xl border border-border/50 px-5 py-4 text-right transition-all hover:border-border hover:shadow-sm sm:ml-auto"
                >
                  <div className="min-w-0">
                    <div className="text-xs text-muted-foreground">{t.common.next}</div>
                    <div className="mt-0.5 truncate text-sm font-medium">{next.title[locale]}</div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                </Link>
              ) : (
                <div />
              )}
            </div>
          </motion.article>

          {/* Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="sticky top-32">
              <h3 className="text-sm font-semibold">{t.risorse.allResources}</h3>
              <nav className="mt-3 space-y-1">
                {resources.map((r) => {
                  const isCurrent = r.slug === slug;
                  const Icon = categoryIcons[r.category] || FileText;
                  return (
                    <Link
                      key={r.id}
                      href={`/risorse/${r.slug}`}
                      className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors ${
                        isCurrent
                          ? 'bg-accent font-medium text-foreground'
                          : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground'
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5 shrink-0" />
                      <span className="truncate">{r.title[locale]}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </motion.aside>
        </div>
      </div>
    </>
  );
}
