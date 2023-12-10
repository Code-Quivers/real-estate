// modules
export type ICreatePPSubmission = {
  styleNo: string;
  factorySubmissionDate: Date;
};
export type IUpdatePPSubmission = {
  styleNo: string;
  ppSubmissionId: string;
  factorySubmittedDate: Date;
};
export type IUpdatePPSubmissionResponse = {
  createdAt: Date;
  ppSubmissionId: string;
};
export type IUpdatePPSubmittedResponse = {
  createdAt: Date;
  updatedAt: Date;
  ppSubmissionId: string;
};
