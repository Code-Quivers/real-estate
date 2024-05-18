import { fileUrlKey } from "@/configs/envConfig";
import apartment from "../../assets/propertyOwner/apartment.jpg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaUser } from "react-icons/fa";
import { IoChevronBack } from "react-icons/io5";
import { Avatar, Button } from "rsuite";

const TenantInformation = ({ reportData }) => {
  const router = useRouter();
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

      <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-4">
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
                  <p>${report?.monthlyRent?.toLocaleString()}</p>
                  <p>
                    {report?.numOfBed} Beds {report?.numOfBath} Baths
                  </p>
                  <p>{report?.address}</p>
                </div>
                {/* Tenant Info */}
                <hr />
                <div className="flex gap-3 items-center p-2">
                  <Avatar circle size="md" src={report?.tenantPhoto && `${fileUrlKey()}/${report?.tenantPhoto}`} />
                  <div>
                    <p className="text-sm">{report?.tenantName}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Download Button */}
      <div className="mt-20 flex justify-center items-center">
        <Button type="button" size="lg" className="!bg-primary !text-white !rounded-3xl !text-xl !px-10 !py-5 ">
          Download
        </Button>
      </div>
    </section>
  );
};

export default TenantInformation;
