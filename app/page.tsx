'use client';

import Link from 'next/link';
import { useT } from '@/lib/i18n/useT';
import { useAppStore } from '@/store/useAppStore';
import { courses } from '@/lib/data/courses';
import { resources } from '@/lib/data/resources';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Scale, Megaphone, BookOpen, Wrench, FileText, Fingerprint, Blocks } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.25, 0.4, 0.25, 1] as const },
  }),
};

const pillars = [
  { icon: Shield, colorClass: 'bg-blue-500/10 text-blue-600' },
  { icon: Scale, colorClass: 'bg-violet-500/10 text-violet-600' },
  { icon: Megaphone, colorClass: 'bg-rose-500/10 text-rose-600' },
];

const categoryIcons: Record<string, React.ElementType> = {
  guide: BookOpen,
  tools: Wrench,
  research: FileText,
  legal: Scale,
};

export default function Home() {
  const t = useT();
  const locale = useAppStore((s) => s.locale);
  const featuredCourses = courses.slice(0, 3);
  const featuredResources = resources.slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-accent/50 to-background" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,119,198,0.15),transparent)]" />
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
          <motion.div
            initial="hidden"
            animate="visible"
            className="mx-auto max-w-3xl text-center"
          >
            <motion.h1
              custom={0}
              variants={fadeUp}
              className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
            >
              {t.hero.title}
            </motion.h1>
            <motion.p
              custom={1}
              variants={fadeUp}
              className="mt-6 text-lg text-muted-foreground sm:text-xl"
            >
              {t.hero.subtitle}
            </motion.p>
            <motion.div
              custom={2}
              variants={fadeUp}
              className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <Link
                href="/percorsi"
                className="inline-flex items-center gap-2 rounded-xl bg-foreground px-6 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90"
              >
                {t.hero.cta}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/risorse"
                className="inline-flex items-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-semibold transition-colors hover:bg-accent"
              >
                {t.hero.ctaSecondary}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Why digital sovereignty */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="text-center"
          >
            <motion.h2 custom={0} variants={fadeUp} className="text-3xl font-bold sm:text-4xl">
              {t.home.whyTitle}
            </motion.h2>
            <motion.p custom={1} variants={fadeUp} className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              {t.home.whySubtitle}
            </motion.p>
          </motion.div>

          <div className="mt-16 grid gap-8 sm:grid-cols-3">
            {pillars.map((pillar, i) => {
              const Icon = pillar.icon;
              const pillarKey = `pillar${i + 1}` as 'pillar1' | 'pillar2' | 'pillar3';
              return (
                <motion.div
                  key={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-80px' }}
                  custom={i}
                  variants={fadeUp}
                  className="rounded-2xl border border-border/50 bg-card p-8 transition-shadow hover:shadow-lg"
                >
                  <div className={`inline-flex rounded-xl p-3 ${pillar.colorClass}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{t.home[`${pillarKey}Title`]}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{t.home[`${pillarKey}Desc`]}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured courses */}
      <section className="border-y border-border/50 bg-muted/30 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="flex items-end justify-between"
          >
            <div>
              <motion.h2 custom={0} variants={fadeUp} className="text-3xl font-bold sm:text-4xl">
                {t.sections.percorsi.title}
              </motion.h2>
              <motion.p custom={1} variants={fadeUp} className="mt-2 text-muted-foreground">
                {t.sections.percorsi.subtitle}
              </motion.p>
            </div>
            <motion.div custom={2} variants={fadeUp} className="hidden sm:block">
              <Link
                href="/percorsi"
                className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {t.common.seeAll}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </motion.div>
          </motion.div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredCourses.map((course, i) => (
              <motion.div
                key={course.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                custom={i}
                variants={fadeUp}
              >
                <Link
                  href={`/percorsi/${course.slug}`}
                  className="group block rounded-2xl border border-border/50 bg-card p-6 transition-all hover:shadow-lg hover:border-border"
                >
                  <div className={`inline-flex rounded-xl bg-gradient-to-br ${course.color} p-3`}>
                    <div className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="mt-4 font-semibold group-hover:text-foreground">
                    {course.title[locale]}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                    {course.description[locale]}
                  </p>
                  <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="rounded-md bg-accent px-2 py-1 font-medium">
                      {t.percorsi.difficulty[course.difficulty]}
                    </span>
                    <span>{course.lessonsCount} {t.percorsi.lessons}</span>
                    <span>{course.duration}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/percorsi"
              className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {t.common.seeAll}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured resources */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="flex items-end justify-between"
          >
            <div>
              <motion.h2 custom={0} variants={fadeUp} className="text-3xl font-bold sm:text-4xl">
                {t.sections.risorse.title}
              </motion.h2>
              <motion.p custom={1} variants={fadeUp} className="mt-2 text-muted-foreground">
                {t.sections.risorse.subtitle}
              </motion.p>
            </div>
            <motion.div custom={2} variants={fadeUp} className="hidden sm:block">
              <Link
                href="/risorse"
                className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {t.common.seeAll}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </motion.div>
          </motion.div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredResources.map((resource, i) => {
              const CategoryIcon = categoryIcons[resource.category] || FileText;
              return (
                <motion.div
                  key={resource.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-60px' }}
                  custom={i}
                  variants={fadeUp}
                >
                  <Link
                    href={`/risorse`}
                    className="group block rounded-2xl border border-border/50 bg-card p-6 transition-all hover:shadow-lg hover:border-border"
                  >
                    <div className="flex items-center gap-3">
                      <div className="inline-flex rounded-lg bg-accent p-2.5">
                        <CategoryIcon className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        {t.risorse.categories[resource.category]}
                      </span>
                    </div>
                    <h3 className="mt-4 font-semibold group-hover:text-foreground">
                      {resource.title[locale]}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                      {resource.description[locale]}
                    </p>
                    <div className="mt-4 text-xs text-muted-foreground">
                      {resource.readTime}
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Digital Map CTA */}
      <section className="relative overflow-hidden border-y border-border/50 py-20 sm:py-28">
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-violet-500/5 via-transparent to-violet-500/5" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="flex flex-col items-center gap-8 sm:flex-row sm:justify-between"
          >
            <div className="max-w-lg">
              <motion.div custom={0} variants={fadeUp} className="inline-flex items-center gap-2 rounded-full bg-violet-500/10 px-4 py-1.5 text-sm font-medium text-violet-600">
                <Fingerprint className="h-4 w-4" />
                {t.mappaDigitale.title}
              </motion.div>
              <motion.h2 custom={1} variants={fadeUp} className="mt-4 text-3xl font-bold sm:text-4xl">
                {t.mappaDigitale.homeCta.title}
              </motion.h2>
              <motion.p custom={2} variants={fadeUp} className="mt-3 text-muted-foreground">
                {t.mappaDigitale.homeCta.subtitle}
              </motion.p>
              <motion.div custom={3} variants={fadeUp} className="mt-6">
                <Link
                  href="/mappa-digitale"
                  className="inline-flex items-center gap-2 rounded-xl bg-foreground px-6 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90"
                >
                  {t.mappaDigitale.homeCta.button}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            </div>
            <motion.div
              custom={2}
              variants={fadeUp}
              className="flex h-40 w-40 items-center justify-center rounded-3xl bg-violet-500/10 sm:h-48 sm:w-48"
            >
              <Fingerprint className="h-20 w-20 text-violet-500/60 sm:h-24 sm:w-24" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stack Etico CTA */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-emerald-500/5 via-transparent to-emerald-500/5" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="flex flex-col items-center gap-8 sm:flex-row sm:justify-between"
          >
            <div className="max-w-lg">
              <motion.div custom={0} variants={fadeUp} className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-600">
                <Blocks className="h-4 w-4" />
                {t.stackEtico.title}
              </motion.div>
              <motion.h2 custom={1} variants={fadeUp} className="mt-4 text-3xl font-bold sm:text-4xl">
                {t.stackEtico.homeCta.title}
              </motion.h2>
              <motion.p custom={2} variants={fadeUp} className="mt-3 text-muted-foreground">
                {t.stackEtico.homeCta.subtitle}
              </motion.p>
              <motion.div custom={3} variants={fadeUp} className="mt-6">
                <Link
                  href="/stack-etico"
                  className="inline-flex items-center gap-2 rounded-xl bg-foreground px-6 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90"
                >
                  {t.stackEtico.homeCta.button}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            </div>
            <motion.div
              custom={2}
              variants={fadeUp}
              className="flex h-40 w-40 items-center justify-center rounded-3xl bg-emerald-500/10 sm:h-48 sm:w-48"
            >
              <Blocks className="h-20 w-20 text-emerald-500/60 sm:h-24 sm:w-24" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-muted/30 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="mx-auto max-w-2xl text-center"
          >
            <motion.h2 custom={0} variants={fadeUp} className="text-3xl font-bold sm:text-4xl">
              {t.home.ctaTitle}
            </motion.h2>
            <motion.p custom={1} variants={fadeUp} className="mt-4 text-muted-foreground">
              {t.home.ctaSubtitle}
            </motion.p>
            <motion.div custom={2} variants={fadeUp} className="mt-8">
              <Link
                href="/percorsi"
                className="inline-flex items-center gap-2 rounded-xl bg-foreground px-6 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90"
              >
                {t.home.ctaButton}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
