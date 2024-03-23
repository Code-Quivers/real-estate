import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types/tag-types";

const MAINTENANCE_REQUEST_API = "/maintenance-request";

export const MaintenanceRequestApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addMaintenanceRequest: builder.mutation({
      query: (data) => ({
        url: `${MAINTENANCE_REQUEST_API}/add-request-to-property-owner`,
        method: "POST",
        data: data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.maintenanceRequest, tagTypes.propertyOwner, tagTypes.serviceProvider],
    }),

    getMyRequestedMaintenance: builder.query({
      query: () => ({
        url: `${MAINTENANCE_REQUEST_API}/my-requested-maintenance`,
        method: "GET",
      }),
      providesTags: [tagTypes.maintenanceRequest, tagTypes.properties],
    }),
    // for service provider
    getMyAllAcceptedOrders: builder.query({
      query: () => ({
        url: `${MAINTENANCE_REQUEST_API}/my-all-accepted-orders`,
        method: "GET",
      }),
      providesTags: [tagTypes.maintenanceRequest, tagTypes.properties],
    }),
    getAllMaintenanceReqForOwner: builder.query({
      query: () => ({
        url: `${MAINTENANCE_REQUEST_API}/requested-maintenance-for-owner`,
        method: "GET",
      }),
      providesTags: [tagTypes.maintenanceRequest, tagTypes.properties, tagTypes.serviceProvider],
    }),
    getAllMaintenanceReqForServiceProvider: builder.query({
      query: () => ({
        url: `${MAINTENANCE_REQUEST_API}/requested-maintenance-for-service-providers`,
        method: "GET",
      }),
      providesTags: [tagTypes.maintenanceRequest, tagTypes.properties, tagTypes.serviceProvider],
    }),
    // !----------------------------
    acceptMaintenanceRequestForOwner: builder.mutation({
      query: (maintenanceRequestId) => ({
        url: `${MAINTENANCE_REQUEST_API}/accept-maintenance-req-for-owner/${maintenanceRequestId}`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.maintenanceRequest, tagTypes.propertyOwner, tagTypes.serviceProvider],
    }),
    acceptMaintenanceRequestForServiceProvider: builder.mutation({
      query: (maintenanceRequestId) => ({
        url: `${MAINTENANCE_REQUEST_API}/accept-maintenance-req-for-service-provider/${maintenanceRequestId}`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.maintenanceRequest, tagTypes.propertyOwner, tagTypes.serviceProvider, tagTypes.properties],
    }),
    updateMaintenanceOrderRequest: builder.mutation({
      query: ({ data, maintenanceRequestId }) => ({
        url: `${MAINTENANCE_REQUEST_API}/update-maintenance-order-req/${maintenanceRequestId}`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.maintenanceRequest, tagTypes.serviceProvider],
    }),
  }),
});

export const {
  useAddMaintenanceRequestMutation,
  useGetMyRequestedMaintenanceQuery,
  useGetAllMaintenanceReqForOwnerQuery,
  useAcceptMaintenanceRequestForOwnerMutation,
  useGetAllMaintenanceReqForServiceProviderQuery,
  useAcceptMaintenanceRequestForServiceProviderMutation,
  useGetMyAllAcceptedOrdersQuery,
  useUpdateMaintenanceOrderRequestMutation,
} = MaintenanceRequestApi;
