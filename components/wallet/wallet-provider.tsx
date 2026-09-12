"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { WalletModal } from "@/components/wallet/wallet-modal";

type PublicKeyLike = {
  toBase58?: () => string;
  toString: () => string;
};

export type SolanaWalletProvider = {
  isConnected?: boolean;
  publicKey?: PublicKeyLike | null;
  connect: (options?: { onlyIfTrusted?: boolean }) => Promise<{ publicKey?: PublicKeyLike }>;
  disconnect: () => Promise<void>;
  on?: (event: "accountChanged" | "disconnect", listener: (value?: PublicKeyLike | null) => void) => void;
  off?: (event: "accountChanged" | "disconnect", listener: (value?: PublicKeyLike | null) => void) => void;
};

export type DetectedSolanaWallet = {
  id: "phantom" | "solflare" | "backpack";
  name: string;
  provider: SolanaWalletProvider;
};

declare global {
  interface Window {
    solana?: SolanaWalletProvider & { isPhantom?: boolean };
    phantom?: { solana?: SolanaWalletProvider };
    solflare?: SolanaWalletProvider;
    backpack?: { solana?: SolanaWalletProvider };
  }
}

type WalletContextValue = {
  address: string | null;
  isConnected: boolean;
  isReconnecting: boolean;
  wallets: DetectedSolanaWallet[];
  detectionComplete: boolean;
  connectingWalletId: string | null;
  connect: (wallet: DetectedSolanaWallet) => Promise<void>;
  disconnect: () => Promise<void>;
  openWalletModal: () => void;
};

const WalletContext = createContext<WalletContextValue | null>(null);

function publicKeyToString(publicKey?: PublicKeyLike | null) {
  if (!publicKey) return null;
  return publicKey.toBase58?.() ?? publicKey.toString();
}

function detectSolanaWallets() {
  const candidates: Array<DetectedSolanaWallet | null> = [
    window.phantom?.solana
      ? { id: "phantom", name: "Phantom", provider: window.phantom.solana }
      : window.solana?.isPhantom
        ? { id: "phantom", name: "Phantom", provider: window.solana }
        : null,
    window.solflare
      ? { id: "solflare", name: "Solflare", provider: window.solflare }
      : null,
    window.backpack?.solana
      ? { id: "backpack", name: "Backpack", provider: window.backpack.solana }
      : null,
  ];
  const seen = new Set<SolanaWalletProvider>();

  return candidates.filter((wallet): wallet is DetectedSolanaWallet => {
    if (!wallet || seen.has(wallet.provider)) return false;
    seen.add(wallet.provider);
    return true;
  });
}

export function WalletProvider({ children }: { children: ReactNode }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [wallets, setWallets] = useState<DetectedSolanaWallet[]>([]);
  const [detectionComplete, setDetectionComplete] = useState(false);
  const [isReconnecting, setIsReconnecting] = useState(true);
  const [connectingWalletId, setConnectingWalletId] = useState<string | null>(null);
  const [activeProvider, setActiveProvider] = useState<SolanaWalletProvider | null>(null);
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const initialize = async () => {
      const detected = detectSolanaWallets();
      if (cancelled) return;
      setWallets(detected);

      let connected = detected.find(
        ({ provider }) => provider.isConnected && publicKeyToString(provider.publicKey),
      );

      if (!connected) {
        const phantom = detected.find(({ id }) => id === "phantom");
        if (phantom) {
          try {
            await phantom.provider.connect({ onlyIfTrusted: true });
            connected = phantom;
          } catch {
            // A trusted session is optional; the user can connect from the modal.
          }
        }
      }

      if (!cancelled && connected) {
        setActiveProvider(connected.provider);
        setAddress(publicKeyToString(connected.provider.publicKey));
      }
      if (!cancelled) {
        setDetectionComplete(true);
        setIsReconnecting(false);
      }
    };

    void initialize();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!activeProvider?.on) return;

    const handleAccountChanged = (publicKey?: PublicKeyLike | null) => {
      const nextAddress = publicKeyToString(publicKey);
      setAddress(nextAddress);
      if (!nextAddress) setActiveProvider(null);
    };
    const handleDisconnect = () => {
      setAddress(null);
      setActiveProvider(null);
    };

    activeProvider.on("accountChanged", handleAccountChanged);
    activeProvider.on("disconnect", handleDisconnect);
    return () => {
      activeProvider.off?.("accountChanged", handleAccountChanged);
      activeProvider.off?.("disconnect", handleDisconnect);
    };
  }, [activeProvider]);

  const connect = useCallback(async (wallet: DetectedSolanaWallet) => {
    setConnectingWalletId(wallet.id);
    try {
      const result = await wallet.provider.connect();
      const nextAddress = publicKeyToString(result.publicKey ?? wallet.provider.publicKey);
      if (!nextAddress) throw new Error("Wallet did not return a public key.");
      setActiveProvider(wallet.provider);
      setAddress(nextAddress);
    } finally {
      setConnectingWalletId(null);
    }
  }, []);

  const disconnect = useCallback(async () => {
    try {
      await activeProvider?.disconnect();
    } finally {
      setAddress(null);
      setActiveProvider(null);
    }
  }, [activeProvider]);

  const openWalletModal = useCallback(() => setModalOpen(true), []);
  const value = useMemo(
    () => ({
      address,
      isConnected: Boolean(address),
      isReconnecting,
      wallets,
      detectionComplete,
      connectingWalletId,
      connect,
      disconnect,
      openWalletModal,
    }),
    [address, connect, connectingWalletId, detectionComplete, disconnect, isReconnecting, openWalletModal, wallets],
  );

  return (
    <WalletContext.Provider value={value}>
      {children}
      <WalletModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const wallet = useContext(WalletContext);
  if (!wallet) throw new Error("useWallet must be used within WalletProvider");
  return wallet;
}

export function useWalletModal() {
  const { openWalletModal } = useWallet();
  return { openWalletModal };
}
