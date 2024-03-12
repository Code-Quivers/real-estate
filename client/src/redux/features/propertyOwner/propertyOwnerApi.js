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
  }),
});

export const {
  useGetPropertyOwnerMyProfileQuery,
  useUpdatePropertyOwnerProfileMutation,
} = propertyOwnerApi;
