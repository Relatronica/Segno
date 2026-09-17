import Parser from 'rss-parser';
import { lobbyPeople } from '@/lib/data/trasparenza';
import { SENTIMENT_FEEDS } from '@/lib/pipeline/feeds';
import { hintSentiment, matchPerson } from '@/lib/pipeline/match';
import { classifySource, OFFICIAL_X_HANDLES } from '@/lib/pipeline/sources';
import { candidateIdFromUrl } from '@/lib/pipeline/store';
import type { SentimentCandidate } from '@/lib/pipeline/types';

function toDate(value?: string): string {
  if (!value) return new Date().toISOString().slice(0, 10);
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return new Date().toISOString().slice(0, 10);
  return d.toISOString().slice(0, 10);
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

export async function discoverSentimentCandidates(): Promise<{
  candidates: SentimentCandidate[];
  scannedFeeds: number;
  matchedItems: number;
  rejectedBySource: number;
}> {
  const parser = new Parser({ timeout: 12000 });
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
        const snippet = stripHtml(
          item.contentSnippet || item.content || item.summary || '',
        );
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
