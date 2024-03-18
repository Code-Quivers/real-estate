import requestApartment from "@/assets/propertyOwner/requestApartment.jpg";
// import MaintenanceRequestAction from "../client/src/components/property-owner/maintenance-request/MaintenanceRequestAction";
import Image from "next/image";

const MaintenanceRequest = () => {
  const allRequest = [
    {
      homeAddressName: "homeAddressName",
      homeOwnerAddress: "homeOwnerAddress",
      PriorityType: "PriorityType",
      image: requestApartment,
    },
    {
      homeAddressName: "homeAddressName",
      homeOwnerAddress: "homeOwnerAddress",
      PriorityType: "PriorityType",
      image: requestApartment,
    },
    {
      homeAddressName: "homeAddressName",
      homeOwnerAddress: "homeOwnerAddress",
      PriorityType: "PriorityType",
      image: requestApartment,
    },
  ];

  return (
    <>
      <section className="max-w-[1050px]  mb-5 mt-14 2xl:mx-auto lg:px-5    2xl:px-0 ">
        <div className="flex justify-center">
          <h2 className="text-4xl ">Maintenance Request</h2>
        </div>
        {/* requests */}
        <div className="mt-10 grid grid-cols-1 gap-5">
          {allRequest?.map((singleReq) => (
            <div className="border flex border-[#acacac]  gap-6" key={Math.random()}>
              <div className="border border-[#acacac]">
                <Image className="w-[500px] h-[250px] object-cover object-left" src={singleReq.image} alt="photo" />
              </div>
              <div className="p-5 flex justify-between w-full ">
                <div className="space-y-3">
                  <h3 className="text-xl font-medium">{singleReq.homeAddressName}</h3>
                  <h3 className="text-xl font-medium">{singleReq.homeOwnerAddress}</h3>
                  <h3 className="text-xl font-medium">{singleReq.PriorityType}</h3>
                </div>
                <div>{/* <MaintenanceRequestAction /> */}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default MaintenanceRequest;
