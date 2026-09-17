import { NextResponse } from 'next/server';
import { loadPipelineStore } from '@/lib/pipeline/store';
import { candidateToTimelineEvent } from '@/lib/pipeline/types';

export const runtime = 'nodejs';

/** Public: published (and approved) sentiment pins for the live timeline. */
export async function GET() {
  const store = await loadPipelineStore();
  const events = store.candidates
    .filter((c) => c.status === 'published')
    .map(candidateToTimelineEvent)
    .filter((e): e is NonNullable<typeof e> => e !== null)
    .sort((a, b) => a.date.localeCompare(b.date));

  return NextResponse.json(
    {
      events,
      edits: store.edits ?? {},
      hiddenIds: store.hiddenIds ?? [],
      updatedAt: store.updatedAt,
    },
    {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    },
  );
}
