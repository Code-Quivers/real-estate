import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../../baseApi";

const AUTH_URL = "/auth";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    dashboardLogin: build.mutation({
      query: ({ data }: any) => ({
        url: `${AUTH_URL}/dashboard-login`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const { useDashboardLoginMutation } = authApi;
