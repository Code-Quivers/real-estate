"use client";
import { fileUrlKey } from "@/configs/envConfig";
import { useGetMyAllUnitsQuery } from "@/redux/features/propertyOwner/propertyApi";
import Image from "next/image";
import React from "react";
import { Checkbox, CheckboxGroup, TagPicker } from "rsuite";

const Payment = () => {
  const { data: unitRes, isLoading } = useGetMyAllUnitsQuery();

  //   const renderMenuItem = (label, other) => {
  //     return (
  //       <>
  //         <div className="flex items-center">
  //           {console.log(other.others)}
  //           <Image width="50" height="50" src={other?.others?.image ? `${fileUrlKey()}/${other?.others?.image}` : ""} alt="image" />
  //           <p>{label}</p>
  //         </div>
  //       </>
  //     );
  //   };
  //   const data = unitRes?.data?.map((item) => ({
  //     label: item?.title,
  //     value: item?.propertyId,
  //     others: {
  //       image: item?.images[0],
  //       monthlyRent: item?.monthlyRent,
  //       numOfBed: item?.numOfBed,
  //       numOfBath: item?.numOfBath,
  //       address: item?.address,
  //     },
  //   }));
  //   console.log(data);
  return (
    <>
      <section className="mx-auto max-w-4xl">
        <h1 className="text-center mt-10 text-2xl">Payment</h1>
        <div className="max-w-5xl mx-auto">
          <h3 className="mb-2">Select property that you want to payment</h3>
          <CheckboxGroup inline>
            <Checkbox value="A">Checkbox A</Checkbox>
            <Checkbox value="B">Checkbox B</Checkbox>
            <Checkbox value="C">Checkbox C</Checkbox>
            <Checkbox value="D">Checkbox D</Checkbox>
          </CheckboxGroup>
        </div>
      </section>
    </>
  );
};

export default Payment;
