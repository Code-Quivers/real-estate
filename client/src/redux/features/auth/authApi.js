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
      invalidatesTags: [tagTypes.user, tagTypes.tenant],
    }),
    // ! service provider sign up
    serviceProviderSignUp: builder.mutation({
      query: ({ data }) => ({
        url: "/auth/service-provider/create-user",
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.user, tagTypes.serviceProvider],
    }),
    // ! property owner sign up
    propertyOwnerSignUp: builder.mutation({
      query: ({ data }) => ({
        url: "/auth/property-owner/create-user",
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.user, tagTypes.propertyOwner],
    }),
    // login
    loginUser: builder.mutation({
      query: ({ data }) => ({
        url: "/auth/login",
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.user, tagTypes.tenant],
    }),
  }),
});

export const { useTenantSignUpMutation, useLoginUserMutation, useServiceProviderSignUpMutation, usePropertyOwnerSignUpMutation } = AuthenticationApi;
