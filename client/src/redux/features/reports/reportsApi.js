import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types/tag-types";

const REPORT_ROUTES = "/reports";

export const ReportApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addNewMonthlyOrAnnualReport: builder.mutation({
      query: ({ data }) => ({
        url: `${REPORT_ROUTES}/add-monthly-or-annual-report`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.reports],
    }),
    getPropertyOwnerReports: builder.query({
      query: (arg) => ({
        url: `${REPORT_ROUTES}/property-owner-reports`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.reports],
    }),
    sendMessage: builder.mutation({
      query: ({ data, conversationId }) => ({
        url: `${REPORT_ROUTES}/send-message/${conversationId}`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.reports],
    }),
  }),
});

export const { useAddNewMonthlyOrAnnualReportMutation, useGetPropertyOwnerReportsQuery } = ReportApi;
