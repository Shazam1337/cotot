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
  claimable: 0.1842,
  pending: 0.0684,
  lifetimeEarned: 0.7428,
  seasonEarned: 0.4216,
  paidCuts: 12,
  rewardedSignals: 19,
  earningRate24h: 0.0284,
};

export const initialRewardSignals: RewardSignal[] = [
  { id: "#5012", status: "tracking", impact: 842, reach: 18_400, reward: 0.0421, estimated: true, cut: "#0043", excerpt: "Event response is increasing across the tracked audience." },
  { id: "#5004", status: "scored", impact: 816, reach: 16_200, reward: 0.0364, estimated: true, cut: "#0043", excerpt: "Contribution scored and awaiting the current distribution cycle." },
  { id: "#4988", status: "paid", impact: 791, reach: 14_800, reward: 0.0382, estimated: false, cut: "#0042", excerpt: "Allocation finalized and attached to the event record." },
  { id: "#4961", status: "paid", impact: 724, reach: 9_400, reward: 0.0218, estimated: false, cut: "#0042", excerpt: "Verified reach carried through to the completed cycle." },
  { id: "#4937", status: "paid", impact: 768, reach: 12_100, reward: 0.0274, estimated: false, cut: "#0041", excerpt: "Measured response produced a contributor allocation." },
  { id: "#4912", status: "paid", impact: 706, reach: 8_700, reward: 0.0186, estimated: false, cut: "#0040", excerpt: "The completed distribution is visible in Records." },
];

export const rewardPayouts: RewardPayout[] = [
  { date: "Sep 08", cut: "#0042", amount: 0.0874, signals: 4, status: "paid", settlement: "#0048" },
  { date: "Sep 07", cut: "#0041", amount: 0.0682, signals: 3, status: "paid", settlement: "#0042" },
  { date: "Sep 06", cut: "#0040", amount: 0.0421, signals: 2, status: "paid", settlement: "#0039" },
  { date: "Sep 04", cut: "#0039", amount: 0.0564, signals: 3, status: "paid", settlement: "#0034" },
  { date: "Sep 02", cut: "#0038", amount: 0.0382, signals: 2, status: "paid", settlement: "#0029" },
  { date: "Aug 31", cut: "#0037", amount: 0.0712, signals: 3, status: "paid", settlement: "#0025" },
  { date: "Aug 29", cut: "#0036", amount: 0.0468, signals: 2, status: "paid", settlement: "#0021" },
];

export const rewardBreakdown: RewardBreakdown = {
  total: 0.4216,
  signals: 0.3482,
  boosts: 0.0421,
  cutBonus: 0.0313,
};

export const initialRewardActivity: RewardActivity[] = [
  { id: "activity-5012", label: "Event #5012 entered tracking", detail: "Estimated allocation +0.0012 SOL", time: "2m ago", status: "live" },
  { id: "activity-score", label: "Contribution score +2", detail: "Contributor profile updated", time: "18m ago" },
  { id: "activity-0042", label: "Cycle #0042 completed", detail: "0.0874 SOL modeled", time: "1h ago" },
  { id: "activity-4988", label: "Event #4988 distributed", detail: "Record #0048", time: "1h ago" },
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
