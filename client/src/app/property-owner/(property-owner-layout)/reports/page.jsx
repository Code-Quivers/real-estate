"use client";
import AddReportFormModal from "@/components/reports/AddReportFormModal";
import SingleReport from "@/components/reports/SingleReport";
import { useGetPropertyOwnerReportsQuery } from "@/redux/features/reports/reportsApi";
import { useState } from "react";
import { Button, DateRangePicker, SelectPicker } from "rsuite";

const reportType = [
  {
    label: "Monthly",
    value: "MONTHLY",
  },
  {
    label: "Annual",
    value: "ANNUALLY",
  },
  {
    label: "Tenant Information",
    value: "TENANT_INFO",
  },
  {
    label: "Tax",
    value: "TAX",
  },
].map((item) => ({ label: item.label, value: item.value }));

const PropertyOwnerReportPage = () => {
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const handleClose = () => setIsOpenAdd(false);
  const { data, isLoading } = useGetPropertyOwnerReportsQuery();
  return (
    <section className="max-w-[1050px]    mb-5  xl:mx-auto md:px-3 lg:px-5 px-5 2xl:px-0 ">
      <div className="flex justify-center  py-5">
        <h2 className="text-2xl font-semibold">Reports</h2>
      </div>

      {/* filters */}
      <div className="grid md:grid-cols-3 gap-2">
        <div className="">
          <SelectPicker size="lg" data={reportType} searchable={false} placeholder="Report Type" className="!w-full" />
        </div>
        <div className="">
          <SelectPicker size="lg" data={reportType} searchable={false} placeholder="Property" className="!w-full" />
        </div>
        <div className="">
          <DateRangePicker
            menuAutoWidth={true}
            placement="bottomEnd"
            showOneCalendar
            size="lg"
            data={reportType}
            searchable={false}
            placeholder="Time Frame"
            className="!w-full"
          />
        </div>
      </div>

      <div className="mt-5">
        <Button onClick={() => setIsOpenAdd(true)} className="!bg-[#29429f] !text-white !px-10 !py-3 !rounded-full max-sm:!w-full" size="lg">
          Add Report
        </Button>
      </div>

      {/*  */}
      <div>
        <div className="border border-[#949494] mt-5">
          {!isLoading &&
            data?.data?.data?.length > 0 &&
            data?.data?.data?.map((report, idx) => (
              <div
                key={Math.random()}
                className={`flex justify-between hover:bg-black/5 p-5 ${idx !== data?.data?.data?.length - 1 && "border-b border-[#949494]"}`}
              >
                <SingleReport report={report} />
              </div>
            ))}
        </div>
      </div>

      {/* add modal */}
      <div>
        <AddReportFormModal isOpen={isOpenAdd} handleClose={handleClose} />
      </div>
    </section>
  );
};

export default PropertyOwnerReportPage;
