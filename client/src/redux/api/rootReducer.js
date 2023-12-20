// import authReducer from "../features/auth/authSlice";

import { baseApi } from "./baseApi";

export const reducer = {
  [baseApi.reducerPath]: baseApi.reducer,
};
