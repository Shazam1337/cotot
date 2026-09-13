import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import donsLogo from "@/public/assets/brand/ChatGPT Image 9 сент. 2026 г., 16_03_37.png";
import { DONS_X_URL } from "@/lib/constants";

const primaryLinks = [
  { label: "Home", href: "/" },
  { label: "The Wire", href: "/wire" },
  { label: "Creators", href: "/creators" },
  { label: "Rewards", href: "/rewards" },
  { label: "Proof", href: "/proof" },
];

const resourceLinks = [
  { label: "X", href: DONS_X_URL },
  { label: "Docs", href: "#" },
  { label: "Solana", href: "/proof" },
];

const footerLinkClass =
  "text-[13px] font-medium text-text-secondary transition-colors duration-200 hover:text-text-primary focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-lime";

export function SiteFooter() {
  return (
    <footer className="h-[220px] border-t border-border bg-bg" aria-label="Site footer">
      <Container className="flex h-full flex-col">
        <div className="grid flex-1 grid-cols-[1fr_auto_1fr] items-center gap-10">
          <div>
            <Link href="/" aria-label="DONS home" className="flex w-fit items-center">
              <Image src={donsLogo} alt="DONS" className="h-7 w-auto object-contain" />
            </Link>
            <p className="mt-4 text-[12px] font-semibold uppercase tracking-[0.12em] text-text-secondary">
              Attention pays.
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <ul className="flex items-center gap-7">
              {primaryLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={footerLinkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col items-end gap-5">
            <nav aria-label="Resources">
              <ul className="flex items-center gap-6">
                {resourceLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.href.startsWith("https://") ? "_blank" : undefined}
                      rel={link.href.startsWith("https://") ? "noopener noreferrer" : undefined}
                      className={footerLinkClass}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

          </div>
        </div>

        <div className="flex h-[54px] shrink-0 items-center justify-between border-t border-border font-mono text-[9px] uppercase tracking-[0.1em] text-text-muted">
          <p>© 2026 DONS</p>
          <p>Creator revenue network</p>
        </div>
      </Container>
    </footer>
  );
}
