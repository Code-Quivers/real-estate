import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types/tag-types";

export const pendingOrderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get all available tenants
    getMyPendingOrders: builder.query({
      query: (arg) => ({
        url: "/pending-orders",
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.serviceProvider],
    }),
  }),
});

export const { useGetMyPendingOrdersQuery } = pendingOrderApi;
