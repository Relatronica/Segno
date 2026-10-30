'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  ExternalLink,
  Eye,
  EyeOff,
  Loader2,
  LogOut,
  Pencil,
  Plus,
  RefreshCw,
  Save,
  Trash2,
  X,
} from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { useT } from '@/lib/i18n/useT';
import { localIsoDate } from '@/lib/dates';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  ALL_LENSES,
  ALL_SENTIMENT_TAGS,
  LENS_META,
  lobbyActors,
  lobbyPeople,
  type EventType,
  type Lens,
  type LocaleText,
  type SentimentTag,
} from '@/lib/data/trasparenza';
import { ALL_EVENT_TYPES } from '@/lib/trasparenza/constants';
import type {
  AutoSignal,
  CreatedEvent,
  CuratedPin,
  SentimentCandidate,
} from '@/lib/pipeline/types';
import { SignalDesk } from '@/app/redazione/SignalDesk';
import { cn } from '@/lib/utils';

type Counts = {
  pending: number;
  approved: number;
  published: number;
  rejected: number;
  signals?: number;
  manual?: number;
};

type Desk = 'queue' | 'auto' | 'live' | 'rejected';

type CuratedDraft = {
  date?: string;
  title?: LocaleText;
  summary?: LocaleText;
  quote?: LocaleText;
  sentiment?: SentimentTag | '';
  personId?: string;
};

/** Everything the hand-written pin form edits, in flat strings. */
type ManualDraft = {
  id?: string;
  date: string;
  lens: Lens;
  type: EventType;
  titleIt: string;
  titleEn: string;
  summaryIt: string;
  summaryEn: string;
  detailIt: string;
  detailEn: string;
  quoteIt: string;
  quoteEn: string;
  sentiment: SentimentTag | '';
  personId: string;
  actorId: string;
  amountEur: string;
  sourceLabelIt: string;
  sourceLabelEn: string;
  sourceUrl: string;
};

type QueueRow = {
  kind: 'pipeline';
  id: string;
  date: string;
  candidate: SentimentCandidate;
};

type TimelineRow =
  | QueueRow
  | { kind: 'curated'; id: string; date: string; pin: CuratedPin }
  | { kind: 'manual'; id: string; date: string; event: CreatedEvent };

const PRESENT_PIN_ID = 'e-2026-09-today';

const fieldClass =
  'border-input w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]';

function yesterdayIso(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return localIsoDate(d);
}

function emptyManualDraft(): ManualDraft {
  return {
    date: localIsoDate(),
    lens: 'policy',
    type: 'milestone',
    titleIt: '',
    titleEn: '',
    summaryIt: '',
    summaryEn: '',
    detailIt: '',
    detailEn: '',
    quoteIt: '',
    quoteEn: '',
    sentiment: '',
    personId: '',
    actorId: '',
    amountEur: '',
    sourceLabelIt: '',
    sourceLabelEn: '',
    sourceUrl: '',
  };
}

function draftFromEvent(e: CreatedEvent): ManualDraft {
  return {
    id: e.id,
    date: e.date,
    lens: e.lens,
    type: e.type,
    titleIt: e.title.it,
    titleEn: e.title.en,
    summaryIt: e.summary.it,
    summaryEn: e.summary.en,
    detailIt: e.detail?.it ?? '',
    detailEn: e.detail?.en ?? '',
    quoteIt: e.quote?.it ?? '',
    quoteEn: e.quote?.en ?? '',
    sentiment: e.sentiment ?? '',
    personId: e.personId ?? '',
    actorId: e.actorId ?? '',
    amountEur: e.amountEur ? String(e.amountEur) : '',
    sourceLabelIt: e.sourceLabel.it,
    sourceLabelEn: e.sourceLabel.en,
    sourceUrl: e.sourceUrl,
  };
}

function groupByDay<T extends { date: string }>(rows: T[]): { date: string; items: T[] }[] {
  const map = new Map<string, T[]>();
  for (const row of rows) {
    const key = row.date.slice(0, 10) || 'undated';
    const list = map.get(key) ?? [];
    list.push(row);
    map.set(key, list);
  }
  return [...map.entries()]
    .sort((a, b) => b[0].localeCompare(a[0]))
    .map(([date, items]) => ({ date, items }));
}

export default function RedazioneContent() {
  const t = useT();
  const locale = useAppStore((s) => s.locale) as 'it' | 'en';
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [discovering, setDiscovering] = useState(false);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [candidates, setCandidates] = useState<SentimentCandidate[]>([]);
  const [signals, setSignals] = useState<AutoSignal[]>([]);
  const [curated, setCurated] = useState<CuratedPin[]>([]);
  const [manual, setManual] = useState<CreatedEvent[]>([]);
  const [manualDraft, setManualDraft] = useState<ManualDraft | null>(null);
  const [manualSaving, setManualSaving] = useState(false);
  const [confirmManualDelete, setConfirmManualDelete] = useState(false);
  const [counts, setCounts] = useState<Counts | null>(null);
  const [filter, setFilter] = useState<Desk>('queue');
  const [openDays, setOpenDays] = useState<Record<string, boolean>>({});
  const [message, setMessage] = useState<string | null>(null);
  const [drafts, setDrafts] = useState<Record<string, Partial<SentimentCandidate>>>({});
  const [curatedDrafts, setCuratedDrafts] = useState<Record<string, CuratedDraft>>({});
  const [selected, setSelected] = useState<string[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [bulkBusy, setBulkBusy] = useState(false);

  const today = localIsoDate();
  const yesterday = yesterdayIso();

  const load = useCallback(async () => {
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch('/api/pipeline/candidates');
      if (res.status === 401 || res.status === 503) {
        setAuthed(false);
        return;
      }
      if (!res.ok) throw new Error('load_failed');
      const data = (await res.json()) as {
        candidates: SentimentCandidate[];
        signals?: AutoSignal[];
        curated?: CuratedPin[];
        manual?: CreatedEvent[];
        counts: Counts;
      };
      setCandidates(data.candidates);
      setSignals(data.signals ?? []);
      setCurated(data.curated ?? []);
      setManual(data.manual ?? []);
      setCounts(data.counts);
      setAuthed(true);
    } catch {
      setMessage(t.redazione.loadError);
      setAuthed(false);
    } finally {
      setLoading(false);
    }
  }, [t.redazione.loadError]);

  useEffect(() => {
    void load();
  }, [load]);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(false);
    const res = await fetch('/api/pipeline/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    if (!res.ok) {
      setLoginError(true);
      return;
    }
    setPassword('');
    await load();
  };

  const logout = async () => {
    await fetch('/api/pipeline/auth', { method: 'DELETE' });
    setAuthed(false);
    setCandidates([]);
    setSignals([]);
    setCurated([]);
    setManual([]);
    setManualDraft(null);
    setSelected([]);
  };

  const runDiscover = async () => {
    setDiscovering(true);
    setMessage(null);
    try {
      const res = await fetch('/api/pipeline/discover', { method: 'POST' });
      if (!res.ok) throw new Error('discover_failed');
      const data = (await res.json()) as { added: number; signalsAdded?: number };
      setMessage(
        t.redazione.discoverDone
          .replace('{n}', String(data.added))
          .replace('{s}', String(data.signalsAdded ?? 0)),
      );
      await load();
    } catch {
      setMessage(t.redazione.discoverError);
    } finally {
      setDiscovering(false);
    }
  };

  const patch = async (id: string, status?: SentimentCandidate['status']) => {
    const draft = drafts[id] || {};
    const current = candidates.find((c) => c.id === id);
    const quote = draft.quote ?? current?.quote;
    const nextStatus = status ?? current?.status;
    if ((nextStatus === 'published' || nextStatus === 'approved') && !quote?.en?.trim()) {
      setMessage(t.redazione.quoteRequired);
      return;
    }

    setMessage(null);
    setSavingId(id);
    const res = await fetch('/api/pipeline/candidates', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id,
        status,
        quote,
        title: draft.title ?? current?.title,
        summary: draft.summary ?? current?.summary,
        suggestedSentiment: draft.suggestedSentiment ?? current?.suggestedSentiment,
        date: draft.date ?? current?.date,
        personId: draft.personId ?? current?.personId,
        actorId: draft.actorId ?? current?.actorId,
      }),
    });
    setSavingId(null);

    if (!res.ok) {
      const payload = (await res.json().catch(() => null)) as { error?: string } | null;
      setMessage(
        payload?.error === 'quote_required'
          ? t.redazione.quoteRequired
          : t.redazione.saveError,
      );
      return;
    }

    setDrafts((d) => {
      const next = { ...d };
      delete next[id];
      return next;
    });
    setMessage(t.redazione.saved);
    await load();
  };

  const saveCurated = async (id: string, hidden?: boolean) => {
    const pin = curated.find((item) => item.event.id === id);
    if (!pin) return;
    const draft = curatedDrafts[id] || {};
    const event = pin.event;

    setMessage(null);
    setSavingId(id);
    const res = await fetch('/api/pipeline/events', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id,
        hidden,
        date: draft.date ?? event.date,
        title: draft.title ?? event.title,
        summary: draft.summary ?? event.summary,
        quote: draft.quote ?? event.quote ?? null,
        sentiment: (draft.sentiment ?? event.sentiment ?? '') || null,
        personId: draft.personId ?? event.personId ?? '',
      }),
    });
    setSavingId(null);

    if (!res.ok) {
      setMessage(t.redazione.saveError);
      return;
    }

    setCuratedDrafts((d) => {
      const next = { ...d };
      delete next[id];
      return next;
    });
    setMessage(t.redazione.saved);
    await load();
  };

  const saveManual = async () => {
    if (!manualDraft) return;
    const draft = manualDraft;
    if (!/^https?:\/\/\S+$/i.test(draft.sourceUrl.trim())) {
      setMessage(t.redazione.sourceRequired);
      return;
    }
    if (!draft.titleIt.trim() || !draft.summaryIt.trim()) {
      setMessage(t.redazione.requiredFields);
      return;
    }
    if (draft.sentiment && !draft.quoteIt.trim() && !draft.quoteEn.trim()) {
      setMessage(t.redazione.sentimentNeedsQuote);
      return;
    }

    setMessage(null);
    setManualSaving(true);
    const res = await fetch('/api/pipeline/events', {
      method: draft.id ? 'PATCH' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: draft.id,
        date: draft.date,
        lens: draft.lens,
        type: draft.type,
        title: { it: draft.titleIt, en: draft.titleEn },
        summary: { it: draft.summaryIt, en: draft.summaryEn },
        detail: { it: draft.detailIt, en: draft.detailEn },
        quote: { it: draft.quoteIt, en: draft.quoteEn },
        sentiment: draft.sentiment || null,
        personId: draft.personId,
        actorId: draft.actorId,
        amountEur: draft.amountEur,
        sourceLabel: { it: draft.sourceLabelIt, en: draft.sourceLabelEn },
        sourceUrl: draft.sourceUrl.trim(),
      }),
    });
    setManualSaving(false);

    if (!res.ok) {
      const payload = (await res.json().catch(() => null)) as { error?: string } | null;
      const code = payload?.error;
      setMessage(
        code === 'duplicate_source'
          ? t.redazione.duplicateSource
          : code === 'sentiment_needs_quote'
            ? t.redazione.sentimentNeedsQuote
            : draft.id
              ? t.redazione.saveError
              : t.redazione.createError,
      );
      return;
    }

    setManualDraft(null);
    setMessage(t.redazione.saved);
    await load();
  };

  const deleteManual = async (id: string) => {
    if (!confirmManualDelete) {
      setConfirmManualDelete(true);
      return;
    }
    setManualSaving(true);
    setMessage(null);
    const res = await fetch('/api/pipeline/events', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    setManualSaving(false);
    setConfirmManualDelete(false);
    if (!res.ok) {
      setMessage(t.redazione.saveError);
      return;
    }
    setManualDraft((current) => (current?.id === id ? null : current));
    setMessage(t.redazione.deletedPin);
    await load();
  };

  const bulkReject = async () => {
    if (selected.length === 0) return;
    setBulkBusy(true);
    setMessage(null);
    const res = await fetch('/api/pipeline/candidates', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids: selected, status: 'rejected' }),
    });
    setBulkBusy(false);
    if (!res.ok) {
      setMessage(t.redazione.saveError);
      return;
    }
    const n = selected.length;
    setSelected([]);
    setConfirmDelete(false);
    setMessage(t.redazione.rejectedBulk.replace('{n}', String(n)));
    await load();
  };

  const bulkDelete = async () => {
    if (selected.length === 0) return;
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    setBulkBusy(true);
    setMessage(null);
    const res = await fetch('/api/pipeline/candidates', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids: selected }),
    });
    setBulkBusy(false);
    if (!res.ok) {
      setMessage(t.redazione.saveError);
      return;
    }
    const n = selected.length;
    setSelected([]);
    setConfirmDelete(false);
    setMessage(t.redazione.deleted.replace('{n}', String(n)));
    await load();
  };

  const visible = useMemo(() => {
    if (filter === 'queue') {
      return candidates.filter((c) => c.status === 'pending' || c.status === 'approved');
    }
    if (filter === 'rejected') {
      return candidates.filter((c) => c.status === 'rejected');
    }
    return [];
  }, [candidates, filter]);

  const timelineRows = useMemo((): TimelineRow[] => {
    const published: TimelineRow[] = candidates
      .filter((c) => c.status === 'published')
      .map((candidate) => ({
        kind: 'pipeline' as const,
        id: candidate.id,
        date: drafts[candidate.id]?.date ?? candidate.date,
        candidate,
      }));
    const curatedRows: TimelineRow[] = curated.map((pin) => ({
      kind: 'curated' as const,
      id: pin.event.id,
      date: curatedDrafts[pin.event.id]?.date ?? pin.event.date,
      pin,
    }));
    const manualRows: TimelineRow[] = manual.map((event) => ({
      kind: 'manual' as const,
      id: event.id,
      date: event.date,
      event,
    }));
    return [...curatedRows, ...manualRows, ...published].sort((a, b) =>
      b.date.localeCompare(a.date),
    );
  }, [candidates, curated, manual, drafts, curatedDrafts]);

  const rows: TimelineRow[] = useMemo(() => {
    if (filter === 'live') return timelineRows;
    if (filter === 'auto') return [];
    return visible.map((candidate) => ({
      kind: 'pipeline' as const,
      id: candidate.id,
      date: drafts[candidate.id]?.date ?? candidate.date,
      candidate,
    }));
  }, [filter, timelineRows, visible, drafts]);

  const grouped = useMemo(() => groupByDay(rows), [rows]);

  const dayIsOpen = (date: string) => {
    if (openDays[date] !== undefined) return openDays[date];
    return date === today || date === yesterday;
  };

  const toggleDayOpen = (date: string) => {
    setOpenDays((prev) => ({ ...prev, [date]: !dayIsOpen(date) }));
  };

  const dayLabel = (date: string) => {
    if (date === today) return t.redazione.today;
    if (date === yesterday) return t.redazione.yesterday;
    const [y, m, d] = date.split('-').map(Number);
    if (!y || !m || !d) return date;
    return new Intl.DateTimeFormat(locale === 'it' ? 'it-IT' : 'en-GB', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: date.slice(0, 4) !== today.slice(0, 4) ? 'numeric' : undefined,
    }).format(new Date(y, m - 1, d));
  };

  const toggleSelected = (id: string) => {
    setConfirmDelete(false);
    setSelected((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  };

  const toggleDay = (ids: string[]) => {
    setConfirmDelete(false);
    setSelected((current) => {
      const allOn = ids.every((id) => current.includes(id));
      if (allOn) return current.filter((id) => !ids.includes(id));
      return [...new Set([...current, ...ids])];
    });
  };

  const setFilterAndClear = (key: Desk) => {
    setFilter(key);
    setSelected([]);
    setConfirmDelete(false);
    setExpandedId(null);
    setOpenDays({});
  };

  const queueCount = counts
    ? counts.pending + counts.approved
    : candidates.filter((c) => c.status === 'pending' || c.status === 'approved').length;
  const liveCount = counts
    ? counts.published + curated.length + manual.length
    : candidates.filter((c) => c.status === 'published').length + curated.length + manual.length;
  const rejectedCount = counts?.rejected ?? candidates.filter((c) => c.status === 'rejected').length;
  const signalsCount = counts?.signals ?? signals.length;

  if (authed === null) {
    return (
      <div className="flex flex-1 items-center justify-center pb-24 pt-[calc(var(--nav-clearance)+4rem)] text-sm text-muted-foreground">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        {t.redazione.loading}
      </div>
    );
  }

  if (!authed) {
    return (
      <section className="mx-auto max-w-md px-4 pb-20 pt-[calc(var(--nav-clearance)+3rem)] sm:px-6">
        <h1 className="font-serif text-3xl font-bold tracking-tight">{t.redazione.title}</h1>
        <p className="mt-3 text-sm text-muted-foreground">{t.redazione.loginHint}</p>
        <form onSubmit={login} className="mt-8 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="pipeline-password">{t.redazione.password}</Label>
            <Input
              id="pipeline-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>
          {loginError && (
            <p className="text-sm text-destructive" role="alert">
              {t.redazione.loginError}
            </p>
          )}
          <Button type="submit" className="w-full">
            {t.redazione.enter}
          </Button>
        </form>
      </section>
    );
  }

  return (
    <div className={cn('mx-auto max-w-4xl px-4 pb-12 pt-[calc(var(--nav-clearance)+2rem)] sm:px-6 lg:px-8', selected.length > 0 && 'pb-28')}>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-mark/80">
            {t.redazione.eyebrow}
          </p>
          <h1 className="mt-2 font-serif text-3xl font-bold tracking-tight">
            {t.redazione.title}
          </h1>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            {t.redazione.subtitle}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            onClick={() => {
              setMessage(null);
              setConfirmManualDelete(false);
              setManualDraft(emptyManualDraft());
            }}
          >
            <Plus className="h-4 w-4" />
            {t.redazione.newPin}
          </Button>
          <Button type="button" variant="outline" onClick={() => void runDiscover()} disabled={discovering}>
            {discovering ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
            {t.redazione.runDiscover}
          </Button>
          <Button type="button" variant="ghost" onClick={() => void logout()}>
            <LogOut className="h-4 w-4" />
            {t.redazione.logout}
          </Button>
        </div>
      </div>

      {manualDraft && (
        <ManualForm
          draft={manualDraft}
          locale={locale}
          saving={manualSaving}
          confirmDelete={confirmManualDelete}
          onChange={(next) => setManualDraft((current) => ({ ...current!, ...next }))}
          onSave={() => void saveManual()}
          onCancel={() => {
            setManualDraft(null);
            setConfirmManualDelete(false);
          }}
          onDelete={(id) => void deleteManual(id)}
        />
      )}

      <nav
        className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-4"
        aria-label={t.redazione.desksLabel}
      >
        {(
          [
            { key: 'queue' as const, label: t.redazione.desks.queue, count: queueCount },
            { key: 'auto' as const, label: t.redazione.desks.auto, count: signalsCount },
            { key: 'live' as const, label: t.redazione.desks.live, count: liveCount },
            { key: 'rejected' as const, label: t.redazione.desks.rejected, count: rejectedCount },
          ] as const
        ).map((desk) => (
          <button
            key={desk.key}
            type="button"
            onClick={() => setFilterAndClear(desk.key)}
            className={cn(
              'rounded-md border px-3 py-3 text-left transition-colors',
              filter === desk.key
                ? 'border-foreground bg-foreground text-background'
                : 'border-border/70 bg-card/40 text-foreground hover:border-foreground/30',
            )}
          >
            <span className="block text-sm font-medium">{desk.label}</span>
            <span
              className={cn(
                'mt-1 block font-mono text-[11px]',
                filter === desk.key ? 'text-background/70' : 'text-muted-foreground',
              )}
            >
              {desk.count}
            </span>
          </button>
        ))}
      </nav>

      {message && (
        <p className="mt-4 text-sm text-muted-foreground" role="status">
          {message}
        </p>
      )}

      <div className="mt-8">
        {filter === 'auto' ? (
          <SignalDesk
            signals={signals}
            locale={locale}
            labels={{
              hint: t.redazione.signalsHint,
              empty: t.redazione.signalsEmpty,
              hidden: t.redazione.hidden,
              hide: t.redazione.hide,
              unhide: t.redazione.unhide,
              promote: t.redazione.signalPromote,
              promoted: t.redazione.signalPromoted,
              open: t.redazione.openSource,
              error: t.redazione.saveError,
              today: t.redazione.today,
              yesterday: t.redazione.yesterday,
              itemsCount: t.redazione.itemsCount,
            }}
            onChanged={() => void load()}
          />
        ) : (
          <>
            {loading && (
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                {t.redazione.loading}
              </p>
            )}

            {!loading && grouped.length === 0 && (
              <p className="border border-dashed border-border/70 px-4 py-10 text-center text-sm text-muted-foreground">
                {t.redazione.empty}
              </p>
            )}

            <div className="space-y-3">
              {grouped.map((group) => {
                const pipelineIds = group.items
                  .filter((row): row is QueueRow => row.kind === 'pipeline')
                  .map((row) => row.id);
                const allDayOn =
                  pipelineIds.length > 0 && pipelineIds.every((id) => selected.includes(id));
                const open = dayIsOpen(group.date);

                return (
                  <section key={group.date} className="border border-border/60 bg-card/30">
                    <header className="flex flex-wrap items-center gap-2 px-3 py-2.5">
                      {pipelineIds.length > 0 && (
                        <input
                          type="checkbox"
                          checked={allDayOn}
                          onChange={() => toggleDay(pipelineIds)}
                          className="size-4 accent-foreground"
                          aria-label={t.redazione.selectDay}
                        />
                      )}
                      <button
                        type="button"
                        onClick={() => toggleDayOpen(group.date)}
                        className="flex min-w-0 flex-1 items-center gap-2 text-left"
                      >
                        {open ? (
                          <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
                        ) : (
                          <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                        )}
                        <h2 className="font-serif text-lg font-semibold tracking-tight">
                          {dayLabel(group.date)}
                        </h2>
                        <span className="ml-auto font-mono text-[11px] text-muted-foreground">
                          {t.redazione.itemsCount.replace('{n}', String(group.items.length))}
                        </span>
                      </button>
                    </header>

                    {open && (
                      <div className="space-y-3 border-t border-border/50 px-3 py-3">
                        {group.items.map((row) => {
                          if (row.kind === 'pipeline') {
                            return (
                              <CandidateCard
                                key={row.id}
                                c={row.candidate}
                                draft={drafts[row.id] || {}}
                                saving={savingId === row.id}
                                selected={selected.includes(row.id)}
                                expanded={expandedId === row.id}
                                onToggleSelect={() => toggleSelected(row.id)}
                                onToggleExpand={() =>
                                  setExpandedId((current) => (current === row.id ? null : row.id))
                                }
                                onDraft={(next) =>
                                  setDrafts((d) => ({ ...d, [row.id]: { ...d[row.id], ...next } }))
                                }
                                onPatch={patch}
                              />
                            );
                          }
                          if (row.kind === 'manual') {
                            return (
                              <ManualRow
                                key={row.id}
                                event={row.event}
                                locale={locale}
                                onEdit={() => {
                                  setMessage(null);
                                  setConfirmManualDelete(false);
                                  setManualDraft(draftFromEvent(row.event));
                                }}
                              />
                            );
                          }
                          return (
                            <CuratedCard
                              key={row.id}
                              pin={row.pin}
                              draft={curatedDrafts[row.id] || {}}
                              locale={locale}
                              saving={savingId === row.id}
                              expanded={expandedId === row.id}
                              onToggleExpand={() =>
                                setExpandedId((current) => (current === row.id ? null : row.id))
                              }
                              onDraft={(next) =>
                                setCuratedDrafts((d) => ({
                                  ...d,
                                  [row.id]: { ...d[row.id], ...next },
                                }))
                              }
                              onSave={saveCurated}
                            />
                          );
                        })}
                      </div>
                    )}
                  </section>
                );
              })}
            </div>
          </>
        )}
      </div>

      <p className="mt-12 text-center text-sm text-muted-foreground">
        <Link href="/trasparenza" className="inline-flex items-center gap-1 hover:text-foreground">
          {t.redazione.backTimeline}
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </p>

      {selected.length > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 px-4 py-3 backdrop-blur">
          <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-3">
            <p className="text-sm font-medium">
              {t.redazione.selectedCount.replace('{n}', String(selected.length))}
            </p>
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSelected([]);
                  setConfirmDelete(false);
                }}
              >
                {t.redazione.clearSelection}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={bulkBusy}
                onClick={() => void bulkReject()}
              >
                <X className="h-4 w-4" />
                {t.redazione.bulkReject}
              </Button>
              <Button
                type="button"
                variant={confirmDelete ? 'destructive' : 'outline'}
                size="sm"
                disabled={bulkBusy}
                onClick={() => void bulkDelete()}
              >
                {bulkBusy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                {confirmDelete ? t.redazione.bulkConfirm : t.redazione.bulkDelete}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Thumb({ src, alt }: { src?: string; alt: string }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) return null;
  return (
    // RSS thumbs come from many CDNs; a native img avoids next/image host allowlists.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={160}
      height={100}
      className="h-20 w-28 shrink-0 rounded-md bg-muted object-cover"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
    />
  );
}

function CandidateCard({
  c,
  draft,
  saving,
  selected,
  expanded,
  onToggleSelect,
  onToggleExpand,
  onDraft,
  onPatch,
}: {
  c: SentimentCandidate;
  draft: Partial<SentimentCandidate>;
  saving: boolean;
  selected: boolean;
  expanded: boolean;
  onToggleSelect: () => void;
  onToggleExpand: () => void;
  onDraft: (next: Partial<SentimentCandidate>) => void;
  onPatch: (id: string, status?: SentimentCandidate['status']) => void;
}) {
  const t = useT();
  const quote = draft.quote?.en ?? c.quote?.en ?? '';
  const title = draft.title?.en ?? c.title.en;
  const summary = draft.summary?.en ?? c.summary.en;
  const sentiment = (draft.suggestedSentiment ?? c.suggestedSentiment) as
    | SentimentTag
    | undefined;

  return (
    <article
      className={cn(
        'border bg-card/40 p-4 sm:p-5',
        selected ? 'border-foreground/40' : 'border-border/60',
      )}
    >
      <div className="flex gap-3">
        <input
          type="checkbox"
          checked={selected}
          onChange={onToggleSelect}
          className="mt-1 size-4 shrink-0 accent-foreground"
          aria-label={title}
        />
        <Thumb src={c.imageUrl} alt="" />
        <div className="min-w-0 flex-1">
          <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            {c.date} · {c.personId || '—'} · {t.redazione.pipeline} · {c.status}
            {c.sourceTier ? ` · ${c.sourceTier}` : ''}
            {c.xQuoted ? ' · X' : ''}
          </p>
          <h3 className="mt-1 text-base font-semibold tracking-tight">{title}</h3>
          {!expanded && (
            <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
              {c.rawSnippet || c.summary.en}
            </p>
          )}
        </div>
        <div className="flex shrink-0 flex-col items-end gap-2">
          <a
            href={c.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-mark hover:underline"
          >
            {t.redazione.openSource}
            <ExternalLink className="h-3 w-3" />
          </a>
          <Button type="button" variant="ghost" size="sm" onClick={onToggleExpand}>
            {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            {expanded ? t.redazione.collapse : t.redazione.expand}
          </Button>
        </div>
      </div>

      {expanded && (
        <div className="mt-4 space-y-4 border-t border-border/50 pt-4">
          <p className="text-sm leading-relaxed text-muted-foreground">
            {c.rawSnippet || c.summary.en}
          </p>

          <div className="space-y-2">
            <Label htmlFor={`title-${c.id}`}>{t.redazione.titleField}</Label>
            <Input
              id={`title-${c.id}`}
              value={title}
              onChange={(e) =>
                onDraft({ title: { it: e.target.value, en: e.target.value } })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`summary-${c.id}`}>{t.redazione.summaryField}</Label>
            <textarea
              id={`summary-${c.id}`}
              rows={2}
              value={summary}
              onChange={(e) =>
                onDraft({ summary: { it: e.target.value, en: e.target.value } })
              }
              className={fieldClass}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`quote-${c.id}`}>{t.redazione.quote}</Label>
            <textarea
              id={`quote-${c.id}`}
              rows={3}
              value={quote}
              onChange={(e) =>
                onDraft({ quote: { it: e.target.value, en: e.target.value } })
              }
              className={fieldClass}
              placeholder={t.redazione.quotePlaceholder}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor={`sent-${c.id}`}>{t.redazione.sentiment}</Label>
              <select
                id={`sent-${c.id}`}
                value={sentiment || ''}
                onChange={(e) =>
                  onDraft({
                    suggestedSentiment: (e.target.value || undefined) as SentimentTag | undefined,
                  })
                }
                className="border-input h-9 w-full rounded-md border bg-transparent px-3 text-sm"
              >
                <option value="">{t.redazione.sentimentNone}</option>
                {ALL_SENTIMENT_TAGS.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor={`date-${c.id}`}>{t.redazione.date}</Label>
              <Input
                id={`date-${c.id}`}
                type="date"
                max={localIsoDate()}
                value={draft.date ?? c.date}
                onChange={(e) => onDraft({ date: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`person-${c.id}`}>{t.redazione.person}</Label>
              <select
                id={`person-${c.id}`}
                value={draft.personId ?? c.personId ?? ''}
                onChange={(e) => onDraft({ personId: e.target.value || undefined })}
                className="border-input h-9 w-full rounded-md border bg-transparent px-3 text-sm"
              >
                <option value="">{t.redazione.personNone}</option>
                {lobbyPeople.map((person) => (
                  <option key={person.id} value={person.id}>
                    {person.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {c.status === 'published' && (
              <>
                <Button type="button" onClick={() => void onPatch(c.id)} disabled={saving}>
                  {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                  {t.redazione.save}
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => void onPatch(c.id, 'pending')}
                  disabled={saving}
                >
                  {t.redazione.unpublish}
                </Button>
              </>
            )}
            {c.status !== 'published' && (
              <Button type="button" onClick={() => void onPatch(c.id, 'published')} disabled={saving}>
                <Check className="h-4 w-4" />
                {t.redazione.publish}
              </Button>
            )}
            {c.status !== 'rejected' && (
              <Button
                type="button"
                variant="outline"
                onClick={() => void onPatch(c.id, 'rejected')}
                disabled={saving}
              >
                <X className="h-4 w-4" />
                {t.redazione.reject}
              </Button>
            )}
            {c.status === 'rejected' && (
              <Button
                type="button"
                variant="secondary"
                onClick={() => void onPatch(c.id, 'pending')}
                disabled={saving}
              >
                {t.redazione.restore}
              </Button>
            )}
          </div>
        </div>
      )}
    </article>
  );
}

function CuratedCard({
  pin,
  draft,
  locale,
  saving,
  expanded,
  onToggleExpand,
  onDraft,
  onSave,
}: {
  pin: CuratedPin;
  draft: CuratedDraft;
  locale: 'it' | 'en';
  saving: boolean;
  expanded: boolean;
  onToggleExpand: () => void;
  onDraft: (next: CuratedDraft) => void;
  onSave: (id: string, hidden?: boolean) => void;
}) {
  const t = useT();
  const event = pin.event;
  const title = draft.title ?? event.title;
  const summary = draft.summary ?? event.summary;
  const quote = draft.quote ?? event.quote ?? { it: '', en: '' };
  const canHide = event.id !== PRESENT_PIN_ID;

  const setLocale = (
    field: 'title' | 'summary' | 'quote',
    lang: 'it' | 'en',
    value: string,
  ) => {
    const current =
      field === 'title' ? title : field === 'summary' ? summary : quote;
    onDraft({ [field]: { ...current, [lang]: value } });
  };

  return (
    <article
      className={cn(
        'border bg-card/40 p-4 sm:p-5',
        pin.hidden ? 'border-dashed border-border/50 opacity-70' : 'border-border/60',
      )}
    >
      <div className="flex gap-3">
        <div className="min-w-0 flex-1">
          <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            {event.date} · {event.personId || '—'} · {t.redazione.curated} · {pin.themeName[locale]}
            {pin.edited ? ` · ${t.redazione.edited}` : ''}
            {pin.hidden ? ` · ${t.redazione.hidden}` : ''}
          </p>
          <h3 className="mt-1 text-base font-semibold tracking-tight">{title[locale]}</h3>
          {!expanded && (
            <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{summary[locale]}</p>
          )}
        </div>
        <div className="flex shrink-0 flex-col items-end gap-2">
          <a
            href={event.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-mark hover:underline"
          >
            {t.redazione.openSource}
            <ExternalLink className="h-3 w-3" />
          </a>
          <Button type="button" variant="ghost" size="sm" onClick={onToggleExpand}>
            {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            {expanded ? t.redazione.collapse : t.redazione.expand}
          </Button>
        </div>
      </div>

      {expanded && (
        <div className="mt-4 space-y-4 border-t border-border/50 pt-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor={`ct-it-${event.id}`}>{t.redazione.titleIt}</Label>
              <Input
                id={`ct-it-${event.id}`}
                value={title.it}
                onChange={(e) => setLocale('title', 'it', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`ct-en-${event.id}`}>{t.redazione.titleEn}</Label>
              <Input
                id={`ct-en-${event.id}`}
                value={title.en}
                onChange={(e) => setLocale('title', 'en', e.target.value)}
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor={`cs-it-${event.id}`}>{t.redazione.summaryIt}</Label>
              <textarea
                id={`cs-it-${event.id}`}
                rows={3}
                value={summary.it}
                onChange={(e) => setLocale('summary', 'it', e.target.value)}
                className={fieldClass}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`cs-en-${event.id}`}>{t.redazione.summaryEn}</Label>
              <textarea
                id={`cs-en-${event.id}`}
                rows={3}
                value={summary.en}
                onChange={(e) => setLocale('summary', 'en', e.target.value)}
                className={fieldClass}
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor={`cq-it-${event.id}`}>{t.redazione.quoteIt}</Label>
              <textarea
                id={`cq-it-${event.id}`}
                rows={3}
                value={quote.it}
                onChange={(e) => setLocale('quote', 'it', e.target.value)}
                className={fieldClass}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`cq-en-${event.id}`}>{t.redazione.quoteEn}</Label>
              <textarea
                id={`cq-en-${event.id}`}
                rows={3}
                value={quote.en}
                onChange={(e) => setLocale('quote', 'en', e.target.value)}
                className={fieldClass}
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor={`c-sent-${event.id}`}>{t.redazione.sentiment}</Label>
              <select
                id={`c-sent-${event.id}`}
                value={draft.sentiment ?? event.sentiment ?? ''}
                onChange={(e) =>
                  onDraft({ sentiment: (e.target.value || '') as SentimentTag | '' })
                }
                className="border-input h-9 w-full rounded-md border bg-transparent px-3 text-sm"
              >
                <option value="">{t.redazione.sentimentNone}</option>
                {ALL_SENTIMENT_TAGS.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor={`c-date-${event.id}`}>{t.redazione.date}</Label>
              <Input
                id={`c-date-${event.id}`}
                type="date"
                max={localIsoDate()}
                value={draft.date ?? event.date}
                disabled={event.id === PRESENT_PIN_ID}
                onChange={(e) => onDraft({ date: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`c-person-${event.id}`}>{t.redazione.person}</Label>
              <select
                id={`c-person-${event.id}`}
                value={draft.personId ?? event.personId ?? ''}
                onChange={(e) => onDraft({ personId: e.target.value })}
                className="border-input h-9 w-full rounded-md border bg-transparent px-3 text-sm"
              >
                <option value="">{t.redazione.personNone}</option>
                {lobbyPeople.map((person) => (
                  <option key={person.id} value={person.id}>
                    {person.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={() => void onSave(event.id)} disabled={saving}>
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              {t.redazione.save}
            </Button>
            {canHide && !pin.hidden && (
              <Button
                type="button"
                variant="outline"
                onClick={() => void onSave(event.id, true)}
                disabled={saving}
              >
                <EyeOff className="h-4 w-4" />
                {t.redazione.hide}
              </Button>
            )}
            {pin.hidden && (
              <Button
                type="button"
                variant="secondary"
                onClick={() => void onSave(event.id, false)}
                disabled={saving}
              >
                <Eye className="h-4 w-4" />
                {t.redazione.unhide}
              </Button>
            )}
          </div>
        </div>
      )}
    </article>
  );
}

function ManualRow({
  event,
  locale,
  onEdit,
}: {
  event: CreatedEvent;
  locale: 'it' | 'en';
  onEdit: () => void;
}) {
  const t = useT();
  return (
    <article className="border border-border/60 bg-card/40 p-4 sm:p-5">
      <div className="flex gap-3">
        <div className="min-w-0 flex-1">
          <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            {event.date} · {event.personId || '—'} · {t.redazione.manual} ·{' '}
            {LENS_META[event.lens].label[locale]} · {t.trasparenza.types[event.type]}
          </p>
          <h3 className="mt-1 text-base font-semibold tracking-tight">{event.title[locale]}</h3>
          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{event.summary[locale]}</p>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-2">
          <a
            href={event.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-mark hover:underline"
          >
            {t.redazione.openSource}
            <ExternalLink className="h-3 w-3" />
          </a>
          <Button type="button" variant="ghost" size="sm" onClick={onEdit}>
            <Pencil className="h-4 w-4" />
            {t.redazione.expand}
          </Button>
        </div>
      </div>
    </article>
  );
}

function ManualForm({
  draft,
  locale,
  saving,
  confirmDelete,
  onChange,
  onSave,
  onCancel,
  onDelete,
}: {
  draft: ManualDraft;
  locale: 'it' | 'en';
  saving: boolean;
  confirmDelete: boolean;
  onChange: (next: Partial<ManualDraft>) => void;
  onSave: () => void;
  onCancel: () => void;
  onDelete: (id: string) => void;
}) {
  const t = useT();
  const hasQuote = Boolean(draft.quoteIt.trim() || draft.quoteEn.trim());

  return (
    <section className="mt-8 border border-foreground/30 bg-card/40 p-4 sm:p-6">
      <h2 className="font-serif text-xl font-semibold tracking-tight">
        {draft.id ? t.redazione.editPin : t.redazione.newPin}
      </h2>

      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="m-date">{t.redazione.date}</Label>
          <Input
            id="m-date"
            type="date"
            max={localIsoDate()}
            value={draft.date}
            onChange={(e) => onChange({ date: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="m-lens">{t.redazione.lens}</Label>
          <select
            id="m-lens"
            value={draft.lens}
            onChange={(e) => onChange({ lens: e.target.value as Lens })}
            className="border-input h-9 w-full rounded-md border bg-transparent px-3 text-sm"
          >
            {ALL_LENSES.map((lens) => (
              <option key={lens} value={lens}>
                {LENS_META[lens].label[locale]}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="m-type">{t.redazione.eventType}</Label>
          <select
            id="m-type"
            value={draft.type}
            onChange={(e) => onChange({ type: e.target.value as EventType })}
            className="border-input h-9 w-full rounded-md border bg-transparent px-3 text-sm"
          >
            {ALL_EVENT_TYPES.map((type) => (
              <option key={type} value={type}>
                {t.trasparenza.types[type]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="m-title-it">{t.redazione.titleIt}</Label>
          <Input
            id="m-title-it"
            value={draft.titleIt}
            onChange={(e) => onChange({ titleIt: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="m-title-en">{t.redazione.titleEn}</Label>
          <Input
            id="m-title-en"
            value={draft.titleEn}
            onChange={(e) => onChange({ titleEn: e.target.value })}
          />
        </div>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="m-summary-it">{t.redazione.summaryIt}</Label>
          <textarea
            id="m-summary-it"
            rows={3}
            value={draft.summaryIt}
            onChange={(e) => onChange({ summaryIt: e.target.value })}
            className={fieldClass}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="m-summary-en">{t.redazione.summaryEn}</Label>
          <textarea
            id="m-summary-en"
            rows={3}
            value={draft.summaryEn}
            onChange={(e) => onChange({ summaryEn: e.target.value })}
            className={fieldClass}
          />
        </div>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="m-detail-it">{t.redazione.detailIt}</Label>
          <textarea
            id="m-detail-it"
            rows={2}
            value={draft.detailIt}
            onChange={(e) => onChange({ detailIt: e.target.value })}
            className={fieldClass}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="m-detail-en">{t.redazione.detailEn}</Label>
          <textarea
            id="m-detail-en"
            rows={2}
            value={draft.detailEn}
            onChange={(e) => onChange({ detailEn: e.target.value })}
            className={fieldClass}
          />
        </div>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="m-quote-it">{t.redazione.quoteIt}</Label>
          <textarea
            id="m-quote-it"
            rows={3}
            value={draft.quoteIt}
            onChange={(e) => onChange({ quoteIt: e.target.value })}
            className={fieldClass}
            placeholder={t.redazione.quotePlaceholder}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="m-quote-en">{t.redazione.quoteEn}</Label>
          <textarea
            id="m-quote-en"
            rows={3}
            value={draft.quoteEn}
            onChange={(e) => onChange({ quoteEn: e.target.value })}
            className={fieldClass}
          />
        </div>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="m-person">{t.redazione.person}</Label>
          <select
            id="m-person"
            value={draft.personId}
            onChange={(e) => onChange({ personId: e.target.value })}
            className="border-input h-9 w-full rounded-md border bg-transparent px-3 text-sm"
          >
            <option value="">{t.redazione.personNone}</option>
            {lobbyPeople.map((person) => (
              <option key={person.id} value={person.id}>
                {person.name}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="m-actor">{t.redazione.actor}</Label>
          <select
            id="m-actor"
            value={draft.actorId}
            onChange={(e) => onChange({ actorId: e.target.value })}
            className="border-input h-9 w-full rounded-md border bg-transparent px-3 text-sm"
          >
            <option value="">{t.redazione.actorNone}</option>
            {lobbyActors.map((actor) => (
              <option key={actor.id} value={actor.id}>
                {actor.name}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="m-sentiment">{t.redazione.sentiment}</Label>
          <select
            id="m-sentiment"
            value={draft.sentiment}
            disabled={!hasQuote}
            onChange={(e) =>
              onChange({ sentiment: (e.target.value || '') as SentimentTag | '' })
            }
            className="border-input h-9 w-full rounded-md border bg-transparent px-3 text-sm disabled:opacity-50"
          >
            <option value="">{t.redazione.sentimentNone}</option>
            {ALL_SENTIMENT_TAGS.map((tag) => (
              <option key={tag} value={tag}>
                {t.trasparenza.sentiments[tag]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="m-amount">{t.redazione.amount}</Label>
          <Input
            id="m-amount"
            type="number"
            min={0}
            step={1}
            value={draft.amountEur}
            onChange={(e) => onChange({ amountEur: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="m-source">{t.redazione.sourceUrl}</Label>
          <Input
            id="m-source"
            type="url"
            value={draft.sourceUrl}
            onChange={(e) => onChange({ sourceUrl: e.target.value })}
            placeholder="https://…"
          />
        </div>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="m-src-it">{t.redazione.sourceLabelIt}</Label>
          <Input
            id="m-src-it"
            value={draft.sourceLabelIt}
            onChange={(e) => onChange({ sourceLabelIt: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="m-src-en">{t.redazione.sourceLabelEn}</Label>
          <Input
            id="m-src-en"
            value={draft.sourceLabelEn}
            onChange={(e) => onChange({ sourceLabelEn: e.target.value })}
          />
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <Button type="button" onClick={onSave} disabled={saving}>
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {draft.id ? t.redazione.save : t.redazione.createPin}
        </Button>
        <Button type="button" variant="ghost" onClick={onCancel} disabled={saving}>
          {t.redazione.cancel}
        </Button>
        {draft.id && (
          <Button
            type="button"
            variant={confirmDelete ? 'destructive' : 'outline'}
            className="ml-auto"
            onClick={() => onDelete(draft.id as string)}
            disabled={saving}
          >
            <Trash2 className="h-4 w-4" />
            {confirmDelete ? t.redazione.deletePinConfirm : t.redazione.deletePin}
          </Button>
        )}
      </div>
    </section>
  );
}
