import { tagTypes } from "../../tag-types";
import { baseApi } from "../../api/baseApi";
const USER_API = "/users";

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllUsers: build.query({
      query: (arg: Record<string, any>) => ({
        url: `${USER_API}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.user],
    }),
   
    deleteUser: build.mutation({
      query: (id: string) => ({
        url: `${USER_API}/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.user],
    }),
    getMyProfile: build.query({
      query: () => ({
        url: `${USER_API}/my-profile`,
        method: "GET",
      }),
      providesTags: [tagTypes.user,],
    }),
    updateMyProfile: build.mutation({
      query: ({data}) => ({
        url: `${USER_API}/update-my-profile`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: [tagTypes.user],
    }),
   
  }),
});

export const {
  useGetAllUsersQuery, 
  useDeleteUserMutation,
  useGetMyProfileQuery,
  useUpdateMyProfileMutation, 
} = userApi;
