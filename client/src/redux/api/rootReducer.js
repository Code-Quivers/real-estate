import addPropertyReducer from "../features/propertyOwner/addPropertySlice";

import { baseApi } from "./baseApi";

export const reducer = {
  [baseApi.reducerPath]: baseApi.reducer,
  propertyList: addPropertyReducer,
};
