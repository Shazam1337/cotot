import {
  creatorRangeSnapshots,
  creatorRanges,
  creators,
  type Creator,
  type CreatorRange,
} from "@/data/creators";

export type LeaderboardRange = CreatorRange;
export type LeaderboardCreator = Creator;

export type LeaderboardEntry = {
  creatorId: LeaderboardCreator["id"];
  donScore: number;
  signals: number;
  reach: number;
  earned: number;
};

export type LeaderboardSnapshot = {
  entries: LeaderboardEntry[];
  risingCreatorId: LeaderboardCreator["id"];
  risingPlaces: number;
};

export const leaderboardRanges = creatorRanges;
export const leaderboardCreators = creators;

const risingByRange: Record<LeaderboardRange, { creatorId: string; places: number }> = {
  today: { creatorId: "harvey", places: 9 },
  "7d": { creatorId: "fox", places: 7 },
  season: { creatorId: "kate", places: 14 },
  "all-time": { creatorId: "julian", places: 11 },
};

export const leaderboardSnapshots = Object.fromEntries(
  creatorRanges.map(({ id }) => {
    const rising = risingByRange[id];
    return [
      id,
      {
        entries: creatorRangeSnapshots[id].slice(0, 8).map(({ creatorId, metrics }) => ({
          creatorId,
          donScore: metrics.donScore,
          signals: metrics.signals,
          reach: metrics.reach,
          earned: metrics.earned,
        })),
        risingCreatorId: rising.creatorId,
        risingPlaces: rising.places,
      },
    ];
  }),
) as Record<LeaderboardRange, LeaderboardSnapshot>;
