"use client";

import { motion, useReducedMotion } from "framer-motion";
import { LiveDot } from "@/components/ui/live-dot";
import {
  signalStatusLabels,
  type DemoCreator,
  type DemoSignal,
} from "@/data/demo-scenario";

type LiveSignalQueueProps = {
  creators: Map<string, DemoCreator>;
  signals: DemoSignal[];
};

function getPrimaryValue(signal: DemoSignal) {
  if (signal.status === "paid") return `$${signal.estimatedCut.toFixed(2)}`;
  if (signal.status === "detected") return "Listening";
  return `${signal.impact} Impact`;
}

export function LiveSignalQueue({ creators, signals }: LiveSignalQueueProps) {
  const reduceMotion = useReducedMotion();

  return (
    <aside className="flex h-full flex-col rounded-[4px] border border-border-strong bg-bg-elevated/48">
      <div className="flex items-center justify-between border-b border-border px-6 py-[22px]">
        <div>
          <p className="type-label text-text-secondary">Live Signals</p>
          <p className="mt-2 text-[11px] text-text-muted">Updating now</p>
        </div>
        <LiveDot />
      </div>

      <ol aria-live="polite" className="flex-1 overflow-hidden px-6">
        {signals.map((signal, index) => {
          const creator = creators.get(signal.creatorId);
          if (!creator) return null;

          const accent = signal.status === "paid" || signal.status === "tracking";

          return (
            <motion.li
              key={signal.id}
              initial={false}
              animate={
                index === 0 && !reduceMotion
                  ? { opacity: [0.72, 1], y: [-6, 0] }
                  : { opacity: 1, y: 0 }
              }
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className={`flex min-h-[110px] flex-col justify-center py-4 ${
                index < signals.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <div className="flex items-start justify-between gap-5">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-[10px] font-semibold text-text-secondary">
                    {creator.initials}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-[14px] font-semibold text-text-primary">
                      {creator.handle}
                    </p>
                    <p
                      className={`mt-1.5 text-[11px] ${
                        signal.status === "tracking" ? "text-lime" : "text-text-secondary"
                      }`}
                    >
                      {signalStatusLabels[signal.status]}
                    </p>
                  </div>
                </div>
                <time className="shrink-0 font-mono text-[8px] text-text-muted/60">
                  {signal.relativeTime}
                </time>
              </div>

              <div className="mt-3 flex items-end justify-between gap-4 pl-12">
                <p
                  className={`text-[20px] font-medium tracking-[-0.025em] tabular-nums ${
                    accent ? "text-lime" : "text-text-primary"
                  }`}
                >
                  {getPrimaryValue(signal)}
                </p>
                {signal.status !== "detected" && signal.status !== "paid" ? (
                  <p className="text-[10px] tabular-nums text-text-muted">
                    Est. cut ${signal.estimatedCut.toFixed(2)}
                  </p>
                ) : null}
              </div>
            </motion.li>
          );
        })}
      </ol>

      <div className="flex items-center justify-between gap-5 border-t border-border px-6 py-5">
        <p className="text-[10px] text-text-muted">42 signals in the last hour</p>
        <button
          type="button"
          className="cursor-pointer text-[12px] font-medium text-text-secondary transition-colors hover:text-text-primary focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-lime"
        >
          View all <span aria-hidden="true">→</span>
        </button>
      </div>
    </aside>
  );
}
