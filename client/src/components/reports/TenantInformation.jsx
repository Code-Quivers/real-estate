import apartment from "../../assets/propertyOwner/apartment.jpg";
import Image from "next/image";
import { FaUser } from "react-icons/fa";
const TenantInformation = () => {
  return (
    <>
      <div className="border-stone-300 shadow rounded-md border h-60 p-2 bg-white flex flex-col lg:flex lg:flex-row gap-10">
        <Image className="h-full w-2/5 object-cover rounded-md" src={apartment} alt="apartment" />
        <div className="py-6 w-3/5 space-y-2">
          <p>$1200</p>
          <p>3 Beds 3 Baths</p>
          <p>3 Belair Dr, Binghamton, NY 13921</p>
          <div className="border w-1/2 border-stone-400 rounded-md p-2 flex gap-3 items-center">
            <div className="w-10 h-10 rounded-full border border-gray-500 flex items-center justify-center">
              <span>
                <FaUser size={20} className="text-gray-500" />
              </span>
            </div>
            <p>Tenant Name</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TenantInformation;
