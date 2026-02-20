'use client';

import Link from 'next/link';
import { useT } from '@/lib/i18n/useT';
import { useAppStore } from '@/store/useAppStore';
import { courses } from '@/lib/data/courses';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, BookOpen } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.25, 0.4, 0.25, 1] as const },
  }),
};

export default function PercorsiContent() {
  const t = useT();
  const locale = useAppStore((s) => s.locale);

  return (
    <>
      {/* Header */}
      <section className="border-b border-border/50 bg-muted/30 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold sm:text-4xl"
          >
            {t.percorsi.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-3 max-w-2xl text-muted-foreground"
          >
            {t.percorsi.subtitle}
          </motion.p>
        </div>
      </section>

      {/* Course grid */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course, i) => (
              <motion.div
                key={course.id}
                initial="hidden"
                animate="visible"
                custom={i}
                variants={fadeUp}
              >
                <Link href={`/percorsi/${course.slug}`} className="group flex h-full flex-col rounded-2xl border border-border/50 bg-card transition-all hover:shadow-lg hover:border-border">
                  {/* Gradient header */}
                  <div className={`rounded-t-2xl bg-gradient-to-br ${course.color} p-6`}>
                    <div className="flex items-center justify-between">
                      <span className="rounded-lg bg-white/20 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
                        {t.percorsi.difficulty[course.difficulty]}
                      </span>
                    </div>
                    <h2 className="mt-4 text-lg font-bold text-white">
                      {course.title[locale]}
                    </h2>
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-6">
                    <p className="flex-1 text-sm text-muted-foreground">
                      {course.description[locale]}
                    </p>

                    <div className="mt-6 flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <BookOpen className="h-3.5 w-3.5" />
                        {course.lessonsCount} {t.percorsi.lessons}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {course.duration}
                      </span>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {course.topics.map((topic) => (
                        <span
                          key={topic}
                          className="rounded-md bg-accent px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>

                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium transition-colors group-hover:text-foreground">
                      {t.percorsi.startCourse}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
