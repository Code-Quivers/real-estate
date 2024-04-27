import apartment from "../../assets/propertyOwner/apartment.jpg";
import Image from "next/image";
import { FaUser } from "react-icons/fa";
const TenantInformation = ({ reportData }) => {
  console.log(reportData);
  return (
    <section className="border bg-white p-8">
      <div className="grid grid-cols-5">
        <div className="col-span-2">
          <button>Back</button>
        </div>
        <div className="col-span-3">
          <h1>{reportData?.reportTitle}</h1>
        </div>
      </div>
      {/* details */}

      <div>
        {reportData?.information?.length > 0 &&
          reportData?.information?.map((report) => (
            <div key={report?.reportId} className="border m-6 shadow rounded-md  h-60 p-2 bg-white flex flex-col lg:flex lg:flex-row gap-10">
              <Image className="h-full w-2/5 object-cover rounded-md" src={apartment} alt="apartment" />
              <div className="py-6 w-3/5 space-y-2">
                <p>${report?.monthlyRent}</p>
                <p>
                  {report?.numOfBed} Beds {report?.numOfBath} Baths
                </p>
                <p>{report?.address}</p>
                <div className="border w-1/2 border-stone-400 rounded-md p-2 flex gap-3 items-center">
                  <div className="w-10 h-10 rounded-full border border-gray-500 flex items-center justify-center">
                    <span>
                      <FaUser size={20} className="text-gray-500" />
                    </span>
                  </div>
                  <p>{report?.tenantName}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default TenantInformation;
