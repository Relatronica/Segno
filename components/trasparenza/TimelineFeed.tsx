'use client';

import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Link2 } from 'lucide-react';
import {
  formatAmount,
  formatEventDate,
  type LobbyPerson,
  type TimelineEvent,
} from '@/lib/data/trasparenza';
import type { EventType, SentimentTag } from '@/lib/data/trasparenza';
import { EVENT_META, SENTIMENT_META } from './meta';
import { PersonAvatar } from './PersonAvatar';
import { paths } from '@/lib/seo';
import { cn } from '@/lib/utils';

type ActorChip = { name: string; color: string };

type Props = {
  events: TimelineEvent[];
  /** Newest → oldest (already sorted by parent) */
  locale: 'it' | 'en';
  people: Record<string, LobbyPerson>;
  actors?: Record<string, ActorChip>;
  activeId: string | null;
  onSelect: (id: string) => void;
  /** Feed scroll position → temporal playhead on the chart (no selection) */
  onScrub?: (eventId: string | null) => void;
  sentimentLabel?: (tag: SentimentTag) => string;
  typeLabel?: (type: EventType) => string;
  sentimentNote?: string;
  /** Shown instead of sentimentNote on automatic headline pins */
  autoNote?: string;
  autoLabel?: string;
  sourceLabel: string;
  /** Label for the internal permalink to the single-event page */
  permalinkLabel?: string;
  permalinkHint?: string;
  newestFirstLabel: string;
  emptyLabel: string;
  className?: string;
};

const FOCUS_OFFSET = 56;

function sourceHost(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

export function TimelineFeed({
  events,
  locale,
  people,
  actors = {},
  activeId,
  onSelect,
  onScrub,
  sentimentLabel,
  typeLabel,
  sentimentNote,
  autoNote,
  autoLabel,
  sourceLabel,
  permalinkLabel,
  permalinkHint,
  newestFirstLabel,
  emptyLabel,
  className = '',
}: Props) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Map<string, HTMLElement>>(new Map());
  const syncLock = useRef<'external' | 'self' | null>(null);
  const scrollRaf = useRef(0);

  useEffect(() => {
    if (!activeId) return;
    const el = itemRefs.current.get(activeId);
    const root = scrollerRef.current;
    if (!el || !root) return;
    if (syncLock.current === 'self') return;

    syncLock.current = 'external';
    const top = el.offsetTop - FOCUS_OFFSET;
    root.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    const t = window.setTimeout(() => {
      syncLock.current = null;
    }, 380);
    return () => window.clearTimeout(t);
  }, [activeId]);

  const scrubIdRef = useRef<string | null>(null);
  /** Row under the playhead: mirrors the cursor shown on the timeline. */
  const [focusedId, setFocusedId] = useState<string | null>(null);

  const pickFocused = () => {
    const root = scrollerRef.current;
    if (!root || events.length === 0) return;
    if (syncLock.current === 'external') return;

    const target = root.scrollTop + FOCUS_OFFSET;
    let bestId = events[0].id;
    let bestDist = Infinity;
    for (const event of events) {
      const node = itemRefs.current.get(event.id);
      if (!node) continue;
      const dist = Math.abs(node.offsetTop - target);
      if (dist < bestDist) {
        bestDist = dist;
        bestId = event.id;
      }
    }
    if (bestId && bestId !== scrubIdRef.current) {
      scrubIdRef.current = bestId;
      setFocusedId(bestId);
      onScrub?.(bestId);
    }
  };

  const onScroll = () => {
    if (scrollRaf.current) cancelAnimationFrame(scrollRaf.current);
    scrollRaf.current = requestAnimationFrame(pickFocused);
  };

  return (
    <div className={cn('flex h-full min-h-0 flex-col', className)}>
      {/* The shared right panel owns title and close; the feed states its order. */}
      <div className="shrink-0 border-b border-border/40 px-3 py-2">
        <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
          {newestFirstLabel}
        </p>
      </div>

      <div
        ref={scrollerRef}
        onScroll={onScroll}
        className="min-h-0 flex-1 overflow-y-auto overscroll-contain [scrollbar-width:thin]"
      >
        {events.length === 0 ? (
          <p className="px-4 py-8 text-center text-sm text-muted-foreground">{emptyLabel}</p>
        ) : (
          <ul className="relative pb-8">
            {events.map((event) => {
              const person = event.personId ? people[event.personId] : undefined;
              const actor = event.actorId ? actors[event.actorId] : undefined;
              const active = event.id === activeId;
              /** Under the timeline playhead but not selected: a lighter echo. */
              const focused = !active && event.id === focusedId;
              const sentimentMeta = event.sentiment
                ? SENTIMENT_META[event.sentiment]
                : null;
              const typeMeta = EVENT_META[event.type];
              const TypeIcon = typeMeta.icon;
              const onCurve = Boolean(event.sentiment);
              const note = event.origin === 'auto' ? autoNote : sentimentNote;
              const body = event.detail?.[locale] ?? event.summary[locale];

              return (
                <li
                  key={event.id}
                  ref={(node) => {
                    if (node) itemRefs.current.set(event.id, node);
                    else itemRefs.current.delete(event.id);
                  }}
                  className={cn(
                    'border-b border-border/30 transition-colors',
                    active
                      ? 'bg-mark-muted/40'
                      : focused
                        ? 'bg-mark-muted/20'
                        : 'hover:bg-muted/25',
                  )}
                >
                  <button
                    type="button"
                    onClick={() => onSelect(event.id)}
                    className="flex w-full gap-3 px-3 py-3 text-left"
                    aria-expanded={active}
                    aria-current={active ? 'true' : undefined}
                  >
                    <span className="relative mt-0.5 shrink-0">
                      {person ? (
                        <PersonAvatar person={person} size="md" />
                      ) : (
                        <span
                          className={cn(
                            'inline-flex h-8 w-8 items-center justify-center rounded-full ring-1 ring-border/40',
                            typeMeta.bg,
                            typeMeta.color,
                          )}
                        >
                          <TypeIcon className="h-3.5 w-3.5" />
                        </span>
                      )}
                      <span
                        className={cn(
                          'absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5 items-center justify-center rounded-full ring-2 ring-background',
                          onCurve ? '' : typeMeta.bg,
                        )}
                        style={
                          onCurve
                            ? { backgroundColor: sentimentMeta?.dot ?? '#64748b' }
                            : undefined
                        }
                        aria-hidden
                      />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2">
                        <time
                          dateTime={event.date}
                          className="text-[13px] font-medium tabular-nums text-foreground"
                        >
                          {formatEventDate(event.date, locale)}
                        </time>
                        {person && (
                          <span className="truncate text-[12px] text-muted-foreground">
                            {person.shortName}
                          </span>
                        )}
                        {event.sentiment && sentimentLabel && (
                          <span className="ml-auto inline-flex shrink-0 items-center gap-1">
                            {event.origin === 'auto' && autoLabel && (
                              <span className="rounded px-1.5 py-px font-mono text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                                {autoLabel}
                              </span>
                            )}
                            <span
                              className={cn(
                                'rounded px-1.5 py-px font-mono text-[10px] font-medium',
                                sentimentMeta?.bg,
                                sentimentMeta?.color,
                              )}
                            >
                              {sentimentLabel(event.sentiment)}
                            </span>
                          </span>
                        )}
                        {!event.sentiment && typeLabel && (
                          <span
                            className={cn(
                              'ml-auto inline-flex shrink-0 items-center gap-1 rounded px-1.5 py-px font-mono text-[10px] font-medium',
                              typeMeta.bg,
                              typeMeta.color,
                            )}
                          >
                            <TypeIcon className="h-2.5 w-2.5" />
                            {typeLabel(event.type)}
                          </span>
                        )}
                      </span>

                      <span
                        className={cn(
                          'mt-1 block text-[13px] leading-snug',
                          active
                            ? 'font-medium text-foreground'
                            : 'text-foreground/85',
                        )}
                      >
                        {event.title[locale]}
                      </span>
                    </span>
                  </button>

                  {active && (
                    <div className="animate-in fade-in slide-in-from-top-1 space-y-3 px-3 pb-3.5 pl-[3.25rem] duration-200">
                      {person && (
                        <p className="text-[12px] leading-snug text-muted-foreground">
                          <span className="font-medium text-foreground/80">{person.name}</span>
                          {person.role[locale] ? ` · ${person.role[locale]}` : ''}
                        </p>
                      )}

                      {actor && (
                        <p className="inline-flex items-center gap-1.5 text-[12px] text-muted-foreground">
                          <span
                            className="h-1.5 w-1.5 rounded-full"
                            style={{ backgroundColor: actor.color }}
                          />
                          {actor.name}
                        </p>
                      )}

                      {event.sentiment && note && (
                        <p className="text-[11px] leading-relaxed text-muted-foreground">
                          {note}
                        </p>
                      )}

                      {event.quote && (
                        <blockquote className="border-l-2 border-mark/35 pl-2.5 text-[13px] italic leading-relaxed text-foreground/90">
                          “{event.quote[locale]}”
                        </blockquote>
                      )}

                      <p className="text-[13px] leading-relaxed text-muted-foreground">
                        {body}
                      </p>

                      {event.amountEur != null && (
                        <p
                          className={cn(
                            'font-mono text-sm font-semibold',
                            event.type === 'sanction'
                              ? 'text-red-800 dark:text-red-300'
                              : 'text-amber-800 dark:text-amber-300',
                          )}
                        >
                          {event.type === 'sanction' ? '' : '~ '}
                          {formatAmount(event.amountEur, locale)}
                        </p>
                      )}

                      <a
                        href={event.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex max-w-full items-start gap-1.5 text-[12px] text-foreground underline-offset-4 hover:underline"
                      >
                        <span className="min-w-0">
                          <span className="font-medium">
                            {sourceLabel}: {event.sourceLabel[locale]}
                          </span>
                          <span className="mt-0.5 block truncate font-mono text-[10px] text-muted-foreground no-underline">
                            {sourceHost(event.sourceUrl)}
                          </span>
                        </span>
                        <ExternalLink className="mt-0.5 h-3 w-3 shrink-0" />
                      </a>

                      {permalinkLabel && (
                        <a
                          href={paths.trasparenzaEvento(event.id)}
                          title={permalinkHint}
                          className="inline-flex max-w-full items-center gap-1.5 text-[12px] text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                        >
                          <Link2 className="h-3 w-3 shrink-0" />
                          {permalinkLabel}
                        </a>
                      )}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
