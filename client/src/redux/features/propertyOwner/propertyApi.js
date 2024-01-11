import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types/tag-types";

export const propertyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get all available tenants
    // getAllAvailableTenants: builder.query({
    //   query: (arg) => ({
    //     url: "/tenants/get-all-tenants",
    //     method: "GET",
    //     params: arg,
    //   }),
    //   providesTags: [tagTypes.tenant],
    // }),

    addProperties: builder.mutation({
      query: ({ data }) => ({
        url: `/properties/add-properties`,
        method: "PATCH",
        data: data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.tenant],
    }),
  }),
});

export const { useAddPropertiesMutation } = propertyApi;
