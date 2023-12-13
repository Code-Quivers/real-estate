"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Modal } from "rsuite";
import PrimaryButtonForTenant from "../PrimaryButtonForTenant";
import Link from "next/link";

const SavedUnitsModal = ({ open, setOpen, units }) => {
  const handleClose = () => setOpen(false);
  const [openTab, setOpenTab] = useState(1);

  const description = [
    "hat they cannot foresee the pain and trouble that are bound to ensue",
    "hat they cannot foresee the pain and trouble that are bound to ensue",
    "hat they cannot foresee the pain and trouble that are bound to ensue",
    "hat they cannot foresee the pain and trouble that are bound to ensue",
    "hat they cannot foresee the pain and trouble that are bound to ensue",
    "hat they cannot foresee the pain and trouble that are bound to ensue",
    "hat they cannot foresee the pain and trouble that are bound to ensue",
    "hat they cannot foresee the pain and trouble that are bound to ensue",
    "hat they cannot foresee the pain and trouble that are bound to ensue",
    "hat they cannot foresee the pain and trouble that are bound to ensue",
    "hat they cannot foresee the pain and trouble that are bound to ensue",
  ];

  const byTenant = [
    "Keep the property clean and sanitary",
    "Keep the property clean and sanitary",
    "Keep the property clean and sanitary",
    "Keep the property clean and sanitary",
  ];

  const byPowner = [
    "Keep the property clean and sanitary",
    "Keep the property clean and sanitary",
    "Keep the property clean and sanitary",
    "Keep the property clean and sanitary",
  ];

  const schools = [
    {
      schoolNearBy: [
        "Keep the property clean and sanitary",
        "Keep the property clean and sanitary",
        "Keep the property clean and sanitary",
      ],
    },
    {
      universityNearBy: [
        "hat they cannot foresee the pain and",
        "hat they cannot foresee the pain and",
        "hat they cannot foresee the pain and",
      ],
    },
  ];

  const pets = ["Dogs", "Cats", "Birds"];

  return (
    <div>
      <Modal size={"lg"} open={open} onClose={handleClose}>
        <Modal.Body>
          <div className="flex justify-between items-start p-2 -mb-5">
            <div className="w-2/5">
              <Image
                className="h-32 my-1 object-cover"
                width="full"
                objectFit="cover"
                src={units?.image}
                alt="Tenant avialable units"
              />
              <Image
                className="h-32 my-1 object-cover"
                width="full"
                src={units?.image}
                alt="Tenant avialable units"
              />
              <Image
                className="h-32 my-1 object-cover"
                width="full"
                objectFit="cover"
                src={units?.image}
                alt="Tenant avialable units"
              />
              <Image
                className="h-32 my-1 object-cover"
                width="full"
                objectFit="cover"
                src={units?.image}
                alt="Tenant avialable units"
              />
            </div>
            <div className="w-3/5 pl-3">
              <div className="flex justify-between items-start">
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
              <hr className="border my-3 block" />
              <div className="flex justify-between items-center pl-5 mt-6">
                <div>
                  <h2 className="text-4xl mb-2">{units?.price}/month</h2>
                  <h2 className="text-xl">
                    <span>{units?.bed}</span> <span>{units?.bath}</span>
                  </h2>
                  <h2 className="text-xl">{units?.address}</h2>
                </div>
                <div>
                  <div className="py-2 px-5 rounded-full border-2 border-red-700">
                    <p className="text-sm text-center">9</p>
                    <hr />
                    <p className="text-sm text-center">10</p>
                  </div>
                </div>
              </div>
              <div>
                <div className="p-3 mt-6 w-full block">
                  <div>
                    <ul
                      className="flex mb-0 list-none pt-3 pb-4 items-center"
                      role="tablist"
                    >
                      <li>
                        <Link
                          className={
                            "text-xs font-bold uppercase px-2 md:px-7 py-3 block leading-normal border-r-[1px] " +
                            (openTab === 1
                              ? "text-white bg-[#3498FF] "
                              : " text-white bg-[#29429F] ")
                          }
                          onClick={(e) => {
                            e.preventDefault();
                            setOpenTab(1);
                          }}
                          data-toggle="tab"
                          href="#link1"
                          role="tablist"
                        >
                          Description
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={
                            "text-xs font-bold uppercase px-2 md:px-7 py-3 block leading-normal border-r-[1px]" +
                            (openTab === 2
                              ? "text-white  bg-[#3498FF]"
                              : " text-white bg-[#29429F]")
                          }
                          onClick={(e) => {
                            e.preventDefault();
                            setOpenTab(2);
                          }}
                          data-toggle="tab"
                          href="#link2"
                          role="tablist"
                        >
                          Maintenance
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={
                            "text-xs font-bold uppercase px-2 md:px-7 py-3 block leading-normal border-r-[1px]" +
                            (openTab === 3
                              ? "text-white  bg-[#3498FF]"
                              : " text-white bg-[#29429F]")
                          }
                          onClick={(e) => {
                            e.preventDefault();
                            setOpenTab(3);
                          }}
                          data-toggle="tab"
                          href="#link3"
                          role="tablist"
                        >
                          Schools
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={
                            "text-xs font-bold uppercase px-2 md:px-7 py-3 block leading-normal border-r-[1px]" +
                            (openTab === 4
                              ? "text-white bg-[#3498FF]"
                              : " text-white bg-[#29429F]")
                          }
                          onClick={(e) => {
                            e.preventDefault();
                            setOpenTab(4);
                          }}
                          data-toggle="tab"
                          href="#link4"
                          role="tablist"
                        >
                          Pets
                        </Link>
                      </li>
                    </ul>
                    <div>
                      <div
                        className={openTab === 1 ? "block" : "hidden"}
                        id="link1"
                      >
                        {/* brief intoduction section */}
                        <div className="pb-5">
                          <h2 className="text-base font-bold capitalize">
                            Description
                          </h2>
                          {description?.map((list) => (
                            <ul key={Math.random()} className="list-disc pl-5">
                              <li className="text-sm">{list}</li>
                            </ul>
                          ))}
                        </div>
                      </div>
                      <div
                        className={openTab === 2 ? "block" : "hidden"}
                        id="link2"
                      >
                        <div className="flex justify-start items-start">
                          <div className="w-2/4">
                            <h2 className="text-center font-semibold text-lg">
                              Maintenance covered by Tenant
                            </h2>
                            <ul>
                              {byTenant?.map((list) => (
                                <li key={Math.random()} className="text-sm">
                                  {list}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="inline-block h-[250px] min-h-[1em] w-0.5 self-stretch bg-neutral-300 "></div>
                          <div className="w-2/4 pl-3">
                            <h2 className="text-center font-semibold text-lg">
                              Maintenance covered by Property Owner
                            </h2>
                            <ul>
                              {byPowner?.map((list) => (
                                <li key={Math.random()} className="text-sm">
                                  {list}
                                </li>
                              ))}
                            </ul>
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
                              {schools[0].schoolNearBy?.map((list) => (
                                <ul key={Math.random()}>
                                  <li className="text-sm">- {list}</li>
                                </ul>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div>
                          <h2 className="text-base font-bold capitalize">
                            Universities near by
                          </h2>
                          <div className="pb-2">
                            <div className="py-3">
                              {schools[1].universityNearBy?.map((list) => (
                                <ul key={Math.random()}>
                                  <li className="text-sm">- {list}</li>
                                </ul>
                              ))}
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
                            {pets?.map((list) => (
                              <ul key={Math.random()}>
                                <li className="text-sm">- {list}</li>
                              </ul>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button onClick={handleClose} appearance="subtle">
            Cancel
          </Button>
          <Button onClick={handleClose} appearance="primary">
            Ok
          </Button>
        </Modal.Footer> */}
      </Modal>
    </div>
  );
};

export default SavedUnitsModal;
