import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../../baseApi";

export const propertiesApi = baseApi.injectEndpoints({
  endpoints: (build: any) => ({
    // get all properties
    getAllProperties: build.query({
      query: (arg: any) => ({
        url: "/properties/get-all-properties",
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.properties],
    }),
  }),
});

export const { useGetAllPropertiesQuery } = propertiesApi;
