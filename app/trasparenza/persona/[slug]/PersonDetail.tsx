'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { useT } from '@/lib/i18n/useT';
import type { LobbyPerson, TimelineEvent } from '@/lib/data/trasparenza';
import { paths } from '@/lib/seo';
import { buildTrasparenzaSearch } from '@/lib/trasparenza/url';
import { EventCard } from '@/components/trasparenza/EventCard';
import { PersonAvatar } from '@/components/trasparenza/PersonAvatar';

type Props = {
  person: LobbyPerson;
  events: TimelineEvent[];
};

export function PersonDetail({ person, events }: Props) {
  const t = useT();
  const locale = useAppStore((s) => s.locale) as 'it' | 'en';
  const filterHref = `${paths.trasparenza}${buildTrasparenzaSearch({ person: person.id })}`;

  return (
    <div className="mx-auto w-full max-w-3xl px-4 pb-16 pt-[calc(var(--nav-clearance)+2.5rem)] sm:px-6 sm:pb-24 sm:pt-[calc(var(--nav-clearance)+3.5rem)] lg:px-8">
      <Link
        href={paths.trasparenza}
        className="inline-flex items-center gap-1.5 text-[13px] text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        {t.trasparenza.detailBack}
      </Link>

      <p className="mt-6 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-mark">
        {t.trasparenza.personEyebrow}
      </p>

      <div className="mt-3 flex items-center gap-4">
        <PersonAvatar person={person} size="lg" />
        <div className="min-w-0">
          <h1 className="text-3xl leading-tight text-foreground sm:text-4xl">{person.name}</h1>
          <p className="mt-1 text-[14px] text-muted-foreground">{person.role[locale]}</p>
        </div>
      </div>

      <Link
        href={filterHref}
        className="mt-6 inline-flex items-center gap-1.5 rounded-md bg-foreground px-3.5 py-2 text-[13px] font-semibold text-background transition-opacity hover:opacity-90"
      >
        {t.trasparenza.personFilterCta.replace('{name}', person.shortName)}
        <ArrowUpRight className="h-3.5 w-3.5" />
      </Link>

      <section className="mt-10">
        <h2 className="text-xl text-foreground">
          {t.trasparenza.personEventsTitle}
          <span className="ml-2 font-mono text-[12px] font-normal text-muted-foreground">
            {events.length}
          </span>
        </h2>

        {events.length === 0 ? (
          <p className="mt-4 text-[14px] text-muted-foreground">
            {t.trasparenza.personEventsEmpty}
          </p>
        ) : (
          <ul className="mt-2">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
