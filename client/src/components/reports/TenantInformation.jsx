import { fileUrlKey } from "@/configs/envConfig";
import apartment from "../../assets/propertyOwner/apartment.jpg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaUser } from "react-icons/fa";
import { IoChevronBack } from "react-icons/io5";
import { Avatar, Button } from "rsuite";
import html2canvas from "html2canvas";
import { useRef } from "react";
import jsPDF from "jspdf";

const TenantInformation = ({ reportData }) => {
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
    <section className="">
      <div className="grid grid-cols-5 my-3">
        <div className="col-span-2">
          <button onClick={() => router.back()}>
            <IoChevronBack size={24} />
          </button>
        </div>
        <div className="col-span-3">
          <h1 className="text-xl font-medium">{reportData?.reportTitle}</h1>
        </div>
      </div>
      {/* details */}

      <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-4 md:px-5" ref={pdfRef}>
        {reportData?.information?.length > 0 &&
          reportData?.information?.map((report) => (
            <div key={report?.reportId} className="bg-white border rounded-lg shadow">
              <div className="p-2">
                <Image
                  width={900}
                  height={900}
                  className="h-[200px] w-full object-cover rounded-md"
                  src={`${fileUrlKey()}/${report?.image}`}
                  alt="apartment"
                />
              </div>
              <div>
                <div className="px-2 py-1">
                  <p className="font-semibold">${report?.monthlyRent?.toLocaleString()}</p>
                  <p>
                    {report?.numOfBed} Beds | {report?.numOfBath} Baths
                  </p>
                  <p className="text-sm">{report?.address}</p>
                </div>
                {/* Tenant Info */}
                <hr />
                {/* <div className="flex gap-3 items-center p-2">
                  <Avatar circle size="md" src={report?.tenantPhoto && `${fileUrlKey()}/${report?.tenantPhoto}`} />
                  <div>
                    <p className="text-sm">{report?.tenantName}</p>
                  </div>
                </div> */}
                {report?.tenantName ? (
                  <div className="p-3">
                    <div className="rounded-full flex gap-3 items-center">
                      {report?.tenantPhoto ? (
                        <Image src={`${fileUrlKey()}/${report?.tenantPhoto}`} width={100} height={100} className="rounded-full" />
                      ) : (
                        <span>
                          <FaUser size={20} className="text-gray-500" />
                        </span>
                      )}
                      <div>
                        <h2 className="text-sm">{report?.tenantName}</h2>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h3>Tenant Not Available</h3>
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>

      {/* Download Button */}
      <div className="mt-20 flex justify-center items-center">
        <Button onClick={downloadPdf} type="button" size="lg" className="!bg-primary !text-white !rounded-3xl !text-xl !px-10 !py-5 ">
          Download
        </Button>
      </div>
    </section>
  );
};

export default TenantInformation;
