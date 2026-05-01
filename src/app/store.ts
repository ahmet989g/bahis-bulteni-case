import { configureStore } from "@reduxjs/toolkit";
import bulletinReducer from "../bulletin/store/bulletinSlice";

export const store = configureStore({
  reducer: {
    bulletin: bulletinReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;