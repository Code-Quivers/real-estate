import { fileUrlKey } from "@/configs/envConfig";
import apartment from "../../assets/propertyOwner/apartment.jpg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaUser } from "react-icons/fa";
import { IoChevronBack } from "react-icons/io5";
import { Button } from "rsuite";
const MonthlyReportDetails = ({ reportData }) => {
  const router = useRouter();
  return (
    <section className="border bg-white p-8">
      <div className="grid grid-cols-7 items-center">
        <div className="col-span-2">
          <button onClick={() => router.back()}>
            <IoChevronBack size={24} />
          </button>
        </div>
        <div className="col-span-5">
          <h1>{reportData?.reportTitle}</h1>
        </div>
      </div>
      {/* details */}

      <div key={"report?.reportId"} className="border md:my-5 xl:m-6 shadow rounded-md   p-2 bg-white grid grid-cols-7 md:gap-3 lg:gap-5 xl:gap-10">
        <div className="col-span-3">
          {console.log(`${fileUrlKey()}/${reportData?.information[0]?.image}`)}
          <Image
            className="h-full  object-cover rounded-md"
            src={`${fileUrlKey()}/${reportData?.information[0]?.image}`}
            width={400}
            height={400}
            alt="apartment"
          />
        </div>

        <div className="col-span-4 py-6">
          {reportData?.information?.map((information) => (
            <div key={Math.random()} className="space-y-2">
              <p>$ {information?.monthlyRent}</p>
              <p>
                {information?.numOfBed} Beds {information?.numOfBath} Baths
              </p>
              <p>{information?.address}</p>
              <div className="border    rounded-md p-2 flex gap-3 items-center">
                <div className="w-12 h-12 rounded-full  flex items-center justify-center">
                  {information?.tenantPhoto ? (
                    <Image src={`${fileUrlKey()}/${information?.tenantPhoto}`} width={100} height={100} className="rounded-full" />
                  ) : (
                    <span>
                      <FaUser size={20} className="text-gray-500" />
                    </span>
                  )}
                </div>
                <p>{information?.tenantName}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-4 gap-x-4 lg:gap-x-10 gap-y-5">
        <div className="col-span-2 flex items-center justify-between p-3 border rounded-lg">
          <h2>Monthly Rent</h2>
          <p className="text-lg font-semibold">${reportData?.rentAmount}</p>
        </div>
        <div className="col-span-2 flex items-center justify-between p-3 border rounded-lg">
          <h2>Monthly Expenses</h2>
          <p className="text-lg font-semibold">${reportData?.expenses}</p>
        </div>
        <div className="col-span-2 flex items-center justify-between p-3 border rounded-lg">
          <h2>Rent Collected</h2>
          <p className="text-lg font-semibold">${reportData?.collectedRent}</p>
        </div>
        <div className="col-span-2 flex items-center justify-between p-3 border rounded-lg">
          <h2>Gross Profit</h2>
          <p className="text-lg font-semibold">${reportData?.grossProfit}</p>
        </div>
      </div>
      <div className="mt-5 flex justify-center border rounded-xl p-5">
        <h2>{`Your're`} Profitable</h2>
      </div>

      {/* download */}
      <div className="mt-20 flex justify-center items-center">
        <Button type="button" size="lg" className="!bg-primary !text-white !rounded-3xl !text-xl !px-10 !py-5 ">
          Download
        </Button>
      </div>
    </section>
  );
};

export default MonthlyReportDetails;
