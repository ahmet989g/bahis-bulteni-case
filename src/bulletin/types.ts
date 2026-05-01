// componentlerin kullandığı tipler

export interface Odd {
  id: string;
  name: string;     // 1, x, 2, alt, üst
  value: number;    // 3.60
  matchId: string;
  categoryId: string;
}

export interface OddCategory {
  id: string;
  name: string;     // maç sonucu, çifte şans
  sortOrder: number;
  odds: Odd[];
}

export interface Match {
  id: string;
  name: string;     // "psv - roma"
  league: string;
  date: string;
  time: string;
  day: string;
  status: string;
  categories: OddCategory[];
}