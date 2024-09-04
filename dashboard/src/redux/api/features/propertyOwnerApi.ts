import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const propertyOwnerApi = baseApi.injectEndpoints({
  endpoints: (builder: any) => ({
    // get all property owners
    getAllPropertyOwner: builder.query({
      query: (arg: any) => ({
        url: "/property-owners/get-all-property-owners",
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.propertyOwner],
    }),
    updatePropertyOwnerProfile: builder.mutation({
      query: ({ data, propertyOwnerId }: any) => ({
        url: `/property-owners/update-profile/${propertyOwnerId}`,
        method: "PATCH",
        data: data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.propertyOwner],
    }),
    deletePropertyOwnerData: builder.mutation({
      query: ({ propertyOwnerId }: any) => ({
        url: `/property-owners/delete-property-owner/${propertyOwnerId}`,
        method: "DELETE",
      }),
      invalidatesTags: [
        tagTypes.propertyOwner,
        tagTypes.tenant,
        tagTypes.properties,
      ],
    }),
  }),
});

export const {
  useUpdatePropertyOwnerProfileMutation,
  useGetAllPropertyOwnerQuery,
  useDeletePropertyOwnerDataMutation,
} = propertyOwnerApi;
