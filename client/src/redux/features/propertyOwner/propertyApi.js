import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types/tag-types";

export const propertyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addProperties: builder.mutation({
      query: ({ data }) => ({
        url: `/properties/properties/create`,
        method: "POST",
        data: data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.properties],
    }),
  }),
});

export const { useAddPropertiesMutation } = propertyApi;
