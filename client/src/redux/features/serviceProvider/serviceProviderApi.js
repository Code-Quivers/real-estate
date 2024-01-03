import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types/tag-types";

export const serviceProviderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get all available tenants
    getAllServiceProviders: builder.query({
      query: (arg) => ({
        url: "/service-providers/get-all-service-providers",
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.serviceProvider],
    }),
    getServiceProviderMyProfile: builder.query({
      query: () => ({
        url: "/service-providers/get-my-profile",
        method: "GET",
      }),
      providesTags: [tagTypes.serviceProvider],
    }),
    updateServiceProviderMyProfile: builder.mutation({
      query: ({ serviceProviderId, data }) => ({
        url: `/service-providers/update-profile/${serviceProviderId}`,
        method: "PATCH",
        data: data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.serviceProvider],
    }),
  }),
});

export const {
  useGetAllServiceProvidersQuery,
  useGetServiceProviderMyProfileQuery,
  useUpdateServiceProviderMyProfileMutation,
} = serviceProviderApi;
