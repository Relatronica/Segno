'use client';

import {
  Handshake,
  Banknote,
  Scale,
  Landmark,
  Megaphone,
  Gavel,
  Type,
  Image as ImageIcon,
  Video,
  AudioLines,
  Code,
  type LucideIcon,
} from 'lucide-react';
import { toMs as toMsDate } from '@/lib/dates';

/**
 * Colour and glyph per ontology key. Keyed by `string`, not by the domain's
 * union: the engine draws whatever key a spec declares, so it must not depend
 * on the AI ontology's enumerations.
 */
export const EVENT_META: Record<
  string,
  { icon: LucideIcon; color: string; bg: string; ring: string; dot: string; lane: 'up' | 'down' }
> = {
  meeting: {
    icon: Handshake,
    color: 'text-slate-700 dark:text-slate-300',
    bg: 'bg-slate-500/15',
    ring: 'ring-slate-500/40',
    dot: '#334155',
    lane: 'up',
  },
  spending: {
    icon: Banknote,
    color: 'text-amber-700 dark:text-amber-300',
    bg: 'bg-amber-500/15',
    ring: 'ring-amber-500/40',
    dot: '#b45309',
    lane: 'down',
  },
  legislative: {
    icon: Scale,
    color: 'text-rose-700 dark:text-rose-300',
    bg: 'bg-rose-500/15',
    ring: 'ring-rose-500/40',
    dot: '#be123c',
    lane: 'up',
  },
  milestone: {
    icon: Landmark,
    color: 'text-sky-700 dark:text-sky-300',
    bg: 'bg-sky-500/15',
    ring: 'ring-sky-500/40',
    dot: '#0369a1',
    lane: 'down',
  },
  statement: {
    icon: Megaphone,
    color: 'text-violet-700 dark:text-violet-300',
    bg: 'bg-violet-500/15',
    ring: 'ring-violet-500/40',
    dot: '#6d28d9',
    lane: 'up',
  },
  sanction: {
    icon: Gavel,
    color: 'text-red-800 dark:text-red-300',
    bg: 'bg-red-500/15',
    ring: 'ring-red-500/40',
    dot: '#991b1b',
    lane: 'down',
  },
};

/** Modality glyphs. Labels stay in the data layer; only the icon lives here. */
export const MODALITY_ICON: Record<string, LucideIcon> = {
  text: Type,
  image: ImageIcon,
  video: Video,
  audio: AudioLines,
  code: Code,
};

export const SENTIMENT_META: Record<
  string,
  { color: string; bg: string; dot: string }
> = {
  alarm: {
    color: 'text-red-800 dark:text-red-300',
    bg: 'bg-red-500/15',
    dot: '#991b1b',
  },
  caution: {
    color: 'text-amber-800 dark:text-amber-300',
    bg: 'bg-amber-500/15',
    dot: '#b45309',
  },
  optimism: {
    color: 'text-emerald-800 dark:text-emerald-300',
    bg: 'bg-emerald-500/15',
    dot: '#047857',
  },
  deregulation: {
    color: 'text-orange-800 dark:text-orange-300',
    bg: 'bg-orange-500/15',
    dot: '#c2410c',
  },
  open_source: {
    color: 'text-sky-800 dark:text-sky-300',
    bg: 'bg-sky-500/15',
    dot: '#0369a1',
  },
};

/**
 * Colour of a reading on a thesis. Fixed order: support / oppose /
 * conditional / ambiguous / undetermined, so a shift in position reads as a
 * change of colour rather than a change of mood.
 */
export const STANCE_META: Record<
  string,
  { color: string; bg: string; dot: string }
> = {
  support: {
    color: 'text-emerald-800 dark:text-emerald-300',
    bg: 'bg-emerald-500/15',
    dot: '#047857',
  },
  oppose: {
    color: 'text-rose-800 dark:text-rose-300',
    bg: 'bg-rose-500/15',
    dot: '#be123c',
  },
  conditional: {
    color: 'text-amber-800 dark:text-amber-300',
    bg: 'bg-amber-500/15',
    dot: '#b45309',
  },
  ambiguous: {
    color: 'text-slate-700 dark:text-slate-300',
    bg: 'bg-slate-500/15',
    dot: '#475569',
  },
  undetermined: {
    color: 'text-zinc-600 dark:text-zinc-400',
    bg: 'bg-zinc-500/15',
    dot: '#a1a1aa',
  },
};

export function toMs(date: string): number {
  return toMsDate(date);
}
