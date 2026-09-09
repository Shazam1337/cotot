import type { DemoSignalStatus } from "@/data/demo-scenario";

export type RewardSummary = {
  claimable: number;
  pending: number;
  lifetimeEarned: number;
  seasonEarned: number;
  paidCuts: number;
  rewardedSignals: number;
  earningRate24h: number;
};

export type RewardSignal = {
  id: `#${string}`;
  status: Extract<DemoSignalStatus, "tracking" | "scored" | "paid">;
  impact: number;
  reach: number;
  reward: number;
  estimated: boolean;
  cut: `#${string}`;
  excerpt: string;
};

export type RewardPayout = {
  date: string;
  cut: `#${string}`;
  amount: number;
  signals: number;
  status: "paid" | "pending";
  settlement: `#${string}`;
};

export type RewardActivity = {
  id: string;
  label: string;
  detail: string;
  time: string;
  status?: "live" | "queued";
};

export type RewardBreakdown = {
  total: number;
  signals: number;
  boosts: number;
  cutBonus: number;
};

export const mockRewardCreatorId = "mira";

export const initialRewardSummary: RewardSummary = {
  claimable: 18.42,
  pending: 6.84,
  lifetimeEarned: 74.28,
  seasonEarned: 42.16,
  paidCuts: 12,
  rewardedSignals: 19,
  earningRate24h: 2.84,
};

export const initialRewardSignals: RewardSignal[] = [
  { id: "#5012", status: "tracking", impact: 842, reach: 18_400, reward: 4.21, estimated: true, cut: "#0043", excerpt: "Creators should own part of the attention they create." },
  { id: "#5004", status: "scored", impact: 816, reach: 16_200, reward: 3.64, estimated: true, cut: "#0043", excerpt: "Distribution becomes infrastructure when attribution is visible." },
  { id: "#4988", status: "paid", impact: 791, reach: 14_800, reward: 3.82, estimated: false, cut: "#0042", excerpt: "Markets already price liquidity. Credible attention should be next." },
  { id: "#4961", status: "paid", impact: 724, reach: 9_400, reward: 2.18, estimated: false, cut: "#0042", excerpt: "A useful signal can travel much further than its original post." },
  { id: "#4937", status: "paid", impact: 768, reach: 12_100, reward: 2.74, estimated: false, cut: "#0041", excerpt: "The creator layer is part of the market, not decoration around it." },
  { id: "#4912", status: "paid", impact: 706, reach: 8_700, reward: 1.86, estimated: false, cut: "#0040", excerpt: "Transparent rewards make contribution legible." },
];

export const rewardPayouts: RewardPayout[] = [
  { date: "Sep 08", cut: "#0042", amount: 8.74, signals: 4, status: "paid", settlement: "#0048" },
  { date: "Sep 07", cut: "#0041", amount: 6.82, signals: 3, status: "paid", settlement: "#0042" },
  { date: "Sep 06", cut: "#0040", amount: 4.21, signals: 2, status: "paid", settlement: "#0039" },
  { date: "Sep 04", cut: "#0039", amount: 5.64, signals: 3, status: "paid", settlement: "#0034" },
  { date: "Sep 02", cut: "#0038", amount: 3.82, signals: 2, status: "paid", settlement: "#0029" },
  { date: "Aug 31", cut: "#0037", amount: 7.12, signals: 3, status: "paid", settlement: "#0025" },
  { date: "Aug 29", cut: "#0036", amount: 4.68, signals: 2, status: "paid", settlement: "#0021" },
];

export const rewardBreakdown: RewardBreakdown = {
  total: 42.16,
  signals: 34.82,
  boosts: 4.21,
  cutBonus: 3.13,
};

export const initialRewardActivity: RewardActivity[] = [
  { id: "activity-5012", label: "Signal #5012 entered Tracking", detail: "Estimated Cut +$0.12", time: "2m ago", status: "live" },
  { id: "activity-score", label: "Don Score +2", detail: "Creator reputation updated", time: "18m ago" },
  { id: "activity-0042", label: "Cut #0042 settled", detail: "$8.74 paid", time: "1h ago" },
  { id: "activity-4988", label: "Signal #4988 paid", detail: "Settlement #0048", time: "1h ago" },
];

export const personalPerformance = {
  signals: 19,
  avgImpact: 748,
  totalReach: 184_000,
  donScore: 941,
  seasonRank: "#01",
} as const;

export const currentRewardCut = {
  id: "#0043",
  status: "Accumulating",
  settlementQueueId: "#0051",
} as const;

export const rewardLiveCadenceMs = [12_000, 15_000, 11_000, 17_000] as const;
