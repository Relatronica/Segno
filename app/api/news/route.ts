import { NextResponse } from 'next/server';
import Parser from 'rss-parser';

type NewsItem = {
  id: string;
  title: string;
  description?: string;
  url: string;
  source: string;
  publishedAt: string;
  category: 'privacy' | 'regulation' | 'ethics' | 'technology';
  image?: string;
};

function categorizeNews(title: string, description: string): NewsItem['category'] {
  const text = `${title} ${description || ''}`.toLowerCase();

  if (text.match(/\b(gdpr|privacy|data protection|protezione dati|dati personali|surveillance|sorveglianza|tracking)\b/i)) {
    return 'privacy';
  }
  if (text.match(/\b(ai act|regulation|normativa|compliance|legislation|direttiva|regolamento|digital services act|dsa|dma)\b/i)) {
    return 'regulation';
  }
  if (text.match(/\b(ethics|etica|bias|fairness|discrimination|transparency|accountability|digital rights|diritti digitali)\b/i)) {
    return 'ethics';
  }
  return 'technology';
}

const RSS_FEEDS = [
  {
    url: 'https://news.google.com/rss/search?q=digital+rights+privacy+GDPR+data+protection&hl=en&gl=US&ceid=US:en&when=7d',
    source: 'Google News',
  },
  {
    url: 'https://news.google.com/rss/search?q=digital+sovereignty+AI+Act+EU+regulation&hl=en&gl=US&ceid=US:en&when=7d',
    source: 'Google News',
  },
  {
    url: 'https://news.google.com/rss/search?q=surveillance+capitalism+big+tech+antitrust&hl=en&gl=US&ceid=US:en&when=7d',
    source: 'Google News',
  },
  {
    url: 'https://news.google.com/rss/search?q=AI+ethics+algorithmic+bias+transparency&hl=en&gl=US&ceid=US:en&when=7d',
    source: 'Google News',
  },
];

export async function GET() {
  const parser = new Parser({
    timeout: 10000,
    customFields: {
      item: [
        ['media:content', 'media'],
        ['media:thumbnail', 'thumbnail'],
      ],
    },
  });

  const allNews: NewsItem[] = [];

  for (const feed of RSS_FEEDS) {
    try {
      const parsed = await parser.parseURL(feed.url);

      if (parsed.items?.length) {
        const items = parsed.items
          .filter((item) => item.title && item.link)
          .slice(0, 10)
          .map((item): NewsItem => {
            const title = item.title || '';
            const description = item.contentSnippet || '';

            return {
              id: item.guid || item.link || `${Date.now()}-${Math.random()}`,
              title: title.substring(0, 200),
              description: description.substring(0, 300),
              url: item.link || '#',
              source: parsed.title || feed.source,
              publishedAt: item.pubDate
                ? new Date(item.pubDate).toISOString()
                : new Date().toISOString(),
              category: categorizeNews(title, description),
            };
          });

        allNews.push(...items);
      }
    } catch (error) {
      console.error(`Error fetching RSS feed ${feed.url}:`, error);
    }
  }

  if (allNews.length === 0) {
    return NextResponse.json([], {
      headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600' },
    });
  }

  const uniqueNews = Array.from(
    new Map(allNews.map((item) => [item.url, item])).values()
  );

  uniqueNews.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return NextResponse.json(uniqueNews.slice(0, 24), {
    headers: { 'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=1200' },
  });
}
