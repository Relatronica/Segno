import { createHash } from 'crypto';

/**
 * Gli id della pipeline derivano dalla fonte: un url produce sempre la stessa
 * riga. Stanno fuori dallo store perché li usano anche discovery e database,
 * che non devono conoscere dove il contenuto viene conservato.
 */

/** Prefisso dei pin scritti a mano: la redazione li distingue con questo. */
export const MANUAL_ID_PREFIX = 'man-';

function urlHash(url: string): string {
  return createHash('sha256').update(url).digest('hex').slice(0, 12);
}

export function candidateIdFromUrl(url: string): string {
  return `pipe-${urlHash(url)}`;
}

export function signalIdFromUrl(url: string): string {
  return `sig-${urlHash(url)}`;
}

/** Hand-written pins are keyed on their source, so a url can only ever make one. */
export function createdEventIdFromUrl(url: string): string {
  return `${MANUAL_ID_PREFIX}${urlHash(url.trim())}`;
}
