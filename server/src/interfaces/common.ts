/* eslint-disable @typescript-eslint/no-explicit-any */
import { IGenericErrorMessage } from "./error";

export type IGenericResponse<T> = {
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
  data: T;
};

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};

// for socket
export type UserData = {
  userId: string;
};

export type NewMessage = {
  data: {
    conversation: {
      participants: { userId: string }[];
    };
    senderId: string;
  };
};

export type IServiceProviderDetailsForNotification = {
  firstName: string;
  lastName: string;
  companyEmailAddress: string;
  user: {
    email: string;
  };
  companyName: string;
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
