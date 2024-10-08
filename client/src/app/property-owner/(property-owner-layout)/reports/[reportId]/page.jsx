"use client";
import AnnualReportDetails from "@/components/reports/AnnualReportDetails";
import AnnualTaxDocument from "@/components/reports/AnnualTaxDocumentDetails";
import MonthlyReportDetails from "@/components/reports/MonthlyReportDetails";
import TenantInformation from "@/components/reports/TenantInformation";
import { useGetReportDetailsQuery } from "@/redux/features/reports/reportsApi";

const TenantInformationReportPage = ({ params }) => {
  const { data, isLoading } = useGetReportDetailsQuery(
    {
      reportId: params?.reportId,
    },
    {
      skip: !params?.reportId,
    },
  );
  return (
    <section className="max-w-5xl min-h-screen lg:mb-5 mx-auto md:px-3 lg:px-5 px-2 2xl:px-0">
      <div className=" flex justify-center my-2 max-md:hidden">
        <h2>Reports</h2>
      </div>
      {/* if report type is tenant_info */}
      <div>{!isLoading && data?.data?.reportType === "TENANT_INFO" && <TenantInformation reportData={data?.data} />}</div>
      {/* if report type is monthly */}
      <div>{!isLoading && data?.data?.reportType === "MONTHLY" && <MonthlyReportDetails reportData={data?.data} />}</div>
      {/* if report type is annually */}
      <div>{!isLoading && data?.data?.reportType === "ANNUALLY" && <AnnualReportDetails reportData={data?.data} />}</div>
      <div>{!isLoading && data?.data?.reportType === "TAX" && <AnnualTaxDocument reportData={data?.data} />}</div>
    </section>
  );
};

export default TenantInformationReportPage;
