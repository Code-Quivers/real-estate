"use client";
import AddReportFormModal from "@/components/reports/AddReportFormModal";
import SingleReport from "@/components/reports/SingleReport";
import { fileUrlKey } from "@/configs/envConfig";
import { useGetMyAllUnitsQuery } from "@/redux/features/propertyOwner/propertyApi";
import { useGetPropertyOwnerReportsQuery } from "@/redux/features/reports/reportsApi";
import Image from "next/image";
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
  const query = {};
  const [selectedProperty, setSelectedProperty] = useState("");

  const { data, isLoading } = useGetPropertyOwnerReportsQuery();
  const { data: myUnitsData, isLoading: isLoadingMyUnits } = useGetMyAllUnitsQuery();

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
          <SelectPicker
            size="lg"
            data={
              myUnitsData?.data?.map((item) => ({
                label: item?.title,
                value: item?.propertyId,
                others: {
                  image: item?.images[0],
                  tenant: item?.Tenant,
                  numOfBed: item?.numOfBed,
                  numOfBath: item?.numOfBath,
                  address: item?.address,
                  monthlyRent: item?.monthlyRent?.toLocaleString(),
                },
              })) || []
            }
            searchable={false}
            placeholder="Property"
            className="!w-full"
            renderMenuItem={(value, item) => {
              return (
                <div className="  flex gap-2 border items-center rounded-md p-1">
                  <div>
                    <Image
                      width={100}
                      height={100}
                      src={item?.others?.image && `${fileUrlKey()}/${item?.others?.image}`}
                      alt="Profile Image"
                      className="w-[80px] h-[80px] rounded-md object-cover"
                    />
                  </div>
                  <div className="*:text-balance *:text-sm">
                    <h2 className="font-medium ">{value}</h2>
                    <h2 className="">${item.others?.monthlyRent}</h2>
                    <h2 className="">
                      {item?.others?.numOfBed} Beds {item?.others?.numOfBath} Baths
                    </h2>
                    <h2 className="">{item.others?.address ?? "-"}</h2>
                  </div>
                </div>
              );
            }}
          />
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
        <Button onClick={() => setIsOpenAdd(true)} className="!bg-[#29429f] hover:!bg-primary/80 !text-white !px-10 !py-3 !rounded-full max-md:!w-full" size="lg">
          Add Report
        </Button>
      </div>

      {/*  */}
      <div>
        <div className=" space-y-2  mt-5">
          {!isLoading &&
            data?.data?.data?.length > 0 &&
            data?.data?.data?.map((report, idx) => (
              <div key={idx} className={`flex justify-between border shadow bg-white rounded-lg hover:bg-white/5 duration-300 p-5`}>
                <SingleReport report={report} />
              </div>
            ))}
          {/* if no report */}
          {!isLoading && !data?.data?.data?.length && (
            <div className="flex justify-center items-center min-h-[20vh]">
              <h2 className="font-medium">No Reports Found !</h2>
            </div>
          )}
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
