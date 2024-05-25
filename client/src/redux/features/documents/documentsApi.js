import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types/tag-types";

const DOCUMENT_API = "/documents";

export const documentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addNewDocumentTemplate: builder.mutation({
      query: ({ data }) => ({
        url: `${DOCUMENT_API}/add-template`,
        method: "POST",
        data: data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.propertyOwner, tagTypes.properties, tagTypes.tenant, tagTypes.documents],
    }),
    sendDocumentTemplate: builder.mutation({
      query: ({ data }) => ({
        url: `${DOCUMENT_API}/send-document`,
        method: "POST",
        data: data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.propertyOwner, tagTypes.properties, tagTypes.tenant, tagTypes.documents],
    }),
    updateProperty: builder.mutation({
      query: ({ propertyId, data }) => ({
        url: `/properties/update-property/${propertyId}`,
        method: "PATCH",
        data: data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.properties],
    }),

    getMyAllDocumentTemplates: builder.query({
      query: (arg) => ({
        url: `${DOCUMENT_API}/templates`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.propertyOwner, tagTypes.properties, tagTypes.tenant, tagTypes.documents],
    }),
    getSingleDocumentTemplate: builder.query({
      query: ({ templateId }) => ({
        url: `${DOCUMENT_API}/templates/${templateId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.properties, tagTypes.tenant, tagTypes.propertyOwner],
    }),
    removeDocumentTemplate: builder.mutation({
      query: ({ data }) => ({
        url: `${DOCUMENT_API}/document/remove-template`,
        method: "DELETE",
        data: data,
      }),
      invalidatesTags: [tagTypes.properties, tagTypes.tenant],
    }),
    // for tenants
    getDocuments: builder.query({
      query: () => ({
        url: `${DOCUMENT_API}/documents`,
        method: "GET",
      }),
      providesTags: [tagTypes.properties, tagTypes.tenant, tagTypes.documents],
    }),
    sendSignedDocument: builder.mutation({
      query: ({ data }) => ({
        url: `${DOCUMENT_API}/update-document-with-tenant-sign`,
        method: "PATCH",
        data: data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.propertyOwner, tagTypes.properties, tagTypes.tenant, tagTypes.documents],
    }),
  }),
});

export const {
  useAddNewDocumentTemplateMutation,
  useSendDocumentTemplateMutation,
  useUpdatePropertyMutation,
  useGetMyAllDocumentTemplatesQuery,
  useGetSingleDocumentTemplateQuery,
  useGetDocumentsQuery,
  useSendSignedDocumentMutation,
  useRemoveDocumentTemplateMutation,
} = documentApi;
