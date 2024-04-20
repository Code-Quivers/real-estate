"use client";

import { Loader, Modal, Progress } from "rsuite";
import React, { useState } from "react";

import SavedUnitsModal from "@/components/tenant/SavedUnits/SavedUnitModal";
import SavedUnitsCard from "@/components/tenant/SavedUnits/SavedUnitsCard";

export const metadata = {
  title: "Saved Units",
};

const page = () => {
  return (
    <div className="max-w-[1050px] mt-6 2xl:mx-auto lg:px-5 2xl:px-0 mx-auto">
      <div className="flex justify-center ">
        <h2 className="text-3xl font-medium">Saved Units</h2>
      </div>
      <div>
        <SavedUnitsCard />
      </div>
    </div>
  }
  if (!isError && !isLoading && data && data?.data?.data?.length == 0) {

    content = <p>No data available!!!</p>
  }

  if (!isError && !isLoading && data?.data?.data?.length > 0) {
    content = data?.data?.data?.map((unit) => (
      <SavedUnitsCard unitInfo={unit?.property} handleOpen={handleOpen} />
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
      <SavedUnitsModal open={open} setOpen={setOpen} unitInfo={modalData} />
      {/* Available units card end */}
    </section>

  );
};

export default page;
