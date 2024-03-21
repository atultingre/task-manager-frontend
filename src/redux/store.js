import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice.js";
import { apiSlice } from "./slices/apiSlice.js";

const store = configureStore({
  reducer: {
    [authSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
