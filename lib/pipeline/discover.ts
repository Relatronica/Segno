import Parser from 'rss-parser';
import { lobbyPeople, type Lens } from '@/lib/data/trasparenza';
import { SENTIMENT_FEEDS } from '@/lib/pipeline/feeds';
import { classifyLane } from '@/lib/pipeline/lanes';
import { hintSentiment, matchPerson, matchPersonStrict } from '@/lib/pipeline/match';
import { classifySource, OFFICIAL_X_HANDLES } from '@/lib/pipeline/sources';
import { candidateIdFromUrl, signalIdFromUrl } from '@/lib/pipeline/store';
import type { AutoSignal, SentimentCandidate } from '@/lib/pipeline/types';
import { clampIsoToToday, localIsoDate } from '@/lib/dates';

/** Automatic diary rows are capped per lane, per run. Editorial ones are not. */
const LANE_SIGNALS_PER_RUN = 8;

function toDate(value?: string): string {
  if (!value) return localIsoDate();
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return localIsoDate();
  return clampIsoToToday(localIsoDate(d));
}

function stripHtml(input: string): string {
  return input.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function buildTitle(raw: string): { it: string; en: string } {
  const cleaned = raw.replace(/\s[-–—]\s[^-–—]+$/, '').trim() || raw;
  const en = cleaned.length > 120 ? `${cleaned.slice(0, 117)}…` : cleaned;
  return { it: en, en };
}

function signalSummary(snippet: string): { it: string; en: string } {
  const base = snippet.length > 280 ? `${snippet.slice(0, 277)}…` : snippet;
  if (!base) {
    return {
      it: 'Segnale automatico dal titolo. Nessuna citazione verificata.',
      en: 'Automatic signal from the headline. No verified quote.',
    };
  }
  return { it: base, en: base };
}

function buildSummary(snippet: string, personName?: string): { it: string; en: string } {
  const base =
    snippet.length > 280
      ? `${snippet.slice(0, 277)}…`
      : snippet ||
        (personName
          ? `Candidate public statement linked to ${personName}. Review quote and source before publishing.`
          : 'Candidate item for editorial review. Verify quote and source before publishing.');
  return {
    en: base,
    it: base,
  };
}

function sourceLabelFor(
  feedLabel: string,
  host?: string,
  publisher?: string,
  xQuoted?: boolean,
): { it: string; en: string } {
  const base = publisher || host || feedLabel;
  const en = xQuoted ? `${base} (quotes X)` : base;
  const it = xQuoted ? `${base} (cita X)` : base;
  return { it, en };
}

function isHttpUrl(value: string): boolean {
  return /^https?:\/\//i.test(value);
}

function isAudioVideo(url: string): boolean {
  return /\.(mp3|mp4|m4a|mov|wav|webm)(\?|$)/i.test(url);
}

function attrUrl(value: unknown): string | undefined {
  if (!value) return undefined;
  if (typeof value === 'string') return isHttpUrl(value) ? value : undefined;
  if (typeof value !== 'object') return undefined;
  const record = value as Record<string, unknown>;
  if (typeof record.url === 'string' && isHttpUrl(record.url)) return record.url;
  const attrs = record.$;
  if (attrs && typeof attrs === 'object') {
    const url = (attrs as Record<string, unknown>).url;
    if (typeof url === 'string' && isHttpUrl(url)) return url;
  }
  return undefined;
}

function extractImage(
  item: Parser.Item & {
    enclosure?: { url?: string; type?: string };
    mediaContent?: unknown;
    mediaThumbnail?: unknown;
  },
  html: string,
): string | undefined {
  const enclosure = item.enclosure;
  if (
    enclosure?.url &&
    isHttpUrl(enclosure.url) &&
    !isAudioVideo(enclosure.url) &&
    (!enclosure.type || enclosure.type.startsWith('image/'))
  ) {
    return enclosure.url;
  }

  const media = item.mediaContent;
  if (Array.isArray(media)) {
    for (const entry of media) {
      const url = attrUrl(entry);
      if (url && !isAudioVideo(url)) return url;
    }
  } else {
    const url = attrUrl(media);
    if (url && !isAudioVideo(url)) return url;
  }

  const thumb = attrUrl(item.mediaThumbnail);
  if (thumb && !isAudioVideo(thumb)) return thumb;

  const decoded = html.replace(/&amp;/g, '&');
  const img = decoded.match(/<img[^>]+src=["']([^"']+)["']/i);
  if (img?.[1] && isHttpUrl(img[1]) && !isAudioVideo(img[1])) return img[1];

  return undefined;
}

/** Keep only the newest N diary rows for a lane, so one busy day cannot flood it. */
function capLaneSignals(signals: AutoSignal[]): AutoSignal[] {
  const byLane = new Map<string, AutoSignal[]>();
  for (const signal of signals) {
    const key = signal.lens ?? 'culture';
    const bucket = byLane.get(key) ?? [];
    bucket.push(signal);
    byLane.set(key, bucket);
  }

  const out: AutoSignal[] = [];
  for (const bucket of byLane.values()) {
    out.push(
      ...bucket
        .sort((a, b) => b.date.localeCompare(a.date))
        .slice(0, LANE_SIGNALS_PER_RUN),
    );
  }
  return out;
}

export async function discoverSentimentCandidates(): Promise<{
  candidates: SentimentCandidate[];
  signals: AutoSignal[];
  scannedFeeds: number;
  matchedItems: number;
  rejectedBySource: number;
  laneCounts: Partial<Record<Lens, number>>;
}> {
  const parser = new Parser({
    timeout: 12000,
    customFields: {
      item: [
        ['media:content', 'mediaContent', { keepArray: true }],
        ['media:thumbnail', 'mediaThumbnail'],
      ],
    },
  });
  const found: SentimentCandidate[] = [];
  const cultureSignals: AutoSignal[] = [];
  const laneSignals: AutoSignal[] = [];
  const seen = new Set<string>();
  const laneCounts: Partial<Record<Lens, number>> = {};
  let matchedItems = 0;
  let rejectedBySource = 0;

  // Feeds are independent: one slow or broken sweep must not delay the rest.
  const batches = await Promise.all(
    SENTIMENT_FEEDS.map(async (feed) => {
      try {
        return { feed, parsed: await parser.parseURL(feed.url) };
      } catch (err) {
        console.error('[pipeline] feed failed', feed.id, err);
        return { feed, parsed: null };
      }
    }),
  );

  for (const { feed, parsed } of batches) {
    for (const item of parsed?.items ?? []) {
      const url = (item.link || item.guid || '').trim();
      if (!url || seen.has(url)) continue;
      seen.add(url);

      const title = stripHtml(item.title || '');
      const html = `${item.content || ''} ${item.summary || ''} ${(item as { description?: string }).description || ''}`;
      const snippet = stripHtml(item.contentSnippet || item.content || item.summary || '');
      const imageUrl = extractImage(item, html);
      const blob = `${title} ${snippet}`;

      // Person feeds only speak about tracked people; lane feeds speak about events.
      const match = feed.requiresPerson ? matchPerson(blob) : null;
      if (feed.requiresPerson && !match) continue;

      matchedItems += 1;

      const classification = classifySource({ url, title, snippet });
      if (!classification.accepted) {
        rejectedBySource += 1;
        continue;
      }

      let personId = match?.personId;
      let actorId = match?.actorId;
      if (feed.requiresPerson && classification.xHandle) {
        const mapped = OFFICIAL_X_HANDLES[classification.xHandle];
        if (mapped) {
          personId = mapped;
          actorId = lobbyPeople.find((p) => p.id === mapped)?.orgId ?? actorId;
        }
      }

      // Lane feeds are classified from the headline; person feeds stay statements.
      const lane = feed.requiresPerson
        ? { lens: feed.lens, type: feed.type, confident: true }
        : classifyLane({ lens: feed.lens, type: feed.type, title, snippet });

      const sentiment = feed.requiresPerson ? hintSentiment(blob) : undefined;
      const quoteSeed = feed.requiresPerson && snippet.length > 40 ? snippet.slice(0, 280) : undefined;
      const canonicalUrl = classification.xStatusUrl || url;
      const date = toDate(item.isoDate || item.pubDate);
      const sourceLabel = sourceLabelFor(
        feed.label,
        classification.host,
        classification.publisher,
        classification.xQuoted,
      );
      const builtTitle = buildTitle(title || 'Untitled candidate');

      found.push({
        id: candidateIdFromUrl(canonicalUrl),
        discoveredAt: new Date().toISOString(),
        status: 'pending',
        date,
        sourceUrl: canonicalUrl,
        sourceLabel,
        title: builtTitle,
        summary: buildSummary(snippet, personId),
        quote: quoteSeed ? { it: quoteSeed, en: quoteSeed } : undefined,
        personId,
        actorId,
        lens: lane.lens,
        type: lane.type,
        suggestedSentiment: sentiment,
        rawTitle: title,
        rawSnippet: snippet || undefined,
        feedSource: feed.id,
        sourceTier: classification.tier,
        sourceHost: classification.host,
        xQuoted: classification.xQuoted || undefined,
        xStatusUrl: classification.xStatusUrl,
        ...(imageUrl ? { imageUrl } : {}),
      });

      laneCounts[lane.lens] = (laneCounts[lane.lens] ?? 0) + 1;

      if (feed.requiresPerson) {
        // The diary row exists only for a strict name match: a headline is not
        // a stance until a quote proves it, and a loose match would fake one.
        const fromHandle = classification.xHandle
          ? OFFICIAL_X_HANDLES[classification.xHandle]
          : undefined;
        const strict = matchPersonStrict(blob);
        const signalPersonId = fromHandle ?? strict?.personId;
        if (!signalPersonId) continue;

        const signalActorId = fromHandle
          ? (lobbyPeople.find((p) => p.id === fromHandle)?.orgId ?? actorId)
          : (strict?.actorId ?? actorId);

        cultureSignals.push({
          id: signalIdFromUrl(canonicalUrl),
          discoveredAt: new Date().toISOString(),
          date,
          sourceUrl: canonicalUrl,
          sourceLabel,
          title: buildTitle(title || 'Untitled'),
          summary: signalSummary(snippet),
          personId: signalPersonId,
          actorId: signalActorId,
          lens: 'culture',
          type: 'statement',
          rawTitle: title,
          rawSnippet: snippet || undefined,
          feedSource: feed.id,
          sourceTier: classification.tier,
          sourceHost: classification.host,
          ...(imageUrl ? { imageUrl } : {}),
        });
        continue;
      }

      // Lane rows enter the diary only when the headline is recognisably about
      // that kind of event — no confident read, no automatic pin.
      if (!lane.confident) continue;

      laneSignals.push({
        id: signalIdFromUrl(canonicalUrl),
        discoveredAt: new Date().toISOString(),
        date,
        sourceUrl: canonicalUrl,
        sourceLabel,
        title: builtTitle,
        summary: signalSummary(snippet),
        lens: lane.lens,
        type: lane.type,
        rawTitle: title,
        rawSnippet: snippet || undefined,
        feedSource: feed.id,
        sourceTier: classification.tier,
        sourceHost: classification.host,
        ...(imageUrl ? { imageUrl } : {}),
      });
    }
  }

  return {
    candidates: found,
    signals: [...cultureSignals, ...capLaneSignals(laneSignals)],
    scannedFeeds: SENTIMENT_FEEDS.length,
    matchedItems,
    rejectedBySource,
    laneCounts,
  };
}
