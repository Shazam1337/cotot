"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, Copy, LogOut } from "lucide-react";
import { LiveDot } from "@/components/ui/live-dot";
import { useWallet } from "@/components/wallet/wallet-provider";
import { shortenAddress } from "@/lib/wallet";

type WalletMenuProps = {
  address: string;
  onClose: () => void;
};

export function WalletMenu({ address, onClose }: WalletMenuProps) {
  const reduceMotion = useReducedMotion();
  const { disconnect } = useWallet();
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const copiedTimer = useRef<number | undefined>(undefined);

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

  const disconnectWallet = async () => {
    await disconnect();
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
      className="theme-dark absolute right-0 top-[calc(100%+10px)] z-40 w-[286px] border border-border-strong bg-[#10231d] shadow-[0_18px_55px_rgba(0,0,0,0.5)]"
    >
      <div className="border-b border-border px-5 py-5">
        <p className="type-label text-text-muted">Connected wallet</p>
        <p className="mt-3 font-mono text-[13px] text-text-primary">
          {shortenAddress(address)}
        </p>
      </div>

      <div className="border-b border-border px-5 py-4">
        <p className="type-label text-text-muted">Wallet type</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-[13px] font-medium text-text-primary">Solana compatible</span>
          <span className="type-label flex items-center gap-2 text-lime">
            <LiveDot /> Connected
          </span>
        </div>
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
          onClick={() => void disconnectWallet()}
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
