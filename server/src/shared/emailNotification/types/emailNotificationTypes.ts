/* eslint-disable @typescript-eslint/no-explicit-any */
import { MaintenanceRequestStatus } from "@prisma/client";
export type IDetailsForMaintenanceNotification = {
  firstName?: string;
  lastName?: string;
  companyEmailAddress?: string;
  user?: {
    email: string;
  } | null;
  companyName?: string;
  issueDescription: string;
  location: string;
  issueType: string;
  tenantName?: string;
};

export type IDetailsForMaintenanceNotificationForTenant = {
  tenantName: string;
  serviceProviderName: string;
  user: {
    email: string;
  };
  companyName?: string;
  issueDescription: string;
  location: string;
  issuePriority: string;
};

export type IMaintenanceRequestDetails = {
  previousStatus: MaintenanceRequestStatus;
  updatedStatus: MaintenanceRequestStatus;
};

export type ITenantDetailsForNotification = {
  firstName: string;
  lastName: string;
  user: {
    email: string;
  };
};
export type IOwnerDetailsForNotification = {
  firstName: string;
  lastName: string;
  phoneNumber?: string | null;
  user: {
    email: string;
  };
};
export type IReceiverForNotification = {
  email: string;
  userId: string;
};
export type IDueRentForNotification = {
  tenantId: string;
  property: {
    propertyId: string;
    tenantAssignedAt: any;
    monthlyRent: number;
    title: string;
  } | null;
  firstName: string;
  lastName: string;
  user: { email: string } | any;
  phoneNumber?: string | null;
  dueRent: number;
  dueMonths: number;
  dueDays: number;
  rentPaid: boolean;
};

export type IResetPassword = {
  email: string;
  token: string;
  link: string;
};
