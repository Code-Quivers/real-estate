import Image from "next/image";
import tenantImage from "@/assets/home/tenant.png";
import propertyOwnerImage from "@/assets/home/propertyOwner.png";
import serviceProviderImage from "@/assets/home/serviceProvider.png";
import Link from "next/link";

const HomePage = () => {
  const allData = [
    {
      title: "Tenant",
      image: tenantImage,
      href: "/tenant/login",
    },
    {
      title: "Property Owner",
      image: propertyOwnerImage,
      href: "/property-owner/login",
    },
    {
      title: "Service Provider",
      image: serviceProviderImage,
      href: "/service-provider/login",
    },
  ];
  return (
    <div className="lg:h-[100vh] flex flex-col items-center justify-center  max-lg:mt-10 max-lg:pb-10">
      <div className="flex justify-center    ">
        <h1 className="text-5xl  md:text-5xl lg:text-6xl font-bold max-lg:text-center ">Which best describes you?</h1>
      </div>
      <div className="grid grid-cols-1  lg:grid-cols-3  xl:grid-cols-3 gap-5 mt-10 lg:mt-20 justify-center max-lg:mx-5 max-w-6xl mx-auto  ">
        {allData.map((data) => (
          <div key={Math.random()} className="col-span-1 flex justify-center rounded-[40px] lg:rounded-[60px] items-center overflow-hidden">
            <Link
              className="w-full grid grid-cols-1 justify-center  p-5 py-5 lg:py-6 rounded-[40px] lg:rounded-[60px]  bg-[#29429f]  hover:bg-[#1d3796] transition-all duration-400 ease-in-out  items-center  "
              key={Math.random()}
              href={data.href}
            >
              <div className="flex w-full flex-col items-center justify-center gap-5">
                <Image src={data.image} className="object-contain overflow-hidden  object-center  h-[250px] lg:h-[300px]   " alt="" />
                <h3 className="text-white text-4xl font-semibold">{data.title}</h3>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
