import { baseApi } from '../api/baseApi';
import { tagTypes } from '../tag-types/tag-types';

const SUB_CATEGORY_API = '/sub-category';

export const subCategoryApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getSubCategories: build.query({
            query: ({ ...params }) => ({
                url: `${SUB_CATEGORY_API}`,
                method: 'GET',
                params,
            }),
            providesTags: [tagTypes.subCategory],
        }),

        addSubCategory: build.mutation({
            query: ({ data }) => ({
                url: `${SUB_CATEGORY_API}`,
                method: 'POST',
                data: data,
                contentType: 'multipart/form-data',
            }),
            invalidatesTags: [tagTypes.subCategory],
        }),
        deleteSingleSubCategory: build.mutation({
            query: (subCategoryId: string) => ({
                url: `${SUB_CATEGORY_API}/${subCategoryId}`,
                method: 'DELETE',
            }),
            invalidatesTags: [tagTypes.subCategory],
        }),

        updateSingleSubCategory: build.mutation({
            query: ({ id, data }) => ({
                url: `${SUB_CATEGORY_API}/${id}`,

                method: 'PATCH',
                data: data,
                contentType: 'multipart/form-data',
            }),
            invalidatesTags: [tagTypes.subCategory],
        }),
    }),
});

export const { useGetSubCategoriesQuery, useAddSubCategoryMutation, useDeleteSingleSubCategoryMutation, useUpdateSingleSubCategoryMutation } = subCategoryApi;
