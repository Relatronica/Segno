'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, PanelRight, Search, X } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { useT } from '@/lib/i18n/useT';
import type { TimelineEvent } from '@/lib/data/trasparenza';
import {
  unifiedTheme,
  timelineThemes,
  lobbyPeople,
  ALL_LENSES,
  ALL_SENTIMENT_TAGS,
  LENS_META,
  lensOf,
  readingsForThesis,
  thesesForTheme,
  type EventType,
  type Lens,
  type PositionStance,
  type SentimentTag,
} from '@/lib/data/trasparenza';
import { localIsoDate } from '@/lib/dates';
import { applyStoreOverlays } from '@/lib/pipeline/edits';
import { signalToTimelineEvent } from '@/lib/pipeline/signals';
import type { AutoSignal, TimelineEventEdit } from '@/lib/pipeline/types';
import { DEFAULT_COLLAPSED_LENSES, PRESENT_PIN_ID } from '@/lib/trasparenza/constants';
import { haystack, matchesTerms, queryTerms } from '@/lib/trasparenza/search';
import {
  buildTrasparenzaSearch,
  parseTrasparenzaSearch,
  type TrasparenzaUrlState,
} from '@/lib/trasparenza/url';
import { FilterSidebar } from '@/components/trasparenza/FilterSidebar';
import { LaneTimeline, subjectOf } from '@/components/trasparenza/LaneTimeline';
import {
  PositionMatrix,
  type ThesisRow,
  type ThesisSubject,
} from '@/components/trasparenza/PositionMatrix';
import { TimelineFeed } from '@/components/trasparenza/TimelineFeed';

/** Offset timeline chrome below the floating header */
const CHROME_TOP = 'calc(var(--nav-clearance) + 0.5rem)';

/** Order-free comparison, so the URL stays clean while a set is untouched. */
function sameLensSet(a: Lens[], b: Lens[]): boolean {
  if (a.length !== b.length) return false;
  const set = new Set(a);
  return b.every((lens) => set.has(lens));
}

type PersonMap = Record<string, { name: string; shortName: string; role: { it: string; en: string } }>;
type ActorMap = Record<string, { name: string; shortName: string }>;

/** Everything the free-text search looks at on a curated pin. */
function eventHaystack(
  event: TimelineEvent,
  people: PersonMap,
  actors: ActorMap,
): string {
  const person = event.personId ? people[event.personId] : undefined;
  const actor = event.actorId ? actors[event.actorId] : undefined;
  return haystack([
    event.date,
    event.title.it,
    event.title.en,
    event.summary.it,
    event.summary.en,
    event.detail?.it,
    event.detail?.en,
    event.quote?.it,
    event.quote?.en,
    event.sourceLabel.it,
    event.sourceLabel.en,
    event.sourceUrl,
    person?.name,
    person?.shortName,
    person?.role.it,
    person?.role.en,
    actor?.name,
    actor?.shortName,
  ]);
}

/** Same, for automatic headline signals (no quote). */
function signalHaystack(signal: AutoSignal, people: PersonMap, actors: ActorMap): string {
  const person = people[signal.personId];
  const actor = signal.actorId ? actors[signal.actorId] : undefined;
  return haystack([
    signal.date,
    signal.title.it,
    signal.title.en,
    signal.summary.it,
    signal.summary.en,
    signal.sourceLabel.it,
    signal.sourceLabel.en,
    signal.sourceUrl,
    person?.name,
    person?.shortName,
    actor?.name,
    actor?.shortName,
  ]);
}

export default function TrasparenzaContent() {
  const t = useT();
  const locale = useAppStore((s) => s.locale) as 'it' | 'en';

  const [themeId] = useState(unifiedTheme.id);
  const [pipelineEvents, setPipelineEvents] = useState<TimelineEvent[]>([]);
  const [autoSignals, setAutoSignals] = useState<AutoSignal[]>([]);
  const [edits, setEdits] = useState<Record<string, TimelineEventEdit>>({});
  const [hiddenIds, setHiddenIds] = useState<string[]>([]);
  const [presentFocusToken, setPresentFocusToken] = useState(0);
  const [focusEventToken, setFocusEventToken] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const loadPublished = () => {
      fetch('/api/pipeline/published', { cache: 'no-store' })
        .then((r) => (r.ok ? r.json() : null))
        .then(
          (
            data: {
              events?: TimelineEvent[];
              signals?: AutoSignal[];
              edits?: Record<string, TimelineEventEdit>;
              hiddenIds?: string[];
            } | null,
          ) => {
            if (cancelled || !data) return;
            setPipelineEvents(data.events ?? []);
            setAutoSignals(data.signals ?? []);
            setEdits(data.edits ?? {});
            setHiddenIds(data.hiddenIds ?? []);
          },
        )
        .catch(() => {
          /* pipeline optional offline */
        });
    };

    loadPublished();
    window.addEventListener('focus', loadPublished);
    return () => {
      cancelled = true;
      window.removeEventListener('focus', loadPublished);
    };
  }, []);

  const track = useMemo(() => {
    const today = localIsoDate();
    const hidden = new Set(hiddenIds);
    const base = timelineThemes.find((th) => th.id === themeId) ?? unifiedTheme;
    const withPresent = applyStoreOverlays(
      base.events.map((e) =>
        e.id === PRESENT_PIN_ID ? { ...e, date: today } : e,
      ),
      edits,
      hiddenIds,
    ).map((e) => (e.id === PRESENT_PIN_ID ? { ...e, date: today } : e));

    const byId = new Map(withPresent.map((e) => [e.id, e]));
    for (const e of pipelineEvents) {
      if (hidden.has(e.id)) continue;
      byId.set(e.id, { ...e, date: e.date > today ? today : e.date });
    }
    return { ...base, events: [...byId.values()] };
  }, [themeId, pipelineEvents, edits, hiddenIds]);

  const allYears = useMemo(() => {
    const years = [
      ...track.events.map((e) => e.date.slice(0, 4)),
      ...autoSignals.map((s) => s.date.slice(0, 4)),
    ];
    return [...new Set(years)].sort();
  }, [track.events, autoSignals]);

  const [selectedActor, setSelectedActor] = useState<string | 'all'>('all');
  const [selectedPerson, setSelectedPerson] = useState<string | 'all'>('all');
  const [selectedTypes, setSelectedTypes] = useState<EventType[]>([...track.filterTypes]);
  const [selectedYears, setSelectedYears] = useState<string[]>(allYears);
  const [selectedSentiments, setSelectedSentiments] = useState<SentimentTag[]>([
    ...ALL_SENTIMENT_TAGS,
  ]);
  /** Domain lenses kept on the axis. All of them by default. */
  const [selectedLenses, setSelectedLenses] = useState<Lens[]>([...ALL_LENSES]);
  /** Lenses drawn as a compact strip. View-only: the data stays on the axis. */
  const [collapsedLenses, setCollapsedLenses] = useState<Lens[]>([...DEFAULT_COLLAPSED_LENSES]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [scrubId, setScrubId] = useState<string | null>(null);
  /** One panel on the right: filters and chronology are its two sections. */
  const [panelOpen, setPanelOpen] = useState(false);
  const [panelTab, setPanelTab] = useState<'filters' | 'feed'>('feed');
  /** Active claim under test. Scopes statements to its recorded readings. */
  const [selectedThesis, setSelectedThesis] = useState<string | 'all'>('all');
  const [query, setQuery] = useState('');
  /** Set once the query string has been read, so filters are never reset by the first render. */
  const [urlApplied, setUrlApplied] = useState(false);
  const [pendingEvent, setPendingEvent] = useState<string | null>(null);
  /** A `?year=` in the URL wins over the "merge new years as data arrives" rule. */
  const explicitYears = useRef(false);

  /** Defaults used when the URL leaves a filter open. */
  const defaults = useRef({ types: [...track.filterTypes], years: allYears });

  useEffect(() => {
    defaults.current = { types: [...track.filterTypes], years: allYears };
  }, [track.filterTypes, allYears]);

  const applyUrlState = useCallback((parsed: TrasparenzaUrlState) => {
    setSelectedPerson(parsed.person ?? 'all');
    setSelectedActor(parsed.actor ?? 'all');
    setSelectedTypes(parsed.types ?? defaults.current.types);
    explicitYears.current = Boolean(parsed.years);
    setSelectedYears(parsed.years ?? defaults.current.years);
    setSelectedSentiments(parsed.sentiments ?? [...ALL_SENTIMENT_TAGS]);
    setSelectedLenses(parsed.lenses ?? [...ALL_LENSES]);
    setCollapsedLenses(parsed.collapsedLenses ?? [...DEFAULT_COLLAPSED_LENSES]);
    setQuery(parsed.q ?? '');
    setSelectedThesis(parsed.thesis ?? 'all');

    if (parsed.event) {
      setPendingEvent(parsed.event);
      setPanelTab('feed');
      setPanelOpen(true);
    } else {
      setPendingEvent(null);
      setActiveId(null);
    }
  }, []);

  useEffect(() => {
    applyUrlState(parseTrasparenzaSearch(window.location.search));
    setUrlApplied(true);
  }, [applyUrlState]);

  useEffect(() => {
    const onPop = () => applyUrlState(parseTrasparenzaSearch(window.location.search));
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, [applyUrlState]);

  /**
   * Desktop lands with the panel already open. Below `lg` the panel is a
   * full-screen overlay, so mobile keeps the timeline and opens it on demand.
   */
  useEffect(() => {
    if (window.matchMedia('(min-width: 1024px)').matches) setPanelOpen(true);
  }, []);

  useEffect(() => {
    if (!urlApplied) return;
    if (explicitYears.current) return;
    setSelectedYears((prev) => {
      const merged = [...new Set([...prev, ...allYears])].sort();
      if (merged.length === prev.length && merged.every((y, i) => y === prev[i])) return prev;
      return merged;
    });
  }, [allYears, urlApplied]);

  /** Mirror the current view into the query string so any state is shareable. */
  useEffect(() => {
    if (!urlApplied) return;
    const timer = window.setTimeout(() => {
      const search = buildTrasparenzaSearch({
        person: selectedPerson !== 'all' ? selectedPerson : undefined,
        actor: selectedActor !== 'all' ? selectedActor : undefined,
        types: selectedTypes.length < track.filterTypes.length ? selectedTypes : undefined,
        years: selectedYears.length < allYears.length ? selectedYears : undefined,
        sentiments:
          selectedSentiments.length < ALL_SENTIMENT_TAGS.length
            ? selectedSentiments
            : undefined,
        lenses: selectedLenses.length < ALL_LENSES.length ? selectedLenses : undefined,
        collapsedLenses: sameLensSet(collapsedLenses, DEFAULT_COLLAPSED_LENSES)
          ? undefined
          : collapsedLenses,
        q: query.trim() || undefined,
        event: activeId && !activeId.startsWith('auto-day-') ? activeId : undefined,
        thesis: selectedThesis !== 'all' ? selectedThesis : undefined,
      });
      const next = `${window.location.pathname}${search}`;
      if (next !== `${window.location.pathname}${window.location.search}`) {
        window.history.replaceState(null, '', next);
      }
    }, 250);
    return () => window.clearTimeout(timer);
  }, [
    urlApplied,
    selectedPerson,
    selectedActor,
    selectedTypes,
    selectedYears,
    selectedSentiments,
    selectedLenses,
    collapsedLenses,
    query,
    activeId,
    selectedThesis,
    track.filterTypes,
    allYears,
  ]);

  const switchTheme = (_id: string) => {
    /* single unified track — theme switch retained for FilterSidebar API */
  };

  const actorMap = useMemo(
    () => Object.fromEntries(track.actors.map((a) => [a.id, a])),
    [track.actors],
  );

  const personMap = useMemo(
    () => Object.fromEntries(lobbyPeople.map((p) => [p.id, p])),
    [],
  );

  const needles = useMemo(() => queryTerms(query), [query]);

  const theses = useMemo(() => thesesForTheme(track.id), [track.id]);
  const activeThesis = useMemo(
    () => theses.find((thesis) => thesis.slug === selectedThesis) ?? null,
    [theses, selectedThesis],
  );

  /**
   * Readings recorded on the active thesis, resolved against the published
   * events. A reading without its quote does not appear: the evidence is the
   * condition for being on the board.
   */
  const thesisReadings = useMemo(() => {
    if (!activeThesis) return null;
    const eventsById = new Map(track.events.map((e) => [e.id, e]));
    return readingsForThesis(activeThesis.id).flatMap((reading) => {
      const event = eventsById.get(reading.eventId);
      return event ? [{ event, stance: reading.stance, note: reading.note }] : [];
    });
  }, [activeThesis, track.events]);

  const thesisReadingsById = useMemo(
    () =>
      thesisReadings
        ? new Map(thesisReadings.map((reading) => [reading.event.id, reading]))
        : null,
    [thesisReadings],
  );

  /** Board for the matrix: one row per subject, silence listed separately. */
  const thesisBoard = useMemo(() => {
    if (!activeThesis || !thesisReadings) return null;
    const peopleById = new Map(track.people.map((person) => [person.id, person]));
    const actorsById = new Map(track.actors.map((actor) => [actor.id, actor]));

    const toSubject = (kind: 'person' | 'actor', id: string): ThesisSubject | null => {
      if (kind === 'person') {
        const person = peopleById.get(id);
        if (!person) return null;
        return {
          key: `person:${person.id}`,
          kind: 'person',
          id: person.id,
          name: person.name,
          shortName: person.shortName,
          avatar: person.avatar,
        };
      }
      const actor = actorsById.get(id);
      if (!actor) return null;
      return {
        key: `actor:${actor.id}`,
        kind: 'actor',
        id: actor.id,
        name: actor.name,
        shortName: actor.shortName,
        accent: actor.color,
      };
    };

    const byKey = new Map<string, ThesisRow>();
    for (const reading of thesisReadings) {
      const subject = subjectOf(reading.event);
      if (!subject) continue;
      const meta = toSubject(subject.kind, subject.id);
      if (!meta) continue;
      const row = byKey.get(meta.key);
      if (row) row.readings.push(reading);
      else byKey.set(meta.key, { subject: meta, readings: [reading] });
    }

    const rows = [...byKey.values()]
      .map((row) => ({
        ...row,
        readings: [...row.readings].sort((a, b) => a.event.date.localeCompare(b.event.date)),
      }))
      .sort(
        (a, b) =>
          b.readings.length - a.readings.length ||
          a.subject.shortName.localeCompare(b.subject.shortName),
      );

    const silent = [
      ...track.people.map((person) => toSubject('person', person.id)),
      ...track.actors.map((actor) => toSubject('actor', actor.id)),
    ].filter((subject): subject is ThesisSubject => subject !== null && !byKey.has(subject.key));

    return { rows, silent };
  }, [activeThesis, thesisReadings, track.people, track.actors]);

  const stanceByEventId = useMemo(() => {
    if (!thesisReadings) return undefined;
    return Object.fromEntries(
      thesisReadings.map((reading) => [reading.event.id, reading.stance]),
    ) as Record<string, PositionStance>;
  }, [thesisReadings]);

  const filtered = useMemo(() => {
    return [...track.events]
      .sort((a, b) => a.date.localeCompare(b.date))
      .filter((e) => matchesTerms(eventHaystack(e, personMap, actorMap), needles))
      .filter((e) => selectedTypes.includes(e.type))
      .filter((e) => selectedYears.includes(e.date.slice(0, 4)))
      .filter((e) => {
        if (selectedActor === 'all') return true;
        if (!e.actorId) return true;
        return e.actorId === selectedActor;
      })
      .filter((e) => {
        if (selectedPerson === 'all') return true;
        // Person filter scopes statements; context pins stay visible on the axis
        if (e.type !== 'statement') return true;
        return e.personId === selectedPerson;
      })
      .filter((e) => {
        if (!e.sentiment) return true;
        return selectedSentiments.includes(e.sentiment);
      })
      .filter((e) => selectedLenses.includes(lensOf(e)))
      .filter((e) => {
        // A thesis scopes statements to its recorded readings; context pins
        // stay on the axis, like the person filter above.
        if (!thesisReadingsById) return true;
        if (e.type !== 'statement') return true;
        return thesisReadingsById.has(e.id);
      });
  }, [
    track.events,
    selectedActor,
    selectedPerson,
    selectedTypes,
    selectedYears,
    selectedSentiments,
    selectedLenses,
    needles,
    personMap,
    actorMap,
    thesisReadingsById,
  ]);

  /**
   * Diary rows. No tone, so the sentiment filter (a filter on quoted
   * statements) does not apply: a headline cannot match a stance it lacks.
   */
  const filteredSignals = useMemo(() => {
    if (!selectedTypes.includes('statement')) return [];
    // Diary rows are readings of what people say, so they ride the culture
    // lens: hiding that lens hides them too.
    if (!selectedLenses.includes('culture')) return [];
    return autoSignals.filter((signal) => {
      if (!selectedYears.includes(signal.date.slice(0, 4))) return false;
      if (selectedActor !== 'all' && signal.actorId !== selectedActor) return false;
      if (selectedPerson !== 'all' && signal.personId !== selectedPerson) return false;
      if (!matchesTerms(signalHaystack(signal, personMap, actorMap), needles)) return false;
      return true;
    });
  }, [
    autoSignals,
    selectedActor,
    selectedPerson,
    selectedTypes,
    selectedYears,
    selectedLenses,
    needles,
    personMap,
    actorMap,
  ]);

  const autoFeed = useMemo(
    () => filteredSignals.map(signalToTimelineEvent),
    [filteredSignals],
  );

  const feedEvents = useMemo(
    () => [...filtered, ...autoFeed].sort((a, b) => b.date.localeCompare(a.date)),
    [filtered, autoFeed],
  );

  useEffect(() => {
    if (feedEvents.length === 0) {
      setActiveId(null);
      setScrubId(null);
      return;
    }
    if (activeId && !feedEvents.some((e) => e.id === activeId)) {
      setActiveId(null);
    }
  }, [feedEvents, activeId]);

  const activeIndex = feedEvents.findIndex((e) => e.id === activeId);

  const toggleType = (type: EventType) => {
    setSelectedTypes((prev) => {
      if (prev.includes(type)) {
        if (prev.length === 1) return prev;
        return prev.filter((x) => x !== type);
      }
      return [...prev, type];
    });
  };

  const toggleYear = (year: string) => {
    // Once the reader picks years by hand, new data must not silently re-add them.
    explicitYears.current = true;
    setSelectedYears((prev) => {
      if (prev.includes(year)) {
        if (prev.length === 1) return prev;
        return prev.filter((y) => y !== year);
      }
      return [...prev, year].sort();
    });
  };

  const toggleSentiment = (tag: SentimentTag) => {
    setSelectedSentiments((prev) => {
      if (prev.includes(tag)) {
        if (prev.length === 1) return prev;
        return prev.filter((x) => x !== tag);
      }
      return [...prev, tag];
    });
  };

  const toggleLens = (lens: Lens) => {
    setSelectedLenses((prev) => {
      if (prev.includes(lens)) {
        if (prev.length === 1) return prev;
        return prev.filter((x) => x !== lens);
      }
      return ALL_LENSES.filter((l) => prev.includes(l) || l === lens);
    });
  };

  const toggleLensCollapsed = (lens: Lens) => {
    setCollapsedLenses((prev) =>
      prev.includes(lens) ? prev.filter((l) => l !== lens) : [...prev, lens],
    );
  };

  const resetFilters = () => {
    setSelectedActor('all');
    setSelectedPerson('all');
    setSelectedTypes([...track.filterTypes]);
    explicitYears.current = false;
    setSelectedYears(allYears);
    setSelectedSentiments([...ALL_SENTIMENT_TAGS]);
    setSelectedLenses([...ALL_LENSES]);
    setCollapsedLenses([...DEFAULT_COLLAPSED_LENSES]);
    setSelectedThesis('all');
    setQuery('');
  };

  const typeLabel = (type: EventType) => t.trasparenza.types[type];
  const sentimentTagLabel = (tag: SentimentTag) => t.trasparenza.sentiments[tag];
  const stanceLabel = (stance: PositionStance) => t.trasparenza.stances[stance];

  const centerOnEvent = (id: string) => {
    setActiveId(id);
    setScrubId(null);
    setFocusEventToken((n) => n + 1);
  };

  /** A `?event=` deep link wins over the "open on today" default. */
  useEffect(() => {
    if (!pendingEvent) return;
    if (!feedEvents.some((e) => e.id === pendingEvent)) return;
    centerOnEvent(pendingEvent);
    setPendingEvent(null);
  }, [pendingEvent, feedEvents]);

  const goPrev = () => {
    if (activeIndex > 0) centerOnEvent(feedEvents[activeIndex - 1].id);
  };
  const goNext = () => {
    if (activeIndex >= 0 && activeIndex < feedEvents.length - 1) {
      centerOnEvent(feedEvents[activeIndex + 1].id);
    }
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goPrev();
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        goNext();
      }
      if (e.key === 'Escape') {
        setPanelOpen(false);
        setActiveId(null);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, filtered]);

  const lensLabel = (lens: Lens) => LENS_META[lens].label[locale];

  const filterLabels = {
    themeLabel: t.trasparenza.themeLabel,
    lensesLabel: t.trasparenza.lensesLabel,
    allActors: t.trasparenza.allActors,
    allPeople: t.trasparenza.allPeople,
    actorsLabel: t.trasparenza.actorsLabel,
    peopleLabel: t.trasparenza.peopleLabel,
    typesLabel: t.trasparenza.typesLabel,
    yearsLabel: t.trasparenza.yearsLabel,
    sentimentLabel: t.trasparenza.sentimentLabel,
    thesesLabel: t.trasparenza.thesesLabel,
    allTheses: t.trasparenza.allTheses,
    readingKey: t.trasparenza.readingKey,
    thesisOpen: t.trasparenza.thesisOpen,
    thesisSettled: t.trasparenza.thesisSettled,
    thesisSince: t.trasparenza.thesisSince,
    resetFilters: t.trasparenza.resetFilters,
    eventsCount: t.trasparenza.eventsCount,
    typeLabel,
    sentimentTagLabel,
  };

  const selectEvent = (id: string) => {
    if (activeId === id) {
      setActiveId(null);
      return;
    }
    centerOnEvent(id);
    setPanelTab('feed');
    setPanelOpen(true);
  };

  const activeFilters =
    selectedActor !== 'all' ||
    selectedPerson !== 'all' ||
    selectedTypes.length < track.filterTypes.length ||
    selectedYears.length < allYears.length ||
    selectedSentiments.length < ALL_SENTIMENT_TAGS.length ||
    selectedLenses.length < ALL_LENSES.length ||
    selectedThesis !== 'all';

  /** Verified quotes: the only pins that carry a tone tag. */
  const moodEvents = useMemo(
    () => filtered.filter((e) => Boolean(e.sentiment)),
    [filtered],
  );

  /**
   * Volume band: verified quotes plus the headline diary.
   * Only the quotes carry a tone, so the bars show how much was said.
   */
  const activityEvents = useMemo(
    () => [...moodEvents, ...autoFeed],
    [moodEvents, autoFeed],
  );

  const laneLabels = useMemo(
    () => ({
      todayLabel: t.trasparenza.todayLabel,
      hint: t.trasparenza.lanesHint,
      volume: t.trasparenza.activity,
      volumeHint: t.trasparenza.activityHint,
      sentiment: t.trasparenza.moodTitle,
      sentimentBlurb: t.trasparenza.moodBlurb,
      sentimentHint: t.trasparenza.moodHint,
      fear: t.trasparenza.moodFear,
      enthusiasm: t.trasparenza.moodEnthusiasm,
      collapseLane: t.trasparenza.laneCollapse,
      expandLane: t.trasparenza.laneExpand,
    }),
    [t],
  );

  /**
   * The right panel carries both sections. Two separate panels duplicated the
   * same entry points in the toolbar and let the same filter live in two places.
   */
  const renderPanel = (className: string) => (
    <div className={`flex h-full min-h-0 flex-col ${className}`}>
      <div className="flex shrink-0 items-center gap-2 border-b border-border/50 px-3 py-2">
        <div
          role="tablist"
          aria-label={`${t.trasparenza.filterBy} · ${t.trasparenza.feedTitle}`}
          className="inline-flex h-8 shrink-0 items-center rounded-md border border-border/50 p-0.5"
        >
          {(['filters', 'feed'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={panelTab === tab}
              onClick={() => setPanelTab(tab)}
              className={`inline-flex h-full items-center gap-1.5 rounded px-2 text-[13px] font-medium transition-colors ${
                panelTab === tab
                  ? 'bg-foreground text-background'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab === 'filters' ? t.trasparenza.filterBy : t.trasparenza.feedTitle}
              {tab === 'filters' && activeFilters && panelTab !== 'filters' && (
                <span className="h-1.5 w-1.5 rounded-full bg-mark" />
              )}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setPanelOpen(false)}
          className="ml-auto inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label={t.trasparenza.close}
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {panelTab === 'filters' ? (
        <FilterSidebar
          themes={timelineThemes}
          selectedThemeId={track.id}
          onThemeChange={switchTheme}
          locale={locale}
          actors={track.actors}
          people={track.people}
          years={allYears}
          filterTypes={track.filterTypes}
          showSentiment={track.showSentiment}
          selectedActor={selectedActor}
          selectedPerson={selectedPerson}
          selectedTypes={selectedTypes}
          selectedYears={selectedYears}
          selectedSentiments={selectedSentiments}
          allSentimentTags={ALL_SENTIMENT_TAGS}
          selectedLenses={selectedLenses}
          eventCount={feedEvents.length}
          disclaimer={track.disclaimer[locale]}
          labels={filterLabels}
          onActorChange={setSelectedActor}
          onPersonChange={setSelectedPerson}
          onToggleType={toggleType}
          onToggleYear={toggleYear}
          onToggleSentiment={toggleSentiment}
          onToggleLens={toggleLens}
          onReset={resetFilters}
          theses={theses}
          selectedThesis={selectedThesis}
          onThesisChange={setSelectedThesis}
          className="min-h-0 flex-1"
        />
      ) : (
        <TimelineFeed
          events={feedEvents}
          locale={locale}
          people={personMap}
          actors={actorMap}
          activeId={activeId}
          onSelect={selectEvent}
          onScrub={setScrubId}
          sentimentLabel={sentimentTagLabel}
          typeLabel={typeLabel}
          sentimentNote={t.trasparenza.sentimentNote}
          autoNote={t.trasparenza.autoNote}
          autoLabel={t.trasparenza.autoLabel}
          sourceLabel={t.trasparenza.source}
          permalinkLabel={t.trasparenza.permalink}
          permalinkHint={t.trasparenza.permalinkHint}
          newestFirstLabel={t.trasparenza.feedNewest}
          emptyLabel={t.trasparenza.empty}
          className="min-h-0 flex-1"
        />
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 flex overflow-hidden bg-background">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_12%_0%,oklch(0.48_0.17_25/_0.07),transparent_48%),radial-gradient(ellipse_at_88%_15%,oklch(0.32_0.04_255/_0.05),transparent_42%)]"
      />

      <section id="timeline" className="relative min-h-0 min-w-0 flex-1">
        <div className="absolute inset-0">
          <LaneTimeline
            events={filtered}
            people={personMap}
            locale={locale}
            activeId={activeId}
            collapsedLenses={collapsedLenses}
            onToggleLensCollapsed={toggleLensCollapsed}
            scrubId={scrubId}
            onSelect={selectEvent}
            emptyLabel={t.trasparenza.empty}
            labels={laneLabels}
            typeLabel={typeLabel}
            sentimentLabel={sentimentTagLabel}
            lensLabel={lensLabel}
            stanceByEventId={stanceByEventId}
            stanceLabel={stanceLabel}
            volumeEvents={activityEvents}
            moodEvents={moodEvents}
            focusPresent
            presentFocusToken={presentFocusToken}
            focusEventToken={focusEventToken}
          />

          <div
            className="pointer-events-none absolute inset-x-0 z-30 px-2.5 sm:px-4"
            style={{ top: CHROME_TOP }}
          >
            <div className="pointer-events-auto flex items-center gap-1.5">
              <div className="relative min-w-0 flex-1 sm:max-w-sm" title={t.trasparenza.searchHint}>
                <Search
                  className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/70"
                  aria-hidden
                />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t.trasparenza.searchPlaceholder}
                  aria-label={t.trasparenza.searchLabel}
                  className="h-10 w-full rounded-md border border-border/50 bg-background/80 pl-8 pr-8 text-sm text-foreground outline-none backdrop-blur-md transition-colors placeholder:text-muted-foreground/70 focus:border-foreground/25 focus:bg-background [&::-webkit-search-cancel-button]:appearance-none"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    aria-label={t.trasparenza.searchClear}
                    className="absolute right-2 top-1/2 inline-flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>

              <div className="ml-auto flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => {
                    setActiveId(null);
                    setScrubId(null);
                    setPresentFocusToken((n) => n + 1);
                  }}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground/80 transition-colors hover:bg-background/70 hover:text-foreground"
                  aria-label={t.trasparenza.jumpToToday}
                  title={t.trasparenza.jumpToToday}
                >
                  <Calendar className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  onClick={() => setPanelOpen((o) => !o)}
                  className={`inline-flex h-9 items-center gap-2 rounded-md px-2.5 transition-colors ${
                    panelOpen
                      ? 'bg-foreground text-background'
                      : 'text-muted-foreground/80 hover:bg-background/70 hover:text-foreground'
                  }`}
                  aria-expanded={panelOpen}
                  aria-label={`${t.trasparenza.filterBy} · ${t.trasparenza.feedTitle}`}
                  title={`${t.trasparenza.filterBy} · ${t.trasparenza.feedTitle}`}
                >
                  <PanelRight className="h-4 w-4" />
                  {activeFilters && !panelOpen && (
                    <span className="h-1.5 w-1.5 rounded-full bg-mark" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* Dossier panel — docked on desktop, full screen below it */}
      <AnimatePresence initial={false}>
        {panelOpen && (
          <motion.aside
            key="desktop-panel"
            className="relative z-20 hidden h-full shrink-0 overflow-hidden border-l border-border/50 bg-background/95 backdrop-blur-xl lg:flex"
            initial={{ width: 0, opacity: 0.6 }}
            animate={{ width: 380, opacity: 1 }}
            exit={{ width: 0, opacity: 0.6 }}
            transition={{ type: 'spring', bounce: 0.05, duration: 0.38 }}
          >
            <div className="flex h-full w-[min(100vw,380px)] min-w-[min(100vw,380px)] flex-col">
              {renderPanel('flex-1')}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {panelOpen && (
          <motion.div
            key="mobile-panel"
            className="absolute inset-0 z-[60] flex flex-col bg-background lg:hidden"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', bounce: 0.08, duration: 0.35 }}
          >
            {renderPanel('flex-1')}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
