/**
 * URL della documentazione normativa ufficiale
 * Fornisce link diretti agli articoli GDPR, AI Act, etc.
 */

export const REGULATION_URLS: Record<string, Record<string, string>> = {
  GDPR: {
    // Articoli specifici con URL esatti - GDPR-Info.eu
    'Art. 5(1)(e)': 'https://gdpr-info.eu/art-5-gdpr/',
    'Art. 5': 'https://gdpr-info.eu/art-5-gdpr/',
    'Art. 9': 'https://gdpr-info.eu/art-9-gdpr/',
    'Art. 13': 'https://gdpr-info.eu/art-13-gdpr/',
    'Art. 14': 'https://gdpr-info.eu/art-14-gdpr/',
    'Art. 13-14': 'https://gdpr-info.eu/art-13-gdpr/',
    'Art. 22': 'https://gdpr-info.eu/art-22-gdpr/',
    'Art. 25': 'https://gdpr-info.eu/art-25-gdpr/',
    'Art. 30': 'https://gdpr-info.eu/art-30-gdpr/',
    'Art. 32': 'https://gdpr-info.eu/art-32-gdpr/',
    'Art. 35': 'https://gdpr-info.eu/art-35-gdpr/',
    'Art. 44': 'https://gdpr-info.eu/art-44-gdpr/',
    'Art. 49': 'https://gdpr-info.eu/art-49-gdpr/',
    'Art. 44-49': 'https://gdpr-info.eu/art-44-gdpr/',
    'Art. 44-49 (Schrems II)': 'https://gdpr-info.eu/art-44-gdpr/',
    'Schrems II': 'https://gdpr-info.eu/art-44-gdpr/',
    // Fallback per articoli non specificati
    'default': 'https://gdpr-info.eu/'
  },
  AI_ACT: {
    // Articoli specifici - EUR-Lex (AI Act Regulation)
    'Art. 5': 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32021R2066#d1e2177-67-1',
    'Art. 5(1)': 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32021R2066#d1e2177-67-1',
    'Art. 6': 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32021R2066#d1e2320-58-1',
    'Art. 6 & Annex III': 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32021R2066#d1e2320-58-1',
    'Annex III': 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32021R2066#d1e2320-58-1',
    'Art. 8': 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32021R2066#d1e2697-48-1',
    'Art. 9': 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32021R2066#d1e2762-30-1',
    'Art. 10': 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32021R2066#d1e2826-31-1',
    'Art. 13': 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32021R2066#d1e3006-31-1',
    'Art. 14': 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32021R2066#d1e3073-31-1',
    'Art. 50': 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32021R2066#d1e4692-34-1',
    'Art. 50(1)': 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32021R2066#d1e4692-34-1',
    // URL alternativo più leggibile
    'ai-act-info': 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32021R2066',
    // Fallback
    'default': 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32021R2066'
  },
  COPYRIGHT: {
    'default': 'https://eur-lex.europa.eu/legal-content/IT/TXT/?uri=CELEX:32019L0790'
  }
};

/**
 * Normalizza il testo dell'articolo per matching
 * Rimuove parentesi, spazi extra, e caratteri speciali per matching flessibile
 */
function normalizeArticle(article: string): string {
  if (!article) return '';
  return article
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ')  // Normalizza spazi multipli
    .replace(/[()]/g, '')   // Rimuove parentesi
    .replace(/&/g, 'and')   // Sostituisce & con and
    .replace(/-/g, ' ')     // Sostituisce - con spazio
    .replace(/\s+/g, '')    // Rimuove tutti gli spazi
    .replace(/annex/gi, 'annex'); // Mantieni "annex" per matching
}

/**
 * Estrae il numero dell'articolo (es. "Art. 5(1)" -> "5", "Art. 44-49" -> "44")
 */
function extractArticleNumber(article: string): string | null {
  // Match "Art. 5" o "Art. 5(1)" o "Art. 44-49"
  const match = article.match(/art\.?\s*(\d+)/i);
  return match ? match[1] : null;
}

/**
 * Estrae tutti i numeri di articolo (per range come "44-49")
 */
function extractArticleNumbers(article: string): string[] {
  const matches = article.matchAll(/art\.?\s*(\d+)/gi);
  return Array.from(matches, m => m[1]);
}

/**
 * Ottiene l'URL della documentazione normativa per una regola specifica
 * Supporta matching flessibile degli articoli
 */
/**
 * Ottiene l'URL della documentazione normativa per una regola specifica
 * Supporta matching flessibile degli articoli e restituisce sempre un URL valido per regolamenti conosciuti
 */
export function getRegulationUrl(regulation: string, article: string): string | null {
  // Validazione input
  if (!regulation || !article) {
    return null;
  }
  
  // Ottieni il mapping URL per questo regolamento
  const urls = REGULATION_URLS[regulation];
  if (!urls) {
    // Fallback generico per regolamenti conosciuti senza mapping
    if (regulation === 'GDPR') return 'https://gdpr-info.eu/';
    if (regulation === 'AI_ACT') return 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32021R2066';
    if (regulation === 'COPYRIGHT') return 'https://eur-lex.europa.eu/legal-content/IT/TXT/?uri=CELEX:32019L0790';
    return null;
  }
  
  // 1. Match esatto (caso sensibile)
  if (urls[article]) {
    return urls[article];
  }
  
  // 2. Match case-insensitive esatto
  const caseInsensitiveMatch = Object.keys(urls).find(key => 
    key.toLowerCase() === article.toLowerCase()
  );
  if (caseInsensitiveMatch) {
    return urls[caseInsensitiveMatch];
  }
  
  // 3. Match per numero articolo (più affidabile per varianti)
  const articleNums = extractArticleNumbers(article);
  if (articleNums.length > 0) {
    const firstNum = articleNums[0];
    const numMatch = Object.keys(urls).find(key => {
      const keyNums = extractArticleNumbers(key);
      return keyNums.length > 0 && keyNums.includes(firstNum);
    });
    if (numMatch) {
      return urls[numMatch];
    }
  }
  
  // 4. Match normalizzato (per varianti con parentesi, spazi, ecc.)
  const normalizedArticle = normalizeArticle(article);
  if (normalizedArticle) {
    const normalizedMatch = Object.keys(urls).find(key => {
      const normalizedKey = normalizeArticle(key);
      return normalizedKey && normalizedKey === normalizedArticle;
    });
    if (normalizedMatch) {
      return urls[normalizedMatch];
    }
  }
  
  // 5. Match parziale (per casi come "Art. 6 & Annex III")
  const partialMatch = Object.keys(urls).find(key => {
    if (key.length < 5 || article.length < 5) return false;
    
    const normalizedKey = normalizeArticle(key);
    const normalizedArticleKey = normalizeArticle(article);
    
    if (!normalizedKey || !normalizedArticleKey) return false;
    
    // Match se contiene o è contenuto
    return normalizedArticleKey.includes(normalizedKey) || 
           normalizedKey.includes(normalizedArticleKey);
  });
  
  if (partialMatch) {
    return urls[partialMatch];
  }
  
  // 6. Fallback a default URL per il regolamento
  if (urls.default) {
    return urls.default;
  }
  
  // 7. Ultimo fallback generico per regolamento
  if (regulation === 'GDPR') return 'https://gdpr-info.eu/';
  if (regulation === 'AI_ACT') return 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32021R2066';
  if (regulation === 'COPYRIGHT') return 'https://eur-lex.europa.eu/legal-content/IT/TXT/?uri=CELEX:32019L0790';
  
  return null;
}

