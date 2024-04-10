import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types/tag-types";

export const stripePaymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getClientSecret: builder.mutation({
      query: (paymentInfo) => ({
        url: `/payment-stripe/create-payment-intent`,
        method: "POST",
        data: JSON.stringify(paymentInfo),
        contentType: "application/json",
      }),
      // invalidatesTags: [tagTypes.properties],
    }),
    
  }),
});

export const {
  useGetClientSecretMutation,
} = stripePaymentApi;
