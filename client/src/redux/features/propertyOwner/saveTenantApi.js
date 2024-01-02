import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types/tag-types";

const SAVE_ITEM = "saved-item";

export const servicesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get all services
    getAllSavedItems: builder.query({
      query: (arg) => ({
        url: `${SAVE_ITEM}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.services, tagTypes.items],
    }),
    updateServiceInformation: builder.mutation({
      query: ({ data }) => ({
        url: `/services/create-or-update-service`,
        method: "PUT",
        data: data,
      }),
      invalidatesTags: [
        tagTypes.services,
        tagTypes.serviceProvider,
        tagTypes.user,
        tagTypes.tenant,
      ],
    }),
  }),
});

export const { useGetAllSavedItemsQuery, useUpdateServiceInformationMutation } =
  servicesApi;
