"use client";

import { Loader, Modal, Progress } from "rsuite";
import React, { useState } from "react";

import SavedUnitsModal from "@/components/tenant/SavedUnits/SavedUnitModal";
import SavedUnitsCard from "@/components/tenant/SavedUnits/SavedUnitsCard";
import { useGetAllSavedItemsQuery } from "@/redux/features/propertyOwner/savedItemApi";

const page = () => {

  // const [open, setOpen] = useState(false);
  // const [modalData, setModalData] = useState(null);

  // const handleOpen = (selectData) => {
  //   setModalData(selectData);
  //   setOpen(true);
  // };
  // const handleClose = () => setOpen(false);
  const query = {};

  const [itemType, setItemType] = useState("PROPERTY");

  query["itemType"] = itemType;

  const { data, isLoading, isError } = useGetAllSavedItemsQuery({ ...query });
  let content = null;
  if (isError) {
    content = <p>Something went wrong!!!</p>
  }
  if (!isError && isLoading) {
    content = <div className="py-5 flex justify-center">
      <Loader size="lg" />
    </div>
  }
  if (!isError && !isLoading && data && data?.data?.data?.length == 0) {

    content = <p>No data available!!!</p>
  }

  if (!isError && !isLoading && data?.data?.data?.length > 0) {

    content = data?.data?.data?.map((unit) => (
      <SavedUnitsCard unitInfo={unit} />
    ))
  }


  return (
    <section className="max-w-[1050px]  max-lg:px-3   pb-20 mx-auto mb-5 mt-6 lg:mt-8 2xl:mx-auto lg:px-5    2xl:px-0 ">

      <div className="flex justify-center">
        <h2 className="text-4xl font-medium">Saved Units</h2>
      </div>
      {/* Available units card start */}
      <div className="mt-2 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
        {content}
      </div>
      {/* modal */}
      {/* <SavedUnitsModal open={open} setOpen={setOpen} availableUnits={data} units={units} /> */}
      {/* Available units card end */}
    </section>

  );
};

export default page;
