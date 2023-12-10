export type IPPStrikeOffStatusFilterRequest = {
  searchTerm?: string | undefined;
  portName?: string | undefined;
  startDate?: string | null; // Date range start
  endDate?: string | null; // Date range end
};
export type IPPStrikeOffStatusCreateRequest = {
  ppStatusComment: string;
  styleNo: string;
};

export type IPPStrikeOffStatusUpdateRequest = {
  styleNo: string;
  ppStatusComment: string;
};
