import { baseApi } from "../baseApi";

export const testApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllUsers: build.query({
      query: (arg) => ({
        url: `/users`,
        method: "GET",
        params: arg,
      }),
    }),
  }),
});

export const { useGetAllUsersQuery } = testApi;
