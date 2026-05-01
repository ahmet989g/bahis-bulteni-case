// api verisini ui tiplerine dönüştürür

import type { RawMatch, RawOddCategory } from "../types/api";
import type { Match, OddCategory, Odd } from "../bulletin/types";

function normalizeCategory(rawCategory: RawOddCategory, matchId: string): OddCategory {
  const odds: Odd[] = Object.values(rawCategory.OC).map((rawOdd) => ({
    id: `${matchId}_${rawCategory.ID}_${rawOdd.ID}`,
    name: rawOdd.N,
    value: parseFloat(rawOdd.O),
    matchId,
    categoryId: rawCategory.ID,
  }));

  return {
    id: rawCategory.ID,
    name: rawCategory.N,
    sortOrder: rawCategory.SO,
    odds,
  };
}

function normalizeMatch(raw: RawMatch): Match {
  const categories: OddCategory[] = Object.values(raw.OCG)
    .sort((a, b) => a.SO - b.SO)
    .map((rawCategory) => normalizeCategory(rawCategory, raw.C));

  return {
    id: raw.C,
    name: raw.N,
    league: raw.LN,
    date: raw.D,
    time: raw.T,
    day: raw.DAY,
    status: raw.S,
    categories,
  };
}

export function normalizeMatches(rawMatches: RawMatch[]): Match[] {
  return rawMatches.map(normalizeMatch);
}