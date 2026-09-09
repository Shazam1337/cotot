"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  signalLifecycle,
  type DemoCreator,
  type DemoSignal,
} from "@/data/demo-scenario";
import { DONS_X_URL } from "@/lib/constants";

type FeaturedSignalProps = {
  creator: DemoCreator;
  impact: number;
  estimatedCut: number;
  signal: DemoSignal;
};

const compactNumber = new Intl.NumberFormat("en-US", {
  notation: "compact",
  maximumFractionDigits: 1,
});

const lifecycleLabels = {
  detected: "Detected",
  verified: "Verified",
  tracking: "Tracking",
  scored: "Scored",
  paid: "Paid",
};

export function FeaturedSignal({
  creator,
  impact,
  estimatedCut,
  signal,
}: FeaturedSignalProps) {
  const reduceMotion = useReducedMotion();
  const activeStage = signalLifecycle.indexOf(signal.status);

  return (
    <article className="h-full rounded-[4px] border border-white/11 bg-bg-elevated/72">
      <header className="flex items-start justify-between border-b border-border px-8 py-6">
        <div className="flex items-center gap-3.5">
          <div className="flex size-11 items-center justify-center rounded-full border border-border-strong bg-surface text-[12px] font-semibold tracking-[0.04em] text-text-primary">
            {creator.initials}
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <p className="text-[16px] font-semibold text-text-primary">{creator.handle}</p>
              <span className="size-1 rounded-full bg-text-muted" />
              <time className="font-mono text-[10px] text-text-muted">{signal.relativeTime}</time>
            </div>
            <p className="mt-1 text-[12px] text-text-muted">{creator.descriptor}</p>
          </div>
        </div>

        <div className="text-right">
          <p className="type-label text-text-muted">Don Score</p>
          <p className="mt-2 text-[17px] font-medium tabular-nums text-text-secondary">
            {creator.donScore}
          </p>
        </div>
      </header>

      <div className="px-8 pb-7 pt-7">
        <div className="max-w-[680px] text-[25px] font-medium leading-[1.28] tracking-[-0.026em] text-text-primary">
          {signal.post.map((line) => (
            <p key={line} className="mb-2 last:mb-0">
              {line}
            </p>
          ))}
        </div>

        <motion.div
          whileHover={reduceMotion ? undefined : { y: -2 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mt-7 flex h-[250px] flex-col justify-between overflow-hidden border border-border bg-[#080a08] p-7"
        >
          <div className="flex items-center justify-between">
            <p className="text-[14px] font-semibold tracking-[-0.02em] text-text-primary">DONS</p>
            <p className="type-label text-text-muted">{signal.mediaKicker}</p>
          </div>

          <div className="grid grid-cols-[1.3fr_0.7fr] items-end gap-8">
            <div>
              <span className="mb-5 block h-px w-12 bg-lime" />
              <p className="font-display text-[58px] font-normal leading-[0.76] tracking-[-0.035em] text-text-primary">
                {signal.mediaTitle}
              </p>
            </div>
            <p className="pb-0.5 text-[20px] font-semibold uppercase leading-[1.08] tracking-[-0.025em] text-text-secondary">
              Creators get
              <span className="block">their cut.</span>
            </p>
          </div>

          <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-text-muted">
            DONS / <span className="text-lime">Robinhood Chain</span>
          </p>
        </motion.div>
      </div>

      <dl className="grid grid-cols-3 border-y border-border px-8 py-5">
        <div>
          <dd className="text-[24px] font-medium tracking-[-0.03em] tabular-nums text-text-primary">
            {compactNumber.format(signal.impressions)}
          </dd>
          <dt className="mt-2 text-[11px] text-text-muted">Impressions</dt>
        </div>
        <div className="border-l border-border pl-7">
          <dd className="text-[24px] font-medium tracking-[-0.03em] tabular-nums text-text-primary">
            {signal.engagements.toLocaleString("en-US")}
          </dd>
          <dt className="mt-2 text-[11px] text-text-muted">Engagements</dt>
        </div>
        <div className="border-l border-border pl-7">
          <dd className="text-[24px] font-medium tracking-[-0.03em] tabular-nums text-text-primary">
            {signal.engagementRate.toFixed(1)}%
          </dd>
          <dt className="mt-2 text-[11px] text-text-muted">Engagement rate</dt>
        </div>
      </dl>

      <div className="grid grid-cols-[1.15fr_1fr] px-8 py-7">
        <div className="pr-8">
          <p className="type-label text-text-muted">Impact</p>
          <div className="mt-3 flex items-end justify-between gap-8">
            <motion.data
              key={impact}
              value={impact}
              initial={reduceMotion ? false : { color: "#b7ff3c", y: 2 }}
              animate={{ color: "#f1f2ea", y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-[58px] font-medium leading-none tracking-[-0.055em] tabular-nums"
            >
              {impact}
            </motion.data>
            <p className="pb-1 text-[11px] text-text-muted">Signal quality</p>
          </div>
          <div className="mt-5 h-px bg-white/8">
            <motion.div
              initial={false}
              animate={{ width: `${Math.min(impact / 10, 100)}%` }}
              transition={{ duration: reduceMotion ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="h-px bg-lime/70"
            />
          </div>
        </div>

        <div className="border-l border-border pl-8">
          <p className="type-label text-text-muted">Estimated Cut</p>
          <motion.data
            key={estimatedCut.toFixed(2)}
            value={estimatedCut}
            initial={reduceMotion ? false : { opacity: 0.65, y: 2 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-3 block text-[42px] font-medium leading-none tracking-[-0.045em] tabular-nums text-lime"
          >
            ${estimatedCut.toFixed(2)}
          </motion.data>
          <p className="mt-3 max-w-[190px] text-[11px] leading-relaxed text-text-muted">
            Updates while this signal is tracking.
          </p>
        </div>
      </div>

      <div className="border-t border-border px-8 py-6">
        <div className="relative grid grid-cols-5">
          <div className="absolute left-[10%] right-[10%] top-[4px] h-px bg-white/8" />
          {signalLifecycle.map((stage, index) => {
            const isActive = index === activeStage;
            const isComplete = index < activeStage;
            return (
              <div key={stage} className="relative flex flex-col items-center">
                <span
                  className={`relative z-10 size-2 rounded-full border ${
                    isActive
                      ? "border-lime bg-lime live-dot-pulse"
                      : isComplete
                        ? "border-[#668747] bg-[#334523]"
                        : "border-white/12 bg-bg-elevated"
                  }`}
                />
                <span
                  className={`mt-3 text-[9px] font-semibold uppercase tracking-[0.12em] ${
                    isActive
                      ? "text-lime"
                      : isComplete
                        ? "text-text-secondary"
                        : "text-text-muted/50"
                  }`}
                >
                  {lifecycleLabels[stage]}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <footer className="flex items-center justify-between border-t border-border px-8 py-5">
        <div className="flex items-center gap-8">
          <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-text-muted">
            Signal ID <span className="ml-2 text-text-secondary">#{signal.id}</span>
          </p>
          <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-text-muted">
            Detected <span className="ml-2 text-text-secondary">{signal.timestamp}</span>
          </p>
        </div>
        <a
          href={DONS_X_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer text-[12px] font-medium text-text-secondary transition-colors hover:text-text-primary focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-lime"
        >
          Open on X <span aria-hidden="true">→</span>
        </a>
      </footer>
    </article>
  );
}
