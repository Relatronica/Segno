import { timelineThemes, type TimelineEvent } from '@/lib/data/trasparenza';
import type { CuratedPin, PipelineStore, TimelineEventEdit } from '@/lib/pipeline/types';

export function applyEventOverlay(
  event: TimelineEvent,
  edit?: TimelineEventEdit,
): TimelineEvent {
  if (!edit) return event;

  const next: TimelineEvent = { ...event };

  if (edit.date !== undefined) next.date = edit.date;

  if (edit.actorId !== undefined) {
    if (edit.actorId) next.actorId = edit.actorId;
    else delete next.actorId;
  }

  if (edit.personId !== undefined) {
    if (edit.personId) next.personId = edit.personId;
    else delete next.personId;
  }

  if (edit.title !== undefined) next.title = edit.title;
  if (edit.summary !== undefined) next.summary = edit.summary;
  if (edit.detail !== undefined) next.detail = edit.detail;

  if (edit.quote !== undefined) {
    if (edit.quote && (edit.quote.en.trim() || edit.quote.it.trim())) {
      next.quote = edit.quote;
    } else {
      delete next.quote;
    }
  }

  if (edit.sentiment !== undefined) {
    if (edit.sentiment) next.sentiment = edit.sentiment;
    else delete next.sentiment;
  }

  if (edit.sourceLabel !== undefined) next.sourceLabel = edit.sourceLabel;
  if (edit.sourceUrl !== undefined) next.sourceUrl = edit.sourceUrl;

  return next;
}

export function applyStoreOverlays(
  events: TimelineEvent[],
  edits: Record<string, TimelineEventEdit> | undefined,
  hiddenIds: string[] | undefined,
): TimelineEvent[] {
  const hidden = new Set(hiddenIds ?? []);
  const map = edits ?? {};
  return events
    .filter((event) => !hidden.has(event.id))
    .map((event) => applyEventOverlay(event, map[event.id]));
}

export function listCuratedPins(store: PipelineStore): CuratedPin[] {
  const hidden = new Set(store.hiddenIds ?? []);
  const edits = store.edits ?? {};

  return timelineThemes
    .flatMap((theme) =>
      theme.events.map((event) => ({
        themeId: theme.id,
        themeName: theme.name,
        hidden: hidden.has(event.id),
        edited: Boolean(edits[event.id]),
        event: applyEventOverlay(event, edits[event.id]),
      })),
    )
    .sort((a, b) => b.event.date.localeCompare(a.event.date));
}

export function findCuratedEvent(id: string): TimelineEvent | undefined {
  for (const theme of timelineThemes) {
    const event = theme.events.find((item) => item.id === id);
    if (event) return event;
  }
  return undefined;
}
