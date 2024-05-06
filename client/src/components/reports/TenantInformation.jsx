import apartment from "../../assets/propertyOwner/apartment.jpg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaUser } from "react-icons/fa";
import { IoChevronBack } from "react-icons/io5";
import { Button } from "rsuite";

const TenantInformation = ({ reportData }) => {
  const router = useRouter();
  return (
    <section className="md:border md:bg-white   md:p-8">
      <div className="grid grid-cols-5">
        <div className="col-span-2">
          <button onClick={() => router.back()}>
            <IoChevronBack size={24} />
          </button>
        </div>
        <div className="col-span-3">
          <h1 className="text-lg font-medium">{reportData?.reportTitle}</h1>
        </div>
      </div>
      {/* details */}

      <div>
        {reportData?.information?.length > 0 &&
          reportData?.information?.map((report) => (
            <div
              key={report?.reportId}
              className="border max-md:my-3 xl:m-6 md:m-3 shadow rounded-md  md:h-60 grid grid-cols-1 md:grid-cols-7 p-2 bg-white gap-y-5 md:gap-3 xl:gap-10"
            >
              <div className="md:col-span-3">
                <Image className="h-full  object-cover rounded-md" src={apartment} alt="apartment" />
              </div>
              <div className="md:col-span-4 md:py-6 md:w-4/5 space-y-2">
                <div>
                  <p>${report?.monthlyRent}</p>
                  <p>
                    {report?.numOfBed} Beds {report?.numOfBath} Baths
                  </p>
                  <p>{report?.address}</p>
                </div>
                {/* Tenant Info */}
                <div className="border w-full border-stone-400 rounded-md p-2 flex gap-3 items-center">
                  <div className=" rounded-full border border-gray-500 flex items-center justify-center p-2">
                    <span>
                      <FaUser size={25} className="text-gray-500" />
                    </span>
                  </div>
                  <div>
                    <p>{report?.tenantName}</p>
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
