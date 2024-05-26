"use client";
import AddReportFormModal from "@/components/reports/AddReportFormModal";
import SingleReport from "@/components/reports/SingleReport";
import { fileUrlKey } from "@/configs/envConfig";
import { reportType } from "@/constants/selectPicker.const";
import { useGetMyAllUnitsQuery } from "@/redux/features/propertyOwner/propertyApi";
import { useGetPropertyOwnerReportsQuery } from "@/redux/features/reports/reportsApi";
import Image from "next/image";
import { useState } from "react";
import { Button, DateRangePicker, Placeholder, SelectPicker } from "rsuite";

const PropertyOwnerReportPage = () => {
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const handleClose = () => setIsOpenAdd(false);
  // filter
  const query = {};
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [selectedReportType, setSelectedReportType] = useState(null);
  const [selectedDate, setSelectedDate] = useState({
    startDate: "",
    endDate: "",
  });

  query["propertyId"] = selectedProperty;
  query["reportType"] = selectedReportType;
  query["startDate"] = selectedDate.startDate;
  query["endDate"] = selectedDate.endDate;

  // !
  const { data, isLoading } = useGetPropertyOwnerReportsQuery({ ...query });
  const { data: myUnitsData, isLoading: isLoadingMyUnits } = useGetMyAllUnitsQuery();

  //

  const handleFilterDate = (date) => {
    if (!date?.length) {
      setSelectedDate({
        startDate: "",
        endDate: "",
      });
    }

    if (date) {
      const startDate = new Date(date[0]);
      const endDate = new Date(date[1]);

      // Set the start time to 00:00:00 (12:00 AM)
      startDate.setHours(0, 0, 0, 0);

      // Set the end time to 23:59:59 (11:59 PM)
      endDate.setHours(23, 59, 59, 999);

      const formattedStartDate = startDate.toISOString();
      const formattedEndDate = endDate.toISOString();

      if (startDate !== null && endDate !== null) {
        setSelectedDate({
          startDate: formattedStartDate,
          endDate: formattedEndDate,
        });
      }
    }
  };

  return (
    <section className="max-w-6xl min-h-screen xl:mx-auto md:px-3 lg:px-5 px-5 2xl:px-0 ">
      <div className="flex justify-center  py-5">
        <h2 className="text-2xl font-semibold">Reports</h2>
      </div>

      {/* filters */}
      <div className="grid md:grid-cols-3 gap-2">
        <div className="">
          <SelectPicker
            size="lg"
            data={reportType}
            searchable={false}
            placeholder="Report Type"
            onChange={(e) => setSelectedReportType(e)}
            onClean={() => setSelectedProperty(null)}
            className="!w-full"
          />
        </div>
        <div className="">
          <SelectPicker
            size="lg"
            onChange={(e) => setSelectedProperty(e)}
            onClean={() => setSelectedProperty(null)}
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
            loading={isLoadingMyUnits}
            className="!w-full"
            renderMenuItem={(value, item) => {
              return (
                <div className="grid grid-cols-3 max-w-[320px] border rounded-lg hover:border-primary duration-300 transition-all text-start">
                  <div className="col-span-1 max-h-24 h-full">
                    <Image
                      width={500}
                      height={500}
                      src={item?.others?.image && `${fileUrlKey()}/${item?.others?.image}`}
                      alt="Profile Image"
                      className="w-full h-full rounded-xl object-cover p-1"
                    />
                  </div>
                  <div className="*:text-balance *:text-sm mr-2 col-span-2 px-2">
                    <h2 className="font-medium line-clamp-1">{value}</h2>
                    <h2 className="line-clamp-1">${item.others?.monthlyRent}</h2>
                    <h2 className="line-clamp-1">
                      {item?.others?.numOfBed} Beds {item?.others?.numOfBath} Baths
                    </h2>
                    <h2 className="text-xs line-clamp-2">{item.others?.address ?? "-"}</h2>
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
            onChange={(value) => {
              handleFilterDate(value);
            }}
            searchable={false}
            placeholder="Time Frame"
            className="!w-full"
          />
        </div>
      </div>

      <div className="mt-5">
        <Button
          onClick={() => setIsOpenAdd(true)}
          className="!bg-[#29429f] hover:!bg-primary/80 !text-white !px-10 !py-3 !rounded-full max-md:!w-full"
          size="lg"
        >
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
          {isLoading && (
            <div className="space-y-2">
              <Placeholder.Graph active height={85} />
              <Placeholder.Graph active height={85} />
              <Placeholder.Graph active height={85} />
              <Placeholder.Graph active height={85} />
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
