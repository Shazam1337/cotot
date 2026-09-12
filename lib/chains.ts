export const solanaMainnet = {
  name: "Solana",
  cluster: "mainnet-beta",
  nativeCurrency: {
    name: "Solana",
    symbol: "SOL",
    decimals: 9,
  },
  rpcUrl: "https://api.mainnet-beta.solana.com",
  explorerUrl: "https://explorer.solana.com",
} as const;
