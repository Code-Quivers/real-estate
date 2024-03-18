import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types/tag-types";

export const tenantsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get all available tenants
    getAllTenants: builder.query({
      query: (arg) => ({
        url: "/tenants/get-all-tenants",
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.tenant],
    }),
    getAllAvailableTenants: builder.query({
      query: (arg) => ({
        url: "/tenants/get-all-available-tenants",
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.tenant, tagTypes.properties],
    }),
    getTenantMyProfile: builder.query({
      query: () => ({
        url: "/tenants/get-my-profile",
        method: "GET",
      }),
      providesTags: [tagTypes.tenant],
    }),
    updateTenantProfile: builder.mutation({
      query: ({ data, tenantId }) => ({
        url: `/tenants/update-profile/${tenantId}`,
        method: "PATCH",
        data: data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.tenant],
    }),
  }),
});

export const { useGetAllAvailableTenantsQuery, useUpdateTenantProfileMutation, useGetTenantMyProfileQuery, useGetAllTenantsQuery } = tenantsApi;
