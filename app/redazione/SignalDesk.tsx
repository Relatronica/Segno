'use client';

import { useState } from 'react';
import { ExternalLink, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  ALL_SENTIMENT_TAGS,
  lobbyPeople,
  type SentimentTag,
} from '@/lib/data/trasparenza';
import { effectiveSentiment } from '@/lib/pipeline/signals';
import type { AutoSignal } from '@/lib/pipeline/types';

export type SignalDeskLabels = {
  title: string;
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
};

type Props = {
  signals: AutoSignal[];
  locale: 'it' | 'en';
  labels: SignalDeskLabels;
  sentimentLabels: Record<SentimentTag, string>;
  onChanged: () => void;
};

export function SignalDesk({ signals, locale, labels, sentimentLabels, onChanged }: Props) {
  const [busy, setBusy] = useState<string | null>(null);
  const [note, setNote] = useState<string | null>(null);
  const shown = signals.slice(0, 40);

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
    <section className="mt-10 border border-border/70 bg-card/40">
      <div className="border-b border-border/60 px-4 py-3">
        <h2 className="font-serif text-lg font-semibold">{labels.title}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{labels.hint}</p>
      </div>

      {note && (
        <p className="px-4 pt-3 text-sm text-muted-foreground" role="status">
          {note}
        </p>
      )}

      {shown.length === 0 ? (
        <p className="px-4 py-8 text-center text-sm text-muted-foreground">{labels.empty}</p>
      ) : (
        <ul className="divide-y divide-border/50">
          {shown.map((signal) => {
            const person = lobbyPeople.find((item) => item.id === signal.personId);
            const live = effectiveSentiment(signal);
            const selected =
              signal.sentimentOverride === null
                ? ''
                : (signal.sentimentOverride ?? signal.sentiment ?? '');
            const saving = busy === signal.id;
            return (
              <li key={signal.id} className="flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-start">
                <div className="min-w-0 flex-1">
                  <p className="font-mono text-[11px] text-muted-foreground">
                    {signal.date}
                    {person ? ` · ${person.shortName}` : ''}
                    {' · '}
                    {signal.hidden ? labels.hidden : live ? labels.voting : labels.held}
                    {signal.confidence > 0 ? ` · ${Math.round(signal.confidence * 100)}%` : ''}
                  </p>
                  <p className="mt-1 text-sm font-medium leading-snug">{signal.title[locale]}</p>
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
                    onClick={() => void patch(signal.id, { promote: true }, labels.promoted)}
                  >
                    {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : labels.promote}
                  </Button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
