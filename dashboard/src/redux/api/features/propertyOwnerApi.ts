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
  useGetAllPropertyOwnerQuery,
  useDeletePropertyOwnerDataMutation,
} = propertyOwnerApi;
