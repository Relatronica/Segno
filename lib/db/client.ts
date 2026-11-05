import { createClient, type SupabaseClient } from '@supabase/supabase-js';

/**
 * Unico punto di accesso a Postgres. Il contenuto non è mai letto dal browser:
 * tutte le tabelle hanno RLS attiva senza policy, quindi solo la chiave
 * `service_role` — usata qui e solo nelle route server — può leggerle.
 */
let cached: SupabaseClient | null = null;

export function db(): SupabaseClient {
  // La chiave di servizio non è mai esposta al client: se questo modulo finisse
  // in un bundle del browser, meglio un errore esplicito che un client muto.
  if (typeof window !== 'undefined') {
    throw new Error('lib/db is server-only: it must not be imported by a client component');
  }
  if (cached) return cached;

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error('Missing SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY in the environment');
  }

  cached = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}
