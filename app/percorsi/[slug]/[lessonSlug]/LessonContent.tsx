'use client';

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useT } from '@/lib/i18n/useT';
import { useAppStore } from '@/store/useAppStore';
import { getLessonBySlug } from '@/lib/data/lessons';
import type { ContentBlock } from '@/lib/data/courses';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ChevronRight, Info, AlertTriangle, Lightbulb, Quote } from 'lucide-react';
import { SupportBanner } from '@/components/SupportBanner';

type Locale = 'it' | 'en';

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

export default function LessonContent({ slug, lessonSlug }: { slug: string; lessonSlug: string }) {
  const result = getLessonBySlug(slug, lessonSlug);
  const t = useT();
  const locale = useAppStore((s) => s.locale) as Locale;

  if (!result) notFound();

  const { course, lesson, prev, next } = result;

  return (
    <>
      {/* Top bar */}
      <div className="sticky top-16 z-40 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-12 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            href={`/percorsi/${course.slug}`}
            className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{t.percorsi.backToCourse}</span>
            <span className="sm:hidden">{course.title[locale]}</span>
          </Link>
          <span className="text-xs font-medium text-muted-foreground">
            {t.percorsi.lesson} {lesson.order} {t.percorsi.lessonOf} {course.lessonsCount}
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_280px]">
          {/* Main lesson content */}
          <motion.article
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="min-w-0"
          >
            {/* Lesson header */}
            <div className="mb-8">
              <div className="flex items-center gap-3">
                <div className={`flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br ${course.color} text-sm font-bold text-white`}>
                  {lesson.order}
                </div>
                <span className="text-sm text-muted-foreground">{lesson.duration}</span>
              </div>
              <h1 className="mt-4 text-2xl font-bold sm:text-3xl lg:text-4xl">
                {lesson.title[locale]}
              </h1>
              <p className="mt-3 text-lg text-muted-foreground">
                {lesson.description[locale]}
              </p>
            </div>

            {/* Lesson content blocks */}
            <div className="prose-custom">
              {lesson.content.map((block, i) => (
                <ContentBlockRenderer key={i} block={block} locale={locale} />
              ))}
            </div>

            {/* Support banner */}
            <SupportBanner />

            {/* Navigation */}
            <div className="mt-12 flex flex-col gap-3 border-t border-border/50 pt-8 sm:flex-row sm:justify-between">
              {prev ? (
                <Link
                  href={`/percorsi/${course.slug}/${prev.slug}`}
                  className="group flex items-center gap-3 rounded-xl border border-border/50 px-5 py-4 transition-all hover:border-border hover:shadow-sm"
                >
                  <ArrowLeft className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-x-0.5" />
                  <div className="min-w-0">
                    <div className="text-xs text-muted-foreground">{t.percorsi.previousLesson}</div>
                    <div className="mt-0.5 truncate text-sm font-medium">{prev.title[locale]}</div>
                  </div>
                </Link>
              ) : (
                <div />
              )}
              {next ? (
                <Link
                  href={`/percorsi/${course.slug}/${next.slug}`}
                  className="group flex items-center gap-3 rounded-xl border border-border/50 px-5 py-4 text-right transition-all hover:border-border hover:shadow-sm sm:ml-auto"
                >
                  <div className="min-w-0">
                    <div className="text-xs text-muted-foreground">{t.percorsi.nextLesson}</div>
                    <div className="mt-0.5 truncate text-sm font-medium">{next.title[locale]}</div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                </Link>
              ) : (
                <Link
                  href={`/percorsi/${course.slug}`}
                  className={`group flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r ${course.color} px-6 py-4 text-sm font-semibold text-white transition-opacity hover:opacity-90 sm:ml-auto`}
                >
                  {t.percorsi.completeCourse}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </div>
          </motion.article>

          {/* Sidebar - lesson list */}
          <motion.aside
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="sticky top-32">
              <h3 className="text-sm font-semibold">{t.percorsi.courseLessons}</h3>
              <nav className="mt-3 space-y-1">
                {course.lessons.map((l) => {
                  const isCurrent = l.slug === lesson.slug;
                  return (
                    <Link
                      key={l.id}
                      href={`/percorsi/${course.slug}/${l.slug}`}
                      className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors ${
                        isCurrent
                          ? 'bg-accent font-medium text-foreground'
                          : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground'
                      }`}
                    >
                      <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded text-[11px] font-bold ${
                        isCurrent
                          ? `bg-gradient-to-br ${course.color} text-white`
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {l.order}
                      </span>
                      <span className="truncate">{l.title[locale]}</span>
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
