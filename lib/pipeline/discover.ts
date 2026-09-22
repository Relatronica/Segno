import Parser from 'rss-parser';
import { lobbyPeople } from '@/lib/data/trasparenza';
import { SENTIMENT_FEEDS } from '@/lib/pipeline/feeds';
import { hintSentiment, matchPerson } from '@/lib/pipeline/match';
import { classifySource, OFFICIAL_X_HANDLES } from '@/lib/pipeline/sources';
import { candidateIdFromUrl } from '@/lib/pipeline/store';
import type { SentimentCandidate } from '@/lib/pipeline/types';
import { clampIsoToToday, localIsoDate } from '@/lib/dates';

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

export async function discoverSentimentCandidates(): Promise<{
  candidates: SentimentCandidate[];
  scannedFeeds: number;
  matchedItems: number;
  rejectedBySource: number;
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
  const seen = new Set<string>();
  let matchedItems = 0;
  let rejectedBySource = 0;

  for (const feed of SENTIMENT_FEEDS) {
    try {
      const parsed = await parser.parseURL(feed.url);
      for (const item of parsed.items ?? []) {
        const url = (item.link || item.guid || '').trim();
        if (!url || seen.has(url)) continue;
        seen.add(url);

        const title = stripHtml(item.title || '');
        const html = `${item.content || ''} ${item.summary || ''} ${(item as { description?: string }).description || ''}`;
        const snippet = stripHtml(
          item.contentSnippet || item.content || item.summary || '',
        );
        const imageUrl = extractImage(item, html);
        const blob = `${title} ${snippet}`;
        const match = matchPerson(blob);
        if (!match) continue;

        matchedItems += 1;

        const classification = classifySource({ url, title, snippet });
        if (!classification.accepted) {
          rejectedBySource += 1;
          continue;
        }

        let personId = match.personId;
        let actorId = match.actorId;
        if (classification.xHandle) {
          const mapped = OFFICIAL_X_HANDLES[classification.xHandle];
          if (mapped) {
            personId = mapped;
            actorId = lobbyPeople.find((p) => p.id === mapped)?.orgId ?? actorId;
          }
        }

        const sentiment = hintSentiment(blob);
        const quoteSeed = snippet.length > 40 ? snippet.slice(0, 280) : undefined;
        const canonicalUrl = classification.xStatusUrl || url;

        found.push({
          id: candidateIdFromUrl(canonicalUrl),
          discoveredAt: new Date().toISOString(),
          status: 'pending',
          date: toDate(item.isoDate || item.pubDate),
          sourceUrl: canonicalUrl,
          sourceLabel: sourceLabelFor(
            feed.label,
            classification.host,
            classification.publisher,
            classification.xQuoted,
          ),
          title: buildTitle(title || 'Untitled candidate'),
          summary: buildSummary(snippet, personId),
          quote: quoteSeed ? { it: quoteSeed, en: quoteSeed } : undefined,
          personId,
          actorId,
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
      }
    } catch (err) {
      console.error('[pipeline] feed failed', feed.id, err);
    }
  }

  return {
    candidates: found,
    scannedFeeds: SENTIMENT_FEEDS.length,
    matchedItems,
    rejectedBySource,
  };
}
