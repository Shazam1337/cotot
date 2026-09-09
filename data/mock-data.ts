export type Creator = {
  id: string;
  handle: `@${string}`;
  wallet: `0x${string}`;
  impactScore: number;
  earnedUsd: number;
  rank: number;
};

export type Signal = {
  id: string;
  creatorId: Creator["id"];
  postId: string;
  reach: number;
  engagements: number;
  impactUsd: number;
  capturedAt: string;
  status: "tracking" | "verified";
};

export type Payout = {
  id: string;
  creatorId: Creator["id"];
  amountUsd: number;
  transactionHash: `0x${string}`;
  paidAt: string;
  status: "confirmed" | "pending";
};

export type NetworkMetrics = {
  creatorPoolUsd: number;
  feesCapturedUsd: number;
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
  creatorPoolUsd: number;
  change24hPercent: number;
  updatedAt: string;
};

export const creators: Creator[] = [
  {
    id: "creator_001",
    handle: "@nora_chain",
    wallet: "0x71a9c46f8e0b4e8f0a16",
    impactScore: 94.8,
    earnedUsd: 12482.64,
    rank: 1,
  },
  {
    id: "creator_002",
    handle: "@blocksignal",
    wallet: "0x38e2d64175ab9fd03c42",
    impactScore: 91.2,
    earnedUsd: 9841.2,
    rank: 2,
  },
  {
    id: "creator_003",
    handle: "@miraonchain",
    wallet: "0x9c0a44de1287a315f906",
    impactScore: 87.6,
    earnedUsd: 7650.18,
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
    impactUsd: 1482.18,
    capturedAt: "2026-09-08T08:41:12.000Z",
    status: "verified",
  },
  {
    id: "signal_1283",
    creatorId: "creator_003",
    postId: "1894832485613210471",
    reach: 118900,
    engagements: 7241,
    impactUsd: 628.44,
    capturedAt: "2026-09-08T08:38:04.000Z",
    status: "tracking",
  },
];

export const payouts: Payout[] = [
  {
    id: "cut_0042_001",
    creatorId: "creator_001",
    amountUsd: 2184.32,
    transactionHash: "0x9d6e412a781cdf3b88436c9918ed",
    paidAt: "2026-09-08T04:00:00.000Z",
    status: "confirmed",
  },
  {
    id: "cut_0042_002",
    creatorId: "creator_002",
    amountUsd: 1640.88,
    transactionHash: "0x1abf8364dc25a09d88419146eb6f",
    paidAt: "2026-09-08T04:00:03.000Z",
    status: "confirmed",
  },
];

export const networkMetrics: NetworkMetrics = {
  creatorPoolUsd: 184291.42,
  feesCapturedUsd: 842381.2,
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
      { text: "BUY $481" },
      { text: "+$0.18 CREATOR POOL", tone: "lime" },
    ],
  },
  {
    id: "tape_reward",
    tokens: [
      { text: "13:48:07", tone: "muted" },
      { text: "@ALEX" },
      { text: "REWARD" },
      { text: "+$4.21", tone: "lime" },
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
      { text: "$8,423.81" },
    ],
  },
  {
    id: "tape_pool",
    tokens: [
      { text: "CREATOR POOL", tone: "muted" },
      { text: "$1,863.00", tone: "lime" },
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
    detail: "Est. cut $7.12",
    size: "large",
    placement: { top: "22%", left: "-1%" },
  },
  {
    id: "hero_paid",
    timestamp: "13:48:13",
    category: "Settled",
    creator: "@realDegen",
    value: "Paid $3.82",
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
  creatorPoolUsd: 1860.24,
  change24hPercent: 12.8,
  updatedAt: "2026-09-08T13:48:18.000Z",
};
