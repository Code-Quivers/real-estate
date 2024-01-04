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
    getTenantMyProfile: builder.query({
      query: () => ({
        url: "/tenants/get-my-profile",
        method: "GET",
      }),
      providesTags: [tagTypes.tenant],
    }),
    updateTenantProfile: builder.mutation({
      query: ({ serviceProviderId, data }) => ({
        url: `/tenants/update-profile/${serviceProviderId}`,
        method: "PATCH",
        data: data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.tenant],
    }),
  }),
});

export const {
  useGetAllAvailableTenantsQuery,
  useUpdateTenantProfileMutation,
  useGetTenantMyProfileQuery,
} = tenantsApi;
