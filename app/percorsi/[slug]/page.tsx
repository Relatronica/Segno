'use client';

import { use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useT } from '@/lib/i18n/useT';
import { useAppStore } from '@/store/useAppStore';
import { getCourseBySlug } from '@/lib/data/lessons';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Clock, BookOpen, ChevronRight } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.45, ease: [0.25, 0.4, 0.25, 1] as const },
  }),
};

export default function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const course = getCourseBySlug(slug);
  const t = useT();
  const locale = useAppStore((s) => s.locale);

  if (!course) notFound();

  const firstLesson = course.lessons[0];

  return (
    <>
      {/* Hero header */}
      <section className={`relative overflow-hidden bg-gradient-to-br ${course.color} py-16 sm:py-24`}>
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <Link
              href="/percorsi"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-white/80 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              {t.percorsi.backToCourses}
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 max-w-3xl"
          >
            <div className="flex items-center gap-3">
              <span className="rounded-lg bg-white/20 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
                {t.percorsi.difficulty[course.difficulty as keyof typeof t.percorsi.difficulty]}
              </span>
              <span className="flex items-center gap-1 text-sm text-white/80">
                <BookOpen className="h-3.5 w-3.5" />
                {course.lessonsCount} {t.percorsi.lessons}
              </span>
              <span className="flex items-center gap-1 text-sm text-white/80">
                <Clock className="h-3.5 w-3.5" />
                {course.duration}
              </span>
            </div>
            <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              {course.title[locale as 'it' | 'en']}
            </h1>
            <p className="mt-4 text-lg text-white/90">
              {course.longDescription?.[locale as 'it' | 'en'] || course.description[locale as 'it' | 'en']}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {course.topics.map((topic) => (
                <span
                  key={topic}
                  className="rounded-md bg-white/15 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm"
                >
                  {topic}
                </span>
              ))}
            </div>
          </motion.div>

          {firstLesson && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="mt-8"
            >
              <Link
                href={`/percorsi/${course.slug}/${firstLesson.slug}`}
                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-gray-900 shadow-lg transition-all hover:shadow-xl hover:scale-[1.02]"
              >
                {t.percorsi.startCourse}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          )}
        </div>
      </section>

      {/* Lessons list */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Main content */}
            <div className="lg:col-span-2">
              <motion.h2
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl font-bold"
              >
                {t.percorsi.courseLessons}
              </motion.h2>

              <div className="mt-6 space-y-3">
                {course.lessons.map((lesson, i) => (
                  <motion.div
                    key={lesson.id}
                    initial="hidden"
                    animate="visible"
                    custom={i}
                    variants={fadeUp}
                  >
                    <Link
                      href={`/percorsi/${course.slug}/${lesson.slug}`}
                      className="group flex items-center gap-4 rounded-xl border border-border/50 bg-card p-4 transition-all hover:shadow-md hover:border-border"
                    >
                      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${course.color} text-sm font-bold text-white`}>
                        {lesson.order}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-medium group-hover:text-foreground">
                          {lesson.title[locale as 'it' | 'en']}
                        </h3>
                        <p className="mt-0.5 truncate text-sm text-muted-foreground">
                          {lesson.description[locale as 'it' | 'en']}
                        </p>
                      </div>
                      <div className="hidden items-center gap-3 sm:flex">
                        <span className="text-xs text-muted-foreground">{lesson.duration}</span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="sticky top-24 rounded-2xl border border-border/50 bg-card p-6"
              >
                <h3 className="font-semibold">{t.percorsi.overview}</h3>
                <dl className="mt-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <dt className="text-muted-foreground">{t.percorsi.difficulty.beginner && locale === 'it' ? 'Difficoltà' : 'Difficulty'}</dt>
                    <dd className="font-medium">{t.percorsi.difficulty[course.difficulty as keyof typeof t.percorsi.difficulty]}</dd>
                  </div>
                  <div className="flex justify-between text-sm">
                    <dt className="text-muted-foreground">{t.percorsi.lessons}</dt>
                    <dd className="font-medium">{course.lessonsCount}</dd>
                  </div>
                  <div className="flex justify-between text-sm">
                    <dt className="text-muted-foreground">{t.percorsi.duration}</dt>
                    <dd className="font-medium">{course.duration}</dd>
                  </div>
                </dl>
                <div className="mt-6 flex flex-wrap gap-1.5">
                  {course.topics.map((topic) => (
                    <span
                      key={topic}
                      className="rounded-md bg-accent px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
                    >
                      {topic}
                    </span>
                  ))}
                </div>

                {firstLesson && (
                  <Link
                    href={`/percorsi/${course.slug}/${firstLesson.slug}`}
                    className={`mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r ${course.color} px-4 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90`}
                  >
                    {t.percorsi.startCourse}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
