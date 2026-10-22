/**
 * Free-text matching for the transparency timeline.
 * Diacritic-insensitive, AND over whitespace-separated terms.
 */

export function fold(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

/** Query → searchable terms. Empty query means "no constraint". */
export function queryTerms(query: string): string[] {
  return fold(query.trim())
    .split(/\s+/)
    .filter(Boolean);
}

/** Flattens the searchable fields of an event or signal into one haystack. */
export function haystack(parts: Array<string | undefined | null>): string {
  return fold(parts.filter((p): p is string => Boolean(p)).join(' '));
}

export function matchesTerms(hay: string, terms: string[]): boolean {
  if (terms.length === 0) return true;
  return terms.every((term) => hay.includes(term));
}
