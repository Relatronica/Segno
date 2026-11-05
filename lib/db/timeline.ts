import { db } from './client';

/**
 * Fase B serve una sola timeline: quella dell'IA, che porta ancora id e slug
 * `sentiment` perché i permalink pubblicati e le tesi la referenziano così.
 * La Fase C sostituirà questa costante con una risoluzione per slug.
 */
export const TIMELINE_SLUG = 'sentiment';
export const TEMPLATE_SLUG = 'sei-lenti';
export const WORKSPACE_NAME = 'Segno';

let cachedId: string | null = null;

/** Id della timeline servita da questo build. */
export async function timelineId(): Promise<string> {
  if (cachedId) return cachedId;

  const { data, error } = await db()
    .from('timelines')
    .select('id')
    .eq('slug', TIMELINE_SLUG)
    .limit(1)
    .maybeSingle();

  if (error) throw error;
  if (!data) {
    throw new Error(`timeline "${TIMELINE_SLUG}" not found — run the seed migration first`);
  }

  cachedId = data.id as string;
  return cachedId;
}

/**
 * Crea workspace, archetipo e timeline se mancano. Idempotente: è il primo
 * passo della migrazione, non un'operazione di runtime.
 */
export async function ensureTenant(): Promise<string> {
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
        slug: TIMELINE_SLUG,
        name: { it: "Evoluzione dell'IA", en: 'AI evolution' },
        visibility: 'public',
        template_id: template.id,
      },
      { onConflict: 'workspace_id,slug' },
    )
    .select('id')
    .single();
  if (timelineError) throw timelineError;

  cachedId = timeline.id as string;
  return cachedId;
}
