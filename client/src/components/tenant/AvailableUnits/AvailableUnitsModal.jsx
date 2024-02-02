"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Modal } from "rsuite";
import PrimaryButtonForTenant from "../PrimaryButtonForTenant";
import { fileUrlKey } from "@/configs/envConfig";

const AvailableUnitsModal = ({ open, setOpen, units }) => {
  const handleClose = () => setOpen(false);
  const [openTab, setOpenTab] = useState(1);

  return (
    <div>
      <Modal size="lg" open={open} onClose={handleClose}>
        <Modal.Body className="!p-0 !overflow-y-hidden">
          <div className="grid grid-cols-5  border border-[#9e9a97] justify-between divide-x  items-stretch divide-[#9e9a97] ">
            <div className="col-span-2 w-full  overflow-y-scroll max-h-[70vh]  custom-scrollbar">
              {units?.images?.length
                ? units?.images?.map((photo) => (
                    <div
                      key={Math.random()}
                      className="flex flex-col   divide-y divide-[#8b8b8b]"
                    >
                      <div className=" ">
                        <Image
                          className="h-[200px]    w-full object-center object-cover"
                          height={300}
                          width={300}
                          src={`${fileUrlKey()}/${photo}`}
                          alt="Unit Photo"
                        />
                      </div>
                    </div>
                  ))
                : ""}
            </div>
            <div className="col-span-3 w-full overflow-y-scroll max-h-[70vh]  custom-scrollbar ">
              <div className="flex p-5  justify-between items-center sticky top-0 bg-white">
                <div>
                  <h2>Logo</h2>
                </div>
                <div>
                  <span className="mr-2.5">
                    <PrimaryButtonForTenant title="Save" />
                  </span>
                  <span>
                    <PrimaryButtonForTenant title="Contact" />
                  </span>
                </div>
              </div>
              <hr className="border   block" />
              <div className="flex justify-between items-center p-5">
                <div>
                  <h2 className="text-4xl mb-2">$1200/month</h2>
                  <h2 className="text-xl">
                    <span>{units?.numOfBed ?? "0"} Bed</span>{" "}
                    <span>{units?.numOfBath ?? "0"} Bath</span>
                  </h2>
                  <h2 className="text-xl">
                    {units?.address
                      ? units?.address
                      : "3 Belair Dr, Binghamton, NY 13901"}
                  </h2>
                </div>
                <div className=" outline outline-4 md:outline-6 outline-[#58ba66] border  ring-[#33333360] ring border-[#33333360]  rounded-full   flex justify-center items-center  px-4">
                  <div className=" flex w-full flex-col justify-center items-center">
                    <span className="font-medium">9</span>
                    <span className="w-[70%] border-t border-[#b6b6b6]" />
                    <span className="font-medium">10</span>
                  </div>
                </div>
              </div>
              {/* */}
              <div>
                {/* buttons */}
                <div className="flex ">
                  <button
                    size="lg"
                    className={`
                    text-xs font-bold uppercase rounded-none  py-3  w-full border-r text-white ${
                      openTab === 1 ? "bg-[#3498FF]" : "bg-[#29429F]"
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenTab(1);
                    }}
                  >
                    Description
                  </button>

                  <button
                    size="lg"
                    className={`
                    text-xs font-bold uppercase rounded-none  py-3  w-full border-r text-white ${
                      openTab === 2 ? "bg-[#3498FF]" : "bg-[#29429F]"
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenTab(2);
                    }}
                    data-toggle="tab"
                    href="#link2"
                    role="tablist"
                  >
                    Maintenance
                  </button>

                  <button
                    size="lg"
                    className={`
                    text-xs font-bold uppercase rounded-none  py-3  w-full border-r text-white ${
                      openTab === 3 ? "bg-[#3498FF]" : "bg-[#29429F]"
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenTab(3);
                    }}
                  >
                    Schools
                  </button>

                  <button
                    size="lg"
                    className={`
                    text-xs font-bold uppercase rounded-none  py-3  w-full text-white ${
                      openTab === 4 ? "bg-[#3498FF]" : "bg-[#29429F]"
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenTab(4);
                    }}
                  >
                    Pets
                  </button>
                </div>
                {/* contents */}
                <div className=" px-2.5 py-5 w-full block">
                  <div
                    className={openTab === 1 ? "block" : "hidden"}
                    id="link1"
                  >
                    {/* brief introduction section */}
                    <div className="pb-5">
                      <h2 className="text-base font-bold capitalize">
                        Description
                      </h2>

                      <ul key={Math.random()} className="list-disc pl-5">
                        <li className="text-sm">
                          {units?.description ? units?.description : "--"}
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Explicabo adipisci, et rem doloribus esse nisi,
                          vero nesciunt non commodi ratione veniam quidem
                          repellat mollitia fugiat harum dicta! Odio
                          perspiciatis sapiente fugiat aperiam laboriosam rem.
                          Dignissimos nihil consectetur rem quaerat vero id
                          sapiente quod consequatur impedit optio, quisquam modi
                          numquam maiores eveniet accusamus beatae. Doloribus
                          laudantium modi nesciunt accusamus, minima dolore in
                          illo qui incidunt labore? Qui, eligendi. Dignissimos
                          nulla eos delectus eveniet placeat dolore fugiat
                          tempora sed nostrum sunt temporibus molestiae
                          consequatur velit porro officia tempore eligendi,
                          veniam inventore distinctio nisi. Magnam praesentium
                          maxime, alias quam odit cumque deserunt atque!
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div
                    className={openTab === 2 ? "block" : "hidden"}
                    id="link2"
                  >
                    <div className="grid grid-cols-2   ">
                      <div className="col-span-1 border-r mr-3    p-1">
                        <h2 className="text-center font-semibold text-lg">
                          Maintenance covered by Tenant
                        </h2>
                        <p className="mt-5 whitespace-pre-line">
                          {units?.maintenanceCoveredTenant
                            ? units?.maintenanceCoveredTenant
                            : "--"}
                        </p>
                      </div>

                      <div className="col-span-1 p-1">
                        <h2 className="text-center font-semibold text-lg">
                          Maintenance covered by Property Owner
                        </h2>
                        <p className="mt-5 whitespace-pre-line">
                          {units?.maintenanceCoveredOwner
                            ? units?.maintenanceCoveredOwner
                            : "--"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    className={openTab === 3 ? "block" : "hidden"}
                    id="link3"
                  >
                    <div>
                      <h2 className="text-base font-bold capitalize">
                        Schools near by
                      </h2>
                      <div className="pb-2">
                        <div className="py-3">
                          {/* {schools[0].schoolNearBy?.map((list) => (
                                <ul key={Math.random()}>
                                  <li className="text-sm">- {list}</li>
                                </ul>
                              ))} */}

                          <p>{units?.schools ? units?.schools : "--"}</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h2 className="text-base font-bold capitalize">
                        Universities near by
                      </h2>
                      <div className="pb-2">
                        <div className="py-3">
                          {/* {schools[1].universityNearBy?.map((list) => (
                                <ul key={Math.random()}>
                                  <li className="text-sm">- {list}</li>
                                </ul>
                              ))} */}
                          <p>
                            {units?.universities ? units?.universities : "--"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className={openTab === 4 ? "block" : "hidden"}
                    id="link4"
                  >
                    <h2 className="text-base font-bold capitalize">
                      Pets Allowed
                    </h2>
                    <div className="pb-2">
                      <div className="py-3">
                        <p>{units?.pets ? units?.pets : "--"}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AvailableUnitsModal;
