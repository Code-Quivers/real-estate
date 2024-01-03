import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types/tag-types";

export const AuthenticationApi = baseApi.injectEndpoints({
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
    // ! service provider sign up
    serviceProviderSignUp: builder.mutation({
      query: ({ data }) => ({
        url: "/auth/service-provider/create-user",
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    // ! property owner sign up
    propertyOwnerSignUp: builder.mutation({
      query: ({ data }) => ({
        url: "/auth/property-owner/create-user",
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    // login
    loginUser: builder.mutation({
      query: ({ data }) => ({
        url: "/auth/login",
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const {
  useTenantSignUpMutation,
  useLoginUserMutation,
  useServiceProviderSignUpMutation,
  usePropertyOwnerSignUpMutation,
} = AuthenticationApi;
