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
    getMyAllConversations: builder.query({
      query: (arg) => ({
        url: `${REPORT_ROUTES}/get-my-all-conversations`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.conversation],
    }),
    sendMessage: builder.mutation({
      query: ({ data, conversationId }) => ({
        url: `${REPORT_ROUTES}/send-message/${conversationId}`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.conversation],
    }),
  }),
});

export const { useAddNewMonthlyOrAnnualReportMutation, useSendMessageMutation, useGetMyAllConversationsQuery, useGetMessagesQuery } = ReportApi;
