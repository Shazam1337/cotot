"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, Copy, LogOut, RefreshCw } from "lucide-react";
import type { Address } from "viem";
import { useDisconnect, useSwitchChain } from "wagmi";
import { LiveDot } from "@/components/ui/live-dot";
import { robinhoodChain } from "@/lib/chains";
import { getWalletErrorMessage, shortenAddress } from "@/lib/wallet";

type WalletMenuProps = {
  address: Address;
  chainId: number | undefined;
  onClose: () => void;
};

export function WalletMenu({ address, chainId, onClose }: WalletMenuProps) {
  const reduceMotion = useReducedMotion();
  const { disconnect } = useDisconnect();
  const { isPending, switchChainAsync } = useSwitchChain();
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const copiedTimer = useRef<number | undefined>(undefined);
  const correctNetwork = chainId === robinhoodChain.id;

  useEffect(
    () => () => {
      if (copiedTimer.current) window.clearTimeout(copiedTimer.current);
    },
    [],
  );

  const copyAddress = async () => {
    setFeedback(null);
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      if (copiedTimer.current) window.clearTimeout(copiedTimer.current);
      copiedTimer.current = window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setFeedback("Clipboard access was unavailable.");
    }
  };

  const switchNetwork = async () => {
    setFeedback(null);
    try {
      await switchChainAsync({ chainId: robinhoodChain.id });
    } catch (error) {
      setFeedback(getWalletErrorMessage(error, "switch"));
    }
  };

  const disconnectWallet = () => {
    disconnect();
    onClose();
  };

  return (
    <motion.div
      role="dialog"
      aria-label="Connected wallet"
      initial={reduceMotion ? false : { opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: reduceMotion ? 0 : -4 }}
      transition={{ duration: reduceMotion ? 0 : 0.18, ease: [0.22, 1, 0.36, 1] }}
      className="absolute right-0 top-[calc(100%+10px)] z-40 w-[286px] border border-border-strong bg-[#080b08] shadow-[0_18px_55px_rgba(0,0,0,0.5)]"
    >
      <div className="border-b border-border px-5 py-5">
        <p className="type-label text-text-muted">Connected wallet</p>
        <p className="mt-3 font-mono text-[13px] text-text-primary">
          {shortenAddress(address)}
        </p>
      </div>

      <div className="border-b border-border px-5 py-4">
        <p className="type-label text-text-muted">Network</p>
        {correctNetwork ? (
          <div className="mt-3 flex items-center justify-between">
            <span className="text-[13px] font-medium text-text-primary">Robinhood Chain</span>
            <span className="type-label flex items-center gap-2 text-lime">
              <LiveDot /> Connected
            </span>
          </div>
        ) : (
          <div className="mt-3">
            <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#b6a77a]">
              Wrong Network
            </p>
            <button
              type="button"
              disabled={isPending}
              onClick={switchNetwork}
              className="mt-4 flex h-9 w-full cursor-pointer items-center justify-center gap-2 border border-[#385629] bg-[#102317] text-[11px] font-semibold text-[#8dbf7d] transition-colors duration-200 hover:border-[#4a7140] hover:text-[#a6da95] disabled:cursor-wait disabled:opacity-60"
            >
              <RefreshCw aria-hidden="true" className={`size-3 ${isPending ? "animate-spin" : ""}`} />
              {isPending ? "Switching network" : "Switch to Robinhood Chain"}
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2">
        <button
          type="button"
          onClick={copyAddress}
          className="flex h-12 cursor-pointer items-center justify-center gap-2 border-r border-border text-[11px] font-medium text-text-secondary transition-colors duration-200 hover:bg-white/[0.025] hover:text-text-primary focus-visible:outline-1 focus-visible:outline-inset focus-visible:outline-lime"
        >
          {copied ? (
            <Check aria-hidden="true" className="size-3 text-lime" />
          ) : (
            <Copy aria-hidden="true" className="size-3" />
          )}
          {copied ? "Copied" : "Copy address"}
        </button>
        <button
          type="button"
          onClick={disconnectWallet}
          className="flex h-12 cursor-pointer items-center justify-center gap-2 text-[11px] font-medium text-text-secondary transition-colors duration-200 hover:bg-white/[0.025] hover:text-text-primary focus-visible:outline-1 focus-visible:outline-inset focus-visible:outline-lime"
        >
          <LogOut aria-hidden="true" className="size-3" />
          Disconnect
        </button>
      </div>

      {feedback ? (
        <p role="status" className="border-t border-border px-5 py-3 text-[10px] leading-4 text-[#b6a77a]">
          {feedback}
        </p>
      ) : null}
    </motion.div>
  );
}
