"use client";
import { useGetPropertyOwnerMyProfileQuery } from "@/redux/features/propertyOwner/propertyOwnerApi";
import moment from "moment";
import { fileUrlKey } from "@/configs/envConfig";
import PropertyOwnerChart from "@/components/property-owner/profile/PropertyOwnerChart";
import DashboardInfo from "@/components/property-owner/dashboard/DashboardInfo";
import Score from "@/components/Shared/Score/Score";
import { Avatar } from "rsuite";

const PropertyOwnerInformation = () => {
  const { data, isLoading } = useGetPropertyOwnerMyProfileQuery(null);
  const { data: myProfileData } = data || {};
  return (
    <section className="max-w-[1050px] mb-5 xl:mx-auto md:px-3 lg:px-5 px-3 2xl:px-0">
      {/* profile Information */}
      <div className="grid grid-cols-5 w-full  max-md:mb-5 items-start md:items-center   md:justify-between max-md:py-5 md:mr-5 justify-between  lg:justify-between lg:mr-10 ">
        <div className="col-span-4 flex max-md:flex-col  justify-start max-md:gap-2  md:justify-start md:items-center gap-3 md:mt-5">
          <div>
            <Avatar circle size="xl" src={myProfileData?.profileImage && `${fileUrlKey()}/${myProfileData?.profileImage}`} />
          </div>
          <div>
            <h4>
              Name : {myProfileData?.firstName ?? "--"} {myProfileData?.lastName ?? "--"}
            </h4>
            <h4>Email Address : {myProfileData?.user?.email ?? "--"}</h4>
            <h4>Phone Number : {myProfileData?.phoneNumber?.replace(/\d/g, "X") ?? "N/A"}</h4>
          </div>
        </div>
        <div>
          <div className=" col-span-1 mr-5   flex flex-col-reverse md:flex-col justify-center items-center gap-2 md:gap-4">
            <h5 className="font-medium text-sm md:text-xl">Score</h5>
            <Score score={myProfileData?.scoreRatio?.score} total={myProfileData?.scoreRatio?.total} />
          </div>
        </div>
      </div>

      {/*  */}
      <div className="mt-5">
        {/* Dashboard */}
        <div>
          <div className="flex justify-center">
            <h2 className="text-2xl font-medium mb-4">Dashboard</h2>
          </div>
          <div>
            <div>
              <DashboardInfo />
            </div>
            <div className="grid md:grid-cols-12 gap-4">
              <div className="col-span-6">
                <PropertyOwnerChart />
              </div>
              <div className="col-span-6">
                <PropertyOwnerChart />
              </div>
            </div>
          </div>
        </div>
        <div className="border mt-10 shadow-md bg-white rounded-xl">
          <div className="px-3 py-2 flex justify-between items-center">
            <h2 className="text-xl font-medium ">Profile Details</h2>
          </div>
          <div className="grid p-3 lg:p-5 border-t md:grid-cols-2  gap-5 gap-x-10 ">
            <div className="">
              <h2 className="text-gray-600">Full Name</h2>
              <p className="">
                {myProfileData?.firstName ?? "--"} {myProfileData?.lastName ?? "--"}
              </p>
            </div>
            <div className="">
              <h2 className="text-gray-600">Phone Number</h2>
              <p className="text-lg">{myProfileData?.phoneNumber ? myProfileData?.phoneNumber.replace(/\d/g, "X") : "N/A"}</p>
            </div>
            <div className="">
              <h2 className="text-gray-600">Account Registered</h2>
              <p className="">{moment(myProfileData?.createdAt).format("lll")}</p>
            </div>
            <div className="">
              <h2 className="text-gray-600">Total Units</h2>
              <p className="">{myProfileData?._count?.properties ? myProfileData?._count?.properties : "N/A"}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyOwnerInformation;
