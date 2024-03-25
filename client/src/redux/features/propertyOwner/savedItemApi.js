import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types/tag-types";

const SAVE_ITEM = "/saved-item";

export const savedItemApi = baseApi.injectEndpoints({
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

    saveItem: builder.mutation({
      query: (data) => ({
        url: `${SAVE_ITEM}/create`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.services, tagTypes.serviceProvider, tagTypes.user, tagTypes.tenant, tagTypes.items],
    }),
    removeFromSavedItem: builder.mutation({
      query: ({ itemId }) => ({
        url: `${SAVE_ITEM}/remove?itemId=${itemId}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.services, tagTypes.items, tagTypes.tenant],
    }),
  }),
});

export const { useGetAllSavedItemsQuery, useSaveItemMutation, useRemoveFromSavedItemMutation } = savedItemApi;
