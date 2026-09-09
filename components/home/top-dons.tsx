"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/layout/container";
import {
  leaderboardCreators,
  leaderboardRanges,
  leaderboardSnapshots,
  type LeaderboardCreator,
  type LeaderboardEntry,
  type LeaderboardRange,
} from "@/data/leaderboard";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function formatReach(reach: number) {
  if (reach >= 1000000) return `${(reach / 1000000).toFixed(1)}M`;
  return `${Math.round(reach / 1000)}K`;
}

function CreatorIdentity({ creator, large = false }: { creator: LeaderboardCreator; large?: boolean }) {
  return (
    <div className="flex items-center gap-3.5">
      <div
        className={`flex shrink-0 items-center justify-center rounded-full border border-border-strong bg-surface font-semibold text-text-secondary ${
          large ? "size-12 text-[12px]" : "size-10 text-[10px]"
        }`}
      >
        {creator.initials}
      </div>
      <div className="min-w-0">
        <p className={`${large ? "text-[18px]" : "text-[15px]"} truncate font-semibold text-text-primary`}>
          {creator.handle}
        </p>
        <p className="mt-1 text-[11px] text-text-muted">{creator.category}</p>
      </div>
    </div>
  );
}

function TopCreator({
  creator,
  entry,
  rank,
}: {
  creator: LeaderboardCreator;
  entry: LeaderboardEntry;
  rank: number;
}) {
  const isLeader = rank === 1;

  return (
    <article className={`flex min-h-[360px] flex-col justify-between px-8 py-8 ${rank > 1 ? "border-l border-border" : ""}`}>
      <div>
        <div className="flex items-center justify-between gap-5">
          <CreatorIdentity creator={creator} large={isLeader} />
          <span className="text-[12px] font-semibold tabular-nums text-text-muted">#{rank.toString().padStart(2, "0")}</span>
        </div>

        <div className="mt-12">
          <p className="type-label text-text-muted">Don Score</p>
          <data
            value={entry.donScore}
            className={`${isLeader ? "text-[78px] text-lime" : "text-[58px] text-text-primary"} mt-4 block font-medium leading-none tracking-[-0.055em] tabular-nums`}
          >
            {entry.donScore}
          </data>
          <div className="mt-6 h-px bg-white/8">
            <div
              className={`${isLeader ? "bg-lime/75" : "bg-text-muted/55"} h-px`}
              style={{ width: `${entry.donScore / 10}%` }}
            />
          </div>
        </div>
      </div>

      <dl className="grid grid-cols-3 gap-5 pt-9">
        <div>
          <dd className="text-[17px] font-medium tabular-nums text-text-primary">{entry.signals}</dd>
          <dt className="mt-2 text-[10px] text-text-muted">Signals</dt>
        </div>
        <div>
          <dd className="text-[17px] font-medium tabular-nums text-text-primary">{formatReach(entry.reach)}</dd>
          <dt className="mt-2 text-[10px] text-text-muted">Reach</dt>
        </div>
        <div>
          <dd className="text-[17px] font-medium tabular-nums text-text-primary">{currency.format(entry.earned)}</dd>
          <dt className="mt-2 text-[10px] text-text-muted">Earned</dt>
        </div>
      </dl>
    </article>
  );
}

export function TopDons() {
  const reduceMotion = useReducedMotion();
  const [range, setRange] = useState<LeaderboardRange>("season");
  const [liveScoreBonus, setLiveScoreBonus] = useState(0);
  const creators = useMemo(
    () => new Map(leaderboardCreators.map((creator) => [creator.id, creator])),
    [],
  );
  const snapshot = leaderboardSnapshots[range];
  const liveTargetId = snapshot.entries[4].creatorId;

  useEffect(() => {
    if (reduceMotion) return;

    const timer = window.setInterval(() => {
      setLiveScoreBonus((current) => (current + 1) % 3);
    }, 19000);

    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  function selectRange(nextRange: LeaderboardRange) {
    setRange(nextRange);
    setLiveScoreBonus(0);
  }

  const topThree = snapshot.entries.slice(0, 3);
  const lowerRanks = snapshot.entries.slice(3, 8);
  const risingCreator = creators.get(snapshot.risingCreatorId)!;

  return (
    <section id="top-dons" aria-labelledby="top-dons-heading" className="border-b border-border">
      <Container className="pb-32 pt-[132px]">
        <div className="grid grid-cols-12 items-end gap-8">
          <div className="col-span-7">
            <p className="type-label flex items-center gap-3 text-text-muted">
              <span className="h-px w-9 bg-lime" />
              Creator ranking
            </p>
            <h2 id="top-dons-heading" className="type-section-title mt-6 text-text-primary">
              Top Dons
            </h2>
            <p className="mt-7 text-[20px] tracking-[-0.015em] text-text-secondary">
              The creators moving the network.
            </p>
          </div>

          <div className="col-span-5 flex justify-end pb-1">
            <div role="tablist" aria-label="Leaderboard time range" className="flex items-center gap-7">
              {leaderboardRanges.map((item) => {
                const active = range === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => selectRange(item.id)}
                    className={`relative cursor-pointer pb-3 text-[11px] font-semibold uppercase tracking-[0.1em] transition-colors focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-lime ${
                      active ? "text-text-primary" : "text-text-muted hover:text-text-secondary"
                    }`}
                  >
                    {item.label}
                    {active ? (
                      <motion.span
                        layoutId="leaderboard-range-indicator"
                        transition={{ duration: reduceMotion ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute inset-x-0 bottom-0 h-px bg-lime"
                      />
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={range}
            role="tabpanel"
            initial={reduceMotion ? false : { opacity: 0.72, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0.72, y: -3 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-14"
          >
            <div className="grid grid-cols-[1.18fr_1fr_1fr] border-y border-border bg-bg-elevated/24">
              {topThree.map((entry, index) => (
                <TopCreator
                  key={entry.creatorId}
                  creator={creators.get(entry.creatorId)!}
                  entry={entry}
                  rank={index + 1}
                />
              ))}
            </div>

            <div className="mt-16">
              <div className="grid grid-cols-[80px_1.5fr_0.8fr_0.7fr_0.8fr_0.8fr] gap-6 border-b border-border pb-4 text-[9px] font-semibold uppercase tracking-[0.12em] text-text-muted">
                <span>Rank</span>
                <span>Creator</span>
                <span>Don Score</span>
                <span>Signals</span>
                <span>Reach</span>
                <span className="text-right">Earned</span>
              </div>

              <ol>
                {lowerRanks.map((entry, index) => {
                  const creator = creators.get(entry.creatorId)!;
                  const displayedScore =
                    entry.donScore + (entry.creatorId === liveTargetId ? liveScoreBonus : 0);

                  return (
                    <li
                      key={entry.creatorId}
                      className="grid min-h-[86px] grid-cols-[80px_1.5fr_0.8fr_0.7fr_0.8fr_0.8fr] items-center gap-6 border-b border-border"
                    >
                      <span className="text-[13px] font-semibold tabular-nums text-text-muted">
                        #{(index + 4).toString().padStart(2, "0")}
                      </span>
                      <CreatorIdentity creator={creator} />
                      <motion.data
                        key={`${entry.creatorId}_${displayedScore}`}
                        value={displayedScore}
                        initial={reduceMotion ? false : { color: "#b7ff3c" }}
                        animate={{ color: "#f1f2ea" }}
                        transition={{ duration: 0.9 }}
                        className="text-[18px] font-medium tabular-nums"
                      >
                        {displayedScore}
                      </motion.data>
                      <span className="text-[15px] tabular-nums text-text-secondary">{entry.signals}</span>
                      <span className="text-[15px] tabular-nums text-text-secondary">{formatReach(entry.reach)}</span>
                      <span className="text-right text-[15px] font-medium tabular-nums text-text-primary">
                        {currency.format(entry.earned)}
                      </span>
                    </li>
                  );
                })}
              </ol>
            </div>

            <div className="flex items-end justify-between gap-8 pt-8">
              <div className="border-l border-border pl-4">
                <p className="type-label text-text-muted">Rising Don</p>
                <div className="mt-2 flex items-center gap-3">
                  <span className="text-[14px] font-semibold text-text-primary">{risingCreator.handle}</span>
                  <span className="text-[11px] font-medium text-lime">
                    ↑ {snapshot.risingPlaces} places this week
                  </span>
                </div>
              </div>

              <button
                type="button"
                className="cursor-pointer text-[13px] font-medium text-text-secondary transition-colors hover:text-text-primary focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-lime"
              >
                View all creators <span aria-hidden="true">→</span>
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </Container>
    </section>
  );
}
