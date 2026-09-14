import Link from "next/link";
import { ArrowRight, CheckCircle2, ScanSearch, WalletCards } from "lucide-react";
import { Container } from "@/components/layout/container";

const steps = [
  {
    number: "01",
    title: "Signal",
    body: "Public creator activity enters the network as a measurable signal.",
    icon: ScanSearch,
  },
  {
    number: "02",
    title: "Score",
    body: "Reach, engagement and market response produce a transparent impact score.",
    icon: CheckCircle2,
  },
  {
    number: "03",
    title: "Settle",
    body: "A share of captured fees returns to eligible creators in SOL.",
    icon: WalletCards,
  },
];

export function PlatformOverview() {
  return (
    <section className="bg-lime py-24 text-[#102317] sm:py-32">
      <Container>
        <div className="mx-auto max-w-[780px] text-center">
          <p className="type-label text-[#102317]/55">How value moves</p>
          <h2 className="mt-6 font-display text-[clamp(3.4rem,6vw,6.8rem)] leading-[0.86] tracking-[-0.055em]">
            One open loop from culture to capital.
          </h2>
        </div>

        <div className="mt-16 grid gap-4 lg:grid-cols-3">
          {steps.map(({ number, title, body, icon: Icon }) => (
            <article
              key={number}
              className="flex min-h-[330px] flex-col justify-between rounded-[28px] bg-[#f7f6f0] p-7 sm:p-9"
            >
              <div className="flex items-start justify-between">
                <span className="font-mono text-[12px] text-[#102317]/55">{number}</span>
                <span className="grid size-11 place-items-center rounded-full border border-[#102317]/15">
                  <Icon aria-hidden="true" className="size-5" strokeWidth={1.7} />
                </span>
              </div>
              <div>
                <h3 className="font-display text-[48px] leading-none tracking-[-0.045em]">{title}</h3>
                <p className="mt-5 max-w-[300px] text-[16px] leading-[1.5] text-[#102317]/68">{body}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-4 grid overflow-hidden rounded-[28px] bg-[#14342e] text-white lg:grid-cols-[1.35fr_0.65fr]">
          <div className="p-8 sm:p-12">
            <p className="type-label text-white/50">Built for both sides of the market</p>
            <h3 className="mt-6 max-w-[760px] font-display text-[clamp(3rem,5vw,5.6rem)] leading-[0.88] tracking-[-0.05em]">
              Creators earn. Traders discover. The ledger stays public.
            </h3>
          </div>
          <div className="flex flex-col justify-between border-t border-white/15 p-8 lg:border-l lg:border-t-0 sm:p-12">
            <p className="text-[16px] leading-[1.5] text-white/68">
              Follow live signals, connect a Solana wallet and inspect every simulated settlement from one place.
            </p>
            <Link
              href="/rewards"
              className="mt-10 inline-flex w-fit items-center gap-3 rounded-full bg-lime px-5 py-3 text-[14px] font-semibold text-[#102317]"
            >
              Open rewards <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
