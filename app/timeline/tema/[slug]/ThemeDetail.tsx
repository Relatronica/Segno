'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { useT } from '@/lib/i18n/useT';
import type { LobbyPerson, LocaleText, TimelineEvent } from '@/lib/data/trasparenza';
import { paths } from '@/lib/seo';
import { EventCard } from '@/components/trasparenza/EventCard';
import { PersonAvatar } from '@/components/trasparenza/PersonAvatar';

type ThemeInfo = {
  slug: string;
  name: LocaleText;
  shortName: string;
  period: LocaleText;
  intro: LocaleText;
  disclaimer: LocaleText;
};

type Props = {
  theme: ThemeInfo;
  events: TimelineEvent[];
  people: LobbyPerson[];
};

export function ThemeDetail({ theme, events, people }: Props) {
  const t = useT();
  const locale = useAppStore((s) => s.locale) as 'it' | 'en';

  const stats = [
    { label: t.trasparenza.themeEventsCount, value: events.length },
    { label: t.trasparenza.themeSourcesCount, value: new Set(events.map((e) => e.sourceUrl)).size },
    { label: t.trasparenza.themePeopleCount, value: people.length },
  ];

  return (
    <div className="mx-auto w-full max-w-3xl px-4 pb-16 pt-[calc(var(--nav-clearance)+2.5rem)] sm:px-6 sm:pb-24 sm:pt-[calc(var(--nav-clearance)+3.5rem)] lg:px-8">
      <Link
        href={paths.timeline}
        className="inline-flex items-center gap-1.5 text-[13px] text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        {t.trasparenza.detailBack}
      </Link>

      <p className="mt-6 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-mark">
        {t.trasparenza.themeEyebrow} · {theme.period[locale]}
      </p>

      <h1 className="mt-3 text-3xl leading-tight text-foreground sm:text-4xl">
        {theme.name[locale]}
      </h1>

      <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
        {theme.intro[locale]}
      </p>

      <Link
        href={paths.timeline}
        className="mt-6 inline-flex items-center gap-1.5 rounded-md bg-foreground px-3.5 py-2 text-[13px] font-semibold text-background transition-opacity hover:opacity-90"
      >
        {t.trasparenza.themeOpenTimeline}
        <ArrowUpRight className="h-3.5 w-3.5" />
      </Link>

      <dl className="mt-8 grid grid-cols-3 gap-3">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-lg border border-border/50 px-3 py-2.5">
            <dd className="font-mono text-xl font-semibold tabular-nums text-foreground">
              {stat.value}
            </dd>
            <dt className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
              {stat.label}
            </dt>
          </div>
        ))}
      </dl>

      <p className="mt-6 border-l-2 border-mark/35 pl-3 text-[12px] leading-relaxed text-muted-foreground">
        <span className="font-medium text-foreground/80">
          {t.trasparenza.themeDisclaimerTitle}.{' '}
        </span>
        {theme.disclaimer[locale]}
      </p>

      {people.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl text-foreground">{t.trasparenza.themePeopleTitle}</h2>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {people.map((person) => (
              <Link
                key={person.id}
                href={paths.timelinePersona(person.id)}
                className="inline-flex items-center gap-2 rounded-md border border-border/50 py-1 pl-1 pr-2.5 text-[12px] font-medium text-foreground transition-colors hover:bg-muted/40"
              >
                <PersonAvatar person={person} size="sm" />
                {person.shortName}
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="mt-10">
        <h2 className="text-xl text-foreground">
          {t.trasparenza.themeEventsTitle}
          <span className="ml-2 font-mono text-[12px] font-normal text-muted-foreground">
            {events.length}
          </span>
        </h2>
        <ul className="mt-2">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </ul>
      </section>
    </div>
  );
}
