"use client";
import Image from "next/image";
import React, { useState } from "react";
import unitInfoImage from "@/assets/tenant/AustralianHousing-scaled.webp";
import { Button, Loader } from "rsuite";
import Link from "next/link";
import { useGetTenantMyUnitInformationQuery } from "@/redux/features/tenant/tenantsApi";
import { fileUrlKey } from "@/configs/envConfig";
import TenantMakePaymentModal from "@/components/tenant/unitInformation/TenantMakePaymentModal";

const TenantUnitInformation = () => {
  const { data, isLoading, isError, error } = useGetTenantMyUnitInformationQuery();
  const { data: unitRes } = data || {};

  const [isOpenMakePayment, setIsOpenMakePayment] = useState(false);
  const handleClose = () => setIsOpenMakePayment(false);

  return (
    <div className="max-w-[1050px] mt-6 2xl:mx-auto md:px-5 lg:px-5 max-lg:pb-10 2xl:px-0 mx-auto">
      <h2 className="text-2xl mb-5 text-center">Unit Information</h2>

      {!isLoading && !isError && unitRes && (
        <div>
          <div className="grid lg:grid-cols-6 max-lg:gap-5  grid-cols-1 lg:border border-[#707070] ">
            <div
              key={Math.random()}
              className="  lg:col-span-2 hover:bg-[#29429F] transition-all duration-500 ease-in-out hover:text-white cursor-pointer max-lg:border border-[#707070] max-lg:shadow-lg "
            >
              <Image
                width={300}
                height={300}
                src={unitRes?.property?.images?.length ? `${fileUrlKey()}/${unitRes?.property?.images[0]}` : unitInfoImage}
                className="object-cover w-full object-center"
                alt=""
              />

              <div className="flex justify-between items-start mt-2 px-2.5 py-1">
                <div>
                  <h2 className="text-lg font-medium">{unitRes?.property?.title}</h2>
                  <h2 className="text-lg">${unitRes?.property?.monthlyRent}</h2>
                  <h2 className="text-sm">
                    <span>{unitRes?.property?.numOfBed} bed</span> <span>{unitRes?.property?.numOfBath} bath</span>
                  </h2>
                  <h2 className="text-sm">{unitRes?.property?.address}</h2>
                </div>
                <div className=" outline outline-4 md:outline-6 outline-[#58ba66] border  ring-[#33333360] ring border-[#33333360]  rounded-full   flex justify-center items-center  px-4">
                  <div className=" flex w-full flex-col justify-center items-center">
                    <span className="font-medium">9</span>
                    <span className="w-[70%] border-t border-[#b6b6b6]" />
                    <span className="font-medium">10</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="  lg:col-span-2 flex justify-center items-center max-lg:border lg:border-l   border-[#707070] p-20 max-lg:shadow-lg">
              <div>
                <h2 className="text-2xl text-center font-semibold">Balance Due</h2>
                <p className="py-3 text-center text-lg font-semibold">
                  <span>$ </span>
                  <span>0.00</span>
                </p>
                <Button onClick={() => setIsOpenMakePayment(true)} className="!bg-[#29429F] !text-white !text-xl !px-5 py-1.5 !rounded-full">
                  Make Payment
                </Button>
              </div>
            </div>
            <div className=" lg:col-span-2 flex justify-center items-center max-lg:border lg:border-l border-[#707070] p-20 max-lg:shadow-lg">
              <div>
                <h2 className="text-2xl text-center font-semibold mb-2.5 leading-9">
                  Request <br />
                  Maintenance
                </h2>

                <Button
                  as={Link}
                  href="/tenant/unit-information/request-maintenance"
                  className="!bg-[#29429F] !text-white !text-xl !px-5 py-1.5 !rounded-full"
                >
                  Send Request
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {!isLoading && isError && unitRes && (
        <div className="flex justify-center items-center h-[60vh]">
          <h3 className="text-2xl font-semibold">{error?.message || "You haven`t assigned to any Unit"}</h3>
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
        <TenantMakePaymentModal isOpen={isOpenMakePayment} handleClose={handleClose} />
      </div>
    </div>
  );
};

export default TenantUnitInformation;
