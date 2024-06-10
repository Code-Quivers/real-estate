"use client";
import Image from "next/image";
import React, { useState } from "react";
import unitInfoImage from "@/assets/tenant/AustralianHousing-scaled.webp";
import { Button, Loader } from "rsuite";
import Link from "next/link";
import { useGetTenantMyUnitInformationQuery } from "@/redux/features/tenant/tenantsApi";
import { fileUrlKey } from "@/configs/envConfig";
import TenantMakePaymentModal from "@/components/tenant/unitInformation/TenantMakePaymentModal";
import { useRouter } from "next/navigation";
import Score from "@/components/Shared/Score/Score";
import { getPackageExpiredDates } from "@/utils/GetDateCalculation";
import SendMessagePopOverFromTenant from "@/components/Shared/modal/SendMessagePopOverFromTenant";

const TenantUnitInformation = () => {
  const { data, isLoading, isError, error } = useGetTenantMyUnitInformationQuery({});
  const { data: unitRes } = data || {};
  const [isOpenMakePayment, setIsOpenMakePayment] = useState(false);
  const handleClose = () => setIsOpenMakePayment(false);
  const router = useRouter();
  return (
    <div className="max-w-6xl mt-6 xl:mx-auto mx-3  max-lg:pb-10">
      <h2 className="text-2xl mb-5 text-center">Unit Information</h2>

      {!isLoading && !isError && unitRes && (
        <div>
          <div className="grid lg:grid-cols-6 max-lg:gap-5 grid-cols-1 lg:border lg:rounded-md">
            <div
              key={Math.random()}
              className="lg:col-span-2 lg:m-2 border bg-white rounded-md transition-all duration-500 ease-in-out  max-lg:border shadow"
            >
              <Image
                width={300}
                height={300}
                src={unitRes?.property?.images?.length ? `${fileUrlKey()}/${unitRes?.property?.images[0]}` : unitInfoImage}
                className="object-cover w-full max-h-[200px] object-center rounded-t-md"
                alt=""
              />

              <div className="flex justify-between items-start mt-2 px-2 py-1">
                <div>
                  <h2 className="line-clamp-1">{unitRes?.property?.title}</h2>
                  <h2 className="text-lg font-semibold">${unitRes?.property?.monthlyRent?.toLocaleString()}</h2>
                  <h2 className="text-sm">
                    <span>{unitRes?.property?.numOfBed} bed</span> <span>{unitRes?.property?.numOfBath} bath</span>
                  </h2>
                  <h2 className="text-sm line-clamp-2">{unitRes?.property?.address}</h2>
                </div>

                <div>
                  <Score score={unitRes?.property?.scoreRatio?.score} total={unitRes?.property?.scoreRatio?.total} />
                </div>
              </div>
              {/* owner */}
              <hr className="my-2" />
              <div className="px-2 pb-3">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="">Owner </h2>
                    <h2 className="line-clamp-1 font-medium">
                      {unitRes?.property?.owner?.firstName} {unitRes?.property?.owner?.lastName}
                    </h2>
                  </div>
                  <div>
                    <SendMessagePopOverFromTenant receiverId={unitRes?.property?.owner?.userId} />
                  </div>
                </div>
              </div>
            </div>

            <div className="  lg:col-span-2 flex justify-center items-center max-lg:border lg:border-l p-20 max-lg:shadow max-lg:rounded-md">
              <div>
                <h2 className="text-2xl text-center font-semibold">Balance Due</h2>
                <p className="py-3 text-center text-lg font-semibold">
                  <span>$ </span>
                  <span>{unitRes?.dueRent}</span>
                  {/* <span>Month : {unitRes?.dueMonths}</span> */}
                </p>
                <Button
                  className="!bg-[#29429F] !text-white !text-lg !px-5 py-1.5 !rounded-full disabled:opacity-50"
                  onClick={() => setIsOpenMakePayment(true)}
                  disabled={
                    unitRes?.property?.planType === "PREMIUM" && getPackageExpiredDates(unitRes?.property?.paidTo).moreThanOneMonthExpired
                      ? true
                      : false || unitRes?.dueRent == 0
                        ? true
                        : false || !unitRes?.property?.owner?.FinancialAccount?.detailsSubmitted
                          ? true
                          : false
                  }
                >
                  {unitRes?.dueRent == 0 ? "No Payment Due" : "Make Payment"}
                </Button>
              </div>
            </div>
            <div className=" relative lg:col-span-2 flex justify-center items-center max-lg:border lg:border-l p-20 max-lg:shadow max-lg:rounded-md">
              <div>
                <h2 className="text-2xl text-center font-semibold mb-2.5 leading-9">
                  Request <br />
                  Maintenance
                </h2>

                <Button
                  as={Link}
                  href="/tenant/unit-information/request-maintenance"
                  className="!bg-[#29429F] !text-white !text-lg !px-5 py-1.5 !rounded-full"
                >
                  Send Request
                </Button>
              </div>
              <div className="absolute top-2 right-2">
                <button onClick={() => router.push("/tenant/unit-information/my-requests")} className="border px-2.5 py-1  text-sm rounded-full">
                  My Requests
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {!isLoading && isError && !unitRes && (
        <div className="flex justify-center items-center h-[60vh]">
          <h3 className="text-2xl font-semibold text-red-600">{error?.message || "You haven`t assigned to any Unit"}</h3>
        </div>
      )}
      {isLoading && (
        <div className="flex justify-center items-center h-[60vh]">
          {" "}
          <Loader size="lg" content="Loading Unit Information..." />
        </div>
      )}

      {/*  */}

      <div>
        <TenantMakePaymentModal
          isOpen={isOpenMakePayment}
          handleClose={handleClose}
          propertyInfo={unitRes?.property}
          tenantId={unitRes?.tenantId}
          dueRent={unitRes?.dueRent}
          dueMonths={unitRes?.dueMonths}
        />
      </div>
    </div>
  );
};

export default TenantUnitInformation;
