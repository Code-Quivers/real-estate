/* eslint-disable @typescript-eslint/no-explicit-any */

import { UserRoles } from '@prisma/client';

export type IRequestUser = {
  role: UserRoles;
  userId: string;
  profileId: string;
  firstName: string;
  lastName: string;
  iat: number;
  exp: number;
};

export type IUpdateUserRequest = {
  firstName: string;
  lastName: string;
  profileImage: string;
  password: string;
  role: UserRoles;
};

// export type IUsersResponse = {
//   userId: string;
//   email: string;
//   createdAt: Date;
//   updatedAt: Date;
//   profile: Profile | null;
//   userStatus: UserStatus;
// };
// export type IUpdateProfileReqAndResponse = {
//   firstName?: string;
//   lastName?: string;
//   profileImage?: string;
//   role?: UserRoles;
// };
// export type IUserUpdateReqAndResponse = {
//   email?: string;
//   password?: string;
//   userStatus?: UserStatus;
//   role?: UserRoles;
// };
