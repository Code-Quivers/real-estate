import profileLogo from "@/assets/propertyOwner/profilePic.png";
import Image from "next/image";

const PropertyOwnerSavedTenants = () => {
  const allRequest = [
    {
      tenantName: "Tenant name",
      placeToRent: "Place to rend",
      rentWillingToPay: "Rent willing to pay",
      image: profileLogo,
    },
    {
      tenantName: "Tenant name",
      placeToRent: "Place to rend",
      rentWillingToPay: "Rent willing to pay",
      image: profileLogo,
    },
    {
      tenantName: "Tenant name",
      placeToRent: "Place to rend",
      rentWillingToPay: "Rent willing to pay",
      image: profileLogo,
    },
  ];

  return (
    <>
      <section className="max-w-[1050px]  mb-5 mt-14 2xl:mx-auto lg:px-5    2xl:px-0 ">
        <div className="flex justify-center">
          <h2 className="text-4xl font-medium">Saved Tenants</h2>
        </div>
        {/* requests */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
          {allRequest?.map((singleReq) => (
            <div
              className=" col-span-1  border flex justify-between items-center px-5 border-[#acacac]  gap-2"
              key={Math.random()}
            >
              <div>
                <Image
                  className="w-[80px] h-[65px] object-cover object-left  rounded-full  "
                  src={singleReq.image}
                  alt="photo"
                />
              </div>
              <div className="p-5 flex justify-between w-full ">
                <div className="space-y-1">
                  <h3 className="text-lg font-medium">
                    {singleReq.tenantName}
                  </h3>
                  <h3 className="text-lg font-medium">
                    {singleReq.placeToRent}
                  </h3>
                  <h3 className="text-lg font-medium">
                    {singleReq.rentWillingToPay}
                  </h3>
                </div>
              </div>
              <div className=" outline outline-8 outline-[#58ba66] border  ring-[#33333360] ring border-[#33333360]  rounded-full   flex justify-center items-center  w-[70px] h-[50px]">
                <div className=" flex w-full flex-col justify-center items-center">
                  <span>9</span>
                  <span className="w-[70%] border-t border-[#b6b6b6]" />
                  <span>10</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default PropertyOwnerSavedTenants;
