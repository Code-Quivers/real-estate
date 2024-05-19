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
      invalidatesTags: [tagTypes.reports, tagTypes.properties],
    }),
    updateMonthlyOrAnnualReportData: builder.mutation({
      query: ({ data, reportId }) => ({
        url: `${REPORT_ROUTES}/report-update/${reportId}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.reports, tagTypes.properties],
    }),
    generateTenantInformationReport: builder.mutation({
      query: () => ({
        url: `${REPORT_ROUTES}/generate-tenant-info-report`,
        method: "POST",
      }),
      invalidatesTags: [tagTypes.reports, tagTypes.properties],
    }),
    addAnnualTaxDocumentReport: builder.mutation({
      query: ({ data }) => ({
        url: `${REPORT_ROUTES}/annual-tax-document-report`,
        method: "POST",
        data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.reports, tagTypes.properties],
    }),
    getPropertyOwnerReports: builder.query({
      query: (arg) => ({
        url: `${REPORT_ROUTES}/property-owner-reports`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.reports, tagTypes.properties],
    }),
    getReportDetails: builder.query({
      query: ({ reportId }) => ({
        url: `${REPORT_ROUTES}/report-details/${reportId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.reports],
    }),
  }),
});

export const {
  useAddNewMonthlyOrAnnualReportMutation,
  useUpdateMonthlyOrAnnualReportDataMutation,
  useGenerateTenantInformationReportMutation,
  useAddAnnualTaxDocumentReportMutation,
  useGetPropertyOwnerReportsQuery,
  useGetReportDetailsQuery,
} = ReportApi;
