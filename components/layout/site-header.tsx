import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { HeaderNavigation } from "@/components/layout/header-navigation";
import { WalletButton } from "@/components/wallet/wallet-button";

const ONIX_X_URL = "https://x.com/onixdotbest";

export function SiteHeader() {
  return <header className="sticky top-0 z-30 border-b border-border bg-[#151412]/95 backdrop-blur-xl">
    <Container className="flex h-[88px] items-center justify-between gap-2 xl:h-[104px]">
      <Link href="/" aria-label="ONIX home" className="flex shrink-0 items-center">
        <Image src="/assets/logo.png" alt="" width={88} height={88} priority className="size-[72px] object-contain xl:size-[88px]" />
        <span className="relative block h-14 w-[145px] shrink-0 overflow-hidden xl:h-16 xl:w-[190px]"><Image src="/assets/label.png" alt="" width={2172} height={724} priority className="absolute left-1/2 top-1/2 h-auto w-[220px] max-w-none -translate-x-1/2 -translate-y-1/2 xl:w-[270px]" /></span>
      </Link>
      <HeaderNavigation/>
      <div className="flex shrink-0 items-center gap-2 sm:gap-3"><a href={ONIX_X_URL} target="_blank" rel="noopener noreferrer" aria-label="Open ONIX on X" className="hidden size-11 place-items-center rounded-md border border-border bg-surface text-text-secondary hover:text-lime sm:grid"><svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="size-5"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932zm-1.291 19.49h2.04L6.486 3.24H4.298z"/></svg></a><WalletButton/></div>
    </Container>
    <div className="border-t border-border xl:hidden"><Container><HeaderNavigation mobile/></Container></div>
  </header>;
}
