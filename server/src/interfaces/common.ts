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
