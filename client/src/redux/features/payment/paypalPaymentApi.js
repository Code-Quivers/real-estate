import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types/tag-types";

export const propertyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPaypalPayment: builder.mutation({
      query: (paymentInfo) => ({
        url: `/payment-paypal/pay`,
        method: "POST",
        data: JSON.stringify(paymentInfo),
        contentType: "application/json",
      }),
      // invalidatesTags: [tagTypes.properties],
    }),
    capturePaypalPayment: builder.mutation({
      query: ({ data }) => ({
        url: `/payment-paypal/capture`,
        method: "POST",
        data: JSON.stringify(data),
        contentType: "application/json",
      }),
      // invalidatesTags: [tagTypes.properties],
    }),
  }),
});

export const {
  useCreatePaypalPaymentMutation,
  useCapturePaypalPaymentMutation,
} = propertyApi;
