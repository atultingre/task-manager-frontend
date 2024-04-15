import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice.js";
import { apiSlice } from "./slices/apiSlice.js";
import { userApiSlice } from "./slices/api/userApiSlice.js";

const store = configureStore({
  reducer: {
    [authSlice.reducerPath]: apiSlice.reducer,
    [userApiSlice.reducerPath]: userApiSlice.reducer,
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware, userApiSlice.middleware),
  devTools: true,
});

export default store;
