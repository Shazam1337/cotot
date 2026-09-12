"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Search } from "lucide-react";
import { Container } from "@/components/layout/container";
import { LiveDot } from "@/components/ui/live-dot";
import {
  creatorById,
  creatorLiveCadenceMs,
  creatorNetworkSummaries,
  creatorRanges,
  creatorRangeSnapshots,
  risingCreators,
  type Creator,
  type CreatorMetrics,
  type CreatorRange,
} from "@/data/creators";
import { formatSol } from "@/lib/currency";

type CreatorSort = "don-score" | "reach" | "earned" | "signals";
type LiveMetric = "donScore" | "reach" | "signals" | "momentum";
type RankedCreator = {
  creator: Creator;
  metrics: CreatorMetrics;
  rank: number;
};

const sortOptions: { id: CreatorSort; label: string }[] = [
  { id: "don-score", label: "Don Score" },
  { id: "reach", label: "Reach" },
  { id: "earned", label: "Earned" },
  { id: "signals", label: "Signals" },
];

const liveEvents: { creatorId: string; metric: LiveMetric; amount: number }[] = [
  { creatorId: "alex", metric: "donScore", amount: 2 },
  { creatorId: "kira", metric: "reach", amount: 20_000 },
  { creatorId: "kate", metric: "momentum", amount: 0.4 },
  { creatorId: "harvey", metric: "signals", amount: 1 },
];

function formatReach(value: number) {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(value >= 10_000_000 ? 1 : 2).replace(/0$/, "").replace(/\.$/, "")}M`;
  }
  return `${Math.round(value / 1000)}K`;
}

function metricKey(range: CreatorRange, creatorId: string, metric: LiveMetric) {
  return `${range}:${creatorId}:${metric}`;
}

function CreatorAvatar({ creator, large = false }: { creator: Creator; large?: boolean }) {
  return (
    <span
      className={`grid shrink-0 place-items-center rounded-full border border-border-strong bg-surface/55 font-semibold tracking-[0.04em] text-text-secondary ${
        large ? "size-14 text-[13px]" : "size-10 text-[10px]"
      }`}
      aria-hidden="true"
    >
      {creator.initials}
    </span>
  );
}

function LiveValue({
  active,
  children,
  className = "",
}: {
  active: boolean;
  children: ReactNode;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <span
      className={`${reduceMotion ? "" : "transition-colors duration-1000"} ${
        active ? "text-lime" : ""
      } ${className}`}
    >
      {children}
    </span>
  );
}

function TopCreator({
  entry,
  range,
  highlight,
}: {
  entry: RankedCreator;
  range: CreatorRange;
  highlight: string | null;
}) {
  const { creator, metrics, rank } = entry;
  const leader = rank === 1;
  const secondaryMetrics = [
    { label: "Signals", value: metrics.signals.toString(), metric: "signals" as const },
    { label: "Reach", value: formatReach(metrics.reach), metric: "reach" as const },
    { label: "Earned", value: formatSol(metrics.earned) },
    { label: "Live Signals", value: metrics.liveSignals.toString() },
    { label: "Avg Impact", value: metrics.avgImpact.toString() },
    { label: "Momentum", value: `+${metrics.momentum.toFixed(1)}%`, metric: "momentum" as const },
  ];

  return (
    <article
      className={`flex min-h-[420px] flex-col justify-between px-8 py-9 ${
        rank > 1 ? "border-l border-border" : ""
      }`}
    >
      <div>
        <div className="flex items-start justify-between gap-5">
          <div className="flex items-center gap-4">
            <CreatorAvatar creator={creator} large={leader} />
            <div>
              <p className={`${leader ? "text-[22px]" : "text-[18px]"} font-semibold tracking-[-0.02em] text-text-primary`}>
                {creator.handle}
              </p>
              <p className="mt-1.5 text-[11px] text-text-muted">{creator.category}</p>
            </div>
          </div>
          <span className="font-mono text-[11px] text-text-muted">
            #{rank.toString().padStart(2, "0")}
          </span>
        </div>

        <div className={leader ? "mt-12" : "mt-14"}>
          <p className="type-label text-text-muted">Don Score</p>
          <data
            value={metrics.donScore}
            className={`${leader ? "text-[92px] text-lime" : "text-[66px] text-text-primary"} mt-4 block font-medium leading-none tracking-[-0.06em] tabular-nums`}
          >
            <LiveValue active={highlight === metricKey(range, creator.id, "donScore")}>
              {metrics.donScore}
            </LiveValue>
          </data>
          <div className="mt-6 h-px bg-white/[0.07]">
            <div
              className={`${leader ? "bg-lime/80" : "bg-text-muted/55"} h-px transition-[width] duration-500`}
              style={{ width: `${metrics.donScore / 10}%` }}
            />
          </div>
        </div>
      </div>

      <dl className={`grid ${leader ? "grid-cols-3" : "grid-cols-2"} gap-x-5 gap-y-6 pt-10`}>
        {secondaryMetrics.map((metric) => (
          <div key={metric.label}>
            <dd className={`${leader ? "text-[18px]" : "text-[16px]"} font-medium tabular-nums text-text-primary`}>
              {metric.metric ? (
                <LiveValue active={highlight === metricKey(range, creator.id, metric.metric)}>
                  {metric.value}
                </LiveValue>
              ) : metric.value}
            </dd>
            <dt className="mt-2 text-[10px] text-text-muted">{metric.label}</dt>
          </div>
        ))}
      </dl>
    </article>
  );
}

function CreatorRows({
  entries,
  range,
  highlight,
}: {
  entries: RankedCreator[];
  range: CreatorRange;
  highlight: string | null;
}) {
  return (
    <ol aria-label="Creator ranking">
      {entries.map(({ creator, metrics, rank }) => (
        <li
          key={creator.id}
          className="group relative grid min-h-[82px] grid-cols-[70px_minmax(190px,1.55fr)_0.82fr_0.7fr_0.8fr_0.82fr_0.82fr_0.8fr] items-center gap-5 border-b border-border px-3 transition-colors duration-200 before:absolute before:inset-y-0 before:left-0 before:w-px before:bg-lime before:opacity-0 before:transition-opacity hover:bg-white/[0.018] hover:before:opacity-100"
        >
          <span className="font-mono text-[11px] tabular-nums text-text-muted">
            #{rank.toString().padStart(2, "0")}
          </span>
          <div className="flex min-w-0 items-center gap-3.5">
            <CreatorAvatar creator={creator} />
            <div className="min-w-0">
              <p className="truncate text-[15px] font-semibold text-text-secondary transition-colors duration-200 group-hover:text-text-primary">
                {creator.handle}
              </p>
              <p className="mt-1 truncate text-[10px] text-text-muted">{creator.category}</p>
            </div>
          </div>
          <data value={metrics.donScore} className="text-[17px] font-medium tabular-nums text-text-primary">
            <LiveValue active={highlight === metricKey(range, creator.id, "donScore")}>
              {metrics.donScore}
            </LiveValue>
          </data>
          <span className="text-[14px] tabular-nums text-text-secondary">
            <LiveValue active={highlight === metricKey(range, creator.id, "signals")}>
              {metrics.signals}
            </LiveValue>
          </span>
          <span className="text-[14px] tabular-nums text-text-secondary">
            <LiveValue active={highlight === metricKey(range, creator.id, "reach")}>
              {formatReach(metrics.reach)}
            </LiveValue>
          </span>
          <span className="text-[14px] tabular-nums text-text-secondary">{metrics.avgImpact}</span>
          <span className="text-[14px] font-medium tabular-nums text-text-primary">{formatSol(metrics.earned)}</span>
          <span className="text-[13px] font-medium tabular-nums text-lime">
            <LiveValue active={highlight === metricKey(range, creator.id, "momentum")}>
              +{metrics.momentum.toFixed(1)}%
            </LiveValue>
          </span>
        </li>
      ))}
    </ol>
  );
}

function RankingHeader() {
  return (
    <div className="grid grid-cols-[70px_minmax(190px,1.55fr)_0.82fr_0.7fr_0.8fr_0.82fr_0.82fr_0.8fr] gap-5 border-y border-border px-3 py-4 text-[9px] font-semibold uppercase tracking-[0.11em] text-text-muted">
      <span>Rank</span>
      <span>Creator</span>
      <span>Don Score</span>
      <span>Signals</span>
      <span>Reach</span>
      <span>Avg Impact</span>
      <span>Earned</span>
      <span>Momentum</span>
    </div>
  );
}

export function CreatorsPage() {
  const reduceMotion = useReducedMotion();
  const [range, setRange] = useState<CreatorRange>("season");
  const [sort, setSort] = useState<CreatorSort>("don-score");
  const [search, setSearch] = useState("");
  const [adjustments, setAdjustments] = useState<Record<string, Partial<Record<LiveMetric, number>>>>({});
  const [highlight, setHighlight] = useState<string | null>(null);
  const rangeRef = useRef(range);

  useEffect(() => {
    rangeRef.current = range;
  }, [range]);

  useEffect(() => {
    let eventIndex = 0;
    let timer: number;
    let highlightTimer: number;

    const scheduleUpdate = () => {
      const delay = creatorLiveCadenceMs[eventIndex % creatorLiveCadenceMs.length];
      timer = window.setTimeout(() => {
        const event = liveEvents[eventIndex % liveEvents.length];
        const activeRange = rangeRef.current;
        const adjustmentKey = `${activeRange}:${event.creatorId}`;
        const nextHighlight = metricKey(activeRange, event.creatorId, event.metric);

        setAdjustments((current) => {
          const currentCreator = current[adjustmentKey] ?? {};
          return {
            ...current,
            [adjustmentKey]: {
              ...currentCreator,
              [event.metric]: (currentCreator[event.metric] ?? 0) + event.amount,
            },
          };
        });
        setHighlight(nextHighlight);
        window.clearTimeout(highlightTimer);
        highlightTimer = window.setTimeout(() => setHighlight(null), 1_400);

        eventIndex += 1;
        scheduleUpdate();
      }, delay);
    };

    scheduleUpdate();
    return () => {
      window.clearTimeout(timer);
      window.clearTimeout(highlightTimer);
    };
  }, []);

  const rankedCreators = useMemo<RankedCreator[]>(() => {
    return creatorRangeSnapshots[range].map((snapshot, index) => {
      const creator = creatorById[snapshot.creatorId];
      const delta = adjustments[`${range}:${snapshot.creatorId}`] ?? {};
      return {
        creator,
        rank: index + 1,
        metrics: {
          ...snapshot.metrics,
          donScore: snapshot.metrics.donScore + (delta.donScore ?? 0),
          reach: snapshot.metrics.reach + (delta.reach ?? 0),
          signals: snapshot.metrics.signals + (delta.signals ?? 0),
          momentum: Math.round((snapshot.metrics.momentum + (delta.momentum ?? 0)) * 10) / 10,
        },
      };
    });
  }, [adjustments, range]);

  const sortCreators = (entries: RankedCreator[]) =>
    entries.toSorted((left, right) => {
      if (sort === "reach") return right.metrics.reach - left.metrics.reach;
      if (sort === "earned") return right.metrics.earned - left.metrics.earned;
      if (sort === "signals") return right.metrics.signals - left.metrics.signals;
      return right.metrics.donScore - left.metrics.donScore;
    });

  const topThree = rankedCreators.slice(0, 3);
  const lowerRanks = sortCreators(rankedCreators.slice(3));
  const query = search.trim().toLowerCase();
  const searchResults = query
    ? sortCreators(
        rankedCreators.filter(
          ({ creator }) =>
            creator.handle.toLowerCase().includes(query) ||
            creator.category.toLowerCase().includes(query),
        ),
      )
    : [];
  const summary = creatorNetworkSummaries[range];

  return (
    <section id="creators" aria-labelledby="creators-page-heading">
      <Container className="pb-[132px] pt-[92px]">
        <div className="grid grid-cols-12 items-end gap-8">
          <div className="col-span-8">
            <p className="type-label flex items-center gap-3 text-text-muted">
              <span className="h-px w-9 bg-lime" />
              Creator network
            </p>
            <h1 id="creators-page-heading" className="type-section-title mt-6 text-text-primary">
              Creators
            </h1>
            <p className="mt-7 text-[20px] leading-[1.38] tracking-[-0.015em] text-text-secondary">
              The people moving attention through DONS.
            </p>
          </div>

          <div className="col-span-4 flex justify-end pb-1">
            <div className="min-w-[190px] border-l border-border pl-5">
              <p className="type-label flex items-center gap-2 text-lime"><LiveDot /> Live</p>
              <p className="mt-3 text-[12px] text-text-secondary">148 creators rewarded</p>
              <p className="mt-1.5 text-[12px] text-text-secondary">24 active now</p>
              <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.1em] text-text-muted">Updated just now</p>
            </div>
          </div>
        </div>

        <div className="mt-14 grid h-[68px] grid-cols-[1fr_290px_auto] items-center gap-10 border-y border-border">
          <div className="flex h-full items-center gap-7" role="group" aria-label="Creator time range">
            {creatorRanges.map((item) => {
              const active = range === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setRange(item.id)}
                  className={`relative h-full cursor-pointer text-[10px] font-semibold uppercase tracking-[0.11em] transition-colors duration-200 ${active ? "text-text-primary after:absolute after:inset-x-0 after:bottom-[-1px] after:h-px after:bg-lime" : "text-text-muted hover:text-text-secondary"}`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <label className="flex h-9 items-center gap-3 border-b border-border-strong text-text-muted focus-within:border-lime/70 focus-within:text-text-secondary">
            <Search aria-hidden="true" className="size-3.5 shrink-0" strokeWidth={1.6} />
            <span className="sr-only">Search creators</span>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search creators"
              className="h-full min-w-0 flex-1 bg-transparent text-[13px] text-text-primary outline-none placeholder:text-text-muted"
            />
          </label>

          <div className="flex items-center justify-end gap-4" role="group" aria-label="Sort creators">
            <span className="type-label mr-1 text-text-muted">Sort</span>
            {sortOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                aria-pressed={sort === option.id}
                onClick={() => setSort(option.id)}
                className={`cursor-pointer text-[9px] font-semibold uppercase tracking-[0.1em] transition-colors duration-200 ${sort === option.id ? "text-text-primary" : "text-text-muted hover:text-text-secondary"}`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          {query ? (
            <motion.div
              key={`search-${query}-${range}-${sort}`}
              initial={reduceMotion ? false : { opacity: 0.72 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0.72 }}
              transition={{ duration: reduceMotion ? 0 : 0.24 }}
              className="mt-16"
            >
              <div className="mb-7 flex items-end justify-between">
                <div>
                  <p className="type-label text-text-muted">Search Results</p>
                  <h2 className="mt-4 text-[28px] font-semibold tracking-[-0.035em] text-text-primary">
                    {searchResults.length} {searchResults.length === 1 ? "creator" : "creators"}
                  </h2>
                </div>
                <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-text-muted">Query: {search.trim()}</p>
              </div>
              {searchResults.length ? (
                <><RankingHeader /><CreatorRows entries={searchResults} range={range} highlight={highlight} /></>
              ) : (
                <p className="border-y border-border py-16 text-center text-[14px] text-text-muted">No creators found.</p>
              )}
            </motion.div>
          ) : (
            <motion.div
              key={range}
              initial={reduceMotion ? false : { opacity: 0.72 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0.72 }}
              transition={{ duration: reduceMotion ? 0 : 0.3 }}
            >
              <div className="mt-14 grid grid-cols-[1.38fr_1fr_1fr] border-y border-border bg-bg-elevated/20">
                {topThree.map((entry) => <TopCreator key={entry.creator.id} entry={entry} range={range} highlight={highlight} />)}
              </div>

              <section className="mt-20" aria-labelledby="rising-dons-heading">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="type-label text-text-muted">Recent momentum</p>
                    <h2 id="rising-dons-heading" className="mt-4 text-[28px] font-semibold tracking-[-0.035em] text-text-primary">Rising Dons</h2>
                  </div>
                  <p className="text-[11px] text-text-muted">Movement this week</p>
                </div>
                <div className="mt-7 grid grid-cols-4 border-y border-border">
                  {risingCreators.map((item, index) => {
                    const creator = creatorById[item.creatorId];
                    return (
                      <article key={item.creatorId} className={`px-6 py-6 ${index ? "border-l border-border" : ""}`}>
                        <div className="flex items-center gap-3"><CreatorAvatar creator={creator} /><div><p className="text-[14px] font-semibold text-text-primary">{creator.handle}</p><p className="mt-1 text-[10px] text-text-muted">{creator.category}</p></div></div>
                        <div className="mt-6 flex items-end justify-between gap-3"><p className="text-[13px] font-medium text-lime">↑ {item.movement} places</p><div className="text-right text-[10px] leading-5 text-text-muted"><p>{item.detail}</p><p>{item.activity}</p></div></div>
                      </article>
                    );
                  })}
                </div>
              </section>

              <section className="mt-20" aria-labelledby="network-summary-heading">
                <div className="flex items-center justify-between"><h2 id="network-summary-heading" className="type-label text-text-secondary">Network Summary</h2><p className="font-mono text-[9px] uppercase tracking-[0.1em] text-text-muted">{creatorRanges.find((item) => item.id === range)?.label}</p></div>
                <dl className="mt-5 grid grid-cols-5 border-y border-border py-6">
                  {[
                    ["Active Creators", summary.activeCreators.toString()],
                    ["Total Signals", summary.totalSignals.toLocaleString("en-US")],
                    ["Total Reach", formatReach(summary.totalReach)],
                    ["Avg Don Score", summary.avgDonScore.toString()],
                    ["Creators Rewarded", summary.creatorsRewarded.toString()],
                  ].map(([label, value], index) => (
                    <div key={label} className={`${index ? "border-l border-border pl-7" : ""}`}><dd className="text-[30px] font-medium tracking-[-0.045em] tabular-nums text-text-primary">{value}</dd><dt className="mt-3 text-[10px] text-text-muted">{label}</dt></div>
                  ))}
                </dl>
              </section>

              <section className="mt-20" aria-labelledby="creator-ranking-heading">
                <div className="mb-7 flex items-end justify-between"><div><p className="type-label text-text-muted">Reputation layer</p><h2 id="creator-ranking-heading" className="mt-4 text-[28px] font-semibold tracking-[-0.035em] text-text-primary">Network Ranking</h2></div><p className="text-[11px] text-text-muted">Ranks #04–#15</p></div>
                <RankingHeader />
                <CreatorRows entries={lowerRanks} range={range} highlight={highlight} />
              </section>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </section>
  );
}
