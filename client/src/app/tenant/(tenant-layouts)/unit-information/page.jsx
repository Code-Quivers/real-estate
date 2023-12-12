import Image from "next/image";
import React from "react";
import unitInfoImage from "@/assets/tenant/AustralianHousing-scaled.webp";

const page = () => {
  return (
    <div>
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
              <div>
                <div className="py-2 px-5 rounded-full border-2 border-red-700">
                  <p className="text-sm text-center">9</p>
                  <hr />
                  <p className="text-sm text-center">10</p>
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
