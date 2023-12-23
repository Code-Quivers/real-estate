import { IUploadFile } from '../../../interfaces/file';

export type IPropertyReqData = {
  numOfBed: number;
  numOfBath: number;
  address: string;
  description: string;
  maintenanceCoveredTenant: string;
  maintenanceCoveredOwner: string;
  schools: string;
  universities: string;
  allowedPets: string;
  profileId: string;
  images: IUploadFile[];
};
export type IPropertyReqPayload = {
  data: IPropertyReqData;
  profileId: string;
  images: IUploadFile[];
};
