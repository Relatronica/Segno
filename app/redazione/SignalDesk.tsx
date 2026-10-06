'use client';

import { useMemo, useState } from 'react';
import { ChevronDown, ChevronRight, ExternalLink, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  ALL_SENTIMENT_TAGS,
  lobbyPeople,
  type SentimentTag,
} from '@/lib/data/trasparenza';
import { localIsoDate } from '@/lib/dates';
import { effectiveSentiment } from '@/lib/pipeline/signals';
import type { AutoSignal } from '@/lib/pipeline/types';

export type SignalDeskLabels = {
  hint: string;
  empty: string;
  voting: string;
  held: string;
  hidden: string;
  hide: string;
  unhide: string;
  promote: string;
  promoted: string;
  tag: string;
  clear: string;
  open: string;
  error: string;
  today: string;
  yesterday: string;
  itemsCount: string;
};

type Props = {
  signals: AutoSignal[];
  locale: 'it' | 'en';
  labels: SignalDeskLabels;
  sentimentLabels: Record<SentimentTag, string>;
  onChanged: () => void;
};

function yesterdayIso(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return localIsoDate(d);
}

function groupSignals(signals: AutoSignal[]) {
  const map = new Map<string, AutoSignal[]>();
  for (const signal of signals) {
    const key = signal.date.slice(0, 10);
    const list = map.get(key) ?? [];
    list.push(signal);
    map.set(key, list);
  }
  return [...map.entries()]
    .sort((a, b) => b[0].localeCompare(a[0]))
    .map(([date, items]) => ({ date, items }));
}

export function SignalDesk({ signals, locale, labels, sentimentLabels, onChanged }: Props) {
  const [busy, setBusy] = useState<string | null>(null);
  const [note, setNote] = useState<string | null>(null);
  const today = localIsoDate();
  const yesterday = yesterdayIso();
  const groups = useMemo(() => groupSignals(signals), [signals]);
  const [openDays, setOpenDays] = useState<Record<string, boolean>>({});

  const isOpen = (date: string) => {
    if (openDays[date] !== undefined) return openDays[date];
    return date === today || date === yesterday;
  };

  const dayLabel = (date: string) => {
    if (date === today) return labels.today;
    if (date === yesterday) return labels.yesterday;
    const [y, m, d] = date.split('-').map(Number);
    if (!y || !m || !d) return date;
    return new Intl.DateTimeFormat(locale === 'it' ? 'it-IT' : 'en-GB', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: date.slice(0, 4) !== today.slice(0, 4) ? 'numeric' : undefined,
    }).format(new Date(y, m - 1, d));
  };

  const patch = async (id: string, body: Record<string, unknown>, done?: string) => {
    setBusy(id);
    setNote(null);
    try {
      const res = await fetch('/api/pipeline/signals', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...body }),
      });
      if (!res.ok) throw new Error('signal_patch_failed');
      if (done) setNote(done);
      onChanged();
    } catch {
      setNote(labels.error);
    } finally {
      setBusy(null);
    }
  };

  return (
    <div>
      <p className="text-sm text-muted-foreground">{labels.hint}</p>

      {note && (
        <p className="mt-3 text-sm text-muted-foreground" role="status">
          {note}
        </p>
      )}

      {groups.length === 0 ? (
        <p className="mt-8 border border-dashed border-border/70 px-4 py-10 text-center text-sm text-muted-foreground">
          {labels.empty}
        </p>
      ) : (
        <div className="mt-6 space-y-3">
          {groups.map((group) => {
            const open = isOpen(group.date);
            const voting = group.items.filter((s) => effectiveSentiment(s)).length;
            return (
              <section key={group.date} className="border border-border/60 bg-card/30">
                <button
                  type="button"
                  onClick={() =>
                    setOpenDays((prev) => ({ ...prev, [group.date]: !open }))
                  }
                  className="flex w-full items-center gap-2 px-3 py-2.5 text-left hover:bg-muted/30"
                >
                  {open ? (
                    <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                  )}
                  <span className="font-serif text-base font-semibold">{dayLabel(group.date)}</span>
                  <span className="ml-auto font-mono text-[11px] text-muted-foreground">
                    {labels.itemsCount.replace('{n}', String(group.items.length))}
                    {voting > 0 ? ` · ${voting} ${labels.voting.toLowerCase()}` : ''}
                  </span>
                </button>

                {open && (
                  <ul className="divide-y divide-border/40 border-t border-border/50">
                    {group.items.map((signal) => {
                      const person = lobbyPeople.find((item) => item.id === signal.personId);
                      const live = effectiveSentiment(signal);
                      const selected =
                        signal.sentimentOverride === null
                          ? ''
                          : (signal.sentimentOverride ?? signal.sentiment ?? '');
                      const saving = busy === signal.id;
                      return (
                        <li
                          key={signal.id}
                          className="flex flex-col gap-3 px-3 py-3 sm:flex-row sm:items-start"
                        >
                          <div className="min-w-0 flex-1">
                            <p className="font-mono text-[11px] text-muted-foreground">
                              {person ? person.shortName : '—'}
                              {' · '}
                              {signal.hidden
                                ? labels.hidden
                                : live
                                  ? labels.voting
                                  : labels.held}
                              {signal.confidence > 0
                                ? ` · ${Math.round(signal.confidence * 100)}%`
                                : ''}
                            </p>
                            <p className="mt-1 text-sm font-medium leading-snug">
                              {signal.title[locale]}
                            </p>
                            <a
                              href={signal.sourceUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-1 inline-flex items-center gap-1 text-xs text-muted-foreground underline-offset-4 hover:underline"
                            >
                              {labels.open}
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          </div>
                          <div className="flex flex-wrap items-center gap-2">
                            <label className="sr-only" htmlFor={`sig-${signal.id}`}>
                              {labels.tag}
                            </label>
                            <select
                              id={`sig-${signal.id}`}
                              className="h-8 rounded-md border border-border bg-background px-2 text-xs"
                              value={selected}
                              disabled={saving}
                              onChange={(e) => {
                                const value = e.target.value;
                                void patch(signal.id, {
                                  sentimentOverride: value ? (value as SentimentTag) : null,
                                });
                              }}
                            >
                              <option value="">{labels.clear}</option>
                              {ALL_SENTIMENT_TAGS.map((tag) => (
                                <option key={tag} value={tag}>
                                  {sentimentLabels[tag]}
                                </option>
                              ))}
                            </select>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              disabled={saving}
                              onClick={() => void patch(signal.id, { hidden: !signal.hidden })}
                            >
                              {signal.hidden ? labels.unhide : labels.hide}
                            </Button>
                            <Button
                              type="button"
                              size="sm"
                              disabled={saving}
                              onClick={() =>
                                void patch(signal.id, { promote: true }, labels.promoted)
                              }
                            >
                              {saving ? (
                                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                              ) : (
                                labels.promote
                              )}
                            </Button>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
