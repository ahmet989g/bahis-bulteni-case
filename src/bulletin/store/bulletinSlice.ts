import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchBets } from "../../services/betsApi";
import { normalizeMatches } from "../../utils/normalize";
import type { RootState } from "../../app/store";
import type { Match, Odd } from "../types";

interface BulletinState {
  matches: Match[];
  // kupon için oran erişim
  oddsMap: Record<string, Odd>;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: BulletinState = {
  matches: [],
  oddsMap: {},
  status: "idle",
  error: null,
};

export const loadMatches = createAsyncThunk("bulletin/loadMatches", async () => {
  const raw = await fetchBets();
  return normalizeMatches(raw);
});

const bulletinSlice = createSlice({
  name: "bulletin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadMatches.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loadMatches.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.matches = action.payload;

        // tüm oranları düz map
        const map: Record<string, Odd> = {};
        action.payload.forEach((match) => {
          match.categories.forEach((category) => {
            category.odds.forEach((odd) => {
              map[odd.id] = odd;
            });
          });
        });
        state.oddsMap = map;
      })
      .addCase(loadMatches.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Bilinmeyen hata";
      });
  },
});

export default bulletinSlice.reducer;

export const selectMatches = (state: RootState) => state.bulletin.matches;
export const selectBulletinStatus = (state: RootState) => state.bulletin.status;
export const selectBulletinError = (state: RootState) => state.bulletin.error;