import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../../baseApi";

export const propertiesApi = baseApi.injectEndpoints({
  endpoints: (build: any) => ({
    // get all properties
    getAllProperties: build.query({
      query: (arg: any) => ({
        url: "/properties/get-all-properties",
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.properties],
    }),
    updatePropertyDetails: build.mutation({
      query: ({ data, propertyId }: any) => ({
        url: `/properties/update-property-details/${propertyId}`,
        method: "PATCH",
        data,
      }),
      providesTags: [tagTypes.properties],
    }),
  }),
});

export const { useGetAllPropertiesQuery, useUpdatePropertyDetailsMutation } =
  propertiesApi;
