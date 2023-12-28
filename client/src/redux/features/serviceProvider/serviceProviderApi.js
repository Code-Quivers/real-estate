import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types/tag-types";

export const serviceProviderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get all available tenants
    getAllServiceProviders: builder.query({
      query: (arg) => ({
        url: "/service-providers/get-all-service-providers",
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.serviceProvider],
    }),
  }),
});

export const { useGetAllServiceProvidersQuery } = serviceProviderApi;
