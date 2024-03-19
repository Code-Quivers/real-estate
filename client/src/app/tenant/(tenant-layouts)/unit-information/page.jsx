import Image from "next/image";
import React from "react";
import unitInfoImage from "@/assets/tenant/AustralianHousing-scaled.webp";
import { Button } from "rsuite";
import Link from "next/link";

const page = () => {
  return (
    <div className="max-w-[1050px] mt-6 2xl:mx-auto md:px-5 lg:px-5 max-lg:pb-10 2xl:px-0 mx-auto">
      <h2 className="text-2xl mb-5 text-center">Unit Information</h2>
      <div className="grid lg:grid-cols-3 max-lg:gap-5  grid-cols-1 lg:border border-[#707070] ">
        <div
          key={Math.random()}
          className=" hover:bg-[#29429F] transition-all duration-500 ease-in-out hover:text-white cursor-pointer max-lg:border border-[#707070] max-lg:shadow-lg "
        >
          <Image width="full" objectFit="cover" src={unitInfoImage} alt="Tenant available units" />
          <div className="flex justify-between items-start mt-2 px-2.5 py-1">
            <div>
              <h2 className="text-sm">$1200</h2>
              <h2 className="text-sm">
                <span>3 bed</span> <span>3 bath</span>
              </h2>
              <h2 className="text-sm">3 Belair Br, Binghamton, NY 13901</h2>
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

        <div className="flex justify-center items-center max-lg:border lg:border-l   border-[#707070] p-20 max-lg:shadow-lg">
          <div>
            <h2 className="text-2xl text-center font-semibold">Balance Due</h2>
            <p className="py-3 text-center text-lg font-semibold">
              <span>$ </span>
              <span>0.00</span>
            </p>
            <Button className="!bg-[#29429F] !text-white !text-xl !px-5 py-1.5 !rounded-full">Make Payment</Button>
          </div>
        </div>
        <div className="flex justify-center items-center max-lg:border lg:border-l border-[#707070] p-20 max-lg:shadow-lg">
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
  );
};

export default page;
