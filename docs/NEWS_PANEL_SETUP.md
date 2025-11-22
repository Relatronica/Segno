# Setup Pannello News - Guida Completa

## 📰 Panoramica

Il pannello news mostra aggiornamenti su:
- **Etica IA**: Best practices, framework, studi accademici
- **Normativa**: GDPR, AI Act, nuove leggi e direttive UE
- **Privacy**: Privacy by Design, data protection, compliance
- **Notizie IA**: Sviluppi tecnologici e impatti sociali

## 🔧 Opzioni per Dati Aggiornati

### 1. RSS Feeds (⭐ Consigliato - Gratuito)

**Vantaggi**: Gratuito, affidabile, molte fonti disponibili

**Implementazione**:
```bash
npm install rss-parser
# oppure
npm install fast-xml-parser
```

**Fonti RSS consigliate**:
- **EU AI Act**: `https://digital-strategy.ec.europa.eu/en/rss`
- **EDPB (European Data Protection Board)**: `https://edpb.europa.eu/rss`
- **GDPR.eu**: `https://gdpr.eu/feed/`
- **MIT Technology Review AI**: `https://www.technologyreview.com/topic/artificial-intelligence/feed/`
- **Google News RSS** (personalizzato):
  ```
  https://news.google.com/rss/search?q=AI+ethics+GDPR+AI+Act&hl=it&gl=IT&ceid=IT:it
  ```

**Esempio implementazione** (`app/api/news/route.ts`):
```typescript
import RSSParser from 'rss-parser';

const parser = new RSSParser();

export async function GET() {
  const feeds = [
    'https://digital-strategy.ec.europa.eu/en/rss',
    'https://edpb.europa.eu/rss',
    // ... altre fonti
  ];

  const allNews = [];
  
  for (const feedUrl of feeds) {
    try {
      const feed = await parser.parseURL(feedUrl);
      const items = feed.items.map(item => ({
        id: item.guid || item.link,
        title: item.title,
        description: item.contentSnippet,
        url: item.link,
        source: feed.title,
        publishedAt: item.pubDate ? new Date(item.pubDate) : new Date(),
        category: categorizeNews(item.title, item.contentSnippet),
      }));
      allNews.push(...items);
    } catch (error) {
      console.error(`Error parsing ${feedUrl}:`, error);
    }
  }

  // Ordina per data, più recenti prima
  allNews.sort((a, b) => b.publishedAt - a.publishedAt);

  return NextResponse.json(allNews.slice(0, 20)); // Top 20
}
```

---

### 2. News API (Gratuito con limiti)

**Vantaggi**: API strutturata, filtri avanzati, multi-lingua

**Servizi disponibili**:
- **NewsAPI.org**: 100 richieste/giorno gratuite
- **Mediastack**: 100 richieste/mese gratuite
- **NewsData.io**: 200 richieste/giorno gratuite

**Setup NewsAPI.org**:
1. Registrati su https://newsapi.org/
2. Ottieni API key gratuita
3. Aggiungi a `.env.local`:
   ```
   NEWS_API_KEY=your_api_key_here
   ```

**Implementazione**:
```typescript
export async function GET() {
  const apiKey = process.env.NEWS_API_KEY;
  
  const queries = [
    'AI ethics',
    'GDPR compliance',
    'EU AI Act',
    'artificial intelligence regulation',
    'privacy by design',
  ];

  const allNews = [];
  
  for (const query of queries) {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=it&sortBy=publishedAt&pageSize=5&apiKey=${apiKey}`
    );
    const data = await response.json();
    allNews.push(...data.articles.map(article => ({
      id: article.url,
      title: article.title,
      description: article.description,
      url: article.url,
      source: article.source.name,
      publishedAt: new Date(article.publishedAt),
      category: categorizeNews(article.title, article.description),
    })));
  }

  // Rimuovi duplicati e ordina
  const uniqueNews = Array.from(
    new Map(allNews.map(item => [item.id, item])).values()
  );
  uniqueNews.sort((a, b) => b.publishedAt - a.publishedAt);

  return NextResponse.json(uniqueNews.slice(0, 20));
}
```

---

### 3. Google News RSS (Gratuito)

**Vantaggi**: Nessuna API key, risultati già filtrati

**URL Template**:
```
https://news.google.com/rss/search?q={QUERY}&hl=it&gl=IT&ceid=IT:it
```

**Query consigliate**:
- `AI+ethics+GDPR`
- `EU+AI+Act+regulation`
- `privacy+by+design+AI`
- `artificial+intelligence+compliance`

**Implementazione**: Usa `rss-parser` come nell'esempio RSS sopra.

---

### 4. Backend Proprio (Più controllo)

**Vantaggi**: Controllo totale, filtri personalizzati, cache intelligente

**Architettura suggerita**:
1. **Cron Job** (Vercel Cron, GitHub Actions, o servizio dedicato)
   - Esegue ogni 2-4 ore
   - Fetch da multiple fonti
   - Filtra e categorizza
   - Salva in database (PostgreSQL, Supabase, MongoDB)

2. **Database Schema**:
   ```sql
   CREATE TABLE news_items (
     id UUID PRIMARY KEY,
     title TEXT NOT NULL,
     description TEXT,
     url TEXT UNIQUE NOT NULL,
     source TEXT NOT NULL,
     published_at TIMESTAMP NOT NULL,
     category TEXT NOT NULL,
     relevance_score INTEGER DEFAULT 0,
     created_at TIMESTAMP DEFAULT NOW()
   );
   ```

3. **API Route**:
   ```typescript
   export async function GET() {
     const news = await db
       .select()
       .from(newsItems)
       .where(gt(newsItems.publishedAt, subDays(new Date(), 30)))
       .orderBy(desc(newsItems.publishedAt))
       .limit(20);
     
     return NextResponse.json(news);
   }
   ```

---

### 5. Webhooks / Notifiche (Avanzato)

**Setup**:
- Iscrizione a newsletter istituzionali (EU, EDPB)
- Monitoraggio siti governativi con scraping (rispettando ToS)
- Integrazione con servizi come Zapier/Make per automazione

---

## 🎯 Funzione di Categorizzazione

Crea una funzione per categorizzare automaticamente le news:

```typescript
function categorizeNews(title: string, description: string): NewsItem['category'] {
  const text = `${title} ${description}`.toLowerCase();
  
  if (text.match(/\b(gdpr|privacy|data protection|protezione dati)\b/i)) {
    return 'privacy';
  }
  if (text.match(/\b(ai act|regulation|normativa|compliance|conformità)\b/i)) {
    return 'regulation';
  }
  if (text.match(/\b(ethics|etica|bias|fairness|equità)\b/i)) {
    return 'ai-ethics';
  }
  return 'ai-news';
}
```

---

## 🚀 Quick Start (RSS Feeds)

1. **Installa dipendenza**:
   ```bash
   npm install rss-parser
   ```

2. **Aggiorna `app/api/news/route.ts`** con l'implementazione RSS sopra

3. **Testa l'endpoint**:
   ```bash
   curl http://localhost:3000/api/news
   ```

4. **Il pannello si aggiornerà automaticamente** ogni 30 minuti quando aperto

---

## 📝 Note Importanti

- **Rate Limiting**: Rispetta i limiti delle API (NewsAPI ha 100 req/day gratuite)
- **Caching**: Usa cache headers per ridurre chiamate (già implementato: 30 min cache)
- **Error Handling**: Gestisci fallimenti gracefully (mostra messaggio all'utente)
- **Privacy**: Non tracciare click o dati personali senza consenso
- **ToS**: Leggi sempre i Terms of Service delle fonti che usi

---

## 🔗 Risorse Utili

- **RSS Parser**: https://www.npmjs.com/package/rss-parser
- **NewsAPI**: https://newsapi.org/docs
- **Vercel Cron**: https://vercel.com/docs/cron-jobs
- **Supabase**: https://supabase.com/docs (per database backend)

