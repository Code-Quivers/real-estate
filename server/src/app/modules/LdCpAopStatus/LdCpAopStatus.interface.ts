export type IldCpAopStatusCreateRequest = {
  ldCpAopStatusComment: string;
  styleNo: string;
};

export type IldCpAopStatusResponse = {
  styleNo: string;
  ldCpAopStatusComment: string;
  createdAt: Date;
};
