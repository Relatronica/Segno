import Parser from 'rss-parser';
import { SENTIMENT_FEEDS } from '@/lib/pipeline/feeds';
import { hintSentiment, matchPerson } from '@/lib/pipeline/match';
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
  const en = raw.length > 120 ? `${raw.slice(0, 117)}…` : raw;
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

export async function discoverSentimentCandidates(): Promise<{
  candidates: SentimentCandidate[];
  scannedFeeds: number;
  matchedItems: number;
}> {
  const parser = new Parser({ timeout: 12000 });
  const found: SentimentCandidate[] = [];
  const seen = new Set<string>();
  let matchedItems = 0;

  for (const feed of SENTIMENT_FEEDS) {
    try {
      const parsed = await parser.parseURL(feed.url);
      for (const item of parsed.items ?? []) {
        const url = (item.link || item.guid || '').trim();
        if (!url || seen.has(url)) continue;
        seen.add(url);

        const title = stripHtml(item.title || '');
        const snippet = stripHtml(item.contentSnippet || item.content || item.summary || '');
        const blob = `${title} ${snippet}`;
        const match = matchPerson(blob);
        if (!match) continue;

        matchedItems += 1;
        const personLabel = match.personId;
        const sentiment = hintSentiment(blob);
        const quoteSeed = snippet.length > 40 ? snippet.slice(0, 280) : undefined;

        found.push({
          id: candidateIdFromUrl(url),
          discoveredAt: new Date().toISOString(),
          status: 'pending',
          date: toDate(item.isoDate || item.pubDate),
          sourceUrl: url,
          sourceLabel: {
            it: feed.label,
            en: feed.label,
          },
          title: buildTitle(title || 'Untitled candidate'),
          summary: buildSummary(snippet, personLabel),
          quote: quoteSeed
            ? { it: quoteSeed, en: quoteSeed }
            : undefined,
          personId: match.personId,
          actorId: match.actorId,
          suggestedSentiment: sentiment,
          rawTitle: title,
          rawSnippet: snippet || undefined,
          feedSource: feed.id,
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
  };
}
