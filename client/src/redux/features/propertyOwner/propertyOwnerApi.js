import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types/tag-types";

export const propertyOwnerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPropertyOwnerMyProfile: builder.query({
      query: () => ({
        url: "/property-owners/get-my-profile",
        method: "GET",
      }),
      providesTags: [tagTypes.propertyOwner],
    }),
    updatePropertyOwnerProfile: builder.mutation({
      query: ({ data, propertyOwnerId }) => ({
        url: `/property-owners/update-profile/${propertyOwnerId}`,
        method: "PATCH",
        data: data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.propertyOwner],
    }),
    getFinancialInfo: builder.query({
      query: () => ({
        url: "/property-owners/financial-info",
        method: "GET",
      }),
      // providesTags: [tagTypes.propertyOwner],
    }),

    getDashboardInfo: builder.query({
      query: () => ({
        url: "/property-owners/dashboard-info",
        method: "GET",
      }),
      providesTags: [tagTypes.propertyOwner],
    }),
    updateExtraCost: builder.mutation({
      query: ({ data }) => ({
        url: `/property-owners/update-extra-cost`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: [tagTypes.propertyOwner],
    }),
  }),
});

export const {
  useGetPropertyOwnerMyProfileQuery,
  useUpdatePropertyOwnerProfileMutation,
  useGetFinancialInfoQuery,
  useGetDashboardInfoQuery,
  useUpdateExtraCostMutation,
} = propertyOwnerApi;
