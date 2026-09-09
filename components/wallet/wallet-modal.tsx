"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Wallet, X } from "lucide-react";
import { useConnect, useConnectors } from "wagmi";
import { getWalletErrorMessage } from "@/lib/wallet";

const walletLabels: Record<string, string> = {
  browserWallet: "Browser Wallet",
};

export function WalletModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const reduceMotion = useReducedMotion();
  const connectors = useConnectors();
  const { connectAsync, isPending, variables, reset } = useConnect();
  const [availability, setAvailability] = useState<Record<string, boolean>>({});
  const [feedback, setFeedback] = useState<string | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    let cancelled = false;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isPending) onClose();
    };
    document.addEventListener("keydown", handleKeyDown);

    Promise.all(
      connectors.map(async (connector) => {
        try {
          return [connector.uid, Boolean(await connector.getProvider())] as const;
        } catch {
          return [connector.uid, false] as const;
        }
      }),
    ).then((entries) => {
      if (!cancelled) setAvailability(Object.fromEntries(entries));
    });

    return () => {
      cancelled = true;
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [connectors, isPending, onClose, open]);

  const hasDetectedWallet = useMemo(
    () => connectors.some((connector) => availability[connector.uid]),
    [availability, connectors],
  );
  const detectionComplete = connectors.every(
    (connector) => availability[connector.uid] !== undefined,
  );
  const availableConnectors = useMemo(() => {
    const detected = connectors.filter((connector) => availability[connector.uid]);
    const discovered = detected.filter((connector) => connector.id !== "browserWallet");
    return discovered.length > 0 ? discovered : detected;
  }, [availability, connectors]);

  const closeModal = () => {
    if (isPending) return;
    reset();
    setFeedback(null);
    onClose();
  };

  const connectWallet = async (connector: (typeof connectors)[number]) => {
    setFeedback(null);
    reset();

    try {
      await connectAsync({ connector });
      setFeedback(null);
      onClose();
    } catch (error) {
      setFeedback(getWalletErrorMessage(error, "connect"));
    }
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center px-6"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.18 }}
        >
          <button
            type="button"
            disabled={isPending}
            aria-label="Close wallet dialog"
            onClick={closeModal}
            className="absolute inset-0 cursor-default bg-black/76"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="wallet-dialog-heading"
            initial={reduceMotion ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduceMotion ? 0 : 4 }}
            transition={{ duration: reduceMotion ? 0 : 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-[430px] border border-border-strong bg-[#080b08] shadow-[0_24px_80px_rgba(0,0,0,0.48)]"
          >
            <div className="flex items-start justify-between border-b border-border px-7 py-6">
              <div>
                <p className="type-label text-lime">Wallet access</p>
                <h2
                  id="wallet-dialog-heading"
                  className="mt-4 text-[24px] font-semibold tracking-[-0.035em] text-text-primary"
                >
                  Connect to DONS
                </h2>
                <p className="mt-2 text-[13px] leading-5 text-text-secondary">
                  Connect an EVM wallet to enter the network.
                </p>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                disabled={isPending}
                onClick={closeModal}
                aria-label="Close"
                className="grid size-8 cursor-pointer place-items-center border border-border text-text-muted transition-colors duration-200 hover:border-border-strong hover:text-text-primary focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-lime"
              >
                <X aria-hidden="true" className="size-3.5" strokeWidth={1.7} />
              </button>
            </div>

            <div className="px-7 py-5">
              <div className="border-y border-border">
                {!detectionComplete ? (
                  <div className="flex h-[58px] items-center justify-between px-1">
                    <span className="text-[13px] text-text-secondary">Detecting browser wallets</span>
                    <span className="type-label text-text-muted">Checking</span>
                  </div>
                ) : null}
                {availableConnectors.map((connector) => {
                  const available = availability[connector.uid];
                  const pending = isPending && variables?.connector === connector;

                  return (
                    <button
                      key={connector.uid}
                      type="button"
                      disabled={isPending}
                      onClick={() => connectWallet(connector)}
                      className="group flex h-[58px] w-full items-center justify-between border-b border-border px-1 text-left transition-colors duration-200 last:border-b-0 enabled:cursor-pointer enabled:hover:bg-white/[0.025] disabled:cursor-not-allowed"
                    >
                      <span className="flex items-center gap-3.5">
                        <span className="grid size-8 place-items-center border border-border bg-surface/35 text-text-muted transition-colors duration-200 group-enabled:group-hover:border-border-strong group-enabled:group-hover:text-text-primary">
                          <Wallet aria-hidden="true" className="size-3.5" strokeWidth={1.6} />
                        </span>
                        <span className="text-[14px] font-medium text-text-primary">
                          {walletLabels[connector.id] ?? connector.name}
                        </span>
                      </span>
                      <span
                        className={`text-[9px] font-semibold uppercase tracking-[0.1em] ${
                          available ? "text-lime" : "text-text-muted"
                        }`}
                      >
                        {pending
                          ? "Connecting"
                          : available
                            ? "Available"
                            : "Unavailable"}
                      </span>
                    </button>
                  );
                })}
              </div>

              {detectionComplete && !hasDetectedWallet ? (
                <div className="mt-5 border-l border-[#385629] pl-4">
                  <p className="text-[12px] font-medium text-text-primary">
                    No EVM wallet detected.
                  </p>
                  <p className="mt-1.5 text-[11px] text-text-muted">
                    Install MetaMask or Rabby to continue.
                  </p>
                </div>
              ) : null}

              {feedback ? (
                <p role="status" className="mt-5 text-[11px] leading-4 text-[#b6a77a]">
                  {feedback}
                </p>
              ) : null}
            </div>

            <div className="flex items-center justify-between border-t border-border px-7 py-4 font-mono text-[8px] uppercase tracking-[0.1em] text-text-muted">
              <span>EIP-1193</span>
              <span>Connection only · no signing</span>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
