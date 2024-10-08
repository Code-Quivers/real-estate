"use client";

import { fileUrlKey } from "@/configs/envConfig";
import Image from "next/image";
import { useRouter } from "next/navigation";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { IoChevronBack } from "react-icons/io5";
import { Button } from "rsuite";
import { useRef, useState } from "react";
import { FaUser } from "react-icons/fa";
import EditMonthlyOrAnnualReportModal from "./EditMonthlyOrAnnualReportModal";

const MonthlyReportDetails = ({ reportData }) => {
  const router = useRouter();
  const pdfRef = useRef();
  const downloadPdf = () => {
    const input = pdfRef.current;
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 10; // Adjust Y offset to add some margin at the top

      pdf.addImage(imgData, "PNG", imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save(`${reportData?.reportTitle}.pdf` || "download.pdf");
    });
  };

  // !
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const handleCloseEdit = () => setIsOpenEdit(false);
  return (
    <section className="max-w-4xl mx-auto">
      <div className="flex gap-3 items-center max-md:p-3">
        <div>
          <button
            className="mt-1 hover:border-gray-300 duration-300 rounded-lg border border-transparent p-1"
            onClick={() => router.push("/property-owner/reports")}
          >
            <IoChevronBack size={24} />
          </button>
        </div>
        <div>
          <h1>{reportData?.reportTitle}</h1>
        </div>
      </div>
      {/*  */}
      <div className="my-5">
        <div ref={pdfRef} className="md:px-5">
          {/* photo */}
          <div className="border rounded-md p-2 bg-white grid md:grid-cols-4 gap-x-4 lg:gap-x-10 gap-y-2 lg:gap-y-5">
            <div className="md:col-span-2  h-[220px]">
              <Image
                className="h-full w-full object-cover rounded-md"
                src={`${fileUrlKey()}/${reportData?.information[0]?.image}`}
                width={600}
                height={600}
                alt="T"
              />
            </div>

            <div className="md:col-span-2 py-2 lg:py-6">
              {reportData?.information?.map((information, index) => (
                <div key={index} className="space-y-1 md:space-y-5">
                  <p>${information?.monthlyRent.toLocaleString()}</p>
                  <p>
                    {information?.numOfBed} Beds | {information?.numOfBath} Baths
                  </p>
                  <p>{information?.address}</p>
                  <div className="border bg-gray-50 rounded-md p-2 flex gap-3 items-center">
                    {information?.tenantName ? (
                      <>
                        <div>
                          {information?.tenantPhoto ? (
                            <Image src={`${fileUrlKey()}/${information?.tenantPhoto}`} width={400} height={400} className="rounded-full w-8 h-8" />
                          ) : (
                            <span>
                              <FaUser size={20} className="text-gray-500" />
                            </span>
                          )}
                        </div>
                        <div>
                          <h2>{information?.tenantName}</h2>
                        </div>
                      </>
                    ) : (
                      <div>
                        <h3>Tenant Not Available</h3>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/*  other */}
          <div className="lg:mt-10">
            <div className="grid sm:grid-cols-4  gap-x-4 lg:gap-x-10 gap-y-2.5 md:gap-y-5 max-md:mt-3">
              <div className="col-span-2 bg-white flex items-center justify-between p-4 border rounded-lg">
                <h2>Monthly Rent</h2>
                <p className="text-lg font-semibold">${reportData?.rentAmount?.toLocaleString()}</p>
              </div>
              <div className="col-span-2 bg-white flex items-center justify-between p-4 border rounded-lg">
                <h2>Monthly Expenses</h2>
                <p className="text-lg font-semibold">${reportData?.expenses?.toLocaleString()}</p>
              </div>
              <div className="col-span-2 bg-white flex items-center justify-between p-4 border rounded-lg">
                <h2>Rent Collected</h2>
                <p className="text-lg font-semibold">${reportData?.collectedRent?.toLocaleString()}</p>
              </div>
              <div className="col-span-2 bg-white flex items-center justify-between p-4 border rounded-lg">
                <h2>Gross Profit</h2>
                <h2 className="text-lg font-semibold">
                  {reportData?.grossProfit !== undefined
                    ? reportData.grossProfit < 0
                      ? `-$${Math.abs(reportData.grossProfit).toLocaleString()}`
                      : `$${reportData.grossProfit.toLocaleString()}`
                    : null}
                </h2>
              </div>
            </div>
          </div>
          {/*  */}
          <div className="border rounded-lg bg-white pt-2 mt-6">
            <h2 className={`${reportData?.grossProfit > 0 ? "text-green-500" : "text-red-500"} mb-3  text-center font-semibold`}>
              {reportData?.grossProfit > 0 ? "You're Profitable" : "You're Loosing"}
            </h2>
          </div>
        </div>
      </div>
      {/*  */}
      <div className="my-10 md:mt-10 flex justify-between items-center mx-5">
        <Button onClick={downloadPdf} type="button" size="lg" className="!bg-primary !text-white !rounded-full !text-xl !px-14 !py-4">
          Download
        </Button>
        <Button type="button" onClick={() => setIsOpenEdit(true)} size="lg" className="!bg-primary !text-white !rounded-full !text-xl !px-14 !py-4">
          Edit
        </Button>
      </div>

      <>
        {/* edit modal */}
        <EditMonthlyOrAnnualReportModal isOpen={isOpenEdit} handleClose={handleCloseEdit} reportData={reportData} />
      </>
    </section>
  );
};

export default MonthlyReportDetails;
