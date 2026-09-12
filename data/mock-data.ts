export type Creator = {
  id: string;
  handle: `@${string}`;
  wallet: string;
  impactScore: number;
  earnedSol: number;
  rank: number;
};

export type Signal = {
  id: string;
  creatorId: Creator["id"];
  postId: string;
  reach: number;
  engagements: number;
  impactSol: number;
  capturedAt: string;
  status: "tracking" | "verified";
};

export type Payout = {
  id: string;
  creatorId: Creator["id"];
  amountSol: number;
  transactionSignature: string;
  paidAt: string;
  status: "confirmed" | "pending";
};

export type NetworkMetrics = {
  creatorPoolSol: number;
  feesCapturedSol: number;
  creatorsPaid: number;
  liveSignals: number;
  cutsCompleted: number;
  nextCutSeconds: number;
  updatedAt: string;
};

export type TapeToken = {
  text: string;
  tone?: "default" | "muted" | "lime";
};

export type TapeItem = {
  id: string;
  tokens: TapeToken[];
};

export type HeroActivityEvent = {
  id: string;
  timestamp: string;
  category: string;
  creator: string;
  value: string;
  detail?: string;
  accent?: boolean;
  size: "small" | "medium" | "large";
  placement: {
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
  };
};

export type HeroEconomics = {
  creatorPoolSol: number;
  change24hPercent: number;
  updatedAt: string;
};

export const creators: Creator[] = [
  {
    id: "creator_001",
    handle: "@nora_chain",
    wallet: "7YttLkHDo3nRX2QKxNmA8c6veTq9pJwWmB4uFZs1dEoP",
    impactScore: 94.8,
    earnedSol: 124.8264,
    rank: 1,
  },
  {
    id: "creator_002",
    handle: "@blocksignal",
    wallet: "4mJQ7VxkQnE2Pp9WTcL6aH3zYgU8bNsR5dKf1oXaCev",
    impactScore: 91.2,
    earnedSol: 98.412,
    rank: 2,
  },
  {
    id: "creator_003",
    handle: "@miraonchain",
    wallet: "9bKx2FdTq5Wm8LcR3vPn6YhJ1sAeUoG7zQ4NwCkXEtM",
    impactScore: 87.6,
    earnedSol: 76.5018,
    rank: 3,
  },
];

export const signals: Signal[] = [
  {
    id: "signal_1284",
    creatorId: "creator_001",
    postId: "1894837120468129954",
    reach: 286400,
    engagements: 18420,
    impactSol: 14.8218,
    capturedAt: "2026-09-08T08:41:12.000Z",
    status: "verified",
  },
  {
    id: "signal_1283",
    creatorId: "creator_003",
    postId: "1894832485613210471",
    reach: 118900,
    engagements: 7241,
    impactSol: 6.2844,
    capturedAt: "2026-09-08T08:38:04.000Z",
    status: "tracking",
  },
];

export const payouts: Payout[] = [
  {
    id: "cut_0042_001",
    creatorId: "creator_001",
    amountSol: 21.8432,
    transactionSignature: "5KzQp7vL2wNm8dRt4xHy9cAe1FjU6oGs3BbTqVnWkXP",
    paidAt: "2026-09-08T04:00:00.000Z",
    status: "confirmed",
  },
  {
    id: "cut_0042_002",
    creatorId: "creator_002",
    amountSol: 16.4088,
    transactionSignature: "3QaJ8mVt6xNc2Rp9YkE5wFs7uHg1oLd4bBZqPnKXWeT",
    paidAt: "2026-09-08T04:00:03.000Z",
    status: "confirmed",
  },
];

export const networkMetrics: NetworkMetrics = {
  creatorPoolSol: 1842.9142,
  feesCapturedSol: 8423.812,
  creatorsPaid: 482,
  liveSignals: 1284,
  cutsCompleted: 42,
  nextCutSeconds: 15522,
  updatedAt: "2026-09-08T08:42:18.000Z",
};

export const donsTapeItems: TapeItem[] = [
  {
    id: "tape_live",
    tokens: [{ text: "LIVE", tone: "lime" }],
  },
  {
    id: "tape_signal_mike",
    tokens: [
      { text: "13:48:01", tone: "muted" },
      { text: "@MIKE" },
      { text: "POST VERIFIED" },
      { text: "SCORE 821", tone: "lime" },
    ],
  },
  {
    id: "tape_buy",
    tokens: [
      { text: "13:48:04", tone: "muted" },
      { text: "BUY 4.81 SOL" },
      { text: "+0.0018 SOL CREATOR POOL", tone: "lime" },
    ],
  },
  {
    id: "tape_reward",
    tokens: [
      { text: "13:48:07", tone: "muted" },
      { text: "@ALEX" },
      { text: "REWARD" },
      { text: "+0.0421 SOL", tone: "lime" },
    ],
  },
  {
    id: "tape_reach",
    tokens: [
      { text: "13:48:11", tone: "muted" },
      { text: "TOTAL REACH" },
      { text: "4,821,442", tone: "lime" },
    ],
  },
  {
    id: "tape_creator",
    tokens: [
      { text: "13:48:18", tone: "muted" },
      { text: "NEW CREATOR" },
      { text: "@JOHN", tone: "lime" },
    ],
  },
  {
    id: "tape_cut",
    tokens: [
      { text: "13:48:22", tone: "muted" },
      { text: "CUT 0042" },
      { text: "SETTLED", tone: "lime" },
    ],
  },
  {
    id: "tape_fees",
    tokens: [
      { text: "FEES CAPTURED", tone: "muted" },
      { text: "84.2381 SOL" },
    ],
  },
  {
    id: "tape_pool",
    tokens: [
      { text: "CREATOR POOL", tone: "muted" },
      { text: "18.63 SOL", tone: "lime" },
    ],
  },
];

export const heroActivityEvents: HeroActivityEvent[] = [
  {
    id: "hero_stacy",
    timestamp: "13:48:07",
    category: "Impact",
    creator: "@stacy",
    value: "Impact 892",
    detail: "Est. cut 0.0712 SOL",
    size: "large",
    placement: { top: "22%", left: "-1%" },
  },
  {
    id: "hero_paid",
    timestamp: "13:48:13",
    category: "Settled",
    creator: "@realDegen",
    value: "Paid 0.0382 SOL",
    accent: true,
    size: "medium",
    placement: { right: "16%", bottom: "17%" },
  },
  {
    id: "hero_signal",
    timestamp: "13:48:18",
    category: "Signal detected",
    creator: "@lunarvibe",
    value: "Signal detected",
    size: "small",
    placement: { bottom: "9%", left: "10%" },
  },
];

export const heroEconomics: HeroEconomics = {
  creatorPoolSol: 18.6024,
  change24hPercent: 12.8,
  updatedAt: "2026-09-08T13:48:18.000Z",
};
