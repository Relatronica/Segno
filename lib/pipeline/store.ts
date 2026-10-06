import { createHash } from 'crypto';
import { promises as fs } from 'fs';
import path from 'path';
import type {
  AutoSignal,
  PipelineStore,
  SentimentCandidate,
  TimelineEventEdit,
} from '@/lib/pipeline/types';

/** Keep editorial corrections even when the daily cap drops older headlines. */
const SIGNAL_CAP = 1500;

const STORE_KEY = 'store.json';
const LOCAL_PATH = path.join(process.cwd(), '.data', 'pipeline-store.json');

const emptyStore = (): PipelineStore => ({
  updatedAt: new Date().toISOString(),
  candidates: [],
  signals: [],
  edits: {},
  hiddenIds: [],
});

function normalizeStore(store: PipelineStore): PipelineStore {
  return {
    ...store,
    signals: store.signals ?? [],
    edits: store.edits ?? {},
    hiddenIds: store.hiddenIds ?? [],
  };
}

async function readLocal(): Promise<PipelineStore> {
  try {
    const raw = await fs.readFile(LOCAL_PATH, 'utf8');
    return JSON.parse(raw) as PipelineStore;
  } catch {
    return emptyStore();
  }
}

async function writeLocal(store: PipelineStore): Promise<void> {
  await fs.mkdir(path.dirname(LOCAL_PATH), { recursive: true });
  await fs.writeFile(LOCAL_PATH, JSON.stringify(store, null, 2), 'utf8');
}

async function readBlobs(): Promise<PipelineStore | null> {
  try {
    const { getStore } = await import('@netlify/blobs');
    const store = getStore({ name: 'segno-pipeline', consistency: 'strong' });
    const raw = await store.get(STORE_KEY, { type: 'text' });
    if (!raw) return emptyStore();
    return JSON.parse(raw) as PipelineStore;
  } catch {
    return null;
  }
}

async function writeBlobs(data: PipelineStore): Promise<boolean> {
  try {
    const { getStore } = await import('@netlify/blobs');
    const store = getStore({ name: 'segno-pipeline', consistency: 'strong' });
    await store.set(STORE_KEY, JSON.stringify(data));
    return true;
  } catch {
    return false;
  }
}

export async function loadPipelineStore(): Promise<PipelineStore> {
  const fromBlobs = await readBlobs();
  if (fromBlobs) return normalizeStore(fromBlobs);
  return normalizeStore(await readLocal());
}

export async function savePipelineStore(store: PipelineStore): Promise<void> {
  store.updatedAt = new Date().toISOString();
  const ok = await writeBlobs(store);
  if (!ok) await writeLocal(store);
}

export function candidateIdFromUrl(url: string): string {
  const hash = createHash('sha256').update(url).digest('hex').slice(0, 12);
  return `pipe-${hash}`;
}

export function signalIdFromUrl(url: string): string {
  const hash = createHash('sha256').update(url).digest('hex').slice(0, 12);
  return `sig-${hash}`;
}

function capSignals(signals: AutoSignal[]): AutoSignal[] {
  const pinned = signals.filter(
    (s) => s.hidden || s.sentimentOverride !== undefined,
  );
  const pinnedIds = new Set(pinned.map((s) => s.id));
  const rest = signals
    .filter((s) => !pinnedIds.has(s.id))
    .sort((a, b) => b.date.localeCompare(a.date) || b.discoveredAt.localeCompare(a.discoveredAt));
  return [...pinned, ...rest.slice(0, SIGNAL_CAP)];
}

export function upsertSignals(
  store: PipelineStore,
  incoming: AutoSignal[],
): { store: PipelineStore; added: number } {
  const byUrl = new Map((store.signals ?? []).map((s) => [s.sourceUrl, s]));
  let added = 0;

  for (const signal of incoming) {
    const prev = byUrl.get(signal.sourceUrl);
    if (prev) {
      byUrl.set(signal.sourceUrl, {
        ...signal,
        id: prev.id,
        discoveredAt: prev.discoveredAt,
        hidden: prev.hidden,
        sentimentOverride: prev.sentimentOverride,
      });
      continue;
    }
    byUrl.set(signal.sourceUrl, signal);
    added += 1;
  }

  return {
    store: {
      ...store,
      updatedAt: new Date().toISOString(),
      signals: capSignals([...byUrl.values()]),
    },
    added,
  };
}

export function patchSignal(
  store: PipelineStore,
  id: string,
  patch: { hidden?: boolean; sentimentOverride?: AutoSignal['sentimentOverride'] },
): PipelineStore | null {
  const signals = store.signals ?? [];
  if (!signals.some((s) => s.id === id)) return null;

  return {
    ...store,
    updatedAt: new Date().toISOString(),
    signals: signals.map((s) => {
      if (s.id !== id) return s;
      const next = { ...s };
      if (patch.hidden !== undefined) next.hidden = patch.hidden;
      if (patch.sentimentOverride !== undefined) next.sentimentOverride = patch.sentimentOverride;
      return next;
    }),
  };
}

/** Copy a signal into the editorial queue so a quote can be added. Does not remove the signal. */
export function promoteSignal(
  store: PipelineStore,
  id: string,
): { store: PipelineStore; created: boolean } | null {
  const signal = (store.signals ?? []).find((s) => s.id === id);
  if (!signal) return null;

  const existing = store.candidates.find((c) => c.sourceUrl === signal.sourceUrl);
  if (existing) return { store, created: false };

  const tag =
    signal.sentimentOverride === null
      ? undefined
      : (signal.sentimentOverride ?? signal.sentiment);

  const candidate: SentimentCandidate = {
    id: candidateIdFromUrl(signal.sourceUrl),
    discoveredAt: new Date().toISOString(),
    status: 'pending',
    date: signal.date,
    sourceUrl: signal.sourceUrl,
    sourceLabel: signal.sourceLabel,
    title: signal.title,
    summary: signal.summary,
    personId: signal.personId,
    actorId: signal.actorId,
    suggestedSentiment: tag,
    rawTitle: signal.rawTitle,
    rawSnippet: signal.rawSnippet,
    feedSource: signal.feedSource,
    sourceTier: signal.sourceTier,
    sourceHost: signal.sourceHost,
    ...(signal.imageUrl ? { imageUrl: signal.imageUrl } : {}),
  };

  return {
    created: true,
    store: {
      ...store,
      updatedAt: new Date().toISOString(),
      candidates: [candidate, ...store.candidates],
    },
  };
}

export function upsertCandidates(
  store: PipelineStore,
  incoming: SentimentCandidate[],
): { store: PipelineStore; added: number } {
  const byUrl = new Map(store.candidates.map((c) => [c.sourceUrl, c]));
  let added = 0;

  for (const c of incoming) {
    const prev = byUrl.get(c.sourceUrl);
    if (prev) {
      if (!prev.imageUrl && c.imageUrl) {
        byUrl.set(c.sourceUrl, { ...prev, imageUrl: c.imageUrl });
      }
      continue;
    }
    byUrl.set(c.sourceUrl, c);
    added += 1;
  }

  return {
    store: {
      ...store,
      updatedAt: new Date().toISOString(),
      candidates: [...byUrl.values()].sort((a, b) =>
        b.discoveredAt.localeCompare(a.discoveredAt),
      ),
    },
    added,
  };
}

export function patchCuratedEvent(
  store: PipelineStore,
  id: string,
  patch: { hidden?: boolean; edit?: TimelineEventEdit },
): PipelineStore {
  const edits = { ...(store.edits ?? {}) };
  if (patch.edit) {
    edits[id] = { ...edits[id], ...patch.edit };
  }

  let hiddenIds = [...(store.hiddenIds ?? [])];
  if (patch.hidden === true && !hiddenIds.includes(id)) hiddenIds.push(id);
  if (patch.hidden === false) hiddenIds = hiddenIds.filter((item) => item !== id);

  return {
    ...store,
    updatedAt: new Date().toISOString(),
    edits,
    hiddenIds,
  };
}

export function deleteCandidates(store: PipelineStore, ids: string[]): PipelineStore {
  const remove = new Set(ids);
  return {
    ...store,
    updatedAt: new Date().toISOString(),
    candidates: store.candidates.filter((c) => !remove.has(c.id)),
  };
}

export function updateManyCandidateStatus(
  store: PipelineStore,
  ids: string[],
  status: SentimentCandidate['status'],
): PipelineStore {
  const target = new Set(ids);
  const reviewedAt = new Date().toISOString();
  return {
    ...store,
    updatedAt: reviewedAt,
    candidates: store.candidates.map((c) =>
      target.has(c.id) ? { ...c, status, reviewedAt } : c,
    ),
  };
}

export function updateCandidateStatus(
  store: PipelineStore,
  id: string,
  status: SentimentCandidate['status'],
  patch?: Partial<
    Pick<
      SentimentCandidate,
      | 'title'
      | 'summary'
      | 'quote'
      | 'suggestedSentiment'
      | 'personId'
      | 'actorId'
      | 'date'
      | 'reviewNote'
    >
  >,
): PipelineStore {
  const cleaned = Object.fromEntries(
    Object.entries(patch ?? {}).filter(([, value]) => value !== undefined),
  ) as typeof patch;

  return {
    ...store,
    updatedAt: new Date().toISOString(),
    candidates: store.candidates.map((c) =>
      c.id === id
        ? {
            ...c,
            ...cleaned,
            status,
            reviewedAt: new Date().toISOString(),
          }
        : c,
    ),
  };
}
