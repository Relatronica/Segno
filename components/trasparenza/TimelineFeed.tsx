'use client';

import { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown, Users } from 'lucide-react';
import {
  formatEventDate,
  type LobbyPerson,
  type TimelineEvent,
} from '@/lib/data/trasparenza';
import type { SentimentTag } from '@/lib/data/trasparenza';
import { SENTIMENT_META } from './meta';
import { PersonAvatar } from './PersonAvatar';
import { cn } from '@/lib/utils';

type Props = {
  events: TimelineEvent[];
  /** Newest → oldest (already sorted by parent) */
  locale: 'it' | 'en';
  people: Record<string, LobbyPerson>;
  /** Ordered person list for the filter (theme people) */
  personOptions?: LobbyPerson[];
  selectedPerson?: string | 'all';
  onPersonChange?: (id: string | 'all') => void;
  allPeopleLabel?: string;
  peopleLabel?: string;
  activeId: string | null;
  onSelect: (id: string) => void;
  /** Called when list scroll picks a new focus item (not on click) */
  onScrollFocus?: (id: string) => void;
  sentimentLabel?: (tag: SentimentTag) => string;
  title: string;
  newestFirstLabel: string;
  emptyLabel: string;
  className?: string;
};

const FOCUS_OFFSET = 56;

export function TimelineFeed({
  events,
  locale,
  people,
  personOptions = [],
  selectedPerson = 'all',
  onPersonChange,
  allPeopleLabel = 'All',
  peopleLabel = 'People',
  activeId,
  onSelect,
  onScrollFocus,
  sentimentLabel,
  title,
  newestFirstLabel,
  emptyLabel,
  className = '',
}: Props) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
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
    if (bestId && bestId !== activeId) {
      syncLock.current = 'self';
      onScrollFocus?.(bestId);
      window.setTimeout(() => {
        if (syncLock.current === 'self') syncLock.current = null;
      }, 120);
    }
  };

  const onScroll = () => {
    if (scrollRaf.current) cancelAnimationFrame(scrollRaf.current);
    scrollRaf.current = requestAnimationFrame(pickFocused);
  };

  const showPersonFilter = personOptions.length > 0 && onPersonChange;

  return (
    <div className={cn('flex h-full min-h-0 flex-col', className)}>
      <div className="shrink-0 border-b border-border/50 px-3 py-3 sm:px-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
          {newestFirstLabel}
        </p>
        <h2 className="mt-0.5 text-sm font-semibold tracking-tight">{title}</h2>

        {showPersonFilter && (
          <div ref={personMenuRef} className="relative mt-3">
            <p className="mb-1.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              {peopleLabel}
            </p>
            <button
              type="button"
              onClick={() => setPersonMenuOpen((o) => !o)}
              aria-expanded={personMenuOpen}
              aria-haspopup="listbox"
              className="flex w-full items-center gap-2 rounded-md border border-border/60 bg-background px-2.5 py-2 text-left text-sm transition-colors hover:bg-muted/40"
            >
              {selectedPersonObj ? (
                <PersonAvatar person={selectedPersonObj} size="sm" />
              ) : (
                <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground ring-1 ring-border/60">
                  <Users className="h-3 w-3" />
                </span>
              )}
              <span className="min-w-0 flex-1 truncate font-medium">
                {selectedPersonObj ? selectedPersonObj.name : allPeopleLabel}
              </span>
              <ChevronDown
                className={cn(
                  'h-4 w-4 shrink-0 text-muted-foreground transition-transform',
                  personMenuOpen && 'rotate-180',
                )}
              />
            </button>

            {personMenuOpen && (
              <ul
                role="listbox"
                aria-label={peopleLabel}
                className="absolute left-0 right-0 top-[calc(100%+4px)] z-30 max-h-64 overflow-y-auto rounded-md border border-border/60 bg-background py-1 shadow-xl"
              >
                <li role="option" aria-selected={selectedPerson === 'all'}>
                  <button
                    type="button"
                    onClick={() => {
                      onPersonChange('all');
                      setPersonMenuOpen(false);
                    }}
                    className={cn(
                      'flex w-full items-center gap-2 px-2.5 py-2 text-left text-sm transition-colors hover:bg-muted/50',
                      selectedPerson === 'all' && 'bg-muted/40',
                    )}
                  >
                    <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground ring-1 ring-border/60">
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
                          'flex w-full items-center gap-2 px-2.5 py-2 text-left text-sm transition-colors hover:bg-muted/50',
                          selected && 'bg-muted/40',
                        )}
                      >
                        <PersonAvatar person={person} size="sm" />
                        <span className="min-w-0 flex-1">
                          <span className="block truncate font-medium">{person.name}</span>
                          <span className="block truncate font-mono text-[10px] text-muted-foreground">
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

      <div
        ref={scrollerRef}
        onScroll={onScroll}
        className="min-h-0 flex-1 overflow-y-auto overscroll-contain [scrollbar-width:thin]"
      >
        {events.length === 0 ? (
          <p className="px-4 py-8 text-center text-sm text-muted-foreground">{emptyLabel}</p>
        ) : (
          <ul className="relative pb-8 pt-1">
            {events.map((event) => {
              const person = event.personId ? people[event.personId] : undefined;
              const active = event.id === activeId;
              const sentimentMeta = event.sentiment
                ? SENTIMENT_META[event.sentiment]
                : null;
              return (
                <li key={event.id}>
                  <button
                    type="button"
                    ref={(node) => {
                      if (node) itemRefs.current.set(event.id, node);
                      else itemRefs.current.delete(event.id);
                    }}
                    onClick={() => onSelect(event.id)}
                    className={cn(
                      'flex w-full gap-2.5 border-b border-border/40 px-3 py-3 text-left transition-colors sm:px-4',
                      active ? 'bg-mark-muted/60' : 'hover:bg-muted/40',
                    )}
                    aria-current={active ? 'true' : undefined}
                  >
                    <span className="mt-1.5 flex w-2 shrink-0 justify-center">
                      <span
                        className={cn(
                          'h-2 w-2 rounded-full',
                          active
                            ? 'ring-2 ring-mark/30 ring-offset-1 ring-offset-background'
                            : '',
                        )}
                        style={{
                          backgroundColor: sentimentMeta?.dot ?? '#64748b',
                        }}
                      />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2">
                        {person && <PersonAvatar person={person} size="sm" />}
                        <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                          {formatEventDate(event.date, locale)}
                          {person ? ` · ${person.shortName}` : ''}
                        </span>
                      </span>
                      {event.sentiment && sentimentLabel && (
                        <span
                          className={cn(
                            'mt-1 inline-block font-mono text-[10px] font-medium',
                            sentimentMeta?.color,
                          )}
                        >
                          {sentimentLabel(event.sentiment)}
                        </span>
                      )}
                      <span
                        className={cn(
                          'mt-0.5 block text-sm leading-snug',
                          active
                            ? 'font-semibold text-foreground'
                            : 'font-medium text-foreground/90',
                        )}
                      >
                        {event.title[locale]}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
