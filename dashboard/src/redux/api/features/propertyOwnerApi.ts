import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const propertyOwnerApi = baseApi.injectEndpoints({
  endpoints: (builder: any) => ({
    // get all available tenants
    getAllPropertyOwner: builder.query({
      query: (arg: any) => ({
        url: "/property-owners/get-all-property-owners",
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.propertyOwner],
    }),
  }),
});

export const { useGetAllPropertyOwnerQuery } = propertyOwnerApi;
