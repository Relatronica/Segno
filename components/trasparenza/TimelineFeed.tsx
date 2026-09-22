'use client';

import { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown, ExternalLink, Users } from 'lucide-react';
import {
  formatAmount,
  formatEventDate,
  type LobbyPerson,
  type TimelineEvent,
} from '@/lib/data/trasparenza';
import type { EventType, SentimentTag } from '@/lib/data/trasparenza';
import { EVENT_META, SENTIMENT_META } from './meta';
import { PersonAvatar } from './PersonAvatar';
import { cn } from '@/lib/utils';

type ActorChip = { name: string; color: string };

type Props = {
  events: TimelineEvent[];
  /** Newest → oldest (already sorted by parent) */
  locale: 'it' | 'en';
  people: Record<string, LobbyPerson>;
  actors?: Record<string, ActorChip>;
  /** Ordered person list for the filter (theme people) */
  personOptions?: LobbyPerson[];
  selectedPerson?: string | 'all';
  onPersonChange?: (id: string | 'all') => void;
  allPeopleLabel?: string;
  peopleLabel?: string;
  typeOptions?: EventType[];
  selectedTypes?: EventType[];
  onToggleType?: (type: EventType) => void;
  onResetTypes?: () => void;
  typesLabel?: string;
  allTypesLabel?: string;
  activeId: string | null;
  onSelect: (id: string) => void;
  /** Feed scroll position → temporal playhead on the chart (no selection) */
  onScrub?: (eventId: string | null) => void;
  sentimentLabel?: (tag: SentimentTag) => string;
  typeLabel?: (type: EventType) => string;
  sentimentNote?: string;
  sourceLabel: string;
  title: string;
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
  personOptions = [],
  selectedPerson = 'all',
  onPersonChange,
  allPeopleLabel = 'All',
  peopleLabel = 'People',
  typeOptions = [],
  selectedTypes = [],
  onToggleType,
  onResetTypes,
  typesLabel = 'Type',
  allTypesLabel = 'All',
  activeId,
  onSelect,
  onScrub,
  sentimentLabel,
  typeLabel,
  sentimentNote,
  sourceLabel,
  title,
  newestFirstLabel,
  emptyLabel,
  className = '',
}: Props) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Map<string, HTMLElement>>(new Map());
  const syncLock = useRef<'external' | 'self' | null>(null);
  const scrollRaf = useRef(0);
  const [personMenuOpen, setPersonMenuOpen] = useState(false);
  const personMenuRef = useRef<HTMLDivElement>(null);

  const selectedPersonObj =
    selectedPerson !== 'all' ? people[selectedPerson] : undefined;

  useEffect(() => {
    if (!personMenuOpen) return;
    const onDoc = (e: MouseEvent) => {
      if (!personMenuRef.current?.contains(e.target as Node)) {
        setPersonMenuOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPersonMenuOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [personMenuOpen]);

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
      onScrub?.(bestId);
    }
  };

  const onScroll = () => {
    if (scrollRaf.current) cancelAnimationFrame(scrollRaf.current);
    scrollRaf.current = requestAnimationFrame(pickFocused);
  };

  const showPersonFilter = personOptions.length > 0 && onPersonChange;
  const showTypeFilter = typeOptions.length > 1 && onToggleType;
  const allTypesSelected =
    typeOptions.length > 0 && typeOptions.every((t) => selectedTypes.includes(t));
  const hasFilters = showTypeFilter || showPersonFilter;

  return (
    <div className={cn('flex h-full min-h-0 flex-col', className)}>
      <div className="shrink-0 border-b border-border/40 px-3 py-2.5">
        <div className="flex items-baseline justify-between gap-2">
          <h2 className="text-sm font-semibold tracking-tight">{title}</h2>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
            {newestFirstLabel}
          </p>
        </div>

        {hasFilters && (
          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            {showTypeFilter && (
              <>
                <button
                  type="button"
                  onClick={() => onResetTypes?.()}
                  aria-label={typesLabel}
                  className={cn(
                    'inline-flex h-7 items-center rounded-md px-2 font-mono text-[10px] font-medium transition-colors',
                    allTypesSelected
                      ? 'bg-foreground text-background'
                      : 'bg-muted/45 text-muted-foreground hover:bg-muted hover:text-foreground',
                  )}
                >
                  {allTypesLabel}
                </button>
                {typeOptions.map((type) => {
                  const meta = EVENT_META[type];
                  const Icon = meta.icon;
                  const active = selectedTypes.includes(type);
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => onToggleType(type)}
                      title={typeLabel?.(type) ?? type}
                      className={cn(
                        'inline-flex h-7 items-center gap-1 rounded-md px-2 font-mono text-[10px] font-medium transition-colors',
                        active
                          ? cn(meta.bg, meta.color)
                          : 'bg-muted/35 text-muted-foreground hover:bg-muted hover:text-foreground',
                      )}
                    >
                      <Icon className="h-3 w-3" />
                      <span className="hidden sm:inline">{typeLabel?.(type) ?? type}</span>
                    </button>
                  );
                })}
              </>
            )}

            {showPersonFilter && (
              <div ref={personMenuRef} className="relative ml-auto min-w-0">
                <button
                  type="button"
                  onClick={() => setPersonMenuOpen((o) => !o)}
                  aria-expanded={personMenuOpen}
                  aria-haspopup="listbox"
                  aria-label={peopleLabel}
                  className="flex h-7 max-w-[11rem] items-center gap-1.5 rounded-md border border-border/50 bg-background px-1.5 text-left text-xs transition-colors hover:bg-muted/40"
                >
                  {selectedPersonObj ? (
                    <PersonAvatar person={selectedPersonObj} size="sm" />
                  ) : (
                    <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                      <Users className="h-3 w-3" />
                    </span>
                  )}
                  <span className="min-w-0 flex-1 truncate">
                    {selectedPersonObj ? selectedPersonObj.shortName : allPeopleLabel}
                  </span>
                  <ChevronDown
                    className={cn(
                      'h-3 w-3 shrink-0 text-muted-foreground transition-transform',
                      personMenuOpen && 'rotate-180',
                    )}
                  />
                </button>

                {personMenuOpen && (
                  <ul
                    role="listbox"
                    aria-label={peopleLabel}
                    className="absolute right-0 top-[calc(100%+4px)] z-30 max-h-64 w-56 overflow-y-auto rounded-md border border-border/60 bg-background py-1 shadow-lg"
                  >
                    <li role="option" aria-selected={selectedPerson === 'all'}>
                      <button
                        type="button"
                        onClick={() => {
                          onPersonChange('all');
                          setPersonMenuOpen(false);
                        }}
                        className={cn(
                          'flex w-full items-center gap-2 px-2.5 py-2 text-left text-xs transition-colors hover:bg-muted/50',
                          selectedPerson === 'all' && 'bg-muted/40',
                        )}
                      >
                        <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                          <Users className="h-3 w-3" />
                        </span>
                        <span className="min-w-0 flex-1 truncate">{allPeopleLabel}</span>
                        {selectedPerson === 'all' && (
                          <Check className="h-3.5 w-3.5 shrink-0 text-mark" />
                        )}
                      </button>
                    </li>
                    {personOptions.map((person) => {
                      const selected = selectedPerson === person.id;
                      return (
                        <li key={person.id} role="option" aria-selected={selected}>
                          <button
                            type="button"
                            onClick={() => {
                              onPersonChange(person.id);
                              setPersonMenuOpen(false);
                            }}
                            className={cn(
                              'flex w-full items-center gap-2 px-2.5 py-2 text-left text-xs transition-colors hover:bg-muted/50',
                              selected && 'bg-muted/40',
                            )}
                          >
                            <PersonAvatar person={person} size="sm" />
                            <span className="min-w-0 flex-1">
                              <span className="block truncate font-medium">{person.name}</span>
                              <span className="mt-0.5 block truncate text-[10px] text-muted-foreground">
                                {person.role[locale]}
                              </span>
                            </span>
                            {selected && (
                              <Check className="h-3.5 w-3.5 shrink-0 text-mark" />
                            )}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            )}
          </div>
        )}
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
              const sentimentMeta = event.sentiment
                ? SENTIMENT_META[event.sentiment]
                : null;
              const typeMeta = EVENT_META[event.type];
              const TypeIcon = typeMeta.icon;
              const onCurve = Boolean(event.sentiment);
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
                    active ? 'bg-mark-muted/40' : 'hover:bg-muted/25',
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
                          <span
                            className={cn(
                              'ml-auto shrink-0 rounded px-1.5 py-px font-mono text-[10px] font-medium',
                              sentimentMeta?.bg,
                              sentimentMeta?.color,
                            )}
                          >
                            {sentimentLabel(event.sentiment)}
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

                      {event.sentiment && sentimentNote && (
                        <p className="text-[11px] leading-relaxed text-muted-foreground">
                          {sentimentNote}
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
