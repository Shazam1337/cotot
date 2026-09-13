import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { HeaderNavigation } from "@/components/layout/header-navigation";
import { LiveDot } from "@/components/ui/live-dot";
import { WalletButton } from "@/components/wallet/wallet-button";
import donsLogo from "@/public/assets/brand/ChatGPT Image 9 сент. 2026 г., 16_03_37.png";
import { DONS_X_URL } from "@/lib/constants";

export function SiteHeader() {
  return (
    <header className="relative z-20 h-[74px] border-b border-border bg-bg/40">
      <Container className="grid h-full grid-cols-[160px_1fr_auto] items-center gap-6">
        <Link
          href="/"
          aria-label="DONS home"
          className="flex w-fit items-center"
        >
          <Image
            src={donsLogo}
            alt="DONS"
            loading="eager"
            className="h-8 w-auto object-contain"
          />
        </Link>

        <HeaderNavigation />

        <div className="flex items-center justify-end gap-4">
          <span className="type-label flex items-center gap-2 text-lime">
            <LiveDot />
            Live
          </span>

          <WalletButton />

          <a
            href={DONS_X_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open DONS on X"
            className="grid size-9 shrink-0 place-items-center text-text-secondary transition-colors duration-200 hover:text-lime focus-visible:text-lime focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-lime"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="size-[27px] fill-current"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
            </svg>
          </a>
        </div>
      </Container>
    </header>
  );
}
