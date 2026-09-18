"use client";

import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, Wallet, X } from "lucide-react";
import { Container } from "@/components/layout/container";
import { LiveDot } from "@/components/ui/live-dot";
import { useWallet, useWalletModal } from "@/components/wallet/wallet-provider";
import { creatorById } from "@/data/creators";
import { nextCutDurationSeconds } from "@/data/proof";
import {
  currentRewardCut,
  initialRewardActivity,
  initialRewardSignals,
  initialRewardSummary,
  mockRewardCreatorId,
  personalPerformance,
  rewardBreakdown,
  rewardLiveCadenceMs,
  rewardPayouts,
  type RewardActivity,
  type RewardSignal,
  type RewardSummary,
} from "@/data/rewards";
import { formatSol } from "@/lib/currency";
import { shortenAddress } from "@/lib/wallet";

type ClaimFlow = "closed" | "confirm" | "processing" | "success";
type LiveRewardMetric = "pending" | "estimated-cut" | "signal-reach" | "signal-impact";

const liveEvents: { metric: LiveRewardMetric; amount: number }[] = [
  { metric: "pending", amount: 0.0008 },
  { metric: "estimated-cut", amount: 0.0007 },
  { metric: "signal-reach", amount: 200 },
  { metric: "signal-impact", amount: 3 },
];

function formatReach(value: number) {
  return value >= 1_000_000
    ? `${(value / 1_000_000).toFixed(1)}M`
    : `${(value / 1000).toFixed(value < 100_000 ? 1 : 0)}K`;
}

function formatCountdown(totalSeconds: number) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return [hours, minutes, seconds]
    .map((value) => value.toString().padStart(2, "0"))
    .join(":");
}

function HighlightValue({
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

function PageIntro({ address }: { address: string }) {
  return (
    <div className="grid grid-cols-12 items-end gap-8">
      <div className="col-span-8">
        <p className="type-label flex items-center gap-3 text-text-muted">
          <span className="h-px w-9 bg-lime" />
          Wallet workspace / Prototype
        </p>
        <h1 id="rewards-page-heading" className="type-section-title mt-6 text-text-primary">
          Earnings
        </h1>
        <p className="mt-7 text-[20px] leading-[1.38] tracking-[-0.015em] text-text-secondary">
          Inspect attributed allocations, payout history, and cycle activity.
        </p>
      </div>

      <div className="col-span-4 flex justify-end pb-1">
        <dl className="min-w-[226px] border-l border-border pl-5">
          <div>
            <dt className="type-label text-text-muted">Connected Wallet</dt>
            <dd className="mt-2.5 font-mono text-[12px] text-text-primary">
              {shortenAddress(address)}
            </dd>
          </div>
          <div className="mt-5">
            <dt className="type-label text-text-muted">Wallet type</dt>
            <dd className="mt-2.5 flex items-center gap-2 text-[12px] font-medium text-lime">
              <LiveDot />
              Solana compatible
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

function DisconnectedRewards() {
  const { openWalletModal } = useWalletModal();

  return (
    <section aria-labelledby="rewards-page-heading">
      <Container className="py-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_.95fr]">
          <div>
            <p className="type-label flex items-center gap-3 text-lime">Wallet workspace / Prototype</p>
            <h1 id="rewards-page-heading" className="type-section-title mt-6 text-text-primary">Earnings</h1>
            <p className="mt-8 max-w-[600px] text-[20px] leading-[1.45] text-text-secondary">See how measured contribution becomes an allocation, then a distribution record.</p>
            <p className="mt-4 max-w-[540px] text-[13px] leading-6 text-text-muted">Connect a Solana wallet to open the interactive earnings scenario. Figures and payout requests in this prototype are simulated.</p>
            <button type="button" onClick={openWalletModal} className="onik-button mt-8"><Wallet aria-hidden="true" className="size-4" /> Connect Wallet</button>
          </div>
          <div className="onik-panel">
            <div className="onik-panel-head"><span>Wallet earnings preview</span><span className="onik-status">Demo data</span></div>
            <div className="grid grid-cols-2 gap-px bg-border"><div className="bg-bg-elevated p-6"><p className="onik-metric-label">Available</p><p className="mt-3 text-[clamp(24px,3vw,39px)] font-semibold tracking-[-.055em] text-lime">{formatSol(initialRewardSummary.claimable)}</p><p className="mt-2 text-[11px] text-text-muted">Scenario balance</p></div><div className="bg-bg-elevated p-6"><p className="onik-metric-label">Pending</p><p className="mt-3 text-[clamp(24px,3vw,39px)] font-semibold tracking-[-.055em]">{formatSol(initialRewardSummary.pending)}</p><p className="mt-2 text-[11px] text-text-muted">Estimated allocation</p></div></div>
            <div className="p-6"><p className="onik-metric-label">Recent distributions</p>{rewardPayouts.slice(0,3).map(payout=><div key={payout.settlement} className="grid grid-cols-[1fr_auto_auto] items-center gap-5 border-b border-border py-4 text-[12px] last:border-b-0"><span className="font-mono text-text-muted">Cycle {payout.cut}</span><span className="text-text-primary">{formatSol(payout.amount)}</span><span className="text-lime">Complete</span></div>)}</div>
          </div>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {[["01 / Attribute","Events are linked to a contributor and measured by observed response."],["02 / Allocate","The current cycle models a share based on the contribution record."],["03 / Review","Completed distributions appear in a searchable history for the connected wallet."]].map(([title,description])=><div key={title} className="onik-panel p-6"><p className="font-mono text-[10px] uppercase tracking-wider text-lime">{title}</p><p className="mt-3 text-[13px] leading-6 text-text-secondary">{description}</p></div>)}
        </div>
      </Container>
    </section>
  );
}

function ClaimModal({
  flow,
  amount,
  address,
  processingStep,
  onCancel,
  onConfirm,
  onDone,
}: {
  flow: Exclude<ClaimFlow, "closed">;
  amount: number;
  address: string;
  processingStep: number;
  onCancel: () => void;
  onConfirm: () => void;
  onDone: () => void;
}) {
  const reduceMotion = useReducedMotion();
  const processingLabels = [
    "Preparing settlement...",
    "Verifying reward balance...",
    "Finalizing...",
  ];

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center px-6"
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.18 }}
    >
      <button
        type="button"
        aria-label="Close payout preview"
        disabled={flow === "processing"}
        onClick={onCancel}
        className="absolute inset-0 cursor-default bg-black/78"
      />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="claim-dialog-heading"
        initial={reduceMotion ? false : { opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: reduceMotion ? 0 : 4 }}
        transition={{ duration: reduceMotion ? 0 : 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-[470px] border border-border-strong bg-[#080b08] shadow-[0_24px_80px_rgba(0,0,0,0.52)]"
      >
        {flow === "confirm" ? (
          <>
            <div className="flex items-start justify-between border-b border-border px-7 py-6">
              <div>
                <p className="type-label text-lime">Prototype payout request</p>
                <h2 id="claim-dialog-heading" className="mt-4 text-[25px] font-semibold tracking-[-0.035em] text-text-primary">
                  Preview payout request
                </h2>
              </div>
              <button type="button" onClick={onCancel} aria-label="Close" className="grid size-8 cursor-pointer place-items-center border border-border text-text-muted transition-colors hover:border-border-strong hover:text-text-primary">
                <X aria-hidden="true" className="size-3.5" strokeWidth={1.7} />
              </button>
            </div>
            <div className="px-7 py-6">
              <p className="type-label text-text-muted">Scenario amount</p>
              <p className="mt-3 text-[58px] font-medium leading-none tracking-[-0.055em] tabular-nums text-lime">
                {formatSol(amount)}
              </p>
              <dl className="mt-7 border-y border-border py-1">
                {[
                  ["Wallet", shortenAddress(address)],
                  ["Wallet type", "Solana compatible"],
                  ["Current cycle", currentRewardCut.id],
                ].map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between border-b border-border py-3.5 last:border-b-0">
                    <dt className="text-[11px] text-text-muted">{label}</dt>
                    <dd className={`${label === "Wallet" || label === "Current cycle" ? "font-mono" : ""} text-[11px] text-text-primary`}>{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="grid grid-cols-2 border-t border-border">
              <button type="button" onClick={onCancel} className="h-12 cursor-pointer border-r border-border text-[11px] font-medium text-text-secondary transition-colors hover:bg-white/[0.025] hover:text-text-primary">Cancel</button>
              <button type="button" onClick={onConfirm} className="h-12 cursor-pointer bg-[#102317] text-[11px] font-semibold text-lime transition-colors hover:bg-[#142a1b]">Preview request</button>
            </div>
          </>
        ) : null}

        {flow === "processing" ? (
          <div className="px-8 py-10 text-center">
            <p className="type-label text-lime">Processing Claim</p>
            <h2 id="claim-dialog-heading" className="mt-7 text-[42px] font-medium tracking-[-0.05em] text-text-primary">{formatSol(amount)}</h2>
            <div className="mx-auto mt-8 h-px w-full max-w-[290px] overflow-hidden bg-white/10">
              <motion.div
                initial={{ width: "8%" }}
                animate={{ width: `${34 + processingStep * 33}%` }}
                transition={{ duration: reduceMotion ? 0 : 0.75, ease: [0.22, 1, 0.36, 1] }}
                className="h-px bg-lime"
              />
            </div>
            <p role="status" className="mt-6 text-[12px] text-text-secondary">
              {processingLabels[processingStep]}
            </p>
            <p className="mt-3 font-mono text-[8px] uppercase tracking-[0.1em] text-text-muted">Local payout preview · no wallet signature</p>
          </div>
        ) : null}

        {flow === "success" ? (
          <>
            <div className="px-8 py-9 text-center">
              <span className="mx-auto grid size-10 place-items-center rounded-full border border-[#4a7139] text-lime"><Check aria-hidden="true" className="size-4" strokeWidth={1.8} /></span>
              <p className="type-label mt-6 text-lime">Preview complete</p>
              <h2 id="claim-dialog-heading" className="mt-5 text-[54px] font-medium tracking-[-0.055em] tabular-nums text-text-primary">{formatSol(amount)}</h2>
              <p className="mx-auto mt-5 max-w-[310px] text-[13px] leading-5 text-text-secondary">A simulated payout request was added to the local queue. No transaction was sent.</p>
              <dl className="mx-auto mt-7 flex max-w-[280px] items-center justify-center divide-x divide-border border-y border-border py-4">
                <div className="px-6"><dt className="type-label text-text-muted">Record</dt><dd className="mt-2 font-mono text-[12px] text-text-primary">{currentRewardCut.settlementQueueId}</dd></div>
                <div className="px-6"><dt className="type-label text-text-muted">Status</dt><dd className="mt-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-lime">Queued</dd></div>
              </dl>
            </div>
            <button type="button" onClick={onDone} className="h-12 w-full cursor-pointer border-t border-border text-[11px] font-semibold text-text-primary transition-colors hover:bg-white/[0.025]">Done</button>
          </>
        ) : null}
      </motion.div>
    </motion.div>
  );
}

function RewardsDashboard({ address }: { address: string }) {
  const [summary, setSummary] = useState<RewardSummary>(initialRewardSummary);
  const [estimatedCut, setEstimatedCut] = useState(initialRewardSummary.pending);
  const [signals, setSignals] = useState<RewardSignal[]>(initialRewardSignals);
  const [activity, setActivity] = useState<RewardActivity[]>(initialRewardActivity);
  const [highlight, setHighlight] = useState<LiveRewardMetric | null>(null);
  const [secondsRemaining, setSecondsRemaining] = useState(nextCutDurationSeconds);
  const [claimFlow, setClaimFlow] = useState<ClaimFlow>("closed");
  const [processingStep, setProcessingStep] = useState(0);
  const [lastClaimAmount, setLastClaimAmount] = useState(initialRewardSummary.claimable);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSecondsRemaining((current) => current <= 0 ? nextCutDurationSeconds : current - 1);
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    let eventIndex = 0;
    let timer: number;
    let highlightTimer: number;

    const scheduleUpdate = () => {
      const delay = rewardLiveCadenceMs[eventIndex % rewardLiveCadenceMs.length];
      timer = window.setTimeout(() => {
        const event = liveEvents[eventIndex % liveEvents.length];
        if (event.metric === "pending") {
          setSummary((current) => ({ ...current, pending: Math.round((current.pending + event.amount) * 10_000) / 10_000 }));
        } else if (event.metric === "estimated-cut") {
          setEstimatedCut((current) => Math.round((current + event.amount) * 10_000) / 10_000);
        } else {
          setSignals((current) => current.map((signal, index) => index === 0 ? {
            ...signal,
            reach: event.metric === "signal-reach" ? signal.reach + event.amount : signal.reach,
            impact: event.metric === "signal-impact" ? signal.impact + event.amount : signal.impact,
          } : signal));
        }

        setHighlight(event.metric);
        window.clearTimeout(highlightTimer);
        highlightTimer = window.setTimeout(() => setHighlight(null), 1_300);
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

  useEffect(() => {
    if (claimFlow !== "processing") return;
    const verifyTimer = window.setTimeout(() => setProcessingStep(1), 900);
    const finalizeTimer = window.setTimeout(() => setProcessingStep(2), 1_800);
    const completeTimer = window.setTimeout(() => {
      const claimActivity: RewardActivity = {
        id: "claim-0051",
        label: "Payout preview created",
        detail: `${formatSol(lastClaimAmount)} · Settlement ${currentRewardCut.settlementQueueId}`,
        time: "just now",
        status: "queued",
      };
      setSummary((current) => ({ ...current, claimable: 0 }));
      setActivity((current) => [claimActivity, ...current].slice(0, 5));
      setClaimFlow("success");
    }, 2_800);
    return () => {
      window.clearTimeout(verifyTimer);
      window.clearTimeout(finalizeTimer);
      window.clearTimeout(completeTimer);
    };
  }, [claimFlow, lastClaimAmount]);

  const openClaim = () => {
    if (summary.claimable <= 0) return;
    setLastClaimAmount(summary.claimable);
    setClaimFlow("confirm");
  };

  const creator = creatorById[mockRewardCreatorId];
  const secondaryMetrics = [
    ["Pending", formatSol(summary.pending), "pending" as const],
    ["Lifetime Earned", formatSol(summary.lifetimeEarned)],
    ["This cycle", formatSol(summary.seasonEarned)],
    ["Completed cycles", summary.paidCuts.toString()],
    ["Earning events", summary.rewardedSignals.toString()],
    ["Earning Rate", `+${formatSol(summary.earningRate24h)} / 24H`],
  ] as const;

  return (
    <section aria-labelledby="rewards-page-heading">
      <Container className="pb-[132px] pt-[92px]">
        <PageIntro address={address} />
        <p className="mt-5 rounded-lg border border-lime/20 bg-lime-soft px-5 py-3 text-[12px] leading-5 text-text-secondary">Prototype profile: the earnings and activity below are scenario data for every connected wallet. No onchain earnings are queried and no payout transaction is sent.</p>

        <div className="mt-14 flex items-center justify-between border-b border-border pb-5">
          <div className="flex items-center gap-3.5"><span className="grid size-10 place-items-center rounded-full border border-border-strong bg-surface/55 text-[10px] font-semibold text-text-secondary">{creator.initials}</span><div><p className="text-[15px] font-semibold text-text-primary">{creator.handle}</p><p className="mt-1 text-[10px] text-text-muted">Verified Creator · Mock profile</p></div></div>
          <div className="flex items-center gap-8"><div><p className="type-label text-text-muted">Contribution score</p><p className="mt-2 text-[18px] font-medium tabular-nums text-text-primary">{personalPerformance.donScore}</p></div><div><p className="type-label text-text-muted">Cycle rank</p><p className="mt-2 font-mono text-[16px] text-text-primary">{personalPerformance.seasonRank}</p></div></div>
        </div>

        <div className="onik-panel mt-5 grid grid-cols-[1.25fr_1fr] border-b border-border">
          <div className="flex min-h-[360px] flex-col justify-between border-r border-border py-10 pr-12">
            <div><p className="type-label text-text-muted">Available / Demo</p><data value={summary.claimable} className="mt-5 block text-[clamp(48px,7vw,104px)] font-medium leading-none tracking-[-0.065em] tabular-nums text-lime">{formatSol(summary.claimable)}</data><p className="mt-6 text-[12px] text-text-muted">Scenario balance from completed distribution cycles.</p></div>
            <button type="button" disabled={summary.claimable <= 0} onClick={openClaim} className="mt-10 h-12 w-fit min-w-[220px] cursor-pointer border border-[#4a7139] bg-[#102317] px-6 text-[11px] font-semibold uppercase tracking-[0.08em] text-lime transition-colors duration-200 hover:border-lime/55 hover:bg-[#142a1b] disabled:cursor-default disabled:border-border disabled:bg-surface/35 disabled:text-text-muted">
              {summary.claimable > 0 ? `Preview payout · ${formatSol(summary.claimable)}` : "Request previewed"}
            </button>
          </div>
          <dl className="grid grid-cols-2">
            {secondaryMetrics.map(([label, value, metric], index) => (
              <div key={label} className={`flex min-h-[120px] flex-col justify-center px-8 ${index % 2 ? "border-l border-border" : ""} ${index < 4 ? "border-b border-border" : ""}`}><dt className="type-label text-text-muted">{label}</dt><dd className={`${label === "Earning Rate" ? "text-[19px]" : "text-[28px]"} mt-4 font-medium tracking-[-0.04em] tabular-nums text-text-primary`}>{metric ? <HighlightValue active={highlight === metric}>{value}</HighlightValue> : value}</dd></div>
            ))}
          </dl>
        </div>

        <div className="mt-20 grid grid-cols-[0.74fr_1.26fr] gap-12">
          <section className="border-y border-border py-7" aria-labelledby="current-cut-heading"><div className="flex items-center justify-between"><h2 id="current-cut-heading" className="type-label text-text-secondary">Current cycle</h2><p className="type-label flex items-center gap-2 text-lime"><LiveDot /> {currentRewardCut.status}</p></div><p className="mt-7 font-mono text-[31px] text-text-primary">{currentRewardCut.id}</p><dl className="mt-7 grid grid-cols-2 border-t border-border pt-6"><div className="border-r border-border pr-6"><dt className="type-label text-text-muted">Next cycle</dt><dd className="mt-3 font-mono text-[18px] tabular-nums text-text-primary">{formatCountdown(secondsRemaining)}</dd></div><div className="pl-6"><dt className="type-label text-text-muted">Estimated allocation</dt><dd className="mt-3 text-[23px] font-medium tabular-nums text-lime"><HighlightValue active={highlight === "estimated-cut"}>{formatSol(estimatedCut)}</HighlightValue></dd></div></dl></section>
          <section className="border-y border-border py-7" aria-labelledby="performance-heading"><h2 id="performance-heading" className="type-label text-text-secondary">Contribution profile</h2><dl className="mt-7 grid grid-cols-5 divide-x divide-border"><div><dd className="text-[25px] font-medium tabular-nums">{personalPerformance.signals}</dd><dt className="mt-3 text-[10px] text-text-muted">Your events</dt></div><div className="pl-6"><dd className="text-[25px] font-medium tabular-nums">{personalPerformance.avgImpact}</dd><dt className="mt-3 text-[10px] text-text-muted">Avg contribution</dt></div><div className="pl-6"><dd className="text-[25px] font-medium tabular-nums">{formatReach(personalPerformance.totalReach)}</dd><dt className="mt-3 text-[10px] text-text-muted">Total Reach</dt></div><div className="pl-6"><dd className="text-[25px] font-medium tabular-nums">{personalPerformance.donScore}</dd><dt className="mt-3 text-[10px] text-text-muted">Contribution score</dt></div><div className="pl-6"><dd className="font-mono text-[23px]">{personalPerformance.seasonRank}</dd><dt className="mt-3 text-[10px] text-text-muted">Cycle rank</dt></div></dl></section>
        </div>

        <section className="mt-24" aria-labelledby="rewarded-signals-heading">
          <div className="mb-8"><p className="type-label text-text-muted">Attributed value</p><h2 id="rewarded-signals-heading" className="mt-4 text-[31px] font-semibold tracking-[-0.04em] text-text-primary">Earning events</h2><p className="mt-3 text-[13px] text-text-secondary">Events contributing to current and completed cycles in this scenario.</p></div>
          <div className="grid grid-cols-[100px_1.7fr_0.7fr_0.8fr_0.8fr_0.7fr_0.7fr] gap-5 border-y border-border px-3 py-4 text-[9px] font-semibold uppercase tracking-[0.11em] text-text-muted"><span>Event</span><span>Source</span><span>Status</span><span>Score</span><span>Reach</span><span>Allocation</span><span>Cycle</span></div>
          <ol>{signals.map((signal, index) => <li key={signal.id} className="grid min-h-[82px] grid-cols-[100px_1.7fr_0.7fr_0.8fr_0.8fr_0.7fr_0.7fr] items-center gap-5 border-b border-border px-3 transition-colors duration-200 hover:bg-white/[0.018]"><span className="font-mono text-[11px] text-text-primary">Signal {signal.id}</span><p className="pr-5 text-[12px] leading-[1.45] text-text-secondary">“{signal.excerpt}”</p><span className={`flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.09em] ${signal.status === "tracking" ? "text-lime" : signal.status === "paid" ? "text-text-primary" : "text-text-secondary"}`}>{signal.status === "tracking" ? <LiveDot /> : null}{signal.status}</span><span className="text-[15px] font-medium tabular-nums"><HighlightValue active={index === 0 && highlight === "signal-impact"}>{signal.impact}</HighlightValue></span><span className="text-[13px] tabular-nums text-text-secondary"><HighlightValue active={index === 0 && highlight === "signal-reach"}>{formatReach(signal.reach)}</HighlightValue></span><span className={signal.status === "paid" ? "text-[13px] font-medium tabular-nums text-lime" : "text-[13px] font-medium tabular-nums text-text-primary"}>{formatSol(signal.reward)}{signal.estimated ? " est." : ""}</span><span className="font-mono text-[10px] text-text-muted">{signal.cut}</span></li>)}</ol>
        </section>

        <div className="mt-24 grid grid-cols-[1.1fr_0.9fr] gap-16">
          <section aria-labelledby="breakdown-heading"><p className="type-label text-text-muted">This cycle</p><div className="mt-4 flex items-end justify-between"><h2 id="breakdown-heading" className="text-[31px] font-semibold tracking-[-0.04em]">Allocation breakdown</h2><p className="text-[31px] font-medium tabular-nums text-lime">{formatSol(rewardBreakdown.total)}</p></div><div className="mt-8 flex h-1.5 overflow-hidden bg-white/[0.06]"><span className="bg-lime" style={{ width: `${rewardBreakdown.signals / rewardBreakdown.total * 100}%` }} /><span className="bg-[#739d50]" style={{ width: `${rewardBreakdown.boosts / rewardBreakdown.total * 100}%` }} /><span className="bg-[#445b38]" style={{ width: `${rewardBreakdown.cutBonus / rewardBreakdown.total * 100}%` }} /></div><dl className="mt-7 grid grid-cols-3 border-y border-border py-5"><div><dd className="text-[19px] font-medium tabular-nums">{formatSol(rewardBreakdown.signals)}</dd><dt className="mt-2 text-[10px] text-text-muted">From Signals</dt></div><div className="border-l border-border pl-6"><dd className="text-[19px] font-medium tabular-nums">{formatSol(rewardBreakdown.boosts)}</dd><dt className="mt-2 text-[10px] text-text-muted">Boosts</dt></div><div className="border-l border-border pl-6"><dd className="text-[19px] font-medium tabular-nums">{formatSol(rewardBreakdown.cutBonus)}</dd><dt className="mt-2 text-[10px] text-text-muted">Cut Bonus</dt></div></dl></section>
          <section aria-labelledby="activity-heading"><div className="flex items-end justify-between"><div><p className="type-label text-text-muted">Personal stream</p><h2 id="activity-heading" className="mt-4 text-[31px] font-semibold tracking-[-0.04em]">Your Activity</h2></div><LiveDot /></div><ol className="mt-7 border-t border-border">{activity.map((item) => <li key={item.id} className="grid grid-cols-[1fr_auto] gap-5 border-b border-border py-4"><div><p className="text-[12px] font-medium text-text-primary">{item.label}</p><p className="mt-1.5 text-[10px] text-text-muted">{item.detail}</p></div><div className="text-right"><p className="font-mono text-[8px] text-text-muted">{item.time}</p>{item.status ? <p className="mt-2 text-[8px] font-semibold uppercase tracking-[0.1em] text-lime">{item.status}</p> : null}</div></li>)}</ol></section>
        </div>

        <section className="mt-24" aria-labelledby="payout-history-heading"><div className="mb-7 flex items-end justify-between"><div><p className="type-label text-text-muted">Distribution records</p><h2 id="payout-history-heading" className="mt-4 text-[31px] font-semibold tracking-[-0.04em]">Distribution history</h2></div><p className="font-mono text-[9px] uppercase tracking-[0.1em] text-text-muted">Prototype records</p></div><div className="grid grid-cols-[1fr_0.8fr_1fr_1fr_0.8fr_1.2fr] border-y border-border px-3 py-4 text-[9px] font-semibold uppercase tracking-[0.11em] text-text-muted"><span>Date</span><span>Cycle</span><span>Amount</span><span>Events</span><span>Status</span><span>Record</span></div><ol>{rewardPayouts.map((payout) => <li key={payout.settlement} className="grid min-h-[68px] grid-cols-[1fr_0.8fr_1fr_1fr_0.8fr_1.2fr] items-center border-b border-border px-3 text-[12px]"><span className="text-text-secondary">{payout.date}</span><span className="font-mono text-[10px] text-text-muted">{payout.cut}</span><span className="font-medium tabular-nums text-text-primary">{formatSol(payout.amount)}</span><span className="text-text-secondary">{payout.signals} events</span><span className="text-[9px] font-semibold uppercase tracking-[0.1em] text-lime">{payout.status}</span><span className="font-mono text-[10px] text-text-secondary">Record {payout.settlement}</span></li>)}</ol></section>
      </Container>

      <AnimatePresence>
        {claimFlow !== "closed" ? <ClaimModal flow={claimFlow} amount={lastClaimAmount} address={address} processingStep={processingStep} onCancel={() => setClaimFlow("closed")} onConfirm={() => { setProcessingStep(0); setClaimFlow("processing"); }} onDone={() => setClaimFlow("closed")} /> : null}
      </AnimatePresence>
    </section>
  );
}

export function RewardsPage() {
  const { address, isConnected, isReconnecting } = useWallet();

  if (isReconnecting) {
    return (
      <section aria-labelledby="rewards-page-heading">
        <Container className="flex min-h-[650px] items-center py-24">
          <div><p className="type-label flex items-center gap-3 text-text-muted"><span className="h-px w-9 bg-lime" /> Wallet workspace / Prototype</p><h1 id="rewards-page-heading" className="type-section-title mt-6 text-text-primary">Earnings</h1><p className="mt-8 text-[14px] text-text-muted">Restoring wallet connection...</p></div>
        </Container>
      </section>
    );
  }

  return isConnected && address ? <RewardsDashboard address={address} /> : <DisconnectedRewards />;
}
