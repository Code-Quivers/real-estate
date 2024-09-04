import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const tenantsApi = baseApi.injectEndpoints({
  endpoints: (builder: any) => ({
    // get all available tenants
    getAllTenants: builder.query({
      query: (arg: any) => ({
        url: "/tenants/get-all-tenants",
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
      query: ({ data, tenantId }: any) => ({
        url: `/tenants/update-profile/${tenantId}`,
        method: "PATCH",
        data: data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.tenant],
    }),
    getTenantMyUnitInformation: builder.query({
      query: () => ({
        url: "/tenants/get-my-unit-information",
        method: "GET",
      }),
      providesTags: [tagTypes.tenant, tagTypes.properties],
    }),
    deleteTenantData: builder.mutation({
      query: ({ tenantId }: any) => ({
        url: `/tenants/delete-tenant/${tenantId}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.tenant],
    }),
  }),
});

export const {
  useUpdateTenantProfileMutation,
  useGetTenantMyProfileQuery,
  useGetAllTenantsQuery,
  useGetTenantMyUnitInformationQuery,
  useDeleteTenantDataMutation,
} = tenantsApi;
