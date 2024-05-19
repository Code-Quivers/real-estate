import { fileUrlKey } from "@/configs/envConfig";
import Image from "next/image";
import { FaUser } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { IoChevronBack } from "react-icons/io5";
import { Avatar, Button } from "rsuite";
import { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const AnnualReportDetails = ({ reportData }) => {
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
  return (
    <section className="max-w-4xl mx-auto">
      <div className="flex gap-3 items-center max-md:p-3">
        <div>
          <button className="mt-1 hover:border-gray-300 duration-300 rounded-lg border border-transparent p-1" onClick={() => router.back()}>
            <IoChevronBack size={24} />
          </button>
        </div>
        <div>
          <h1 className="font-semibold">{reportData?.reportTitle}</h1>
        </div>
      </div>
      {/* details */}

      <div className="border m-3 md:m-6 shadow rounded-md  md:h-60 p-2 bg-white grid md:grid-cols-12 md:gap-5 xl:gap-10">
        <div className="md:col-span-5 h-[220px]">
          <Image
            className="h-full w-full  object-cover rounded-md"
            src={`${fileUrlKey()}/${reportData?.information[0]?.image}`}
            width={600}
            height={600}
            alt="Apartment Photo"
          />
        </div>

        <div className="md:col-span-7 py-6">
          {reportData?.information?.map((information) => (
            <div key={Math.random()} className="space-y-2">
              <p>$ {information?.monthlyRent}</p>
              <p>
                {information?.numOfBed} Beds {information?.numOfBath} Baths
              </p>
              <p>{information?.address}</p>
              <div className="border bg-gray-50 rounded-md p-2 flex gap-3 items-center">
                <div className="w-12 h-12 rounded-full  flex items-center justify-center">
                  <Avatar circle size="md" src={information?.tenantPhoto && `${fileUrlKey()}/${information?.tenantPhoto}`} />
                  {/* {information?.tenantPhoto ? (
                    <Image src={`${fileUrlKey()}/${information?.tenantPhoto}`} width={100} height={100} className="rounded-full" />
                  ) : (
                    <span>
                      <FaUser size={20} className="text-gray-500" />
                    </span>
                  )} */}
                </div>
                <p>{information?.tenantName}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="grid sm:grid-cols-4 px-5 gap-x-4 lg:gap-x-10 gap-y-5 max-md:mt-5">
        <div className="col-span-2 flex bg-white items-center justify-between p-3 border rounded-lg">
          <h2>Annual Rent</h2>
          <p className="text-lg font-semibold">${reportData?.rentAmount?.toLocaleString()}</p>
        </div>
        <div className="col-span-2 flex bg-white items-center justify-between p-3 border rounded-lg">
          <h2>Annual Expenses</h2>
          <p className="text-lg font-semibold">${reportData?.expenses?.toLocaleString()}</p>
        </div>
        <div className="col-span-2 flex bg-white items-center justify-between p-3 border rounded-lg">
          <h2>Rent Collected</h2>
          <p className="text-lg font-semibold">${reportData?.collectedRent?.toLocaleString()}</p>
        </div>
        <div className="col-span-2 flex bg-white items-center justify-between p-3 border rounded-lg">
          <h2>Gross Profit</h2>
          <p className="text-lg font-semibold">${reportData?.grossProfit?.toLocaleString()}</p>
        </div>
      </div>
      <div
        className={`${reportData?.grossProfit > 0 ? "text-green-500" : "text-red-500"} mt-5 flex max-md:m-3 rounded-xl justify-center text-lg font-bold p-5`}
      >
        <h2>{reportData?.grossProfit > 0 ? "You're Profitable" : "You're Loosing"}</h2>
      </div>
      {/* download */}
      <div className="my-10 md:mt-20 flex justify-center items-center">
        <Button type="button" size="lg" className="!bg-primary !text-white !rounded-3xl !text-xl !px-10 !py-5 ">
          Download
        </Button>
      </div>
    </section>
  );
};

export default AnnualReportDetails;
