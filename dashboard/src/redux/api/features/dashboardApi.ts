import { baseApi } from "../baseApi";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder: any) => ({
    getDashboardData: builder.query({
      query: () => ({
        url: "/dashboard/get-dashboard-data",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetDashboardDataQuery } = dashboardApi;
