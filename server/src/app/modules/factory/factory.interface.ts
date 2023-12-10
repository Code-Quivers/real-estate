export type IFactoryFilterRequest = {
  searchTerm?: string | undefined;
  factoryName?: string | undefined;
  startDate?: string | null; // Date range start
  endDate?: string | null; // Date range end
};
export type IFactoryCreateRequest = {
  factoryName: string;
  factoryAddress: string;
};

export type IFactoryUpdateRequest = {
  factoryName?: string;
  factoryAddress?: string;
};

export type IFactoryGetAllNames = {
  factoryId: string;
  factoryName: string;
};
