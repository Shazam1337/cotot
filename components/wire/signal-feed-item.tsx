"use client";

import { motion, useReducedMotion } from "framer-motion";
import { LiveDot } from "@/components/ui/live-dot";
import type { WireCreator, WireSignal } from "@/data/wire";
import { wireStatusLabels } from "@/data/wire";
import { formatSol } from "@/lib/currency";

const compactNumber = new Intl.NumberFormat("en-US", {
  notation: "compact",
  maximumFractionDigits: 1,
});

const statusStyles: Record<WireSignal["status"], string> = {
  detected: "text-text-muted",
  verified: "text-text-primary",
  tracking: "text-lime",
  scored: "text-text-secondary",
  paid: "text-lime",
};

export function SignalFeedItem({
  creator,
  signal,
}: {
  creator: WireCreator;
  signal: WireSignal;
}) {
  const reduceMotion = useReducedMotion();
  const fresh = signal.id.startsWith("live-");

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: fresh ? -6 : 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.36, ease: [0.22, 1, 0.36, 1] }}
      className="border border-white/10 bg-bg-elevated/52"
    >
      {signal.hot ? (
        <div className="flex items-center justify-between border-b border-border px-7 py-3">
          <p className="type-label text-lime">Hot Signal</p>
          <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-text-muted">
            Impact {signal.impact} <span className="ml-4 text-lime">Velocity +{signal.velocity}%</span>
          </p>
        </div>
      ) : null}

      <header className="flex items-start justify-between px-7 pb-5 pt-6">
        <div className="flex items-center gap-3.5">
          <div className="grid size-10 shrink-0 place-items-center rounded-full border border-border-strong bg-surface text-[11px] font-semibold tracking-[0.04em] text-text-primary">
            {creator.initials}
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <p className="text-[15px] font-semibold text-text-primary">{creator.handle}</p>
              <span className="size-1 rounded-full bg-text-muted" />
              <time className="font-mono text-[9px] text-text-muted">{signal.relativeTime}</time>
            </div>
            <p className="mt-1.5 text-[11px] text-text-muted">{creator.descriptor}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="type-label text-text-muted">Don Score</p>
          <data className="mt-2 block text-[15px] font-medium tabular-nums text-text-secondary">
            {creator.donScore}
          </data>
        </div>
      </header>

      <div className="px-7 pb-6">
        <p className="max-w-[760px] text-[20px] font-medium leading-[1.42] tracking-[-0.018em] text-text-primary">
          {signal.post}
        </p>

        {signal.media ? (
          <div className="mt-5 grid min-h-[142px] grid-cols-[1.15fr_0.85fr] items-end border border-border bg-[#080a08] p-6">
            <div>
              <p className="type-label text-text-muted">{signal.media.kicker}</p>
              <p className="mt-7 text-[34px] font-bold uppercase leading-[0.92] tracking-[-0.045em] text-text-primary">
                {signal.media.headline}
              </p>
            </div>
            <div className="border-l border-border pl-6">
              <span className="mb-4 block h-px w-9 bg-lime" />
              <p className="max-w-[220px] text-[12px] leading-5 text-text-secondary">
                {signal.media.note}
              </p>
            </div>
          </div>
        ) : null}
      </div>

      <dl className="grid grid-cols-[1.15fr_1fr_1fr_0.85fr_0.9fr] border-y border-border px-7 py-5">
        <div>
          <dd className="text-[19px] font-medium tabular-nums text-text-primary">
            {compactNumber.format(signal.impressions)}
          </dd>
          <dt className="mt-2 text-[10px] text-text-muted">Impressions</dt>
        </div>
        <div className="border-l border-border pl-5">
          <dd className="text-[19px] font-medium tabular-nums text-text-primary">
            {signal.engagements.toLocaleString("en-US")}
          </dd>
          <dt className="mt-2 text-[10px] text-text-muted">Engagements</dt>
        </div>
        <div className="border-l border-border pl-5">
          <dd className="text-[19px] font-medium tabular-nums text-text-primary">
            {signal.engagementRate.toFixed(1)}%
          </dd>
          <dt className="mt-2 text-[10px] text-text-muted">Engagement rate</dt>
        </div>
        <div className="border-l border-border pl-5">
          <dd className="text-[21px] font-medium tabular-nums text-text-primary">{signal.impact}</dd>
          <dt className="mt-2 text-[10px] text-text-muted">Impact</dt>
        </div>
        <div className="border-l border-border pl-5">
          <dd className="text-[21px] font-medium tabular-nums text-lime">
            {formatSol(signal.estimatedCut)}
          </dd>
          <dt className="mt-2 text-[10px] text-text-muted">Estimated cut</dt>
        </div>
      </dl>

      <footer className="flex items-center justify-between px-7 py-4">
        <div className="flex items-center gap-7 font-mono text-[8px] uppercase tracking-[0.1em] text-text-muted">
          <p>Signal ID <span className="ml-1.5 text-text-secondary">#{signal.id.replace("live-", "")}</span></p>
          <p>Detected <span className="ml-1.5 text-text-secondary">{signal.timestamp}</span></p>
        </div>
        <p className={`flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.11em] ${statusStyles[signal.status]}`}>
          {signal.status === "tracking" ? <LiveDot /> : null}
          {wireStatusLabels[signal.status]}
        </p>
      </footer>
    </motion.article>
  );
}
