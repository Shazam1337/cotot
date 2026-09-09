"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createConfig, http, WagmiProvider } from "wagmi";
import { injected } from "wagmi/connectors";
import { WalletModal } from "@/components/wallet/wallet-modal";
import { robinhoodChain } from "@/lib/chains";

type WalletModalControls = {
  openWalletModal: () => void;
};

const WalletModalContext = createContext<WalletModalControls | null>(null);

export const walletConfig = createConfig({
  chains: [robinhoodChain],
  connectors: [
    injected({
      target: {
        id: "browserWallet",
        name: "Browser Wallet",
        provider: (browserWindow) => browserWindow?.ethereum,
      },
      shimDisconnect: true,
    }),
  ],
  multiInjectedProviderDiscovery: true,
  ssr: true,
  transports: {
    [robinhoodChain.id]: http(robinhoodChain.rpcUrls.default.http[0]),
  },
});

export function WalletProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [modalOpen, setModalOpen] = useState(false);
  const openWalletModal = useCallback(() => setModalOpen(true), []);
  const modalControls = useMemo(() => ({ openWalletModal }), [openWalletModal]);

  return (
    <WagmiProvider config={walletConfig} reconnectOnMount>
      <QueryClientProvider client={queryClient}>
        <WalletModalContext.Provider value={modalControls}>
          {children}
          <WalletModal open={modalOpen} onClose={() => setModalOpen(false)} />
        </WalletModalContext.Provider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export function useWalletModal() {
  const controls = useContext(WalletModalContext);
  if (!controls) throw new Error("useWalletModal must be used within WalletProvider");
  return controls;
}
