import { baseApi } from '../api/baseApi';
import { tagTypes } from '../tag-types/tag-types';

const CATEGORY_API = '/category';

export const categoryApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getCategories: build.query({
            query: ({ ...params }) => ({
                url: `${CATEGORY_API}`,
                method: 'GET',
                params,
            }),
            providesTags: [tagTypes.category],
        }),

        addCategory: build.mutation({
            query: ({ data }) => ({
                url: `${CATEGORY_API}`,
                method: 'POST',
                data: data,
                contentType: 'multipart/form-data',
            }),
            invalidatesTags: [tagTypes.category],
        }),
        deleteSingleCategory: build.mutation({
            query: (categoryId: string) => ({
                url: `${CATEGORY_API}/${categoryId}`,
                method: 'DELETE',
            }),
            invalidatesTags: [tagTypes.category],
        }),

        updateSingleCategory: build.mutation({
            query: ({ categoryId, data }) => ({
                url: `${CATEGORY_API}/${categoryId}`,
                method: 'PATCH',
                data: data,
                contentType: 'multipart/form-data',
            }),
            invalidatesTags: [tagTypes.category],
        }),

        categoryAssign: build.mutation({
            query: ({ data }) => ({
                url: `${CATEGORY_API}/category-assign`,
                method: 'POST',
                data: data,
            }),
            invalidatesTags: [tagTypes.category, tagTypes.user],
        }),
    }),
});

export const { useGetCategoriesQuery, useAddCategoryMutation, useDeleteSingleCategoryMutation, useUpdateSingleCategoryMutation, useCategoryAssignMutation } = categoryApi;
