"use client";
import { fileUrlKey } from "@/configs/envConfig";
import { useGetTenantMyProfileQuery } from "@/redux/features/tenant/tenantsApi";
import Image from "next/image";
import profileLogo from "@/assets/propertyOwner/profilePic.png";

const TenantChatBubbleOutgoing = ({ message }) => {
  const { data: dataResponse, isError, isLoading, error } = useGetTenantMyProfileQuery();

  const { data } = dataResponse || {};
  return (
    <div className="w-auto max-w-[80%]">
      <div className="flex items-end gap-2">
        <div className="w-[90%] shadow-xl shadow-black/20 rounded-2xl rounded-br-none bg-black px-4 py-2.5">
          <h4 className="text-white text-sm">{message?.text}</h4>
        </div>
        <div className="w-[50px]">
          <div className="relative w-12  h-12">
            <Image layout="fill" className="rounded-full mt-1" src={data?.profileImage ? `${fileUrlKey()}/${data?.profileImage}` : profileLogo} />
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-3 mr-14">
        <p className="text-xs font-semibold">10:00 Am</p>
      </div>
    </div>
  );
};

export default TenantChatBubbleOutgoing;
