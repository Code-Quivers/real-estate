import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types/tag-types";

export const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: ({ data }) => ({
        url: `/orders/create`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.properties, tagTypes.propertyOwner],
    }),
    getSingleOrder: builder.query({
      query: ({ orderId }) => ({
        url: `/orders/get-single-order/${orderId}`,
      }),
      providesTags: [tagTypes.order, tagTypes.properties, tagTypes.propertyOwner],
    }),
    updatePropertyTrialPeriod: builder.mutation({
      query: ({ orderId }) => ({
        url: `/orders/update-to-trial-period/${orderId}`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.properties, tagTypes.propertyOwner],
    }),

    updateOrderInfo: builder.mutation({
      query: ({ orderInfo }) => ({
        url: `/orders/update-status`,
        method: "PATCH",
        data: orderInfo,
      }),
      invalidatesTags: [tagTypes.properties, tagTypes.propertyOwner, tagTypes.order],
    }),
  }),
});

export const { useCreateOrderMutation, useGetSingleOrderQuery, useUpdatePropertyTrialPeriodMutation, useUpdateOrderInfoMutation } = orderApi;
