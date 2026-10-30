'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, ExternalLink, Quote as QuoteIcon } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { useT } from '@/lib/i18n/useT';
import {
  formatAmount,
  formatEventDate,
  lobbyPeople,
  type LocaleText,
  type TimelineEvent,
} from '@/lib/data/trasparenza';
import { paths } from '@/lib/seo';
import { buildTrasparenzaSearch } from '@/lib/trasparenza/url';
import { cn } from '@/lib/utils';
import { EVENT_META, SENTIMENT_META } from './meta';
import { PersonAvatar } from './PersonAvatar';

type Props = {
  event: TimelineEvent;
  /** Known theme of the pin, when it comes from the curated data file */
  theme?: { slug: string; name: LocaleText } | null;
};

function sourceHost(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

/** Stable, linkable record of a single point on the timeline. */
export function EventDetailPanel({ event, theme }: Props) {
  const t = useT();
  const locale = useAppStore((s) => s.locale) as 'it' | 'en';

  const person = event.personId
    ? lobbyPeople.find((p) => p.id === event.personId)
    : undefined;
  const meta = EVENT_META[event.type];
  const Icon = meta.icon;
  const sentiment = event.sentiment ? SENTIMENT_META[event.sentiment] : null;
  const isAuto = event.origin === 'auto';
  const timelineHref = `${paths.timeline}${buildTrasparenzaSearch({ event: event.id })}`;

  return (
    <article className="mx-auto w-full max-w-3xl px-4 pb-16 pt-[calc(var(--nav-clearance)+2.5rem)] sm:px-6 sm:pb-24 sm:pt-[calc(var(--nav-clearance)+3.5rem)] lg:px-8">
      <Link
        href={paths.timeline}
        className="inline-flex items-center gap-1.5 text-[13px] text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        {t.trasparenza.detailBack}
      </Link>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <span
          className={cn(
            'inline-flex items-center gap-1.5 rounded px-2 py-0.5 font-mono text-[11px] font-medium',
            meta.bg,
            meta.color,
          )}
        >
          <Icon className="h-3 w-3" />
          {t.trasparenza.types[event.type]}
        </span>

        {event.sentiment && sentiment && (
          <span
            className={cn(
              'rounded px-2 py-0.5 font-mono text-[11px] font-medium',
              sentiment.bg,
              sentiment.color,
            )}
          >
            {t.trasparenza.sentiments[event.sentiment]}
          </span>
        )}

        {isAuto && (
          <span className="rounded border border-border/50 px-2 py-0.5 font-mono text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
            {t.trasparenza.autoLabel}
          </span>
        )}
      </div>

      <time
        dateTime={event.date}
        className="mt-4 block font-mono text-[12px] tabular-nums text-muted-foreground"
      >
        {formatEventDate(event.date, locale)}
      </time>

      <h1 className="mt-1.5 text-3xl leading-tight text-foreground sm:text-4xl">
        {event.title[locale]}
      </h1>

      {person && (
        <Link
          href={paths.timelinePersona(person.id)}
          className="mt-5 inline-flex items-center gap-2.5 rounded-lg border border-border/50 px-3 py-2 transition-colors hover:bg-muted/40"
        >
          <PersonAvatar person={person} size="lg" />
          <span className="min-w-0">
            <span className="block text-[13px] font-medium text-foreground">{person.name}</span>
            <span className="block text-[12px] text-muted-foreground">{person.role[locale]}</span>
          </span>
          <ArrowUpRight className="ml-1 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
        </Link>
      )}

      {isAuto && (
        <p className="mt-5 border-l-2 border-border pl-3 text-[12px] leading-relaxed text-muted-foreground">
          <span className="font-medium text-foreground/80">{t.trasparenza.detailAutoTitle}. </span>
          {t.trasparenza.autoNote}
        </p>
      )}

      {event.quote && (
        <figure className="mt-6 border-l-2 border-mark/40 pl-4">
          <figcaption className="flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            <QuoteIcon className="h-3 w-3" />
            {t.trasparenza.detailQuote}
          </figcaption>
          <blockquote className="mt-2 text-[17px] italic leading-relaxed text-foreground/90">
            “{event.quote[locale]}”
          </blockquote>
        </figure>
      )}

      <div className="mt-6 space-y-3 text-[15px] leading-relaxed text-muted-foreground">
        <h2 className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          {t.trasparenza.detailContext}
        </h2>
        <p>{event.summary[locale]}</p>
        {event.detail && <p>{event.detail[locale]}</p>}
      </div>

      {event.amountEur != null && (
        <p className="mt-5">
          <span className="block font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            {t.trasparenza.detailAmount}
          </span>
          <span
            className={cn(
              'mt-1 block font-mono text-xl font-semibold',
              event.type === 'sanction'
                ? 'text-red-800 dark:text-red-300'
                : 'text-amber-800 dark:text-amber-300',
            )}
          >
            {event.type === 'sanction' ? '' : '~ '}
            {formatAmount(event.amountEur, locale)}
          </span>
        </p>
      )}

      <a
        href={event.sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 flex items-start gap-2 rounded-lg border border-border/50 px-3 py-2.5 transition-colors hover:bg-muted/40"
      >
        <span className="min-w-0 flex-1">
          <span className="block font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            {t.trasparenza.detailSource}
          </span>
          <span className="mt-1 block text-[13px] font-medium text-foreground">
            {event.sourceLabel[locale]}
          </span>
          <span className="mt-0.5 block font-mono text-[11px] text-muted-foreground">
            {sourceHost(event.sourceUrl)}
          </span>
        </span>
        <ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
      </a>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Link
          href={timelineHref}
          className="inline-flex items-center gap-1.5 rounded-md bg-foreground px-3.5 py-2 text-[13px] font-semibold text-background transition-opacity hover:opacity-90"
        >
          {t.trasparenza.detailOpenOnTimeline}
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>

        {theme && (
          <Link
            href={paths.timelineTema(theme.slug)}
            className="text-[13px] text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            {t.trasparenza.detailTheme}: {theme.name[locale]}
          </Link>
        )}
      </div>
    </article>
  );
}
