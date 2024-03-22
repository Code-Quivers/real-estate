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
  }),
});

export const { useAddMaintenanceRequestMutation, useGetMyRequestedMaintenanceQuery } = MaintenanceRequestApi;
