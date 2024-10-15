import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types/tag-types";

export const propertyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addProperties: builder.mutation({
      query: ({ data }) => ({
        url: `/properties/create`,
        method: "POST",
        data: data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.properties],
    }),
    updateProperty: builder.mutation({
      query: ({ propertyId, data }) => ({
        url: `/properties/update-property/${propertyId}`,
        method: "PATCH",
        data: data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.properties],
    }),

    getAllAvailableUnits: builder.query({
      query: (arg) => ({
        url: `/properties/all`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.properties],
    }),
    getMyAllUnits: builder.query({
      query: (arg) => ({
        url: `/properties/get-my-properties`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.properties, tagTypes.tenant, tagTypes.order],
    }),
    getMyAllUnitsForPayment: builder.query({
      query: (arg) => ({
        url: `/properties/get-my-properties-for-payment`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.properties, tagTypes.tenant, tagTypes.order],
    }),
    // ! assign
    assignServiceProviderToProperty: builder.mutation({
      query: ({ data }) => ({
        url: `/properties/assign-service-provider-to-property`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.properties, tagTypes.serviceProvider, tagTypes.propertyOwner],
    }),
    // ! tenant
    assignTenantToProperty: builder.mutation({
      query: ({ data }) => ({
        url: `/properties/assign-tenant-to-property`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.properties, tagTypes.tenant, tagTypes.propertyOwner],
    }),
    removeTenantFromProperty: builder.mutation({
      query: ({ data }) => ({
        url: `/properties/remove-tenant-from-property`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.properties, tagTypes.tenant, tagTypes.propertyOwner],
    }),
  }),
});

export const {
  useAddPropertiesMutation,
  useUpdatePropertyMutation,
  useGetAllAvailableUnitsQuery,
  useGetMyAllUnitsQuery,
  useGetMyAllUnitsForPaymentQuery,
  useAssignTenantToPropertyMutation,
  useAssignServiceProviderToPropertyMutation,
  useRemoveTenantFromPropertyMutation,
} = propertyApi;
