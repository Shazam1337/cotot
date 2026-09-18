"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Wallet } from "lucide-react";
import { LiveDot } from "@/components/ui/live-dot";
import { shortenAddress } from "@/lib/wallet";
import { WalletMenu } from "@/components/wallet/wallet-menu";
import { useWallet, useWalletModal } from "@/components/wallet/wallet-provider";

export function WalletButton() {
  const reduceMotion = useReducedMotion();
  const { address, isConnected, isReconnecting } = useWallet();
  const [menuOpen, setMenuOpen] = useState(false);
  const { openWalletModal } = useWalletModal();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setMenuOpen(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  return (
    <div ref={rootRef} className="relative">
      <AnimatePresence initial={false} mode="wait">
        {isConnected && address ? (
          <motion.button
            key="connected"
            type="button"
            aria-expanded={menuOpen}
            aria-haspopup="dialog"
            onClick={() => setMenuOpen((current) => !current)}
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.16 }}
            className="flex h-11 cursor-pointer items-center gap-2.5 rounded-[5px] border border-[#385629] bg-[#102317] px-3.5 font-mono text-[15px] text-text-primary transition-colors duration-200 hover:border-[#4a7140] hover:bg-[#142a1b] focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-lime"
          >
            <LiveDot />
            <span className="sm:hidden">Wallet</span>
            <span className="hidden sm:inline">{shortenAddress(address)}</span>
            <ChevronDown
              aria-hidden="true"
              className={`size-3 text-text-muted transition-transform duration-200 ${menuOpen ? "rotate-180" : ""}`}
              strokeWidth={1.7}
            />
          </motion.button>
        ) : (
          <motion.button
            key="disconnected"
            type="button"
            disabled={isReconnecting}
            onClick={openWalletModal}
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.16 }}
            className="flex h-11 cursor-pointer items-center gap-2 rounded-[5px] border border-[#f2f0eb] bg-[#f2f0eb] px-3.5 font-sans text-[18px] font-semibold text-[#181816] transition-colors duration-200 hover:border-white hover:bg-white disabled:cursor-wait disabled:text-[#777] focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-lime"
          >
            <Wallet aria-hidden="true" className="size-3.5 text-[#181816]" strokeWidth={1.7} />
            <span className="sm:hidden">{isReconnecting ? "Restoring" : "Connect"}</span>
            <span className="hidden sm:inline">{isReconnecting ? "Restoring Wallet" : "Connect Wallet"}</span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {menuOpen && isConnected && address ? (
          <WalletMenu address={address} onClose={() => setMenuOpen(false)} />
        ) : null}
      </AnimatePresence>
    </div>
  );
}
