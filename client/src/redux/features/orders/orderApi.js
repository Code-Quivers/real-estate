import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types/tag-types";

export const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    capturePaypalPayment: builder.query({
      query: ({ orderId }) => ({
        url: `/payment-paypal/capture/${orderId}`,
        method: "POST",
      }),
      providesTags: [tagTypes.properties],
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
      query: ({orderInfo}) => ({
        url: `/orders/update-status`,
        method: "PATCH",
        data: orderInfo
      }),
      invalidatesTags: [tagTypes.properties, tagTypes.propertyOwner, tagTypes.order],
    }),
  }),
});

export const {
  useCapturePaypalPaymentQuery,
  useGetSingleOrderQuery,
  useUpdatePropertyTrialPeriodMutation,
  useUpdateOrderInfoMutation,
} = orderApi;
