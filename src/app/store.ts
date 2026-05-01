import { configureStore } from "@reduxjs/toolkit";
import bulletinReducer from "../bulletin/store/bulletinSlice";
import couponReducer from "../coupon/store/couponSlice";

export const store = configureStore({
  reducer: {
    bulletin: bulletinReducer,
    coupon: couponReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;