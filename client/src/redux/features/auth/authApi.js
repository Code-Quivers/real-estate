import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types/tag-types";

export const tenantAuthApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // tenant sign up
    tenantSignUp: builder.mutation({
      query: ({ data }) => ({
        url: "/auth/tenant/create-user",
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    // login
    login: builder.mutation({
      query: ({ data }) => ({
        url: "/auth/login",
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const { useTenantSignUpMutation } = tenantAuthApi;
