import Image from "next/image";
import tenantImage from "@/assets/home/tenant.png";
import propertyOwnerImage from "@/assets/home/propertyOwner.png";
import serviceProviderImage from "@/assets/home/serviceProvider.png";

const HomePage = () => {
  const allData = [
    {
      title: "Tenant",
      image: tenantImage,
    },
    {
      title: "Property Owner",
      image: propertyOwnerImage,
    },
    {
      title: "Service Provider",
      image: serviceProviderImage,
    },
  ];
  return (
    <div className="h-[100vh] flex flex-col items-center justify-center gap-10 ">
      <div className="flex justify-center ">
        <h1 className="text-6xl font-bold">Which best describes you?</h1>
      </div>
      <div className="grid grid-cols-3 gap-5 justify-center max-w-7xl mx-auto">
        {allData.map((data) => (
          <div
            key={Math.random()}
            className="col-span-1 flex flex-col justify-center items-center rounded-3xl  bg-[#29429f]"
          >
            <Image
              src={serviceProviderImage}
              className="object-contain  w-[60%] border  "
              alt=""
            />
            <h3 className="text-white text-3xl font-semibold">
              Service Provider
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
