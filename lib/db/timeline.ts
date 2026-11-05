import type { LocalizedText } from '@/lib/trasparenza/spec';
import { db } from './client';

/**
 * Il registro delle timeline. Fino alla Fase B ne esisteva una sola e il suo id
 * era una costante; ora l'id si risolve per slug e viene messo in cache.
 *
 * La pipeline (ingestion, redazione) resta single-tenant: parla ancora della
 * sola timeline dell'IA, perché le sue regole sono configurazione del
 * maintainer, non input dell'utente (ARCHITETTURA-MULTI-TIMELINE, P6).
 */
export const TIMELINE_SLUG = 'sentiment';
export const CYBERSECURITY_SLUG = 'cybersecurity';
export const TEMPLATE_SLUG = 'sei-lenti';
export const WORKSPACE_NAME = 'Segno';

/** Nome della timeline servita di default; usato dal seed e dall'indice. */
export const FLAGSHIP_NAME: LocalizedText = {
  it: 'Evoluzione dell’IA',
  en: 'AI evolution',
};

const cache = new Map<string, string>();

/** Id della timeline con questo slug. `null` se non esiste. */
export async function findTimelineId(slug: string): Promise<string | null> {
  const hit = cache.get(slug);
  if (hit) return hit;

  const { data, error } = await db()
    .from('timelines')
    .select('id')
    .eq('slug', slug)
    .limit(1)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  cache.set(slug, data.id as string);
  return data.id as string;
}

/** Id di una timeline esistente; se manca, è un errore di configurazione. */
export async function resolveTimelineId(slug: string): Promise<string> {
  const id = await findTimelineId(slug);
  if (!id) {
    throw new Error(`timeline "${slug}" not found — run the seed migration first`);
  }
  return id;
}

/** La timeline servita di default: quella dell'IA, la sola della pipeline. */
export function timelineId(): Promise<string> {
  return resolveTimelineId(TIMELINE_SLUG);
}

/**
 * Crea workspace, archetipo e timeline se mancano. Idempotente: è il primo
 * passo della migrazione, non un'operazione di runtime.
 */
export async function ensureTimeline(slug: string, name: LocalizedText): Promise<string> {
  const client = db();

  const { data: existingWorkspace, error: workspaceError } = await client
    .from('workspaces')
    .select('id')
    .eq('name', WORKSPACE_NAME)
    .limit(1)
    .maybeSingle();
  if (workspaceError) throw workspaceError;

  let workspaceId = existingWorkspace?.id as string | undefined;
  if (!workspaceId) {
    const { data, error } = await client
      .from('workspaces')
      .insert({ name: WORKSPACE_NAME, plan: 'author' })
      .select('id')
      .single();
    if (error) throw error;
    workspaceId = data.id as string;
  }

  const { data: template, error: templateError } = await client
    .from('timeline_templates')
    .upsert(
      {
        slug: TEMPLATE_SLUG,
        name: { it: 'Sei lenti', en: 'Six lenses' },
        definition: {},
      },
      { onConflict: 'slug' },
    )
    .select('id')
    .single();
  if (templateError) throw templateError;

  const { data: timeline, error: timelineError } = await client
    .from('timelines')
    .upsert(
      {
        workspace_id: workspaceId,
        slug,
        name,
        visibility: 'public',
        template_id: template.id,
      },
      { onConflict: 'workspace_id,slug' },
    )
    .select('id')
    .single();
  if (timelineError) throw timelineError;

  cache.set(slug, timeline.id as string);
  return timeline.id as string;
}

/** La timeline dell'IA: primo tenant, creato dalla migrazione di Fase B. */
export function ensureTenant(): Promise<string> {
  return ensureTimeline(TIMELINE_SLUG, FLAGSHIP_NAME);
}
