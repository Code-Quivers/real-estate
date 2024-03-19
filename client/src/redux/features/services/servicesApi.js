import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types/tag-types";

export const servicesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get all services
    getAllServices: builder.query({
      query: (arg) => ({
        url: "/services/get-all-services",
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.services],
    }),
    updateServiceInformation: builder.mutation({
      query: ({ data }) => ({
        url: `/services/create-or-update-service`,
        method: "PUT",
        data: data,
      }),
      invalidatesTags: [tagTypes.services, tagTypes.serviceProvider, tagTypes.user, tagTypes.tenant],
    }),
  }),
});

export const { useGetAllServicesQuery, useUpdateServiceInformationMutation } = servicesApi;
