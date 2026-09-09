import type { DemoSignalStatus } from "@/data/demo-scenario";
import {
  creatorById,
  creatorRangeSnapshots,
  type Creator,
} from "@/data/creators";

export type WireCreator = Creator & {
  donScore: number;
};

export type WireMedia = {
  kicker: string;
  headline: string;
  note: string;
};

export type WireSignal = {
  id: string;
  sequence: number;
  creatorId: WireCreator["id"];
  status: DemoSignalStatus;
  timestamp: string;
  relativeTime: string;
  impact: number;
  estimatedCut: number;
  impressions: number;
  engagements: number;
  engagementRate: number;
  post: string;
  media?: WireMedia;
  hot?: boolean;
  velocity?: number;
};

const wireCreatorIds = [
  "mira", "julian", "nora", "benji", "alex", "kira", "harvey", "zoe",
  "fox", "kate", "matt", "stella", "noah", "leo",
] as const;

const seasonScores = new Map(
  creatorRangeSnapshots.season.map((snapshot) => [
    snapshot.creatorId,
    snapshot.metrics.donScore,
  ]),
);

export const wireCreators: WireCreator[] = wireCreatorIds.map((creatorId) => ({
  ...creatorById[creatorId],
  donScore: seasonScores.get(creatorId) ?? 700,
}));

export const wireSignals: WireSignal[] = [
  {
    id: "04308", sequence: 4308, creatorId: "mira", status: "tracking", timestamp: "14:18:42", relativeTime: "11m ago",
    impact: 812, estimatedCut: 4.82, impressions: 18400, engagements: 742, engagementRate: 4.0, hot: true, velocity: 28,
    post: "DONS is one of the more interesting experiments on Robinhood Chain right now. Instead of paying creators upfront, it routes part of trading fees back to the people generating attention.",
    media: { kicker: "Creator revenue network", headline: "ATTENTION EARNS.", note: "Every verified signal enters the cut." },
  },
  {
    id: "04307", sequence: 4307, creatorId: "julian", status: "verified", timestamp: "14:15:26", relativeTime: "14m ago",
    impact: 693, estimatedCut: 3.61, impressions: 15200, engagements: 589, engagementRate: 3.9,
    post: "The useful idea here is attribution. A market can finally see which voices created the demand before the volume arrived.",
  },
  {
    id: "04306", sequence: 4306, creatorId: "nora", status: "paid", timestamp: "14:12:08", relativeTime: "17m ago",
    impact: 871, estimatedCut: 6.24, impressions: 21600, engagements: 1012, engagementRate: 4.7,
    post: "A creator network becomes durable when distribution is measurable and settlement is visible. That feedback loop matters more than another points program.",
  },
  {
    id: "04305", sequence: 4305, creatorId: "benji", status: "detected", timestamp: "14:09:51", relativeTime: "20m ago",
    impact: 438, estimatedCut: 1.18, impressions: 7100, engagements: 263, engagementRate: 3.7,
    post: "Watching Robinhood Chain get its own native attention layer. Early, but the mechanism is clean.",
  },
  {
    id: "04304", sequence: 4304, creatorId: "alex", status: "scored", timestamp: "14:06:34", relativeTime: "23m ago",
    impact: 934, estimatedCut: 9.42, impressions: 30100, engagements: 1498, engagementRate: 5.0,
    post: "Markets already pay for liquidity and execution. Paying for credible distribution is the next obvious primitive.",
    media: { kicker: "Impact scored", headline: "934 IMPACT.", note: "Signal velocity reached the top 2%." },
  },
  {
    id: "04303", sequence: 4303, creatorId: "kira", status: "tracking", timestamp: "14:02:19", relativeTime: "27m ago",
    impact: 776, estimatedCut: 5.14, impressions: 17900, engagements: 804, engagementRate: 4.5,
    post: "The strongest part of DONS is that the reward is downstream of actual response. No engagement theater, just measured contribution.",
  },
  {
    id: "04302", sequence: 4302, creatorId: "harvey", status: "paid", timestamp: "13:58:46", relativeTime: "31m ago",
    impact: 721, estimatedCut: 4.21, impressions: 16300, engagements: 675, engagementRate: 4.1,
    post: "Signal settled. Small payout, real attribution, public trail. This is how creator incentives should begin.",
  },
  {
    id: "04301", sequence: 4301, creatorId: "zoe", status: "verified", timestamp: "13:55:12", relativeTime: "34m ago",
    impact: 584, estimatedCut: 2.46, impressions: 10800, engagements: 419, engagementRate: 3.9,
    post: "Communities are part of market infrastructure. DONS is making that contribution legible instead of pretending it is free.",
  },
  {
    id: "04300", sequence: 4300, creatorId: "fox", status: "scored", timestamp: "13:51:03", relativeTime: "38m ago",
    impact: 748, estimatedCut: 4.72, impressions: 17100, engagements: 733, engagementRate: 4.3,
    post: "Fee routing is more interesting when the allocation follows demonstrated impact rather than follower count.",
  },
  {
    id: "04299", sequence: 4299, creatorId: "kate", status: "tracking", timestamp: "13:47:38", relativeTime: "42m ago",
    impact: 826, estimatedCut: 5.68, impressions: 19700, engagements: 906, engagementRate: 4.6,
    post: "Robinhood Chain needs apps that feel native to finance but still understand culture. This creator revenue layer is a good signal.",
    media: { kicker: "Tracking live", headline: "CULTURE MOVES VALUE.", note: "Reach is compounding across the network." },
  },
  {
    id: "04298", sequence: 4298, creatorId: "matt", status: "detected", timestamp: "13:43:20", relativeTime: "46m ago",
    impact: 361, estimatedCut: 0.84, impressions: 4900, engagements: 181, engagementRate: 3.7,
    post: "New distribution rails are forming around attention. Keeping an eye on how DONS separates noise from useful reach.",
  },
  {
    id: "04297", sequence: 4297, creatorId: "stella", status: "paid", timestamp: "13:39:17", relativeTime: "50m ago",
    impact: 702, estimatedCut: 3.96, impressions: 13900, engagements: 604, engagementRate: 4.3,
    post: "Contribution should be provable without making creators operate a dashboard all day. Detection, scoring, settlement — done.",
  },
  {
    id: "04296", sequence: 4296, creatorId: "noah", status: "verified", timestamp: "13:35:04", relativeTime: "54m ago",
    impact: 529, estimatedCut: 2.18, impressions: 9200, engagements: 348, engagementRate: 3.8,
    post: "The creator economy does not need another sponsorship marketplace. It needs transparent participation in the value it creates.",
  },
  {
    id: "04295", sequence: 4295, creatorId: "leo", status: "scored", timestamp: "13:31:42", relativeTime: "58m ago",
    impact: 667, estimatedCut: 3.38, impressions: 12800, engagements: 526, engagementRate: 4.1,
    post: "A post becomes infrastructure when it reliably moves a network. DONS is trying to price that transition.",
  },
  {
    id: "04294", sequence: 4294, creatorId: "mira", status: "paid", timestamp: "13:27:18", relativeTime: "1h ago",
    impact: 758, estimatedCut: 5.24, impressions: 17500, engagements: 761, engagementRate: 4.3,
    post: "First DONS cut landed. The amount is modest, which makes the mechanism feel more credible at this stage — real usage before scale.",
  },
];

export const liveSignalTemplates: Omit<WireSignal, "id" | "sequence" | "timestamp" | "relativeTime">[] = [
  {
    creatorId: "zoe", status: "detected", impact: 412, estimatedCut: 1.14, impressions: 6200, engagements: 237, engagementRate: 3.8,
    post: "Fresh signal: creators are starting to treat distribution as something measurable, not just a vague social outcome.",
  },
  {
    creatorId: "matt", status: "verified", impact: 548, estimatedCut: 2.74, impressions: 9800, engagements: 401, engagementRate: 4.1,
    post: "The interesting part is not the leaderboard. It is the settlement trail connecting a piece of attention to a real cut.",
  },
  {
    creatorId: "kate", status: "tracking", impact: 784, estimatedCut: 5.92, impressions: 18100, engagements: 842, engagementRate: 4.7,
    post: "DONS activity is accelerating into the current cut. Creator attribution looks increasingly like core market data.",
  },
];

export const wireStatusLabels: Record<DemoSignalStatus, string> = {
  detected: "Detected",
  verified: "Verified",
  tracking: "Tracking",
  scored: "Scored",
  paid: "Paid",
};

export const wireLiveCadenceMs = [9000, 11000, 8000, 10000] as const;
