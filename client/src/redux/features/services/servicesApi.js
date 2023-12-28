import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types/tag-types";

export const servicesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get all services
    getAllServices: builder.query({
      query: (arg) => ({
        url: "/services/get-all-services",
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.services],
    }),
  }),
});

export const { useGetAllServicesQuery } = servicesApi;
