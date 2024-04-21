"use client";
import AddReportFormModal from "@/components/reports/AddReportFormModal";
import Link from "next/link";
import { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FcDownload } from "react-icons/fc";
import { Button, IconButton, SelectPicker } from "rsuite";

const data = ["Eugenia", "Bryan", "Linda", "Nancy", "Lloyd", "Alice", "Julia", "Albert"].map((item) => ({ label: item, value: item }));
const PropertyOwnerReportPage = () => {
  const reports = [
    {
      title: "Monthly Property Statement - Property A",
      createdAt: "01/01/2023",
    },
    {
      title: "Monthly Property Statement - Property B",
      createdAt: "01/02/2023",
    },
    {
      title: "Tenant Information",
      createdAt: "16/01/2023",
    },
    {
      title: "Annual Tax Document",
      createdAt: "16/01/2023",
    },
    {
      title: "Annual Property Statement -- Property A",
      createdAt: "16/01/2024",
    },
    {
      title: "Annual Property Statement -- Property B",
      createdAt: "16/01/2024",
    },
  ];

  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const handleClose = () => setIsOpenAdd(false);
  return (
    <section className="max-w-[1050px]    mb-5  xl:mx-auto md:px-3 lg:px-5 px-5 2xl:px-0 ">
      <div className="flex justify-center  py-5">
        <h2 className="text-2xl font-semibold">Reports</h2>
      </div>

      {/* filters */}
      <div className="grid grid-cols-3  gap-1">
        <div className="col-span-1">
          <SelectPicker
            size="lg"
            data={["Monthly", "Annually", "Tax"].map((item) => ({
              label: item,
              value: item,
            }))}
            searchable={false}
            placeholder="Report Type"
            className="!w-full"
          />
        </div>
        <div className="col-span-1">
          <SelectPicker size="lg" data={data} searchable={false} placeholder="Property" className="!w-full" />
        </div>
        <div className="col-span-1">
          <SelectPicker size="lg" data={data} searchable={false} placeholder="Time Frame" className="!w-full" />
        </div>
      </div>

      <div className="mt-7">
        <Button onClick={() => setIsOpenAdd(true)} className="!bg-[#29429f] !text-white !px-10 !py-3 !rounded-full" size="lg">
          Add Report
        </Button>
      </div>

      {/*  */}
      <div className="border border-[#949494] mt-5">
        {reports?.map((report, idx) => (
          <div
            key={Math.random()}
            className={`flex justify-between hover:bg-black/5 p-5 ${idx !== reports?.length - 1 && "border-b border-[#949494]"}`}
          >
            <div>
              <h2>{report?.title}</h2>
              <p>{report?.createdAt}</p>
            </div>
            <div className="flex gap-1">
              <Link href="/property-owner/reports/statement">
                <IconButton className="hover:!bg-black/10" circle icon={<FaRegEye className="text-[#1565c0]" size={20} />} />
              </Link>
              <div>
                <IconButton className="hover:!bg-black/10" circle icon={<FcDownload size={20} />} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* add modal */}
      <div>
        <AddReportFormModal isOpen={isOpenAdd} handleClose={handleClose} />
      </div>
    </section>
  );
};

export default PropertyOwnerReportPage;
