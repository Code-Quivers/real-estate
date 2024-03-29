"use client";

import { fileUrlKey } from "@/configs/envConfig";
import { useGetMyAllUnitsQuery } from "@/redux/features/propertyOwner/propertyApi";
import Image from "next/image";
import { Controller, useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import { Button, Form, Input, InputNumber, Modal, SelectPicker } from "rsuite";

const AddReportFormModal = ({ isOpen, handleClose }) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset: resetForm,
    watch,
  } = useForm();
  const { reportType } = watch();
  const { data: myUnitsData, isLoading: isLoadingMyUnits } = useGetMyAllUnitsQuery();

  const handleAddReport = (data) => {
    console.log("shafin", data);
    //
  };
  return (
    <div>
      <Modal dialogAs="div" size={700} overflow={false} className="bg-white mx-auto rounded-2xl mt-10" open={isOpen}>
        <Modal.Body className="p-10">
          {/* title */}
          <div className="flex justify-between items-center">
            <h2>Add New Report</h2>
            <button onClick={handleClose} className="hover:scale-125 duration-300">
              <IoClose size={20} />
            </button>
          </div>
          {/* form */}
          <form onSubmit={handleSubmit(handleAddReport)}>
            <div className="my-10 space-y-5">
              {/* report type */}
              <div className="space-y-2 pb-2">
                <label htmlFor="reportType">Report Type</label>

                <div>
                  <Controller
                    name="reportType"
                    control={control}
                    rules={{
                      required: "Report Type is Required !",
                    }}
                    render={({ field }) => (
                      <div className="rs-form-control-wrapper ">
                        <SelectPicker
                          size="lg"
                          data={["Monthly", "Annually", "Tax"].map((item) => ({
                            label: item,
                            value: item,
                          }))}
                          onChange={(e) => {
                            field.onChange(e);
                          }}
                          searchable={false}
                          placeholder="Report Type"
                          className="!w-full"
                        />
                        <Form.ErrorMessage show={(!!errors?.reportType && !!errors?.reportType?.message) || false} placement="topEnd">
                          {errors?.reportType?.message}
                        </Form.ErrorMessage>
                      </div>
                    )}
                  />
                </div>
              </div>

              {/* if report type is annual or monthly */}

              {(reportType === "Annually" || reportType === "Monthly") && (
                <div className="border-t border-b pt-3 space-y-2  pb-5">
                  {/* selected property */}
                  <div className=" space-y-2">
                    <label htmlFor="">Select Property</label>
                    <Controller
                      name="propertyId"
                      control={control}
                      render={({ field }) => (
                        <div className="rs-form-control-wrapper ">
                          <SelectPicker
                            size="lg"
                            data={
                              myUnitsData?.data?.map((item) => ({
                                label: item?.title,
                                value: item?.propertyId,
                                others: {
                                  image: item?.images[0],
                                  tenant: item?.Tenant,
                                  numOfBed: item?.numOfBed,
                                  numOfBath: item?.numOfBath,
                                  address: item?.address,
                                  monthlyRent: item?.monthlyRent,
                                },
                              })) || []
                            }
                            onChange={(e) => field.onChange(e)}
                            className="w-full"
                            placeholder="Select User"
                            renderMenuItem={(value, item) => {
                              return (
                                <div className="  flex gap-5 border items-center">
                                  <div>
                                    <Image
                                      width={200}
                                      height={200}
                                      src={item?.others?.image && `${fileUrlKey()}/${item?.others?.image}`}
                                      alt="Profile Image"
                                      className="w-[100px] h-[100px] object-cover"
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <h2 className="font-semibold text-lg">{value}</h2>
                                    <h2>{item.others?.monthlyRent}</h2>
                                    <h2>
                                      {item?.others?.numOfBed} Beds {item?.others?.numOfBath} Baths
                                    </h2>
                                    <h2>{item.others?.address ?? "-"}</h2>
                                  </div>
                                </div>
                              );
                            }}
                          />
                        </div>
                      )}
                    />
                  </div>
                  {/* collected rent */}
                  <div className="space-y-2">
                    <label htmlFor="collectedRent">Collected Rent</label>
                    <Controller
                      name="collectedRent"
                      control={control}
                      rules={{
                        required: "Collected Rent is Required!",
                        min: {
                          value: 0,
                          message: "Collected Rent must be greater than or equal to 0",
                        },
                      }}
                      render={({ field }) => (
                        <div className="rs-form-control-wrapper ">
                          <InputNumber min={0} step={0.1} className="!w-full" {...field} type="text" placeholder="Collected Rent..." />
                          <Form.ErrorMessage show={(!!errors?.collectedRent && !!errors?.collectedRent?.message) || false} placement="topEnd">
                            {errors?.collectedRent?.message}
                          </Form.ErrorMessage>
                        </div>
                      )}
                    />
                  </div>
                  {/* Monthly Expenses */}
                  <div className="space-y-2">
                    <label htmlFor="expenses">Expenses</label>
                    <Controller
                      name="expenses"
                      rules={{
                        required: "Expenses is Required!",
                        min: {
                          value: 0,
                          message: "Expenses must be greater than or equal to 0",
                        },
                      }}
                      control={control}
                      render={({ field }) => (
                        <div className="rs-form-control-wrapper ">
                          <InputNumber min={0} step={0.1} className="!w-full" {...field} type="text" placeholder="Expenses..." />
                        </div>
                      )}
                    />
                  </div>
                </div>
              )}
            </div>
            {/* submit or cancel */}
            <div className="flex justify-end items-center gap-5">
              <button type="button" onClick={handleClose} className="hover:underline">
                Close
              </button>
              <Button type="submit" className="!bg-primary !text-white !rounded-full !px-5 !py-2.5">
                Submit
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AddReportFormModal;