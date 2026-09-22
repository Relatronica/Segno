'use client';

import {
  Handshake,
  Banknote,
  Scale,
  Landmark,
  Megaphone,
  Gavel,
  type LucideIcon,
} from 'lucide-react';
import type { EventType, SentimentTag } from '@/lib/data/trasparenza';
import { toMs as toMsDate } from '@/lib/dates';

export const ALL_EVENT_TYPES: EventType[] = [
  'legislative',
  'meeting',
  'spending',
  'milestone',
  'statement',
  'sanction',
];

export const EVENT_META: Record<
  EventType,
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

export const SENTIMENT_META: Record<
  SentimentTag,
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
 * Editorial fear↔enthusiasm axis for the ambient mood curve.
 * Chart Y: enthusiasm up, fear down — so +1 alarm maps below the rail,
 * −1 optimism above it (`y = mid + score * amp`).
 */
export const SENTIMENT_FEAR_SCORE: Record<SentimentTag, number> = {
  alarm: 1,
  caution: 0.55,
  deregulation: 0.1,
  open_source: -0.45,
  optimism: -1,
};

export function toMs(date: string): number {
  return toMsDate(date);
}
