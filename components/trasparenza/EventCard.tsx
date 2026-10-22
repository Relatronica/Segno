'use client';

import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { useT } from '@/lib/i18n/useT';
import {
  formatEventDate,
  lobbyPeople,
  type TimelineEvent,
} from '@/lib/data/trasparenza';
import { paths } from '@/lib/seo';
import { cn } from '@/lib/utils';
import { EVENT_META } from './meta';
import { PersonAvatar } from './PersonAvatar';

const peopleById = new Map(lobbyPeople.map((person) => [person.id, person]));

/** One trace in a permalink listing — opens the event page, source stays external. */
export function EventCard({ event }: { event: TimelineEvent }) {
  const t = useT();
  const locale = useAppStore((s) => s.locale) as 'it' | 'en';
  const person = event.personId ? peopleById.get(event.personId) : undefined;
  const meta = EVENT_META[event.type];
  const Icon = meta.icon;

  return (
    <li className="flex items-start gap-3 border-t border-border/40 py-3.5">
      <span
        className={cn(
          'mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full ring-1 ring-border/40',
          meta.bg,
          meta.color,
        )}
        aria-hidden
      >
        <Icon className="h-3.5 w-3.5" />
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <time
            dateTime={event.date}
            className="font-mono text-[11px] tabular-nums text-muted-foreground"
          >
            {formatEventDate(event.date, locale)}
          </time>
          <span
            className={cn(
              'rounded px-1.5 py-px font-mono text-[10px] font-medium',
              meta.bg,
              meta.color,
            )}
          >
            {t.trasparenza.types[event.type]}
          </span>
          {event.origin === 'auto' && (
            <span className="rounded px-1.5 py-px font-mono text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
              {t.trasparenza.autoLabel}
            </span>
          )}
        </div>

        <Link
          href={paths.trasparenzaEvento(event.id)}
          className="mt-1 block text-[14px] font-medium leading-snug text-foreground underline-offset-4 hover:underline"
        >
          {event.title[locale]}
        </Link>

        <p className="mt-1 line-clamp-2 text-[13px] leading-relaxed text-muted-foreground">
          {event.summary[locale]}
        </p>

        {person && (
          <Link
            href={paths.trasparenzaPersona(person.id)}
            className="mt-2 inline-flex items-center gap-1.5 text-[12px] text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            <PersonAvatar person={person} size="sm" />
            {person.name}
          </Link>
        )}
      </div>

      <a
        href={event.sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${t.trasparenza.source}: ${event.sourceLabel[locale]}`}
        title={event.sourceLabel[locale]}
        className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        <ExternalLink className="h-3.5 w-3.5" />
      </a>
    </li>
  );
}
