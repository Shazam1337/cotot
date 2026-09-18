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
    impact: 812, estimatedCut: 0.0482, impressions: 18400, engagements: 742, engagementRate: 4.0, hot: true, velocity: 28,
    post: "ONIX now links public activity to a contribution record. Each event has a source, a status, and a measurable downstream response.",
    media: { kicker: "Attribution engine", headline: "ACTIVITY, LINKED.", note: "Each verified event enters a distribution cycle." },
  },
  {
    id: "04307", sequence: 4307, creatorId: "julian", status: "verified", timestamp: "14:15:26", relativeTime: "14m ago",
    impact: 693, estimatedCut: 0.0361, impressions: 15200, engagements: 589, engagementRate: 3.9,
    post: "Attribution makes the origin of network demand visible. This event is verified and awaiting a contribution score.",
  },
  {
    id: "04306", sequence: 4306, creatorId: "nora", status: "paid", timestamp: "14:12:08", relativeTime: "17m ago",
    impact: 871, estimatedCut: 0.0624, impressions: 21600, engagements: 1012, engagementRate: 4.7,
    post: "The previous cycle assigned a measurable share to this contributor. The distribution record is now available for inspection.",
  },
  {
    id: "04305", sequence: 4305, creatorId: "benji", status: "detected", timestamp: "14:09:51", relativeTime: "20m ago",
    impact: 438, estimatedCut: 0.0118, impressions: 7100, engagements: 263, engagementRate: 3.7,
    post: "New public activity detected on the network. Reach and response metrics are being collected.",
  },
  {
    id: "04304", sequence: 4304, creatorId: "alex", status: "scored", timestamp: "14:06:34", relativeTime: "23m ago",
    impact: 934, estimatedCut: 0.0942, impressions: 30100, engagements: 1498, engagementRate: 5.0,
    post: "This contributor generated high response across multiple audiences. The activity received a 934 contribution score.",
    media: { kicker: "Contribution scored", headline: "SCORE 934.", note: "Event velocity reached the top 2%." },
  },
  {
    id: "04303", sequence: 4303, creatorId: "kira", status: "tracking", timestamp: "14:02:19", relativeTime: "27m ago",
    impact: 776, estimatedCut: 0.0514, impressions: 17900, engagements: 804, engagementRate: 4.5,
    post: "ONIX measures observed response before calculating an allocation. This event remains in tracking.",
  },
  {
    id: "04302", sequence: 4302, creatorId: "harvey", status: "paid", timestamp: "13:58:46", relativeTime: "31m ago",
    impact: 721, estimatedCut: 0.0421, impressions: 16300, engagements: 675, engagementRate: 4.1,
    post: "Distribution complete for this event. The prototype record links attribution, cycle, and payout status.",
  },
  {
    id: "04301", sequence: 4301, creatorId: "zoe", status: "verified", timestamp: "13:55:12", relativeTime: "34m ago",
    impact: 584, estimatedCut: 0.0246, impressions: 10800, engagements: 419, engagementRate: 3.9,
    post: "Community activity is now part of the contribution view. This event is verified and ready for measurement.",
  },
  {
    id: "04300", sequence: 4300, creatorId: "fox", status: "scored", timestamp: "13:51:03", relativeTime: "38m ago",
    impact: 748, estimatedCut: 0.0472, impressions: 17100, engagements: 733, engagementRate: 4.3,
    post: "Allocation follows measured response in this model, with reach and engagement stored alongside the event.",
  },
  {
    id: "04299", sequence: 4299, creatorId: "kate", status: "tracking", timestamp: "13:47:38", relativeTime: "42m ago",
    impact: 826, estimatedCut: 0.0568, impressions: 19700, engagements: 906, engagementRate: 4.6,
    post: "A high velocity event is moving through the current cycle. Its measured reach continues to increase.",
    media: { kicker: "Tracking event", headline: "REACH IN MOTION.", note: "Response is increasing across the network." },
  },
  {
    id: "04298", sequence: 4298, creatorId: "matt", status: "detected", timestamp: "13:43:20", relativeTime: "46m ago",
    impact: 361, estimatedCut: 0.0084, impressions: 4900, engagements: 181, engagementRate: 3.7,
    post: "This new event has entered the intake queue. ONIX is collecting response data before scoring.",
  },
  {
    id: "04297", sequence: 4297, creatorId: "stella", status: "paid", timestamp: "13:39:17", relativeTime: "50m ago",
    impact: 702, estimatedCut: 0.0396, impressions: 13900, engagements: 604, engagementRate: 4.3,
    post: "The attribution record for this event now includes a contribution score and completed distribution.",
  },
  {
    id: "04296", sequence: 4296, creatorId: "noah", status: "verified", timestamp: "13:35:04", relativeTime: "54m ago",
    impact: 529, estimatedCut: 0.0218, impressions: 9200, engagements: 348, engagementRate: 3.8,
    post: "A contributor can inspect their activity, calculated share, and payout history in the same workspace.",
  },
  {
    id: "04295", sequence: 4295, creatorId: "leo", status: "scored", timestamp: "13:31:42", relativeTime: "58m ago",
    impact: 667, estimatedCut: 0.0338, impressions: 12800, engagements: 526, engagementRate: 4.1,
    post: "Repeated network response moved this event above the contribution threshold for the current cycle.",
  },
  {
    id: "04294", sequence: 4294, creatorId: "mira", status: "paid", timestamp: "13:27:18", relativeTime: "1h ago",
    impact: 758, estimatedCut: 0.0524, impressions: 17500, engagements: 761, engagementRate: 4.3,
    post: "ONIX completed a simulated distribution cycle. The event record now shows the assigned share and status.",
  },
];

export const liveSignalTemplates: Omit<WireSignal, "id" | "sequence" | "timestamp" | "relativeTime">[] = [
  {
    creatorId: "zoe", status: "detected", impact: 412, estimatedCut: 0.0114, impressions: 6200, engagements: 237, engagementRate: 3.8,
    post: "New event detected. The scenario is collecting reach and response measurements.",
  },
  {
    creatorId: "matt", status: "verified", impact: 548, estimatedCut: 0.0274, impressions: 9800, engagements: 401, engagementRate: 4.1,
    post: "Verified activity now has a contributor, timestamp, and cycle assignment in the record.",
  },
  {
    creatorId: "kate", status: "tracking", impact: 784, estimatedCut: 0.0592, impressions: 18100, engagements: 842, engagementRate: 4.7,
    post: "ONIX activity is increasing in the current cycle. Contribution estimates are updating with each response.",
  },
];

export const wireStatusLabels: Record<DemoSignalStatus, string> = {
  detected: "Detected",
  verified: "Verified",
  tracking: "Tracking",
  scored: "Measured",
  paid: "Distributed",
};

export const wireLiveCadenceMs = [9000, 11000, 8000, 10000] as const;
