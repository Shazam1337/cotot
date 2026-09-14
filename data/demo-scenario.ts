export type DemoSignalStatus =
  | "detected"
  | "verified"
  | "tracking"
  | "scored"
  | "paid";

export type DemoCreator = {
  id: string;
  handle: `@${string}`;
  name: string;
  initials: string;
  descriptor: string;
  donScore: number;
};

export type DemoSignal = {
  id: string;
  creatorId: DemoCreator["id"];
  status: DemoSignalStatus;
  timestamp: string;
  relativeTime: string;
  impact: number;
  estimatedCut: number;
  impressions: number;
  engagements: number;
  engagementRate: number;
  post: string[];
  mediaKicker: string;
  mediaTitle: string;
};

export const demoCreators: DemoCreator[] = [
  {
    id: "stacy",
    handle: "@stacy",
    name: "Stacy",
    initials: "ST",
    descriptor: "Market culture · Creator",
    donScore: 884,
  },
  {
    id: "lunarvibe",
    handle: "@lunarvibe",
    name: "Lunar Vibe",
    initials: "LV",
    descriptor: "Onchain researcher",
    donScore: 746,
  },
  {
    id: "realdegen",
    handle: "@realDegen",
    name: "Real Degen",
    initials: "RD",
    descriptor: "Markets · Commentary",
    donScore: 812,
  },
  {
    id: "alphaj",
    handle: "@alphaj",
    name: "Alpha J",
    initials: "AJ",
    descriptor: "Trading intelligence",
    donScore: 779,
  },
  {
    id: "cryptomom",
    handle: "@cryptomom",
    name: "Crypto Mom",
    initials: "CM",
    descriptor: "Consumer crypto",
    donScore: 803,
  },
  {
    id: "alex",
    handle: "@alex",
    name: "Alex",
    initials: "AX",
    descriptor: "Protocol observer",
    donScore: 821,
  },
  {
    id: "orbitron",
    handle: "@orbitron",
    name: "Orbitron",
    initials: "OR",
    descriptor: "Network analyst",
    donScore: 698,
  },
  {
    id: "flowstate",
    handle: "@flowstate",
    name: "Flow State",
    initials: "FS",
    descriptor: "Market structure",
    donScore: 734,
  },
  {
    id: "chainbrief",
    handle: "@chainbrief",
    name: "Chain Brief",
    initials: "CB",
    descriptor: "Daily onchain brief",
    donScore: 765,
  },
  {
    id: "mayaonchain",
    handle: "@mayaonchain",
    name: "Maya",
    initials: "MO",
    descriptor: "Creator economy",
    donScore: 858,
  },
];

export const demoSignals: DemoSignal[] = [
  {
    id: "04281",
    creatorId: "stacy",
    status: "tracking",
    timestamp: "13:48:07",
    relativeTime: "18m ago",
    impact: 892,
    estimatedCut: 0.0712,
    impressions: 18200,
    engagements: 824,
    engagementRate: 4.5,
    post: [
      "COTOT turns attention into ownership.",
      "Creators finally earn a cut of the volume they help create.",
      "Built on Solana.",
    ],
    mediaKicker: "Creator revenue protocol",
    mediaTitle: "ATTENTION PAYS.",
  },
  {
    id: "04282",
    creatorId: "lunarvibe",
    status: "detected",
    timestamp: "13:50:18",
    relativeTime: "2m ago",
    impact: 418,
    estimatedCut: 0.0146,
    impressions: 6800,
    engagements: 296,
    engagementRate: 4.4,
    post: ["Attention is the first signal.", "Ownership is what comes next."],
    mediaKicker: "Signal detected",
    mediaTitle: "VALUE THE SIGNAL.",
  },
  {
    id: "04280",
    creatorId: "realdegen",
    status: "scored",
    timestamp: "13:47:42",
    relativeTime: "4m ago",
    impact: 684,
    estimatedCut: 0.0382,
    impressions: 12100,
    engagements: 501,
    engagementRate: 4.1,
    post: ["Distribution creates markets.", "Creators should own their contribution."],
    mediaKicker: "Impact locked",
    mediaTitle: "CREATE THE MARKET.",
  },
  {
    id: "04279",
    creatorId: "alphaj",
    status: "verified",
    timestamp: "13:46:55",
    relativeTime: "6m ago",
    impact: 552,
    estimatedCut: 0.0208,
    impressions: 9400,
    engagements: 382,
    engagementRate: 4.1,
    post: ["Signals compound when the right people carry them."],
    mediaKicker: "Verified signal",
    mediaTitle: "REACH HAS VALUE.",
  },
  {
    id: "04278",
    creatorId: "cryptomom",
    status: "paid",
    timestamp: "13:45:21",
    relativeTime: "8m ago",
    impact: 718,
    estimatedCut: 0.0421,
    impressions: 14300,
    engagements: 648,
    engagementRate: 4.5,
    post: ["The creator layer is the distribution layer."],
    mediaKicker: "Creator cut paid",
    mediaTitle: "ATTENTION SETTLED.",
  },
  {
    id: "04277",
    creatorId: "alex",
    status: "tracking",
    timestamp: "13:44:38",
    relativeTime: "9m ago",
    impact: 821,
    estimatedCut: 0.0564,
    impressions: 15900,
    engagements: 721,
    engagementRate: 4.5,
    post: ["Good markets reward the people who make them legible."],
    mediaKicker: "Live impact",
    mediaTitle: "TRACK THE SIGNAL.",
  },
  {
    id: "04276",
    creatorId: "mayaonchain",
    status: "tracking",
    timestamp: "13:43:16",
    relativeTime: "11m ago",
    impact: 846,
    estimatedCut: 0.0618,
    impressions: 16800,
    engagements: 756,
    engagementRate: 4.5,
    post: [
      "Creators are already moving markets.",
      "The missing layer was attribution that pays.",
    ],
    mediaKicker: "Attribution layer",
    mediaTitle: "CREATORS MOVE MARKETS.",
  },
  {
    id: "04275",
    creatorId: "orbitron",
    status: "verified",
    timestamp: "13:41:52",
    relativeTime: "13m ago",
    impact: 496,
    estimatedCut: 0.0172,
    impressions: 8100,
    engagements: 319,
    engagementRate: 3.9,
    post: ["Every market begins as a conversation."],
    mediaKicker: "Conversation verified",
    mediaTitle: "SIGNAL BECOMES VALUE.",
  },
  {
    id: "04274",
    creatorId: "flowstate",
    status: "scored",
    timestamp: "13:40:09",
    relativeTime: "15m ago",
    impact: 631,
    estimatedCut: 0.0314,
    impressions: 11700,
    engagements: 467,
    engagementRate: 4,
    post: ["Market attention is measurable. Its value should be shareable."],
    mediaKicker: "Impact scored",
    mediaTitle: "MEASURE WHAT MOVES.",
  },
  {
    id: "04273",
    creatorId: "chainbrief",
    status: "paid",
    timestamp: "13:38:44",
    relativeTime: "17m ago",
    impact: 587,
    estimatedCut: 0.0274,
    impressions: 10600,
    engagements: 408,
    engagementRate: 3.8,
    post: ["Proof of attention can become proof of contribution."],
    mediaKicker: "Cut settled",
    mediaTitle: "PROOF THAT PAYS.",
  },
  {
    id: "04272",
    creatorId: "realdegen",
    status: "detected",
    timestamp: "13:36:22",
    relativeTime: "19m ago",
    impact: 372,
    estimatedCut: 0.0094,
    impressions: 5200,
    engagements: 214,
    engagementRate: 4.1,
    post: ["The feed is a market surface. COTOT makes it accountable."],
    mediaKicker: "Signal detected",
    mediaTitle: "WATCH THE WIRE.",
  },
  {
    id: "04269",
    creatorId: "alex",
    status: "tracking",
    timestamp: "13:31:08",
    relativeTime: "24m ago",
    impact: 792,
    estimatedCut: 0.0521,
    impressions: 15100,
    engagements: 679,
    engagementRate: 4.5,
    post: ["What if every useful post carried its own attribution rail?"],
    mediaKicker: "Tracking live",
    mediaTitle: "OWN THE IMPACT.",
  },
];

export const featuredSignalIds = ["04281", "04276", "04269"] as const;

export const signalLifecycle: DemoSignalStatus[] = [
  "detected",
  "verified",
  "tracking",
  "scored",
  "paid",
];

export const signalStatusLabels: Record<DemoSignalStatus, string> = {
  detected: "Signal detected",
  verified: "Verified",
  tracking: "Tracking",
  scored: "Impact locked",
  paid: "Paid",
};
