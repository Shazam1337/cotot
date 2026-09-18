"use client";

import { useEffect, useState } from "react";
import { LiveDot } from "@/components/ui/live-dot";
import { nextCutDurationSeconds } from "@/data/proof";

const networkPulse = [
  { label: "Events / hour", value: "42" },
  { label: "Active contributors", value: "18" },
  { label: "Reach / hour", value: "184K" },
  { label: "Avg. contribution", value: "684" },
];

const trendingCreators = [
  { handle: "@mira_eth", detail: "Contribution +18%" },
  { handle: "@julian0x", detail: "Reach +14%" },
  { handle: "@noraonchain", detail: "6 tracked events" },
  { handle: "@0xharvey", detail: "0.0821 SOL estimated" },
];

function formatCountdown(totalSeconds: number) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return [hours, minutes, seconds]
    .map((value) => value.toString().padStart(2, "0"))
    .join(":");
}

export function WireSidebar() {
  const [secondsRemaining, setSecondsRemaining] = useState(nextCutDurationSeconds);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSecondsRemaining((current) =>
        current <= 0 ? nextCutDurationSeconds : current - 1,
      );
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <aside className="sticky top-6 space-y-4" aria-label="Activity context">
      <section className="border-y border-border py-6" aria-labelledby="network-pulse-heading">
        <div className="flex items-center justify-between">
          <h2 id="network-pulse-heading" className="type-label text-text-secondary">
            Scenario metrics
          </h2>
          <LiveDot />
        </div>
        <dl className="mt-5">
          {networkPulse.map((metric) => (
            <div
              key={metric.label}
              className="flex items-end justify-between border-b border-border py-4 last:border-b-0"
            >
              <dt className="text-[12px] text-text-muted">{metric.label}</dt>
              <dd className="text-[23px] font-medium tracking-[-0.035em] tabular-nums text-text-primary">
                {metric.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="border-b border-border pb-6" aria-labelledby="trending-heading">
        <h2 id="trending-heading" className="type-label text-text-secondary">
          Contributor movement
        </h2>
        <ol className="mt-5">
          {trendingCreators.map((creator, index) => (
            <li
              key={creator.handle}
              className="grid grid-cols-[28px_1fr_auto] items-center border-b border-border py-4 last:border-b-0"
            >
              <span className="font-mono text-[9px] text-text-muted">
                {(index + 1).toString().padStart(2, "0")}
              </span>
              <span className="text-[13px] font-semibold text-text-primary">
                {creator.handle}
              </span>
              <span className="text-[10px] text-text-muted">{creator.detail}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-b border-border pb-7" aria-labelledby="current-cut-heading">
        <div className="flex items-center justify-between">
          <h2 id="current-cut-heading" className="type-label text-text-secondary">
            Current cycle
          </h2>
          <p className="type-label flex items-center gap-2 text-lime">
            <LiveDot /> Accumulating
          </p>
        </div>
        <p className="mt-6 font-mono text-[27px] text-text-primary">#0043</p>
        <dl className="mt-6 grid grid-cols-2 border-t border-border pt-5">
          <div className="border-r border-border pr-5">
            <dt className="type-label text-text-muted">Next cycle</dt>
            <dd className="mt-3 font-mono text-[17px] tracking-[-0.03em] tabular-nums text-text-primary">
              {formatCountdown(secondsRemaining)}
            </dd>
          </div>
          <div className="pl-5">
            <dt className="type-label text-text-muted">Allocation pool</dt>
            <dd className="mt-3 text-[20px] font-medium tabular-nums text-lime">18.63 SOL</dd>
          </div>
        </dl>
      </section>
    </aside>
  );
}
