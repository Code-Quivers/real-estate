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
  }),
});

export const { useCreatePaypalPaymentMutation, useCapturePaypalPaymentMutation } = orderApi;
