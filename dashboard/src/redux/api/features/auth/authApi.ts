import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../../baseApi";

const AUTH_URL = "/auth";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    registration: build.mutation({
      query: ({ data }: any) => ({
        url: `${AUTH_URL}/create-user`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    userLogin: build.mutation({
      query: ({ data }: any) => ({
        url: `${AUTH_URL}/login`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    forgetPassword: build.mutation({
      query: ({ email }: any) => ({
        url: `${AUTH_URL}/forget-password`,
        method: "POST",
        data: email,
      }),
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const {
  useRegistrationMutation,
  useUserLoginMutation,
  useForgetPasswordMutation,
} = authApi;
