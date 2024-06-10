import { ReportType } from "@prisma/client";

export type IReportFilterRequest = {
  searchTerm?: string | undefined;
  propertyId?: string | undefined;
  reportType?: ReportType | undefined;
  startDate?: string | undefined;
  endDate?: string | undefined;
};

export type IInformationType = {
  image: string;
  monthlyRent: number;
  numOfBed: number;
  numOfBath: number;
  address: string;
  propertyId: string;
  tenantName: string;
  tenantPhoto: string | null | undefined;
};

export type IAddMonthlyOrAnnualReport = {
  reportType: ReportType;
  collectedRent: number;
  expenses: number;
  propertyId: string;
  rentAmount?: number;
  information: IInformationType[];
};

export type IAddAnnuallyReport = {
  collectedRent: number;
  expenses: number;
  propertyId: string;
  rentAmount: number;
};
export type IAddAnnualTaxDocument = {
  reportType: ReportType;
};

export type IUpdateMonthlyOrAnnualReport = {
  collectedRent?: number;
  expenses?: number;
  grossProfit?: number;
};
