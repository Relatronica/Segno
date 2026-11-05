'use client';

import { createContext, useContext, type ReactNode } from 'react';
import type { TimelineSpec } from '@/lib/trasparenza/spec';

const TimelineSpecContext = createContext<TimelineSpec | null>(null);

/**
 * Hands the timeline's spec to the engine. Mounted once per timeline route, so
 * every component below reads the ontology from here instead of importing it.
 */
export function TimelineSpecProvider({
  spec,
  children,
}: {
  spec: TimelineSpec;
  children: ReactNode;
}) {
  return <TimelineSpecContext.Provider value={spec}>{children}</TimelineSpecContext.Provider>;
}

/** The spec of the timeline being rendered. Throws outside a provider. */
export function useTimelineSpec(): TimelineSpec {
  const spec = useContext(TimelineSpecContext);
  if (!spec) throw new Error('useTimelineSpec must be used inside a TimelineSpecProvider');
  return spec;
}
