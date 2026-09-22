'use client';

import { useEffect, useRef } from 'react';
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

  return (
    <div className={cn('flex h-full min-h-0 flex-col', className)}>
      <div className="shrink-0 border-b border-border/50 px-3 py-3 sm:px-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
          {newestFirstLabel}
        </p>
        <h2 className="mt-0.5 text-sm font-semibold tracking-tight">{title}</h2>
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
                      active
                        ? 'bg-mark-muted/60'
                        : 'hover:bg-muted/40',
                    )}
                    aria-current={active ? 'true' : undefined}
                  >
                    <span className="mt-1.5 flex w-2 shrink-0 justify-center">
                      <span
                        className={cn(
                          'h-2 w-2 rounded-full',
                          active ? 'ring-2 ring-mark/30 ring-offset-1 ring-offset-background' : '',
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
                          active ? 'font-semibold text-foreground' : 'font-medium text-foreground/90',
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
