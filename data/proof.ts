import { creatorHandles } from "@/data/creators";

export type ProofMetrics = {
  feesCaptured: number;
  creatorPool: number;
  distributed: number;
  creatorsPaid: number;
  cutsCompleted: number;
};

export type MockSettlement = {
  id: string;
  creator: `@${string}`;
  amount: number;
  cut: `#${string}`;
  transaction: `0x${string}`;
  timestamp: string;
  status: "settled";
};

export type SettlementTemplate = Pick<
  MockSettlement,
  "creator" | "amount" | "transaction"
>;

export type ProofSettlement = {
  id: string;
  creator: `@${string}`;
  amount: number;
  cut: `#${string}`;
  settlementId: `#${string}`;
  mockHash: `0x${string}`;
  timestamp: string;
  status: "settled";
};

export type CutRecord = {
  id: `#${string}`;
  date: string;
  pool: number;
  distributed: number;
  creators: number;
  signals: number;
  status: "complete";
};

export type ProtocolActivity = {
  id: string;
  timestamp: string;
  event: string;
  detail: string;
  amount?: string;
};

export type InfrastructureStatus = {
  label: string;
  value: string;
  real: boolean;
};

export const proofMetrics: ProofMetrics = {
  feesCaptured: 8423.81,
  creatorPool: 1863,
  distributed: 1254.89,
  creatorsPaid: 151,
  cutsCompleted: 42,
};

export const proofCreators = creatorHandles;

const settlementAmounts = [
  3.82, 4.21, 2.74, 3.14, 5.68, 1.72, 3.96, 2.18, 4.08, 1.14, 6.12, 0.62,
  2.46, 4.72, 3.38, 7.04, 1.86, 5.24, 2.92, 0.84, 4.46, 3.62, 1.48, 5.92,
] as const;

const transactionHashes = [
  "0x8A2F...91C4", "0x71D9...AA84", "0x3C21...7F09", "0x95A1...2D70",
  "0x124B...C921", "0x991C...A728", "0xD481...5E24", "0xA72E...38B1",
  "0x4F18...D903", "0xB63A...1F82", "0x2E91...6BC7", "0xC740...83AD",
  "0x56B2...E014", "0xE38D...4A76", "0x09C5...B821", "0xF214...73CE",
  "0x6D8A...20F5", "0xAB31...9D42", "0x47E6...C183", "0xD905...6A2F",
  "0x1BC8...F734", "0x83F2...4E19", "0x5A07...D862", "0xCE42...17B9",
] as const satisfies readonly `0x${string}`[];

export const settlementTemplates: SettlementTemplate[] = proofCreators.map(
  (creator, index) => ({
    creator,
    amount: settlementAmounts[index],
    transaction: transactionHashes[index],
  }),
);

const initialTimestamps = [
  "13:48:13",
  "13:47:52",
  "13:47:11",
  "13:46:42",
  "13:46:18",
  "13:45:51",
] as const;

export const initialSettlements: MockSettlement[] = settlementTemplates
  .slice(0, 6)
  .map((template, index) => ({
    ...template,
    id: `settlement_0042_initial_${index}`,
    cut: "#0042",
    timestamp: initialTimestamps[index],
    status: "settled",
  }));

export const settlementCadenceMs = [7000, 8500, 6500, 9000, 7600, 8200] as const;

export function createLiveSettlement(sequence: number, timestamp: string): MockSettlement {
  const template = settlementTemplates[sequence % settlementTemplates.length];

  return {
    ...template,
    id: `settlement_0042_live_${sequence}`,
    cut: "#0042",
    timestamp,
    status: "settled",
  };
}

export const mockContract = "0xD0N5...1842";
export const nextCutDurationSeconds = 4 * 60 * 60 + 18 * 60 + 42;

const proofInitialTimes = [
  "14:42:18", "14:42:09", "14:41:54", "14:41:32",
  "14:41:08", "14:40:47", "14:40:21", "14:39:58",
] as const;

export const initialProofSettlements: ProofSettlement[] = settlementTemplates
  .slice(0, 8)
  .map((template, index) => ({
    id: `proof_settlement_initial_${index}`,
    creator: template.creator,
    amount: template.amount,
    cut: "#0042",
    settlementId: `#${(51 - index).toString().padStart(4, "0")}`,
    mockHash: template.transaction,
    timestamp: proofInitialTimes[index],
    status: "settled",
  }));

export function createProofSettlement(sequence: number, timestamp: string): ProofSettlement {
  const template = settlementTemplates[sequence % settlementTemplates.length];
  const settlementNumber = 52 + Math.max(0, sequence - initialProofSettlements.length);

  return {
    id: `proof_settlement_live_${sequence}`,
    creator: template.creator,
    amount: template.amount,
    cut: "#0042",
    settlementId: `#${settlementNumber.toString().padStart(4, "0")}`,
    mockHash: template.transaction,
    timestamp,
    status: "settled",
  };
}

export const proofSettlementCadenceMs = [6_500, 8_200, 7_100, 8_800] as const;
export const proofFinanceCadenceMs = [9_200, 7_800, 10_400, 8_600] as const;
export const proofFeeIncrements = [0.31, 0.24, 0.42, 0.36] as const;
export const proofPoolIncrements = [0.18, 0.09, 0.14, 0.12] as const;

export const proofValueFlow = {
  tradeVolume: 48_281,
  feesGenerated: 184.2,
  creatorAllocation: 40.52,
  currentCut: "#0043",
  treasuryPercent: 78,
  creatorPercent: 22,
} as const;

export const currentProofCut = {
  id: "#0043",
  status: "Accumulating",
  started: "09 SEP · 00:00",
  creatorPool: 1863,
  eligibleSignals: 184,
  eligibleCreators: 61,
  stages: ["Accumulating", "Locking", "Scoring", "Settling", "Complete"],
} as const;

export const cutHistory: CutRecord[] = [
  { id: "#0042", date: "Sep 08", pool: 184.82, distributed: 172.41, creators: 61, signals: 184, status: "complete" },
  { id: "#0041", date: "Sep 07", pool: 163.44, distributed: 151.82, creators: 57, signals: 168, status: "complete" },
  { id: "#0040", date: "Sep 06", pool: 142.18, distributed: 131.74, creators: 52, signals: 149, status: "complete" },
  { id: "#0039", date: "Sep 05", pool: 128.64, distributed: 119.22, creators: 49, signals: 137, status: "complete" },
  { id: "#0038", date: "Sep 04", pool: 117.28, distributed: 108.46, creators: 45, signals: 126, status: "complete" },
  { id: "#0037", date: "Sep 03", pool: 104.92, distributed: 96.84, creators: 42, signals: 118, status: "complete" },
  { id: "#0036", date: "Sep 02", pool: 92.48, distributed: 84.76, creators: 38, signals: 104, status: "complete" },
  { id: "#0035", date: "Sep 01", pool: 81.34, distributed: 74.18, creators: 34, signals: 91, status: "complete" },
];

export const infrastructureDetails: InfrastructureStatus[] = [
  { label: "Network", value: "Robinhood Chain", real: true },
  { label: "Chain ID", value: "4663", real: true },
  { label: "Native Gas", value: "ETH", real: true },
  { label: "EVM", value: "Compatible", real: true },
  { label: "Explorer", value: "Robinhood Chain Blockscout", real: true },
  { label: "Network Status", value: "Operational", real: false },
];

export const protocolContracts = [
  { label: "Creator Pool", stage: "Prototype", deployment: "Not deployed" },
  { label: "Fee Router", stage: "Prototype", deployment: "Not deployed" },
  { label: "Settlement Router", stage: "Prototype", deployment: "Not deployed" },
] as const;

export const systemStatuses = [
  { label: "Signal Indexer", status: "Operational", mocked: true },
  { label: "Scoring Engine", status: "Operational", mocked: true },
  { label: "Settlement Engine", status: "Operational", mocked: true },
  { label: "Robinhood Chain", status: "Operational", mocked: true },
] as const;

export const initialProtocolActivity: ProtocolActivity[] = [
  { id: "activity-0051", timestamp: "14:42:18", event: "Settlement #0051 completed", detail: "@mira_eth", amount: "$3.82" },
  { id: "activity-pool", timestamp: "14:42:09", event: "Creator Pool", detail: "Fee allocation received", amount: "+$0.18" },
  { id: "activity-signal", timestamp: "14:41:54", event: "Signal #5021 locked", detail: "Impact 842" },
  { id: "activity-cut", timestamp: "14:41:32", event: "Cut #0043", detail: "184 eligible Signals" },
  { id: "activity-score", timestamp: "14:41:08", event: "Scoring pass completed", detail: "61 eligible creators" },
];
