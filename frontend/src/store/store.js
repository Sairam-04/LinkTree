import { configureStore } from "@reduxjs/toolkit";
import linksSlice from "./reducers/linksSlice";

export const store = configureStore({
  reducer: {
    links: linksSlice,
  },
});

export default store;
