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
      providesTags: [tagTypes.properties],
    }),
  }),
});

export const {
  useAddPropertiesMutation,
  useGetAllAvailableUnitsQuery,
  useGetMyAllUnitsQuery,
} = propertyApi;
