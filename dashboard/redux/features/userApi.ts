import { baseApi } from '../api/baseApi';
import { tagTypes } from '../tag-types/tag-types';

const USER_API = '/users';

export const usersApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getUser: build.query({
            query: ({ ...params }) => ({
                url: `${USER_API}`,
                method: 'GET',
                params,
            }),
            providesTags: [tagTypes.user],
        }),
        ///edit user
        getAllClients: build.query({
            query: (arg: Record<string, any>) => ({
                url: `${USER_API}/get-clients`,
                method: 'GET',
                params: arg,
            }),
            providesTags: [tagTypes.user],
        }),
        updateUser: build.mutation({
            query: ({ id, payload }) => ({
                url: `${USER_API}/update-user/${id}`,
                method: 'PATCH',
                data: payload,
            }),
            invalidatesTags: [tagTypes.user],
        }),
        getMyProfile: build.query({
            query: () => ({
                url: `${USER_API}/my-profile`,
                method: 'GET',
            }),
            providesTags: [tagTypes.user],
        }),
        updateMyProfile: build.mutation({
            query: (data) => ({
                url: `${USER_API}/update-my-profile`,
                method: 'PATCH',
                data: data,
            }),
            invalidatesTags: [tagTypes.user],
        }),
        updateMyUserInfo: build.mutation({
            query: (data) => ({
                url: `${USER_API}/update-my-email-password`,
                method: 'PATCH',
                data: data,
            }),
            invalidatesTags: [tagTypes.user],
        }),

        deleteUser: build.mutation({
            query: (id: string) => ({
                url: `${USER_API}/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [tagTypes.user],
        }),
    }),
});

export const { useGetUserQuery, useUpdateUserMutation, useDeleteUserMutation } = usersApi;
