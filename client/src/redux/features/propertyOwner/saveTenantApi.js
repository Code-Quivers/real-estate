import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types/tag-types";

const SAVE_ITEM = "/saved-item";

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
    saveAllTenant: builder.mutation({
      query: (data) => ({
        url: `${SAVE_ITEM}/create`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [
        tagTypes.services,
        tagTypes.serviceProvider,
        tagTypes.user,
        tagTypes.tenant,
        tagTypes.items,
      ],
    }),
  }),
});

export const { useGetAllSavedItemsQuery, useSaveAllTenantMutation } =
  servicesApi;
