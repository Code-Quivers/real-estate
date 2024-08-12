import { baseApi } from '../api/baseApi';
import { tagTypes } from '../tag-types/tag-types';

const PRODUCT_API = '/product';

export const productApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getProducts: build.query({
            query: ({ ...params }) => ({
                url: `${PRODUCT_API}`,
                method: 'GET',
                params,
            }),
            providesTags: [tagTypes.category, tagTypes.subCategory, tagTypes.product],
        }),

        addProduct: build.mutation({
            query: ({ data }) => ({
                url: `${PRODUCT_API}`,
                method: 'POST',
                data: data,
                contentType: 'multipart/form-data',
            }),
            invalidatesTags: [tagTypes.category, tagTypes.subCategory, tagTypes.product],
        }),
        deleteSingleProduct: build.mutation({
            query: (productId: string) => ({
                url: `${PRODUCT_API}/${productId}`,
                method: 'DELETE',
            }),
            invalidatesTags: [tagTypes.category, tagTypes.subCategory, tagTypes.product],
        }),

        updateSingleProduct: build.mutation({
            query: ({ productId, data }) => ({
                url: `${PRODUCT_API}/${productId}`,
                method: 'PATCH',
                data: data,
                contentType: 'multipart/form-data',
            }),
            invalidatesTags: [tagTypes.category, tagTypes.subCategory, tagTypes.product],
        }),
    }),
});

export const { useGetProductsQuery, useAddProductMutation, useDeleteSingleProductMutation, useUpdateSingleProductMutation } = productApi;
