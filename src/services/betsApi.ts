import { API_URL } from "@/config";
import type { RawMatch } from "../types/api";

export async function fetchBets(): Promise<RawMatch[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(`Veri çekilemedi: ${response.status}`);
  }

  return response.json();
}