import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types/tag-types";

export const tenantsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get all available tenants
    getAllAvailableTenants: builder.query({
      query: (arg) => ({
        url: "/tenants/get-all-tenants",
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.tenant],
    }),
  }),
});

export const { useGetAllAvailableTenantsQuery } = tenantsApi;
