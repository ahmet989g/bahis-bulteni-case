// apiden gelen json verisinin tipleri

export interface RawOdd {
  ID: string;
  O: string;    // oran değeri string olarak gelir "3.60"
  N: string;    // oranlar: 1, x, 2, alt, ust
  MBS: string;
  G: string;
  OD: number;
  IMF: boolean;
}

export interface RawOddCategory {
  ID: string;
  N: string;    // kategori adları: "maç sonucu" ve "çift şans"
  MBS: string;
  SO: number;
  OC: Record<string, RawOdd>;
}

export interface RawMatch {
  C: string;    // maçın kodu
  N: string;    // maçın adı
  TYPE: string;
  NID: string;
  D: string;    // tarih: "12.08.2023"
  T: string;    // saat: "01:59"
  DAY: string;  // gün: "Perşembe"
  S: string;    // durum: "Open"
  LN: string;   // lig adı
  IMF: boolean;
  OCG: Record<string, RawOddCategory>;
  HEC: boolean;
}