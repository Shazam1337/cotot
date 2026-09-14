import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { HeaderNavigation } from "@/components/layout/header-navigation";
import { LiveDot } from "@/components/ui/live-dot";
import { WalletButton } from "@/components/wallet/wallet-button";
import cototLogo from "@/public/assets/brand/ChatGPT Image 9 сент. 2026 г., 16_03_37.png";
import { COTOT_X_URL } from "@/lib/constants";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 h-[68px] border-b border-border bg-bg/88 backdrop-blur-xl">
      <Container className="grid h-full grid-cols-[1fr_auto] items-center gap-5 md:grid-cols-[190px_1fr_auto]">
        <Link
          href="/"
          aria-label="COTOT home"
          className="flex w-fit items-center gap-3"
        >
          <Image
            src={cototLogo}
            alt="COTOT"
            loading="eager"
            className="size-[47px] rounded-[13px] object-cover"
          />
          <span className="text-[34px] font-bold leading-none tracking-[-0.03em] text-text-primary">COTOT</span>
        </Link>

        <HeaderNavigation />

        <div className="flex items-center justify-end gap-3">
          <span className="type-label hidden items-center gap-2 text-[#23833c] lg:flex">
            <LiveDot />
            Live
          </span>

          <WalletButton />

          <a
            href={COTOT_X_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open COTOT on X"
            className="hidden size-9 shrink-0 place-items-center text-text-secondary transition-colors duration-200 hover:text-text-primary focus-visible:text-text-primary focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-text-primary lg:grid"
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
