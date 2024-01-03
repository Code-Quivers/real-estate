import Image from "next/image";
import React from "react";
import unitInfoImage from "@/assets/tenant/AustralianHousing-scaled.webp";

const page = () => {
  return (
    <div className="max-w-[1050px] mt-6 2xl:mx-auto lg:px-5 2xl:px-0 mx-auto">
      <h2 className="text-2xl mb-5 text-center">Unit Information</h2>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 border">
        <div>
          <div
            key={Math.random()}
            className=" hover:bg-[#29429F] transition-all duration-500 ease-in-out hover:text-white cursor-pointer"
          >
            <Image
              width="full"
              objectFit="cover"
              src={unitInfoImage}
              alt="Tenant avialable units"
            />
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
        </div>
        <div className="flex justify-center items-center border md:p-0 p-20">
          <div>
            <h2 className="text-2xl text-center font-semibold">Balance Due</h2>
            <p className="py-3 text-center text-lg font-semibold">
              <span>$ </span>
              <span>0.00</span>
            </p>
            <button className="bg-[#29429F] text-white text-xl px-3 py-1.5 rounded-full">
              Make Payment
            </button>
          </div>
        </div>
        <div className="flex justify-center items-center border md:p-0 p-20">
          <div>
            <h2 className="text-2xl text-center font-semibold mb-2.5 leading-9">
              Request <br />
              Maintenance
            </h2>

            <button className="bg-[#29429F] text-white text-xl px-3 py-1.5 rounded-full">
              Send Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
