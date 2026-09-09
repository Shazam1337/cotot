"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { LiveDot } from "@/components/ui/live-dot";
import {
  createLiveSettlement,
  initialSettlements,
  mockContract,
  nextCutDurationSeconds,
  proofMetrics,
  settlementCadenceMs,
} from "@/data/proof";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const feeIncrements = [0.31, 0.36, 0.24, 0.42];
const poolIncrements = [0.07, 0.04, 0.09, 0.06];

function formatCountdown(totalSeconds: number) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return [hours, minutes, seconds].map((value) => value.toString().padStart(2, "0")).join(":");
}

function formatLocalTime(date: Date) {
  return [date.getHours(), date.getMinutes(), date.getSeconds()]
    .map((value) => value.toString().padStart(2, "0"))
    .join(":");
}

export function Proof() {
  const reduceMotion = useReducedMotion();
  const [secondsRemaining, setSecondsRemaining] = useState(nextCutDurationSeconds);
  const [feesCaptured, setFeesCaptured] = useState(proofMetrics.feesCaptured);
  const [creatorPool, setCreatorPool] = useState(proofMetrics.creatorPool);
  const [distributed, setDistributed] = useState(proofMetrics.distributed);
  const [creatorsPaid, setCreatorsPaid] = useState(proofMetrics.creatorsPaid);
  const [settlements, setSettlements] = useState(initialSettlements);
  const seenCreators = useRef(new Set(initialSettlements.map(({ creator }) => creator)));

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSecondsRemaining((current) => (current <= 0 ? nextCutDurationSeconds : current - 1));
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    let feeIndex = 0;
    let poolIndex = 0;

    const financeTimer = window.setInterval(() => {
      const increment = feeIncrements[feeIndex % feeIncrements.length];
      setFeesCaptured((current) => Math.round((current + increment) * 100) / 100);
      feeIndex += 1;
    }, 8200);
    const poolTimer = window.setInterval(() => {
      const increment = poolIncrements[poolIndex % poolIncrements.length];
      setCreatorPool((current) => Math.round((current + increment) * 100) / 100);
      poolIndex += 1;
    }, 11300);

    return () => {
      window.clearInterval(financeTimer);
      window.clearInterval(poolTimer);
    };
  }, []);

  useEffect(() => {
    let sequence = initialSettlements.length;
    let cadenceIndex = 0;
    let settlementTimer: number;

    const scheduleSettlement = () => {
      const delay = settlementCadenceMs[cadenceIndex % settlementCadenceMs.length];
      settlementTimer = window.setTimeout(() => {
        const settlement = createLiveSettlement(sequence, formatLocalTime(new Date()));

        setSettlements((current) => [settlement, ...current].slice(0, 6));
        setDistributed((current) => Math.round((current + settlement.amount) * 100) / 100);

        if (!seenCreators.current.has(settlement.creator)) {
          seenCreators.current.add(settlement.creator);
          setCreatorsPaid((current) => current + 1);
        }

        sequence += 1;
        cadenceIndex += 1;
        scheduleSettlement();
      }, delay);
    };

    scheduleSettlement();
    return () => window.clearTimeout(settlementTimer);
  }, []);

  return (
    <section id="proof" aria-labelledby="proof-heading" className="border-b border-border">
      <Container className="pb-32 pt-[140px]">
        <div className="grid grid-cols-12 items-end gap-8">
          <div className="col-span-8">
            <p className="type-label flex items-center gap-3 text-text-muted">
              <span className="h-px w-9 bg-lime" />
              Onchain transparency
            </p>
            <h2 id="proof-heading" className="type-section-title mt-6 text-text-primary">
              Proof
            </h2>
            <p className="mt-7 text-[20px] leading-[1.38] tracking-[-0.015em] text-text-secondary">
              <span className="block">Every cut.</span>
              <span className="block">Every payout.</span>
              <span className="block">Visible.</span>
            </p>
          </div>

          <div className="col-span-4 flex justify-end pb-1">
            <div className="border-l border-border pl-5">
              <p className="text-[13px] font-medium text-text-secondary">Robinhood Chain</p>
              <p className="type-label mt-3 flex items-center gap-2 text-lime">
                <LiveDot />
                Live
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] items-start gap-8">
          <div>
            <div className="grid grid-cols-2 border-y border-border">
              <div className="border-b border-r border-border py-8 pr-7">
                <p className="type-label text-text-muted">Fees Captured</p>
                <motion.data
                  key={feesCaptured.toFixed(2)}
                  value={feesCaptured}
                  initial={reduceMotion ? false : { color: "#b7ff3c" }}
                  animate={{ color: "#f1f2ea" }}
                  transition={{ duration: 0.8 }}
                  className="mt-5 block text-[45px] font-medium leading-none tracking-[-0.05em] tabular-nums"
                >
                  {currency.format(feesCaptured)}
                </motion.data>
              </div>
              <div className="border-b border-border py-8 pl-7">
                <p className="type-label text-text-muted">Creator Pool</p>
                <motion.data
                  key={creatorPool.toFixed(2)}
                  value={creatorPool}
                  initial={reduceMotion ? false : { opacity: 0.72 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.7 }}
                  className="mt-5 block text-[45px] font-medium leading-none tracking-[-0.05em] tabular-nums text-lime"
                >
                  {currency.format(creatorPool)}
                </motion.data>
              </div>
              <div className="border-r border-border py-7 pr-7">
                <p className="type-label text-text-muted">Distributed</p>
                <motion.data
                  key={distributed.toFixed(2)}
                  value={distributed}
                  initial={reduceMotion ? false : { color: "#b7ff3c" }}
                  animate={{ color: "#f1f2ea" }}
                  transition={{ duration: 0.65 }}
                  className="mt-4 block text-[29px] font-medium tracking-[-0.04em] tabular-nums text-text-primary"
                >
                  {currency.format(distributed)}
                </motion.data>
              </div>
              <div className="grid grid-cols-2 gap-4 py-7 pl-7">
                <div>
                  <p className="type-label text-text-muted">Creators Paid</p>
                  <data
                    value={creatorsPaid}
                    className="mt-4 block text-[29px] font-medium tabular-nums text-text-primary"
                  >
                    {creatorsPaid}
                  </data>
                </div>
                <div>
                  <p className="type-label text-text-muted">Cuts</p>
                  <data className="mt-4 block text-[29px] font-medium tabular-nums text-text-primary">
                    {proofMetrics.cutsCompleted}
                  </data>
                </div>
              </div>
            </div>

            <div className="py-9">
              <div className="flex items-center justify-between text-[9px] font-semibold uppercase tracking-[0.1em] text-text-muted">
                <span>Fees captured</span>
                <span>Creator pool</span>
                <span>Distributed</span>
              </div>
              <div className="mt-4 flex items-center">
                <span className="size-1.5 rounded-full bg-text-muted" />
                <span className="h-px flex-1 bg-white/10" />
                <span className="size-1.5 rounded-full bg-lime" />
                <span className="h-px flex-1 bg-lime/35" />
                <span className="size-1.5 rounded-full bg-[#6f914d]" />
              </div>
              <div className="mt-4 grid grid-cols-2 text-[10px] text-text-muted">
                <span>22.1% allocated</span>
                <span className="text-right">66.8% distributed</span>
              </div>
            </div>

            <div className="grid grid-cols-2 border-y border-border py-7">
              <div className="border-r border-border pr-7">
                <p className="type-label text-text-muted">Next Cut</p>
                <time className="mt-4 block font-mono text-[31px] tracking-[-0.04em] tabular-nums text-text-primary">
                  {formatCountdown(secondsRemaining)}
                </time>
              </div>
              <div className="pl-7">
                <p className="type-label text-text-muted">Current Cut</p>
                <p className="mt-4 font-mono text-[17px] text-text-primary">#0043</p>
                <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.1em] text-lime">
                  Accumulating
                </p>
              </div>
            </div>

            <dl className="grid grid-cols-2 gap-x-8 gap-y-7 py-9">
              <div>
                <dt className="type-label text-text-muted">Network</dt>
                <dd className="mt-3 text-[13px] text-text-secondary">Robinhood Chain</dd>
              </div>
              <div>
                <dt className="type-label text-text-muted">Pool Status</dt>
                <dd className="mt-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-lime">
                  <LiveDot /> Live
                </dd>
              </div>
              <div>
                <dt className="type-label text-text-muted">Settlement Mode</dt>
                <dd className="mt-3 text-[13px] text-text-secondary">Daily cuts</dd>
              </div>
              <div>
                <dt className="type-label text-text-muted">Current Cut</dt>
                <dd className="mt-3 font-mono text-[12px] text-text-secondary">#0043</dd>
              </div>
            </dl>

            <div className="flex items-center justify-between border-t border-border pt-6">
              <div>
                <p className="type-label text-text-muted">Creator Pool Contract</p>
                <p className="mt-3 font-mono text-[10px] text-text-secondary">
                  {mockContract} <span className="text-text-muted">· prototype address</span>
                </p>
              </div>
              <a
                href="#proof"
                title="Prototype contract link"
                className="text-[11px] font-medium text-text-secondary transition-colors hover:text-text-primary focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-lime"
              >
                View contract <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

          <aside className="border border-border-strong bg-bg-elevated/48">
            <div className="flex items-center justify-between border-b border-border px-6 py-6">
              <div>
                <p className="type-label text-text-secondary">Live Settlements</p>
                <p className="mt-2 text-[11px] text-text-muted">Cut #0042 · Robinhood Chain</p>
              </div>
              <p className="type-label flex items-center gap-2 text-lime">
                <LiveDot /> Settling live
              </p>
            </div>

            <div className="grid grid-cols-[1.25fr_0.72fr_0.72fr_1.12fr_0.78fr] gap-5 border-b border-border px-6 py-4 text-[8px] font-semibold uppercase tracking-[0.1em] text-text-muted">
              <span>Creator</span>
              <span>Amount</span>
              <span>Cut</span>
              <span>Transaction</span>
              <span className="text-right">Status</span>
            </div>

            <ol aria-live="polite" className="relative h-[528px] overflow-hidden">
              <AnimatePresence initial={false}>
                {settlements.map((settlement, index) => (
                  <motion.li
                    key={settlement.id}
                    initial={reduceMotion ? false : { opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: index * 88 }}
                    exit={{ opacity: 0, y: 528 }}
                    transition={
                      reduceMotion
                        ? { duration: 0 }
                        : { duration: 0.42, ease: [0.22, 1, 0.36, 1] }
                    }
                    className="absolute inset-x-0 top-0 grid h-[88px] grid-cols-[1.25fr_0.72fr_0.72fr_1.12fr_0.78fr] items-center gap-5 border-b border-border px-6"
                  >
                    <span className="text-[14px] font-semibold text-text-primary">
                      {settlement.creator}
                    </span>
                    <span className="text-[19px] font-medium tracking-[-0.03em] tabular-nums text-text-primary">
                      {currency.format(settlement.amount)}
                    </span>
                    <span className="font-mono text-[9px] text-text-muted">
                      CUT {settlement.cut}
                    </span>
                    <a
                      href="#proof"
                      title="Prototype transaction link"
                      className="font-mono text-[9px] text-text-secondary transition-colors hover:text-text-primary focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-lime"
                    >
                      {settlement.transaction} <span aria-hidden="true">↗</span>
                    </a>
                    <div className="text-right">
                      <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-lime">
                        Settled
                      </p>
                      <time className="mt-1.5 block font-mono text-[8px] text-text-muted">
                        {settlement.timestamp}
                      </time>
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ol>

            <div className="flex items-center justify-between px-6 py-5">
              <p className="font-mono text-[8px] uppercase tracking-[0.1em] text-text-muted">
                6 latest settlements
              </p>
              <button
                type="button"
                className="cursor-pointer text-[12px] font-medium text-text-secondary transition-colors hover:text-text-primary focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-lime"
              >
                View all activity <span aria-hidden="true">→</span>
              </button>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}
