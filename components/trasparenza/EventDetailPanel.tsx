"use client";

import { ExternalLink, X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import {
  formatAmount,
  formatEventDate,
  type TimelineEvent,
} from "@/lib/data/trasparenza";
import { EVENT_META, SENTIMENT_META } from "./meta";

type Props = {
  event: TimelineEvent | null;
  locale: "it" | "en";
  actorName?: string;
  actorColor?: string;
  personName?: string;
  personRole?: string;
  typeLabel: string;
  sentimentLabel?: string;
  sentimentNote?: string;
  selectHint: string;
  closeLabel: string;
  sourceLabel: string;
  prevLabel: string;
  nextLabel: string;
  onClose?: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
  className?: string;
};

export function EventDetailPanel({
  event,
  locale,
  actorName,
  actorColor,
  personName,
  personRole,
  typeLabel,
  sentimentLabel,
  sentimentNote,
  selectHint,
  closeLabel,
  sourceLabel,
  prevLabel,
  nextLabel,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
  className = "",
}: Props) {
  if (!event) {
    return (
      <div
        className={`flex h-full items-center justify-center rounded-none border-border/50 bg-muted/15 p-8 text-center text-sm text-muted-foreground ${className}`}
      >
        {selectHint}
      </div>
    );
  }

  const meta = EVENT_META[event.type];
  const Icon = meta.icon;
  const sentimentMeta = event.sentiment
    ? SENTIMENT_META[event.sentiment]
    : null;

  return (
    <motion.div
      key={event.id}
      initial={{ opacity: 0, x: 8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.22 }}
      className={`flex h-full flex-col ${className}`}
    >
      <div className="flex items-start justify-between gap-3 border-b border-border/50 px-5 py-4">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${
            sentimentMeta ? `${sentimentMeta.bg} ${sentimentMeta.color}` : `${meta.bg} ${meta.color}`
          }`}
        >
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex items-center gap-1">
          {onPrev && (
            <button
              type="button"
              onClick={onPrev}
              disabled={!hasPrev}
              className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-30"
              aria-label={prevLabel}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          )}
          {onNext && (
            <button
              type="button"
              onClick={onNext}
              disabled={!hasNext}
              className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-30"
              aria-label={nextLabel}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          )}
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label={closeLabel}
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4">
        <p className="font-mono text-xs text-muted-foreground">
          {formatEventDate(event.date, locale)} · {typeLabel}
        </p>
        <h3 className="mt-2 text-xl font-bold tracking-tight leading-snug">
          {event.title[locale]}
        </h3>

        {sentimentLabel && sentimentMeta && (
          <div className="mt-3">
            <span
              className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium ${sentimentMeta.bg} ${sentimentMeta.color}`}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: sentimentMeta.dot }}
              />
              {sentimentLabel}
            </span>
            {sentimentNote && (
              <p className="mt-1.5 text-[11px] leading-relaxed text-muted-foreground">
                {sentimentNote}
              </p>
            )}
          </div>
        )}

        {personName && (
          <div className="mt-3">
            <p className="text-sm font-medium text-foreground/90">
              {personName}
            </p>
            {personRole && (
              <p className="mt-0.5 text-xs text-muted-foreground">
                {personRole}
              </p>
            )}
          </div>
        )}

        {actorName && (
          <p className="mt-2 inline-flex items-center gap-2 text-sm text-muted-foreground">
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: actorColor }}
            />
            {actorName}
          </p>
        )}

        {event.quote && (
          <blockquote className="mt-4 border-l-2 border-mark/40 pl-3 text-sm italic leading-relaxed text-foreground/90">
            “{event.quote[locale]}”
          </blockquote>
        )}

        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          {event.detail?.[locale] ?? event.summary[locale]}
        </p>

        {event.amountEur != null && (
          <p
            className={`mt-5 font-mono text-lg font-semibold ${
              event.type === "sanction"
                ? "text-red-800 dark:text-red-300"
                : "text-amber-800 dark:text-amber-300"
            }`}
          >
            {event.type === "sanction" ? "" : "~ "}
            {formatAmount(event.amountEur, locale)}
          </p>
        )}

        <div className="mt-6 border-t border-border/50 pt-4">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {sourceLabel}
          </p>
          <a
            href={event.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1.5 inline-flex items-start gap-1.5 text-sm text-foreground underline-offset-4 hover:underline"
          >
            <span className="min-w-0">
              <span className="font-medium">{event.sourceLabel[locale]}</span>
              <span className="mt-0.5 block break-all font-mono text-[11px] text-muted-foreground no-underline">
                {(() => {
                  try {
                    return new URL(event.sourceUrl).hostname.replace(
                      /^www\./,
                      "",
                    );
                  } catch {
                    return event.sourceUrl;
                  }
                })()}
              </span>
            </span>
            <ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
