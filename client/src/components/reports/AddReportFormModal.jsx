"use client";

import { fileUrlKey } from "@/configs/envConfig";
import { useGetMyAllUnitsQuery } from "@/redux/features/propertyOwner/propertyApi";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import { Button, Form, InputNumber, Modal, Notification, SelectPicker, useToaster } from "rsuite";
import AddTaxFileUpload from "./AddTaxFileUpload";
import {
  useAddAnnualTaxDocumentReportMutation,
  useAddNewMonthlyOrAnnualReportMutation,
  useGenerateTenantInformationReportMutation,
} from "@/redux/features/reports/reportsApi";
import { useRouter } from "next/navigation";

const AddReportFormModal = ({ isOpen, handleClose }) => {
  const router = useRouter();
  const [reportType, setReportType] = useState("");
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset: resetForm,
  } = useForm();

  const { data: myUnitsData, isLoading: isLoadingMyUnits } = useGetMyAllUnitsQuery();

  //  add new monthly or annual report
  const [
    addNewMonthlyOrAnnualReport,
    { data: addData, isLoading: isLoadingAdd, isError: isErrorAdd, isSuccess: isSuccessAdd, error: errorAdd, reset: resetReq },
  ] = useAddNewMonthlyOrAnnualReportMutation();

  //  add new annual tax document report
  const [addAnnualTaxDocumentReport, { data: addTaxData, isLoading: isLoadingTax, isSuccess: isSuccessTax, isError: isErrorTax, error: taxError }] =
    useAddAnnualTaxDocumentReportMutation();

  //  add tenant info
  const [
    generateTenantInformationReport,
    { data: generateData, isLoading: isLoadingGenerate, isError: isErrorGenerate, isSuccess: isSuccessGenerate, error: generateError },
  ] = useGenerateTenantInformationReportMutation();

  // submit
  const handleAddReport = async (postData) => {
    if (postData?.reportType === "MONTHLY" || postData?.reportType === "ANNUALLY") {
      const information = myUnitsData?.data
        ?.filter((unitData) => unitData?.propertyId === postData?.propertyId)
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

      if (postData?.reportType === "MONTHLY") {
        const monthlyData = {
          reportType: postData.reportType,
          collectedRent: parseFloat(postData?.monthlyCollectedRent),
          expenses: parseFloat(postData?.monthlyExpenses),
          propertyId: postData?.propertyId,
          information,
        };

        await addNewMonthlyOrAnnualReport({
          data: monthlyData,
        });

        //
      } else if (postData?.reportType === "ANNUALLY") {
        const annualData = {
          reportType: postData.reportType,
          rentAmount: parseFloat(postData?.annualRent),
          collectedRent: parseFloat(postData?.annualCollectedRent),
          expenses: parseFloat(postData?.annualExpenses),
          propertyId: postData?.propertyId,
          information,
        };
        await addNewMonthlyOrAnnualReport({
          data: annualData,
        });
        //
      }
    } else if (postData?.reportType === "TENANT_INFO") {
      //
      await generateTenantInformationReport({
        data: {
          reportType: postData.reportType,
        },
      });
    } else if (postData?.reportType === "TAX") {
      //
      const formData = new FormData();

      if (postData?.taxDocumentFile) {
        formData.append("file", postData.taxDocumentFile?.blobFile);
      }

      const obj = JSON.stringify({
        reportType: postData?.reportType,
      });
      formData.append("data", obj);

      //
      await addAnnualTaxDocumentReport({
        data: formData,
      });
      //
    }

    //
  };

  // ! side effect
  const toaster = useToaster();
  useEffect(() => {
    if (!isLoadingAdd && !isErrorAdd && isSuccessAdd) {
      toaster.push(
        <Notification type="success" header="success" closable>
          <div>
            <p className="text-lg font-semibold mb-2">{addData?.message || "Successfully Added"}</p>
          </div>
        </Notification>,
        {
          placement: "bottomStart",
        },
      );
      handleClose();
      resetForm();
      resetReq();
    }
    if (!isLoadingAdd && isErrorAdd && !isSuccessAdd && errorAdd) {
      toaster.push(
        <Notification type="error" header="error" closable>
          <div>
            <p className="text-lg font-semibold mb-2">{errorAdd?.message || "Failed to Add"}</p>
          </div>
        </Notification>,
        {
          placement: "bottomStart",
        },
      );
    }
  }, [isLoadingAdd, isErrorAdd, isSuccessAdd, errorAdd, toaster]);

  // adding tax document
  useEffect(() => {
    if (!isLoadingTax && !isErrorTax && isSuccessTax) {
      toaster.push(
        <Notification type="success" header="success" closable>
          <div>
            <p className="text-lg font-semibold mb-2">{addTaxData?.message || "Successfully Added"}</p>
          </div>
        </Notification>,
        {
          placement: "bottomStart",
        },
      );
      handleClose();
      resetForm();
      resetReq();
    }
    if (!isLoadingTax && isErrorTax && !isSuccessTax && taxError) {
      toaster.push(
        <Notification type="error" header="error" closable>
          <div>
            <p className="text-lg font-semibold mb-2">{taxError?.message || "Failed to Add"}</p>
          </div>
        </Notification>,
        {
          placement: "bottomStart",
        },
      );
    }
  }, [isLoadingTax, isErrorTax, isSuccessTax, taxError, toaster]);

  // adding tenant information report
  useEffect(() => {
    if (!isLoadingGenerate && !isErrorGenerate && isSuccessGenerate) {
      toaster.push(
        <Notification type="success" header="success" closable>
          <div>
            <p className="text-lg font-semibold mb-2">{generateData?.message || "Successfully Added"}</p>
          </div>
        </Notification>,
        {
          placement: "bottomStart",
        },
      );

      router.push(`/property-owner/reports/${generateData?.data?.reportId}`);

      handleClose();
      resetForm();
      resetReq();
    }
    if (!isLoadingGenerate && isErrorGenerate && !isSuccessGenerate && generateError) {
      toaster.push(
        <Notification type="error" header="error" closable>
          <div>
            <p className="text-lg font-semibold mb-2">{generateError?.message || "Failed to Generate"}</p>
          </div>
        </Notification>,
        {
          placement: "bottomStart",
        },
      );
    }
  }, [isLoadingGenerate, isErrorGenerate, isSuccessGenerate, generateError, toaster]);

  return (
    <div>
      <Modal
        size="md"
        backdrop="static"
        onClose={() => {
          handleClose();
          resetForm();
          setReportType("");
        }}
        overflow={false}
        className="bg-white mx-auto rounded-2xl mt-10"
        open={isOpen}
      >
        <Modal.Body>
          {/* heading title */}
          <div className="flex justify-between items-center">
            <h2 className="font-medium">Add New Report</h2>
            <button
              onClick={() => {
                handleClose();
                resetForm();
                setReportType("");
              }}
              className="hover:scale-125 duration-300"
            >
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
                              label: "Annual Tax Document",
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
                <div className="space-y-1 pt-1">
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
                          searchable={false}
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
                                monthlyRent: item?.monthlyRent?.toLocaleString(),
                              },
                            })) || []
                          }
                          onChange={(e) => field.onChange(e)}
                          className="w-full"
                          placeholder="Select your property"
                          value={field.value}
                          renderMenuItem={(value, item) => {
                            return (
                              <div className="flex gap-5 border rounded-md p-1 items-center">
                                <div>
                                  <Image
                                    width={100}
                                    height={100}
                                    src={item?.others?.image && `${fileUrlKey()}/${item?.others?.image}`}
                                    alt="Profile Image"
                                    className="w-[80px] h-[80px] rounded-md object-cover"
                                  />
                                </div>
                                <div className="">
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
                  <div className="space-y-1">
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
                          <InputNumber
                            prefix="$"
                            min={0}
                            step={0.1}
                            max={999999999999999}
                            className="!w-full"
                            {...field}
                            type="text"
                            placeholder="Collected Rent..."
                            formatter={(value) => {
                              if (!isNaN(value)) {
                                return `${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
                              }
                              return "";
                            }}
                            parser={(value) => parseInt(value.replace(/\D/g, ""), 10) || 0}
                          />
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
                  <div className="space-y-1">
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
                          <InputNumber
                            prefix="$"
                            min={0}
                            step={0.1}
                            max={999999999999999}
                            className="!w-full"
                            {...field}
                            type="text"
                            placeholder="Expenses..."
                            formatter={(value) => {
                              if (!isNaN(value)) {
                                return `${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
                              }
                              return "";
                            }}
                            parser={(value) => parseInt(value.replace(/\D/g, ""), 10) || 0}
                          />

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
                  <div className="space-y-0.5">
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
                          <InputNumber
                            prefix="$"
                            min={0}
                            step={0.1}
                            className="!w-full"
                            {...field}
                            max={999999999999999}
                            type="text"
                            formatter={(value) => {
                              if (!isNaN(value)) {
                                return `${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
                              }
                              return "";
                            }}
                            parser={(value) => parseInt(value.replace(/\D/g, ""), 10) || 0}
                            placeholder="Annual Rent..."
                          />
                          <Form.ErrorMessage show={(!!errors?.annualRent && !!errors?.annualRent?.message) || false} placement="topEnd">
                            {errors?.annualRent?.message}
                          </Form.ErrorMessage>
                        </div>
                      )}
                    />
                  </div>

                  {/* collected rent */}
                  <div className="space-y-0.5">
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
                          <InputNumber
                            prefix="$"
                            min={0}
                            max={999999999999999}
                            step={0.1}
                            formatter={(value) => {
                              if (!isNaN(value)) {
                                return `${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
                              }
                              return "";
                            }}
                            parser={(value) => parseInt(value.replace(/\D/g, ""), 10) || 0}
                            className="!w-full"
                            {...field}
                            type="text"
                            placeholder="Collected Rent..."
                          />
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
                  <div className="space-y-0.5">
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
                          <InputNumber
                            prefix="$"
                            min={0}
                            step={0.1}
                            max={999999999999999}
                            className="!w-full"
                            {...field}
                            type="text"
                            placeholder="Expenses..."
                            formatter={(value) => {
                              if (!isNaN(value)) {
                                return `${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
                              }
                              return "";
                            }}
                            parser={(value) => parseInt(value.replace(/\D/g, ""), 10) || 0}
                          />
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
              {reportType !== "TENANT_INFO" && (
                <Button loading={isLoadingAdd || isLoadingTax} type="submit" className="!bg-primary !text-white !rounded-full !px-5 !py-2.5">
                  Submit
                </Button>
              )}
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AddReportFormModal;
