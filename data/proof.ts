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
  transaction: string;
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
  mockHash: string;
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
  feesCaptured: 84.2381,
  creatorPool: 18.63,
  distributed: 12.5489,
  creatorsPaid: 151,
  cutsCompleted: 42,
};

export const proofCreators = creatorHandles;

const settlementAmounts = [
  0.0382, 0.0421, 0.0274, 0.0314, 0.0568, 0.0172, 0.0396, 0.0218, 0.0408, 0.0114, 0.0612, 0.0062,
  0.0246, 0.0472, 0.0338, 0.0704, 0.0186, 0.0524, 0.0292, 0.0084, 0.0446, 0.0362, 0.0148, 0.0592,
] as const;

const transactionHashes = [
  "5KzQ...WkXP", "3QaJ...XWeT", "8VnR...hL2p", "2FmC...qR7x",
  "7YtL...dEoP", "4mJQ...XaCe", "9bKx...XEtM", "6RcP...wN3s",
  "2WdH...kT8v", "8AsN...mP4q", "4JxV...rE6z", "7QpC...yL2n",
  "3NbT...sK9w", "9LmF...vA5h", "5XeR...pD7c", "2GqW...nU4j",
  "8HtK...xM6b", "4PvY...eR9s", "7CfN...qT2w", "3ZaL...kJ8m",
  "9WrP...dV5x", "5BnQ...hF7t", "2MkE...sC4v", "8JxR...pN6q",
] as const;

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

export const mockProgram = "DoN5pRog...1842";
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
export const proofFeeIncrements = [0.0031, 0.0024, 0.0042, 0.0036] as const;
export const proofPoolIncrements = [0.0018, 0.0009, 0.0014, 0.0012] as const;

export const proofValueFlow = {
  tradeVolume: 482.81,
  feesGenerated: 1.842,
  creatorAllocation: 0.4052,
  currentCut: "#0043",
  treasuryPercent: 78,
  creatorPercent: 22,
} as const;

export const currentProofCut = {
  id: "#0043",
  status: "Accumulating",
  started: "09 SEP · 00:00",
  creatorPool: 18.63,
  eligibleSignals: 184,
  eligibleCreators: 61,
  stages: ["Accumulating", "Locking", "Scoring", "Settling", "Complete"],
} as const;

export const cutHistory: CutRecord[] = [
  { id: "#0042", date: "Sep 08", pool: 1.8482, distributed: 1.7241, creators: 61, signals: 184, status: "complete" },
  { id: "#0041", date: "Sep 07", pool: 1.6344, distributed: 1.5182, creators: 57, signals: 168, status: "complete" },
  { id: "#0040", date: "Sep 06", pool: 1.4218, distributed: 1.3174, creators: 52, signals: 149, status: "complete" },
  { id: "#0039", date: "Sep 05", pool: 1.2864, distributed: 1.1922, creators: 49, signals: 137, status: "complete" },
  { id: "#0038", date: "Sep 04", pool: 1.1728, distributed: 1.0846, creators: 45, signals: 126, status: "complete" },
  { id: "#0037", date: "Sep 03", pool: 1.0492, distributed: 0.9684, creators: 42, signals: 118, status: "complete" },
  { id: "#0036", date: "Sep 02", pool: 0.9248, distributed: 0.8476, creators: 38, signals: 104, status: "complete" },
  { id: "#0035", date: "Sep 01", pool: 0.8134, distributed: 0.7418, creators: 34, signals: 91, status: "complete" },
];

export const infrastructureDetails: InfrastructureStatus[] = [
  { label: "Network", value: "Solana", real: true },
  { label: "Cluster", value: "mainnet-beta", real: true },
  { label: "Native Gas", value: "SOL", real: true },
  { label: "Runtime", value: "SVM", real: true },
  { label: "Explorer", value: "Solana Explorer", real: true },
  { label: "Scenario status", value: "Simulated", real: false },
];

export const protocolPrograms = [
  { label: "Allocation pool", stage: "Prototype", deployment: "Not deployed" },
  { label: "Fee model", stage: "Prototype", deployment: "Not deployed" },
  { label: "Distribution router", stage: "Prototype", deployment: "Not deployed" },
] as const;

export const systemStatuses = [
  { label: "Event indexer", status: "Simulated", mocked: true },
  { label: "Contribution engine", status: "Simulated", mocked: true },
  { label: "Distribution engine", status: "Simulated", mocked: true },
  { label: "Solana network state", status: "Simulated", mocked: true },
] as const;

export const initialProtocolActivity: ProtocolActivity[] = [
  { id: "activity-0051", timestamp: "14:42:18", event: "Record #0051 completed", detail: "@mira_eth", amount: "0.0382 SOL" },
  { id: "activity-pool", timestamp: "14:42:09", event: "Allocation pool", detail: "Modeled fee allocation", amount: "+0.0018 SOL" },
  { id: "activity-signal", timestamp: "14:41:54", event: "Event #5021 locked", detail: "Contribution 842" },
  { id: "activity-cut", timestamp: "14:41:32", event: "Cycle #0043", detail: "184 eligible events" },
  { id: "activity-score", timestamp: "14:41:08", event: "Scoring pass completed", detail: "61 eligible contributors" },
];
