import { fileUrlKey } from "@/configs/envConfig";
import Image from "next/image";
import { useRouter } from "next/navigation";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { IoChevronBack } from "react-icons/io5";
import { Avatar, Button } from "rsuite";
import { useRef } from "react";

const MonthlyReportDetails = ({ reportData }) => {
  const router = useRouter();
  const pdfRef = useRef();
  const downloadPdf = () => {
    const input = pdfRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      // const pdfWidth = pdf.internal.pageSize.getWidth();
      // const pdfHeight = pdf.internal.pageSize.getHeight();
      // const imgWidth = canvas.width;
      // const imgHeight = canvas.height;
      // const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      // const imgX = (pdfWidth - imgWidth * ratio) / 2;
      // const imgY = 30;
      // pdf.addImage(imgData, "PNG", imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      // pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.addImage(imgData, "PNG", 0, 0);
      pdf.save("download.pdf");
    });
  };

  return (
    <section>
      <div className="grid grid-cols-7 max-md:p-3 items-center">
        <div className="col-span-1">
          <button onClick={() => router.back()}>
            <IoChevronBack size={24} />
          </button>
        </div>
        <div className="col-span-5">
          <h1>{reportData?.reportTitle}</h1>
        </div>
      </div>
      {/* details */}
      <div ref={pdfRef}>
        <div className="border m-3 md:m-6 rounded-md  md:h-60 p-2 bg-white grid md:grid-cols-12 md:gap-5 xl:gap-10">
          <div className="md:col-span-5 h-[220px]">
            <Image
              className="h-full w-full object-cover rounded-md"
              src={`${fileUrlKey()}/${reportData?.information[0]?.image}`}
              width={800}
              height={800}
              alt="apartment"
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
                <div className="border bg-gray-50    rounded-md p-2 flex gap-3 items-center">
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
          <div className="col-span-2 bg-white flex items-center justify-between p-3 border rounded-lg">
            <h2>Monthly Rent</h2>
            <p className="text-lg font-semibold">${reportData?.rentAmount}</p>
          </div>
          <div className="col-span-2 bg-white flex items-center justify-between p-3 border rounded-lg">
            <h2>Monthly Expenses</h2>
            <p className="text-lg font-semibold">${reportData?.expenses}</p>
          </div>
          <div className="col-span-2 bg-white flex items-center justify-between p-3 border rounded-lg">
            <h2>Rent Collected</h2>
            <p className="text-lg font-semibold">${reportData?.collectedRent}</p>
          </div>
          <div className="col-span-2 bg-white flex items-center justify-between p-3 border rounded-lg">
            <h2>Gross Profit</h2>
            <p className="text-lg font-semibold">${reportData?.grossProfit}</p>
          </div>
        </div>
        <div className="mt-5 flex justify-center p-5 mx-5 text-green-500 font-bold text-lg">
          <h2>{`Your're`} Profitable</h2>
        </div>
      </div>

      {/* download */}
      <div className="my-10 md:mt-20 flex justify-center items-center">
        <Button onClick={downloadPdf} type="button" size="lg" className="!bg-primary !text-white !rounded-3xl !text-xl !px-10 !py-5 ">
          Download
        </Button>
      </div>
    </section>
  );
};

export default MonthlyReportDetails;
