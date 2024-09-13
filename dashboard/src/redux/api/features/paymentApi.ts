import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder: any) => ({
    getPaymentReports: builder.query({
      query: (arg: any) => ({
        url: "/payment/get-connected-accounts",
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.accounts],
    }),
    deleteFinancialAccount: builder.mutation({
      query: (paymentId: string) => ({
        url: `/payment/delete/${paymentId}`,
        method: "DELETE",
        // params: arg,
      }),
      invalidatesTags: [tagTypes.accounts],
    }),
  }),
});

export const { useGetPaymentReportsQuery, useDeleteFinancialAccountMutation } =
  paymentApi;
