import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import cototLogo from "@/public/assets/brand/ChatGPT Image 9 сент. 2026 г., 16_03_37.png";
import { COTOT_X_URL } from "@/lib/constants";

const platformLinks = [
  { label: "Signals", href: "/wire" },
  { label: "Rewards", href: "/rewards" },
  { label: "Open ledger", href: "/proof" },
];

const discoverLinks = [
  { label: "Creator index", href: "/creators" },
  { label: "Solana Explorer", href: "https://explorer.solana.com" },
  { label: "COTOT on X", href: COTOT_X_URL },
];

export function SiteFooter() {
  return (
    <footer className="theme-dark bg-bg py-14 text-text-primary sm:py-20" aria-label="Site footer">
      <Container>
        <div className="grid gap-12 border-b border-border pb-14 md:grid-cols-[1.3fr_0.7fr_0.7fr]">
          <div>
            <Link href="/" aria-label="COTOT home" className="flex w-fit items-center gap-3">
              <Image src={cototLogo} alt="" className="size-11 rounded-xl object-cover" />
              <span className="text-[22px] font-bold tracking-[-0.04em]">COTOT</span>
            </Link>
            <p className="mt-6 max-w-[430px] font-display text-[36px] leading-[0.98] tracking-[-0.045em] text-text-primary">
              Proof of attention.<br />A fairer share of value.
            </p>
          </div>

          <nav aria-label="Platform">
            <p className="type-label text-text-muted">Platform</p>
            <ul className="mt-5 space-y-3">
              {platformLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[14px] text-text-secondary transition-colors hover:text-lime">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Discover">
            <p className="type-label text-text-muted">Discover</p>
            <ul className="mt-5 space-y-3">
              {discoverLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="inline-flex items-center gap-2 text-[14px] text-text-secondary transition-colors hover:text-lime"
                  >
                    {link.label}
                    {link.href.startsWith("http") ? <ArrowUpRight aria-hidden="true" className="size-3" /> : null}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex flex-col gap-3 pt-6 font-mono text-[11px] uppercase tracking-[0.08em] text-text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 COTOT</p>
          <p>Creator value network · Solana mainnet</p>
        </div>
      </Container>
    </footer>
  );
}
