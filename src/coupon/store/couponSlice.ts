import { createSlice, createSelector } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import type { Odd } from "../../bulletin/types";

interface SelectedOdd extends Odd {
  matchName: string;
}

interface CouponState {
  // aynı maçtan tek seçim
  selections: Record<string, SelectedOdd>;
}

const initialState: CouponState = {
  selections: {},
};

const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {
    toggleOdd(state, action: PayloadAction<{ odd: Odd; matchName: string }>) {
      const { odd, matchName } = action.payload;
      const existing = state.selections[odd.matchId];

      // aynı orana tekrar tıklanınca sepetten çıkart
      if (existing?.id === odd.id) {
        delete state.selections[odd.matchId];
        return;
      }

      // farklı oran seçilince öncekinin üzerina yaz
      state.selections[odd.matchId] = { ...odd, matchName };
    },

    removeOdd(state, action: PayloadAction<string>) {
      delete state.selections[action.payload];
    },

    clearCoupon(state) {
      state.selections = {};
    },
  },
});

export const { toggleOdd, removeOdd, clearCoupon } = couponSlice.actions;
export default couponSlice.reducer;

export const selectIsOddSelected = createSelector(
  [(state: RootState) => state.coupon.selections, (_: RootState, oddId: string) => oddId],
  (selections, oddId) => Object.values(selections).some((s) => s.id === oddId)
);

export const selectCouponItems = createSelector(
  [(state: RootState) => state.coupon.selections],
  (selections) => Object.values(selections)
);

export const selectTotalOdds = createSelector(
  [selectCouponItems],
  (items) => items.length === 0 ? 0 : items.reduce((acc, item) => acc * item.value, 1)
);

export const selectCouponCount = createSelector(
  [selectCouponItems],
  (items) => items.length
);