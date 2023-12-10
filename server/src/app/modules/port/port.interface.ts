export type IPortFilterRequest = {
  searchTerm?: string | undefined;
  portName?: string | undefined;
  startDate?: string | null; // Date range start
  endDate?: string | null; // Date range end
};
export type IPortCreateRequest = {
  portName: string;
  portAddress: string;
};

export type IPortUpdateRequest = {
  portName?: string;
  portAddress?: string;
};

export type IGetAllPortNames = {
  portId: string;
  portName: string;
  portAddress: string;
};
