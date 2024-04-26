"use client";

import { fileUrlKey } from "@/configs/envConfig";
import { useGetMyAllUnitsQuery } from "@/redux/features/propertyOwner/propertyApi";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import { Button, Form, InputNumber, Message, Modal, SelectPicker, useToaster } from "rsuite";
import AddTaxFileUpload from "./AddTaxFileUpload";
import { useAddNewMonthlyOrAnnualReportMutation } from "@/redux/features/reports/reportsApi";

const AddReportFormModal = ({ isOpen, handleClose }) => {
  const [reportType, setReportType] = useState("");
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset: resetForm,
  } = useForm();

  const { data: myUnitsData, isLoading: isLoadingMyUnits } = useGetMyAllUnitsQuery();

  const [addNewMonthlyOrAnnualReport, { data: addData, isLoading: isLoadingAdd, isError: isErrorAdd, isSuccess: isSuccessAdd, error: errorAdd }] =
    useAddNewMonthlyOrAnnualReportMutation();

  const handleAddReport = async (postData) => {
    const information = myUnitsData?.data
      ?.filter((unitData) => {
        // Customize the condition to match your criteria
        return unitData?.propertyId === postData?.propertyId;
      })
      .map((unitData) => {
        // Customize what properties are returned
        return {
          image: unitData?.images[0],
          monthlyRent: unitData?.monthlyRent,
          numOfBed: unitData?.numOfBed,
          numOfBath: unitData?.numOfBath,
          address: unitData?.address,
          tenantName: `${unitData.Tenant?.firstName} ${unitData?.Tenant?.lastName}`,
          tenantImage: unitData?.Tenant?.profileImage,
          propertyId: unitData?.propertyId,
        };
      });

    let createData;
    if (postData?.reportType === "MONTHLY") {
      createData = {
        reportType: postData.reportType,
        collectedRent: parseFloat(postData?.monthlyCollectedRent),
        expenses: parseFloat(postData?.monthlyExpenses),
        propertyId: postData?.propertyId,
        information,
      };

      await addNewMonthlyOrAnnualReport({
        data: createData,
      });

      //
    } else if (postData?.reportType === "ANNUALLY") {
      createData = {
        reportType: postData.reportType,
        rentAmount: parseFloat(postData?.annualRent),
        collectedRent: parseFloat(postData?.annualCollectedRent),
        expenses: parseFloat(postData?.annualExpenses),
        propertyId: postData?.propertyId,
        information,
      };
      await addNewMonthlyOrAnnualReport({
        data: createData,
      });
      //
    } else if (postData?.reportType === "TENANT_INFO") {
      //
    } else if (postData?.reportType === "TAX") {
      //
    }

    console.log("shafin", createData);
    //
  };

  // !
  const toaster = useToaster();
  useEffect(() => {
    if (!isLoadingAdd && !isErrorAdd && isSuccessAdd) {
      toaster.push(
        <Message bordered showIcon type="success">
          <span className="lg:text-2xl">{addData?.message || "Successfully Added"}</span>
        </Message>,
        {
          placement: "topEnd",
        },
      );
    }
    if (!isLoadingAdd && isErrorAdd && !isSuccessAdd && errorAdd) {
      toaster.push(
        <Message bordered showIcon type="error">
          <span className="lg:text-2xl">{errorAdd?.message || "Failed to Add"}</span>
        </Message>,
        {
          placement: "topEnd",
        },
      );
    }
  }, [isLoadingAdd, isErrorAdd, isSuccessAdd, errorAdd, toaster]);

  return (
    <div>
      <Modal dialogAs="div" size={700} overflow={false} className="bg-white mx-auto rounded-2xl mt-10" open={isOpen}>
        <Modal.Body className="p-10">
          {/* heading title */}
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
                          data={[
                            {
                              label: "Monthly",
                              value: "MONTHLY",
                            },
                            {
                              label: "Annually",
                              value: "ANNUALLY",
                            },
                            {
                              label: "Tenant information",
                              value: "TENANT_INFO",
                            },
                            {
                              label: "Tax Document",
                              value: "TAX",
                            },
                          ].map((item) => ({
                            label: item.label,
                            value: item.value,
                          }))}
                          onChange={(e) => {
                            field.onChange(e);
                            setReportType(e);
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

              {/* if report type is monthly or annual  */}
              {(reportType === "MONTHLY" || reportType === "ANNUALLY") && (
                <div className=" space-y-2 border-t pt-3">
                  <label htmlFor="">Select Property</label>
                  <Controller
                    name="propertyId"
                    rules={{
                      required: "Property Is Required !!",
                    }}
                    control={control}
                    render={({ field }) => (
                      <div className="rs-form-control-wrapper ">
                        <SelectPicker
                          loading={isLoadingMyUnits}
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
                          placeholder="Select your property"
                          value={field.value}
                          renderMenuItem={(value, item) => {
                            return (
                              <div className="  flex gap-5 border items-center">
                                <div>
                                  <Image
                                    width={100}
                                    height={100}
                                    src={item?.others?.image && `${fileUrlKey()}/${item?.others?.image}`}
                                    alt="Profile Image"
                                    className="w-[80px] h-[80px] object-cover"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <h2 className="font-semibold text-sm">{value}</h2>
                                  <h2 className="text-md">${item.others?.monthlyRent}</h2>
                                  <h2 className="text-sm">
                                    {item?.others?.numOfBed} Beds {item?.others?.numOfBath} Baths
                                  </h2>
                                  <h2 className="text-sm">{item.others?.address ?? "-"}</h2>
                                </div>
                              </div>
                            );
                          }}
                        />{" "}
                        <Form.ErrorMessage show={(!!errors?.propertyId && !!errors?.propertyId?.message) || false} placement="topEnd">
                          {errors?.propertyId?.message}
                        </Form.ErrorMessage>
                      </div>
                    )}
                  />
                </div>
              )}

              {/* if report type is  monthly */}
              {reportType === "MONTHLY" && (
                <div className="space-y-2  pb-5">
                  {/* collected rent */}
                  <div className="space-y-2">
                    <label htmlFor="collectedRent">Collected Rent</label>
                    <Controller
                      name="monthlyCollectedRent"
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
                          <InputNumber prefix="$" min={0} step={0.1} className="!w-full" {...field} type="text" placeholder="Collected Rent..." />
                          <Form.ErrorMessage
                            show={(!!errors?.monthlyCollectedRent && !!errors?.monthlyCollectedRent?.message) || false}
                            placement="topEnd"
                          >
                            {errors?.monthlyCollectedRent?.message}
                          </Form.ErrorMessage>
                        </div>
                      )}
                    />
                  </div>
                  {/* Monthly Expenses */}
                  <div className="space-y-2">
                    <label htmlFor="expenses">Monthly Expenses</label>
                    <Controller
                      name="monthlyExpenses"
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
                          <InputNumber prefix="$" min={0} step={0.1} className="!w-full" {...field} type="text" placeholder="Expenses..." />

                          <Form.ErrorMessage show={(!!errors?.monthlyExpenses && !!errors?.monthlyExpenses?.message) || false} placement="topEnd">
                            {errors?.monthlyExpenses?.message}
                          </Form.ErrorMessage>
                        </div>
                      )}
                    />
                  </div>
                </div>
              )}

              {/* if report type is annual */}

              {reportType === "ANNUALLY" && (
                <div className="space-y-2">
                  {/* annual rent */}
                  <div className="space-y-2">
                    <label htmlFor="annualRent">Annual Rent</label>
                    <Controller
                      name="annualRent"
                      control={control}
                      rules={{
                        required: "Annual Rent is Required!",
                        min: {
                          value: 0,
                          message: "Annual Rent must be greater than or equal to 0",
                        },
                      }}
                      render={({ field }) => (
                        <div className="rs-form-control-wrapper ">
                          <InputNumber prefix="$" min={0} step={0.1} className="!w-full" {...field} type="text" placeholder="Annual Rent..." />
                          <Form.ErrorMessage show={(!!errors?.annualRent && !!errors?.annualRent?.message) || false} placement="topEnd">
                            {errors?.annualRent?.message}
                          </Form.ErrorMessage>
                        </div>
                      )}
                    />
                  </div>

                  {/* collected rent */}
                  <div className="space-y-2">
                    <label htmlFor="annualCollectedRent">Collected Rent</label>
                    <Controller
                      name="annualCollectedRent"
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
                          <InputNumber prefix="$" min={0} step={0.1} className="!w-full" {...field} type="text" placeholder="Collected Rent..." />
                          <Form.ErrorMessage
                            show={(!!errors?.annualCollectedRent && !!errors?.annualCollectedRent?.message) || false}
                            placement="topEnd"
                          >
                            {errors?.annualCollectedRent?.message}
                          </Form.ErrorMessage>
                        </div>
                      )}
                    />
                  </div>
                  {/* Monthly Expenses */}
                  <div className="space-y-2">
                    <label htmlFor="annualExpenses">Annual Expenses</label>
                    <Controller
                      name="annualExpenses"
                      rules={{
                        required: "Annual Expenses is Required!",
                        min: {
                          value: 0,
                          message: "Expenses must be greater than or equal to 0",
                        },
                      }}
                      control={control}
                      render={({ field }) => (
                        <div className="rs-form-control-wrapper ">
                          <InputNumber prefix="$" min={0} step={0.1} className="!w-full" {...field} type="text" placeholder="Expenses..." />
                          <Form.ErrorMessage show={(!!errors?.annualExpenses && !!errors?.annualExpenses?.message) || false} placement="topEnd">
                            {errors?.annualExpenses?.message}
                          </Form.ErrorMessage>
                        </div>
                      )}
                    />
                  </div>
                </div>
              )}

              {/* if report type is tax */}
              {reportType === "TAX" && (
                <div className="space-y-2 pb-2">
                  <label htmlFor="reportType">Select Pdf Document</label>
                  <div>
                    <Controller
                      name="taxDocumentFile"
                      control={control}
                      rules={{
                        required: "Document File is Required !",
                      }}
                      render={({ field }) => (
                        <div className="rs-form-control-wrapper ">
                          <AddTaxFileUpload field={field} />
                          <Form.ErrorMessage show={(!!errors?.taxDocumentFile && !!errors?.taxDocumentFile?.message) || false} placement="topEnd">
                            {errors?.taxDocumentFile?.message}
                          </Form.ErrorMessage>
                        </div>
                      )}
                    />
                  </div>
                </div>
              )}
              {/* if report type is tenant information */}
              {reportType === "TENANT_INFO" && (
                <div>
                  <button className="font-semibold text-sm py-2 rounded-lg bg-[#E4F1FC] px-5 text-[#29429F]">Generate</button>
                </div>
              )}
            </div>
            {/* submit or cancel */}
            <div className="flex justify-end items-center gap-5">
              <button
                type="button"
                onClick={() => {
                  handleClose();
                  resetForm();
                  setReportType("");
                }}
                className="hover:underline"
              >
                Close
              </button>
              <Button loading={isLoadingAdd} type="submit" className="!bg-primary !text-white !rounded-full !px-5 !py-2.5">
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
