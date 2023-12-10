export type IBulkStatusFilterRequest = {
  searchTerm?: string | undefined;
  portName?: string | undefined;
  startDate?: string | null; // Date range start
  endDate?: string | null; // Date range end
};
export type IBulkStatusCreateRequest = {
  styleNo: string;
  bulkProductionComment: string;
};

export type IBulkStatusUpdateRequest = {
  bulkProductionComment: string;
  styleNo: string;
};
