'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Check,
  ExternalLink,
  Eye,
  EyeOff,
  Loader2,
  LogOut,
  RefreshCw,
  Save,
  X,
} from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { useT } from '@/lib/i18n/useT';
import { localIsoDate } from '@/lib/dates';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  ALL_SENTIMENT_TAGS,
  lobbyPeople,
  type LocaleText,
  type SentimentTag,
} from '@/lib/data/trasparenza';
import type { CuratedPin, SentimentCandidate } from '@/lib/pipeline/types';
import { cn } from '@/lib/utils';

type Counts = {
  pending: number;
  approved: number;
  published: number;
  rejected: number;
};

type CuratedDraft = {
  date?: string;
  title?: LocaleText;
  summary?: LocaleText;
  quote?: LocaleText;
  sentiment?: SentimentTag | '';
  personId?: string;
};

const PRESENT_PIN_ID = 'e-2026-09-today';

const fieldClass =
  'border-input w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]';

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
  const [curated, setCurated] = useState<CuratedPin[]>([]);
  const [counts, setCounts] = useState<Counts | null>(null);
  const [filter, setFilter] = useState<'pending' | 'published' | 'rejected' | 'all'>(
    'pending',
  );
  const [message, setMessage] = useState<string | null>(null);
  const [drafts, setDrafts] = useState<Record<string, Partial<SentimentCandidate>>>({});
  const [curatedDrafts, setCuratedDrafts] = useState<Record<string, CuratedDraft>>({});

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
        curated?: CuratedPin[];
        counts: Counts;
      };
      setCandidates(data.candidates);
      setCurated(data.curated ?? []);
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
    setCurated([]);
  };

  const runDiscover = async () => {
    setDiscovering(true);
    setMessage(null);
    try {
      const res = await fetch('/api/pipeline/discover', { method: 'POST' });
      if (!res.ok) throw new Error('discover_failed');
      const data = (await res.json()) as { added: number; pending: number };
      setMessage(t.redazione.discoverDone.replace('{n}', String(data.added)));
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

  const visible = useMemo(() => {
    if (filter === 'all') return candidates;
    return candidates.filter((c) => c.status === filter);
  }, [candidates, filter]);

  const timelineRows = useMemo(() => {
    const published = candidates
      .filter((c) => c.status === 'published')
      .map((candidate) => ({
        kind: 'pipeline' as const,
        id: candidate.id,
        date: drafts[candidate.id]?.date ?? candidate.date,
        candidate,
      }));
    const curatedRows = curated.map((pin) => ({
      kind: 'curated' as const,
      id: pin.event.id,
      date: curatedDrafts[pin.event.id]?.date ?? pin.event.date,
      pin,
    }));
    return [...curatedRows, ...published].sort((a, b) => b.date.localeCompare(a.date));
  }, [candidates, curated, drafts, curatedDrafts]);

  if (authed === null) {
    return (
      <div className="flex flex-1 items-center justify-center py-24 text-sm text-muted-foreground">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        {t.redazione.loading}
      </div>
    );
  }

  if (!authed) {
    return (
      <section className="mx-auto max-w-md px-4 py-20 sm:px-6">
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
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
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

      {counts && (
        <div className="mt-8 flex flex-wrap gap-3 font-mono text-xs text-muted-foreground">
          <span>{t.redazione.pending}: {counts.pending}</span>
          <span>·</span>
          <span>{t.redazione.published}: {counts.published}</span>
          <span>·</span>
          <span>{t.redazione.rejected}: {counts.rejected}</span>
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        {(['pending', 'published', 'rejected', 'all'] as const).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setFilter(key)}
            className={cn(
              'rounded-md border px-3 py-1.5 text-xs font-medium transition-colors',
              filter === key
                ? 'border-foreground bg-foreground text-background'
                : 'border-border text-muted-foreground hover:text-foreground',
            )}
          >
            {t.redazione.filters[key]}
          </button>
        ))}
      </div>

      {message && (
        <p className="mt-4 text-sm text-muted-foreground" role="status">
          {message}
        </p>
      )}

      <div className="mt-8 space-y-6">
        {loading && (
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            {t.redazione.loading}
          </p>
        )}

        {!loading && filter !== 'published' && visible.length === 0 && (
          <p className="border border-dashed border-border/70 px-4 py-10 text-center text-sm text-muted-foreground">
            {t.redazione.empty}
          </p>
        )}

        {filter === 'published' &&
          timelineRows.map((row) =>
            row.kind === 'pipeline' ? (
              <CandidateCard
                key={row.id}
                c={row.candidate}
                draft={drafts[row.id] || {}}
                saving={savingId === row.id}
                onDraft={(next) =>
                  setDrafts((d) => ({ ...d, [row.id]: { ...d[row.id], ...next } }))
                }
                onPatch={patch}
              />
            ) : (
              <CuratedCard
                key={row.id}
                pin={row.pin}
                draft={curatedDrafts[row.id] || {}}
                locale={locale}
                saving={savingId === row.id}
                onDraft={(next) =>
                  setCuratedDrafts((d) => ({
                    ...d,
                    [row.id]: { ...d[row.id], ...next },
                  }))
                }
                onSave={saveCurated}
              />
            ),
          )}

        {filter !== 'published' &&
          visible.map((c) => (
            <CandidateCard
              key={c.id}
              c={c}
              draft={drafts[c.id] || {}}
              saving={savingId === c.id}
              onDraft={(next) =>
                setDrafts((d) => ({ ...d, [c.id]: { ...d[c.id], ...next } }))
              }
              onPatch={patch}
            />
          ))}
      </div>

      <p className="mt-12 text-center text-sm text-muted-foreground">
        <Link href="/trasparenza" className="inline-flex items-center gap-1 hover:text-foreground">
          {t.redazione.backTimeline}
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </p>
    </div>
  );
}

function CandidateCard({
  c,
  draft,
  saving,
  onDraft,
  onPatch,
}: {
  c: SentimentCandidate;
  draft: Partial<SentimentCandidate>;
  saving: boolean;
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
    <article className="border border-border/60 bg-card/40 p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            {c.date} · {c.personId || '—'} · {t.redazione.pipeline} · {c.status}
            {c.sourceTier ? ` · ${c.sourceTier}` : ''}
            {c.xQuoted ? ' · X' : ''}
          </p>
          <h2 className="mt-1 text-lg font-semibold tracking-tight">{title}</h2>
        </div>
        <a
          href={c.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs text-mark hover:underline"
        >
          {t.redazione.openSource}
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {c.rawSnippet || c.summary.en}
      </p>

      <div className="mt-4 space-y-2">
        <Label htmlFor={`title-${c.id}`}>{t.redazione.titleField}</Label>
        <Input
          id={`title-${c.id}`}
          value={title}
          onChange={(e) =>
            onDraft({ title: { it: e.target.value, en: e.target.value } })
          }
        />
      </div>

      <div className="mt-4 space-y-2">
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

      <div className="mt-4 space-y-2">
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

      <div className="mt-4 grid gap-4 sm:grid-cols-3">
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

      <div className="mt-5 flex flex-wrap gap-2">
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
    </article>
  );
}

function CuratedCard({
  pin,
  draft,
  locale,
  saving,
  onDraft,
  onSave,
}: {
  pin: CuratedPin;
  draft: CuratedDraft;
  locale: 'it' | 'en';
  saving: boolean;
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
        'border bg-card/40 p-5 sm:p-6',
        pin.hidden ? 'border-dashed border-border/50 opacity-70' : 'border-border/60',
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            {event.date} · {event.personId || '—'} · {t.redazione.curated} · {pin.themeName[locale]}
            {pin.edited ? ` · ${t.redazione.edited}` : ''}
            {pin.hidden ? ` · ${t.redazione.hidden}` : ''}
          </p>
          <h2 className="mt-1 text-lg font-semibold tracking-tight">{title[locale]}</h2>
        </div>
        <a
          href={event.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs text-mark hover:underline"
        >
          {t.redazione.openSource}
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
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

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
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

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
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

      <div className="mt-4 grid gap-4 sm:grid-cols-3">
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

      <div className="mt-5 flex flex-wrap gap-2">
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
    </article>
  );
}
