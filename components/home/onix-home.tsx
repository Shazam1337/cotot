import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Activity, ArrowRight, ArrowUpRight, ChartNoAxesCombined, CircleDollarSign, Database, Radar, ShieldCheck } from "lucide-react";
import { SiteFooter } from "@/components/layout/site-footer";
import { creatorById, creatorRangeSnapshots } from "@/data/creators";
import { cutHistory, proofMetrics } from "@/data/proof";
import { wireSignals } from "@/data/wire";
import { formatSol } from "@/lib/currency";

const chartBars = [18, 24, 19, 32, 27, 35, 28, 42, 37, 49, 44, 57, 52, 68, 59, 73, 65, 85, 76, 94, 87, 100];

function PreviewFrame({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="onix-preview-frame">
      <div className="onix-preview-toolbar">
        <span className="onix-window-dots"><i /><i /><i /></span>
        <span>ONIX / {label}</span>
        <span className="onix-toolbar-live">● &nbsp; Demo workspace</span>
      </div>
      {children}
    </div>
  );
}

function ActivityPreview() {
  return (
    <PreviewFrame label="Activity">
      <div className="onix-preview-body onix-activity-preview">
        <div className="onix-preview-side">
          <div className="onix-preview-brand"><Image src="/assets/logo.png" alt="" width={32} height={32} />ONIX</div>
          <span className="onix-side-label">WORKSPACE</span>
          <span className="onix-side-link onix-side-link-active">◈ &nbsp; Overview</span>
          <span className="onix-side-link">⌁ &nbsp; Activity</span>
          <span className="onix-side-link">◎ &nbsp; Contributors</span>
          <span className="onix-side-link">▤ &nbsp; Records</span>
          <span className="onix-side-foot">SCENARIO ACTIVE<br />PROTOTYPE DATA</span>
        </div>
        <div className="onix-preview-main">
          <div className="onix-preview-title-row"><div><span className="onix-ui-label">EVENT STREAM / CURRENT CYCLE</span><h3>Network activity</h3></div><span className="onix-ui-pill">● &nbsp; Tracking</span></div>
          <div className="onix-ui-stats"><div><small>Events tracked</small><strong>1,284</strong><span>↗ 12.4% this cycle</span></div><div><small>Attributed reach</small><strong>8.4M</strong><span>↗ 8.2% this cycle</span></div><div><small>Signals verified</small><strong>482</strong><span>Record linked</span></div></div>
          <div className="onix-chart-card"><div className="onix-preview-title-row"><div><span className="onix-ui-label">SIGNAL VELOCITY</span><h4>Events over time</h4></div><span className="onix-ui-pill">7 DAYS</span></div><div className="onix-chart-bars" aria-hidden="true">{chartBars.map((height, index) => <span key={index} style={{ height: height + "%" }} />)}</div><div className="onix-chart-axis"><span>Cycle start</span><span>Current</span></div></div>
          <div className="onix-signal-table"><div className="onix-signal-table-head"><span>RECENT SIGNALS</span><span>REACH</span><span>STATUS</span></div>{wireSignals.slice(0, 3).map((signal) => <div className="onix-signal-table-row" key={signal.id}><span>{creatorById[signal.creatorId].handle}</span><span>{(signal.impressions / 1000).toFixed(1)}K</span><span>{signal.status}</span></div>)}</div>
        </div>
      </div>
    </PreviewFrame>
  );
}

function ContributorsPreview() {
  return (
    <PreviewFrame label="Contributors">
      <div className="onix-compact-preview">
        <div className="onix-preview-title-row"><div><span className="onix-ui-label">ATTRIBUTION / SEASON</span><h3>Contributor ranking</h3></div><span className="onix-ui-pill">26 ACTIVE</span></div>
        <div className="onix-ranking-head"><span>RANK / CONTRIBUTOR</span><span>REACH</span><span>IMPACT</span></div>
        {creatorRangeSnapshots.season.slice(0, 5).map((entry, index) => {
          const creator = creatorById[entry.creatorId];
          return <div className="onix-ranking-row" key={entry.creatorId}><span className="onix-ranking-person"><b>{String(index + 1).padStart(2, "0")}</b><i>{creator.initials}</i><span><strong>{creator.handle}</strong><small>{creator.category}</small></span></span><span>{(entry.metrics.reach / 1_000_000).toFixed(1)}M</span><span className="onix-ranking-score"><strong>{entry.metrics.donScore}</strong><i style={{ width: entry.metrics.donScore / 10 + "%" }} /></span></div>;
        })}
      </div>
    </PreviewFrame>
  );
}

function EarningsPreview() {
  return (
    <PreviewFrame label="Earnings">
      <div className="onix-compact-preview">
        <div className="onix-preview-title-row"><div><span className="onix-ui-label">ALLOCATION / CURRENT CYCLE</span><h3>Value in motion</h3></div><span className="onix-ui-pill">CYCLE #0043</span></div>
        <div className="onix-earnings-grid"><div><span>Creator pool</span><strong>{formatSol(proofMetrics.creatorPool)}</strong><small>Allocated across the network</small></div><div><span>Distributed</span><strong>{formatSol(proofMetrics.distributed)}</strong><small>{proofMetrics.cutsCompleted} completed cycles</small></div><div><span>Contributors paid</span><strong>{proofMetrics.creatorsPaid}</strong><small>Recorded distribution events</small></div></div>
        <div className="onix-allocation-card"><div><span>ALLOCATION PATH</span><strong>Signal → Share → Settlement</strong></div><div className="onix-allocation-track"><span /></div><div className="onix-allocation-labels"><span>Attributed activity</span><span>Distribution record</span></div></div>
      </div>
    </PreviewFrame>
  );
}

function RecordsPreview() {
  return (
    <PreviewFrame label="Records">
      <div className="onix-compact-preview">
        <div className="onix-preview-title-row"><div><span className="onix-ui-label">AUDIT / DISTRIBUTION</span><h3>Every cycle, visible</h3></div><span className="onix-ui-pill">● &nbsp; 42 COMPLETE</span></div>
        <div className="onix-record-head"><span>CYCLE</span><span>CONTRIBUTORS</span><span>DISTRIBUTED</span><span>STATUS</span></div>
        {cutHistory.slice(0, 4).map((cut) => <div className="onix-record-row" key={cut.id}><strong>{cut.id}</strong><span>{cut.creators}</span><span>{formatSol(cut.distributed)}</span><span className="onix-record-status">● &nbsp; Complete</span></div>)}
        <p className="onix-preview-note">Prototype records illustrate the distribution workflow. No live payout is implied.</p>
      </div>
    </PreviewFrame>
  );
}

function StoryCard({ number, label, title, description, href, children }: { number: string; label: string; title: string; description: string; href: string; children: ReactNode }) {
  return <section className="onix-story-card"><div className="onix-story-top"><span>{number}</span><div><p className="onix-story-label">{label}</p><h2>{title}</h2><p>{description}</p><Link href={href}>Explore this view <ArrowUpRight size={16} /></Link></div></div>{children}</section>;
}

const capabilities = [
  { icon: Radar, label: "CAPTURE", title: "The signal, structured.", copy: "Public activity enters one readable stream with source, time, status, and response.", href: "/wire" },
  { icon: ChartNoAxesCombined, label: "MEASURE", title: "Contribution, compared.", copy: "See who moved reach and engagement across the current cycle.", href: "/creators" },
  { icon: CircleDollarSign, label: "ALLOCATE", title: "Value, accounted for.", copy: "Follow the modeled share from attribution into an earnings view.", href: "/rewards" },
  { icon: Database, label: "VERIFY", title: "A record you can inspect.", copy: "Review cycles, distribution amounts, and system state in one place.", href: "/proof" },
];

export default function OnixHome() {
  return <><main className="onix-home">
    <section className="onix-hero-wrap"><div className="onik-container"><div className="onix-hero-shell">
      <div className="onix-hero-copy"><span className="onix-kicker">● &nbsp; SIGNAL TO VALUE INFRASTRUCTURE</span><h1>Make every signal <em>count.</em></h1><p>ONIX tracks the activity that moves a network, measures each contribution, and makes value distribution visible from event to record.</p><div className="onix-hero-actions"><Link className="onik-button" href="/wire">Explore activity <ArrowUpRight size={16} /></Link><Link className="onik-button onik-button-secondary" href="#platform">See the platform <ArrowRight size={16} /></Link></div><span className="onix-hero-note">A transparent prototype for public activity and distribution.</span></div>
      <div className="onix-hero-art" aria-hidden="true"><div className="onix-art-tile onix-art-brand"><span>ONIX / NETWORK</span><Image src="/assets/logo.png" alt="" width={340} height={340} priority /></div><div className="onix-art-tile onix-art-signal"><span>01 / ACTIVITY</span><Radar size={44} strokeWidth={1} /><strong>1,284</strong><small>EVENTS TRACKED</small></div><div className="onix-art-tile onix-art-grid"><span>02 / ATTRIBUTION</span><div className="onix-orbit"><i /><i /><i /><i /><i /></div><small>EVERY SOURCE CONNECTED</small></div><div className="onix-art-tile onix-art-value"><span>03 / DISTRIBUTION</span><div><b>12.54</b><small>SOL</small></div><p>ON RECORD ↗</p></div></div>
    </div></div></section>

    <section className="onix-flow-strip" aria-label="How ONIX works"><div className="onik-container"><span>ONE CONNECTED SYSTEM</span><div><i>01</i> Capture activity</div><div><i>02</i> Measure impact</div><div><i>03</i> Allocate value</div><div><i>04</i> Inspect the record</div></div></section>

    <section className="onix-statement-wrap"><div className="onik-container"><div className="onix-statement"><span className="onix-kicker">THE IDEA</span><p>Activity creates value. <strong>ONIX makes the path between them visible.</strong></p><div className="onix-pixel-wave" aria-hidden="true" /></div></div></section>

    <div id="platform" className="onik-container onix-stories"><StoryCard number="01" label="ACTIVITY / CAPTURE" title="See the signal as it happens." description="Follow public events in a structured feed. Each one carries a source, a status, and the response it generated." href="/wire"><ActivityPreview /></StoryCard><StoryCard number="02" label="CONTRIBUTORS / MEASURE" title="Know who moved the network." description="Compare reach, engagement, and impact across contributors without losing the event behind each score." href="/creators"><ContributorsPreview /></StoryCard><StoryCard number="03" label="EARNINGS / ALLOCATE" title="Make the value path legible." description="See how attributed activity flows into a modeled allocation, then into the wallet earnings prototype." href="/rewards"><EarningsPreview /></StoryCard><StoryCard number="04" label="RECORDS / VERIFY" title="Keep the complete picture." description="Review distribution cycles and their status in an inspectable record rather than a black box." href="/proof"><RecordsPreview /></StoryCard></div>

    <section className="onix-capabilities"><div className="onik-container"><span className="onix-section-kicker">BEYOND A FEED</span><h2>One system. Four clear views.</h2><div className="onix-capability-grid">{capabilities.map(({ icon: Icon, label, title, copy, href }) => <Link href={href} key={label} className="onix-capability-card"><Icon size={47} strokeWidth={1.1} /><span>{label}</span><h3>{title}</h3><p>{copy}</p><ArrowUpRight size={17} className="onix-capability-arrow" /></Link>)}</div></div></section>

    <section className="onix-explainer"><div className="onik-container"><div className="onix-explainer-grid"><div><span className="onix-section-kicker">BUILT FOR CLARITY</span><h2>From first event to final record.</h2><p>ONIX connects the moments that are usually scattered across feeds, scoreboards, wallet views, and ledgers. Inspect the same cycle from every angle.</p><Link className="onik-button onik-button-secondary" href="/proof">Explore records <ArrowUpRight size={16} /></Link></div><div className="onix-flow-diagram"><div><Activity size={23} /><strong>Event</strong><span>Source + response</span></div><i>→</i><div><ChartNoAxesCombined size={23} /><strong>Impact</strong><span>Contribution score</span></div><i>→</i><div><CircleDollarSign size={23} /><strong>Share</strong><span>Modeled allocation</span></div><i>→</i><div><ShieldCheck size={23} /><strong>Record</strong><span>Cycle status</span></div></div></div></div></section>

    <section className="onix-faq"><div className="onik-container"><div><span className="onix-section-kicker">QUESTIONS</span><h2>Frequently asked questions.</h2><p>What the current ONIX prototype shows.</p></div><div className="onix-faq-list"><details><summary>What does ONIX track?</summary><p>The prototype models public creator activity, engagement, attribution, and distribution events.</p></details><details><summary>Can I connect a wallet?</summary><p>Yes. The wallet connection is real; the earnings and payouts shown here are a demo scenario.</p></details><details><summary>Are the distributions live?</summary><p>No. The current distribution records are simulated so you can inspect the intended workflow.</p></details><details><summary>Where can I inspect a cycle?</summary><p>Open Records to review cycle history, allocation totals, settlement entries, and system status.</p></details></div></div></section>

    <section className="onix-final-wrap"><div className="onik-container"><div className="onix-final-cta"><span className="onix-kicker">START EXPLORING</span><h2>One signal. One system.<br /><em>The full picture.</em></h2><div><Link className="onik-button" href="/wire">Open activity <ArrowUpRight size={16} /></Link><Link className="onik-button onik-button-secondary" href="/creators">View contributors <ArrowRight size={16} /></Link></div><p>Prototype activity and distribution data.</p><div className="onix-pixel-wave" aria-hidden="true" /></div></div></section>
  </main><SiteFooter /></>;
}
