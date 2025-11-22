import { NextResponse } from 'next/server';
import Parser from 'rss-parser';

type NewsItem = {
  id: string;
  title: string;
  description?: string;
  url: string;
  source: string;
  publishedAt: string;
  category: 'ai-ethics' | 'regulation' | 'ai-news' | 'privacy';
  image?: string;
};

// Funzione per categorizzare automaticamente le news
function categorizeNews(title: string, description: string): NewsItem['category'] {
  const text = `${title} ${description || ''}`.toLowerCase();
  
  // Keywords per Privacy
  if (text.match(/\b(gdpr|privacy|data protection|protezione dati|dati personali|consent|consenso)\b/i)) {
    return 'privacy';
  }
  
  // Keywords per Regulation
  if (text.match(/\b(ai act|regulation|normativa|compliance|conformità|legislazione|direttiva|regolamento|sanction|sanzione)\b/i)) {
    return 'regulation';
  }
  
  // Keywords per AI Ethics
  if (text.match(/\b(ethics|etica|bias|fairness|equità|discrimination|discriminazione|transparency|trasparenza|accountability|responsabilità)\b/i)) {
    return 'ai-ethics';
  }
  
  // Keywords per AI News (nuovi modelli, sviluppi tecnologici)
  // Questi match sono già coperti dal default, ma li esplicitiamo per chiarezza
  if (text.match(/\b(gpt|claude|gemini|llm|large language model|modello linguistico|nuovo modello|ai model|deep learning|neural network|machine learning|sviluppo tecnologico|innovazione ai|breakthrough|scoperta)\b/i)) {
    return 'ai-news';
  }
  
  // Default: AI News
  return 'ai-news';
}

// Fonti RSS - Tutte in inglese
const RSS_FEEDS = [
  {
    url: 'https://news.google.com/rss/search?q=AI+ethics+GDPR+AI+Act+artificial+intelligence+regulation&hl=en&gl=US&ceid=US:en&when=24h',
    source: 'Google News',
    category: 'ai-news' as const,
  },
  {
    url: 'https://news.google.com/rss/search?q=GDPR+privacy+data+protection+EU&hl=en&gl=US&ceid=US:en&when=24h',
    source: 'Google News Privacy',
    category: 'privacy' as const,
  },
  {
    url: 'https://news.google.com/rss/search?q=EU+AI+Act+regulation+artificial+intelligence+law&hl=en&gl=US&ceid=US:en&when=24h',
    source: 'Google News Regulation',
    category: 'regulation' as const,
  },
  {
    url: 'https://news.google.com/rss/search?q=GPT+Claude+Gemini+LLM+large+language+model&hl=en&gl=US&ceid=US:en&when=24h',
    source: 'Google News LLM',
    category: 'ai-news' as const,
  },
  {
    url: 'https://news.google.com/rss/search?q=new+AI+model+release+artificial+intelligence&hl=en&gl=US&ceid=US:en&when=24h',
    source: 'Google News AI Releases',
    category: 'ai-news' as const,
  },
  {
    url: 'https://news.google.com/rss/search?q=OpenAI+Anthropic+Google+AI+announcement&hl=en&gl=US&ceid=US:en&when=24h',
    source: 'Google News AI Companies',
    category: 'ai-news' as const,
  },
  {
    url: 'https://news.google.com/rss/search?q=machine+learning+deep+learning+neural+networks+AI+research&hl=en&gl=US&ceid=US:en&when=24h',
    source: 'Google News AI Research',
    category: 'ai-news' as const,
  },
];


export async function GET() {
  const parser = new Parser({
    timeout: 10000, // 10 secondi timeout
    customFields: {
      item: [
        ['content:encoded', 'content'],
        ['media:content', 'media'],
        ['media:thumbnail', 'thumbnail'],
        ['enclosure', 'enclosure'],
      ],
    },
  });

  const allNews: NewsItem[] = [];
  const errors: string[] = [];

  // Fetch da tutte le fonti RSS
  for (const feed of RSS_FEEDS) {
    try {
      const parsed = await parser.parseURL(feed.url);
      
      if (parsed.items && parsed.items.length > 0) {
        const items = parsed.items
          .filter(item => {
            // Filtra items validi con titolo e link
            if (!item.title || !item.link) return false;
            
            // Filtra anche per data: solo notizie degli ultimi 14 giorni (più permissivo per catturare più notizie)
            if (item.pubDate) {
              const itemDate = new Date(item.pubDate).getTime();
              const fourteenDaysAgo = Date.now() - (14 * 24 * 60 * 60 * 1000);
              // Se la data è valida ma troppo vecchia, escludi
              if (!isNaN(itemDate) && itemDate < fourteenDaysAgo) return false;
              // Se la data non è valida, includi comunque (potrebbe essere una notizia recente senza data precisa)
            }
            
            return true;
          })
          .slice(0, 15) // Max 15 items per feed (aumentato per avere più opzioni dopo il filtro)
          .map((item): NewsItem => {
            const title = item.title || 'Senza titolo';
            const description = item.contentSnippet || item.content || '';
            
            // Estrai immagine da varie fonti possibili
            let imageUrl: string | undefined;
            
            // 1. Da media:content o media:thumbnail (Media RSS)
            const itemAny = item as any;
            if (itemAny.media) {
              const media = itemAny.media;
              if (typeof media === 'string') {
                imageUrl = media;
              } else if (media.url) {
                imageUrl = media.url;
              } else if (media.$ && media.$.url) {
                imageUrl = media.$.url;
              }
            }
            
            if (!imageUrl && itemAny.thumbnail) {
              const thumbnail = itemAny.thumbnail;
              if (typeof thumbnail === 'string') {
                imageUrl = thumbnail;
              } else if (thumbnail.url) {
                imageUrl = thumbnail.url;
              } else if (thumbnail.$ && thumbnail.$.url) {
                imageUrl = thumbnail.$.url;
              }
            }
            
            // 2. Da enclosure (se è un'immagine)
            if (!imageUrl && item.enclosure) {
              const enclosure = Array.isArray(item.enclosure) ? item.enclosure[0] : item.enclosure;
              if (enclosure && enclosure.type && enclosure.type.startsWith('image/')) {
                imageUrl = enclosure.url;
              }
            }
            
            // 3. Da content:encoded o content (estrai primo tag img)
            const contentToSearch = item.content || item.contentSnippet || itemAny['content:encoded'] || '';
            if (!imageUrl && contentToSearch) {
              // Cerca tag img con src
              const imgMatch = contentToSearch.match(/<img[^>]+src=["']([^"']+)["']/i);
              if (imgMatch && imgMatch[1]) {
                imageUrl = imgMatch[1];
              }
              // Cerca anche data-src (lazy loading)
              if (!imageUrl) {
                const dataSrcMatch = contentToSearch.match(/<img[^>]+data-src=["']([^"']+)["']/i);
                if (dataSrcMatch && dataSrcMatch[1]) {
                  imageUrl = dataSrcMatch[1];
                }
              }
              // Cerca og:image nei meta tag
              if (!imageUrl) {
                const ogImageMatch = contentToSearch.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i);
                if (ogImageMatch && ogImageMatch[1]) {
                  imageUrl = ogImageMatch[1];
                }
              }
            }
            
            // 4. Da itunes:image (per alcuni feed)
            if (!imageUrl && itemAny['itunes:image']) {
              const itunesImage = itemAny['itunes:image'];
              imageUrl = typeof itunesImage === 'string' ? itunesImage : (itunesImage.href || (itunesImage.$ && itunesImage.$.href));
            }
            
            // Pulisci l'URL dell'immagine
            if (imageUrl) {
              // Rimuovi parametri comuni di resize e pulizia
              imageUrl = imageUrl.split('?')[0].split('&')[0];
              // Verifica che sia un URL valido
              if (!imageUrl.startsWith('http://') && !imageUrl.startsWith('https://')) {
                // Se è un URL relativo, prova a costruirlo dal link dell'articolo
                if (item.link) {
                  try {
                    const baseUrl = new URL(item.link).origin;
                    imageUrl = new URL(imageUrl, baseUrl).href;
                  } catch {
                    imageUrl = undefined;
                  }
                } else {
                  imageUrl = undefined;
                }
              }
            }
            
            return {
              id: item.guid || item.link || `${feed.source}-${Date.now()}-${Math.random()}`,
              title: title.substring(0, 200), // Limita lunghezza titolo
              description: description.substring(0, 300), // Limita descrizione
              url: item.link || '#',
              source: parsed.title || feed.source,
              publishedAt: item.pubDate ? new Date(item.pubDate).toISOString() : new Date().toISOString(),
              category: categorizeNews(title, description),
              image: imageUrl,
            };
          });
        
        allNews.push(...items);
      }
    } catch (error) {
      console.error(`Error fetching RSS feed ${feed.url}:`, error);
      errors.push(feed.source);
    }
  }

  // Se non abbiamo ottenuto news da RSS, ritorna array vuoto
  if (allNews.length === 0) {
    console.warn('No news from RSS feeds');
    return NextResponse.json([], {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600', // 5 min cache se vuoto
      },
    });
  }

  // Rimuovi duplicati (basato su URL)
  const uniqueNews = Array.from(
    new Map(allNews.map(item => [item.url, item])).values()
  );

  // Filtra solo notizie degli ultimi 14 giorni (più permissivo)
  const now = Date.now();
  const fourteenDaysAgo = now - (14 * 24 * 60 * 60 * 1000);
  const recentNews = uniqueNews.filter(item => {
    const itemDate = new Date(item.publishedAt).getTime();
    // Se la data non è valida, includi comunque (potrebbe essere recente)
    if (isNaN(itemDate)) return true;
    return itemDate >= fourteenDaysAgo;
  });

  // Ordina per data (più recenti prima)
  recentNews.sort((a, b) => {
    const dateA = new Date(a.publishedAt).getTime();
    const dateB = new Date(b.publishedAt).getTime();
    return dateB - dateA;
  });

  // Limita a 20 news più recenti
  const topNews = recentNews.slice(0, 20);

  // Cache più breve per avere notizie più fresche: 10 minuti se successo, 2 minuti se errori
  const cacheControl = errors.length > 0
    ? 'public, s-maxage=120, stale-while-revalidate=300' // 2 min se errori
    : 'public, s-maxage=600, stale-while-revalidate=1200'; // 10 min se tutto ok

  return NextResponse.json(topNews, {
    headers: {
      'Cache-Control': cacheControl,
      'X-News-Count': topNews.length.toString(),
      'X-Errors': errors.length > 0 ? errors.join(',') : '',
    },
  });
}
