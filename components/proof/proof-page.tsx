"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { LiveDot } from "@/components/ui/live-dot";
import {
  createProofSettlement,
  currentProofCut,
  cutHistory,
  infrastructureDetails,
  initialProofSettlements,
  initialProtocolActivity,
  nextCutDurationSeconds,
  proofFeeIncrements,
  proofFinanceCadenceMs,
  proofMetrics,
  proofPoolIncrements,
  proofSettlementCadenceMs,
  proofValueFlow,
  protocolPrograms,
  systemStatuses,
  type ProtocolActivity,
} from "@/data/proof";
import { solanaMainnet } from "@/lib/chains";
import { formatSol } from "@/lib/currency";

type HighlightedMetric = "fees" | "pool" | "distributed" | "creators" | null;

function formatCountdown(totalSeconds: number) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return [hours, minutes, seconds]
    .map((value) => value.toString().padStart(2, "0"))
    .join(":");
}

function formatLocalTime(date: Date) {
  return [date.getHours(), date.getMinutes(), date.getSeconds()]
    .map((value) => value.toString().padStart(2, "0"))
    .join(":");
}

function MetricValue({
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

export function ProofPage() {
  const reduceMotion = useReducedMotion();
  const [feesCaptured, setFeesCaptured] = useState(proofMetrics.feesCaptured);
  const [creatorPool, setCreatorPool] = useState(proofMetrics.creatorPool);
  const [distributed, setDistributed] = useState(proofMetrics.distributed);
  const [creatorsPaid, setCreatorsPaid] = useState(proofMetrics.creatorsPaid);
  const [secondsRemaining, setSecondsRemaining] = useState(nextCutDurationSeconds);
  const [settlements, setSettlements] = useState(initialProofSettlements);
  const [activity, setActivity] = useState<ProtocolActivity[]>(initialProtocolActivity);
  const [highlightedMetric, setHighlightedMetric] = useState<HighlightedMetric>(null);
  const seenCreators = useRef(new Set(initialProofSettlements.map(({ creator }) => creator)));
  const highlightTimer = useRef<number | undefined>(undefined);

  const highlight = useCallback((metric: Exclude<HighlightedMetric, null>) => {
    setHighlightedMetric(metric);
    if (highlightTimer.current) window.clearTimeout(highlightTimer.current);
    highlightTimer.current = window.setTimeout(() => setHighlightedMetric(null), 1_250);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSecondsRemaining((current) => current <= 0 ? nextCutDurationSeconds : current - 1);
    }, 1_000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    let eventIndex = 0;
    let timer: number;

    const scheduleMovement = () => {
      const delay = proofFinanceCadenceMs[eventIndex % proofFinanceCadenceMs.length];
      timer = window.setTimeout(() => {
        const updateFees = eventIndex % 2 === 0;
        const incrementIndex = Math.floor(eventIndex / 2);

        if (updateFees) {
          const increment = proofFeeIncrements[incrementIndex % proofFeeIncrements.length];
          setFeesCaptured((current) => Math.round((current + increment) * 10_000) / 10_000);
          highlight("fees");
        } else {
          const increment = proofPoolIncrements[incrementIndex % proofPoolIncrements.length];
          setCreatorPool((current) => Math.round((current + increment) * 10_000) / 10_000);
          highlight("pool");
          setActivity((current) => [
            {
              id: `pool_activity_${eventIndex}`,
              timestamp: formatLocalTime(new Date()),
              event: "Creator Pool",
              detail: "Fee allocation received",
              amount: `+${formatSol(increment)}`,
            },
            ...current,
          ].slice(0, 6));
        }

        eventIndex += 1;
        scheduleMovement();
      }, delay);
    };

    scheduleMovement();
    return () => window.clearTimeout(timer);
  }, [highlight]);

  useEffect(() => {
    let sequence = initialProofSettlements.length;
    let cadenceIndex = 0;
    let timer: number;

    const scheduleSettlement = () => {
      const delay = proofSettlementCadenceMs[cadenceIndex % proofSettlementCadenceMs.length];
      timer = window.setTimeout(() => {
        const timestamp = formatLocalTime(new Date());
        const settlement = createProofSettlement(sequence, timestamp);
        const isNewCreator = !seenCreators.current.has(settlement.creator);

        setSettlements((current) => [settlement, ...current].slice(0, 8));
        setDistributed((current) => Math.round((current + settlement.amount) * 10_000) / 10_000);
        highlight("distributed");
        if (isNewCreator) {
          seenCreators.current.add(settlement.creator);
          setCreatorsPaid((current) => current + 1);
        }
        setActivity((current) => [
          {
            id: `settlement_activity_${sequence}`,
            timestamp,
            event: `Settlement ${settlement.settlementId} completed`,
            detail: settlement.creator,
            amount: formatSol(settlement.amount),
          },
          ...current,
        ].slice(0, 6));

        sequence += 1;
        cadenceIndex += 1;
        scheduleSettlement();
      }, delay);
    };

    scheduleSettlement();
    return () => window.clearTimeout(timer);
  }, [highlight]);

  useEffect(
    () => () => {
      if (highlightTimer.current) window.clearTimeout(highlightTimer.current);
    },
    [],
  );

  return (
    <section id="proof-page" aria-labelledby="proof-page-heading">
      <Container className="pb-[132px] pt-[92px]">
        <div className="grid grid-cols-12 items-end gap-8">
          <div className="col-span-8">
            <p className="type-label flex items-center gap-3 text-text-muted">
              <span className="h-px w-9 bg-lime" />
              Onchain transparency
            </p>
            <h1 id="proof-page-heading" className="type-section-title mt-6 text-text-primary">
              Proof
            </h1>
            <p className="mt-7 text-[20px] leading-[1.38] tracking-[-0.015em] text-text-secondary">
              <span className="block">Every cut.</span>
              <span className="block">Every payout.</span>
              <span className="block">Visible.</span>
            </p>
          </div>
          <div className="col-span-4 flex justify-end pb-1">
            <dl className="min-w-[210px] border-l border-border pl-5">
              <div>
                <dt className="type-label text-text-muted">Solana</dt>
                <dd className="type-label mt-3 flex items-center gap-2 text-lime"><LiveDot /> Live</dd>
              </div>
              <div className="mt-5">
                <dt className="type-label text-text-muted">Network Status</dt>
                <dd className="mt-2.5 text-[12px] font-medium text-text-primary">Operational</dd>
              </div>
            </dl>
          </div>
        </div>

        <section className="mt-16 border-y border-border" aria-labelledby="protocol-snapshot-heading">
          <h2 id="protocol-snapshot-heading" className="sr-only">Protocol Snapshot</h2>
          <div className="grid grid-cols-[1.18fr_1.18fr_0.92fr] border-b border-border">
            <div className="min-h-[190px] border-r border-border px-8 py-8">
              <p className="type-label text-text-muted">Fees Captured</p>
              <data value={feesCaptured} className="mt-6 block text-[58px] font-medium leading-none tracking-[-0.055em] tabular-nums text-text-primary">
                <MetricValue active={highlightedMetric === "fees"}>{formatSol(feesCaptured)}</MetricValue>
              </data>
              <p className="mt-5 text-[10px] text-text-muted">Protocol trading activity</p>
            </div>
            <div className="min-h-[190px] border-r border-border px-8 py-8">
              <p className="type-label text-text-muted">Creator Pool</p>
              <data value={creatorPool} className="mt-6 block text-[58px] font-medium leading-none tracking-[-0.055em] tabular-nums text-lime">
                <MetricValue active={highlightedMetric === "pool"}>{formatSol(creatorPool)}</MetricValue>
              </data>
              <p className="mt-5 text-[10px] text-text-muted">22% creator allocation</p>
            </div>
            <div className="min-h-[190px] px-8 py-8">
              <p className="type-label text-text-muted">Distributed</p>
              <data value={distributed} className="mt-6 block text-[42px] font-medium leading-none tracking-[-0.05em] tabular-nums text-text-primary">
                <MetricValue active={highlightedMetric === "distributed"}>{formatSol(distributed)}</MetricValue>
              </data>
              <p className="mt-6 type-label flex items-center gap-2 text-lime"><LiveDot /> Settlements live</p>
            </div>
          </div>
          <dl className="grid grid-cols-3 py-6">
            <div className="px-8"><dt className="type-label text-text-muted">Creators Paid</dt><dd className="mt-3 text-[27px] font-medium tabular-nums text-text-primary"><MetricValue active={highlightedMetric === "creators"}>{creatorsPaid}</MetricValue></dd></div>
            <div className="border-l border-border px-8"><dt className="type-label text-text-muted">Cuts Completed</dt><dd className="mt-3 text-[27px] font-medium tabular-nums text-text-primary">{proofMetrics.cutsCompleted}</dd></div>
            <div className="border-l border-border px-8"><dt className="type-label text-text-muted">Current Cut</dt><dd className="mt-3 font-mono text-[25px] text-text-primary">{currentProofCut.id}</dd></div>
          </dl>
        </section>

        <section className="mt-24" aria-labelledby="value-flow-heading">
          <div className="grid grid-cols-12 items-end gap-8">
            <div className="col-span-7"><p className="type-label text-text-muted">Protocol economics</p><h2 id="value-flow-heading" className="mt-4 text-[32px] font-semibold tracking-[-0.04em] text-text-primary">Value Flow</h2></div>
            <p className="col-span-5 text-[12px] leading-5 text-text-secondary">A fixed share of protocol trading fees is routed into the Creator Pool and distributed through Cuts.</p>
          </div>
          <div className="mt-8 grid grid-cols-5 border-y border-border">
            {["Trading", "Protocol Fees", "Creator Pool", "Cut", "Creators"].map((stage, index) => (
              <div key={stage} className={`relative min-h-[104px] px-6 py-6 ${index ? "border-l border-border" : ""}`}><p className="font-mono text-[9px] text-text-muted">0{index + 1}</p><p className={`mt-5 text-[12px] font-semibold uppercase tracking-[0.08em] ${index >= 2 ? "text-lime" : "text-text-primary"}`}>{stage}</p>{index < 4 ? <span aria-hidden="true" className="absolute -right-2.5 top-1/2 z-10 bg-bg px-1.5 text-[12px] text-text-muted">→</span> : null}</div>
            ))}
          </div>
          <div className="mt-7 grid grid-cols-[1.3fr_0.7fr] gap-12">
            <dl className="grid grid-cols-4 border-y border-border py-6">
              {[
                ["Trade Volume", formatSol(proofValueFlow.tradeVolume)],
                ["Fees Generated", formatSol(proofValueFlow.feesGenerated)],
                ["Creator Allocation", formatSol(proofValueFlow.creatorAllocation)],
                ["Current Cut", proofValueFlow.currentCut],
              ].map(([label, value], index) => <div key={label} className={index ? "border-l border-border pl-6" : ""}><dd className={`${label === "Current Cut" ? "font-mono" : ""} text-[20px] font-medium tabular-nums text-text-primary`}>{value}</dd><dt className="mt-3 text-[9px] uppercase tracking-[0.09em] text-text-muted">{label}</dt></div>)}
            </dl>
            <div className="border-y border-border py-6"><div className="flex items-end justify-between"><div><p className="text-[25px] font-medium tabular-nums">{proofValueFlow.treasuryPercent}%</p><p className="mt-2 text-[10px] text-text-muted">Protocol / Treasury</p></div><div className="text-right"><p className="text-[25px] font-medium tabular-nums text-lime">{proofValueFlow.creatorPercent}%</p><p className="mt-2 text-[10px] text-text-muted">Creator Pool</p></div></div><div className="mt-5 flex h-1.5 overflow-hidden bg-white/[0.07]"><span className="bg-text-muted/70" style={{ width: `${proofValueFlow.treasuryPercent}%` }} /><span className="bg-lime" style={{ width: `${proofValueFlow.creatorPercent}%` }} /></div></div>
          </div>
        </section>

        <section className="mt-24 border-y border-border py-8" aria-labelledby="current-proof-cut-heading">
          <div className="flex items-center justify-between"><div><p className="type-label text-text-muted">Distribution cycle</p><h2 id="current-proof-cut-heading" className="mt-4 text-[32px] font-semibold tracking-[-0.04em]">Current Cut</h2></div><p className="type-label flex items-center gap-2 text-lime"><LiveDot /> {currentProofCut.status}</p></div>
          <dl className="mt-8 grid grid-cols-[1fr_1fr_1fr_1.15fr_1fr_0.8fr_0.8fr] divide-x divide-border border-y border-border py-6">
            {[
              ["Cut", currentProofCut.id, true],
              ["Status", currentProofCut.status],
              ["Started", currentProofCut.started, true],
              ["Next Distribution", formatCountdown(secondsRemaining), true],
              ["Creator Pool", formatSol(creatorPool)],
              ["Eligible Signals", currentProofCut.eligibleSignals.toString()],
              ["Eligible Creators", currentProofCut.eligibleCreators.toString()],
            ].map(([label, value, mono], index) => <div key={label as string} className={index ? "px-5" : "pr-5"}><dt className="type-label text-text-muted">{label}</dt><dd className={`${mono ? "font-mono" : ""} mt-3 text-[14px] font-medium tabular-nums text-text-primary`}>{value}</dd></div>)}
          </dl>
          <div className="mt-8 grid grid-cols-5">
            {currentProofCut.stages.map((stage, index) => <div key={stage} className="relative"><div className={`h-px ${index === 0 ? "bg-lime" : "bg-white/10"}`} /><span className={`mt-3 block text-[9px] font-semibold uppercase tracking-[0.1em] ${index === 0 ? "text-lime" : "text-text-muted"}`}>{stage}</span></div>)}
          </div>
        </section>

        <section className="mt-24" aria-labelledby="live-settlements-heading">
          <div className="mb-8 flex items-end justify-between"><div><p className="type-label text-text-muted">Protocol activity</p><h2 id="live-settlements-heading" className="mt-4 text-[32px] font-semibold tracking-[-0.04em]">Live Settlements</h2></div><p className="type-label flex items-center gap-2 text-lime"><LiveDot /> 8 visible</p></div>
          <div className="border border-border bg-bg-elevated/22">
            <div className="grid grid-cols-[1.35fr_0.8fr_0.7fr_0.9fr_1.2fr_0.85fr_0.8fr] gap-5 border-b border-border px-6 py-4 text-[9px] font-semibold uppercase tracking-[0.11em] text-text-muted"><span>Creator</span><span>Amount</span><span>Cut</span><span>Settlement ID</span><span>Mock Hash</span><span>Time</span><span>Status</span></div>
            <ol aria-live="polite">
              {settlements.map((settlement) => (
                <motion.li key={settlement.id} initial={reduceMotion ? false : { opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }} className="grid min-h-[66px] grid-cols-[1.35fr_0.8fr_0.7fr_0.9fr_1.2fr_0.85fr_0.8fr] items-center gap-5 border-b border-border px-6 last:border-b-0"><span className="text-[13px] font-semibold text-text-primary">{settlement.creator}</span><span className="text-[14px] font-medium tabular-nums text-lime">{formatSol(settlement.amount)}</span><span className="font-mono text-[10px] text-text-muted">{settlement.cut}</span><span className="font-mono text-[10px] text-text-primary">{settlement.settlementId}</span><span title="Mock transaction signature · local record" className="font-mono text-[9px] text-text-muted">{settlement.mockHash}</span><time className="font-mono text-[9px] text-text-muted">{settlement.timestamp}</time><span className="text-[9px] font-semibold uppercase tracking-[0.1em] text-lime">{settlement.status}</span></motion.li>
              ))}
            </ol>
          </div>
          <p className="mt-4 font-mono text-[8px] uppercase tracking-[0.1em] text-text-muted">Mock settlements and hashes · not onchain records</p>
        </section>

        <section className="mt-24" aria-labelledby="cut-history-heading">
          <div className="mb-8 flex items-end justify-between"><div><p className="type-label text-text-muted">Completed distributions</p><h2 id="cut-history-heading" className="mt-4 text-[32px] font-semibold tracking-[-0.04em]">Cut History</h2></div><p className="font-mono text-[9px] uppercase tracking-[0.1em] text-text-muted">8 previous Cuts</p></div>
          <div className="grid grid-cols-[0.8fr_1fr_1fr_1fr_0.8fr_0.8fr_0.8fr] border-y border-border px-4 py-4 text-[9px] font-semibold uppercase tracking-[0.11em] text-text-muted"><span>Cut</span><span>Date</span><span>Pool</span><span>Distributed</span><span>Creators</span><span>Signals</span><span>Status</span></div>
          <ol>{cutHistory.map((cut) => <li key={cut.id} className="grid min-h-[68px] grid-cols-[0.8fr_1fr_1fr_1fr_0.8fr_0.8fr_0.8fr] items-center border-b border-border px-4 transition-colors duration-200 hover:bg-white/[0.018]"><span className="font-mono text-[11px] text-text-primary">{cut.id}</span><span className="text-[12px] text-text-secondary">{cut.date}</span><span className="text-[13px] font-medium tabular-nums">{formatSol(cut.pool)}</span><span className="text-[13px] font-medium tabular-nums">{formatSol(cut.distributed)}</span><span className="text-[12px] tabular-nums text-text-secondary">{cut.creators}</span><span className="text-[12px] tabular-nums text-text-secondary">{cut.signals}</span><span className="text-[9px] font-semibold uppercase tracking-[0.1em] text-lime">{cut.status}</span></li>)}</ol>
        </section>

        <section className="mt-24" aria-labelledby="infrastructure-heading">
          <div className="grid grid-cols-12 gap-14">
            <div className="col-span-7"><p className="type-label text-text-muted">Protocol layer</p><h2 id="infrastructure-heading" className="mt-4 text-[32px] font-semibold tracking-[-0.04em]">Network & Infrastructure</h2><dl className="mt-8 grid grid-cols-2 border-y border-border">{infrastructureDetails.map((item, index) => <div key={item.label} className={`min-h-[90px] px-6 py-5 ${index % 2 ? "border-l border-border" : ""} ${index < 4 ? "border-b border-border" : ""}`}><dt className="type-label text-text-muted">{item.label}</dt><dd className={`${item.label === "Cluster" ? "font-mono" : ""} mt-3 text-[14px] font-medium text-text-primary`}>{item.value}{!item.real ? <span className="ml-2 text-[8px] uppercase tracking-[0.09em] text-text-muted">Mock status</span> : null}</dd></div>)}</dl><a href={solanaMainnet.explorerUrl} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 text-[12px] font-medium text-text-secondary transition-colors duration-200 hover:text-lime">Open Solana Explorer <ArrowUpRight aria-hidden="true" className="size-3.5" /></a></div>
            <div className="col-span-5"><p className="type-label text-text-muted">Deployment state</p><h2 className="mt-4 text-[32px] font-semibold tracking-[-0.04em]">Protocol Programs</h2><dl className="mt-8 border-y border-border">{protocolPrograms.map((program) => <div key={program.label} className="flex min-h-[90px] items-center justify-between border-b border-border px-5 last:border-b-0"><div><dt className="text-[13px] font-semibold text-text-primary">{program.label}</dt><dd className="mt-1.5 text-[10px] text-text-muted">{program.stage}</dd></div><span className="font-mono text-[9px] uppercase tracking-[0.1em] text-text-secondary">{program.deployment}</span></div>)}</dl><p className="mt-5 text-[10px] leading-4 text-text-muted">Protocol financial activity on this page is a deterministic prototype scenario.</p></div>
          </div>
        </section>

        <div className="mt-24 grid grid-cols-[0.82fr_1.18fr] gap-16">
          <section aria-labelledby="system-status-heading"><p className="type-label text-text-muted">Runtime overview</p><h2 id="system-status-heading" className="mt-4 text-[30px] font-semibold tracking-[-0.04em]">System Status</h2><dl className="mt-7 border-y border-border">{systemStatuses.map((system) => <div key={system.label} className="flex min-h-[58px] items-center justify-between border-b border-border px-3 last:border-b-0"><dt className="text-[12px] text-text-secondary">{system.label}</dt><dd className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.1em] text-lime"><span className="size-1 rounded-full bg-lime" />{system.status}{system.mocked ? <span className="text-text-muted">· Mock</span> : null}</dd></div>)}</dl></section>
          <section aria-labelledby="protocol-activity-heading"><div className="flex items-end justify-between"><div><p className="type-label text-text-muted">Recent events</p><h2 id="protocol-activity-heading" className="mt-4 text-[30px] font-semibold tracking-[-0.04em]">Protocol Activity</h2></div><LiveDot /></div><ol className="mt-7 border-y border-border" aria-live="polite">{activity.map((item) => <li key={item.id} className="grid min-h-[58px] grid-cols-[90px_1fr_1fr_auto] items-center gap-5 border-b border-border px-3 last:border-b-0"><time className="font-mono text-[9px] text-text-muted">{item.timestamp}</time><span className="text-[12px] font-medium text-text-primary">{item.event}</span><span className="text-[10px] text-text-muted">{item.detail}</span><span className="text-[11px] font-medium tabular-nums text-lime">{item.amount}</span></li>)}</ol></section>
        </div>
      </Container>
    </section>
  );
}
