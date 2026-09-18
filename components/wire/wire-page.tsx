"use client";

import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Container } from "@/components/layout/container";
import { LiveDot } from "@/components/ui/live-dot";
import { SignalFeedItem } from "@/components/wire/signal-feed-item";
import { WireSidebar } from "@/components/wire/wire-sidebar";
import type { DemoSignalStatus } from "@/data/demo-scenario";
import {
  liveSignalTemplates,
  wireCreators,
  wireLiveCadenceMs,
  wireSignals,
  type WireSignal,
} from "@/data/wire";

type WireFilter = "all" | "live" | "tracking" | "scored" | "paid";
type WireSort = "latest" | "impact" | "reach" | "reward";

const filters: { label: string; value: WireFilter }[] = [
  { label: "All", value: "all" },
  { label: "Active", value: "live" },
  { label: "Tracking", value: "tracking" },
  { label: "Measured", value: "scored" },
  { label: "Distributed", value: "paid" },
];

const sorts: { label: string; value: WireSort }[] = [
  { label: "Latest", value: "latest" },
  { label: "Contribution", value: "impact" },
  { label: "Reach", value: "reach" },
  { label: "Allocation", value: "reward" },
];

const liveStatuses: DemoSignalStatus[] = ["detected", "verified", "tracking"];

function formatLocalTime(date: Date) {
  return [date.getHours(), date.getMinutes(), date.getSeconds()]
    .map((value) => value.toString().padStart(2, "0"))
    .join(":");
}

export function WirePage() {
  const [signals, setSignals] = useState(wireSignals);
  const [activeFilter, setActiveFilter] = useState<WireFilter>("all");
  const [activeSort, setActiveSort] = useState<WireSort>("latest");
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(9);

  const creators = useMemo(
    () => new Map(wireCreators.map((creator) => [creator.id, creator])),
    [],
  );

  useEffect(() => {
    let eventIndex = 0;
    let liveIndex = 0;
    let timer: number;

    const scheduleUpdate = () => {
      const delay = wireLiveCadenceMs[eventIndex % wireLiveCadenceMs.length];
      timer = window.setTimeout(() => {
        const action = eventIndex % 4;
        const incoming =
          action === 0
            ? (() => {
                const template =
                  liveSignalTemplates[liveIndex % liveSignalTemplates.length];
                const sequence = 5000 + liveIndex;
                liveIndex += 1;

                return {
                  ...template,
                  id: `live-${sequence}`,
                  sequence,
                  timestamp: formatLocalTime(new Date()),
                  relativeTime: "just now",
                } satisfies WireSignal;
              })()
            : null;

        setSignals((current) => {
          if (incoming) {
            return [incoming, ...current].slice(0, 18);
          }

          if (action === 1) {
            const target = current.find((signal) => signal.status === "tracking");
            if (!target) return current;
            return current.map((signal) =>
              signal.id === target.id
                ? {
                    ...signal,
                    impact: signal.impact + 7,
                    impressions: signal.impressions + 380,
                    engagements: signal.engagements + 17,
                    estimatedCut: Math.round((signal.estimatedCut + 0.0008) * 10_000) / 10_000,
                  }
                : signal,
            );
          }

          if (action === 2) {
            const target = current.find((signal) => signal.status === "verified");
            if (!target) return current;
            return current.map((signal) =>
              signal.id === target.id ? { ...signal, status: "tracking" } : signal,
            );
          }

          const target = current.find((signal) => signal.status === "tracking" && !signal.hot);
          if (!target) return current;
          return current.map((signal) =>
            signal.id === target.id
              ? {
                  ...signal,
                  status: "scored",
                  impact: signal.impact + 4,
                  estimatedCut: Math.round((signal.estimatedCut + 0.0005) * 10_000) / 10_000,
                }
              : signal,
          );
        });

        eventIndex += 1;
        scheduleUpdate();
      }, delay);
    };

    scheduleUpdate();
    return () => window.clearTimeout(timer);
  }, []);

  const filteredSignals = useMemo(() => {
    const query = search.trim().toLowerCase();
    const result = signals.filter((signal) => {
      const creator = creators.get(signal.creatorId);
      const matchesSearch = !query || creator?.handle.toLowerCase().includes(query);
      const matchesFilter =
        activeFilter === "all" ||
        (activeFilter === "live" && liveStatuses.includes(signal.status)) ||
        signal.status === activeFilter;
      return Boolean(matchesSearch && matchesFilter);
    });

    return result.toSorted((left, right) => {
      if (activeSort === "impact") return right.impact - left.impact;
      if (activeSort === "reach") return right.impressions - left.impressions;
      if (activeSort === "reward") return right.estimatedCut - left.estimatedCut;
      return right.sequence - left.sequence;
    });
  }, [activeFilter, activeSort, creators, search, signals]);

  const visibleSignals = filteredSignals.slice(0, visibleCount);

  return (
    <section id="wire" aria-labelledby="wire-page-heading">
      <Container className="pb-[132px] pt-[92px]">
        <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="type-label flex items-center gap-3 text-text-muted">
              <span className="h-px w-9 bg-lime" />
              Activity monitor / Demo
            </p>
            <h1 id="wire-page-heading" className="type-section-title mt-6 text-text-primary">
              Activity
            </h1>
            <p className="mt-7 text-[20px] leading-[1.38] tracking-[-0.015em] text-text-secondary">
              Inspect attributed events as they move through detection, measurement, and distribution.
            </p>
          </div>

          <div className="flex justify-start pb-1 lg:col-span-4 lg:justify-end">
            <div className="min-w-[190px] border-l border-border pl-5">
              <p className="type-label flex items-center gap-2 text-lime">
                <LiveDot /> Simulated feed
              </p>
              <p className="mt-3 text-[12px] text-text-secondary">1,284 events in this scenario</p>
              <p className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.1em] text-text-muted">
                Prototype data
              </p>
            </div>
          </div>
        </div>

        <div className="wire-controls mt-14 border-y border-border">
          <div className="grid h-[68px] grid-cols-[1fr_300px] items-center gap-10">
            <div className="wire-filters flex h-full items-center gap-7" role="group" aria-label="Event status filter">
              {filters.map((filter) => {
                const active = activeFilter === filter.value;
                return (
                  <button
                    key={filter.value}
                    type="button"
                    aria-pressed={active}
                    onClick={() => {
                      setActiveFilter(filter.value);
                      setVisibleCount(9);
                    }}
                    className={`relative h-full cursor-pointer text-[11px] font-semibold uppercase tracking-[0.11em] transition-colors duration-200 ${
                      active
                        ? "text-text-primary after:absolute after:inset-x-0 after:bottom-[-1px] after:h-px after:bg-lime"
                        : "text-text-muted hover:text-text-secondary"
                    }`}
                  >
                    {filter.label}
                  </button>
                );
              })}
            </div>

            <label className="flex h-9 items-center gap-3 border-b border-border-strong text-text-muted focus-within:border-lime/70 focus-within:text-text-secondary">
              <Search aria-hidden="true" className="size-3.5 shrink-0" strokeWidth={1.6} />
              <span className="sr-only">Search contributors</span>
              <input
                type="search"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setVisibleCount(9);
                }}
                placeholder="Search contributors"
                className="h-full min-w-0 flex-1 bg-transparent text-[13px] text-text-primary outline-none placeholder:text-text-muted"
              />
            </label>
          </div>

          <div className="wire-sorts flex h-[46px] items-center justify-end gap-5 border-t border-border">
            <span className="type-label mr-2 text-text-muted">Sort</span>
            {sorts.map((sort) => (
              <button
                key={sort.value}
                type="button"
                aria-pressed={activeSort === sort.value}
                onClick={() => setActiveSort(sort.value)}
                className={`cursor-pointer text-[9px] font-semibold uppercase tracking-[0.11em] transition-colors duration-200 ${
                  activeSort === sort.value
                    ? "text-text-primary"
                    : "text-text-muted hover:text-text-secondary"
                }`}
              >
                {sort.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid grid-cols-[minmax(0,2.62fr)_minmax(310px,1fr)] items-start gap-12">
          <div>
            <div aria-live="polite" className="space-y-5">
              {visibleSignals.map((signal) => {
                const creator = creators.get(signal.creatorId);
                return creator ? (
                  <SignalFeedItem key={signal.id} creator={creator} signal={signal} />
                ) : null;
              })}
            </div>

            {visibleSignals.length === 0 ? (
              <p className="border-y border-border py-16 text-center text-[14px] text-text-muted">
                No events match these filters.
              </p>
            ) : null}

            <div className="mt-8 flex justify-center border-t border-border pt-7">
              <button
                type="button"
                disabled={visibleCount >= filteredSignals.length}
                onClick={() => setVisibleCount((current) => current + 3)}
                className="cursor-pointer text-[12px] font-medium text-text-secondary transition-colors duration-200 hover:text-text-primary disabled:cursor-default disabled:text-text-muted/45"
              >
                Load more events <span aria-hidden="true">↓</span>
              </button>
            </div>
          </div>

          <WireSidebar />
        </div>
      </Container>
    </section>
  );
}
