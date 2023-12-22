import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "./api/rootReducer";
import { baseApi } from "./api/baseApi";

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
  devTools: true,
});

export default store;
