export type ICourierFilterRequest = {
  searchTerm?: string | undefined;
  awbNo?: string | undefined;
  styleNo?: string | undefined;
  startDate?: string | null;
  endDate?: string | null;
};
export type ICourierCreateRequest = {
  courierName: string;
  awbNo: string;
  courierDate: Date;
  courierDetails: string;
  courierWeight: string;
  styleNo: string;
};

export type ICourierUpdateRequest = {
  styleNo?: string;
  courierName?: string;
  awbNo?: string;
  courierDate?: Date;
  courierDetails?: string;
  courierWeight?: string;
};

export type IStyleWiseCourier = {
  styleNo: string;
  _count: {
    couriers: number;
  };
};
