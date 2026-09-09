export type CreatorRange = "today" | "7d" | "season" | "all-time";

export type Creator = {
  id: string;
  handle: `@${string}`;
  name: string;
  initials: string;
  category: string;
  descriptor: string;
  avatarUrl?: string;
};

export type CreatorMetrics = {
  donScore: number;
  signals: number;
  reach: number;
  avgImpact: number;
  earned: number;
  momentum: number;
  liveSignals: number;
};

export type CreatorRangeSnapshot = {
  creatorId: Creator["id"];
  metrics: CreatorMetrics;
};

export type CreatorNetworkSummary = {
  activeCreators: number;
  totalSignals: number;
  totalReach: number;
  avgDonScore: number;
  creatorsRewarded: number;
};

export const creatorRanges: { id: CreatorRange; label: string }[] = [
  { id: "today", label: "Today" },
  { id: "7d", label: "7D" },
  { id: "season", label: "Season" },
  { id: "all-time", label: "All Time" },
];

export const creators: Creator[] = [
  { id: "mira", handle: "@mira_eth", name: "Mira", initials: "ME", category: "Onchain Research", descriptor: "Onchain markets" },
  { id: "julian", handle: "@julian0x", name: "Julian", initials: "J0", category: "DeFi", descriptor: "Protocol research" },
  { id: "nora", handle: "@noraonchain", name: "Nora", initials: "NO", category: "Crypto Research", descriptor: "Creator economics" },
  { id: "benji", handle: "@basedbenji", name: "Benji", initials: "BB", category: "Market Culture", descriptor: "Market commentary" },
  { id: "alex", handle: "@alexdefi", name: "Alex", initials: "AD", category: "DeFi", descriptor: "DeFi analysis" },
  { id: "kira", handle: "@cryptokira", name: "Kira", initials: "CK", category: "Crypto Media", descriptor: "Consumer crypto" },
  { id: "harvey", handle: "@0xharvey", name: "Harvey", initials: "0H", category: "Infrastructure", descriptor: "Network intelligence" },
  { id: "zoe", handle: "@chainzoe", name: "Zoe", initials: "CZ", category: "Community", descriptor: "Chain ecosystems" },
  { id: "matt", handle: "@liquidmatt", name: "Matt", initials: "LM", category: "Trading", descriptor: "Liquidity observer" },
  { id: "fox", handle: "@yieldfox", name: "Yield Fox", initials: "YF", category: "DeFi", descriptor: "Yield markets" },
  { id: "tokenmira", handle: "@tokenmira", name: "Token Mira", initials: "TM", category: "Token Analysis", descriptor: "Token intelligence" },
  { id: "stella", handle: "@zkstella", name: "Stella", initials: "ZS", category: "Protocol Research", descriptor: "Zero knowledge" },
  { id: "jules", handle: "@blockjules", name: "Jules", initials: "BJ", category: "Infrastructure", descriptor: "Blockspace research" },
  { id: "noah", handle: "@definoah", name: "Noah", initials: "DN", category: "DeFi", descriptor: "Open finance" },
  { id: "nori", handle: "@0xnori", name: "Nori", initials: "0N", category: "Memes", descriptor: "Onchain culture" },
  { id: "kate", handle: "@rollupkate", name: "Kate", initials: "RK", category: "Protocol Research", descriptor: "L2 research" },
  { id: "mason", handle: "@ethmason", name: "Mason", initials: "EM", category: "Onchain Research", descriptor: "Ethereum research" },
  { id: "leo", handle: "@onchainleo", name: "Leo", initials: "OL", category: "Market Culture", descriptor: "Onchain culture" },
  { id: "vaultben", handle: "@vaultben", name: "Ben", initials: "VB", category: "DeFi", descriptor: "Vault strategies" },
  { id: "mia", handle: "@marketmia", name: "Mia", initials: "MM", category: "Trading", descriptor: "Market structure" },
  { id: "dan", handle: "@dappdan", name: "Dan", initials: "DD", category: "Infrastructure", descriptor: "Application ecosystems" },
  { id: "nina", handle: "@yieldnina", name: "Nina", initials: "YN", category: "Token Analysis", descriptor: "Yield research" },
  { id: "lucas", handle: "@basedlucas", name: "Lucas", initials: "BL", category: "Community", descriptor: "Community signals" },
  { id: "vega", handle: "@0xvega", name: "Vega", initials: "0V", category: "Crypto Media", descriptor: "Market media" },
];

export const creatorById = Object.fromEntries(
  creators.map((creator) => [creator.id, creator]),
) as Record<string, Creator>;

export const creatorHandles = creators.map((creator) => creator.handle) as readonly `@${string}`[];

const seasonMetrics: Record<string, CreatorMetrics> = {
  mira: { donScore: 941, signals: 42, reach: 2_800_000, avgImpact: 814, earned: 48.21, momentum: 12.8, liveSignals: 3 },
  julian: { donScore: 904, signals: 39, reach: 2_300_000, avgImpact: 792, earned: 39.84, momentum: 9.4, liveSignals: 2 },
  nora: { donScore: 881, signals: 34, reach: 1_900_000, avgImpact: 781, earned: 31.42, momentum: 7.8, liveSignals: 2 },
  kira: { donScore: 842, signals: 31, reach: 1_600_000, avgImpact: 782, earned: 24.82, momentum: 8.4, liveSignals: 2 },
  alex: { donScore: 824, signals: 28, reach: 1_400_000, avgImpact: 764, earned: 21.42, momentum: 4.8, liveSignals: 2 },
  zoe: { donScore: 811, signals: 27, reach: 1_720_000, avgImpact: 751, earned: 19.84, momentum: 7.1, liveSignals: 2 },
  fox: { donScore: 798, signals: 24, reach: 1_100_000, avgImpact: 744, earned: 17.2, momentum: 12.4, liveSignals: 3 },
  harvey: { donScore: 781, signals: 33, reach: 980_000, avgImpact: 721, earned: 15.68, momentum: 14.1, liveSignals: 3 },
  kate: { donScore: 768, signals: 21, reach: 921_000, avgImpact: 718, earned: 25.06, momentum: 16.8, liveSignals: 3 },
  benji: { donScore: 752, signals: 20, reach: 874_000, avgImpact: 701, earned: 12.94, momentum: 3.9, liveSignals: 1 },
  stella: { donScore: 741, signals: 18, reach: 812_000, avgImpact: 694, earned: 11.82, momentum: 5.7, liveSignals: 1 },
  jules: { donScore: 729, signals: 17, reach: 768_000, avgImpact: 687, earned: 10.41, momentum: 2.8, liveSignals: 1 },
  noah: { donScore: 718, signals: 16, reach: 721_000, avgImpact: 675, earned: 9.84, momentum: 6.2, liveSignals: 2 },
  nori: { donScore: 704, signals: 15, reach: 682_000, avgImpact: 661, earned: 8.92, momentum: 1.8, liveSignals: 1 },
  mia: { donScore: 692, signals: 14, reach: 641_000, avgImpact: 652, earned: 8.21, momentum: 4.1, liveSignals: 1 },
};

export const rankedCreatorIds = Object.keys(seasonMetrics);

const rangeProfiles: Record<CreatorRange, {
  scoreDelta: number;
  signals: number;
  reach: number;
  impactDelta: number;
  earned: number;
  momentum: number;
  liveSignals: number;
}> = {
  today: { scoreDelta: -8, signals: 0.143, reach: 0.066, impactDelta: -24, earned: 0.1, momentum: 1.18, liveSignals: 0.67 },
  "7d": { scoreDelta: -3, signals: 0.43, reach: 0.293, impactDelta: -9, earned: 0.361, momentum: 1.08, liveSignals: 1 },
  season: { scoreDelta: 0, signals: 1, reach: 1, impactDelta: 0, earned: 1, momentum: 1, liveSignals: 1 },
  "all-time": { scoreDelta: 11, signals: 2.12, reach: 2.286, impactDelta: 6, earned: 2.174, momentum: 0.82, liveSignals: 1 },
};

function createRangeSnapshot(range: CreatorRange): CreatorRangeSnapshot[] {
  const profile = rangeProfiles[range];

  return rankedCreatorIds.map((creatorId) => {
    const base = seasonMetrics[creatorId];
    return {
      creatorId,
      metrics: {
        donScore: base.donScore + profile.scoreDelta,
        signals: Math.max(1, Math.round(base.signals * profile.signals)),
        reach: Math.round((base.reach * profile.reach) / 1000) * 1000,
        avgImpact: base.avgImpact + profile.impactDelta,
        earned: Math.round(base.earned * profile.earned * 100) / 100,
        momentum: Math.round(base.momentum * profile.momentum * 10) / 10,
        liveSignals: Math.max(1, Math.round(base.liveSignals * profile.liveSignals)),
      },
    };
  });
}

export const creatorRangeSnapshots: Record<CreatorRange, CreatorRangeSnapshot[]> = {
  today: createRangeSnapshot("today"),
  "7d": createRangeSnapshot("7d"),
  season: createRangeSnapshot("season"),
  "all-time": createRangeSnapshot("all-time"),
};

export const creatorNetworkSummaries: Record<CreatorRange, CreatorNetworkSummary> = {
  today: { activeCreators: 24, totalSignals: 126, totalReach: 1_900_000, avgDonScore: 676, creatorsRewarded: 148 },
  "7d": { activeCreators: 61, totalSignals: 524, totalReach: 8_200_000, avgDonScore: 681, creatorsRewarded: 148 },
  season: { activeCreators: 24, totalSignals: 1_284, totalReach: 18_400_000, avgDonScore: 684, creatorsRewarded: 148 },
  "all-time": { activeCreators: 89, totalSignals: 2_826, totalReach: 41_700_000, avgDonScore: 691, creatorsRewarded: 148 },
};

export const risingCreators = [
  { creatorId: "kate", movement: 14, detail: "+22% reach", activity: "3 live signals" },
  { creatorId: "harvey", movement: 9, detail: "+18% Impact", activity: "Network velocity" },
  { creatorId: "fox", movement: 7, detail: "Avg Impact 812", activity: "3 live signals" },
  { creatorId: "lucas", movement: 6, detail: "$6.82 earned", activity: "This week" },
] as const;

export const creatorLiveCadenceMs = [14_000, 17_000, 13_000, 19_000] as const;
