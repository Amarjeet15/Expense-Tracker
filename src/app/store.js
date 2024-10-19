import { configureStore } from "@reduxjs/toolkit";
import transactionTrackerReducer from "../features/transactionTrackerSlice";

export const store = configureStore({
  reducer: {
    transactionTracker: transactionTrackerReducer,
  },
});
