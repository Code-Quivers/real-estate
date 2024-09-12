import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder: any) => ({
    getPaymentReports: builder.query({
      query: (arg: any) => ({
        url: "/payment/get-connected-accounts",
        method: "GET",
        // params: arg,
      }),
      //   providesTags: [tagTypes.],
    }),
  }),
});

export const { useGetPaymentReportsQuery } = paymentApi;
